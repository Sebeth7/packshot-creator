import { MetadataRoute } from 'next';
import { getWebflowGuides } from '@/lib/webflow-guides';
import { getAllArticles } from '@/lib/blog';

const BASE_URL = 'https://www.packshot-creator.com';

const SECTORS = [
  'chaussures', 'bijoux-joaillerie', 'mobilier-decoration', 'food-alimentaire',
  'cosmetiques-beaute', 'mode-textile', 'electronique-hightech',
  'pieces-techniques-industrie', 'automobile-pieces-detachees',
  'jouets-puericulture', 'sport-outdoor', 'sante-medical',
  'industrie-manufacturiere', 'defense-securite',
  'lunetterie', 'vin-spiritueux',
];

const SOLUTIONS = [
  'documentation-technique-visuelle',
  'documentation-qualite-produit',
  'documentation-probatoire',
];

const MACHINES = [
  'alphashot-micro-v2', 'alphashot-360', 'alphashot-g2', 'alphashot-pro-g2',
  'alphashot-xl-v2', 'alphashot-xl-wine-v2', 'alphashot-xl-pro-v2',
  'alphadesk', 'alphatable', 'alphastudio-compact-v2', 'alphastudio-xxl-v2',
  'fashion-studio-basic', 'fashion-studio', 'bike-studio',
  'furniture-studio', 'e-comm-studio-plus',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // --- Static pages ---
  const mainPages = [
    { path: '/fr', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/en', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/fr/studios-photo-automatises', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/en/studios-photo-automatises', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/fr/ia-photo-produit', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/en/ia-photo-produit', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/fr/academy', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/academy', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/fr/industrie', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/industrie', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/fr/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/en/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/fr/guide', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/en/guide', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/fr/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/a-propos', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/en/a-propos', priority: 0.6, changeFrequency: 'monthly' as const },
    // Academy sub-pages FR + EN
    { path: '/fr/academy/formations-packshot', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/academy/formations-packshot', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/formations-ia', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/academy/formations-ia', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/simulateur-opco', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/calendrier', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/en/academy/calendrier', priority: 0.6, changeFrequency: 'monthly' as const },
    // ROI Calculator
    { path: '/fr/calculateur-roi', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/calculateur-roi', priority: 0.8, changeFrequency: 'monthly' as const },
    // Machine selector
    { path: '/fr/studio-photo/selecteur-machines', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/studio-photo/selecteur-machines', priority: 0.7, changeFrequency: 'monthly' as const },
    // Landing SEOs
    { path: '/fr/packshot-amazon', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/packshot-amazon', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/packshot-industriel', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/packshot-industriel', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/packshot-e-commerce', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/packshot-e-commerce', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/packshot-bijoux', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/packshot-bijoux', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/packshot-mode', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/packshot-mode', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/besoins-photographie-produit', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/besoins-photographie-produit', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/questions-cles-photographie-produit', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/questions-cles-photographie-produit', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/industrie-defense', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/industrie-defense', priority: 0.7, changeFrequency: 'monthly' as const },
    // Legal FR + EN
    { path: '/fr/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/en/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/fr/cgu', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/en/cgu', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/fr/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/en/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // --- Sector pages (FR + EN) ---
  const sectorPages = SECTORS.flatMap((slug) => [
    { path: `/fr/industrie/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
    { path: `/en/industrie/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]);

  // --- Product / machine pages (FR + EN) ---
  const machinePages = MACHINES.flatMap((slug) => [
    { path: `/fr/studio-photo/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
    { path: `/en/studio-photo/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]);

  // --- Solution pages (FR + EN) ---
  const solutionPages = SOLUTIONS.flatMap((slug) => [
    { path: `/fr/solutions/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
    { path: `/en/solutions/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]);

  // --- Dynamic: Blog articles ---
  let blogPages: { path: string; priority: number; changeFrequency: 'weekly' }[] = [];
  try {
    const articles = await getAllArticles(0);
    blogPages = articles.flatMap((article) => [
      { path: `/fr/blog/${article.slug}`, priority: 0.6, changeFrequency: 'weekly' as const },
      { path: `/en/blog/${article.slug}`, priority: 0.6, changeFrequency: 'weekly' as const },
    ]);
  } catch {
    // Silently fail - blog articles are optional
  }

  // --- Dynamic: Guide pages ---
  let guidePages: { path: string; priority: number; changeFrequency: 'monthly' }[] = [];
  try {
    const guides = await getWebflowGuides();
    guidePages = guides.flatMap((guide) => [
      { path: `/fr/guide/${guide.slug}`, priority: 0.6, changeFrequency: 'monthly' as const },
      { path: `/en/guide/${guide.slug}`, priority: 0.6, changeFrequency: 'monthly' as const },
    ]);
  } catch {
    // Silently fail - guides are optional
  }

  return [
    ...mainPages,
    ...sectorPages,
    ...machinePages,
    ...solutionPages,
    ...blogPages,
    ...guidePages,
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
