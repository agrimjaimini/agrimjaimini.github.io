import { useSyncExternalStore } from 'react';

/** Published dense bf16 peaks and memory bandwidths. */
export const HARDWARE = [
    { name: 'H100', article: 'an', tflops: 989, tbps: 3.35 },
    { name: 'A100', article: 'an', tflops: 312, tbps: 2.04 },
    { name: 'TPU v5e', article: 'a', tflops: 197, tbps: 0.82 },
];

export const MAX_LOG_BATCH = 10; // decode batch runs 1 to 1024

/** Throughput a pass can reach: min(peak, bandwidth × intensity), in TFLOP/s. */
export const attainable = (chip: number, intensity: number) =>
    Math.min(HARDWARE[chip].tflops, HARDWARE[chip].tbps * intensity);

export const fmtRate = (n: number) => (n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2));

// Fig. 4 and the Trace-Accel sentence share one setting, so dragging either moves both
interface Setting {
    chip: number;
    logBatch: number;
}

let setting: Setting = { chip: 0, logBatch: 0 };
const listeners = new Set<() => void>();

export function setRoofline(next: Partial<Setting>) {
    setting = { ...setting, ...next };
    listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

const initial: Setting = { chip: 0, logBatch: 0 };

export const useRoofline = () => useSyncExternalStore(subscribe, () => setting, () => initial);
