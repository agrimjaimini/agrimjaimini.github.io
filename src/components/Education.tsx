"use client";
import React from 'react';
import styles from './Education.module.css';
import { education } from '@/data/portfolioData';

export default function Education() {
    return (
        <section id="education" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Education</h2>
                <div className={styles.list}>
                    {education.map((edu, index) => (
                        <div key={index} className={`${styles.card} glass card-hover`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
