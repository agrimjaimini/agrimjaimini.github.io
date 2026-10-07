import React from 'react';
import styles from './Term.module.css';

interface TermProps {
    children: React.ReactNode;
    title: string;
    meta?: string;
    lines: string[];
}

/** Inline term with a small hover/focus card, like a footnote that comes to you. */
export default function Term({ children, title, meta, lines }: TermProps) {
    return (
        <span className={styles.term} tabIndex={0}>
            {children}
            <span className={styles.card} role="tooltip">
                <span className={styles.head}>
                    <span className={styles.title}>{title}</span>
                    {meta && <span className={styles.meta}>{meta}</span>}
                </span>
                {lines.map((line) => (
                    <span key={line} className={styles.line}>{line}</span>
                ))}
            </span>
        </span>
    );
}
