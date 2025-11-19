"use client";
import React from 'react';
import styles from './Navigation.module.css';
import { motion } from 'framer-motion';

export default function Navigation() {
    return (
        <motion.nav
            className={`${styles.nav} glass`}
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <a href="#" className={styles.link}>Home</a>
            <a href="#experience" className={styles.link}>Experience</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#skills" className={styles.link}>Skills</a>
            <a href="#education" className={styles.link}>Education</a>
            <a href="#contact" className={styles.link}>Contact</a>
        </motion.nav>
    );
}
