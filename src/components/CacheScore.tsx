"use client";
import { useContext, useEffect, useRef, useState, type PointerEvent } from 'react';
import ProjectFigure, {
    FocusContext, FigureSlider, figureStyles as styles, tween, useIntro, useSize, useTerm, useVisible } from './ProjectFigure';

/** A cached research result: where it sits in embedding space, how old it is, how good the judge found it. */
interface Memory {
    id: number;
    x: number; // 0–1 across the plot
    y: number; // 0–1 down the plot
    born: number; // day it was researched (negative: before the figure opened)
    quality: number; // 0–1
}

const SIGMA = 0.16; // similarity falls off over this distance, in plot heights
const THRESHOLD = 0.5; // a score at or above this is served from the cache
const DAYS_PER_SECOND = 1;
const MAX_MEMORIES = 40; // the oldest is evicted past this

/** A small seeded generator, so the cache looks the same on every visit. */
const mulberry32 = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Memories gather around a few topics, some researched lately and some long ago. */
function seedCache(): Memory[] {
    const rand = mulberry32(7);
    const topics = [
        { x: 0.18, y: 0.35, age: 4 },
        { x: 0.42, y: 0.7, age: 40 },
        { x: 0.62, y: 0.3, age: 12 },
        { x: 0.84, y: 0.62, age: 75 },
    ];
    const memories: Memory[] = [];
    topics.forEach((topic) => {
        for (let k = 0; k < 7; k++) {
            const angle = rand() * Math.PI * 2;
            const r = Math.sqrt(rand()) * 0.13;
            memories.push({
                id: memories.length,
                x: Math.min(0.97, Math.max(0.03, topic.x + Math.cos(angle) * r * 0.6)),
                y: Math.min(0.92, Math.max(0.08, topic.y + Math.sin(angle) * r * 1.4)),
                born: -topic.age * (0.6 + rand() * 0.8),
                quality: 0.55 + rand() * 0.45,
            });
        }
    });
    return memories;
}

type Point = { x: number; y: number };

/** Every memory's score for a query: similarity × freshness × quality. */
function score(memories: Memory[], at: Point, aspect: number, today: number, halfLife: number) {
    return memories.map((m) => {
        const dx = (m.x - at.x) * aspect;
        const dy = m.y - at.y;
        const similarity = Math.exp(-(dx * dx + dy * dy) / (2 * SIGMA * SIGMA));
        return { m, score: similarity * 0.5 ** ((today - m.born) / halfLife) * m.quality };
    });
}

/** Research a miss: the answer is cached right where the query was, fresh. A hit changes nothing. */
function research(memories: Memory[], at: Point, aspect: number, today: number, halfLife: number) {
    if (Math.max(...score(memories, at, aspect, today, halfLife).map((s) => s.score)) >= THRESHOLD) return memories;
    const id = Math.max(...memories.map((m) => m.id)) + 1;
    const quality = 0.7 + ((id * 0.618) % 1) * 0.3;
    return [...memories, { id, ...at, born: today, quality }].slice(-MAX_MEMORIES);
}

const START = { x: 0.2, y: 0.4 }; // on a fresh topic: a hit
const STALE = { x: 0.82, y: 0.6 }; // on a topic researched months ago

/**
 * Fig. 3: how Lore decides whether a query can be answered from the cache.
 * Each cached memory scores similarity × freshness × quality: similarity
 * falls off with distance from the query in embedding space, freshness halves
 * every half-life, and quality is an LLM judge's grade (dot size). The best
 * score wins; at or above the threshold it's served (a hit), below it the
 * query is researched again and the result cached where the query was. Move
 * the query to search; click a miss to research it. Memories age as you watch.
 * On opening, the query moves from a fresh topic (a hit) to a stale one (a
 * miss) and researches it.
 */
