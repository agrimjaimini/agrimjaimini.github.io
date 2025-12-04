"use client";
import React from 'react';
import styles from './Contact.module.css';
import { contactMethods } from '@/data/portfolioData';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Get In Touch</span>
                    <h2 className={styles.title}>
                        Let&apos;s build something <span className={styles.highlight}>extraordinary</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Open to opportunities in AI/ML, blockchain, and full-stack development.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
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
                                className={styles.card}
                                variants={itemVariants}
                            >
                                <div className={styles.cardInner}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.iconWrapper}>
                                            <Icon size={22} strokeWidth={1.5} />
                                        </div>
                                        <ArrowUpRight size={16} className={styles.arrowIcon} />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{method.title}</h3>
                                        <span className={styles.cardValue}>{method.value}</span>
                                    </div>
                                </div>
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
                        <span className={styles.footerDot} />
                        <a
                            href="https://linkedin.com/in/agrimjaimini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            LinkedIn
                        </a>
                        <span className={styles.footerDot} />
                        <a
                            href="https://t.me/agrimjaimini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            Telegram
                        </a>
                        <span className={styles.footerDot} />
                        <a
                            href="mailto:aj638@cornell.edu"
                            className={styles.footerLink}
                        >
                            Email
                        </a>
                    </div>
                    <p className={styles.footerText}>
                        © {new Date().getFullYear()} Agrim Jaimini · Built with Next.js
                    </p>
                </div>
            </footer>
        </section>
    );
}
