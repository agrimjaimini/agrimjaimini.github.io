/** One readout of a running Fig. 1: its inverse temperature, and the share of
 *  neighboring pairs (edges of the grid) whose spins agree. */
export interface IsingReading {
    c: number;
    agree: number;
}

type Listener = (reading: IsingReading) => void;

const listeners = new Set<Listener>();
let last: IsingReading | null = null;

/** Fig. 1 calls this with each readout (about five times a second). */
export function publishReading(reading: IsingReading) {
    last = reading;
    listeners.forEach((l) => l(reading));
}

/** Whether anything is following the readouts, so Fig. 1 keeps sampling offscreen. */
export function hasReadingListeners() {
    return listeners.size > 0;
}

/** The latest readout, without following them (and so without keeping Fig. 1 running offscreen). */
export const getLastReading = () => last;

/** Follow Fig. 1's readouts, starting with the latest one if there is one. */
export function subscribeReadings(listener: Listener) {
    listeners.add(listener);
    if (last) listener(last);
    return () => {
        listeners.delete(listener);
    };
}

// Fig. 1's opening, as it happens: the lone flipped spin appears ('nucleus'),
// then the front starts to spread from it ('front')
export type Phase = 'nucleus' | 'front';
const phaseListeners = new Set<(phase: Phase) => void>();

export function publishPhase(phase: Phase) {
    phaseListeners.forEach((l) => l(phase));
}

export function subscribePhase(listener: (phase: Phase) => void) {
    phaseListeners.add(listener);
    return () => {
        phaseListeners.delete(listener);
    };
}

// c set by hand with a slider (Fig. 1's or Fig. 2's), shared so both stay in
// step; null means c drifts on its own
let manualC: number | null = null;
const manualListeners = new Set<() => void>();

export const getManualC = () => manualC;

export function setManualC(value: number | null) {
    manualC = value;
    manualListeners.forEach((l) => l());
}

export function subscribeManualC(listener: () => void) {
    manualListeners.add(listener);
    return () => {
        manualListeners.delete(listener);
    };
}

// The c Fig. 1 is sampling at right now, updated every frame so a slider's
// thumb can glide with it rather than hop between readouts
let liveC: number | null = null;
export const getLiveC = () => liveC;
export const setLiveC = (c: number) => {
    liveC = c;
};