export default function CacheScore() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const visible = useVisible(ref);
    const term = useTerm();
    const focus = useContext(FocusContext);
    const [memories, setMemories] = useState(seedCache);
    const [query, setQuery] = useState<Point>(START);
    const [halfLife, setHalfLife] = useState(30);
    const [today, setToday] = useState(0);
    const clock = useRef(0);

    useEffect(() => {
        if (!visible || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf = 0;
        let last = performance.now();
        const loop = (now: number) => {
            clock.current += (Math.min(now - last, 100) / 1000) * DAYS_PER_SECOND;
            last = now;
            setToday(clock.current);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [visible]);

    const aspect = height ? width / height : 1;
    const freshness = (m: Memory) => 0.5 ** ((today - m.born) / halfLife);
    const scored = score(memories, query, aspect, today, halfLife);
    const best = scored.reduce((a, b) => (b.score > a.score ? b : a), scored[0]);
    const hit = best.score >= THRESHOLD;

    const stopIntro = useIntro(visible, () => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const stop = tween(
            1200,
            (t) => setQuery({ x: START.x + (STALE.x - START.x) * t, y: START.y + (STALE.y - START.y) * t }),
            {
                delay: 700,
                done: () => {
                    timer = setTimeout(() => setMemories((ms) => research(ms, STALE, aspect, clock.current, halfLife)), 700);
                },
            },
        );
        return () => {
            stop();
            clearTimeout(timer);
        };
    });

    const place = (e: PointerEvent<SVGSVGElement>) => {
        stopIntro();
        const box = e.currentTarget.getBoundingClientRect();
        const at = {
            x: Math.min(1, Math.max(0, (e.clientX - box.left) / box.width)),
            y: Math.min(1, Math.max(0, (e.clientY - box.top) / box.height)),
        };
        setQuery(at);
        return at;
    };

    const ask = (e: PointerEvent<SVGSVGElement>) => {
        const at = place(e);
        setMemories(research(memories, at, aspect, today, halfLife));
    };

    const px = (m: { x: number; y: number }) => ({ x: m.x * width, y: m.y * height });
    const q = px(query);
    const b = px(best.m);
    // The distance at which even a perfect, brand-new memory falls below the threshold
    const reach = SIGMA * Math.sqrt(2 * Math.log(1 / THRESHOLD)) * height;
    const bestAge = Math.round(today - best.m.born);

    return (
        <ProjectFigure
            n={3}
            title="Cache score"
            readout={`${hit ? 'hit ' : 'miss'}  score ${best.score.toFixed(2)}`}
            controls={
                <FigureSlider
                    id="lore-half-life"
                    label="half-life"
                    min={5}
                    max={90}
                    step={1}
                    value={halfLife}
                    onChange={(v) => {
                        stopIntro();
                        setHalfLife(v);
                    }}
                    display={`${halfLife}d`}
                    valueText={`${halfLife} days`}
                />
            }
        >
            <svg
                ref={ref}
                className={`${styles.svg} ${styles.probe}`}
                role="img"
                aria-label={`${memories.length} cached memories. The best match for the query scores ${best.score.toFixed(2)}, so it's ${hit ? 'served from the cache' : 'researched again'}.`}
                onPointerMove={(e) => e.pointerType === 'mouse' && place(e)}
                onPointerDown={ask}
            >
                {width > 0 && (
                    <>
                        <g {...term('similarity')}>
                            {/* How far a query can reach: past this, nothing can score a hit */}
                            <circle className={styles.guide} cx={q.x} cy={q.y} r={reach} fill="none" />
                            <line
                                className={hit ? styles.curve : styles.guide}
                                x1={q.x}
                                y1={q.y}
                                x2={b.x}
                                y2={b.y}
                            />
                            {/* The query */}
                            <line className={styles.floor} x1={q.x - 5} x2={q.x + 5} y1={q.y} y2={q.y} />
                            <line className={styles.floor} x1={q.x} x2={q.x} y1={q.y - 5} y2={q.y + 5} />
                        </g>

                        {/* Fresh memories are full dots, stale ones faint, like up and down spins; size is
                            quality. Pointing at freshness or quality in the text shows that one alone. */}
                        <g {...term('freshness', 'quality')}>
                            {scored.map(({ m }) => (
                                <circle
                                    key={m.id}
                                    className={`${styles.dot} ${styles.appear}`}
                                    cx={m.x * width}
                                    cy={m.y * height}
                                    r={focus === 'freshness' ? 2.6 : 1.4 + 2 * m.quality}
                                    style={{ opacity: focus === 'quality' ? 0.9 : 0.12 + 0.88 * freshness(m) }}
                                />
                            ))}
                        </g>

                        <g {...term('threshold')}>
                            <circle className={styles.ring} cx={b.x} cy={b.y} r={7} style={{ opacity: hit ? 1 : 0.4 }} />
                            <text
                                className={styles.text}
                                x={b.x + (b.x > width - 50 ? -11 : 11)}
                                y={b.y + 4}
                                textAnchor={b.x > width - 50 ? 'end' : 'start'}
                            >
                                {focus === 'threshold' ? `${best.score.toFixed(2)} ${hit ? '≥' : '<'} ${THRESHOLD}` : `${bestAge}d`}
                            </text>
                        </g>
                    </>
                )}
            </svg>
        </ProjectFigure>
    );
}
