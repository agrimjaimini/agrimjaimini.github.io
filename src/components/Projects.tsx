import React from 'react';
import { projects } from '@/data/portfolioData';
import styles from './List.module.css';

export default function Projects() {
    return (
        <ul className={styles.list}>
            {projects.map((project) => {
                const href = project.github ?? project.demo;
                const content = (
                    <>
                        <span className={styles.main}>
                            <span className={styles.title}>{project.title}</span>
                            <span className={styles.swap}>
                                <span className={styles.sub}>{project.summary}</span>
                                <span className={`${styles.sub} ${styles.stack}`} aria-hidden>
                                    {project.tech.slice(0, 4).join(' · ')}
                                </span>
                            </span>
                        </span>
                        <span className={styles.leader} aria-hidden />
                        <span className={styles.meta}>
                            {project.date?.slice(-4)}
                            {href && <span className={`${styles.arrow} ${styles.toggle}`}>↗</span>}
                        </span>
                    </>
                );
                return (
                    <li key={project.title} className={styles.item}>
                        {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.row}>
                                {content}
                            </a>
                        ) : (
                            <div className={styles.row}>{content}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
