"use client";
import { useEffect, useRef } from 'react';
import { C_CRITICAL } from '@/lib/ising';
import { subscribeReadings, type IsingReading } from '@/lib/isingFeed';
import figure from './IsingField.module.css';
import styles from './AgreementPlot.module.css';

// The c slider's range in Fig. 1
const C_MIN = 0.2;
const C_MAX = 0.8;
const TRAIL = 240; // readouts kept: about 48 seconds at five a second
const INSET = { top: 16, bottom: 22 }; // px of room for the labels

/** Complete elliptic integral of the first kind, by the arithmetic–geometric mean. */
const ellipticK = (k: number) => {
    let a = 1;
    let b = Math.sqrt(1 - k * k);
    for (let i = 0; i < 40 && Math.abs(a - b) > 1e-12; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
    return Math.PI / (2 * a);
};

/**
 * The exact share of agreeing neighbors on the infinite grid, from Onsager's
 * solution: the neighbor correlation ⟨x(u)x(v)⟩ = coth(2c)/2 · (1 + (2/π)(2tanh²2c − 1)K(k)),
 * with k = 2sinh(2c)/cosh²(2c), and a pair agrees with probability (1 + ⟨x(u)x(v)⟩)/2.
 */
const exact = (c: number) => {
    const t = Math.tanh(2 * c);
    const k = Math.min(1 - 1e-12, (2 * Math.sinh(2 * c)) / Math.cosh(2 * c) ** 2);
    const correlation = (0.5 / t) * (1 + (2 / Math.PI) * (2 * t * t - 1) * ellipticK(k));
    return (1 + correlation) / 2;
};

const x = (c: number, width: number) => ((c - C_MIN) / (C_MAX - C_MIN)) * width;

/**
 * Fig. 2: how often neighboring dots agree, against c. The curve is the exact
 * answer for an infinite grid (random spins agree half the time, so the axis
 * runs from 50% to 100%); the dots are Fig. 1's own readouts, newest darkest.
 */
export default function AgreementPlot() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const readoutRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const trail: IsingReading[] = [];
        let visible = true;
        let width = 0;
        let height = 0;

        const layout = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            const style = getComputedStyle(document.documentElement);
            const color = (name: string) => style.getPropertyValue(name).trim();
            const gain = Number(color('--spin-gain')) || 1;
            const bottom = height - INSET.bottom;
            // 50% (no order) at the bottom, 100% at the top
            const y = (agree: number) => bottom - (agree - 0.5) * 2 * (bottom - INSET.top);

            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1;

            // The 50% line, and the critical point
            ctx.strokeStyle = color('--border-hover');
            ctx.beginPath();
            ctx.moveTo(0, bottom + 0.5);
            ctx.lineTo(width, bottom + 0.5);
            ctx.stroke();
            const xc = Math.round(x(C_CRITICAL, width)) + 0.5;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.moveTo(xc, INSET.top);
            ctx.lineTo(xc, bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            // The exact curve
            ctx.strokeStyle = color('--text-secondary');
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            for (let i = 0; i <= 240; i++) {
                const c = C_MIN + ((C_MAX - C_MIN) * i) / 240;
                ctx[i ? 'lineTo' : 'moveTo'](x(c, width), y(exact(c)));
            }
            ctx.stroke();

            // Fig. 1's readouts, oldest first so the newest sit on top
            ctx.fillStyle = color('--spin');
            trail.forEach((r, i) => {
                const newest = i === trail.length - 1;
                ctx.globalAlpha = Math.min(1, (newest ? 1 : 0.06 + 0.5 * (i / trail.length)) * gain);
                ctx.beginPath();
                ctx.arc(x(r.c, width), y(r.agree), newest ? 3 : 1.4, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        const unsubscribe = subscribeReadings((reading) => {
            trail.push(reading);
            if (trail.length > TRAIL) trail.shift();
            if (readoutRef.current) readoutRef.current.textContent = `agree ${(reading.agree * 100).toFixed(0)}%`;
            if (visible) draw();
        });

        layout();
        draw();

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) draw();
        });
        io.observe(canvas);
        const ro = new ResizeObserver(() => {
            layout();
            draw();
        });
        ro.observe(canvas);
        // Redraw in the new ink when the theme changes
        const themeObserver = new MutationObserver(draw);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        return () => {
            unsubscribe();
            io.disconnect();
            ro.disconnect();
            themeObserver.disconnect();
        };
    }, []);

    return (
        <figure className={figure.figure}>
            <div className={styles.plot}>
                <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
                <span className={`${styles.axis} ${styles.top}`}>100%</span>
                <span className={`${styles.axis} ${styles.floor}`}>50%</span>
                <span className={`${styles.axis} ${styles.tick}`} style={{ left: 0 }}>{C_MIN.toFixed(1)}</span>
                <span
                    className={`${styles.axis} ${styles.tick} ${styles.critical}`}
                    style={{ left: `${((C_CRITICAL - C_MIN) / (C_MAX - C_MIN)) * 100}%` }}
                >
                    c* {C_CRITICAL.toFixed(3)}
                </span>
                <span className={`${styles.axis} ${styles.tick}`} style={{ right: 0 }}>{C_MAX.toFixed(1)}</span>
            </div>
            <figcaption className={figure.label}>
                <span>Fig. 2</span>
                <span>Neighbors agreeing</span>
            </figcaption>
            <div className={figure.stats} aria-hidden>
                <span ref={readoutRef}>agree</span>
            </div>
        </figure>
    );
}
