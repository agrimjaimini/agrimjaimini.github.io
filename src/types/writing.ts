export interface WritingPost {
  slug: string;
  title: string;
  date: string;           // YYYY-MM-DD
  excerpt: string;        // 150-200 chars
  tags: string[];
  featured?: boolean;
  readTime?: number;      // auto-calculated
  content: string;        // MDX content
}

export interface WritingPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  readTime?: number;
  hidden?: boolean;
}
