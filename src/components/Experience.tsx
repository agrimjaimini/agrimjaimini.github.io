"use client";
import React, { useState } from 'react';
import styles from './Experience.module.css';
import { experience } from '@/data/portfolioData';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';

export default function Experience() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

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
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const detailVariants: Variants = {
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
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
    };

    const pointVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="experience" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Career</span>
                    <h2 className={styles.title}>Experience</h2>
                    <p className={styles.subtitle}>
                        Building production systems across ML infrastructure, blockchain analytics, and distributed systems.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.timeline}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {experience.map((exp, index) => {
                        const isExpanded = expandedIndex === index;

                        return (
                            <motion.div
                                key={`${exp.company}-${index}`}
                                className={styles.experienceItem}
                                variants={itemVariants}
                            >
                                <div className={styles.timelineMarker}>
                                    <div className={`${styles.timelineDot} ${isExpanded ? styles.active : ''}`} />
                                    {index < experience.length - 1 && <div className={styles.timelineLine} />}
                                </div>

                                <div className={styles.experienceContent}>
                                    <button
                                        className={`${styles.experienceHeader} ${isExpanded ? styles.expanded : ''}`}
                                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        type="button"
                                    >
                                        <div className={styles.headerMain}>
                                            <div className={styles.companyInfo}>
                                                <h3 className={styles.company}>{exp.company}</h3>
                                                <span className={styles.role}>{exp.title}</span>
                                            </div>
                                            <div className={styles.headerMeta}>
                                                <span className={styles.duration}>{exp.duration}</span>
                                                {exp.location && (
                                                    <span className={styles.location}>
                                                        <MapPin size={12} />
                                                        {exp.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <motion.div
                                            className={styles.expandIcon}
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <ChevronDown size={18} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                className={styles.experienceDetails}
                                                variants={detailVariants}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                            >
                                                <ul className={styles.points}>
                                                    {exp.points.map((point, i) => (
                                                        <motion.li
                                                            key={i}
                                                            className={styles.point}
                                                            variants={pointVariants}
                                                        >
                                                            {point}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
