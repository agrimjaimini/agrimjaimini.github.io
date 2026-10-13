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
    className?: string;
}

// How much faster the chain runs while the link around it is hovered
const HOVER_BOOST = 6;

/**
 * A small Fig. 1: the same chain, drawn the same way (up spins as full dots,
 * down spins as faint ones), in the text color. It renders its seeded state on
 * the server, then keeps sampling in the browser: slowly at rest, quicker while
 * the link it sits in is hovered. Paused offscreen and under reduced motion.
 */
export default function Lattice({ seed, cols, rows, gap = 4, radius, c = LATTICE_C, speed = 0.25, className }: LatticeProps) {
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

        const loop = (now: number) => {
            const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
            last = now;
            debt += dt * speed * boost * x.length;
            for (; debt >= 1; debt--) {
                const flipped = step(x, cols, rows, c);
                if (flipped >= 0) dots[flipped].classList.toggle(styles.down, x[flipped] < 0);
            }
            raf = requestAnimationFrame(loop);
        };

        const io = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            last = 0;
            if (entry.isIntersecting) raf = requestAnimationFrame(loop);
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
        };
    }, [seed, cols, rows, c, speed]);

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
                />
            ))}
        </svg>
    );
}
