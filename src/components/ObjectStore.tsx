"use client";
import { useState } from 'react';
import ProjectFigure, { INSET, figureStyles as styles, useIntro, useSize, useTerm, useVisible } from './ProjectFigure';

const FILES = ['vcs.ml', 'obj.ml', 'dune'];
const MAX_COMMITS = 4;
const MAX_BLOBS = FILES.length + MAX_COMMITS - 1;

/** A short content address (FNV-1a, standing in for the digest OCaml-Git uses). */
const digest = (content: string) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < content.length; i++) h = Math.imul(h ^ content.charCodeAt(i), 0x01000193);
    return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

interface Blob {
    hash: string;
    file: number;
}

/** A commit and its tree, which lists one blob per file. */
interface Commit {
    hash: string;
    tree: string;
    /** Indices into the blob list, one per file. */
    blobs: number[];
}

const commit = (blobList: Blob[], blobs: number[], parent?: string): Commit => {
    const tree = digest(`tree ${blobs.map((b) => blobList[b].hash).join(' ')}`);
    return { hash: digest(`commit ${tree} ${parent ?? ''}`), tree, blobs };
};

type Store = { blobs: Blob[]; commits: Commit[] };

/** Edit one file and commit: a new blob, a new tree listing it, a new commit on top. */
const withEdit = ({ blobs, commits }: Store, file: number): Store => {
    if (commits.length === MAX_COMMITS) return { blobs, commits };
    const head = commits[commits.length - 1];
    const version = blobs.filter((b) => b.file === file).length;
    const nextBlobs = [...blobs, { hash: digest(`blob ${FILES[file]} ${version}`), file }];
    const indices = head.blobs.map((b, i) => (i === file ? nextBlobs.length - 1 : b));
    return { blobs: nextBlobs, commits: [...commits, commit(nextBlobs, indices, head.hash)] };
};

const initial = (): Store => {
    const blobs = FILES.map((file, i) => ({ hash: digest(`blob ${file} 0`), file: i }));
    return { blobs, commits: [commit(blobs, blobs.map((_, i) => i))] };
};

/**
 * Fig. 7: OCaml-Git's object store. Every object is filed under the hash of
 * its content, so editing one file makes a new blob, a new tree that lists
 * it, and a new commit that points to that tree and its parent. The files
 * that didn't change keep their hashes, and the new tree points to the very
 * same blobs: history shares everything it can. On opening, it makes one
 * edit itself.
 */
export default function ObjectStore() {
    const [ref, { width, height }] = useSize<SVGSVGElement>();
    const [store, setStore] = useState(initial);
    const { blobs, commits } = store;
    const head = commits[commits.length - 1];
    const full = commits.length === MAX_COMMITS;
    const visible = useVisible(ref);
    const term = useTerm();
    const stopIntro = useIntro(visible, () => {
        const timer = setTimeout(() => setStore((s) => withEdit(s, 1)), 700);
        return () => clearTimeout(timer);
    });

    const edit = (file: number) => {
        stopIntro();
        setStore((s) => withEdit(s, file));
    };

    const bottom = height - INSET.bottom;
    const row = { commit: INSET.top + 14, blob: bottom - 2 };
    const treeY = (row.commit + row.blob) / 2;
    const cx = (k: number) => ((k + 0.5) / MAX_COMMITS) * width;
    const bx = (i: number) => ((i + 0.5) / MAX_BLOBS) * width;

    // Blobs HEAD shares with earlier commits rather than making anew
    const made = commits.length === 1 ? FILES.length : 1;
    const reused = FILES.length - made;
    const objects = blobs.length + commits.length * 2;

    return (
        <ProjectFigure
            n={7}
            title="Object store"
            readout={`objects ${objects}  reused ${reused}`}
            controls={
                <div className={styles.control}>
                    <span className={styles.controlLabel}>edit</span>
                    <span className={styles.options} role="group" aria-label="Edit a file and commit">
                        {FILES.map((file, i) => (
                            <button key={file} className={styles.option} disabled={full} onClick={() => edit(i)}>
                                {file}
                            </button>
                        ))}
                    </span>
                    {commits.length > 1 && (
                        <button
                            className={`${styles.option} ${styles.push}`}
                            onClick={() => {
                                stopIntro();
                                setStore(initial());
                            }}
                        >
                            reset
                        </button>
                    )}
                </div>
            }
        >
            <svg
                ref={ref}
                className={styles.svg}
                role="img"
                aria-label={`${commits.length} commits, ${blobs.length} blobs. HEAD is ${head.hash}; its tree reuses ${reused} of ${FILES.length} blobs from earlier commits.`}
            >
                {width > 0 && (
                    <>
                        {commits.map((c, k) => {
                            const isHead = c === head;
                            return (
                                <g key={c.hash} className={styles.appear}>
                                    <g {...term('commits')}>
                                        {k > 0 && (
                                            <line
                                                className={styles.edge}
                                                data-done={isHead || undefined}
                                                x1={cx(k) - 6}
                                                y1={row.commit}
                                                x2={cx(k - 1) + 6}
                                                y2={row.commit}
                                            />
                                        )}
                                        <line
                                            className={styles.edge}
                                            data-done={isHead || undefined}
                                            x1={cx(k)}
                                            y1={row.commit}
                                            x2={cx(k)}
                                            y2={treeY}
                                        />
                                    </g>
                                    <g {...term('trees')}>
                                        {c.blobs.map((b) => (
                                            <line
                                                key={b}
                                                className={styles.edge}
                                                data-done={isHead || undefined}
                                                x1={cx(k)}
                                                y1={treeY}
                                                x2={bx(b)}
                                                y2={row.blob}
                                            />
                                        ))}
                                    </g>
                                </g>
                            );
                        })}

                        {blobs.map((b, i) => (
                            <g key={b.hash} className={styles.appear}>
                                <g {...term('blobs')}>
                                    <circle
                                        className={styles.dot}
                                        cx={bx(i)}
                                        cy={row.blob}
                                        r={2.5}
                                        style={{ opacity: head.blobs.includes(i) ? 1 : 0.35 }}
                                    />
                                    <text className={styles.text} x={bx(i)} y={height - 4} textAnchor="middle">
                                        {FILES[b.file]}
                                    </text>
                                </g>
                            </g>
                        ))}

                        {commits.map((c) => {
                            const k = commits.indexOf(c);
                            const isHead = c === head;
                            return (
                                <g key={c.hash} className={styles.appear}>
                                    <g {...term('trees')}>
                                        <circle className={styles.dot} cx={cx(k)} cy={treeY} r={2.5} style={{ opacity: isHead ? 1 : 0.35 }} />
                                    </g>
                                    <g {...term('commits')}>
                                        <circle className={styles.dot} cx={cx(k)} cy={row.commit} r={3.5} style={{ opacity: isHead ? 1 : 0.35 }} />
                                        <text
                                            className={styles.text}
                                            x={cx(k)}
                                            y={row.commit - 9}
                                            textAnchor="middle"
                                            style={isHead ? { fill: 'var(--text-primary)' } : undefined}
                                        >
                                            {c.hash}
                                        </text>
                                    </g>
                                </g>
                            );
                        })}
                    </>
                )}
            </svg>
        </ProjectFigure>
    );
}
