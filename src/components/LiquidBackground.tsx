"use client";
import React from 'react';
import styles from './LiquidBackground.module.css';

export default function LiquidBackground() {
    return (
        <div className={styles.container}>
            <div className={styles.orb1}></div>
            <div className={styles.orb2}></div>
            <div className={styles.orb3}></div>
            <div className={styles.overlay}></div>
        </div>
    );
}
