"use client";
import { useEffect, useRef } from 'react';
import Term from './Term';
import { THEME_EVENT } from './ThemeToggle';
import styles from './IsingField.module.css';

const GAP = 10;
const RADIUS = 1.1;
const T_CRITICAL = 2 / Math.log(1 + Math.SQRT2); // ≈ 2.269 for the 2D square lattice
const CYCLE = 44; // seconds for one hot → cold → hot sweep
const SWEEPS_PER_SECOND = 12; // Metropolis sweeps (one attempt per site each)
const BOOT_SPEED = 900; // px per second for the load-in sweep
const QUENCH_LIFE = 2.4; // seconds a click keeps its spot cold
const FIELD_LIFE = 1.6; // seconds a theme change applies an external field
const HISTORY = 56; // sparkline samples

/**
 * Fig. 1: the 2D Ising model, sampled with Metropolis MCMC.
 * Bright dots are up spins, faint dots are down. Temperature drifts slowly
 * across the critical point; the cursor adds local heat, a click cools a
 * spot, and switching themes briefly applies an external magnetic field.
 */
export default function IsingField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparkRef = useRef<HTMLCanvasElement>(null);
    const tempRef = useRef<HTMLSpanElement>(null);
    const magRef = useRef<HTMLSpanElement>(null);
    const phaseRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        const spark = sparkRef.current;
        const sctx = spark?.getContext('2d') ?? null;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let offsetX = 0;
        let offsetY = 0;
        let spins = new Int8Array(0);
        let shown = new Float32Array(0);
        let sweepDebt = 0;
        let temperature = T_CRITICAL;
        let lastTemperature = T_CRITICAL;
        let last = 0;
        let frame = 0;
        let visible = true;
        let raf = 0;
        let bootStart: number | null = null;
        let field = { h: 0, t: -1e9 };
        const history: number[] = [];
        let sampleClock = 0;
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

            if (spark && sctx) {
                spark.width = spark.clientWidth * dpr;
                spark.height = spark.clientHeight * dpr;
                sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            cols = Math.max(8, Math.floor(width / GAP));
            rows = Math.max(5, Math.floor(height / GAP));
            offsetX = (width - (cols - 1) * GAP) / 2;
            offsetY = (height - (rows - 1) * GAP) / 2;
            spins = new Int8Array(cols * rows);
            shown = new Float32Array(cols * rows);
            for (let i = 0; i < spins.length; i++) {
                spins[i] = Math.random() < 0.5 ? 1 : -1;
                shown[i] = spins[i] > 0 ? 1 : 0;
            }
        };

        // Lingers near the critical point, with brief, gentle visits to hot and cold
        const globalTemperature = (t: number) => {
            const s = Math.sin((t / CYCLE) * Math.PI * 2);
            const shaped = Math.sign(s) * Math.pow(Math.abs(s), 1.6);
            return T_CRITICAL + shaped * (shaped > 0 ? 0.7 : 0.85);
        };

        const localTemperature = (c: number, r: number, t: number) => {
            const x = offsetX + c * GAP;
            const y = offsetY + r * GAP;
            let T = temperature;
            if (pointer.strength > 0.01) {
                const near = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 70);
                T += near * near * 3.5 * pointer.strength;
            }
            for (const q of quenches) {
                const age = (t - q.t) / QUENCH_LIFE;
                const near = Math.max(0, 1 - Math.hypot(x - q.x, y - q.y) / 60);
                T -= near * (1 - age) * 2.2;
            }
            return Math.max(0.4, T);
        };

        // One Metropolis sweep: propose a flip at random sites and accept with
        // probability min(1, e^(−ΔE/T)). Periodic boundaries; h is an external field.
        const sweep = (t: number) => {
            const age = (t - field.t) / FIELD_LIFE;
            const h = age < 1 ? field.h * (1 - age) : 0;
            const n = spins.length;
            for (let k = 0; k < n; k++) {
                const c = (Math.random() * cols) | 0;
                const r = (Math.random() * rows) | 0;
                const i = r * cols + c;
                const neighbors =
                    spins[r * cols + ((c + 1) % cols)] +
                    spins[r * cols + ((c - 1 + cols) % cols)] +
                    spins[((r + 1) % rows) * cols + c] +
                    spins[((r - 1 + rows) % rows) * cols + c];
                const dE = 2 * spins[i] * (neighbors + h);
                if (dE <= 0 || Math.random() < Math.exp(-dE / localTemperature(c, r, t))) {
                    spins[i] = -spins[i] as -1 | 1;
                }
            }
        };

        const magnetization = () => {
            let sum = 0;
            for (let i = 0; i < spins.length; i++) sum += spins[i];
            return sum / spins.length;
        };

        const draw = (t: number, ease: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = ink;
            const cx = width / 2;
            const cy = height / 2;
            const boot = bootStart === null ? Infinity : (t - bootStart) * BOOT_SPEED;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const i = r * cols + c;
                    const x = offsetX + c * GAP;
                    const y = offsetY + r * GAP;

                    // Flips fade rather than blink
                    shown[i] += ((spins[i] > 0 ? 1 : 0) - shown[i]) * ease;

                    const appear = Math.min(1, Math.max(0, (boot - Math.hypot(x - cx, (y - cy) * 2)) / 120));
                    if (appear <= 0) continue;

                    const v = shown[i];
                    ctx.globalAlpha = (0.07 + v * 0.72) * appear;
                    ctx.beginPath();
                    ctx.arc(x, y, RADIUS + v * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const drawSpark = () => {
            if (!spark || !sctx) return;
            const w = spark.clientWidth;
            const h = spark.clientHeight;
            sctx.clearRect(0, 0, w, h);
            sctx.fillStyle = ink;
            const step = w / (HISTORY - 1);
            history.forEach((m, i) => {
                sctx.globalAlpha = 0.25 + 0.75 * (i / HISTORY);
                sctx.beginPath();
                sctx.arc(i * step, 1.5 + (1 - Math.abs(m)) * (h - 3), 1, 0, Math.PI * 2);
                sctx.fill();
            });
            sctx.globalAlpha = 1;
        };

        const updateReadout = () => {
            const m = magnetization();
            const trend = temperature > lastTemperature + 0.002 ? '↑' : temperature < lastTemperature - 0.002 ? '↓' : ' ';
            lastTemperature = temperature;
            if (tempRef.current) tempRef.current.textContent = `T ${temperature.toFixed(2)} ${trend}`;
            if (magRef.current) magRef.current.textContent = `m ${Math.abs(m).toFixed(2)}`;
            if (phaseRef.current) {
                const d = temperature - T_CRITICAL;
                phaseRef.current.textContent = d < -0.15 ? 'ordered' : d > 0.15 ? 'disordered' : 'critical';
            }
        };

        const loop = (now: number) => {
            const t = now / 1000;
            if (bootStart === null) bootStart = t;
            const dt = Math.min(0.05, last ? t - last : 0);
            last = t;
            frame++;
            if (frame % 45 === 0) readColors();
            if (frame % 12 === 0) updateReadout();

            sampleClock += dt;
            if (sampleClock > 0.35) {
                sampleClock = 0;
                history.push(magnetization());
                if (history.length > HISTORY) history.shift();
                drawSpark();
            }

            for (let i = quenches.length - 1; i >= 0; i--) {
                if (t - quenches[i].t > QUENCH_LIFE) quenches.splice(i, 1);
            }
            pointer.strength += ((pointer.x > -1e3 ? 1 : 0) - pointer.strength) * 0.06;
            temperature = globalTemperature(t);

            sweepDebt += dt * SWEEPS_PER_SECOND;
            while (sweepDebt >= 1) {
                sweep(t);
                sweepDebt -= 1;
            }

            draw(t, 1 - Math.exp(-dt * 6));
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
        // Theme switch → a brief external field: spins align toward the new "ink"
        const onTheme = (e: Event) => {
            const dark = (e as CustomEvent<{ dark: boolean }>).detail?.dark;
            field = { h: dark ? 1.2 : -1.2, t: performance.now() / 1000 };
        };

        readColors();
        layout();

        if (reduced) {
            // Equilibrate just below the critical point and show a still frame
            temperature = T_CRITICAL - 0.15;
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
        window.addEventListener(THEME_EVENT, onTheme);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
            canvas.removeEventListener('pointerdown', onDown);
            window.removeEventListener(THEME_EVENT, onTheme);
        };
    }, []);

    return (
        <figure className={styles.figure}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
            <figcaption className={styles.label}>
                <Term
                    title="The Ising model"
                    meta="CS 4850"
                    wide
                    lines={[
                        'Each dot is a tiny magnet, up (bright) or down (faint), that wants to match its neighbors.',
                        'Heat fights that. Above T ≈ 2.27 it dissolves into noise; below it, large aligned domains form. That tipping point is a phase transition.',
                        'It runs on Metropolis MCMC: propose a random flip, accept it with probability exp(−ΔE/T). The Markov chain settles into the right distribution.',
                        'Your cursor adds heat. Click to cool a spot.',
                    ]}
                >
                    Fig. 1
                </Term>
                <span className={styles.subtitle}>Ising model</span>
            </figcaption>
            <div className={styles.stats} aria-hidden>
                <span ref={tempRef}>T {T_CRITICAL.toFixed(2)}</span>
                <span ref={magRef}>m 0.00</span>
                <span ref={phaseRef} className={styles.phase}>critical</span>
                <canvas ref={sparkRef} className={styles.spark} />
            </div>
        </figure>
    );
}
