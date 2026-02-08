import { test, expect } from '@playwright/test';

const pages = [
  '/fr',
  '/fr/studios-photo-automatises',
  '/fr/ia-photo-produit',
  '/fr/academy',
  '/fr/contact',
  '/fr/blog',
  '/fr/a-propos',
  '/fr/studio-photo/alphashot-pro-g2',
];

test.describe('Mobile Overflow (375px)', () => {
  for (const pageUrl of pages) {
    test(`no horizontal overflow on ${pageUrl} at 375px`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Page ${pageUrl} has horizontal overflow at 375px`).toBe(false);
    });
  }
});
