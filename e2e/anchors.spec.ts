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

  test('#secteurs exists on /fr/industrie', async ({ page }) => {
    await page.goto('/fr/industrie');
    const hasId = await page.evaluate(() => !!document.getElementById('secteurs'));
    expect(hasId).toBe(true);
  });
});
