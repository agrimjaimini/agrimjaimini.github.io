"use client";
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const today = () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/** Where the résumé came from and when it was printed. Shown only in print. */
export default function PrintStamp({ className }: { className?: string }) {
    const date = useSyncExternalStore(subscribe, today, () => '');
    return (
        <p className={`mono print-only ${className ?? ''}`}>
            agrimjaimini.com{date && ` · Printed ${date}`}
        </p>
    );
}
