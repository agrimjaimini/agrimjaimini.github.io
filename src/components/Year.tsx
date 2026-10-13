"use client";
import { useSyncExternalStore } from 'react';

const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

/** The current year. The static build bakes in its own year; the browser corrects it after hydration. */
export default function Year() {
    return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
}
