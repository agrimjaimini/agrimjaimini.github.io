"use client";
import React from 'react';
import styles from './Navigation.module.css';
import { motion } from 'framer-motion';

export default function Navigation() {
    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        event.preventDefault();
        const container = document.getElementById('main-scroll');
        if (!container) return;

        if (target === '#') {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.querySelector(target);
        if (element) {
            // Calculate position relative to container
            const top = (element as HTMLElement).offsetTop;
            container.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`${styles.nav} glass`}
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <a href="#" className={styles.link} onClick={(e) => handleNavClick(e, '#')}>Home</a>
            <a href="#experience" className={styles.link} onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
            <a href="#projects" className={styles.link} onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
            <a href="#skills" className={styles.link} onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
            <a href="#education" className={styles.link} onClick={(e) => handleNavClick(e, '#education')}>Education</a>
            <a href="#contact" className={styles.link} onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </motion.nav>
    );
}
