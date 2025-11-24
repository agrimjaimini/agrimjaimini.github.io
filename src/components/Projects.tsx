"use client";
import React from 'react';
import styles from './Projects.module.css';
import { projects } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const headingVariants = {
    hidden: { opacity: 0, y: -14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    })
};

const viewportSettings = { once: true, margin: "-50px" };

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className="section-title"
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                >
                    Projects
                </motion.h2>
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            className={`${styles.card} glass card-hover`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportSettings}
                            variants={cardVariants}
                        >
                            <div className={styles.cardHeader}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <div className={styles.links}>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                            GH
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                            DEMO
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className={styles.cardBody}>
                                <p className={styles.description}>{project.description}</p>
                                <div className={styles.techStack}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className={styles.tech}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
