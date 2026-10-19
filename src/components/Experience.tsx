import React from 'react';
import { experience } from '@/data/portfolioData';
import Disclosure from './Disclosure';

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

export default function Experience() {
    return (
        <Disclosure
            items={experience.map((job) => ({
                key: `${job.company}-${job.title}`,
                id: experienceId(job.company),
                title: job.company,
                sub: job.title,
                meta: year(job.duration),
                points: job.points,
                note: [job.duration, job.location].filter(Boolean).join(' · '),
            }))}
        />
    );
}
