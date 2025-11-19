"use client";
import React from 'react';
import styles from './Contact.module.css';
import { contactMethods } from '@/data/portfolioData';
import { motion } from 'framer-motion';

export default function Contact() {
    const fadeInUp = {
        hidden: { y: 20, scale: 0.95 },
        visible: { y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className="section-title"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    Get in Touch
                </motion.h2>
                <div className={styles.grid}>
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;

                        return (
                            <motion.a
                                key={index}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.card} glass`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { y: 20, scale: 0.95 },
                                    visible: { y: 0, scale: 1, transition: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] } }
                                }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={30} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.title}>{method.title}</h3>
                                <span className={styles.value}>{method.value}</span>
                                <p className={styles.description}>{method.description}</p>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
