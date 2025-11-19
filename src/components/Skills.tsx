"use client";
import React from 'react';
import styles from './Skills.module.css';
import { skills } from '@/data/portfolioData';
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

export default function Skills() {
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills[0][]>);

    return (
        <section id="skills" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Skills
                </motion.h2>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                        <motion.div
                            key={index}
                            className={`${styles.categoryCard} glass card-hover`}
                            variants={itemVariants}
                        >
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.skillList}>
                                {categorySkills.map((skill, i) => (
                                    <div key={i} className={styles.skillItem}>
                                        <div className={styles.skillPill}>
                                            {skill.name}
                                        </div>
                                        <div className={`${styles.tooltip} glass`}>
                                            <span className={styles.tooltipTitle}>{skill.name}</span>
                                            <span className={styles.tooltipDesc}>{skill.description}</span>
                                            <span className={styles.tooltipUsed}>Used in: {skill.usedIn}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
