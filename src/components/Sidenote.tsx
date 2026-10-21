import React, { useId } from 'react';
import styles from './Sidenote.module.css';

/**
 * A Tufte-style sidenote for essays, written inline in MDX:
 * `…Onsager’s 1944 solution<Sidenote>Physical Review 65, 117.</Sidenote>, and…`
 *
 * Where the margin is wide enough, the note sits in it, level with the line
 * that cites it. Narrower, the small number opens the note under that line
 * (a checkbox does it, so it works without JavaScript). Numbers come from a
 * CSS counter on the article, so notes number themselves in order. Hovering
 * either the number or the note sets both in ink.
 */
export default function Sidenote({ children }: { children: React.ReactNode }) {
    const id = useId();
    return (
        <span className={styles.ref}>
            <label htmlFor={id} className={styles.number} aria-label="Note" />
            <input type="checkbox" id={id} className={styles.toggle} />
            <span className={styles.note} role="note">
                {children}
            </span>
        </span>
    );
}
