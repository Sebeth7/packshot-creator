// lib/blog.ts

import { getWebflowArticles } from './webflow';
import { getSanityBlogPosts, urlFor } from './sanity-blog';

export interface SanityArticle {
  _id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category?: string;
  keywords?: string[];
  readingTime: number;
  image?: string;
  content: string; // Empty for listing
  source: 'sanity';
}

export type Article = SanityArticle | import('./webflow').WebflowArticle;

/**
 * Get all articles (Sanity + Webflow merged)
 */
export async function getAllArticles(limit = 8): Promise<Article[]> {
  // Fetch from both sources in parallel
  const [sanityPosts, webflowArticles] = await Promise.all([
    getSanityBlogPosts(),
    getWebflowArticles(),
  ]);

  // Convert Sanity posts to common Article format
  const sanityArticles: SanityArticle[] = sanityPosts.map(post => ({
    _id: post._id,
    slug: post.slug.current,
    title: post.title,
    description: post.description,
    author: post.author,
    date: post.date,
    category: post.category,
    keywords: post.keywords,
    readingTime: post.readingTime,
    image: post.image ? urlFor(post.image).width(800).height(400).url() : undefined,
    source: 'sanity' as const,
    content: '', // Not needed for listing
  }));

  // Merge and sort by date (most recent first)
  const allArticles = [...sanityArticles, ...webflowArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
