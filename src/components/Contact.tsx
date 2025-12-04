"use client";
import React from 'react';
import styles from './Contact.module.css';
import { contactMethods } from '@/data/portfolioData';
import { motion, Variants } from 'framer-motion';

const grid: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const card: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.ctaSection}>
                    <span className="section-eyebrow">05 — Contact</span>
                    <h2 className={styles.ctaTitle}>
                        Let&apos;s build something <span className={styles.ctaHighlight}>extraordinary</span>
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Open to opportunities in AI/ML, blockchain, and full-stack development.
                    </p>
                </div>
                <motion.div
                    className={styles.grid}
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;

                        return (
                            <motion.a
                                key={index}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.card} glass`}
                                variants={card}
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
                </motion.div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLinks}>
                        <a
                            href="https://github.com/agrimjaimini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            GitHub
                        </a>
                        <div className={styles.footerDivider}></div>
                        <a
                            href="https://linkedin.com/in/agrimjaimini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            LinkedIn
                        </a>
                        <div className={styles.footerDivider}></div>
                        <a
                            href="https://t.me/agrimjaimini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            Telegram
                        </a>
                        <div className={styles.footerDivider}></div>
                        <a
                            href="mailto:aj638@cornell.edu"
                            className={styles.footerLink}
                        >
                            Email
                        </a>
                    </div>
                    <p className={styles.footerText}>
                        © {new Date().getFullYear()} <strong>Agrim Jaimini</strong> · Built with Next.js
                    </p>
                </div>
            </footer>
        </section >
    );
}
