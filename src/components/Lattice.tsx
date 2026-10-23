"use client";
import React, { useEffect, useRef } from 'react';
import { isingState, LATTICE_C, step } from '@/lib/ising';
import styles from './Lattice.module.css';

interface LatticeProps {
    /** Same seed, same starting state: a post's slug gives it a mark of its own. */
    seed: string;
    cols: number;
    rows: number;
    /** Distance between dot centers, in px. */
    gap?: number;
    /** Radius of an up spin, in px; defaults to scale with the gap. */
    radius?: number;
    /** Inverse temperature; higher settles into larger domains. */
    c?: number;
    /** Sweeps per second while running; a sweep proposes one flip per vertex. */
    speed?: number;
    /** Dims dots toward the edges, from this fraction of the way out (0–1); omit for none. */
    fade?: number;
    /** Pull the row into line as the page nears its end: over the last stretch
        of scrolling a field grows until every spin is up, and lets go on the way back. */
    settle?: boolean;
    className?: string;
}

// Opacity left at the very edge when faded
const FADE_FLOOR = 0.3;

/** How much of a dot's opacity survives the fade at (col, row), from 1 at the center down to FADE_FLOOR. */
function edgeGain(col: number, row: number, cols: number, rows: number, from: number) {
    const nx = ((col + 0.5) / cols) * 2 - 1;
    const ny = rows > 1 ? ((row + 0.5) / rows) * 2 - 1 : 0;
    const t = Math.min(1, Math.max(0, (Math.hypot(nx, ny) - from) / (1 - from)));
    return +(1 - (1 - FADE_FLOOR) * t * t * (3 - 2 * t)).toFixed(2);
}

// How much faster the chain runs while the link around it is hovered
const HOVER_BOOST = 6;

// Settling: the field at the very end of the page, and how much faster the
// chain runs at full field (quick enough to see, slow enough to watch)
const SETTLE_FIELD = 1.5;
const SETTLE_SPEEDUP = 10;

/**
 * A small Fig. 1: the same chain, drawn the same way (up spins as full dots,
 * down spins as faint ones), in the text color. It renders its seeded state on
 * the server, then keeps sampling in the browser: slowly at rest, quicker while
 * the link it sits in is hovered. Paused offscreen and under reduced motion.
 */
export default function Lattice({ seed, cols, rows, gap = 4, radius, c = LATTICE_C, speed = 0.25, fade, settle = false, className }: LatticeProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const initial = isingState(seed, cols, rows, c);
    const r = radius ?? gap * 0.28;

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const x = isingState(seed, cols, rows, c);
        const dots = svg.querySelectorAll('circle');
        const host = svg.closest('a');
        let boost = 1;
        let debt = 0;
        let last = 0;
        let raf = 0;
        let field = 0;

        // How far the row has risen from the bottom of the screen toward where
        // it sits at the end of the page: 0 as it comes into view, 1 at the end
        const readScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const top = svg.getBoundingClientRect().top;
            const rise = window.innerHeight - (top - (max - window.scrollY));
            const t = rise <= 1 ? (window.scrollY >= max - 1 ? 1 : 0) : (window.innerHeight - top) / rise;
            const clamped = Math.min(1, Math.max(0, t));
            field = clamped * clamped * SETTLE_FIELD;
        };
        if (settle) {
            readScroll();
            window.addEventListener('scroll', readScroll, { passive: true });
            window.addEventListener('resize', readScroll);
        }

        const loop = (now: number) => {
            const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
            last = now;
            debt += dt * speed * boost * (1 + (field / SETTLE_FIELD) * SETTLE_SPEEDUP) * x.length;
            for (; debt >= 1; debt--) {
                const flipped = step(x, cols, rows, c, Math.random, field);
                if (flipped >= 0) dots[flipped].classList.toggle(styles.down, x[flipped] < 0);
            }
            raf = requestAnimationFrame(loop);
        };

        const io = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            last = 0;
            if (entry.isIntersecting) raf = requestAnimationFrame(loop);
            // A settling row melts back to its seeded state out of sight, so it
            // falls into line again each time the reader reaches the end
            else if (settle) {
                x.set(isingState(seed, cols, rows, c));
                x.forEach((s, i) => dots[i].classList.toggle(styles.down, s < 0));
            }
        });
        io.observe(svg);

        const onEnter = () => (boost = HOVER_BOOST);
        const onLeave = () => (boost = 1);
        host?.addEventListener('pointerenter', onEnter);
        host?.addEventListener('pointerleave', onLeave);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            host?.removeEventListener('pointerenter', onEnter);
            host?.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('scroll', readScroll);
            window.removeEventListener('resize', readScroll);
        };
    }, [seed, cols, rows, c, speed, settle]);

    return (
        <svg
            ref={svgRef}
            className={`${styles.lattice} ${className ?? ''}`}
            width={cols * gap}
            height={rows * gap}
            viewBox={`0 0 ${cols * gap} ${rows * gap}`}
            preserveAspectRatio="xMidYMid slice"
            fill="currentColor"
            aria-hidden
        >
            {Array.from(initial, (s, i) => (
                <circle
                    key={i}
                    className={s < 0 ? styles.down : undefined}
                    cx={(i % cols) * gap + gap / 2}
                    cy={Math.floor(i / cols) * gap + gap / 2}
                    r={r}
                    style={fade === undefined ? undefined : ({ '--edge': edgeGain(i % cols, Math.floor(i / cols), cols, rows, fade) } as React.CSSProperties)}
                />
            ))}
        </svg>
    );
}
