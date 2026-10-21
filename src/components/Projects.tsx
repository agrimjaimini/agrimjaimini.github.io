import React from 'react';
import { projects } from '@/data/portfolioData';
import { plain } from '@/lib/format';
import Disclosure from './Disclosure';
import CacheScore from './CacheScore';
import DpoLoss from './DpoLoss';
import { BatchNumber, ChipName, DecodeRate } from './LiveNumbers';
import type { MentionItem } from './Mentions';
import ObjectStore from './ObjectStore';
import Roofline from './Roofline';
import TaskGraph from './TaskGraph';

/** Figures for the projects the Projects sentences mark, numbered in the order
    they're named there (Fig. 1 is the Ising model above). Keyed, since they
    travel inside the list of items. */
const figures: Record<string, React.ReactNode> = {
    Trellis: <TaskGraph key="fig" />,
    Lore: <CacheScore key="fig" />,
    'Trace-Accel': <Roofline key="fig" />,
    'DPO Alignment Stack': <DpoLoss key="fig" />,
    'OCaml-Git': <ObjectStore key="fig" />,
};

/** Each project as an entry the Projects sentence can open. */
/** Live pieces of the Projects sentences, by the `{{key}}` that places them. */
export const projectSlots: Record<string, React.ReactNode> = {
    batch: <BatchNumber key="batch" />,
    chip: <ChipName key="chip" />,
    rate: <DecodeRate key="rate" />,
};

export const projectItems: MentionItem[] = projects.map((project) => {
    const href = project.github ?? project.demo;
    return {
        key: project.title,
        // The dateline is figures only: the sentence already says what it is
        meta: project.date,
        note: project.tech.join(' · '),
        story: project.story,
        points: project.highlights ?? [project.description],
        link: href ? { href, label: project.github ? 'GitHub' : 'Demo' } : undefined,
        figure: figures[project.title],
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
                    points: (project.highlights ?? [project.description]).map(plain),
                    note: project.tech.join(' · '),
                    link: href ? { href, label: project.github ? 'GitHub' : 'Demo' } : undefined,
                };
            })}
        />
    );
}
