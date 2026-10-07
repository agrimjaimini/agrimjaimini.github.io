import * as React from 'react';

type ViewTransitionProps = { name: string; children: React.ReactNode };

// React's <ViewTransition> ships in the React build Next uses when
// `experimental.viewTransition` is on; fall back to a plain fragment otherwise.
const ViewTransition = (React as unknown as { ViewTransition?: React.ComponentType<ViewTransitionProps> })
    .ViewTransition;

/** Morphs an element into the element with the same name on the next page. */
export default function Morph({ name, children }: ViewTransitionProps) {
    return ViewTransition ? <ViewTransition name={name}>{children}</ViewTransition> : <>{children}</>;
}
