"use client";
import React, { useRef, useEffect } from 'react';
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

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && containerRef.current) {
            const timeoutId = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element && containerRef.current) {
                    const top = (element as HTMLElement).offsetTop;
                    containerRef.current.scrollTo({ top, behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, []);

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
