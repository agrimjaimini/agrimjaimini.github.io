"use client";
import { HARDWARE, MAX_LOG_BATCH, attainable as reach, fmtRate as fmt, setRoofline, useRoofline } from '@/lib/roofline';
import ProjectFigure, { FigureSlider, INSET, figureStyles as styles, tween, useIntro, useSize, useTerm, useVisible } from './ProjectFigure';

// Both axes are log scale: arithmetic intensity (FLOP per byte moved) across,
// attainable TFLOP/s up
const I_MIN = 0.5;
const I_MAX = 8192;
const P_MIN = 0.25;
const P_MAX = 2000;
const PROMPT = 2048; // tokens in the prefill pass
const INTRO_TO = 9; // the opening sweep carries decode to a batch of 512

/**
 * Fig. 4: a roofline, the model Trace-Accel uses to call a workload compute-
 * or memory-bound. Attainable throughput is min(peak, bandwidth × intensity).
 * A bf16 weight is 2 bytes and costs 2 FLOPs per token it's used for, so a
 * pass's intensity is about the tokens it shares each weight load across:
 * the prompt's length for prefill, the batch for decode. (Weights only; the
 * KV cache's own traffic is left out.) On opening, the batch sweeps from 1
 * to 512 and decode climbs the bandwidth roof past the ridge; the batch is
 * shared with the draggable number in the Trace-Accel sentence.
 */
export default function Roofline() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const visible = useVisible(ref);
    const term = useTerm();
    const { chip, logBatch } = useRoofline();
    const stopIntro = useIntro(visible, () =>
        tween(1800, (t) => setRoofline({ logBatch: Math.round(t * INTRO_TO) }), { delay: 500 }),
    );
    const setChip = (k: number) => {
        stopIntro();
        setRoofline({ chip: k });
    };
    const setLogBatch = (v: number) => {
        stopIntro();
        setRoofline({ logBatch: v });
    };

    const hw = HARDWARE[chip];
    const batch = 2 ** logBatch;
    const ridge = hw.tflops / hw.tbps;
    const attainable = (i: number) => reach(chip, i);
    const bound = batch < ridge ? 'memory-bound' : 'compute-bound';

    const bottom = height - INSET.bottom;
    const x = (i: number) => (Math.log(i / I_MIN) / Math.log(I_MAX / I_MIN)) * width;
    const y = (p: number) => bottom - (Math.log(p / P_MIN) / Math.log(P_MAX / P_MIN)) * (bottom - INSET.top);

    // The roof in its two parts: bandwidth's slope, then compute's flat peak
    const slope = `M0 ${y(attainable(I_MIN))} L${x(ridge)} ${y(hw.tflops)}`;
    const peak = `M${x(ridge)} ${y(hw.tflops)} L${width} ${y(hw.tflops)}`;
    const decode = { x: x(batch), y: y(attainable(batch)) };
    const prefill = { x: x(PROMPT), y: y(attainable(PROMPT)) };
    const labelLeft = decode.x > width * 0.5;

    return (
        <ProjectFigure
            n={4}
            title="Roofline"
            readout={
                // The hardware sits in the caption row, so the figure has one control row
                <span className={styles.options} role="group" aria-label="Hardware">
                    {HARDWARE.map((h, k) => (
                        <button
                            key={h.name}
                            className={styles.option}
                            aria-pressed={k === chip}
                            onClick={() => setChip(k)}
                            title={`${h.tbps} TB/s, ${h.tflops} TFLOP/s`}
                        >
                            {h.name}
                        </button>
                    ))}
                </span>
            }
            controls={
                <FigureSlider
                    id="roofline-batch"
                    label="batch"
                    min={0}
                    max={MAX_LOG_BATCH}
                    step={1}
                    value={logBatch}
                    onChange={setLogBatch}
                    display={String(batch)}
                    valueText={`Decode batch of ${batch}`}
                />
            }
        >
            <svg
                ref={ref}
                className={styles.svg}
                role="img"
                aria-label={`Roofline for ${hw.name}: decode at batch ${batch} reaches ${fmt(attainable(batch))} TFLOP/s and is ${bound}; prefill reaches ${fmt(attainable(PROMPT))} TFLOP/s.`}
            >
                {width > 0 && (
                    <>
                        <line className={styles.floor} x1={0} x2={width} y1={bottom + 0.5} y2={bottom + 0.5} />
                        <g {...term('ridge')}>
                            <line
                                className={styles.guide}
                                x1={Math.round(x(ridge)) + 0.5}
                                x2={Math.round(x(ridge)) + 0.5}
                                y1={INSET.top}
                                y2={bottom}
                            />
                            <text className={styles.text} x={x(ridge)} y={height - 4} textAnchor="middle">
                                ridge {ridge.toFixed(0)}
                            </text>
                        </g>
                        <path {...term('bandwidth', 'ridge')} className={styles.curve} d={slope} />
                        <path {...term('compute', 'ridge')} className={styles.curve} d={peak} />

                        <g {...term('prefill', 'compute')}>
                            <circle className={styles.dot} cx={prefill.x} cy={prefill.y} r={3} />
                            <text className={styles.text} x={prefill.x} y={prefill.y - 9} textAnchor="middle">
                                prefill
                            </text>
                        </g>
                        <g {...term('decode', batch < ridge ? 'bandwidth' : 'compute')}>
                            <circle className={styles.dot} cx={decode.x} cy={decode.y} r={3} />
                            {/* Left of the middle the label sits below and right, under the slope;
                                past it, above and left, where the roof leaves room */}
                            <text
                                className={styles.text}
                                x={decode.x + (labelLeft ? -7 : 7)}
                                y={decode.y + (labelLeft ? -9 : 14)}
                                textAnchor={labelLeft ? 'end' : 'start'}
                            >
                                decode, {bound}
                            </text>
                        </g>

                        <text className={styles.text} x={0} y={height - 4}>
                            {I_MIN}
                        </text>
                        <text className={styles.text} x={width} y={height - 4} textAnchor="end">
                            {I_MAX} FLOP/B
                        </text>
                    </>
                )}
            </svg>
        </ProjectFigure>
    );
}
