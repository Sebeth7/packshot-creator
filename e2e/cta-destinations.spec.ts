import { test, expect } from '@playwright/test';

test.describe('CTA Destinations - Homepage FR', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr');
  });

  test('hero "Demander une démo gratuite" -> /fr/contact', async ({ page }) => {
    const heroSection = page.locator('section').first();
    const ctaLink = heroSection.getByRole('link', { name: /[Dd]emander une d[ée]mo/i });
    await expect(ctaLink.first()).toHaveAttribute('href', /\/fr\/contact/);
  });

  test('hero "Découvrir nos studios" -> /fr/studios-photo-automatises', async ({ page }) => {
    const link = page.getByRole('link', { name: /[Dd][ée]couvrir nos studios/i });
    await expect(link.first()).toHaveAttribute('href', /\/fr\/studios-photo-automatises/);
  });

  test('industries link -> /fr/industrie', async ({ page }) => {
    const link = page.getByRole('link', { name: /industries|secteurs/i });
    if (await link.count() > 0) {
      await expect(link.first()).toHaveAttribute('href', /\/fr\/industrie/);
    }
  });

  test('blog "Voir tous les articles" -> /fr/blog', async ({ page }) => {
    const link = page.getByRole('link', { name: /articles|blog/i });
    if (await link.count() > 0) {
      await expect(link.first()).toHaveAttribute('href', /\/fr\/blog/);
    }
  });

  test('final CTA "Demander une démo" -> /fr/contact', async ({ page }) => {
    const allDemoLinks = page.getByRole('link', { name: /[Dd]emander une d[ée]mo/i });
    const count = await allDemoLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
    await expect(allDemoLinks.last()).toHaveAttribute('href', /\/fr\/contact/);
  });
});

test.describe('CTA Destinations - Studios FR', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/studios-photo-automatises');
  });

  test('machine cards have links to /fr/studio-photo/', async ({ page }) => {
    // Machine cards use "Voir les détails" button, links to /studio-photo/ are in the MachineSelector
    const machineLinks = page.locator('a[href*="/studio-photo/"]');
    const count = await machineLinks.count();
    expect(count).toBeGreaterThan(0);
    const href = await machineLinks.first().getAttribute('href');
    expect(href).toMatch(/\/studio-photo\//);
  });
});

test.describe('CTA Destinations - Academy FR', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/fr/academy', { timeout: 60000 });
  });

  test('formation links -> correct paths', async ({ page }) => {
    const links = page.locator('a[href*="/fr/academy/formations"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('simulator link -> /fr/academy/simulateur-opco', async ({ page }) => {
    const link = page.locator('a[href*="simulateur-opco"]');
    if (await link.count() > 0) {
      await expect(link.first()).toHaveAttribute('href', /\/fr\/academy\/simulateur-opco/);
    }
  });
});

test.describe('CTA Destinations - Header', () => {
  test('"Demander une démo" button -> /fr/contact', async ({ page }) => {
    await page.goto('/fr');
    const header = page.locator('header');
    const demoBtn = header.getByRole('link', { name: /[Dd][ée]mo/i });
    if (await demoBtn.count() > 0) {
      await expect(demoBtn.first()).toHaveAttribute('href', /\/fr\/contact/);
    }
  });

  test('Logo -> /fr', async ({ page }) => {
    await page.goto('/fr');
    const header = page.locator('header');
    const logo = header.locator('a').first();
    await expect(logo).toHaveAttribute('href', /^\/fr\/?$/);
  });
});

test.describe('CTA Destinations - Footer', () => {
  test('all footer links have valid href format', async ({ page }) => {
    await page.goto('/fr');
    const footerLinks = page.locator('footer a[href^="/"]');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(5);
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }
    // All hrefs should start with /fr/ or /en/
    const invalid = hrefs.filter(h => !h.match(/^\/(fr|en)(\/|$)/));
    expect(invalid, `Invalid footer hrefs: ${invalid.join(', ')}`).toEqual([]);
  });

  test('footer links resolve (no 404)', async ({ request }) => {
    test.setTimeout(180000);
    // Key footer pages to check
    const footerPages = [
      '/fr/studios-photo-automatises',
      '/fr/ia-photo-produit',
      '/fr/industrie',
      '/fr/academy',
      '/fr/contact',
      '/fr/blog',
      '/fr/a-propos',
      '/fr/mentions-legales',
      '/fr/confidentialite',
    ];
    const broken: string[] = [];
    for (const href of footerPages) {
      try {
        const response = await request.get(href);
        if (response.status() >= 400) {
          broken.push(`${href} -> ${response.status()}`);
        }
      } catch {
        broken.push(`${href} -> ERROR`);
      }
    }
    expect(broken, `Broken footer links: ${broken.join(', ')}`).toEqual([]);
  });
});
