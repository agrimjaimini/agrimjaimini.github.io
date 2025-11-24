"use client";
import React from 'react';
import styles from './Projects.module.css';
import { projects } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const grid = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 26 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Projects</h2>
                <motion.div
                    className={styles.grid}
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} className={`${styles.card} glass card-hover`} variants={card}>
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
                </motion.div>
            </div>
        </section>
    );
}
