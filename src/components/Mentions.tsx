"use client";
import React, { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import styles from './Mentions.module.css';

export interface MentionItem {
    key: string;
    /** Anchor on the name, so a citation elsewhere can jump to it and open it. */
    id?: string;
    sub: string;
    meta?: string;
    points: string[];
    /** Set the points in two columns, for short items like coursework. */
    columns?: boolean;
    /** Points under small labels, in place of `points` (e.g. coursework by subject). */
    groups?: { label: string; points: string[] }[];
    note?: string;
    link?: { href: string; label: string };
}

/** A run of plain text, or a marked name. */
type Part = string | { item: MentionItem; label: string };

const TOKEN = /\[([^\]|]+)(?:\|([^\]]+))?\]/g;

/** A line's entry, which keeps showing while its panel closes around it. */
function Panel({ item, open }: { item: MentionItem | undefined; open: boolean }) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const inner = innerRef.current;
        if (!inner) return;
        const measure = () => setHeight(inner.offsetHeight);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(inner);
        return () => ro.disconnect();
    }, []);

    return (
        <div className={styles.panel} data-open={open} style={{ height: open ? height : 0 }} aria-hidden={!open}>
            <div ref={innerRef} className={styles.inner}>
                {item && (
                    // Keyed, so each entry plays its own entrance
                    <div key={item.key} className={styles.entry}>
                        <p className={styles.head}>
                            <span className={styles.sub}>{item.sub}</span>
                            {item.meta && <span className={styles.meta}>{item.meta}</span>}
                        </p>
                        {item.groups ? (
                            item.groups.map((group, g) => (
                                <div key={group.label} className={styles.group} style={{ '--j': g + 1 } as React.CSSProperties}>
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
                                    <li key={j} style={{ '--j': j + 1 } as React.CSSProperties}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {(item.note || item.link) && (
                            <p className={styles.note} style={{ '--j': item.points.length + 1 } as React.CSSProperties}>
                                <span>{item.note}</span>
                                {item.link && (
                                    <a href={item.link.href} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
                                        {item.link.label} ↗
                                    </a>
                                )}
                            </p>
                        )}
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
export default function Mentions({ lines, items }: { lines: string[]; items: MentionItem[] }) {
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
            const item = items.find((i) => i.key === m[1]);
            const label = m[2] ?? m[1];
            if (!item) {
                parts.push(label);
            } else {
                where.set(item.key, { line });
                parts.push({ item, label });
            }
            at = m.index + m[0].length;
        }
        if (at < text.length) parts.push(text.slice(at));
        return parts;
    });

    const select = (key: string | null) => {
        setOpen(key);
        const at = key ? where.get(key) : undefined;
        if (key && at) setShown((prev) => ({ ...prev, [at.line]: key }));
    };
    const toggle = (key: string) => select(open === key ? null : key);

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
        <div className={styles.mentions} data-active={open ? '' : undefined}>
            {parsed.map((parts, line) => {
                const key = shown[line];
                return (
                    <div key={line} className={styles.stop}>
                        <p className={styles.line}>
                            {parts.map((part, k) => {
                                if (typeof part === 'string') return <React.Fragment key={k}>{part}</React.Fragment>;
                                const { item, label } = part;
                                return (
                                    <span
                                        key={k}
                                        id={item.id}
                                        role="button"
                                        tabIndex={0}
                                        className={styles.name}
                                        aria-expanded={open === item.key}
                                        onClick={() => toggle(item.key)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggle(item.key);
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
                        />
                    </div>
                );
            })}
        </div>
    );
}
