"use client";
import { useState, type PointerEvent } from 'react';
import ProjectFigure, { FigureSlider, INSET, figureStyles as styles, tween, useIntro, useSize, useTerm, useVisible } from './ProjectFigure';

// Δ is the reward margin: how much more the policy (relative to the
// reference model) prefers the chosen reply to the rejected one, in log-prob
const D_MAX = 30;
const L_MAX = 4;
const B_MIN = 0.02;
const B_MAX = 0.5;

/** −log σ(z), computed without overflow at either end. */
const softplusNeg = (z: number) => (z > 0 ? Math.log1p(Math.exp(-z)) : -z + Math.log1p(Math.exp(z)));

/**
 * Fig. 6: the DPO objective, loss = −log σ(β·Δ). A pair the policy gets wrong
 * (Δ < 0) costs about β·|Δ| and is pushed hardest; one it gets right fades
 * toward zero. β sets how sharply: small β is a gentle slope, large β a hinge.
 * Every curve passes through log 2 at Δ = 0, where the policy is indifferent.
 * On opening, the probe runs from a badly wrong pair to a clearly right one.
 */
export default function DpoLoss() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const [beta, setBeta] = useState(0.1);
    const [probe, setProbe] = useState<number | null>(null);
    const visible = useVisible(ref);
    const term = useTerm();
    const stopIntro = useIntro(visible, () =>
        tween(2000, (t) => setProbe(Math.round((-1 + 2 * t) * D_MAX * 2) / 2), { delay: 500 }),
    );

    const bottom = height - INSET.bottom;
    const x = (d: number) => ((d + D_MAX) / (2 * D_MAX)) * width;
    const y = (l: number) => bottom - (Math.min(l, L_MAX) / L_MAX) * (bottom - INSET.top);
    const loss = (d: number) => softplusNeg(beta * d);

    let curve = '';
    for (let i = 0; i <= 200; i++) {
        const d = -D_MAX + (2 * D_MAX * i) / 200;
        curve += `${i ? 'L' : 'M'}${x(d).toFixed(1)} ${y(loss(d)).toFixed(1)}`;
    }

    const d = probe ?? 0;
    const point = { x: x(d), y: y(loss(d)) };

    const onPointer = (e: PointerEvent<SVGSVGElement>) => {
        stopIntro();
        const box = e.currentTarget.getBoundingClientRect();
        const frac = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
        setProbe(Math.round((frac * 2 - 1) * D_MAX * 2) / 2);
    };

    return (
        <ProjectFigure
            n={6}
            title="DPO loss"
            readout={`Δ ${d.toFixed(1).padStart(5)}  loss ${loss(d).toFixed(2)}`}
            controls={
                <FigureSlider
                    id="dpo-beta"
                    label="β"
                    min={B_MIN}
                    max={B_MAX}
                    step={0.01}
                    value={beta}
                    onChange={(v) => {
                        stopIntro();
                        setBeta(v);
                    }}
                    display={beta.toFixed(2)}
                />
            }
        >
            <svg
                ref={ref}
                className={`${styles.svg} ${styles.probe}`}
                role="img"
                aria-label={`DPO loss against reward margin at β ${beta.toFixed(2)}: ${loss(-D_MAX).toFixed(1)} at Δ −${D_MAX}, log 2 at 0, ${loss(D_MAX).toFixed(2)} at Δ ${D_MAX}.`}
                onPointerMove={onPointer}
                onPointerDown={onPointer}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setProbe(null)}
            >
                {width > 0 && (
                    <>
                        <line className={styles.floor} x1={0} x2={width} y1={bottom + 0.5} y2={bottom + 0.5} />
                        <g {...term('margin')}>
                            <line
                                className={styles.guide}
                                x1={Math.round(x(0)) + 0.5}
                                x2={Math.round(x(0)) + 0.5}
                                y1={INSET.top}
                                y2={bottom}
                            />
                            <text className={styles.text} x={0} y={height - 4}>
                                −{D_MAX}
                            </text>
                            <text className={styles.text} x={x(0)} y={height - 4} textAnchor="middle">
                                Δ 0
                            </text>
                            <text className={styles.text} x={width} y={height - 4} textAnchor="end">
                                {D_MAX}
                            </text>
                        </g>
                        <g {...term('loss')}>
                            <path className={styles.curve} d={curve} />
                            <text className={styles.text} x={0} y={INSET.top - 4}>
                                loss {L_MAX}
                            </text>
                            <text className={styles.text} x={width} y={bottom - 6} textAnchor="end">
                                0
                            </text>
                        </g>
                        <g {...term('loss', 'margin')}>
                            <circle className={styles.dot} cx={point.x} cy={point.y} r={3} />
                        </g>
                    </>
                )}
            </svg>
        </ProjectFigure>
    );
}
