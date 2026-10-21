"use client";
import { useEffect, useRef, useState } from 'react';
import ProjectFigure, { INSET, figureStyles as styles, useSize, useTerm, useVisible } from './ProjectFigure';

/** A spec split into tasks; each waits for the tasks it depends on to merge. */
interface Task {
    id: string;
    deps: string[];
    /** Seconds of work in its worktree. */
    work: number;
    /** Times review sends it back before it passes. */
    rejects?: number;
    /** Where it sits: its dependency layer, and how far down that layer. */
    layer: number;
    row: number;
}

const TASKS: Task[] = [
    { id: 'a', deps: [], work: 2.2, layer: 1, row: 0.1 },
    { id: 'b', deps: [], work: 1.5, layer: 1, row: 0.5 },
    { id: 'c', deps: [], work: 2.9, layer: 1, row: 0.9 },
    { id: 'd', deps: ['a', 'b'], work: 1.7, rejects: 1, layer: 2, row: 0.3 },
    { id: 'e', deps: ['c'], work: 1.3, layer: 2, row: 0.8 },
    { id: 'f', deps: ['d', 'e'], work: 1.6, layer: 3, row: 0.5 },
];

const WORKERS = 3;
const SPEC = 0.8; // seconds to split the spec
const REVIEW = 0.8; // seconds in review
const REWORK = 0.5; // share of the work redone after a rejection
const HOLD = 2.6; // seconds to rest on the finished graph before starting over
const FADE = 0.6;

interface Span {
    kind: 'work' | 'review';
    start: number;
    end: number;
}

/** Run the schedule once, ahead of time: when each task works, waits in review, and merges. */
function schedule() {
    const spans: Record<string, Span[]> = {};
    const merged: Record<string, number> = {};
    const free = Array(WORKERS).fill(SPEC);
    const pending = [...TASKS];

    while (pending.length) {
        // The next task whose dependencies are all merged, on the first free worker
        const ready = pending
            .filter((t) => t.deps.every((d) => d in merged))
            .map((t) => ({ t, at: Math.max(...t.deps.map((d) => merged[d]), SPEC) }))
            .sort((p, q) => p.at - q.at)[0];
        const w = free.indexOf(Math.min(...free));
        let at = Math.max(ready.at, free[w]);
        const runs: Span[] = [];
        for (let pass = 0; pass <= (ready.t.rejects ?? 0); pass++) {
            const work = pass ? ready.t.work * REWORK : ready.t.work;
            runs.push({ kind: 'work', start: at, end: at + work });
            runs.push({ kind: 'review', start: at + work, end: at + work + REVIEW });
            at += work + REVIEW;
        }
        spans[ready.t.id] = runs;
        merged[ready.t.id] = at;
        free[w] = at;
        pending.splice(pending.indexOf(ready.t), 1);
    }

    const order = TASKS.map((t) => t.id).sort((p, q) => merged[p] - merged[q]);
    const done = Math.max(...Object.values(merged));
    return { spans, merged, order, period: done + HOLD + FADE };
}

const PLAN = schedule();

type State = { kind: 'waiting' } | { kind: 'work'; progress: number } | { kind: 'review' } | { kind: 'merged'; since: number };

function stateAt(id: string, t: number): State {
    if (t >= PLAN.merged[id]) return { kind: 'merged', since: t - PLAN.merged[id] };
    const span = PLAN.spans[id].find((s) => t >= s.start && t < s.end);
    if (!span) return { kind: 'waiting' };
    if (span.kind === 'review') return { kind: 'review' };
    return { kind: 'work', progress: (t - span.start) / (span.end - span.start) };
}

// Under reduced motion the graph holds still mid-run: two merged, one back
// from review, the rest in progress or waiting
const STILL = PLAN.spans.d[1].start + 0.3;

/**
 * Fig. 2: Trellis running a spec. The spec splits into tasks; up to three run
 * at once, each in its own worktree (the ring is its progress). A finished
 * task goes to review (an open ring), which can send it back, and merges into
 * main below once it passes. Dependencies light up as they merge.
 */
