"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './Writing.module.css';
import { WritingPostMetadata } from '@/types/writing';

interface WritingProps {
  posts: WritingPostMetadata[];
}

export default function Writing({ posts }: WritingProps) {
  const featuredPosts = posts.slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="writing" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>Writing</div>
          <h2 className={styles.title}>Latest Thoughts</h2>
          <p className={styles.subtitle}>
            Exploring ideas in technology, design, and software development.
          </p>
        </motion.div>

        {featuredPosts.length > 0 ? (
          <>
            <motion.div
              className={styles.grid}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {featuredPosts.map((post) => (
                <motion.div key={post.slug} variants={item}>
                  <Link href={`/writing/${post.slug}`} className={styles.cardLink}>
                    <article className={styles.card}>
                      <div className={styles.cardHeader}>
                        <time className={styles.date}>{formatDate(post.date)}</time>
                        {post.readTime && (
                          <span className={styles.readTime}>{post.readTime} min</span>
                        )}
                      </div>

                      <h3 className={styles.cardTitle}>{post.title}</h3>
                      <p className={styles.excerpt}>{post.excerpt}</p>

                      {post.tags.length > 0 && (
                        <div className={styles.tags}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className={styles.footer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/writing" className={styles.viewAllLink}>
                <span>View all posts</span>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>Posts coming soon...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
