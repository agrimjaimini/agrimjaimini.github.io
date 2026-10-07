"use client";
import React, { useState } from 'react';
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
}

/**
 * A list of rows that expand in place to show detail. One open at a time.
 * With `limit`, only the first rows show until "N more" is clicked.
 */
export default function Disclosure({ items, limit }: { items: DisclosureItem[]; limit?: number }) {
    const [open, setOpen] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const visible = limit && !showAll ? items.slice(0, limit) : items;
    const hidden = items.length - visible.length;

    return (
        <ul className={styles.list}>
            {visible.map((item, i) => {
                const isOpen = open === item.key;
                const revealed = limit !== undefined && i >= limit;
                return (
                    <li
                        key={item.key}
                        className={`${styles.item} ${revealed ? 'enter' : ''}`}
                        style={revealed ? ({ '--i': i - limit } as React.CSSProperties) : undefined}
                    >
                        <button
                            className={styles.row}
                            onClick={() => setOpen(isOpen ? null : item.key)}
                            aria-expanded={isOpen}
                        >
                            <span className={styles.main}>
                                <span className={styles.title}>{item.title}</span>
                                <span className={`${styles.sub} ${item.preview ? styles.preview : ''}`}>{item.sub}</span>
                            </span>
                            <span className={styles.leader} aria-hidden />
                            <span className={`${styles.meta} ${item.preview ? styles.preview : ''}`}>{item.meta}</span>
                            <span className={styles.toggle} aria-hidden>{isOpen ? '−' : '+'}</span>
                        </button>
                        {/* Height animates via a 0fr → 1fr grid row; content stays mounted */}
                        <div className={styles.detail} data-open={isOpen} aria-hidden={!isOpen}>
                            <div className={styles.detailInner}>
                                <ul className={item.columns ? styles.columns : undefined}>
                                    {item.points.map((point, j) => (
                                        <li key={j}>{point}</li>
                                    ))}
                                </ul>
                                {(item.note || item.link) && (
                                    <p className={styles.tags}>
                                        {item.note}
                                        {item.link && (
                                            <a
                                                href={item.link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.detailLink}
                                            >
                                                {item.link.label} ↗
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
                <li className={styles.item}>
                    <button className={`${styles.row} ${styles.more}`} onClick={() => setShowAll(true)}>
                        <span className={styles.main}>
                            <span className={styles.sub}>{hidden} more</span>
                        </span>
                    </button>
                </li>
            )}
        </ul>
    );
}
