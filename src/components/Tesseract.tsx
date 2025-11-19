"use client";
import React, { useRef, useEffect } from 'react';
import styles from './Tesseract.module.css';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function Tesseract() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse interaction state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [45, -45]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-45, 45]), { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const x = (e.clientX / width) - 0.5;
            const y = (e.clientY / height) - 0.5;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            className={styles.scene}
            ref={containerRef}
        >
            <motion.div
                className={styles.tesseract}
                style={{ rotateX, rotateY }}
            >
                {/* Outer Cube */}
                <div className={`${styles.cube} ${styles.outer}`}>
                    <div className={`${styles.face} ${styles.front}`}></div>
                    <div className={`${styles.face} ${styles.back}`}></div>
                    <div className={`${styles.face} ${styles.right}`}></div>
                    <div className={`${styles.face} ${styles.left}`}></div>
                    <div className={`${styles.face} ${styles.top}`}></div>
                    <div className={`${styles.face} ${styles.bottom}`}></div>
                </div>

                {/* Inner Cube */}
                <div className={`${styles.cube} ${styles.inner}`}>
                    <div className={`${styles.face} ${styles.front}`}></div>
                    <div className={`${styles.face} ${styles.back}`}></div>
                    <div className={`${styles.face} ${styles.right}`}></div>
                    <div className={`${styles.face} ${styles.left}`}></div>
                    <div className={`${styles.face} ${styles.top}`}></div>
                    <div className={`${styles.face} ${styles.bottom}`}></div>
                </div>

                {/* Glowing Core */}
                <div className={styles.core}></div>
            </motion.div>
        </div>
    );
}
