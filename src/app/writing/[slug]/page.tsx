import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ArticleLayout from '@/components/ArticleLayout';
import { MDXComponents } from '@/components/MDXComponents';
import { getPostBySlug, getAllPostSlugs } from '@/lib/writing';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamicParams = false;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/writing/${slug}`,
      publishedTime: post.date,
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og.png'],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <ArticleLayout
      title={post.title}
      slug={slug}
      date={post.date}
      readTime={post.readTime}
    >
      <MDXRemote
        source={post.content}
        components={MDXComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }}
      />
    </ArticleLayout>
  );
}
