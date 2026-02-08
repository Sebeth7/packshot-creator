import { test, expect } from '@playwright/test';

/**
 * SEO Tests - Validates meta tags, canonical, hreflang, JSON-LD for all pages
 */

// Pages with both FR and EN versions
const bilingualPages = [
  { fr: '/fr', en: '/en' },
  { fr: '/fr/a-propos', en: '/en/a-propos' },
  { fr: '/fr/contact', en: '/en/contact' },
  { fr: '/fr/blog', en: '/en/blog' },
  { fr: '/fr/guide', en: '/en/guide' },
  { fr: '/fr/academy', en: '/en/academy' },
  { fr: '/fr/studios-photo-automatises', en: '/en/studios-photo-automatises' },
  { fr: '/fr/ia-photo-produit', en: '/en/ia-photo-produit' },
  { fr: '/fr/industrie', en: '/en/industrie' },
  { fr: '/fr/industrie-defense', en: '/en/industrie-defense' },
  // Landing SEO
  { fr: '/fr/packshot-bijoux', en: '/en/packshot-bijoux' },
  { fr: '/fr/packshot-mode', en: '/en/packshot-mode' },
  { fr: '/fr/packshot-e-commerce', en: '/en/packshot-e-commerce' },
  { fr: '/fr/packshot-amazon', en: '/en/packshot-amazon' },
  { fr: '/fr/packshot-industriel', en: '/en/packshot-industriel' },
  // Landing commerciales
  { fr: '/fr/besoins-photographie-produit', en: '/en/besoins-photographie-produit' },
  { fr: '/fr/questions-cles-photographie-produit', en: '/en/questions-cles-photographie-produit' },
];

// Pages only in FR (legal)
const frOnlyPages = [
  '/fr/mentions-legales',
  '/fr/confidentialite',
  '/fr/cgu',
];

// All pages to test
const allPages = [
  ...bilingualPages.flatMap(p => [p.fr, p.en]),
  ...frOnlyPages,
];

test.describe('SEO - Status codes', () => {
  for (const path of allPages) {
    test(`${path} returns 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('SEO - Title', () => {
  for (const path of allPages) {
    test(`${path} has valid title`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(70);
    });
  }
});

test.describe('SEO - Meta description', () => {
  for (const path of allPages) {
    test(`${path} has valid meta description`, async ({ page }) => {
      await page.goto(path);
      const desc = await page.$eval(
        'meta[name="description"]',
        el => el.getAttribute('content')
      );
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
      expect(desc!.length).toBeLessThan(160);
    });
  }
});

test.describe('SEO - Canonical', () => {
  for (const path of allPages) {
    test(`${path} has canonical pointing to www.packshot-creator.com`, async ({ page }) => {
      await page.goto(path);
      const canonical = await page.$eval(
        'link[rel="canonical"]',
        el => el.getAttribute('href')
      );
      expect(canonical).toContain('www.packshot-creator.com');
    });
  }
});

test.describe('SEO - Hreflang', () => {
  for (const { fr, en } of bilingualPages) {
    test(`${fr} has hreflang fr and en`, async ({ page }) => {
      await page.goto(fr);
      const hreflangs = await page.$$eval(
        'link[rel="alternate"][hreflang]',
        els => els.map(el => el.getAttribute('hreflang'))
      );
      expect(hreflangs).toContain('fr');
      expect(hreflangs).toContain('en');
      expect(hreflangs).not.toContain('de');
      expect(hreflangs).not.toContain('es');
      expect(hreflangs).not.toContain('nl');
    });
  }
});

test.describe('SEO - JSON-LD Schema', () => {
  for (const path of allPages) {
    test(`${path} has valid JSON-LD`, async ({ page }) => {
      await page.goto(path);
      const schemas = await page.$$eval(
        'script[type="application/ld+json"]',
        els => els.map(el => {
          try { JSON.parse(el.textContent!); return true; }
          catch { return false; }
        })
      );
      expect(schemas.length).toBeGreaterThan(0);
      expect(schemas.every(Boolean)).toBe(true);
    });
  }
});

test.describe('SEO - Open Graph', () => {
  for (const path of allPages) {
    test(`${path} has og:title and og:description`, async ({ page }) => {
      await page.goto(path);
      const ogTitle = await page.$eval(
        'meta[property="og:title"]',
        el => el.getAttribute('content')
      ).catch(() => null);
      const ogDesc = await page.$eval(
        'meta[property="og:description"]',
        el => el.getAttribute('content')
      ).catch(() => null);
      expect(ogTitle).toBeTruthy();
      expect(ogDesc).toBeTruthy();
    });
  }
});

test.describe('SEO - Images alt attributes', () => {
  const representativePages = ['/fr', '/fr/studios-photo-automatises', '/fr/ia-photo-produit', '/fr/contact'];

  for (const path of representativePages) {
    test(`${path} - all images have alt attributes`, async ({ page }) => {
      await page.goto(path);
      const imagesWithoutAlt = await page.$$eval(
        'img:not([alt])',
        els => els.map(el => el.getAttribute('src'))
      );
      expect(imagesWithoutAlt).toEqual([]);
    });
  }
});
