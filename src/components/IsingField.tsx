"use client";
import { useEffect, useRef } from 'react';
import Term from './Term';
import styles from './IsingField.module.css';

const GAP = 10;
const RADIUS = 1.1;
// Critical inverse temperature of the 2D square-lattice Ising model: ln(1 + √2) / 2 ≈ 0.4407
const C_CRITICAL = Math.log(1 + Math.SQRT2) / 2;
const CYCLE = 54; // seconds for one sweep of c through the critical point and back
const SWEEPS_PER_SECOND = 7; // |V(G)| proposals per sweep
const BOOT_SPEED = 900; // px per second for the load-in sweep
const QUENCH_LIFE = 2.4; // seconds a click keeps its spot cold

/**
 * Fig. 1: the Ising model sampled by MCMC, following the 23 Mar 2026 lecture.
 *
 * A state x : V(G) → {±1} assigns a spin to every vertex of the grid graph G,
 * with weight w(x) = exp(c · Σ_{(u,v)∈E(G)} x(u)·x(v)) and inverse temperature c.
 * Glauber dynamics proposes relabeling one uniformly random vertex r
 * (K_xy = 1/|V(G)|), and Metropolis–Hastings accepts with probability
 * min{1, w(y)/w(x)} = min{1, exp(c · (y(r) − x(r)) · Σ_{(r,v)∈∂r} x(v))}.
 */
export default function IsingField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cRef = useRef<HTMLSpanElement>(null);
    const stepsRef = useRef<HTMLSpanElement>(null);
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
        let steps = 0; // time step t: total proposals made
        let proposed = 0; // proposals since the last readout
        let accepted = 0;
        let acceptance = 0;
        let last = 0;
        let frame = 0;
        let visible = true;
        let raf = 0;
        let bootStart: number | null = null;
        const pointer = { x: -1e4, y: -1e4, strength: 0 };
        const quenches: { x: number; y: number; t: number }[] = [];
        let ink = '#000';

        const readColors = () => {
            ink = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
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
        const globalC = (t: number) => {
            const s = Math.sin((t / CYCLE) * Math.PI * 2);
            const shaped = Math.sign(s) * Math.pow(Math.abs(s), 1.6);
            return C_CRITICAL + shaped * (shaped > 0 ? 0.18 : 0.08);
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

        // One sweep = |V(G)| steps of the chain
        const sweep = (t: number) => {
            const n = x.length;
            for (let k = 0; k < n; k++) {
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
            steps += n;
        };

        const draw = (t: number, ease: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = ink;
            const cx = width / 2;
            const cy = height / 2;
            const boot = bootStart === null ? Infinity : (t - bootStart) * BOOT_SPEED;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const i = row * cols + col;
                    const px = offsetX + col * GAP;
                    const py = offsetY + row * GAP;

                    // Relabels fade rather than blink
                    shown[i] += ((x[i] > 0 ? 1 : 0) - shown[i]) * ease;

                    const appear = Math.min(1, Math.max(0, (boot - Math.hypot(px - cx, (py - cy) * 2)) / 120));
                    if (appear <= 0) continue;

                    const v = shown[i];
                    ctx.globalAlpha = (0.07 + v * 0.72) * appear;
                    ctx.beginPath();
                    ctx.arc(px, py, RADIUS + v * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const compact = (n: number) =>
            n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}k` : String(n);

        const updateReadout = () => {
            if (proposed > 0) {
                acceptance = accepted / proposed;
                proposed = 0;
                accepted = 0;
            }
            const trend = c > lastC + 0.0004 ? '↑' : c < lastC - 0.0004 ? '↓' : ' ';
            lastC = c;
            if (cRef.current) cRef.current.textContent = `c ${c.toFixed(3)} ${trend}`;
            if (stepsRef.current) stepsRef.current.textContent = `t ${compact(steps)}`;
            if (acceptRef.current) acceptRef.current.textContent = `accept ${(acceptance * 100).toFixed(0)}%`;
        };

        const loop = (now: number) => {
            const t = now / 1000;
            if (bootStart === null) bootStart = t;
            const dt = Math.min(0.05, last ? t - last : 0);
            last = t;
            frame++;
            if (frame % 45 === 0) readColors();
            if (frame % 12 === 0) updateReadout();

            for (let i = quenches.length - 1; i >= 0; i--) {
                if (t - quenches[i].t > QUENCH_LIFE) quenches.splice(i, 1);
            }
            pointer.strength += ((pointer.x > -1e3 ? 1 : 0) - pointer.strength) * 0.06;
            c = globalC(t);

            sweepDebt += dt * SWEEPS_PER_SECOND;
            while (sweepDebt >= 1) {
                sweep(t);
                sweepDebt -= 1;
            }

            draw(t, 1 - Math.exp(-dt * 4.5));
            if (visible) raf = requestAnimationFrame(loop);
        };

        const local = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMove = (e: PointerEvent) => Object.assign(pointer, local(e));
        const onLeave = () => Object.assign(pointer, { x: -1e4, y: -1e4 });
        const onDown = (e: PointerEvent) => {
            quenches.push({ ...local(e), t: performance.now() / 1000 });
            if (quenches.length > 4) quenches.shift();
        };

        readColors();
        layout();

        // Burn-in: run the chain before the first frame so it opens near equilibrium
        c = globalC(performance.now() / 1000);
        for (let i = 0; i < 80; i++) sweep(0);
        for (let i = 0; i < x.length; i++) shown[i] = x[i] > 0 ? 1 : 0;

        if (reduced) {
            // Run the chain for a while just above c* and show a still frame
            c = C_CRITICAL + 0.03;
            for (let i = 0; i < 300; i++) sweep(0);
            draw(0, 1);
            updateReadout();
            return;
        }

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            last = 0;
            if (visible) raf = requestAnimationFrame(loop);
        });
        io.observe(canvas);

        let lastWidth = canvas.clientWidth;
        const ro = new ResizeObserver(() => {
            if (canvas.clientWidth === lastWidth) return;
            lastWidth = canvas.clientWidth;
            layout();
        });
        ro.observe(canvas);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerleave', onLeave);
        canvas.addEventListener('pointerdown', onDown);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
            canvas.removeEventListener('pointerdown', onDown);
        };
    }, []);

    return (
        <figure className={styles.figure}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
            <figcaption className={styles.label}>
                <Term
                    title="Ising model, sampled by MCMC"
                    meta="CS 4850"
                    wide
                    beside
                    lines={[
                        'A state x : V(G) → {±1} labels every vertex of the grid. Bright is +1, faint is −1.',
                        'Its weight is w(x) = exp(c · Σ x(u)x(v)) over the edges, with c the inverse temperature. Z is intractable, so we sample π = w/Z with a Markov chain.',
                        'Glauber dynamics: propose relabeling one random vertex r, then accept with probability min{1, w(y)/w(x)} (Metropolis–Hastings). Else, stay at x.',
                        'c drifts through ≈ 0.44, where noise gives way to aligned domains. Your cursor lowers c; a click raises it.',
                    ]}
                >
                    Fig. 1
                </Term>
                <span className={styles.subtitle}>Ising model</span>
            </figcaption>
            <div className={styles.stats} aria-hidden>
                <span ref={cRef}>c {C_CRITICAL.toFixed(3)}</span>
                <span ref={stepsRef} className={styles.extra}>t 0</span>
                <span ref={acceptRef}>accept 0%</span>
            </div>
        </figure>
    );
}
