"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './List.module.css';

export interface DisclosureItem {
    key: string;
    title: string;
    sub: string;
    meta?: string;
    points: string[];
    /** Render points as a compact two-column list (e.g. coursework). */
    columns?: boolean;
    /** Small mono line under the points, e.g. dates or the stack. */
    note?: string;
    link?: { href: string; label: string };
}

/** A list of rows that expand in place to show detail. One open at a time. */
export default function Disclosure({ items }: { items: DisclosureItem[] }) {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <ul className={styles.list}>
            {items.map((item) => {
                const isOpen = open === item.key;
                return (
                    <li key={item.key} className={styles.item}>
                        <button
                            className={styles.row}
                            onClick={() => setOpen(isOpen ? null : item.key)}
                            aria-expanded={isOpen}
                        >
                            <span className={styles.main}>
                                <span className={styles.title}>{item.title}</span>
                                <span className={styles.sub}>{item.sub}</span>
                            </span>
                            <span className={styles.leader} aria-hidden />
                            <span className={styles.meta}>{item.meta}</span>
                            <span className={styles.toggle} aria-hidden>{isOpen ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    className={styles.detail}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );
}
