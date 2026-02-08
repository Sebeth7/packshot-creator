import { test, expect } from '@playwright/test';

const pages = [
  '/fr',
  '/fr/studios-photo-automatises',
  '/fr/ia-photo-produit',
  '/fr/academy',
  '/fr/contact',
  '/fr/a-propos',
];

test.describe('External links attributes', () => {
  for (const pageUrl of pages) {
    test(`all external links have target="_blank" on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const missingTarget = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="http"]'));
        const external = links.filter(a => {
          const href = a.getAttribute('href') || '';
          return !href.includes('localhost') && !href.includes('packshot-creator');
        });
        return external
          .filter(a => a.getAttribute('target') !== '_blank')
          .map(a => a.getAttribute('href'));
      });

      expect(missingTarget, `Links missing target="_blank" on ${pageUrl}`).toEqual([]);
    });

    test(`all external links have rel="noopener noreferrer" on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const missingRel = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="http"]'));
        const external = links.filter(a => {
          const href = a.getAttribute('href') || '';
          return !href.includes('localhost') && !href.includes('packshot-creator');
        });
        return external
          .filter(a => {
            const rel = a.getAttribute('rel') || '';
            return !rel.includes('noopener') || !rel.includes('noreferrer');
          })
          .map(a => a.getAttribute('href'));
      });

      expect(missingRel, `Links missing rel="noopener noreferrer" on ${pageUrl}`).toEqual([]);
    });
  }
});
