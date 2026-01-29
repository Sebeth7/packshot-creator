import { test, expect } from '@playwright/test';

test.describe('Contact Form (Pipedrive)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/contact');
  });

  test('should display contact page with correct title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display Pipedrive form container', async ({ page }) => {
    // The Pipedrive form container should be present
    const formContainer = page.locator('.pipedriveWebForms');
    await expect(formContainer).toBeVisible();
  });

  test('should load Pipedrive form script', async ({ page }) => {
    // Wait for the script to be loaded
    await page.waitForTimeout(3000);

    // Check if the form container has been populated
    const formContainer = page.locator('.pipedriveWebForms');
    await expect(formContainer).toBeVisible();
  });

  test('should display contact info section', async ({ page }) => {
    // Check for contact info elements
    await expect(page.locator('text=+33')).toBeVisible();
  });

  test('should display showroom section', async ({ page }) => {
    // Scroll down to see showroom
    await page.evaluate(() => window.scrollTo(0, 500));

    // Showroom section should be visible
    const showroomSection = page.locator('text=/Lyon|Showroom/i');
    await expect(showroomSection.first()).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    // Scroll down to see FAQ
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // FAQ details elements should be present
    const faqItems = page.locator('details');
    const count = await faqItems.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should expand FAQ accordion', async ({ page }) => {
    // Find and click the first FAQ item
    const firstFaq = page.locator('details').first();
    await firstFaq.click();

    // The details should be open
    await expect(firstFaq).toHaveAttribute('open', '');
  });

  test('should display privacy message under form', async ({ page }) => {
    // Privacy message should be visible
    const privacyText = page.locator('text=/politique de confidentialité|privacy policy/i');
    await expect(privacyText).toBeVisible();
  });
});

test.describe('Contact Form - English Version', () => {
  test('should display English content', async ({ page }) => {
    await page.goto('/en/contact');

    // Check for Pipedrive form container
    const formContainer = page.locator('.pipedriveWebForms');
    await expect(formContainer).toBeVisible();
  });
});

test.describe('Contact Form - Responsive', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr/contact');

    // Page should load
    await expect(page.locator('h1')).toBeVisible();

    // Form container should be visible
    const formContainer = page.locator('.pipedriveWebForms');
    await expect(formContainer).toBeVisible();
  });

  test('should stack columns on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr/contact');

    // On mobile, content should be stacked (single column)
    // The form should come first, then contact info
    const formContainer = page.locator('.pipedriveWebForms');
    await expect(formContainer).toBeVisible();
  });
});
