"use client";
import { useEffect, useRef } from 'react';
import styles from './SignalField.module.css';

const GAP = 10;
const RADIUS = 1.1;

/**
 * A quiet field of dots with slow interfering waves running through it.
 * The pointer brightens nearby dots; the strongest peaks pick up the accent.
 */
export default function SignalField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const readoutRef = useRef<HTMLSpanElement>(null);

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
        const pointer = { x: -1e4, y: -1e4, strength: 0 };
        let colors = { ink: '#000', accent: '#f00' };

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

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = offsetX + c * GAP;
                    const y = offsetY + r * GAP;

                    const wave =
                        Math.sin(c * 0.16 + t * 0.55) +
                        Math.sin(r * 0.34 - t * 0.4 + c * 0.05) +
                        Math.sin((c + r) * 0.07 + t * 0.25);
                    // Normalize to 0..1, then keep only the crests for a crisp pattern
                    const n = (wave + 3) / 6;
                    const k = Math.min(1, Math.max(0, (n - 0.42) / 0.5));
                    let v = k * k * (3 - 2 * k);

                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 110) * pointer.strength;
                    v = Math.min(1, v + near * near * 0.9);

                    // Only a sparse, stable subset of crest dots picks up the accent
                    const peak = v > 0.95 && ((c * 7 + r * 13) % 5 === 0);
                    ctx.globalAlpha = 0.1 + v * (peak ? 0.9 : 0.6);
                    ctx.fillStyle = peak ? colors.accent : colors.ink;
                    ctx.beginPath();
                    ctx.arc(x, y, RADIUS + (peak ? 0.25 : 0), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const loop = (now: number) => {
            frame++;
            if (frame % 45 === 0) readColors();
            pointer.strength += ((pointer.x > -1e3 ? 1 : 0) - pointer.strength) * 0.08;
            draw(now / 1000);
            if (visible) raf = requestAnimationFrame(loop);
        };

        const readout = readoutRef.current;
        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
            if (readout) {
                const x = Math.round(pointer.x / GAP).toString().padStart(2, '0');
                const y = Math.round(pointer.y / GAP).toString().padStart(2, '0');
                readout.textContent = `x ${x}  y ${y}`;
                readout.dataset.visible = 'true';
            }
        };
        const onLeave = () => {
            pointer.x = -1e4;
            pointer.y = -1e4;
            if (readout) readout.dataset.visible = 'false';
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

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
            {/* Cursor position in grid units, like an instrument readout */}
            <span ref={readoutRef} className={styles.readout} data-visible="false" aria-hidden />
        </div>
    );
}
