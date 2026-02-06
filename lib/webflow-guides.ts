// lib/webflow-guides.ts

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const GUIDE_COLLECTION_ID = process.env.WEBFLOW_GUIDE_COLLECTION_ID;

export interface GuideStep {
  title: string;
  image?: string;
  content: string; // HTML
  structuredText?: string; // Plain text for Schema.org
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface WebflowGuide {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  mainTitle: string;
  mainImage?: string;
  tool?: string;
  duration?: string;
  logistics?: string;
  introMedia?: string; // HTML
  introText?: string; // HTML
  steps: GuideStep[];
  faqs: GuideFAQ[];
  createdOn: string;
  updatedOn: string;
}

/**
 * Fetch all guides from Webflow CMS
 */
export async function getWebflowGuides(): Promise<WebflowGuide[]> {
  if (!WEBFLOW_API_KEY || !GUIDE_COLLECTION_ID) {
    console.warn('Webflow Guide API not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${GUIDE_COLLECTION_ID}/items?limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => parseGuideItem(item));
  } catch (error) {
    console.error('Error fetching Webflow guides:', error);
    return [];
  }
}

/**
 * Fetch a single guide by slug
 */
export async function getWebflowGuide(slug: string): Promise<WebflowGuide | null> {
  const guides = await getWebflowGuides();
  return guides.find(g => g.slug === slug) || null;
}

/**
 * Parse a raw Webflow CMS item into our Guide type
 */
function parseGuideItem(item: any): WebflowGuide {
  const f = item.fieldData || {};

  // Parse steps (1-10)
  const steps: GuideStep[] = [];
  for (let i = 1; i <= 10; i++) {
    const title = f[`titre-etape-${i}`];
    if (!title) break;
    steps.push({
      title,
      image: f[`image-etape-${i}`]?.url,
      content: f[`texte-etape-${i}`] || '',
      structuredText: f[`texte-etape-${i}---donnees-structurees-2`] || '',
    });
  }

  // Parse FAQs (1-5)
  const faqs: GuideFAQ[] = [];
  for (let i = 1; i <= 5; i++) {
    const question = f[`question-${i}---faq`];
    const answer = f[`reponse-${i}---faq`];
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return {
    slug: f.slug,
    name: f.name,
    metaTitle: f['meta-titre'] || f.name,
    metaDescription: f['meta-description'] || '',
    mainTitle: f['titre-principal'] || f.name,
    mainImage: f['image-principale']?.url,
    tool: f['champ-outil'],
    duration: f['champ-duree'],
    logistics: f['champ-logistique'],
    introMedia: f['premiere-image-video'],
    introText: f['texte-introduction'],
    steps,
    faqs,
    createdOn: item.createdOn || '',
    updatedOn: item.lastUpdated || '',
  };
}
