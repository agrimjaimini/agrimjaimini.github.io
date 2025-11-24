"use client";
import React, { useMemo, useRef, useState } from 'react';
import styles from './ListDetailSection.module.css';
import { experience, projects } from '@/data/portfolioData';
import { ExternalLink, Github } from 'lucide-react';
import { AnimatePresence, Variants, motion } from 'framer-motion';

type SectionType = 'experience' | 'projects';

type ExperienceItem = (typeof experience)[number];
type ProjectItem = (typeof projects)[number];
type SlideDirection = 'left' | 'right';

interface AnimationDirections {
    enter: SlideDirection;
    exit: SlideDirection;
}

const detailVariants: Variants = {
    initial: ({ enter }: AnimationDirections) => ({
        opacity: 0,
        x: enter === 'right' ? 15 : -15, // Even smaller distance
        scale: 0.995,
    }),
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100, // Even more relaxed
            damping: 20,
            mass: 1
        },
    },
    exit: ({ exit }: AnimationDirections) => ({
        opacity: 0,
        x: exit === 'right' ? 15 : -15,
        scale: 0.995,
        transition: { duration: 0.3, ease: "easeInOut" }, // Slightly slower, smoother exit
    }),
};

interface ListDetailSectionProps {
    type: SectionType;
    title: string;
    description?: string;
}

function projectSubtitle(project: ProjectItem) {
    if (project.tech?.length) {
        return project.tech.slice(0, 3).join(' • ');
    }
    return project.description?.slice(0, 110) ?? '';
}

export default function ListDetailSection({ type, title, description }: ListDetailSectionProps) {
    const data = type === 'experience' ? experience : projects;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const animationDirections = useRef<AnimationDirections>({ enter: 'right', exit: 'right' });
    const activeItem = useMemo(() => (activeIndex !== null ? data[activeIndex] : null), [data, activeIndex]);
    const columns = activeItem ? 'minmax(320px, 1fr) minmax(520px, 1fr)' : '1fr';

    const renderDetailContent = (item: ExperienceItem | ProjectItem) =>
        type === 'experience' ? (
            <ExperienceDetail item={item as ExperienceItem} />
        ) : (
            <ProjectDetail item={item as ProjectItem} />
        );

    return (
        <section id={type} className={styles.section} aria-label={title}>
            <div className={styles.inner} style={{ gridTemplateColumns: columns }}>
                <div className={styles.leftCol}>
                    <h2 className={`${styles.title} section-title`}>{title}</h2>
                    {description && <p className={styles.description}>{description}</p>}

                    <div className={styles.list} role="list">
                        {data.map((item, index) => {
                            const isActive = index === activeIndex;
                            const primary = type === 'experience' ? (item as ExperienceItem).company : (item as ProjectItem).title;
                            const secondary =
                                type === 'experience'
                                    ? `${(item as ExperienceItem).title} • ${(item as ExperienceItem).duration}`
                                    : projectSubtitle(item as ProjectItem);
                            const meta = type === 'experience' ? (item as ExperienceItem).location : (item as ProjectItem).date;

                            return (
                                <button
                                    type="button"
                                    key={`${type}-${primary}-${index}`}
                                    className={`${styles.listItem} ${isActive ? styles.active : ''}`}
                                    onClick={() => {
                                        const isSwitching = activeIndex !== null && !isActive;
                                        animationDirections.current.enter = 'right';
                                        animationDirections.current.exit = isSwitching ? 'left' : 'right';
                                        setActiveIndex(isActive ? null : index);
                                    }}
                                    aria-pressed={isActive}
                                    aria-expanded={isActive}
                                    aria-controls={`${type}-detail`}
                                    style={{ width: '100%' }}
                                >
                                    <div className={styles.listPrimary}>{primary}</div>
                                    <div className={styles.listSecondary}>{secondary}</div>
                                    {meta && <div className={styles.listMeta}>{meta}</div>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={styles.detailViewport}>
                        <AnimatePresence mode="popLayout" custom={animationDirections.current}>
                            {activeItem && (
                                <motion.div
                                    key={`${type}-${activeIndex}`}
                                    id={`${type}-detail`}
                                    className={styles.detailCard}
                                    custom={animationDirections.current}
                                    variants={detailVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout
                                >
                                    {renderDetailContent(activeItem)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceDetail({ item }: { item: ExperienceItem }) {
    return (
        <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
                <div>
                    <p className={styles.detailEyebrow}>Experience</p>
                    <h3 className={styles.detailTitle}>{item.company}</h3>
                    <p className={styles.detailRole}>{item.title}</p>
                </div>
                <div className={styles.badgeRow}>
                    <span className={styles.badge}>{item.duration}</span>
                    {item.location && <span className={styles.muted}>{item.location}</span>}
                </div>
            </div>

            <ul className={styles.points}>
                {item.points.map((point, i) => (
                    <li key={i} className={styles.point}>
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProjectDetail({ item }: { item: ProjectItem }) {
    const bullets = useMemo(() => {
        if (!item.description) return [];
        return item.description
            .split('.')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => (part.endsWith('.') ? part.slice(0, -1) : part));
    }, [item.description]);

    return (
        <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
                <div>
                    <p className={styles.detailEyebrow}>Project</p>
                    <h3 className={styles.detailTitle}>{item.title}</h3>
                    {item.date && <p className={styles.detailRole}>{item.date}</p>}
                </div>
                <div className={styles.linkRow}>
                    {item.github && (
                        <a
                            className={styles.iconButton}
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View GitHub"
                        >
                            <Github size={18} strokeWidth={1.5} />
                        </a>
                    )}
                    {item.demo && (
                        <a
                            className={styles.iconButton}
                            href={item.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Demo"
                        >
                            <ExternalLink size={18} strokeWidth={1.5} />
                        </a>
                    )}
                </div>
            </div>

            {bullets.length > 0 && (
                <ul className={styles.points}>
                    {bullets.map((point, i) => (
                        <li key={i} className={styles.point}>
                            {point}
                        </li>
                    ))}
                </ul>
            )}

            {item.tech?.length ? (
                <div className={styles.tags}>
                    {item.tech.map((tech, i) => (
                        <span key={i} className={styles.tag}>
                            {tech}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
