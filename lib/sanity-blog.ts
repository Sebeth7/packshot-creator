import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityBlogClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(sanityBlogClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Types
export interface SanityBlogPost {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  keywords?: string[];
  readingTime: number;
  image?: any;
  content: any[]; // Portable Text
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    noIndex?: boolean;
  };
}

// Queries GROQ
export async function getSanityBlogPosts(limit = 100): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost"] | order(date desc) [0...${limit}] {
    _id,
    slug,
    title,
    description,
    author,
    date,
    category,
    keywords,
    readingTime,
    image,
    content,
    seo
  }`;

  return sanityBlogClient.fetch(query);
}

export async function getSanityBlogPost(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    author,
    date,
    category,
    keywords,
    readingTime,
    image,
    content,
    seo
  }`;

  return sanityBlogClient.fetch(query, { slug });
}
