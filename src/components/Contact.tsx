"use client";
import React from 'react';
import styles from './Contact.module.css';
import { contactMethods } from '@/data/portfolioData';

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <h2 className="section-title">Get in Touch</h2>
                <div className={styles.grid}>
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;

                        return (
                            <a
                                key={index}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.card} glass`}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={30} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.title}>{method.title}</h3>
                                <span className={styles.value}>{method.value}</span>
                                <p className={styles.description}>{method.description}</p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
