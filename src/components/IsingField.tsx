"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { C_CRITICAL } from '@/lib/ising';
import { getManualC, hasReadingListeners, publishReading, setLiveC, setManualC } from '@/lib/isingFeed';
import CSlider from './CSlider';
import styles from './IsingField.module.css';

const GAP = 10;
const RADIUS = 1.1;
const CYCLE = 54; // seconds for one sweep of c through the critical point and back
const SWEEPS_PER_SECOND = 7; // |V(G)| proposals per sweep
const BOOT_SPEED = 900; // px per second for the load-in sweep
const QUENCH_LIFE = 2.4; // seconds a click keeps its spot cold
const MAX_QUENCHES = 32; // a dragged stroke leaves a trail of them
// The opening: a silent field, one flipped spin, and a front that spreads from it
const NUCLEUS_IN = 0.35; // seconds for the quiet field to fade in
const NUCLEUS_HOLD = 0.65; // seconds the single flipped spin sits alone
const FRONT_SPREAD = 2.4; // seconds for the front to cross the field
const FRONT_BAND = 5; // px half-width of the front: about one row of spins
const FRONT_WOBBLE = 0.08; // how far the front strays from a circle, as a fraction of its radius
const FRONT_GRAIN = 3; // px of per-spin roughness along the front

// Slow to start, as the nucleus takes hold; then it runs and settles at the edges
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/**
 * Fig. 1: the Ising model sampled by MCMC, following the 23 Mar 2026 lecture.
 *
 * A state x : V(G) → {±1} assigns a spin to every vertex of the grid graph G,
 * with weight w(x) = exp(c · Σ_{(u,v)∈E(G)} x(u)·x(v)) and inverse temperature c.
 * Glauber dynamics proposes relabeling one uniformly random vertex r
 * (K_xy = 1/|V(G)|), and Metropolis–Hastings accepts with probability
 * min{1, w(y)/w(x)} = min{1, exp(c · (y(r) − x(r)) · Σ_{(r,v)∈∂r} x(v))}.
 */
interface IsingFieldProps {
    /** Point the caption at the write-up; turn off when embedded in that post. */
    linked?: boolean;
    /** Hold c fixed instead of drifting it across the critical point. */
    fixedC?: number;
    /** Sweep the dots in from the center on load (off when morphing in from another page). */
    intro?: boolean;
    /** Show a slider that lets the reader set c by hand. */
    control?: boolean;
    /** Open on a silent field where one flipped spin nucleates a front that
        spreads out and leaves the live state behind it. */
    nucleate?: boolean;
}

