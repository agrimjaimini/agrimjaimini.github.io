"use client";
import { useEffect } from 'react';

/** Marks the section currently in the reading zone with data-active. */
export default function SectionSpy() {
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        sections.forEach((s) => s.removeAttribute('data-active'));
                        entry.target.setAttribute('data-active', '');
                    }
                });
            },
            { rootMargin: '-35% 0px -55% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return null;
}
