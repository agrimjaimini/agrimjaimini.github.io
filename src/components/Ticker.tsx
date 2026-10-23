"use client";
import { useLayoutEffect, useRef } from 'react';
import styles from './Ticker.module.css';

// Each digit is a strip of 0–9 repeated, so it can roll either way and keep
// going; it rests in the middle copy and is moved back there when it nears an end
const COPIES = 5;
const LINES = COPIES * 10;

type Digit = { strip: HTMLSpanElement; index: number };
type Slot = Digit | Text;

const isDigit = (ch: string) => ch >= '0' && ch <= '9';

/** For each character, whether the number it belongs to rose (1), fell (−1), or neither. */
function directions(from: string, to: string) {
    const dirs = new Array<number>(to.length).fill(0);
    for (const m of to.matchAll(/\d[\d.]*/g)) {
        const start = m.index;
        const end = start + m[0].length;
        const dir = Math.sign(parseFloat(m[0]) - parseFloat(from.slice(start, end)));
        dirs.fill(dir, start, end);
    }
    return dirs;
}

/**
 * Turns `host` into a readout whose digits roll to each new value, like a
 * price ticker: up when the number rises, down when it falls. Text in between
 * (labels, units, arrows) is swapped in place. When the layout of digits
 * changes (9 → 10), the readout is rebuilt without rolling.
 */
export function createTicker(host: HTMLElement) {
    let text = '';
    let slots: Slot[] = [];

    const place = (d: Digit) => {
        d.strip.style.transform = `translateY(${(-d.index / LINES) * 100}%)`;
    };

    // Move a digit a whole copy along its strip without visibly moving it,
    // even mid-roll: same digit, same spot, `shift` lines further on
    const rebase = (d: Digit, shift: number) => {
        const line = d.strip.offsetHeight / LINES;
        const now = getComputedStyle(d.strip).transform;
        const y = now === 'none' ? 0 : new DOMMatrixReadOnly(now).m42;
        d.strip.style.transition = 'none';
        d.strip.style.transform = `translateY(${y - shift * line}px)`;
        void d.strip.offsetHeight;
        d.strip.style.transition = '';
        d.index += shift;
    };

    const build = (next: string) => {
        host.textContent = '';
        slots = Array.from(next, (ch) => {
            if (!isDigit(ch)) return host.appendChild(document.createTextNode(ch));
            const col = document.createElement('span');
            col.className = styles.digit;
            const ghost = document.createElement('span');
            ghost.className = styles.ghost;
            ghost.textContent = '0';
            const strip = document.createElement('span');
            strip.className = styles.strip;
            strip.textContent = Array.from({ length: LINES }, (_, i) => i % 10).join('\n');
            col.append(ghost, strip);
            host.appendChild(col);
            const d = { strip, index: Math.floor(COPIES / 2) * 10 + Number(ch) };
            place(d);
            return d;
        });
    };

    const set = (next: string) => {
        if (next === text) return;
        const sameShape =
            next.length === text.length && Array.from(next).every((ch, i) => isDigit(ch) === isDigit(text[i]));
        if (!sameShape) {
            build(next);
            text = next;
            return;
        }
        const dirs = directions(text, next);
        slots.forEach((slot, i) => {
            if (slot instanceof Text) {
                if (slot.nodeValue !== next[i]) slot.nodeValue = next[i];
                return;
            }
            const from = slot.index % 10;
            const to = Number(next[i]);
            if (from === to) return;
            const steps = dirs[i] < 0 ? -((from - to + 10) % 10) : (to - from + 10) % 10;
            if (slot.index + steps < 10) rebase(slot, 10);
            else if (slot.index + steps >= LINES - 10) rebase(slot, -10);
            slot.index += steps;
            place(slot);
        });
        text = next;
    };

    return { set };
}

/** A readout string whose digits roll when it changes (see createTicker). */
export default function Ticker({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const ticker = useRef<ReturnType<typeof createTicker>>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;
        ticker.current ??= createTicker(ref.current);
        ticker.current.set(value);
    }, [value]);

    return (
        <>
            <span className={styles.hidden}>{value}</span>
            <span ref={ref} aria-hidden />
        </>
    );
}
