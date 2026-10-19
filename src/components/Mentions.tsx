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
    note?: string;
    link?: { href: string; label: string };
}

const TOKEN = /\[([^\]|]+)(?:\|([^\]]+))?\]/g;

/**
 * A sentence whose names carry footnote numbers, as in a paper, and open
 * their entries beneath it, one at a time. Numbers run on from `start`, so a
 * later section continues the count. The panel's height follows its content,
 * so switching names glides between entries rather than jumping.
 */
export default function Mentions({ text, items, start = 1 }: { text: string; items: MentionItem[]; start?: number }) {
    const [open, setOpen] = useState<string | null>(null);
    // The entry stays rendered while the panel closes around it
    const [shown, setShown] = useState<string | null>(null);
    const [height, setHeight] = useState(0);
    const innerRef = useRef<HTMLDivElement>(null);

    const select = (key: string | null) => {
        setOpen(key);
        if (key) setShown(key);
    };
    const toggle = (key: string) => select(open === key ? null : key);

    useLayoutEffect(() => {
        const inner = innerRef.current;
        if (!inner) return;
        const measure = () => setHeight(inner.offsetHeight);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(inner);
        return () => ro.disconnect();
    }, []);

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

    const parts: React.ReactNode[] = [];
    const numbers = new Map<string, number>();
    let at = 0;
    for (const m of text.matchAll(TOKEN)) {
        if (m.index > at) parts.push(text.slice(at, m.index));
        const item = items.find((i) => i.key === m[1]);
        const label = m[2] ?? m[1];
        if (!item) {
            parts.push(label);
        } else {
            const key = item.key;
            const n = start + numbers.size;
            numbers.set(key, n);
            parts.push(
                <span
                    key={key}
                    id={item.id}
                    role="button"
                    tabIndex={0}
                    className={styles.name}
                    aria-expanded={open === key}
                    onClick={() => toggle(key)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggle(key);
                        } else if (e.key === 'Escape') {
                            select(null);
                        }
                    }}
                >
                    {label}
                    <sup className={styles.mark}>{n}</sup>
                </span>
            );
        }
        at = m.index + m[0].length;
    }
    if (at < text.length) parts.push(text.slice(at));

    const item = items.find((i) => i.key === shown);

    return (
        <div className={styles.mentions} data-active={open ? '' : undefined}>
            <p className={styles.line}>{parts}</p>
            <div
                className={styles.panel}
                data-open={open !== null}
                style={{ height: open ? height : 0 }}
                aria-hidden={open === null}
            >
                <div ref={innerRef} className={styles.inner}>
                    {item && (
                        // Keyed, so each entry plays its own entrance
                        <div key={item.key} className={styles.entry}>
                            <p className={styles.head}>
                                <span className={styles.number}>{numbers.get(item.key)}</span>
                                <span className={styles.sub}>{item.sub}</span>
                                {item.meta && <span className={styles.meta}>{item.meta}</span>}
                            </p>
                            <ul className={styles.points}>
                                {item.points.map((point, j) => (
                                    <li key={j} style={{ '--j': j + 1 } as React.CSSProperties}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
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
        </div>
    );
}
