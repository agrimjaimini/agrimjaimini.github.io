"use client";
import { useEffect } from 'react';

// A frozen 2D Ising configuration: + is spin up, · is spin down
const grid = [
    '+ + + + · · · · + + + · · · ·',
    '+ + + + + · · · + + + + · · ·',
    '· + + + + + · · · + + + · · ·',
    '· · + + + + + · · · + · · · +',
    '· · · + + + · · · · · · · + +',
].join('\n');

/** A small hello for anyone who opens the developer console. */
export default function ConsoleNote() {
    useEffect(() => {
        console.log(
            `%c${grid}\n\n%cHi, I'm Agrim. Thanks for looking under the hood.\nThe dots up top are a live Ising model: agrimjaimini.github.io/writing/ising-model\nSay hello: aj638@cornell.edu`,
            'font: 12px/1.35 ui-monospace, monospace; color: #888',
            'font: 12px/1.6 ui-sans-serif, system-ui; color: inherit'
        );
    }, []);

    return null;
}
