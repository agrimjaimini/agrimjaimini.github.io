"use client";
import React from 'react';
import styles from './Education.module.css';
import { education } from '@/data/portfolioData';
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

export default function Education() {
    return (
        <section id="education" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Education</h2>
                <motion.div
                    className={styles.list}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {education.map((edu, index) => (
                        <motion.div key={index} className={`${styles.card} glass card-hover`} variants={card}>
                            <div className={styles.header}>
                                <div>
                                    <h3 className={styles.school}>{edu.school}</h3>
                                    <p className={styles.degree}>{edu.degree}</p>
                                </div>
                                <div className={styles.meta}>
                                    <span>{edu.duration}</span>
                                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                </div>
                            </div>

                            {edu.coursework && (
                                <div className={styles.coursework}>
                                    <h4 className={styles.courseworkTitle}>Relevant Coursework</h4>
                                    <div className={styles.courseList}>
                                        {edu.coursework.map((course, i) => (
                                            <span key={i} className={styles.course}>{course}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
