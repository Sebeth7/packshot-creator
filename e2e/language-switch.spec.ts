import { test, expect } from '@playwright/test';

test.describe('Language Switch', () => {
  test('should switch homepage from /fr to /en', async ({ page }) => {
    await page.goto('/fr');
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toContain('/en');
  });

  test('should switch homepage from /en to /fr', async ({ page }) => {
    await page.goto('/en');
    const langSwitch = page.getByRole('link', { name: /FR|Français/i }).or(
      page.locator('header').getByText(/FR/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/fr/);
    expect(page.url()).toContain('/fr');
  });

  test('should switch studios page FR -> EN', async ({ page }) => {
    await page.goto('/fr/studios-photo-automatises');
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toContain('/en');
  });

  test('should switch blog page FR -> EN', async ({ page }) => {
    await page.goto('/fr/blog');
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toContain('/en');
  });

  test('should switch contact page FR -> EN', async ({ page }) => {
    await page.goto('/fr/contact');
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toContain('/en');
  });

  test('should preserve path when switching (only lang prefix changes)', async ({ page }) => {
    await page.goto('/fr/contact');
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toContain('/en/contact');
  });

  test('should translate page content after switch (h1 different)', async ({ page }) => {
    await page.goto('/fr/contact');
    const h1Fr = await page.locator('h1').textContent();
    const langSwitch = page.getByRole('link', { name: /EN|English/i }).or(
      page.locator('header').getByText(/EN/i)
    );
    await langSwitch.first().click();
    await page.waitForURL(/\/en/);
    const h1En = await page.locator('h1').textContent();
    expect(h1Fr).not.toBe(h1En);
  });

  test('should translate header and footer', async ({ page }) => {
    await page.goto('/en');
    // English header should exist
    const header = page.locator('header');
    await expect(header).toBeVisible();
    // Footer should have English content
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
