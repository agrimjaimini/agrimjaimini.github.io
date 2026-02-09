"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import styles from './ArticleLayout.module.css';

interface ArticleLayoutProps {
  title: string;
  date: string;
  readTime?: number;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  date,
  readTime,
  children,
}: ArticleLayoutProps) {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/writing" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Writing</span>
        </Link>
      </motion.div>

      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.meta}>
          <time className={styles.date}>{formatDate(date)}</time>
          {readTime && (
            <>
              <span className={styles.separator}>·</span>
              <span className={styles.readTime}>{readTime} min read</span>
            </>
          )}
        </div>
      </motion.header>

      <motion.article
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.article>
    </div>
  );
}
