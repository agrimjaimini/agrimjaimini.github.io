"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './WritingTeaser.module.css';

export default function WritingTeaser() {
    return (
        <section id="writing" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Essays & Thoughts</span>
                    <h2 className={styles.title}>Writing</h2>
                    <p className={styles.description}>
                        Ideas, reflections, and explorations on topics that spark curiosity.
                    </p>
                    <Link href="/writing" className={styles.link}>
                        <span>Read my writing</span>
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
