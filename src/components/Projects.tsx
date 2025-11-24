"use client";
import React from 'react';
import styles from './Projects.module.css';
import { projects } from '@/data/portfolioData';

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Projects</h2>
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <div key={index} className={`${styles.card} glass card-hover`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
