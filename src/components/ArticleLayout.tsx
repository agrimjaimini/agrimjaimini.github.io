import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/format';
import styles from './ArticleLayout.module.css';

interface ArticleLayoutProps {
  title: string;
  date: string;
  readTime?: number;
  children: React.ReactNode;
}

export default function ArticleLayout({ title, date, readTime, children }: ArticleLayoutProps) {
  return (
    <>
      <Link href="/writing" className={`${styles.back} enter`}>← Writing</Link>
      <header className={`${styles.header} enter`} style={{ '--i': 1 } as React.CSSProperties}>
        <h1 className={styles.title}>{title}</h1>
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