export default function TaskGraph() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const visible = useVisible(ref);
    const term = useTerm();
    // Mounted only when its entry opens, so it can check the setting up front
    const [t, setT] = useState(() => (matchMedia('(prefers-reduced-motion: reduce)').matches ? STILL : 0));
    const clock = useRef(0);

    useEffect(() => {
        if (!visible || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf = 0;
        let last = performance.now();
        const loop = (now: number) => {
            // Time only runs while the figure is on screen
            clock.current = (clock.current + Math.min(now - last, 100) / 1000) % PLAN.period;
            last = now;
            setT(clock.current);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [visible]);

    const trunk = height - INSET.bottom;
    const band = { top: INSET.top + 4, bottom: trunk - 34 };
    const pos = (layer: number, row: number) => ({
        x: 16 + layer * (width - 32) * 0.29,
        y: band.top + row * (band.bottom - band.top),
    });
    const spec = pos(0, 0.5);
    const at = Object.fromEntries(TASKS.map((task) => [task.id, pos(task.layer, task.row)]));
    const states = Object.fromEntries(TASKS.map((task) => [task.id, stateAt(task.id, t)]));
    const commitX = (k: number) => width * (0.3 + (k * 0.66) / (TASKS.length - 1));

    const running = TASKS.filter((task) => states[task.id].kind === 'work' || states[task.id].kind === 'review').length;
    const merged = TASKS.filter((task) => states[task.id].kind === 'merged').length;
    const fading = t > PLAN.period - FADE;
    const specDone = t >= SPEC;

    return (
        <ProjectFigure n={2} title="Task graph" readout={`running ${running}  merged ${merged}/${TASKS.length}`}>
            <svg
                ref={ref}
                className={`${styles.svg} ${styles.tall}`}
                role="img"
                aria-label="A spec splits into six dependent tasks. Up to three run at once, each passes review before it merges into main, and one is sent back once."
            >
                {width > 0 && (
                    <g className={styles.whole} style={{ opacity: fading ? 0 : 1 }}>
                        {/* Dependencies: the spec feeds the first layer, then task to task */}
                        {TASKS.map((task) =>
                            (task.deps.length ? task.deps : ['spec']).map((dep) => {
                                const from = dep === 'spec' ? spec : at[dep];
                                const to = at[task.id];
                                const done = dep === 'spec' ? specDone : states[dep].kind === 'merged';
                                return (
                                    <g key={`${dep}-${task.id}`} {...term(dep === 'spec' ? 'spec' : 'tasks')}>
                                        <line
                                            className={styles.edge}
                                            data-done={done || undefined}
                                            x1={from.x}
                                            y1={from.y}
                                            x2={to.x}
                                            y2={to.y}
                                        />
                                    </g>
                                );
                            }),
                        )}

                        {/* main, with a commit for each merge in order */}
                        <g {...term('main')}>
                            <line className={styles.floor} x1={0} x2={width} y1={trunk + 0.5} y2={trunk + 0.5} />
                            {PLAN.order.map((id, k) => {
                                const state = states[id];
                                const since = state.kind === 'merged' ? state.since : -1;
                                return (
                                    <g key={id}>
                                        {/* A dashed drop from the task to its commit, just as it merges */}
                                        <line
                                            className={styles.drop}
                                            x1={at[id].x}
                                            y1={at[id].y + 6}
                                            x2={commitX(k)}
                                            y2={trunk - 4}
                                            style={{ opacity: since >= 0 && since < 0.9 ? 1 : 0 }}
                                        />
                                        <circle
                                            className={`${styles.dot} ${styles.node}`}
                                            cx={commitX(k)}
                                            cy={trunk + 0.5}
                                            r={2.5}
                                            style={{ opacity: since >= 0 ? 1 : 0, transform: `scale(${since >= 0 ? 1 : 0.4})` }}
                                        />
                                    </g>
                                );
                            })}
                            <text className={styles.text} x={0} y={height - 4}>
                                main
                            </text>
                        </g>

                        <g {...term('spec')}>
                            <circle
                                className={`${styles.dot} ${styles.node}`}
                                cx={spec.x}
                                cy={spec.y}
                                r={3.5}
                                style={{ opacity: specDone ? 1 : 0.5 }}
                            />
                            <text className={styles.text} x={spec.x} y={spec.y + 20} textAnchor="middle">
                                spec
                            </text>
                        </g>

                        {TASKS.map((task) => {
                            const state = states[task.id];
                            const { x, y } = at[task.id];
                            const full = state.kind === 'merged';
                            const waiting = state.kind === 'waiting';
                            return (
                                <g key={task.id}>
                                    {/* Waiting dots are faint and small, like down spins; merged ones full */}
                                    <g {...term('tasks')}>
                                        <circle
                                            className={`${styles.dot} ${styles.node}`}
                                            cx={x}
                                            cy={y}
                                            r={3.5}
                                            style={{
                                                opacity: full ? 1 : waiting ? 0.25 : 0.55,
                                                transform: `scale(${waiting ? 0.6 : 1})`,
                                            }}
                                        />
                                    </g>
                                    {/* Work draws a ring around the dot; review is the closed ring, dashed */}
                                    <g {...term('review', 'tasks')}>
                                        <circle
                                            className={styles.ring}
                                            cx={x}
                                            cy={y}
                                            r={7}
                                            pathLength={1}
                                            transform={`rotate(-90 ${x} ${y})`}
                                            strokeDasharray={state.kind === 'review' ? '0.04 0.04' : '1 1'}
                                            strokeDashoffset={state.kind === 'work' ? 1 - state.progress : 0}
                                            style={{ opacity: state.kind === 'work' || state.kind === 'review' ? 1 : 0 }}
                                        />
                                    </g>
                                </g>
                            );
                        })}
                    </g>
                )}
            </svg>
        </ProjectFigure>
    );
}
