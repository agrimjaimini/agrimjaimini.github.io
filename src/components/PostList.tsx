import React from 'react';
import Link from 'next/link';
import type { WritingPostMetadata } from '@/types/writing';
import { formatDate } from '@/lib/format';
import Morph from './Morph';
import styles from './List.module.css';

export default function PostList({ posts }: { posts: WritingPostMetadata[] }) {
    if (posts.length === 0) {
        return <p>Nothing published yet.</p>;
    }

    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={post.slug} className={styles.item}>
                    <Link href={`/writing/${post.slug}`} className={styles.row}>
                        <span className={styles.main}>
                            <Morph name={`post-${post.slug}`}>
                                <span className={styles.title}>{post.title}</span>
                            </Morph>
                        </span>
                        <span className={styles.leader} aria-hidden />
                        <time className={styles.meta} dateTime={post.date}>
                            {formatDate(post.date, 'short')}
                        </time>
                        <span className={styles.toggle} aria-hidden>→</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
