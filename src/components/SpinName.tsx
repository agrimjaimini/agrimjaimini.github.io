"use client";
import { useEffect, useRef } from 'react';
import { C_CRITICAL, step } from '@/lib/ising';
import { getLastReading, subscribePhase } from '@/lib/isingFeed';
import { SWEEPS_PER_SECOND } from './IsingField';
import styles from './SpinName.module.css';

// How much hotter than Fig. 1 the name runs: a little when pointed at, a lot
// during the opening, so a few letters flip in its short time
const HOVER_HEAT = 0.1;
const HINT_HEAT = 0.3;
const COLD = 1.2; // c once let go, with a field that pulls every letter back up
const FIELD = 1.5;
const TAP_HEAT = 1.6; // seconds a tap keeps it hot, on a phone

/**
 * The name as a one-row Ising chain, one spin per letter (the space is not
 * one), run at Fig. 1's pace and a little above its live temperature. At rest
 * every spin is up: the name in ink. Pointing at it heats the chain, and
 * letters flip down to faint and back by the same Metropolis step as Fig. 1;
 * letting go cools it, and a field pulls each letter back to ink.
 *
 * It also flickers once with Fig. 1's opening, as a hint: hot while the lone
 * flipped spin sits at the center, settling as the front spreads from it.
 */
export default function SpinName({ name, className }: { name: string; className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const letters = el.querySelectorAll<HTMLSpanElement>('[data-spin]');
        const n = letters.length;
        const x = new Int8Array(n).fill(1);
        let heat = 0; // 0 while cooling, else how far below Fig. 1's c to run
        let raf = 0;
        let last = 0;
        let debt = 0;
        let tapTimer = 0;
        let pointed = false; // a mouse is over it, so the opening mustn't cool it

        const loop = (now: number) => {
            const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
            last = now;
            const c = Math.max(0.05, (getLastReading()?.c ?? C_CRITICAL) - heat);
            debt += dt * SWEEPS_PER_SECOND * n;
            for (; debt >= 1; debt--) {
                const flipped = heat ? step(x, n, 1, c) : step(x, n, 1, COLD, Math.random, FIELD);
                if (flipped >= 0) letters[flipped].toggleAttribute('data-down', x[flipped] < 0);
            }
            // Runs while hot, and after until every letter is back up
            if (heat || x.includes(-1)) {
                raf = requestAnimationFrame(loop);
            } else {
                raf = 0;
                last = 0;
                debt = 0;
            }
        };
        const run = (to: number) => {
            heat = to;
            if (!raf) raf = requestAnimationFrame(loop);
        };

        const onEnter = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            pointed = true;
            run(HOVER_HEAT);
        };
        const onLeave = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            pointed = false;
            run(0);
        };
        const onDown = (e: PointerEvent) => {
            if (e.pointerType === 'mouse') return;
            run(HOVER_HEAT);
            window.clearTimeout(tapTimer);
            tapTimer = window.setTimeout(() => run(0), TAP_HEAT * 1000);
        };
        const stopPhases = subscribePhase((phase) => {
            if (pointed) return;
            run(phase === 'nucleus' ? HINT_HEAT : 0);
        });

        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointerleave', onLeave);
        el.addEventListener('pointerdown', onDown);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(tapTimer);
            stopPhases();
            el.removeEventListener('pointerenter', onEnter);
            el.removeEventListener('pointerleave', onLeave);
            el.removeEventListener('pointerdown', onDown);
        };
    }, []);

    return (
        <h1 ref={ref} className={`${styles.name} ${className ?? ''}`}>
            {Array.from(name, (ch, i) =>
                ch === ' ' ? (
                    ' '
                ) : (
                    <span key={i} data-spin>
                        {ch}
                    </span>
                ),
            )}
        </h1>
    );
}
