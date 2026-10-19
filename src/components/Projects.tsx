import React from 'react';
import { projects } from '@/data/portfolioData';
import Disclosure from './Disclosure';
import type { MentionItem } from './Mentions';

/** Each project as an entry the Projects sentence can open. */
export const projectItems: MentionItem[] = projects.map((project) => {
    const href = project.github ?? project.demo;
    return {
        key: project.title,
        sub: project.summary,
        meta: project.date,
        points: project.highlights ?? [project.description],
        note: project.tech.join(' · '),
        link: href ? { href, label: project.github ? 'GitHub' : 'Demo' } : undefined,
    };
});

/** The printed résumé's project list (on screen, Projects is told in sentences).
    Five rows keep the résumé to two pages. */
export default function Projects() {
    return (
        <Disclosure
            limit={5}
            noun="projects"
            items={projects.map((project) => {
                const href = project.github ?? project.demo;
                return {
                    key: project.title,
                    title: project.title,
                    sub: project.summary,
                    meta: project.date?.slice(-4),
                    points: project.highlights ?? [project.description],
                    note: project.tech.join(' · '),
                    link: href ? { href, label: project.github ? 'GitHub' : 'Demo' } : undefined,
                };
            })}
        />
    );
}
