"use client";
import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
    const id = setInterval(onChange, 10_000);
    return () => clearInterval(id);
};

export default function LocalTime({ timeZone }: { timeZone: string }) {
    const time = useSyncExternalStore(
        subscribe,
        () => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone }).format(new Date()),
        () => ''
    );

    return <span>{time}</span>;
}
