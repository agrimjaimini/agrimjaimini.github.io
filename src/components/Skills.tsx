"use client";
import React from 'react';
import styles from './Skills.module.css';
import { skills } from '@/data/portfolioData';

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
                <h2 className="section-title">Skills</h2>
                <div className={styles.grid}>
                    {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                        <div
                            key={index}
                            className={styles.categoryCard}
                        >
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.skillList}>
                                {categorySkills.map((skill, i) => (
                                    <div key={i} className={styles.skillItem}>
                                        <div
                                            className={styles.skillPill}
                                            style={{ '--delay': `${(i * 0.3 + index * 0.2) % 2}s` } as React.CSSProperties}
                                        >
                                            {skill.name}
                                        </div>
                                        <div className={styles.tooltip}>
                                            <span className={styles.tooltipTitle}>{skill.name}</span>
                                            <span className={styles.tooltipDesc}>{skill.description}</span>
                                            <span className={styles.tooltipUsed}>Used in: {skill.usedIn}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
