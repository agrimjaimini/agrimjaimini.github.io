"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './WritingCard.module.css';
import { WritingPostMetadata } from '@/types/writing';

interface WritingCardProps {
  post: WritingPostMetadata;
}

export default function WritingCard({ post }: WritingCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/writing/${post.slug}`} className={styles.cardLink}>
      <motion.article
        className={styles.card}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.cardHeader}>
          <time className={styles.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <span className={styles.readTime}>{post.readTime} min read</span>
          )}
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        <p className={styles.excerpt}>{post.excerpt}</p>
      </motion.article>
    </Link>
  );
}
