"use client";
import React from 'react';
import styles from './Education.module.css';
import { education } from '@/data/portfolioData';
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

export default function Education() {
    return (
        <section id="education" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Education
                </motion.h2>
                <motion.div
                    className={styles.list}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.card} glass card-hover`}
                            variants={itemVariants}
                        >
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
