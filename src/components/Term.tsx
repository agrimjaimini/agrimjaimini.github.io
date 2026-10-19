import React from 'react';
import styles from './Term.module.css';

interface TermProps {
    children: React.ReactNode;
    title: string;
    meta?: string;
    lines: string[];
    /** Wider card for longer lists. */
    wide?: boolean;
    /** Make the term a citation: a link to the row it summarizes, e.g. "#experience-coinbase". */
    href?: string;
}

/** Inline term with a small hover/focus card, like a footnote that comes to you. */
export default function Term({ children, title, meta, lines, wide, href }: TermProps) {
    // The card is announced as the term's description rather than read inline,
    // so the sentence it sits in still reads as one sentence
    const id = `term-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const content = (
        <>
            {children}
            <span id={id} className={`${styles.card} ${wide ? styles.wide : ''}`} role="tooltip" aria-hidden>
                <span className={styles.head}>
                    <span className={styles.title}>{title}</span>
                    {meta && <span className={styles.meta}>{meta}</span>}
                </span>
                {lines.map((line) => (
                    <span key={line} className={styles.line}>{line}</span>
                ))}
            </span>
        </>
    );

    return href ? (
        <a href={href} className={styles.term} aria-describedby={id}>
            {content}
        </a>
    ) : (
        <span className={styles.term} tabIndex={0} aria-describedby={id}>
            {content}
        </span>
    );
}
