import React from 'react';
import Link from 'next/link';
import type { WritingPostMetadata } from '@/types/writing';
import PostList from './PostList';
import styles from './ArticleLayout.module.css';

export default function WritingList({ posts }: { posts: WritingPostMetadata[] }) {
  // A plain wrapper: Next focuses a page's first element after navigating, and
  // Safari draws a focus ring if that's a link (here, the back link).
  return (
    <div>
      <Link href="/" className={`${styles.back} enter`}>← Agrim Jaimini</Link>
      <header className={`${styles.header} enter`} style={{ '--i': 1 } as React.CSSProperties}>
        <h1 className={styles.title}>Writing</h1>
      </header>
      <div className="enter" style={{ '--i': 2 } as React.CSSProperties}>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
