"use client";
import { useState } from 'react';
import ProjectFigure, { FigureSlider, INSET, figureStyles as styles, tween, useIntro, useSize, useTerm, useVisible } from './ProjectFigure';

const GROUP = 32; // candidate proofs sampled per theorem, as in DeepSeek-Prover-V1.5
const STEPS = 6; // the longest proof's steps
const DONE = STEPS + 1; // past the last step: every proof is checked and pushed
const A_MAX = 5.5; // the most a proof can move: one pass in 32 earns +5.48

/** A small seeded generator, so the group looks the same on every visit. */
const mulberry32 = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Each proof's length, the step where Lean rejects it if it fails, and its
    turn to pass as the slider admits more: a stand-in group, not model output. */
const PROOFS = (() => {
    const rand = mulberry32(11);
    const proofs = Array.from({ length: GROUP }, () => {
        const steps = 3 + Math.floor(rand() * (STEPS - 2));
        return { steps, failAt: Math.floor(rand() * steps), rank: 0, key: rand() };
    });
    [...proofs].sort((a, b) => a.key - b.key).forEach((p, i) => (p.rank = i));
    return proofs;
})();

/**
 * The advantage each proof gets when `k` of the group verify: its reward
 * (1 or 0) minus the group's mean, over the group's standard deviation
 * (unbiased, as torch.std computes it). A group that all passes or all
 * fails has no spread, and every advantage is 0.
 */
function advantages(k: number) {
    if (k === 0 || k === GROUP) return { pass: 0, fail: 0 };
    const mean = k / GROUP;
    const std = Math.sqrt((k * (GROUP - k)) / (GROUP * (GROUP - 1)));
    return { pass: (1 - mean) / std, fail: -mean / std };
}

const signed = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ' '}${Math.abs(v).toFixed(2)}`;

/**
 * Fig. 5: one round of EuclidRL's GRPO. Each column is one of 32 sampled
 * proofs of a theorem, a dot per step. Lean checks them a step at a time:
 * a proof that closes every goal fills in, and one Lean rejects is marked
 * where it broke and fades past it. That verdict is the reward, 1 or 0, and
 * each proof then moves by its advantage, measured from the group's mean
 * (the dashed line): a rare pass rises far and the failures barely sink,
 * and a group that all passes or all fails doesn't move. On opening, Lean
 * checks the group once.
 */
export default function ProofCheck() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const [k, setK] = useState(3);
    // How many steps Lean has checked; DONE once the group has moved
    // (Under reduced motion there's no opening, so the group starts checked)
    const [scan, setScan] = useState(() =>
        typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches ? DONE : 0,
    );
    const visible = useVisible(ref);
    const term = useTerm();
    const stopIntro = useIntro(visible, () => {
        let timer = 0;
        const stop = tween(2200, (t) => setScan(Math.min(STEPS, Math.floor(t * (STEPS + 1)))), {
            delay: 500,
            done: () => (timer = window.setTimeout(() => setScan(DONE), 450)),
        });
        return () => {
            stop();
            clearTimeout(timer);
        };
    });

    // Steps sit closer, and smaller, on a phone's shorter plot; the room left is the reach
    const pitch = height < 150 ? 6 : 8;
    const dot = height < 150 ? 1.25 : 1.5;
    const unit = (height - INSET.bottom - INSET.top - (STEPS - 1) * pitch) / (2 * A_MAX);
    const mean = INSET.top + A_MAX * unit;
    const a = advantages(k);
    const moved = scan === DONE;

    return (
        <ProjectFigure
            n={5}
            title="Proof check"
            readout={moved ? `pass ${k ? signed(a.pass) : '    –'}  fail ${k < GROUP ? signed(a.fail) : '    –'}` : 'checking'}
            controls={
                <FigureSlider
                    id="proof-pass"
                    label="proved"
                    min={0}
                    max={GROUP}
                    step={1}
                    value={k}
                    onChange={(v) => {
                        stopIntro();
                        setScan(DONE);
                        setK(v);
                    }}
                    display={`${k}/${GROUP}`}
                    valueText={`${k} of ${GROUP} proofs verify`}
                />
            }
        >
            <svg
                ref={ref}
                className={styles.svg}
                role="img"
                aria-label={`${GROUP} proofs of one theorem, checked by Lean: ${k} verify. Each passing proof moves ${signed(a.pass).trim()} from the group's mean, each failing one ${signed(a.fail).trim()}.`}
            >
                {width > 0 && (
                    <>
                        <g {...term('group')}>
                            <text className={styles.text} x={0} y={INSET.top - 4}>
                                {GROUP} proofs of one theorem
                            </text>
                        </g>
                        <g {...term('reward')}>
                            <text className={styles.text} x={0} y={height - 4}>
                                checked by Lean, step by step
                            </text>
                        </g>
                        <g {...term('advantage')}>
                            <line className={styles.guide} x1={0} x2={width} y1={Math.round(mean) + 0.5} y2={Math.round(mean) + 0.5} />
                        </g>
                        <g {...term('group', 'reward', 'advantage')}>
                            {PROOFS.map((proof, i) => {
                                const passes = proof.rank < k;
                                const shift = moved ? (passes ? a.pass : a.fail) * unit : 0;
                                return (
                                    <g
                                        key={i}
                                        className={styles.column}
                                        style={{ transform: `translate(${((i + 0.5) / GROUP) * width}px, ${mean - shift}px)` }}
                                    >
                                        {Array.from({ length: proof.steps }, (_, s) => (
                                            <circle
                                                key={s}
                                                className={`${styles.dot} ${styles.step}`}
                                                // Lean stops at the step it rejects, so the rest go with it
                                                data-state={
                                                    !passes && scan > proof.failAt && s >= proof.failAt
                                                        ? s === proof.failAt
                                                            ? 'fail'
                                                            : 'dead'
                                                        : s < scan
                                                          ? 'ok'
                                                          : 'wait'
                                                }
                                                cy={s * pitch}
                                                r={dot}
                                            />
                                        ))}
                                    </g>
                                );
                            })}
                        </g>
                    </>
                )}
            </svg>
        </ProjectFigure>
    );
}
