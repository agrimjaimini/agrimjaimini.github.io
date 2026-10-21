"use client";
import type React from 'react';

/** Opens the print dialog: the homepage prints as a two-page résumé. */
export default function PrintLink({ className, children = 'Résumé' }: { className?: string; children?: React.ReactNode }) {
    return (
        <button
            className={`${className ?? ''} screen-only`}
            onClick={() => window.print()}
            data-umami-event="resume-print"
        >
            {children}
        </button>
    );
}
