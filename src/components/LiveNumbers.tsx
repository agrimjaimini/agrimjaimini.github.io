"use client";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { HARDWARE, MAX_LOG_BATCH, attainable, fmtRate, setRoofline, useRoofline } from '@/lib/roofline';
import styles from './LiveNumbers.module.css';

const STEP_PX = 14; // drag this far for each doubling

/**
 * The decode batch, as a number in a sentence that can be dragged left and
 * right (or set with arrow keys) in doublings from 1 to 1024. It's the same
 * setting as Fig. 4's batch slider, so the figure follows when it's open.
 */
export function BatchNumber() {
    const { logBatch } = useRoofline();
    const drag = useRef<{ x: number; from: number } | null>(null);
    const [dragging, setDragging] = useState(false);

    const set = (v: number) => setRoofline({ logBatch: Math.min(MAX_LOG_BATCH, Math.max(0, v)) });

    const onPointerDown = (e: PointerEvent<HTMLSpanElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, from: logBatch };
        setDragging(true);
    };
    const onPointerEnd = () => {
        drag.current = null;
        setDragging(false);
    };
    const onPointerMove = (e: PointerEvent<HTMLSpanElement>) => {
        if (!drag.current) return;
        set(drag.current.from + Math.round((e.clientX - drag.current.x) / STEP_PX));
    };
    const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
        const by = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (by === undefined) return;
        e.preventDefault();
        set(logBatch + by);
    };

    return (
        <span
            className={styles.drag}
            role="slider"
            tabIndex={0}
            aria-label="Decode batch size"
            aria-valuemin={1}
            aria-valuemax={2 ** MAX_LOG_BATCH}
            aria-valuenow={2 ** logBatch}
            data-dragging={dragging || undefined}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onKeyDown={onKeyDown}
        >
            {2 ** logBatch}
        </span>
    );
}

/** The chip the batch runs on, with its article: "an H100", "a TPU v5e". */
export function ChipName() {
    const { chip } = useRoofline();
    return (
        <>
            {HARDWARE[chip].article} {HARDWARE[chip].name}
        </>
    );
}

/** What decode reaches at that batch on that chip, in TFLOP/s. */
export function DecodeRate() {
    const { chip, logBatch } = useRoofline();
    return <span className={styles.value}>{fmtRate(attainable(chip, 2 ** logBatch))}</span>;
}
