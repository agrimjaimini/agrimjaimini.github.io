"use client";
import { useState, useSyncExternalStore } from 'react';
import styles from './LocalTime.module.css';

const ZONE = 'America/New_York';

// Re-read the clock every 30 seconds; the server renders an empty face, so
// the time never mismatches on hydration
const subscribe = (onChange: () => void) => {
    const timer = window.setInterval(onChange, 30_000);
    return () => window.clearInterval(timer);
};

// One string per minute, so the snapshot only changes when the time does:
// "hour minute|2:33 a.m."
const read = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h23', timeZone: ZONE })
        .formatToParts(now)
        .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {});
    const label = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: ZONE })
        .format(now)
        .replace('AM', 'a.m.')
        .replace('PM', 'p.m.');
    return `${Number(parts.hour)} ${Number(parts.minute)}|${label}`;
};

/** A hand from the center, `angle` degrees clockwise from twelve. */
const Hand = ({ angle, length, className }: { angle: number; length: number; className: string }) => {
    const rad = (angle * Math.PI) / 180;
    return <line className={className} x1={8} y1={8} x2={8 + length * Math.sin(rad)} y2={8 - length * Math.cos(rad)} />;
};

/**
 * The time in Ithaca, as a small clock face across from the name. Hovering
 * (or tapping, on a phone) sets the place and time beside it in words.
 */
export default function LocalTime({ className }: { className?: string }) {
    const snapshot = useSyncExternalStore(subscribe, read, () => '');
    const [open, setOpen] = useState(false);
    const [hm, label] = snapshot.split('|');
    const [hour, minute] = (hm ?? '').split(' ').map(Number);

    return (
        <button
            type="button"
            className={`screen-only ${styles.clock} ${className ?? ''}`}
            data-open={open || undefined}
            onClick={() => setOpen((o) => !o)}
            onBlur={() => setOpen(false)}
            aria-label={label ? `${label} in Ithaca` : 'Time in Ithaca'}
        >
            <span className={styles.label} aria-hidden>
                Ithaca, {label}
            </span>
            <svg className={styles.face} viewBox="0 0 16 16" aria-hidden>
                <circle className={styles.rim} cx={8} cy={8} r={7} />
                {snapshot && (
                    <>
                        <Hand className={styles.hour} angle={((hour % 12) + minute / 60) * 30} length={3.6} />
                        <Hand className={styles.minute} angle={minute * 6} length={5.4} />
                    </>
                )}
            </svg>
        </button>
    );
}
