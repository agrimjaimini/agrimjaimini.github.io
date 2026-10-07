"use client";
import { useSyncExternalStore } from 'react';

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
