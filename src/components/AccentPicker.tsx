"use client";
import { useEffect, useState } from 'react';
import styles from './AccentPicker.module.css';

// Temporary, development-only: compare accent colors on the live page.
const accents = [
    { name: 'Stone', light: '#8c8279', dark: '#b3a89d' },
    { name: 'Ink', light: '#141414', dark: '#ededed' },
    { name: 'Graphite', light: '#6e6e73', dark: '#a1a1a6' },
    { name: 'Sand', light: '#a08b6d', dark: '#c9b493' },
    { name: 'Sage', light: '#76857a', dark: '#a3b3a7' },
    { name: 'Slate', light: '#6b7a8c', dark: '#9fb0c4' },
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
