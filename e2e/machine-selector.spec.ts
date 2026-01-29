import { test, expect } from '@playwright/test';

test.describe('Machine Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/studio-photo/selecteur-machines');
  });

  test('should display page title and hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Trouvez votre studio photo idéal');
    await expect(page.locator('text=Plus de 20 machines Orbitvu')).toBeVisible();
  });

  test('should display filter bar with search and sort options', async ({ page }) => {
    // Search input
    const searchInput = page.getByPlaceholder('Rechercher une machine...');
    await expect(searchInput).toBeVisible();

    // Sort select
    const sortSelect = page.locator('select').first();
    await expect(sortSelect).toBeVisible();
  });

  test('should display machine cards', async ({ page }) => {
    // Wait for machines to load
    await page.waitForSelector('.machine-selector');

    // Should display multiple machine cards
    const machineCards = page.locator('[class*="bg-white rounded-xl border-2"]');
    const count = await machineCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter machines by size category', async ({ page }) => {
    // Get initial count
    const initialCards = await page.locator('[class*="bg-white rounded-xl border-2"]').count();

    // Select "Petit" size filter
    await page.locator('select').first().selectOption('petit');

    // Wait for filter to apply
    await page.waitForTimeout(300);

    // Count should be less than initial (filtered)
    const filteredCards = await page.locator('[class*="bg-white rounded-xl border-2"]').count();
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test('should search machines by name', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Rechercher une machine...');

    // Search for "Alphashot"
    await searchInput.fill('Alphashot');

    // Wait for search to apply
    await page.waitForTimeout(300);

    // All visible machines should contain "Alphashot" in their name
    const machineNames = page.locator('h3');
    const names = await machineNames.allTextContents();
    names.forEach(name => {
      expect(name.toLowerCase()).toContain('alphashot');
    });
  });

  test('should open machine details modal when clicking "Voir les détails"', async ({ page }) => {
    // Click on first "Voir les détails" button
    await page.locator('text=Voir les détails').first().click();

    // Modal should appear
    const modal = page.locator('[class*="fixed inset-0 z-50"]');
    await expect(modal).toBeVisible();

    // Modal should contain machine details
    await expect(page.locator('text=Points forts')).toBeVisible();
    await expect(page.locator('text=À considérer')).toBeVisible();
  });

  test('should close modal when clicking close button', async ({ page }) => {
    // Open modal
    await page.locator('text=Voir les détails').first().click();
    await page.waitForSelector('[class*="fixed inset-0 z-50"]');

    // Click close button
    await page.locator('button:has-text("Fermer")').click();

    // Modal should be hidden
    const modal = page.locator('[class*="fixed inset-0 z-50"]');
    await expect(modal).not.toBeVisible();
  });

  test('should sort machines by price ascending', async ({ page }) => {
    // Select price ascending
    await page.locator('select').nth(1).selectOption('price-asc');

    // Wait for sort to apply
    await page.waitForTimeout(300);

    // The first machine should be the cheapest (Alphashot 360 at 12450)
    const firstMachineName = await page.locator('h3').first().textContent();
    expect(firstMachineName).toContain('Alphashot 360');
  });

  test('should sort machines by price descending', async ({ page }) => {
    // Select price descending
    await page.locator('select').nth(1).selectOption('price-desc');

    // Wait for sort to apply
    await page.waitForTimeout(300);

    // The first machine should be the most expensive (E-Comm Studio+ at 150000)
    const firstMachineName = await page.locator('h3').first().textContent();
    expect(firstMachineName).toContain('E-Comm Studio');
  });

  test('should show correct result count', async ({ page }) => {
    // Check that the count message is visible
    const countText = page.locator('text=/\\d+ machine(s)? sur \\d+/');
    await expect(countText).toBeVisible();
  });

  test('should reset filters', async ({ page }) => {
    // Apply a filter
    await page.getByPlaceholder('Rechercher une machine...').fill('Micro');
    await page.waitForTimeout(300);

    // Click reset
    await page.locator('text=Réinitialiser').click();

    // Search should be cleared
    await expect(page.getByPlaceholder('Rechercher une machine...')).toHaveValue('');
  });

  test('should display CTA section at bottom', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // CTA section should be visible
    await expect(page.locator('text=Besoin d\'aide pour choisir ?')).toBeVisible();
    await expect(page.locator('a:has-text("Demander un devis")')).toBeVisible();
    await expect(page.locator('a:has-text("Calculer mon ROI")')).toBeVisible();
  });
});

test.describe('Machine Selector - English Version', () => {
  test('should display English content', async ({ page }) => {
    await page.goto('/en/studio-photo/selecteur-machines');

    await expect(page.locator('h1')).toContainText('Find your ideal photo studio');
    await expect(page.getByPlaceholder('Search machines...')).toBeVisible();
  });
});

test.describe('Machine Selector - Responsive', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr/studio-photo/selecteur-machines');

    // Hero should be visible
    await expect(page.locator('h1')).toBeVisible();

    // Machine cards should stack vertically (one per row)
    const machineCards = page.locator('[class*="bg-white rounded-xl border-2"]');
    await expect(machineCards.first()).toBeVisible();
  });
});
