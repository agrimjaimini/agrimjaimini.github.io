"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { motion } from 'framer-motion';

const navItems = [
    { id: '', label: 'Home', href: '#' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'writing', label: 'Writing', href: '#writing' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('');
    const isHomePage = pathname === '/';

    useEffect(() => {
        if (!isHomePage) {
            setActiveSection('');
            return;
        }

        const container = document.getElementById('main-scroll');
        if (!container) return;

        const handleScroll = () => {
            const sections = ['experience', 'projects', 'writing', 'skills', 'education', 'contact'];
            const scrollPosition = container.scrollTop + 200;

            if (container.scrollTop < 100) {
                setActiveSection('');
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    return;
                }
            }
        };

        container.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isHomePage) return;

        event.preventDefault();
        const container = document.getElementById('main-scroll');
        if (!container) return;

        if (href === '#') {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            const top = (element as HTMLElement).offsetTop;
            container.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const isActive = (item: typeof navItems[0]) => {
        return isHomePage && activeSection === item.id;
    };

    return (
        <motion.nav
            className={styles.nav}
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            {navItems.map((item) => {
                const active = isActive(item);

                // On home page: use anchor with smooth scroll
                if (isHomePage) {
                    return (
                        <a
                            key={item.id || 'home'}
                            href={item.href}
                            className={`${styles.link} ${active ? styles.active : ''}`}
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    );
                }

                // On other pages: use Link for cross-page navigation
                const targetHref = item.href === '#' ? '/' : `/${item.href}`;
                return (
                    <Link
                        key={item.id || 'home'}
                        href={targetHref}
                        className={`${styles.link} ${active ? styles.active : ''}`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </motion.nav>
    );
}
