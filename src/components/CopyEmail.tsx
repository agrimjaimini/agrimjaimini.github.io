"use client";
import { useEffect, useState } from 'react';
import styles from './CopyEmail.module.css';

/**
 * The email address as a link that copies itself and reads "Copied" for a
 * moment. A modified click, or a browser without clipboard access, gets the
 * plain mailto link instead.
 */
export default function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 1600);
        return () => window.clearTimeout(timer);
    }, [copied]);

    return (
        <a
            href={`mailto:${email}`}
            className={`link ${styles.email}`}
            data-copied={copied || undefined}
            onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !navigator.clipboard) return;
                e.preventDefault();
                navigator.clipboard.writeText(email).then(
                    () => setCopied(true),
                    () => (window.location.href = `mailto:${email}`)
                );
            }}
        >
            <span className={styles.address}>{email}</span>
            <span className={styles.copied} aria-hidden>
                Copied
            </span>
            <span className={styles.status} role="status">
                {copied ? 'Email address copied' : ''}
            </span>
        </a>
    );
}
