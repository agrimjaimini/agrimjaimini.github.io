"use client";
import React, { useState } from 'react';
import styles from './Education.module.css';
import { education } from '@/data/portfolioData';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GraduationCap, ChevronDown } from 'lucide-react';

export default function Education() {
    const [showCoursework, setShowCoursework] = useState(false);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const courseworkVariants: Variants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        },
        show: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.03,
                delayChildren: 0.1
            }
        },
    };

    const courseVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="education" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Background</span>
                    <h2 className={styles.title}>Education</h2>
                </motion.div>

                <motion.div
                    className={styles.educationList}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className={styles.educationCard}
                            variants={itemVariants}
                        >
                            <div className={styles.cardIcon}>
                                <GraduationCap size={24} strokeWidth={1.5} />
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardMain}>
                                    <div className={styles.schoolInfo}>
                                        <h3 className={styles.school}>{edu.school}</h3>
                                        <p className={styles.degree}>{edu.degree}</p>
                                    </div>

                                    <div className={styles.cardMeta}>
                                        <span className={styles.duration}>{edu.duration}</span>
                                        {edu.gpa && (
                                            <span className={styles.gpa}>GPA: {edu.gpa}</span>
                                        )}
                                    </div>
                                </div>

                                {edu.coursework && edu.coursework.length > 0 && (
                                    <>
                                        <button
                                            className={`${styles.courseworkToggle} ${showCoursework ? styles.active : ''}`}
                                            onClick={() => setShowCoursework(!showCoursework)}
                                            type="button"
                                        >
                                            <span>Relevant Coursework</span>
                                            <span className={styles.courseCount}>{edu.coursework.length} courses</span>
                                            <motion.div
                                                animate={{ rotate: showCoursework ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <ChevronDown size={16} />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {showCoursework && (
                                                <motion.div
                                                    className={styles.courseworkSection}
                                                    variants={courseworkVariants}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="hidden"
                                                >
                                                    <motion.div className={styles.courseGrid}>
                                                        {edu.coursework.map((course, i) => (
                                                            <motion.span
                                                                key={i}
                                                                className={styles.course}
                                                                variants={courseVariants}
                                                            >
                                                                {course}
                                                            </motion.span>
                                                        ))}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
