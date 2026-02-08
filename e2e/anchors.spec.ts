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

  test('#formations exists on /fr/academy', async ({ page }) => {
    await page.goto('/fr/academy');
    const hasId = await page.evaluate(() => !!document.getElementById('formations'));
    expect(hasId).toBe(true);
  });

  test('#qualiopi exists on /fr/academy', async ({ page }) => {
    await page.goto('/fr/academy');
    const hasId = await page.evaluate(() => !!document.getElementById('qualiopi'));
    expect(hasId).toBe(true);
  });
});
