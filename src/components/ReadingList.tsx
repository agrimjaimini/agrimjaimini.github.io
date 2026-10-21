import React from 'react';
import Link from 'next/link';
import type { Reading } from '@/lib/reading';
import { formatDate } from '@/lib/format';
import previews from '@/data/readingPreviews.json';
import list from './List.module.css';
import article from './ArticleLayout.module.css';
import styles from './ReadingList.module.css';

/** A saved preview: the opening of the piece, looked up ahead of time by
    scripts/reading-previews.mjs. */
interface Preview {
  excerpt: string;
  /** YYYY or YYYY-MM. */
  published?: string;
  via?: string;
}

const previewFor = (url: string) => (previews as Record<string, Preview>)[url];

/** "2020-12" → "Dec 2020"; a bare year stays as it is. */
const when = (published: string) => (published.length > 4 ? formatDate(`${published}-01`, 'month') : published);

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
            {items.map((item) => {
              const preview = previewFor(item.url);
              return (
              <li key={item.url} className={`${list.item} ${styles.item}`}>
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
                {/* On wide screens, the piece's opening in the margin while its row is hovered */}
                {preview && (
                  <aside className={styles.preview} aria-hidden>
                    <span className={styles.excerpt}>{preview.excerpt}</span>
                    {(preview.via || preview.published) && (
                      <span className={styles.previewMeta}>
                        {[preview.via, preview.published && when(preview.published)].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </aside>
                )}
              </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
