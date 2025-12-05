"use client";
import React, { useState } from 'react';
import styles from './Projects.module.css';
import { projects } from '@/data/portfolioData';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Featured Work</span>
                    <h2 className={styles.title}>Projects</h2>
                    <p className={styles.subtitle}>
                        Selected builds spanning ML systems, blockchain analytics, and full-stack applications.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.projectsGrid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((project, index) => {
                        const isHovered = hoveredIndex === index;
                        const isLastOdd = projects.length % 2 === 1 && index === projects.length - 1;
                        const highlightsToShow = project.highlights ?? [];
                        const hasHighlights = highlightsToShow.length > 0;
                        const projectLink = project.demo || project.github;

                        return (
                            <motion.article
                                key={project.title}
                                className={`${styles.projectCard} ${isLastOdd ? styles.centered : ''}`}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={styles.cardInner}>
                                    <div className={styles.cardTop}>
                                        <span className={styles.projectIndex}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className={styles.cardLinks}>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.iconLink}
                                                    aria-label="View GitHub"
                                                >
                                                    <Github size={18} strokeWidth={1.5} />
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.iconLink}
                                                    aria-label="View Demo"
                                                >
                                                    <ExternalLink size={18} strokeWidth={1.5} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <h3 className={styles.projectTitle}>{project.title}</h3>

                                        {project.date && (
                                            <span className={styles.projectDate}>{project.date}</span>
                                        )}

                                        {hasHighlights && (
                                            <ul className={styles.bulletList}>
                                                {highlightsToShow.map((item) => (
                                                    <li key={item} className={styles.bulletItem}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    <div className={styles.cardFooter}>
                                        <div className={styles.techStack}>
                                            {project.tech.slice(0, 4).map((tech) => (
                                                <span key={tech} className={styles.techTag}>
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className={styles.techMore}>
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {projectLink && (
                                            <motion.a
                                                href={projectLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.viewLink}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                    x: isHovered ? 0 : -8
                                                }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                View
                                                <ArrowUpRight size={14} />
                                            </motion.a>
                                        )}
                                    </div>

                                </div>

                                <div className={styles.cardGlow} />
                                <div className={styles.cardBorder} />
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
