"use client";
import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textColumn}>
                        <motion.h1
                            className={styles.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.9, ease: easeOutExpo }}
                        >
                            <span className={styles.firstName}>Agrim</span>
                            <span className={styles.lastName}>Jaimini</span>
                        </motion.h1>

                        <motion.div
                            className={styles.roleWrapper}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.8, ease: easeOutExpo }}
                        >
                            <span className={styles.roleLabel}>Software Engineer</span>
                            <span className={styles.roleDivider} />
                            <span className={styles.roleSpecialty}>AI & Infrastructure</span>
                        </motion.div>

                        <motion.p
                            className={styles.bio}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.8, ease: easeOutExpo }}
                        >
                            Building production ML systems and scalable infrastructure.
                            Incoming at <span className={styles.bioHighlight}>Coinbase</span>.
                        </motion.p>

                        <motion.div
                            className={styles.actions}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.8, ease: easeOutExpo }}
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
                            transition={{ delay: 0.6, duration: 0.8, ease: easeOutExpo }}
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
                </div>
            </div>
        </section>
    );
}
