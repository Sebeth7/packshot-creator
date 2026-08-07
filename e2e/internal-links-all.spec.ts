import { test, expect } from '@playwright/test';

/**
 * Extended Internal Links Tests - All main pages
 * Complement to internal-links.spec.ts (which covers FR/EN homepage + studios)
 */

const pages = [
  '/fr/ia-photo-produit',
  '/fr/academy',
  '/fr/industrie',
  '/fr/contact',
  '/fr/blog',
  '/fr/a-propos',
  '/fr/studio-photo/alphashot-pro-g2',
  '/fr/industrie/chaussures',
  '/fr/prix-packshot-photo-produit',
  '/fr/methodologie-calculateur-roi',
  '/fr/questions-cles-photographie-produit',
];

test.describe('Internal links - All pages', () => {
  for (const pageUrl of pages) {
    test(`no broken internal links on ${pageUrl}`, async ({ page, request }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const links = await page.$$eval('a[href^="/"]', els =>
        els.map(el => el.getAttribute('href')).filter(Boolean)
      );

      const uniqueLinks = [...new Set(links)] as string[];
      const broken: string[] = [];

      for (const link of uniqueLinks) {
        try {
          const response = await request.get(link);
          if (response.status() >= 400) {
            broken.push(`${link} -> ${response.status()}`);
          }
        } catch {
          broken.push(`${link} -> ERROR`);
        }
      }

      if (broken.length > 0) {
        console.log(`Broken links on ${pageUrl}:`, broken);
      }
      expect(broken, `Broken links on ${pageUrl}`).toEqual([]);
    });
  }
});
