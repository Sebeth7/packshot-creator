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

  // AR-01 : l'ancre est la cible de liens internes dans les trois langues (blog, sélecteur).
  for (const lang of ['en', 'de-ch']) {
    test(`#calculateur-roi exists on /${lang}/studios-photo-automatises`, async ({ page }) => {
      await page.goto(`/${lang}/studios-photo-automatises`);
      await expect(page.locator('#calculateur-roi')).toBeAttached();
    });
  }

  test('le lien « Calculer mon ROI » du sélecteur atteint la section ROI de Studios', async ({ page }) => {
    await page.goto('/fr/studio-photo/selecteur-machines');
    const href = await page.locator('a[href$="#calculateur-roi"]').first().getAttribute('href');
    expect(href).toBe('/fr/studios-photo-automatises#calculateur-roi');
    await page.goto(href!);
    const section = page.locator('#calculateur-roi');
    await expect(section).toBeAttached();
    await expect(section.locator('a[href="/fr/calculateur-roi"]')).toBeAttached();
  });

  for (const lang of ['fr', 'en']) {
    test(`le CTA ROI de prestataire-packshot-vs-studio-interne vise #calculateur-roi (${lang})`, async ({ page }) => {
      await page.goto(`/${lang}/blog/prestataire-packshot-vs-studio-interne`);
      const vers = await page.locator('a[href*="/studios-photo-automatises#"]').evaluateAll((liens) => liens.map((a) => a.getAttribute('href')));
      expect(vers.length).toBeGreaterThan(0);
      for (const href of vers) expect(href).toBe(`/${lang}/studios-photo-automatises#calculateur-roi`);
    });
  }

  // AR-01 : un seul élément porte l'identifiant, quelle que soit la langue.
  test('#calculateur-roi est unique sur Studios (fr, en, de-ch)', async ({ page }) => {
    for (const lang of ['fr', 'en', 'de-ch']) {
      await page.goto(`/${lang}/studios-photo-automatises`);
      await expect(page.locator('[id="calculateur-roi"]'), lang).toHaveCount(1);
    }
  });

  // AR-01 : pages qui lient la section ROI de Studios (inventaire du 03/10/2026, 17 pages).
  // Chaque lien vers Studios porteur d'un fragment vise #calculateur-roi, qui existe sur la cible.
  test('les liens des pages sources vers la section ROI de Studios aboutissent', async ({ page }) => {
    test.slow(); // 20 chargements de page dans un seul test
    const articles = [
      'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
      'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
      'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
      'guide-achat-studio-2026',
      'ia-photo-produit-guide-2026',
      'orbitvu-vs-concurrents',
      'prestataire-packshot-vs-studio-interne',
    ];
    const sources = [
      ...['fr', 'en'].flatMap((lang) => articles.map((slug) => `/${lang}/blog/${slug}`)),
      '/fr/studio-photo/selecteur-machines',
      '/en/studio-photo/selecteur-machines',
      '/de-ch/fotostudio/maschinen-finder',
    ];
    for (const source of sources) {
      await page.goto(source);
      const lang = source.split('/')[1];
      const hrefs = await page
        .locator('a[href*="/studios-photo-automatises#"]')
        .evaluateAll((liens) => liens.map((a) => a.getAttribute('href')));
      expect(hrefs.length, source).toBeGreaterThan(0);
      for (const href of hrefs) expect(href, source).toBe(`/${lang}/studios-photo-automatises#calculateur-roi`);
    }
    for (const lang of ['fr', 'en', 'de-ch']) {
      await page.goto(`/${lang}/studios-photo-automatises#calculateur-roi`);
      await expect(page.locator('#calculateur-roi')).toBeAttached();
    }
  });

  test('#secteurs exists on /fr/industrie', async ({ page }) => {
    await page.goto('/fr/industrie');
    const hasId = await page.evaluate(() => !!document.getElementById('secteurs'));
    expect(hasId).toBe(true);
  });
});
