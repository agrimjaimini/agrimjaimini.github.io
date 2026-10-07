"use client";
import { useEffect, useRef } from 'react';
import styles from './SignalField.module.css';

const GAP = 10;
const RADIUS = 1.1;
const BOOT_SPEED = 900; // px per second for the load-in sweep
const RIPPLE_SPEED = 260; // px per second
const RIPPLE_LIFE = 1.8; // seconds

/**
 * A quiet field of dots with slow interfering waves running through it.
 * It sweeps in from the center on load, brightens under the pointer,
 * and sends a ripple outward wherever it's clicked.
 */
export default function SignalField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = true;
        let raf = 0;
        let bootStart: number | null = null;
        const pointer = { x: -1e4, y: -1e4, strength: 0 };
        const ripples: { x: number; y: number; t: number }[] = [];
        let colors = { ink: '#000', accent: '#000' };

        const readColors = () => {
            const style = getComputedStyle(document.documentElement);
            colors = {
                ink: style.getPropertyValue('--text-primary').trim(),
                accent: style.getPropertyValue('--accent').trim(),
            };
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (t: number) => {
            ctx.clearRect(0, 0, width, height);
            const cols = Math.ceil(width / GAP);
            const rows = Math.ceil(height / GAP);
            const offsetX = (width - (cols - 1) * GAP) / 2;
            const offsetY = (height - (rows - 1) * GAP) / 2;
            const cx = width / 2;
            const cy = height / 2;
            const boot = bootStart === null ? Infinity : (t - bootStart) * BOOT_SPEED;

            for (let i = ripples.length - 1; i >= 0; i--) {
                if (t - ripples[i].t > RIPPLE_LIFE) ripples.splice(i, 1);
            }

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = offsetX + c * GAP;
                    const y = offsetY + r * GAP;

                    // Load-in: dots appear as a ring sweeps out from the center
                    const fromCenter = Math.hypot(x - cx, (y - cy) * 2);
                    const appear = Math.min(1, Math.max(0, (boot - fromCenter) / 120));
                    if (appear <= 0) continue;

                    const wave =
                        Math.sin(c * 0.16 + t * 0.55) +
                        Math.sin(r * 0.34 - t * 0.4 + c * 0.05) +
                        Math.sin((c + r) * 0.07 + t * 0.25);
                    // Normalize to 0..1, then keep only the crests for a crisp pattern
                    const n = (wave + 3) / 6;
                    const k = Math.min(1, Math.max(0, (n - 0.42) / 0.5));
                    let v = k * k * (3 - 2 * k);

                    const near = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 110) * pointer.strength;
                    v += near * near * 0.9;

                    for (const ripple of ripples) {
                        const age = t - ripple.t;
                        const ring = Math.abs(Math.hypot(x - ripple.x, y - ripple.y) - age * RIPPLE_SPEED);
                        if (ring < 16) v += (1 - ring / 16) * (1 - age / RIPPLE_LIFE);
                    }
                    v = Math.min(1, v);

                    // Only a sparse, stable subset of crest dots picks up the accent
                    const peak = v > 0.95 && (c * 7 + r * 13) % 5 === 0;
                    ctx.globalAlpha = (0.1 + v * (peak ? 0.9 : 0.6)) * appear;
                    ctx.fillStyle = peak ? colors.accent : colors.ink;
                    ctx.beginPath();
                    ctx.arc(x, y, RADIUS + (peak ? 0.25 : 0), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const loop = (now: number) => {
            const t = now / 1000;
            if (bootStart === null) bootStart = t;
            frame++;
            if (frame % 45 === 0) readColors();
            pointer.strength += ((pointer.x > -1e3 ? 1 : 0) - pointer.strength) * 0.08;
            draw(t);
            if (visible) raf = requestAnimationFrame(loop);
        };

        const local = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMove = (e: PointerEvent) => {
            const p = local(e);
            pointer.x = p.x;
            pointer.y = p.y;
        };
        const onLeave = () => {
            pointer.x = -1e4;
            pointer.y = -1e4;
        };
        const onDown = (e: PointerEvent) => {
            ripples.push({ ...local(e), t: performance.now() / 1000 });
            if (ripples.length > 4) ripples.shift();
        };

        readColors();
        resize();

        if (reduced) {
            draw(0);
            return;
        }

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            if (visible) raf = requestAnimationFrame(loop);
        });
        io.observe(canvas);

        const ro = new ResizeObserver(resize);
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

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
