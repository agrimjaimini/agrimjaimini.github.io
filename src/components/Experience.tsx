import React from 'react';
import { experience } from '@/data/portfolioData';
import Disclosure from './Disclosure';
import type { MentionItem } from './Mentions';

const year = (duration: string) => {
    const [start, end] = duration.split('–').map((s) => s.trim());
    const startYear = start.slice(-4);
    const endYear = end === 'Present' ? 'Now' : end.slice(-4);
    // A closed en dash and a short end year read as one figure: 2024–25
    if (startYear === endYear) return startYear;
    return endYear === 'Now' ? `${startYear}–Now` : `${startYear}–${endYear.slice(-2)}`;
};

/** The anchor for a company's row, which the intro's citations link to. */
export const experienceId = (company: string) =>
    `experience-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/** "May 2026 – Aug 2026" → "May–Aug 2026"; across years, "Oct 2024–Jan 2025". */
const span = (duration: string) => {
    const [start, end] = duration.split('–').map((s) => s.trim());
    const [startMonth, startYear] = start.split(' ');
    const [endMonth, endYear] = end.split(' ');
    return startYear === endYear ? `${startMonth}–${endMonth} ${endYear}` : `${start}–${end}`;
};

/** "Software Engineer Intern in San Francisco", or "…, remote". */
const role = (job: (typeof experience)[number]) => {
    if (!job.location) return job.title;
    if (job.location === 'Remote') return `${job.title}, remote`;
    return `${job.title} in ${job.location.split(',')[0]}`;
};

/** Each job as an entry the Experience sentence can open. */
export const experienceItems: MentionItem[] = experience.map((job) => ({
    key: job.company,
    id: experienceId(job.company),
    sub: role(job),
    meta: span(job.duration),
    story: job.story,
    points: job.points,
}));

/** `anchors` off when the prose version on screen holds the citation targets. */
export default function Experience({ anchors = true }: { anchors?: boolean }) {
    return (
        <Disclosure
            items={experience.map((job) => ({
                key: `${job.company}-${job.title}`,
                id: anchors ? experienceId(job.company) : undefined,
                title: job.company,
                sub: job.title,
                meta: year(job.duration),
                points: job.points,
                note: [job.duration, job.location].filter(Boolean).join(' · '),
            }))}
        />
    );
}