export default function IsingField({ linked = true, fixedC, intro = true, control = false, nucleate = false }: IsingFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cRef = useRef<HTMLSpanElement>(null);
    const acceptRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let offsetX = 0;
        let offsetY = 0;
        let x = new Int8Array(0); // the current state: one spin per vertex
        let shown = new Float32Array(0);
        let sweepDebt = 0;
        let c = C_CRITICAL;
        let lastC = C_CRITICAL;
        let proposed = 0; // proposals since the last readout
        let accepted = 0;
        let acceptance = 0;
        let last = 0;
        let frame = 0;
        let visible = true;
        let raf = 0;
        let bootStart: number | null = null;
        // The nucleation opening, while it plays
        let nucleating = false;
        let nucleateStart = 0;
        let equilibrium = new Int8Array(0); // the state the front reveals
        let revealed = new Uint8Array(0);
        let grain = new Float32Array(0); // each spin's fixed offset from the front
        const wobble = [0, 0, 0].map(() => Math.random() * Math.PI * 2); // the front's shape
        const pointer = { x: -1e4, y: -1e4, strength: 0 };
        const quenches: { x: number; y: number; t: number }[] = [];
        let ink = '#000';
        let gain = 1;

        const readColors = () => {
            const root = getComputedStyle(document.documentElement);
            ink = root.getPropertyValue('--spin').trim();
            gain = Number(root.getPropertyValue('--spin-gain')) || 1;
        };

        const layout = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cols = Math.max(8, Math.floor(width / GAP));
            rows = Math.max(5, Math.floor(height / GAP));
            offsetX = (width - (cols - 1) * GAP) / 2;
            offsetY = (height - (rows - 1) * GAP) / 2;
            x = new Int8Array(cols * rows);
            shown = new Float32Array(cols * rows);
            for (let i = 0; i < x.length; i++) {
                x[i] = Math.random() < 0.5 ? 1 : -1;
                shown[i] = x[i] > 0 ? 1 : 0;
            }
        };

        // c lingers near the critical point, with brief, gentle visits to either side
        // Ithaca's clock sets the baseline: coldest (most ordered) near 3 a.m.,
        // warmest near 3 p.m. Refreshed once a minute.
        const ithacaHour = () => {
            const parts = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hourCycle: 'h23',
                timeZone: 'America/New_York',
            }).formatToParts(new Date());
            const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
            return get('hour') + get('minute') / 60;
        };
        let daily = 0;
        let dailyCheckedAt = -Infinity;
        const dailyOffset = (t: number) => {
            if (t - dailyCheckedAt > 60) {
                dailyCheckedAt = t;
                daily = 0.05 * Math.cos(((ithacaHour() - 3) / 24) * Math.PI * 2);
            }
            return daily;
        };

        const globalC = (t: number) => {
            if (fixedC !== undefined) return fixedC;
            // A value set with a slider (this figure's or Fig. 2's) wins over the drift
            const manual = control ? getManualC() : null;
            if (manual !== null) return manual;
            const s = Math.sin((t / CYCLE) * Math.PI * 2);
            const shaped = Math.sign(s) * Math.pow(Math.abs(s), 1.6);
            return C_CRITICAL + dailyOffset(t) + shaped * (shaped > 0 ? 0.12 : 0.08);
        };

        // The cursor heats (lowers c); a click cools (raises c) around it
        const localC = (col: number, row: number, t: number) => {
            const px = offsetX + col * GAP;
            const py = offsetY + row * GAP;
            let local = c;
            if (pointer.strength > 0.01) {
                const near = Math.max(0, 1 - Math.hypot(px - pointer.x, py - pointer.y) / 70);
                local -= near * near * 0.32 * pointer.strength;
            }
            for (const q of quenches) {
                const age = (t - q.t) / QUENCH_LIFE;
                const near = Math.max(0, 1 - Math.hypot(px - q.x, py - q.y) / 60);
                local += near * (1 - age) * 0.45;
            }
            return Math.max(0.02, local);
        };

        // Run `count` steps of the chain (|V(G)| steps make one sweep)
        const run = (count: number, t: number) => {
            for (let k = 0; k < count; k++) {
                // 1. Propose relabeling one uniformly random vertex r: y(r) = −x(r)
                const col = (Math.random() * cols) | 0;
                const row = (Math.random() * rows) | 0;
                const r = row * cols + col;
                const xr = x[r];
                const yr = -xr;

                // Σ_{(r,v)∈∂r} x(v), with the grid wrapped into a torus
                const neighbors =
                    x[row * cols + ((col + 1) % cols)] +
                    x[row * cols + ((col - 1 + cols) % cols)] +
                    x[((row + 1) % rows) * cols + col] +
                    x[((row - 1 + rows) % rows) * cols + col];

                // 2. Accept with probability min{1, w(y)/w(x)}
                const ratio = Math.exp(localC(col, row, t) * (yr - xr) * neighbors);
                proposed++;
                if (ratio >= 1 || Math.random() < ratio) {
                    x[r] = yr;
                    accepted++;
                }
                // 3. Else, remain at x
            }
        };
        const sweep = (t: number) => run(x.length, t);

        // Where the front is: 0 while the nucleus sits alone, null once it has passed
        const frontAt = (e: number) => {
            if (e < NUCLEUS_IN + NUCLEUS_HOLD) return 0;
            const reach = Math.hypot(width / 2, height / 2) * (1 + FRONT_WOBBLE) + FRONT_BAND + FRONT_GRAIN;
            const p = (e - NUCLEUS_IN - NUCLEUS_HOLD) / FRONT_SPREAD;
            return p >= 1 ? null : easeInOut(p) * reach;
        };
        // Ahead of the front, every spin is down; on it, up; behind it, the
        // live state, which the chain is already sampling
        const holdFront = (radius: number) => {
            const cx = width / 2;
            const cy = height / 2;
            const nucleus = Math.round((cy - offsetY) / GAP) * cols + Math.round((cx - offsetX) / GAP);
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const i = row * cols + col;
                    if (radius === 0) {
                        x[i] = i === nucleus ? 1 : -1;
                        continue;
                    }
                    const dx = offsetX + col * GAP - cx;
                    const dy = offsetY + row * GAP - cy;
                    // A domain wall, not a circle: the radius wanders with angle,
                    // and each spin sits a little ahead of or behind it
                    const a = Math.atan2(dy, dx);
                    const shape =
                        0.5 * Math.sin(3 * a + wobble[0]) +
                        0.3 * Math.sin(5 * a + wobble[1]) +
                        0.2 * Math.sin(8 * a + wobble[2]);
                    const d = Math.hypot(dx, dy) - grain[i] * FRONT_GRAIN;
                    const r = radius * (1 + FRONT_WOBBLE * shape);
                    if (d > r + FRONT_BAND) {
                        x[i] = -1;
                    } else if (d > r - FRONT_BAND) {
                        x[i] = 1;
                    } else if (!revealed[i]) {
                        x[i] = equilibrium[i];
                        revealed[i] = 1;
                    }
                }
            }
        };

        // `ease` is the per-frame easing amount toward each dot's target
        const draw = (t: number, ease: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = ink;
            const cx = width / 2;
            const cy = height / 2;
            const boot = bootStart === null || nucleate ? Infinity : (t - bootStart) * BOOT_SPEED;
            // The quiet field fades in before the nucleus appears
            const fieldIn = nucleating ? Math.min(1, (t - nucleateStart) / NUCLEUS_IN) : 1;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const i = row * cols + col;
                    const px = offsetX + col * GAP;
                    const py = offsetY + row * GAP;

                    const target = x[i] > 0 ? 1 : 0;

                    // Relabels fade rather than blink
                    shown[i] += (target - shown[i]) * ease;

                    const appear = Math.min(1, Math.max(0, (boot - Math.hypot(px - cx, (py - cy) * 2)) / 120)) * fieldIn;
                    if (appear <= 0) continue;

                    const v = shown[i];
                    ctx.globalAlpha = Math.min(1, (0.07 + v * 0.72) * gain) * appear;
                    ctx.beginPath();
                    ctx.arc(px, py, RADIUS + v * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const updateReadout = () => {
            if (proposed > 0) {
                acceptance = accepted / proposed;
                proposed = 0;
                accepted = 0;
            }
            const trend = c > lastC + 0.0004 ? '↑' : c < lastC - 0.0004 ? '↓' : ' ';
            lastC = c;
            if (cRef.current) cRef.current.textContent = `c ${c.toFixed(3)} ${trend}`;

            if (acceptRef.current) acceptRef.current.textContent = `accept ${(acceptance * 100).toFixed(0)}%`;

            // How many edges join agreeing spins, for Fig. 2 to plot against c
            // (each vertex's right and lower edge, wrapping around the torus)
            let agree = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const s = x[row * cols + col];
                    if (s === x[row * cols + ((col + 1) % cols)]) agree++;
                    if (s === x[((row + 1) % rows) * cols + col]) agree++;
                }
            }
            publishReading({ c, agree: agree / (2 * x.length) });
        };

        const loop = (now: number) => {
            const t = now / 1000;
            if (bootStart === null) {
                bootStart = intro ? t : -Infinity;
                nucleateStart = t;
            }
            const dt = Math.min(0.05, last ? t - last : 0);
            last = t;
            frame++;
            if (frame % 45 === 0) readColors();
            if (frame % 12 === 0) updateReadout();

            for (let i = quenches.length - 1; i >= 0; i--) {
                if (t - quenches[i].t > QUENCH_LIFE) quenches.splice(i, 1);
            }
            // The cursor stops heating while it draws, or it would melt its own stroke
            pointer.strength += ((pointer.x > -1e3 && !drawing ? 1 : 0) - pointer.strength) * 0.06;
            c = globalC(t);
            // The sliders' thumbs follow this every frame
            if (control) setLiveC(c);

            // Spread the work evenly across frames so the grid evolves a little
            // every frame instead of lurching once per sweep
            sweepDebt += dt * SWEEPS_PER_SECOND * x.length;
            const due = Math.floor(sweepDebt);
            run(due, t);
            sweepDebt -= due;
            if (nucleating) {
                const radius = frontAt(t - nucleateStart);
                if (radius === null) nucleating = false;
                else holdFront(radius);
            }

            // Offscreen, the chain keeps sampling (undrawn) only while Fig. 2 plots it
            if (visible) draw(t, 1 - Math.exp(-dt * 5));
            if (visible || hasReadingListeners()) raf = requestAnimationFrame(loop);
        };

        const local = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        // A click cools its spot; dragging draws up spins and cools the trail,
        // so a stroke holds for a moment before the chain melts it
        let drawing = false;
        const cool = (p: { x: number; y: number }) => {
            quenches.push({ ...p, t: performance.now() / 1000 });
            if (quenches.length > MAX_QUENCHES) quenches.shift();
        };
        const stroke = (p: { x: number; y: number }) => {
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (Math.hypot(offsetX + col * GAP - p.x, offsetY + row * GAP - p.y) <= GAP * 1.2) {
                        x[row * cols + col] = 1;
                    }
                }
            }
            const lastQ = quenches[quenches.length - 1];
            if (!lastQ || Math.hypot(lastQ.x - p.x, lastQ.y - p.y) > GAP * 1.5) cool(p);
        };
        const onMove = (e: PointerEvent) => {
            const p = local(e);
            Object.assign(pointer, p);
            if (drawing) stroke(p);
        };
        const onLeave = () => Object.assign(pointer, { x: -1e4, y: -1e4 });
        const onDown = (e: PointerEvent) => {
            const p = local(e);
            cool(p);
            if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                drawing = true;
                canvas.setPointerCapture(e.pointerId);
            }
        };
        const onUp = () => {
            drawing = false;
        };

        readColors();
        layout();

        // Repaint in the new ink as soon as the theme changes (the theme flip
        // reveals this frame), rather than on the next periodic read
        const onTheme = () => {
            readColors();
            if (reduced) draw(0, 1);
        };
        const themeObserver = new MutationObserver(onTheme);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        const scheme = window.matchMedia('(prefers-color-scheme: dark)');
        scheme.addEventListener('change', onTheme);
        const stopThemeWatch = () => {
            themeObserver.disconnect();
            scheme.removeEventListener('change', onTheme);
        };

        // Burn-in: run the chain before the first frame so it opens near equilibrium
        c = globalC(performance.now() / 1000);
        for (let i = 0; i < 80; i++) sweep(0);
        if (nucleate && intro && !reduced) {
            nucleating = true;
            equilibrium = x.slice();
            revealed = new Uint8Array(x.length);
            grain = Float32Array.from({ length: x.length }, () => Math.random() * 2 - 1);
            holdFront(0);
        }
        for (let i = 0; i < x.length; i++) shown[i] = x[i] > 0 ? 1 : 0;

        if (reduced) {
            // Run the chain for a while just above c* and show a still frame
            c = C_CRITICAL + 0.03;
            for (let i = 0; i < 300; i++) sweep(0);
            draw(0, 1);
            updateReadout();
            return stopThemeWatch;
        }

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            last = 0;
            if (visible || hasReadingListeners()) raf = requestAnimationFrame(loop);
        });
        io.observe(canvas);

        let lastWidth = canvas.clientWidth;
        const ro = new ResizeObserver(() => {
            if (canvas.clientWidth === lastWidth) return;
            lastWidth = canvas.clientWidth;
            layout();
            nucleating = false; // a resize mid-opening just skips to the live state
        });
        ro.observe(canvas);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerleave', onLeave);
        canvas.addEventListener('pointerdown', onDown);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('pointercancel', onUp);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
            canvas.removeEventListener('pointerdown', onDown);
            canvas.removeEventListener('pointerup', onUp);
            canvas.removeEventListener('pointercancel', onUp);
            stopThemeWatch();
            // A hand-set c belongs to this page; the next visit starts drifting again
            if (control) setManualC(null);
        };
    }, [fixedC, intro, nucleate, control]);

    return (
        <figure className={styles.figure}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
            {control && <CSlider id="ising-c" />}
            <figcaption className={styles.label}>
                {linked ? (
                    <Link href="/writing/ising-model" className={styles.figLink}>
                        Fig. 1
                    </Link>
                ) : (
                    <span>Fig. 1</span>
                )}
                <span className={styles.subtitle}>Ising model</span>
            </figcaption>
            <div className={styles.stats} aria-hidden>
                <span ref={cRef}>c {C_CRITICAL.toFixed(3)}</span>
                <span ref={acceptRef}>accept 0%</span>
            </div>
        </figure>
    );
}
