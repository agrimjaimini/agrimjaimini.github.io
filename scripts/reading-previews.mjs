// Looks up a short preview for each reading-list link and saves it to
// src/data/readingPreviews.json, which the reading page shows on hover.
// Run by hand after adding to the list (`npm run previews`); the build never
// touches the network. Entries already saved are kept, so edit one by hand to
// improve it and it stays.
//
// arXiv links get the start of their abstract and its date; anything else
// gets the first real paragraph of the page, and a year if its URL has one.
import { readFile, writeFile } from 'node:fs/promises';
import { getReading } from '../src/lib/reading.ts';

const OUT = new URL('../src/data/readingPreviews.json', import.meta.url);
const MAX = 240; // characters: a couple of sentences, never more

const saved = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const decodeEntities = (s) =>
    s
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;|&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');

const clean = (html) =>
    decodeEntities(html.replace(/<[^>]+>/g, ' '))
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,;:!?])/g, '$1')
        .trim();

// A stop after these isn't the end of a sentence: initials ("Richard W.") and titles
const NOT_AN_END = /(?:\b[A-Z]|\b(?:Dr|Mr|Mrs|Ms|Prof|St|vs|etc|e\.g|i\.e|al|Fig|No))\.$/;

/** The text split into sentences, keeping each one's closing punctuation and space. */
function sentences(text) {
    const out = [];
    let start = 0;
    for (const m of text.matchAll(/[.!?]+["”’)]?(?=\s+[A-Z“"‘(]|\s*$)/g)) {
        const end = m.index + m[0].length;
        if (NOT_AN_END.test(text.slice(start, end))) continue;
        out.push(text.slice(start, end) + ' ');
        start = end;
    }
    if (start < text.length) out.push(text.slice(start));
    return out;
}

/** Whole sentences up to MAX characters; one sentence cut with an ellipsis if it's longer alone. */
function excerpt(text) {
    let out = '';
    for (const s of sentences(text)) {
        if ((out + s).trim().length > MAX) break;
        out += s;
    }
    out = out.replace(/\s+/g, ' ').trim();
    if (out) return out;
    return text.slice(0, MAX).replace(/\s+\S*$/, '') + '…';
}

async function fetchText(url) {
    const res = await fetch(url, {
        headers: { 'user-agent': 'agrimjaimini.com reading-list previews' },
        signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    // Respect a declared charset (old pages are often windows-1252)
    const head = new TextDecoder('latin1').decode(bytes.slice(0, 2048));
    const charset =
        res.headers.get('content-type')?.match(/charset=([\w-]+)/i)?.[1] ?? head.match(/charset=["']?([\w-]+)/i)?.[1] ?? 'utf-8';
    return new TextDecoder(charset).decode(bytes);
}

async function arxiv(id) {
    for (let attempt = 0; attempt < 2; attempt++) {
        const xml = await fetchText(`https://export.arxiv.org/api/query?id_list=${id}`).catch(() => '');
        const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
        if (entry) {
            return {
                excerpt: excerpt(clean(entry.match(/<summary>([\s\S]*?)<\/summary>/)[1])),
                published: entry.match(/<published>(\d{4}-\d{2})/)[1],
                via: 'arXiv',
            };
        }
        await sleep(3000 * (attempt + 1)); // the API asks for a pause between calls
    }
    // The API is rate limited; the abstract page carries the same text
    const html = await fetchText(`https://arxiv.org/abs/${id}`);
    const abstract = html.match(/<blockquote class="abstract[^"]*">([\s\S]*?)<\/blockquote>/)?.[1];
    const date = html.match(/<meta name="citation_date" content="(\d{4})\/(\d{2})/);
    if (!abstract) throw new Error(`arXiv ${id}: no abstract`);
    return {
        excerpt: excerpt(clean(abstract.replace(/<span class="descriptor">[\s\S]*?<\/span>/, ''))),
        ...(date ? { published: `${date[1]}-${date[2]}` } : {}),
        via: 'arXiv',
    };
}

async function page(url) {
    const html = (await fetchText(url)).replace(/<(script|style|nav|header|footer)[\s\S]*?<\/\1>/gi, '');
    // The first paragraph that reads like prose, not a byline or caption
    const paragraph = [...html.matchAll(/<p[^>]*>([\s\S]*?)(?=<\/p>|<p[\s>])/gi)]
        .map((m) => clean(m[1]))
        .find((p) => p.length > 120 && /[.!?]/.test(p));
    if (!paragraph) throw new Error(`no paragraph: ${url}`);
    const year = url.match(/\/((?:19|20)\d{2})\/\d{2}\//)?.[1];
    return { excerpt: excerpt(paragraph), ...(year ? { published: year } : {}) };
}

for (const item of getReading()) {
    if (saved[item.url]) continue;
    const id = item.url.match(/arxiv\.org\/(?:abs|pdf)\/([\d.]+)/)?.[1];
    try {
        saved[item.url] = id ? await arxiv(id) : await page(item.url);
        console.log(`✓ ${item.title}`);
    } catch (error) {
        console.warn(`✗ ${item.title}: ${error.message}`);
    }
}

await writeFile(OUT, JSON.stringify(saved, null, 2) + '\n');
