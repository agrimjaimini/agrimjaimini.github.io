"use client";
import { useSyncExternalStore } from 'react';

type Theme = 'auto' | 'light' | 'dark';

/** Fired on window after the theme changes; detail.dark is the resolved scheme. */
export const THEME_EVENT = 'themechange';
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

function apply(theme: Theme) {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    if (theme === 'auto') delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
        if (theme === 'auto') localStorage.removeItem('theme');
        else localStorage.setItem('theme', theme);
    } catch {}
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
    listeners.forEach((l) => l());

    const dark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { dark } }));
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
            {theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
        </button>
    );
}
