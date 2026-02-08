import { test, expect } from '@playwright/test';

/**
 * Internal Links Tests - Validates no broken internal links
 */

test.describe('Internal links', () => {
  test('no broken internal links on FR homepage', async ({ page, request }) => {
    await page.goto('/fr');
    await page.waitForLoadState('networkidle');

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
      } catch (e) {
        broken.push(`${link} -> ERROR`);
      }
    }

    if (broken.length > 0) {
      console.log('Broken links found:', broken);
    }
    expect(broken).toEqual([]);
  });

  test('no broken internal links on EN homepage', async ({ page, request }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

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
      } catch (e) {
        broken.push(`${link} -> ERROR`);
      }
    }

    if (broken.length > 0) {
      console.log('Broken links found:', broken);
    }
    expect(broken).toEqual([]);
  });

  test('no broken internal links on studios page', async ({ page, request }) => {
    await page.goto('/fr/studios-photo-automatises');
    await page.waitForLoadState('networkidle');

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
      } catch (e) {
        broken.push(`${link} -> ERROR`);
      }
    }

    if (broken.length > 0) {
      console.log('Broken links found:', broken);
    }
    expect(broken).toEqual([]);
  });
});
