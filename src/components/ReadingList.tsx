import React from 'react';
import Link from 'next/link';
import type { Reading } from '@/lib/reading';
import { formatDate } from '@/lib/format';
import list from './List.module.css';
import article from './ArticleLayout.module.css';
import styles from './ReadingList.module.css';

export default function ReadingList({ items }: { items: Reading[] }) {
  return (
    <div>
      <Link href="/" className={`${article.back} enter`}><span className={article.arrow}>←</span> Agrim Jaimini</Link>
      <header className={`${article.header} enter`} style={{ '--i': 1 } as React.CSSProperties}>
        <h1 className={article.title}>Reading</h1>
      </header>
      <div className="enter" style={{ '--i': 2 } as React.CSSProperties}>
        {items.length === 0 ? (
          <p>Nothing here yet.</p>
        ) : (
          <ul className={list.list}>
            {items.map((item) => (
              <li key={item.url} className={list.item}>
                <a href={item.url} className={list.row} target="_blank" rel="noopener noreferrer">
                  <span className={styles.stack}>
                    <span className={list.title}>{item.title}</span>
                    <span className={styles.line}>
                      <span className={styles.source}>{item.source}</span>
                      {item.note && <>. {item.note}</>}
                    </span>
                  </span>
                  <span className={list.leader} aria-hidden />
                  <time className={list.meta} dateTime={item.date}>
                    {formatDate(item.date, 'month')}
                  </time>
                  <span className={list.toggle} aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
