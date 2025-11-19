"use client";
import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import Tesseract from './Tesseract';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`${styles.textStack} glass`}
                    >
                        <h1 className={styles.name}>AGRIM JAIMINI</h1>
                        <h3 className={styles.role}>
                            Software Engineer <span className={styles.highlight}>AI & Data</span>
                        </h3>
                        <p className={styles.bio}>
                            Building high-performance systems and scalable infrastructure.
                            Fellow at Ripple & ML Engineer at Texas Instruments.
                        </p>

                        <div className={styles.actions}>
                            <a href="#projects" className={`${styles.button} ${styles.primary}`}>
                                View Work
                            </a>
                            <a href="#experience" className={`${styles.button} ${styles.secondary}`}>
                                Experience
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.visual}
                    >
                        <Tesseract />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
