import { test, expect } from '@playwright/test';

/**
 * Responsive Tests - Validates no horizontal scroll or overflow across viewports
 */

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pagesToTest = [
  '/fr',
  '/fr/a-propos',
  '/fr/studios-photo-automatises',
  '/fr/ia-photo-produit',
  '/fr/contact',
  '/fr/blog',
  '/fr/packshot-bijoux',
  '/fr/industrie-defense',
];

for (const viewport of viewports) {
  test.describe(`Responsive - ${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of pagesToTest) {
      test(`${path} renders without horizontal scroll`, async ({ page }) => {
        await page.goto(path);
        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const windowWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1);
      });

      test(`${path} has no elements overflowing viewport`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        const overflowing = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const overflow: string[] = [];
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.right > window.innerWidth + 5) {
              const tag = el.tagName.toLowerCase();
              const cls = el.className ? `.${String(el.className).split(' ')[0]}` : '';
              overflow.push(`${tag}${cls} (right: ${Math.round(rect.right)}px)`);
            }
          });
          return overflow;
        });
        expect(overflowing).toEqual([]);
      });
    }
  });
}
