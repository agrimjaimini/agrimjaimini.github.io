"use client";
import React, { useRef, useState } from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import Tesseract from './Tesseract';

const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
    return (
        <motion.a
            href={href}
            className={className}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.a>
    );
};

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.textStack}
                    >
                        <motion.h1
                            className={styles.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            AGRIM JAIMINI
                        </motion.h1>
                        <motion.h3
                            className={styles.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Software Engineer <span className={styles.highlight}>AI & Data</span>
                        </motion.h3>
                        <motion.p
                            className={styles.bio}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Building high-performance systems and scalable infrastructure.
                            Fellow at Ripple & ML Engineer at Texas Instruments.
                        </motion.p>

                        <motion.div
                            className={styles.actions}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <MagneticButton href="#projects" className={`${styles.button} ${styles.primary}`}>
                                View Work
                            </MagneticButton>
                            <MagneticButton href="#experience" className={`${styles.button} ${styles.secondary}`}>
                                Experience
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className={styles.visual}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Tesseract />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
