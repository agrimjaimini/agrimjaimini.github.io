"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

export default function ScrollContainer({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className={styles.progressBar}
                style={{ scaleX }}
            />
            <main
                ref={containerRef}
                className="main-scroll"
                id="main-scroll"
            >
                {children}
            </main>
        </>
    );
}
