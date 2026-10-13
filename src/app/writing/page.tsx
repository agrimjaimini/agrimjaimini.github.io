import React from 'react';
import WritingList from '@/components/WritingList';
import { getAllPosts } from '@/lib/writing';
import type { Metadata } from 'next';

const description = 'Notes on what I’m learning, from the math behind it to the code.';

export const metadata: Metadata = {
  title: 'Writing',
  description,
  alternates: { canonical: '/writing' },
  openGraph: {
    title: 'Writing — Agrim Jaimini',
    description,
    url: '/writing',
    siteName: 'Agrim Jaimini',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Agrim Jaimini' }],
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return <WritingList posts={posts} />;
}
