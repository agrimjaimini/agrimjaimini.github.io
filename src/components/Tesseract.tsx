"use client";
import React from 'react';
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

    const handlePan = (event: any, info: any) => {
        // Increased sensitivity (1.5) for easier control
        x.set(x.get() + info.delta.x * 1.5);
        y.set(y.get() + info.delta.y * 1.5);
    };

    return (
        <div className={styles.scene}>
            <motion.div
                className={styles.cubeWrapper}
                style={{ rotateX, rotateY, cursor: 'grab' }}
                onPan={handlePan}
                onPanStart={() => { document.body.style.cursor = 'grabbing'; }}
                onPanEnd={() => { document.body.style.cursor = 'auto'; }}
                whileTap={{ cursor: 'grabbing' }}
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
