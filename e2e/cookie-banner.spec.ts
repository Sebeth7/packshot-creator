import { test, expect } from '@playwright/test';

test.describe('Cookie Banner RGPD', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear cookies for clean state
    await context.clearCookies();
    await page.goto('/fr');
  });

  test('should display cookie banner on first visit', async ({ page }) => {
    await expect(page.getByText('Gestion des cookies')).toBeVisible();
  });

  test('should have accept, refuse and customize buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Tout accepter/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Tout refuser/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Personnaliser/ })).toBeVisible();
  });

  test('should close banner when "Tout accepter" is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Tout accepter/ }).click();
    await expect(page.getByText('Gestion des cookies')).not.toBeVisible();
  });

  test('should load GA4 script after accepting cookies', async ({ page }) => {
    await page.getByRole('button', { name: /Tout accepter/ }).click();
    // Wait for GA4 script to load
    await page.waitForTimeout(1000);
    const hasGA4 = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src*="googletagmanager"]'));
      return scripts.length > 0;
    });
    expect(hasGA4).toBe(true);
  });

  test('should close banner when "Tout refuser" is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Tout refuser/ }).click();
    await expect(page.getByText('Gestion des cookies')).not.toBeVisible();
  });

  test('should NOT load GA4 script after refusing cookies', async ({ page }) => {
    await page.getByRole('button', { name: /Tout refuser/ }).click();
    await page.waitForTimeout(1000);
    const hasGA4 = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src*="googletagmanager"]'));
      return scripts.length > 0;
    });
    expect(hasGA4).toBe(false);
  });

  test('should open customization panel when "Personnaliser" is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Personnaliser/ }).click();
    await expect(page.getByText('Cookies essentiels', { exact: true })).toBeVisible();
    await expect(page.getByText('Cookies analytiques', { exact: true })).toBeVisible();
    // Catégorie ajoutée le 28/09/2026 : lecteur YouTube des articles (lib/youtube.ts).
    await expect(page.getByText('Contenus externes', { exact: true })).toBeVisible();
    // Catégorie marketing retirée le 28/09/2026 : aucun traceur ne l'utilisait.
    await expect(page.getByText('Cookies marketing', { exact: true })).toHaveCount(0);
  });

  test('should show 3 cookie categories with essentiels always enabled', async ({ page }) => {
    await page.getByRole('button', { name: /Personnaliser/ }).click();
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBe(3);
    // First checkbox (essentiels) should be checked and disabled
    await expect(checkboxes.first()).toBeChecked();
    await expect(checkboxes.first()).toBeDisabled();
    // Analytiques et contenus externes : décochés par défaut
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
  });

  test('should store externalMedia with the choice (accept all / reject all / custom)', async ({ page, context }) => {
    const stored = async () => {
      const c = (await context.cookies()).find((x) => x.name === 'cookie-consent');
      return c ? JSON.parse(decodeURIComponent(c.value)) : null;
    };
    await page.getByRole('button', { name: /Tout accepter/ }).click();
    expect(await stored()).toMatchObject({ necessary: true, analytics: true, externalMedia: true });

    await context.clearCookies();
    await page.reload();
    await page.getByRole('button', { name: /Tout refuser/ }).click();
    expect(await stored()).toMatchObject({ necessary: true, analytics: false, externalMedia: false });

    await context.clearCookies();
    await page.reload();
    await page.getByRole('button', { name: /Personnaliser/ }).click();
    await page.locator('label', { hasText: 'Contenus externes' }).locator('input[type="checkbox"]').check();
    await page.getByRole('button', { name: /Enregistrer mes choix/ }).click();
    expect(await stored()).toMatchObject({ necessary: true, analytics: false, externalMedia: true });
  });

  test('should not show banner again after choice (cookie persists)', async ({ page }) => {
    await page.getByRole('button', { name: /Tout accepter/ }).click();
    await expect(page.getByText('Gestion des cookies')).not.toBeVisible();
    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    // Banner should NOT reappear
    await expect(page.getByText('Gestion des cookies')).not.toBeVisible();
  });

  test('should reopen banner via footer "Gerer les cookies" link', async ({ page }) => {
    // Accept cookies first
    await page.getByRole('button', { name: /Tout accepter/ }).click();
    await expect(page.getByText('Gestion des cookies')).not.toBeVisible();
    // Click footer link to reopen
    const footerLink = page.getByRole('button', { name: /cookies/i }).or(
      page.locator('footer').getByText(/cookies/i)
    );
    await footerLink.first().scrollIntoViewIfNeeded();
    await footerLink.first().click();
    await expect(page.getByText('Gestion des cookies')).toBeVisible();
  });
});
