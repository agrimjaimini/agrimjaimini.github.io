import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { formatDate } from '@/lib/format';
import { isingState } from '@/lib/ising';
import { getAllPostSlugs, getPostBySlug } from '@/lib/writing';

// A post's link preview: its title and excerpt, set like the site's own card
// (public/og.png), with the post's lattice mark, drawn large, in the corner
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'A post by Agrim Jaimini';
export const dynamic = 'force-static';

export function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

// Switzer as TTF: the image renderer can't read the site's WOFF2 files
const font = (weight: string) =>
    readFile(path.join(process.cwd(), 'src/app/writing/[slug]/og-fonts', `Switzer-${weight}.ttf`));

// The mark's spacing, and its up and down dots, in the proportions of the list's marks
const PITCH = 22;
const UP = 6.2;
const DOWN = 4.6;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const [regular, medium] = await Promise.all([font('Regular'), font('Medium')]);
    const mark = isingState(slug, 6, 3);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 80,
                    background: '#0d0d0d',
                    fontFamily: 'Switzer',
                }}
            >
                <div style={{ fontSize: 60, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.9, color: '#e3e3e3', maxWidth: 940, textWrap: 'balance' }}>
                    {post?.title ?? 'Writing'}
                </div>
                {post?.excerpt && (
                    <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.4, color: '#999', maxWidth: 900, textWrap: 'balance' }}>{post.excerpt}</div>
                )}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', fontSize: 26, color: '#808080' }}>
                        agrimjaimini.com/writing{post?.date ? `  ·  ${formatDate(post.date, 'month')}` : ''}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: PITCH * 6 }}>
                        {Array.from(mark, (spin, i) => (
                            <div key={i} style={{ width: PITCH, height: PITCH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div
                                    style={{
                                        width: (spin > 0 ? UP : DOWN) * 2,
                                        height: (spin > 0 ? UP : DOWN) * 2,
                                        borderRadius: '50%',
                                        background: '#e3e3e3',
                                        opacity: spin > 0 ? 0.85 : 0.16,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: 'Switzer', data: regular, weight: 400, style: 'normal' },
                { name: 'Switzer', data: medium, weight: 500, style: 'normal' },
            ],
        }
    );
}
