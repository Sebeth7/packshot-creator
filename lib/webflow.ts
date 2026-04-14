// lib/webflow.ts

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const COLLECTION_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID;

export interface WebflowArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  content?: string; // HTML content
  source: 'webflow';
}

/**
 * Fetch articles from Webflow CMS
 */
export async function getWebflowArticles(limit = 100): Promise<WebflowArticle[]> {
  if (!WEBFLOW_API_KEY || !COLLECTION_ID) {
    console.warn('Webflow API not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
          'accept-version': '1.0.0',
        },
        next: { revalidate: 3600 }, // Cache 1h
      }
    );

    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items
      .map((item: any) => {
        const f = item.fieldData || {};
        return {
          slug: f.slug || item.slug,
          title: f.name || f.title || item.name,
          description: f['post-summary'] || f.description || '',
          date: f['created-on'] || item.createdOn || '',
          image: f['main-image']?.url || f.thumbnailImage?.url,
          category: f.category,
          content: f['post-body'] || f.content, // HTML
          source: 'webflow' as const,
        };
      })
      .filter((a: WebflowArticle) => a.slug && a.slug !== 'undefined');
  } catch (error) {
    console.error('Error fetching Webflow articles:', error);
    return [];
  }
}

/**
 * Fetch single article from Webflow by slug
 */
export async function getWebflowArticle(slug: string): Promise<WebflowArticle | null> {
  const articles = await getWebflowArticles();
  return articles.find(article => article.slug === slug) || null;
}
