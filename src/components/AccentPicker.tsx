"use client";
import { useEffect, useState } from 'react';
import styles from './AccentPicker.module.css';

// Temporary, development-only: compare accent colors on the live page.
const accents = [
    { name: 'Ink', light: '#141414', dark: '#ededed' },
    { name: 'Charcoal', light: '#3f3f46', dark: '#d4d4d8' },
    { name: 'Graphite', light: '#6e6e73', dark: '#a1a1a6' },
    { name: 'Zinc', light: '#71717a', dark: '#a1a1aa' },
    { name: 'Pewter', light: '#7c8386', dark: '#aab1b4' },
    { name: 'Steel', light: '#5d6b78', dark: '#95a3b0' },
    { name: 'Slate', light: '#6b7a8c', dark: '#9fb0c4' },
    { name: 'Mist', light: '#8a96a2', dark: '#bcc6cf' },
    { name: 'Stone', light: '#8c8279', dark: '#b3a89d' },
    { name: 'Taupe', light: '#7f7064', dark: '#b8a696' },
    { name: 'Clay', light: '#9a7f6b', dark: '#c4a68f' },
];

export default function AccentPicker() {
    const [active, setActive] = useState('Stone');

    useEffect(() => {
        const accent = accents.find((a) => a.name === active)!;
        const root = document.documentElement.style;
        root.setProperty('--accent-light', accent.light);
        root.setProperty('--accent-dark', accent.dark);
    }, [active]);

    return (
        <div className={styles.picker}>
            <span className={styles.label}>Accent</span>
            {accents.map((a) => (
                <button
                    key={a.name}
                    className={styles.swatch}
                    data-active={a.name === active}
                    style={{ background: `light-dark(${a.light}, ${a.dark})` }}
                    onClick={() => setActive(a.name)}
                    aria-label={a.name}
                    title={a.name}
                />
            ))}
            <span className={styles.name}>{active}</span>
        </div>
    );
}
