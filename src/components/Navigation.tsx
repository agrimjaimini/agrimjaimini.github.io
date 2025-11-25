"use client";
import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { motion } from 'framer-motion';

const navItems = [
    { id: '', label: 'Home', href: '#' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const container = document.getElementById('main-scroll');
        if (!container) return;

        const handleScroll = () => {
            const sections = navItems.map(item => item.id).filter(id => id !== '');
            const scrollPosition = container.scrollTop + 200;

            // Check if we're at the top
            if (container.scrollTop < 100) {
                setActiveSection('');
                return;
            }

            // Find the current section
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    return;
                }
            }
        };

        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

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
            const top = (element as HTMLElement).offsetTop;
            container.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={styles.nav}
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={item.href}
                    className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                >
                    {item.label}
                </a>
            ))}
        </motion.nav>
    );
}
