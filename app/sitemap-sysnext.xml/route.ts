/**
 * Sitemap partiel dédié à Sysnext Industrial Solutions.
 *
 * Règle R4 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Le sitemap racine `/sitemap.xml` couvre les pages PKC. Celui-ci liste
 * exclusivement les URLs sous `/[lang]/industrie-solutions/*`.
 *
 * `public/robots.txt` référence les deux sitemaps.
 * Source : config/cohabitation-marques.md §3 R4.
 */

const BASE_URL = 'https://www.packshot-creator.com';

const SYSNEXT_PAGES: Array<{ path: string; priority: number; changefreq: string }> = [
  { path: '/industrie-solutions', priority: 0.9, changefreq: 'weekly' },
  { path: '/industrie-solutions/catalogue-pieces-detachees', priority: 0.9, changefreq: 'monthly' },
  { path: '/industrie-solutions/controle-qualite-inspection', priority: 0.8, changefreq: 'monthly' },
  { path: '/industrie-solutions/mro-aeronautique-civile', priority: 0.8, changefreq: 'monthly' },
  { path: '/industrie-solutions/documentation-forensique', priority: 0.7, changefreq: 'monthly' },
  { path: '/industrie-solutions/formation-technique-ar-vr', priority: 0.7, changefreq: 'monthly' },
  { path: '/industrie-solutions/calculateur-roi', priority: 0.8, changefreq: 'monthly' },
  { path: '/industrie-solutions/blog', priority: 0.7, changefreq: 'weekly' },
];

function escape(xml: string): string {
  return xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const now = new Date().toISOString();

  const urls = SYSNEXT_PAGES.flatMap(({ path, priority, changefreq }) =>
    (['fr', 'en'] as const).map((lang) => {
      const url = `${BASE_URL}/${lang}${path}`;
      const altFr = `${BASE_URL}/fr${path}`;
      const altEn = `${BASE_URL}/en${path}`;
      return `
  <url>
    <loc>${escape(url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${escape(altFr)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escape(altEn)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(altFr)}" />
  </url>`;
    }),
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
