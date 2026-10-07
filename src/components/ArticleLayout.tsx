import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/format';
import Morph from './Morph';
import styles from './ArticleLayout.module.css';

interface ArticleLayoutProps {
  title: string;
  slug: string;
  date: string;
  readTime?: number;
  children: React.ReactNode;
}

export default function ArticleLayout({ title, slug, date, readTime, children }: ArticleLayoutProps) {
  return (
    <>
      <Link href="/writing" className={`${styles.back} enter`}>← Writing</Link>
      <header className={`${styles.header} enter`} style={{ '--i': 1 } as React.CSSProperties}>
        <Morph name={`post-${slug}`}>
          <h1 className={`${styles.title} ${styles.articleTitle}`}>{title}</h1>
        </Morph>
        <p className={styles.meta}>
          <time dateTime={date}>{formatDate(date)}</time>
          {readTime ? ` · ${readTime} min read` : ''}
        </p>
      </header>
      <article className="enter" style={{ '--i': 2 } as React.CSSProperties}>
        {children}
      </article>
    </>
  );
}
