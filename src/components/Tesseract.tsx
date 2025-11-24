"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './Tesseract.module.css';

export default function Tesseract() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth "setting in" rotation
    const springConfig = { damping: 20, stiffness: 100, mass: 1 };

    // Map pan values directly to degrees without clamping
    // We use a transform function instead of range mapping to allow infinite rotation
    const rotateX = useSpring(useTransform(y, (value) => value * -0.5), springConfig);
    const rotateY = useSpring(useTransform(x, (value) => value * 0.5), springConfig);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const { innerWidth, innerHeight } = window;
            const centerX = innerWidth / 2;
            const centerY = innerHeight / 2;
            const relX = event.clientX - centerX;
            const relY = event.clientY - centerY;
            const maxTilt = 80;

            const nextX = Math.max(-maxTilt, Math.min(maxTilt, (relX / (innerWidth / 2)) * maxTilt));
            const nextY = Math.max(-maxTilt, Math.min(maxTilt, (relY / (innerHeight / 2)) * maxTilt));

            x.set(nextX);
            y.set(nextY);
        };

        const handleLeave = () => {
            x.set(0);
            y.set(0);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerleave', handleLeave);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerleave', handleLeave);
        };
    }, [x, y]);

    return (
        <div className={styles.scene}>
            <motion.div
                className={styles.cubeWrapper}
                style={{ rotateX, rotateY, cursor: 'default' }}
            >
                {/* Outer Cube */}
                <div className={styles.outerCube}>
                    <div className={`${styles.outerFace} ${styles.front}`} />
                    <div className={`${styles.outerFace} ${styles.back}`} />
                    <div className={`${styles.outerFace} ${styles.right}`} />
                    <div className={`${styles.outerFace} ${styles.left}`} />
                    <div className={`${styles.outerFace} ${styles.top}`} />
                    <div className={`${styles.outerFace} ${styles.bottom}`} />
                </div>

                {/* Inner Cube */}
                <div className={styles.innerCube}>
                    <div className={`${styles.innerFace} ${styles.front}`} />
                    <div className={`${styles.innerFace} ${styles.back}`} />
                    <div className={`${styles.innerFace} ${styles.right}`} />
                    <div className={`${styles.innerFace} ${styles.left}`} />
                    <div className={`${styles.innerFace} ${styles.top}`} />
                    <div className={`${styles.innerFace} ${styles.bottom}`} />
                </div>


            </motion.div>
        </div>
    );
}
