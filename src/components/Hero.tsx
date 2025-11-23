"use client";
import React, { useRef, useState } from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import Tesseract from './Tesseract';

const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
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
