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
  // A plain wrapper: Next focuses a page's first element after navigating, and
  // Safari draws a focus ring if that's a link (here, the back link).
  return (
    <div>
      <Link href="/writing" className={`${styles.back} enter`}><span className={styles.arrow}>←</span> Writing</Link>
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
    </div>
  );
}
