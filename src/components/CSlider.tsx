"use client";
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { C_CRITICAL } from '@/lib/ising';
import { getLiveC, getManualC, setManualC, subscribeManualC } from '@/lib/isingFeed';
import styles from './IsingField.module.css';

export const SLIDER_MIN = 0.2;
export const SLIDER_MAX = 0.8;
const THUMB = 11; // px, matches .thumb and the native thumb in IsingField.module.css

/**
 * A slider for Fig. 1's inverse temperature c. Every copy (under Fig. 1 and
 * under Fig. 2) sets the same shared value, so they move together; at rest
 * the thumb follows c as it drifts. The native range input handles dragging,
 * keys, and screen readers; it's transparent, and the visible thumb is drawn
 * with a sub-pixel transform so it glides instead of hopping pixel to pixel.
 */
export default function CSlider({ id }: { id: string }) {
    const manual = useSyncExternalStore(subscribeManualC, getManualC, () => null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const thumbRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const thumb = thumbRef.current;
        if (!slider || !thumb) return;
        let raf = 0;

        const loop = () => {
            // The shared value, or the drift; set on the input too, so the copy
            // not being dragged reports the same c to keys and screen readers
            const c = getManualC() ?? getLiveC() ?? C_CRITICAL;
            slider.value = String(c);
            const frac = (c - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN);
            // Same geometry as the native thumb: its center travels from r to width − r
            thumb.style.transform = `translate3d(${frac * (slider.clientWidth - THUMB)}px, -50%, 0)`;
            raf = requestAnimationFrame(loop);
        };

        // Only follow c while the slider is on screen
        const io = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            if (entry.isIntersecting) raf = requestAnimationFrame(loop);
        });
        io.observe(slider);
        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
        };
    }, []);

    return (
        <div className={styles.control}>
            <label className={styles.controlLabel} htmlFor={id}>
                c
            </label>
            <span className={styles.sliderWrap}>
                <span className={styles.track} aria-hidden />
                <span ref={thumbRef} className={styles.thumb} aria-hidden />
                <input
                    id={id}
                    className={styles.slider}
                    type="range"
                    min={SLIDER_MIN}
                    max={SLIDER_MAX}
                    step="any"
                    ref={sliderRef}
                    defaultValue={C_CRITICAL}
                    onChange={(e) => setManualC(Number(e.target.value))}
                    aria-label="Inverse temperature c"
                />
            </span>
            <span className={styles.controlHint}>
                {manual === null ? (
                    'drag to set'
                ) : (
                    <button className={styles.reset} onClick={() => setManualC(null)}>
                        auto
                    </button>
                )}
            </span>
        </div>
    );
}
