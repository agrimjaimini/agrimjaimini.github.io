"use client";
import React, { useState } from 'react';
import styles from './Skills.module.css';
import { skills } from '@/data/portfolioData';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const categoryDescriptions: Record<string, string> = {
    "Programming Languages": "Core languages for building scalable systems and applications",
    "Web Development": "Modern frameworks and tools for full-stack development",
    "AI/ML": "Machine learning frameworks and data science tools",
    "Cloud & Infrastructure": "Cloud platforms for deploying production systems",
    "DevOps & Tools": "Development operations and automation tooling",
    "Blockchain & Web3": "Decentralized technologies and blockchain development",
};

const categoryOrder = [
    "Programming Languages",
    "Web Development",
    "AI/ML",
    "Cloud & Infrastructure",
    "DevOps & Tools",
    "Blockchain & Web3"
];

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills[0][]>);

    const orderedCategories = categoryOrder.filter(cat => groupedSkills[cat]);

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
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const skillsExpandVariants: Variants = {
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

    const skillPillVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 6 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="skills" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Technical Stack</span>
                    <h2 className={styles.title}>Skills & Expertise</h2>
                    <p className={styles.subtitle}>
                        Full-stack development with specialization in AI/ML systems,
                        cloud infrastructure, and blockchain technology.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.categoriesGrid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {orderedCategories.map((category, index) => {
                        const categorySkills = groupedSkills[category];
                        const isActive = activeCategory === category;

                        return (
                            <motion.div
                                key={category}
                                className={styles.categoryRow}
                                variants={itemVariants}
                            >
                                <button
                                    className={`${styles.categoryHeader} ${isActive ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(isActive ? null : category)}
                                    type="button"
                                >
                                    <div className={styles.categoryLeft}>
                                        <span className={styles.categoryIndex}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className={styles.categoryInfo}>
                                            <h3 className={styles.categoryTitle}>{category}</h3>
                                            <p className={styles.categoryDescription}>
                                                {categoryDescriptions[category]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.categoryRight}>
                                        <span className={styles.skillCount}>
                                            {categorySkills.length} skills
                                        </span>
                                        <motion.div
                                            className={styles.expandIcon}
                                            animate={{ rotate: isActive ? 45 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            className={styles.skillsExpanded}
                                            variants={skillsExpandVariants}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                        >
                                            <motion.div className={styles.skillsGrid}>
                                                {categorySkills.map((skill, i) => (
                                                    <motion.div
                                                        key={skill.name}
                                                        className={styles.skillCard}
                                                        variants={skillPillVariants}
                                                    >
                                                        <span className={styles.skillName}>{skill.name}</span>
                                                        <span className={styles.skillUsed}>{skill.usedIn}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className={styles.divider} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
