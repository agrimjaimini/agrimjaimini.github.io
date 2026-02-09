"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './WritingList.module.css';
import WritingCard from './WritingCard';
import { WritingPostMetadata } from '@/types/writing';

interface WritingListProps {
  posts: WritingPostMetadata[];
}

export default function WritingList({ posts }: WritingListProps) {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.eyebrow}>Writing</div>
        <h1 className={styles.title}>Thoughts & Essays</h1>
        <p className={styles.subtitle}>
          Ideas, reflections, and explorations on topics that spark curiosity.
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>No posts yet. Check back soon!</p>
        </motion.div>
      ) : (
        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <WritingCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
