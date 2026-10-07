import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/writing';

export const dynamic = 'force-static';

const SITE = 'https://agrimjaimini.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE}/writing/${post.slug}`,
    lastModified: post.date,
  }));
  return [{ url: SITE }, { url: `${SITE}/writing` }, ...posts];
}
