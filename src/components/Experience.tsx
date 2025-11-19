"use client";
import React from 'react';
import styles from './Experience.module.css';
import { experience } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
};

export default function Experience() {
    return (
        <section id="experience" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Experience
                </motion.h2>
                <motion.div
                    className={styles.list}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.card} glass card-hover`}
                            variants={itemVariants}
                        >
                            <div className={styles.header}>
                                <h3 className={styles.role}>
                                    {exp.title} <span className={styles.company}>@ {exp.company}</span>
                                </h3>
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
