"use client";
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

export default function WritingScrollProgress() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.querySelector('.writing-page') as HTMLElement;
    containerRef.current = container;
  }, []);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={styles.progressBar}
      style={{ scaleX }}
    />
  );
}
