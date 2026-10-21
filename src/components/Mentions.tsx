"use client";
import React, { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import { FocusContext } from './ProjectFigure';
import styles from './Mentions.module.css';

export interface MentionItem {
    key: string;
    /** Anchor on the name, so a citation elsewhere can jump to it and open it. */
    id?: string;
    /** The dateline's words: a role and place, a degree. */
    sub?: string;
    /** The dateline's figures: dates, a stack, a GPA (set in mono). */
    meta?: string;
    note?: string;
    link?: { href: string; label: string };
    /** A few sentences, in the voice of the line that names the entry. */
    story?: string;
    /** Résumé-style points, for an entry with no story. */
    points: string[];
    /** Set the points in two columns, for short items like coursework. */
    columns?: boolean;
    /** Points under small labels, in place of `points` (e.g. coursework by subject). */
    groups?: { label: string; points: string[] }[];
    /** A live figure, after the story. */
    figure?: React.ReactNode;
}

/** A run of plain text, a marked name, or a live piece (a slot). */
type Part = string | { item: MentionItem; label: string } | { slot: React.ReactNode };

// `[Name]` or `[Name|label]` marks a name; `{{key}}` puts in the slot of that key
const TOKEN = /\[([^\]|]+)(?:\|([^\]]+))?\]|\{\{(\w+)\}\}/g;

// In a story or point: `{{key}}` places a slot, `{words|term}` ties words to a figure part
const RICH = /\{\{(\w+)\}\}|\{([^}|]+)\|([^}]+)\}/g;

/**
 * Text with its live pieces in place and its `{words|term}` set as words that
 * light up their part of the figure (on hover, or on tap for phones).
 */
function Rich({
    text,
    slots,
    focus,
    onFocus,
}: {
    text: string;
    slots: Record<string, React.ReactNode>;
    focus: string | null;
    onFocus: (term: string | null) => void;
}) {
    const parts: React.ReactNode[] = [];
    let at = 0;
    for (const m of text.matchAll(RICH)) {
        if (m.index > at) parts.push(text.slice(at, m.index));
        at = m.index + m[0].length;
        if (m[1]) {
            parts.push(<React.Fragment key={m.index}>{slots[m[1]]}</React.Fragment>);
            continue;
        }
        const term = m[3];
        parts.push(
            <span
                key={m.index}
                className={styles.term}
                data-active={focus === term || undefined}
                onPointerEnter={(e) => e.pointerType === 'mouse' && onFocus(term)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && onFocus(null)}
                // A tap holds the focus until the next tap
                onClick={() => onFocus(focus === term ? null : term)}
            >
                {m[2]}
            </span>,
        );
    }
    if (at < text.length) parts.push(text.slice(at));
    return <>{parts}</>;
}

