"use client";

/** Opens the print dialog: the homepage prints as a two-page résumé. */
export default function PrintLink({ className }: { className?: string }) {
    return (
        <button
            className={`${className ?? ''} screen-only`}
            onClick={() => window.print()}
            data-umami-event="resume-print"
        >
            Résumé
        </button>
    );
}
