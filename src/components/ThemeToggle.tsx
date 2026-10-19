"use client";
import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'auto' | 'light' | 'dark';
const order: Theme[] = ['auto', 'light', 'dark'];
const listeners = new Set<() => void>();

function read(): Theme {
    try {
        const t = localStorage.getItem('theme');
        return t === 'light' || t === 'dark' ? t : 'auto';
    } catch {
        return 'auto';
    }
}

/** Whether a setting puts the page in dark, following the system for auto. */
const isDark = (theme: Theme) =>
    theme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';

function save(theme: Theme) {
    const root = document.documentElement;
    if (theme === 'auto') delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
        if (theme === 'auto') localStorage.removeItem('theme');
        else localStorage.setItem('theme', theme);
    } catch {}
    listeners.forEach((l) => l());
}

/**
 * The whole page crossfades to the new theme as one picture, so text, rules,
 * and Fig. 1's dots all change together. See .theme-fade in globals.css.
 */
function apply(theme: Theme) {
    const root = document.documentElement;
    const flips = isDark(theme) !== isDark(read());
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!flips || reduced || !('startViewTransition' in document)) {
        // Where a view transition can't (or shouldn't) run, fade the colors instead
        if (flips) {
            root.classList.add('theme-transition');
            window.setTimeout(() => root.classList.remove('theme-transition'), 350);
        }
        save(theme);
        return;
    }

    root.classList.add('theme-fade');
    // Re-render the label inside the update so it lands in the new snapshot
    const transition = document.startViewTransition(() => flushSync(() => save(theme)));
    transition.finished.finally(() => root.classList.remove('theme-fade'));
}

const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
};

export default function ThemeToggle({ className }: { className?: string }) {
    const theme = useSyncExternalStore(subscribe, read, () => 'auto' as Theme);
    const next = order[(order.indexOf(theme) + 1) % order.length];

    return (
        <button
            className={className}
            onClick={() => apply(next)}
            aria-label={`Theme: ${theme}. Switch to ${next}.`}
        >
            <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden style={{ marginRight: 6, verticalAlign: '-1px' }}>
                <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                {theme === 'dark' && <circle cx="6" cy="6" r="5" fill="currentColor" />}
                {theme === 'auto' && <path d="M6 1a5 5 0 0 1 0 10z" fill="currentColor" />}
            </svg>
            {theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
        </button>
    );
}
