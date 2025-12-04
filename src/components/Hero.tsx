"use client";
import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Tesseract from './Tesseract';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textColumn}>
                        <motion.div
                            className={styles.statusBadge}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: easeOutExpo }}
                        >
                            <span className={styles.statusDot} />
                            <span>Available for opportunities</span>
                        </motion.div>

                        <motion.h1
                            className={styles.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: easeOutExpo }}
                        >
                            <span className={styles.firstName}>Agrim</span>
                            <span className={styles.lastName}>Jaimini</span>
                        </motion.h1>

                        <motion.div
                            className={styles.roleWrapper}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.9, ease: easeOutExpo }}
                        >
                            <span className={styles.roleLabel}>Software Engineer</span>
                            <span className={styles.roleDivider} />
                            <span className={styles.roleSpecialty}>AI & Infrastructure</span>
                        </motion.div>

                        <motion.p
                            className={styles.bio}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.9, ease: easeOutExpo }}
                        >
                            Building production ML systems and scalable infrastructure.
                            Currently at <span className={styles.bioHighlight}>Ripple</span> & <span className={styles.bioHighlight}>Texas Instruments</span>.
                        </motion.p>

                        <motion.div
                            className={styles.actions}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.9, ease: easeOutExpo }}
                        >
                            <a href="#projects" className={styles.primaryButton}>
                                <span>View Projects</span>
                                <ArrowRight size={16} />
                            </a>
                            <a href="#contact" className={styles.secondaryButton}>
                                Get in Touch
                            </a>
                        </motion.div>

                        <motion.div
                            className={styles.socialLinks}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.9, ease: easeOutExpo }}
                        >
                            <a href="https://github.com/agrimjaimini" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Github size={18} strokeWidth={1.5} />
                            </a>
                            <a href="https://linkedin.com/in/agrimjaimini" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Linkedin size={18} strokeWidth={1.5} />
                            </a>
                            <a href="mailto:aj638@cornell.edu" className={styles.socialLink}>
                                <Mail size={18} strokeWidth={1.5} />
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: easeOutExpo }}
                        className={styles.visualColumn}
                    >
                        <div className={styles.visualWrapper}>
                            <Tesseract />
                            <div className={styles.visualGlow} />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <span>Scroll</span>
                    <div className={styles.scrollLine}>
                        <div className={styles.scrollDot} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
