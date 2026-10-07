import React from 'react';
import { projects } from '@/data/portfolioData';
import Disclosure from './Disclosure';

export default function Projects() {
    return (
        <Disclosure
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
