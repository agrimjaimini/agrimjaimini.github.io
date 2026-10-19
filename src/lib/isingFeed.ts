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

/** Follow Fig. 1's readouts, starting with the latest one if there is one. */
export function subscribeReadings(listener: Listener) {
    listeners.add(listener);
    if (last) listener(last);
    return () => {
        listeners.delete(listener);
    };
}
