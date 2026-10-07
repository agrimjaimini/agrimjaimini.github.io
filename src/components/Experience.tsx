import React from 'react';
import { experience } from '@/data/portfolioData';
import Disclosure from './Disclosure';

const year = (duration: string) => {
    const [start, end] = duration.split('–').map((s) => s.trim());
    const startYear = start.slice(-4);
    const endYear = end === 'Present' ? 'Now' : end.slice(-4);
    return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
};

export default function Experience() {
    return (
        <Disclosure
            items={experience.map((job) => ({
                key: `${job.company}-${job.title}`,
                title: job.company,
                sub: job.title,
                meta: year(job.duration),
                points: job.points,
                note: [job.duration, job.location].filter(Boolean).join(' · '),
            }))}
        />
    );
}
