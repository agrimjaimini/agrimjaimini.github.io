"use client";
import { useSyncExternalStore } from 'react';

const ZONE = 'America/New_York';

// Re-read the clock every 30 seconds; the server renders nothing, so the
// time never mismatches on hydration
const subscribe = (onChange: () => void) => {
    const timer = window.setInterval(onChange, 30_000);
    return () => window.clearInterval(timer);
};
const read = () =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: ZONE })
        .format(new Date())
        .replace('AM', 'a.m.')
        .replace('PM', 'p.m.');

/** The time in Ithaca, set across from the name like a dateline. */
export default function LocalTime({ className }: { className?: string }) {
    const time = useSyncExternalStore(subscribe, read, () => '');
    return (
        <p className={`mono screen-only ${className ?? ''}`} aria-label={time ? `${time} in Ithaca` : undefined}>
            {time && `Ithaca ${time}`}
        </p>
    );
}
