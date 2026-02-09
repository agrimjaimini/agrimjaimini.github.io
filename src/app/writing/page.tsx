import React from 'react';
import WritingList from '@/components/WritingList';
import { getAllPosts } from '@/lib/writing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Ideas, reflections, and explorations on topics that spark curiosity.',
};

export default function WritingPage() {
  const posts = getAllPosts();

  return <WritingList posts={posts} />;
}
