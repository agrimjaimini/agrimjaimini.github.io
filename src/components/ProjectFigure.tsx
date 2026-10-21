"use client";
import React, { createContext, useContext, useEffect, useEffectEvent, useRef, useState } from 'react';
import field from './IsingField.module.css';
import styles from './ProjectFigure.module.css';

export { styles as figureStyles };

/** The figure part the reader is pointing at in the entry's text, if any. */
export const FocusContext = createContext<string | null>(null);

/**
 * Props for a group of figure parts named by one or more terms: while the
 * reader points at a different term in the text, the group steps back.
 */
export function useTerm() {
    const focus = useContext(FocusContext);
    return (...names: string[]) => ({
        'data-term': names.join(' '),
        'data-dim': focus && !names.includes(focus) ? '' : undefined,
    });
}

/** Room at the top and bottom of a plot for its labels, as in Fig. 2. */
export const INSET = { top: 16, bottom: 22 };

/** A plot's size in CSS pixels, so an SVG figure draws its text at the real size. */
export function useSize<T extends Element>() {
    const ref = useRef<T>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    return [ref, size] as const;
}

/** Whether an element is on screen, so a figure's loop can pause when it isn't. */
export function useVisible<T extends Element>(ref: React.RefObject<T | null>) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        io.observe(el);
        return () => io.disconnect();
    }, [ref]);
    return visible;
}

/** Ease in and out, for a figure's opening move. */
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Run `frame` with eased progress from 0 to 1 over `ms`, after `delay` ms.
 * Returns a function that cancels it.
 */
export function tween(ms: number, frame: (t: number) => void, { delay = 0, done }: { delay?: number; done?: () => void } = {}) {
    let raf = 0;
    let start: number | null = null;
    const step = (now: number) => {
        start ??= now;
        const t = Math.min(1, (now - start) / ms);
        frame(easeInOut(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else done?.();
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
    return () => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
    };
}

/**
 * A figure's opening move, like Fig. 1's nucleation: the first time it comes
 * into view, `start` acts out the figure's point once, then hands it over.
 * Skipped under reduced motion. Call the returned function when the reader
 * takes a control, so the move stops rather than fights them.
 */
export function useIntro(visible: boolean, start: () => () => void) {
    const played = useRef(false);
    const cancel = useRef<(() => void) | null>(null);
    const begin = useEffectEvent(start);
    useEffect(() => {
        if (!visible || played.current) return;
        played.current = true;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        cancel.current = begin();
    }, [visible]);
    useEffect(() => () => cancel.current?.(), []);
    return () => {
        cancel.current?.();
        cancel.current = null;
    };
}

/**
 * A slider in Fig. 1's style: a hairline track and an ink thumb over a
 * transparent native range input, which handles dragging, keys, and screen readers.
 */
export function FigureSlider({
    id,
    label,
    min,
    max,
    step = 'any',
    value,
    onChange,
    display,
    valueText,
}: {
    id: string;
    label: string;
    min: number;
    max: number;
    step?: number | 'any';
    value: number;
    onChange: (value: number) => void;
    /** What the value reads as beside the track. */
    display: string;
    /** The same, for screen readers, when the raw value isn't it (e.g. a log scale). */
    valueText?: string;
}) {
    const frac = (value - min) / (max - min);
    return (
        <div className={styles.control}>
            <label className={styles.controlLabel} htmlFor={id}>
                {label}
            </label>
            <span className={field.sliderWrap}>
                <span className={field.track} aria-hidden />
                <span
                    className={field.thumb}
                    aria-hidden
                    style={{ left: `calc((100% - 11px) * ${frac})`, transform: 'translateY(-50%)' }}
                />
                <input
                    id={id}
                    className={field.slider}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    aria-valuetext={valueText}
                />
            </span>
            <span className={styles.value}>{display}</span>
        </div>
    );
}

/**
 * A figure inside a project's entry, numbered and captioned like Fig. 1:
 * the plot, any controls under it, then "Fig. n" with a live readout across.
 */
export default function ProjectFigure({
    n,
    title,
    readout,
    controls,
    children,
}: {
    n: number;
    title: string;
    readout?: React.ReactNode;
    controls?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <figure className={styles.figure}>
            <div className={styles.plot}>{children}</div>
            {controls}
            <figcaption className={styles.caption}>
                <span className={styles.label}>
                    <span>Fig. {n}</span>
                    <span>{title}</span>
                </span>
                {readout && (
                    <span className={styles.readout}>
                        {readout}
                    </span>
                )}
            </figcaption>
        </figure>
    );
}
