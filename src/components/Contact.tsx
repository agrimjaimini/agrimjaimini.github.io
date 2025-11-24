"use client";
import React from 'react';
import styles from './Contact.module.css';
import { contactMethods } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const grid = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const card = {
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
                <h2 className="section-title">Get in Touch</h2>
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
            <footer style={{ textAlign: 'center', padding: '1rem 0 0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 'auto', opacity: 0.6 }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} Agrim Jaimini. Built with Next.js.</p>
            </footer>
        </section >
    );
}
