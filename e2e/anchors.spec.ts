import { test, expect } from '@playwright/test';

test.describe('Anchor Links', () => {
  const pages = [
    '/fr',
    '/fr/studios-photo-automatises',
    '/fr/academy',
    '/fr/industrie',
    '/fr/contact',
  ];

  for (const pageUrl of pages) {
    test(`every href with # should have a matching id on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      const brokenAnchors = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href*="#"]'));
        const broken: string[] = [];
        for (const a of anchors) {
          const href = a.getAttribute('href') || '';
          // Only check same-page anchors (starting with # or same path)
          const currentPath = window.location.pathname;
          let fragment: string | null = null;
          if (href.startsWith('#')) {
            fragment = href.slice(1);
          } else if (href.includes('#')) {
            const url = new URL(href, window.location.origin);
            if (url.pathname === currentPath) {
              fragment = url.hash.slice(1);
            }
          }
          if (fragment && fragment.length > 0) {
            const target = document.getElementById(fragment);
            if (!target) {
              broken.push(`#${fragment} (from href="${href}")`);
            }
          }
        }
        return broken;
      });
      expect(brokenAnchors, `Broken anchors: ${brokenAnchors.join(', ')}`).toHaveLength(0);
    });
  }

  test('#calculateur-roi exists on /fr/studios-photo-automatises', async ({ page }) => {
    await page.goto('/fr/studios-photo-automatises');
    const el = page.locator('#calculateur-roi');
    await expect(el).toBeAttached();
  });

  test('#secteurs exists on /fr/industrie', async ({ page }) => {
    await page.goto('/fr/industrie');
    const hasId = await page.evaluate(() => !!document.getElementById('secteurs'));
    expect(hasId).toBe(true);
  });
});

// Destination directe des CTA ROI (décision de Laurent du 06/10/2026, D47 ; remplace l'option B
// d'AR-01 du 03/10). Les 18 liens « Calculer mon ROI » de ces 7 sources visent le calculateur
// localisé, sans détour par /studios-photo-automatises#… ; le nombre de liens corrigés par fichier
// est la borne basse attendue sur chaque page.
//
// Exclu volontairement : le témoin du pilote Studios (/{lang}/studio-photo/selecteur-machines,
// /de-ch/fotostudio/maschinen-finder) garde son lien vers /studios-photo-automatises#calculateur-roi.
// Il n'est pas testé ici comme destination directe. Le test « #calculateur-roi exists on
// /fr/studios-photo-automatises » ci-dessus reste en échec tant que ce témoin est conservé.
test.describe('Liens ROI directs vers le calculateur (7 sources)', () => {
  const CALCULATEUR = { fr: '/fr/calculateur-roi', en: '/en/calculateur-roi' } as const;
  const SOURCES: ReadonlyArray<[slug: string, liensCorriges: number]> = [
    ['blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026', 2],
    ['blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026', 2],
    ['comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet', 6],
    ['guide-achat-studio-2026', 5],
    ['ia-photo-produit-guide-2026', 1],
    ['orbitvu-vs-concurrents', 1],
    ['prestataire-packshot-vs-studio-interne', 1],
  ];

  // Aucun appel réel : le calculateur FR est un conseiller adossé à une API facturée.
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/**', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"simule":true}' }));
  });

  for (const lang of ['fr', 'en'] as const) {
    for (const [slug, liensCorriges] of SOURCES) {
      test(`${slug} (${lang}) : aucun détour par Studios, ${liensCorriges} lien(s) ROI au moins vers ${CALCULATEUR[lang]}`, async ({ page }) => {
        await page.goto(`/${lang}/blog/${slug}`);
        await expect(page.locator('a[href*="/studios-photo-automatises#"]')).toHaveCount(0);
        expect(await page.locator(`a[href="${CALCULATEUR[lang]}"]`).count()).toBeGreaterThanOrEqual(liensCorriges);
      });
    }

    test(`la destination ${CALCULATEUR[lang]} répond`, async ({ page }) => {
      const reponse = await page.goto(CALCULATEUR[lang]);
      expect(reponse?.status()).toBe(200);
    });
  }
});
