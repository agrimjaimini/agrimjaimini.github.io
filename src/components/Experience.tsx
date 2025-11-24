"use client";
import React from 'react';
import styles from './Experience.module.css';
import { experience } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.12,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 22 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
};

export default function Experience() {
    return (
        <section id="experience" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Experience</h2>
                <motion.div
                    className={styles.list}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {experience.map((exp, index) => (
                        <motion.div key={index} className={`${styles.card} glass card-hover`} variants={card}>
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
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
