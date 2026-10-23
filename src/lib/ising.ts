// Critical inverse temperature of the 2D square-lattice Ising model: ln(1 + √2) / 2
export const C_CRITICAL = Math.log(1 + Math.SQRT2) / 2;

/** Default c for the small lattices: just below c*, so they stay mixed. */
export const LATTICE_C = C_CRITICAL - 0.1;

/** FNV-1a: a stable 32-bit seed from a string, so a slug always draws the same state. */
function hash(text: string) {
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
}

/** mulberry32: a small seeded PRNG in [0, 1). */
function random(seed: number) {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * One step of the chain Fig. 1 runs: propose flipping a uniformly random vertex
 * of the cols × rows torus, and accept with probability min{1, w(y)/w(x)}.
 * An external field h > 0 adds h · Σ x(v) to the exponent of w, pulling spins up.
 * Returns the flipped vertex, or -1 if the proposal was rejected.
 */
export function step(x: Int8Array, cols: number, rows: number, c: number, rand: () => number = Math.random, h = 0) {
    const col = (rand() * cols) | 0;
    const row = (rand() * rows) | 0;
    const r = row * cols + col;
    const neighbors =
        x[row * cols + ((col + 1) % cols)] +
        x[row * cols + ((col - 1 + cols) % cols)] +
        (rows > 1 ? x[((row + 1) % rows) * cols + col] + x[((row - 1 + rows) % rows) * cols + col] : 0);
    const ratio = Math.exp(-2 * x[r] * (c * neighbors + h));
    if (ratio >= 1 || rand() < ratio) {
        x[r] = -x[r];
        return r;
    }
    return -1;
}

/**
 * A sample of that chain after `sweeps` sweeps, seeded by `seed`, so the same
 * seed always gives the same state (and the server and browser agree on it).
 * Returns one spin (±1) per vertex, row by row.
 *
 * The default c sits a little below c*: a torus this small orders completely
 * above it, and an all-up or all-down mark would say nothing about its seed.
 */
export function isingState(seed: string, cols: number, rows: number, c = LATTICE_C, sweeps = 60) {
    const rand = random(hash(seed));
    const x = new Int8Array(cols * rows);
    for (let i = 0; i < x.length; i++) x[i] = rand() < 0.5 ? 1 : -1;
    for (let k = 0; k < sweeps * x.length; k++) step(x, cols, rows, c, rand);
    return x;
}