/** A line's entry, which keeps showing while its panel closes around it. */
function Panel({
    item,
    open,
    slots,
}: {
    item: MentionItem | undefined;
    open: boolean;
    slots: Record<string, React.ReactNode>;
}) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [focus, setFocus] = useState<string | null>(null);

    useLayoutEffect(() => {
        const inner = innerRef.current;
        if (!inner) return;
        const measure = () => setHeight(inner.offsetHeight);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(inner);
        return () => ro.disconnect();
    }, []);

    const figures = [item?.meta, item?.note].filter(Boolean).join(' · ');

    return (
        // `inert` while closed, so its links can't be tabbed into while hidden
        <div className={styles.panel} data-open={open} style={{ height: open ? height : 0 }} inert={!open}>
            <div ref={innerRef} className={styles.inner}>
                {item && (
                    // Keyed, so each entry plays its own entrance. One voice from top to
                    // bottom: a dateline, a few sentences, then the figure if there is one
                    <div key={item.key} className={styles.entry}>
                        <p className={styles.dateline}>
                            <span>
                                {item.sub && <span className={styles.sub}>{item.sub}</span>}
                                {item.sub && figures && ' · '}
                                {figures && <span className={styles.meta}>{figures}</span>}
                            </span>
                            {item.link && (
                                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
                                    {item.link.label} ↗
                                </a>
                            )}
                        </p>
                        {item.story ? (
                            <p className={styles.story}>
                                <Rich text={item.story} slots={slots} focus={focus} onFocus={setFocus} />
                            </p>
                        ) : item.groups ? (
                            item.groups.map((group) => (
                                <div key={group.label} className={styles.group}>
                                    <p className={styles.groupLabel}>{group.label}</p>
                                    <ul className={`${styles.points} ${item.columns ? styles.columns : ''}`}>
                                        {group.points.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <ul className={`${styles.points} ${item.columns ? styles.columns : ''}`}>
                                {item.points.map((point, j) => (
                                    <li key={j}>
                                        <Rich text={point} slots={slots} focus={focus} onFocus={setFocus} />
                                    </li>
                                ))}
                            </ul>
                        )}
                        <FocusContext value={focus}>{item.figure}</FocusContext>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * A few sentences, each on its own line. Marked names open their entries
 * directly under their own sentence, one at a time, like text that stretches
 * where it's read.
 */
export default function Mentions({
    lines,
    items,
    slots = {},
}: {
    lines: string[];
    items: MentionItem[];
    /** Live pieces of a sentence, such as a number to drag, by the key a line names them with. */
    slots?: Record<string, React.ReactNode>;
}) {
    const [open, setOpen] = useState<string | null>(null);
    // What each line last showed, so a closing panel keeps its content
    const [shown, setShown] = useState<Record<number, string>>({});

    // Parse once per render: each line's pieces, and which line every marked name is on
    const where = new Map<string, { line: number }>();
    const parsed = lines.map((text, line) => {
        const parts: Part[] = [];
        let at = 0;
        for (const m of text.matchAll(TOKEN)) {
            if (m.index > at) parts.push(text.slice(at, m.index));
            at = m.index + m[0].length;
            if (m[3]) {
                parts.push({ slot: slots[m[3]] });
                continue;
            }
            const item = items.find((i) => i.key === m[1]);
            const label = m[2] ?? m[1];
            if (!item) {
                parts.push(label);
            } else {
                where.set(item.key, { line });
                parts.push({ item, label });
            }
        }
        if (at < text.length) parts.push(text.slice(at));
        return parts;
    });

    const select = (key: string | null) => {
        setOpen(key);
        const at = key ? where.get(key) : undefined;
        if (key && at) setShown((prev) => ({ ...prev, [at.line]: key }));
    };
    // Opening one entry can close another above it; keep the name that was
    // clicked where it is while the panels glide, rather than let it jump
    const toggle = (key: string, name: HTMLElement) => {
        const top = name.getBoundingClientRect().top;
        select(open === key ? null : key);
        let frames = 45; // about as long as the panels take
        const hold = () => {
            const drift = name.getBoundingClientRect().top - top;
            if (Math.abs(drift) > 0.5) window.scrollBy({ top: drift, behavior: 'instant' });
            if (--frames > 0) requestAnimationFrame(hold);
        };
        requestAnimationFrame(hold);
    };

    // A citation (e.g. #experience-coinbase in the intro) opens its entry
    const onHash = useEffectEvent(() => {
        const hit = items.find((item) => item.id && `#${item.id}` === window.location.hash);
        if (hit) select(hit.key);
    });
    useEffect(() => {
        const handle = () => onHash();
        handle();
        window.addEventListener('hashchange', handle);
        return () => window.removeEventListener('hashchange', handle);
    }, []);

    const openLine = open ? where.get(open)?.line : undefined;

    return (
        <div className={styles.mentions}>
            {parsed.map((parts, line) => {
                const key = shown[line];
                return (
                    <div key={line} className={styles.stop}>
                        <p className={styles.line}>
                            {parts.map((part, k) => {
                                if (typeof part === 'string') return <React.Fragment key={k}>{part}</React.Fragment>;
                                if ('slot' in part) return <React.Fragment key={k}>{part.slot}</React.Fragment>;
                                const { item, label } = part;
                                return (
                                    <span
                                        key={k}
                                        id={item.id}
                                        role="button"
                                        tabIndex={0}
                                        className={styles.name}
                                        aria-expanded={open === item.key}
                                        onClick={(e) => toggle(item.key, e.currentTarget)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggle(item.key, e.currentTarget);
                                            } else if (e.key === 'Escape') {
                                                select(null);
                                            }
                                        }}
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </p>
                        <Panel
                            item={items.find((i) => i.key === key)}
                            open={openLine === line}
                            slots={slots}
                        />
                    </div>
                );
            })}
        </div>
    );
}
