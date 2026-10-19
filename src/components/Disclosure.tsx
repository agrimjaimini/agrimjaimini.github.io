"use client";
import React, { useEffect, useEffectEvent, useState } from 'react';
import styles from './List.module.css';

export interface DisclosureItem {
    key: string;
    title: string;
    sub: string;
    meta?: string;
    points: string[];
    /** Render points as a compact two-column list (e.g. coursework). */
    columns?: boolean;
    /** The sub and meta preview the points; hide them while the row is open. */
    preview?: boolean;
    /** Small mono line under the points, e.g. dates or the stack. */
    note?: string;
    link?: { href: string; label: string };
    /** Anchor for the row, so a citation elsewhere can jump to it and open it. */
    id?: string;
}

/**
 * A list of rows that expand in place to show detail. One open at a time.
 * With `limit`, only the first rows show until "N more <noun>" is clicked.
 * A row with an `id` opens when the URL's hash points at it, as when a
 * citation in the intro is clicked, and carries a ↩ back to the intro.
 */
export default function Disclosure({ items, limit, noun }: { items: DisclosureItem[]; limit?: number; noun?: string }) {
    const [open, setOpen] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const hidden = limit && !showAll ? Math.max(0, items.length - limit) : 0;
    // The row a citation opened (it shows the ↩), and whether it's still lit
    const [cited, setCited] = useState<string | null>(null);
    const [lit, setLit] = useState(false);

    const onHash = useEffectEvent(() => {
        const hit = items.find((item) => item.id && `#${item.id}` === window.location.hash);
        if (!hit) return;
        setOpen(hit.key);
        setCited(hit.key);
        setLit(true);
    });

    useEffect(() => {
        const handle = () => onHash();
        handle();
        window.addEventListener('hashchange', handle);
        return () => window.removeEventListener('hashchange', handle);
    }, []);

    // The other rows dim for a moment, as on hover, to show where the jump landed
    useEffect(() => {
        if (!lit) return;
        const timer = window.setTimeout(() => setLit(false), 1400);
        return () => window.clearTimeout(timer);
    }, [lit]);

    const toggle = (key: string) => {
        const closing = open === key;
        setOpen(closing ? null : key);
        // Drop the hash once the cited row closes, so citing it again reopens it
        if (closing && key === cited) {
            setCited(null);
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    return (
        <ul className={styles.list}>
            {items.map((item, i) => {
                const isOpen = open === item.key;
                const extra = limit !== undefined && i >= limit;
                // Extra rows stay hidden until "N more" is clicked
                return (
                    <li
                        key={item.key}
                        id={item.id}
                        data-cited={lit && cited === item.key ? '' : undefined}
                        className={`${styles.item} ${extra ? (showAll ? 'enter' : styles.overflow) : ''}`}
                        style={extra ? ({ '--i': i - limit } as React.CSSProperties) : undefined}
                    >
                        <button
                            className={styles.row}
                            onClick={() => toggle(item.key)}
                            aria-expanded={isOpen}
                        >
                            <span className={styles.main}>
                                <span className={styles.title}>{item.title}</span>
                                <span className={`${styles.sub} ${item.preview ? styles.preview : ''}`}>{item.sub}</span>
                            </span>
                            <span className={styles.leader} aria-hidden />
                            <span className={`${styles.meta} ${item.preview ? styles.preview : ''}`}>{item.meta}</span>
                            <span className={`${styles.toggle} ${styles.plus}`} aria-hidden />
                        </button>
                        {/* Height animates via a 0fr → 1fr grid row; content stays mounted */}
                        <div className={styles.detail} data-open={isOpen} aria-hidden={!isOpen}>
                            <div className={styles.detailInner}>
                                <ul className={item.columns ? styles.columns : undefined}>
                                    {item.points.map((point, j) => (
                                        <li key={j} style={{ '--j': j } as React.CSSProperties}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                {(item.note || item.link || cited === item.key) && (
                                    <p className={styles.tags}>
                                        {item.note}
                                        {item.link && (
                                            <a
                                                href={item.link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.detailLink}
                                                data-print={item.link.href.replace(/^https?:\/\//, '')}
                                            >
                                                <span className={styles.detailLabel}>{item.link.label} ↗</span>
                                            </a>
                                        )}
                                        {cited === item.key && (
                                            <a href="#intro" className={`${styles.detailLink} screen-only`} aria-label="Back to the introduction">
                                                ↩
                                            </a>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
            {hidden > 0 && (
                <li className={`${styles.item} ${styles.moreItem}`}>
                    <button className={`${styles.row} ${styles.more}`} onClick={() => setShowAll(true)}>
                        <span className={styles.main}>
                            <span className={styles.sub}>{hidden} more{noun ? ` ${noun}` : ''}</span>
                        </span>
                    </button>
                </li>
            )}
        </ul>
    );
}
