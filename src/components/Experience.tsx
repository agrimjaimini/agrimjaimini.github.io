"use client";
import React from 'react';
import styles from './Experience.module.css';
import { experience } from '@/data/portfolioData';
export default function Experience() {
    return (
        <section id="experience" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Experience</h2>
                <div className={styles.list}>
                    {experience.map((exp, index) => (
                        <div key={index} className={`${styles.card} glass card-hover`}>
                            <div className={styles.header}>
                                <h3 className={styles.role}>{exp.title}</h3>
                                <span className={styles.company}>{exp.company}</span>
                                <span className={styles.duration}>{exp.duration}</span>
                            </div>
                            <span className={styles.location}>{exp.location}</span>
                            <ul className={styles.points}>
                                {exp.points.map((point, i) => (
                                    <li key={i} className={styles.point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
