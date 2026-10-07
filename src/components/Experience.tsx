"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { experience } from '@/data/portfolioData';
import styles from './List.module.css';

const year = (duration: string) => {
    const [start, end] = duration.split('–').map((s) => s.trim());
    const startYear = start.slice(-4);
    const endYear = end === 'Present' ? 'Now' : end.slice(-4);
    return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
};

export default function Experience() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <ul className={styles.list}>
            {experience.map((job, i) => {
                const isOpen = open === i;
                return (
                    <li key={`${job.company}-${job.title}`} className={styles.item}>
                        <button
                            className={styles.row}
                            onClick={() => setOpen(isOpen ? null : i)}
                            aria-expanded={isOpen}
                        >
                            <span className={styles.main}>
                                <span className={styles.title}>{job.company}</span>
                                <span className={styles.sub}>{job.title}</span>
                            </span>
                            <span className={styles.leader} aria-hidden />
                            <span className={styles.meta}>
                                {year(job.duration)}
                                <span className={styles.toggle} aria-hidden>{isOpen ? '−' : '+'}</span>
                            </span>
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
                                        <ul>
                                            {job.points.map((point, j) => (
                                                <li key={j}>{point}</li>
                                            ))}
                                        </ul>
                                        <p className={styles.tags}>
                                            {job.duration}
                                            {job.location && ` · ${job.location}`}
                                        </p>
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
