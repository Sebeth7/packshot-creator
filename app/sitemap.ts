import { MetadataRoute } from 'next';

const BASE_URL = 'https://packshot-creator.com';

const SECTORS = [
  'chaussures', 'bijoux-joaillerie', 'mobilier-decoration', 'food-alimentaire',
  'cosmetiques-beaute', 'mode-textile', 'electronique-hightech',
  'pieces-techniques-industrie', 'automobile-pieces-detachees',
  'jouets-puericulture', 'sport-outdoor', 'sante-medical',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    { path: '/fr/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/en/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/a-propos', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/en/a-propos', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/formations-packshot', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/formations-ia', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/simulateur-opco', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fr/academy/calendrier', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fr/studio-photo/selecteur-machines', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/fr/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/fr/cgu', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/fr/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const sectorPages = SECTORS.flatMap((slug) => [
    { path: `/fr/industrie/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
    { path: `/en/industrie/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]);

  return [...mainPages, ...sectorPages].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
