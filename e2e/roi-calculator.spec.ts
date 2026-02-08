import { test, expect } from '@playwright/test';

test.describe('ROI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/studios-photo-automatises');
    // Scroll to ROI calculator section
    await page.locator('#calculateur-roi').scrollIntoViewIfNeeded();
  });

  test('should display ROI calculator section on studios page', async ({ page }) => {
    const section = page.locator('#calculateur-roi');
    await expect(section).toBeVisible();
  });

  test('should show step 1 with operator count slider', async ({ page }) => {
    await expect(page.locator('#calculateur-roi').getByText('Étape 1/3')).toBeVisible();
    await expect(page.getByText(/Combien de personnes/)).toBeVisible();
    const slider = page.locator('#calculateur-roi').locator('role=slider').first();
    await expect(slider).toBeVisible();
  });

  test('should allow adjusting salary cost', async ({ page }) => {
    const salaryInput = page.locator('#calculateur-roi').locator('input[type="number"]').first();
    await expect(salaryInput).toBeVisible();
    await salaryInput.fill('5000');
    await expect(salaryInput).toHaveValue('5000');
  });

  test('should allow adjusting time percentage', async ({ page }) => {
    await expect(page.getByText(/pourcentage de leur temps/)).toBeVisible();
    // Time percentage slider exists
    const sliders = page.locator('#calculateur-roi').locator('role=slider');
    const count = await sliders.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should toggle external provider (yes/no)', async ({ page }) => {
    await expect(page.getByText(/prestataire externe/)).toBeVisible();
    // Click "Oui" radio
    const ouiLabel = page.locator('label[for="externe-yes"]');
    await ouiLabel.click();
    // External budget field should appear
    await expect(page.getByText(/Budget mensuel moyen prestataire/)).toBeVisible();
    // Click "Non" radio
    const nonLabel = page.locator('label[for="externe-no"]');
    await nonLabel.click();
    // External budget field should disappear
    await expect(page.getByText(/Budget mensuel moyen prestataire/)).not.toBeVisible();
  });

  test('should allow adjusting daily photo count', async ({ page }) => {
    await expect(page.getByText(/photos finalisées produisez-vous par jour|photos finalis/)).toBeVisible();
  });

  test('should navigate to step 2 with valid inputs', async ({ page }) => {
    // Click "Suivant" button
    await page.getByRole('button', { name: /Suivant/ }).click();
    // Should be on step 2
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
  });

  test('should show step 2 with production goals', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
    await expect(page.getByText(/photos produit devez-vous/)).toBeVisible();
  });

  test('should allow selecting product sizes (4 options)', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
    // Check 4 size options exist
    await expect(page.locator('label[for="size-petit"]')).toBeVisible();
    await expect(page.locator('label[for="size-moyen"]')).toBeVisible();
    await expect(page.locator('label[for="size-grand"]')).toBeVisible();
    await expect(page.locator('label[for="size-tres-grand"]')).toBeVisible();
  });

  test('should allow adjusting equipment budget', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
    const budgetInput = page.locator('#calculateur-roi').locator('input[type="number"]').first();
    await expect(budgetInput).toBeVisible();
  });

  test('should navigate to step 3 (results)', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    // Wait for loading to complete
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
  });

  test('should display ROI metrics', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    // Hero metrics section
    const heroSection = page.locator('[data-pdf-section="hero"]');
    await expect(heroSection).toBeVisible();
  });

  test('should display break-even timeline', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    const timeline = page.locator('[data-pdf-section="timeline"]');
    await expect(timeline).toBeVisible();
  });

  test('should display comparison table', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    const table = page.locator('[data-pdf-section="table"]');
    await expect(table).toBeVisible();
  });

  test('should recommend a machine with details', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    const machineSection = page.locator('[data-pdf-section="machine"]');
    await expect(machineSection).toBeVisible();
    await expect(page.getByText(/Machine recommand/)).toBeVisible();
  });

  test('should display email capture form', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    const emailInput = page.locator('#email');
    await emailInput.scrollIntoViewIfNeeded();
    await expect(emailInput).toBeVisible();
    await expect(page.getByRole('button', { name: /Recevoir le PDF/ })).toBeVisible();
  });

  test('should allow navigating back to step 1 from step 2', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
    await page.getByRole('button', { name: /Retour/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 1/3')).toBeVisible();
  });

  test('should allow navigating back to step 2 from step 3', async ({ page }) => {
    await page.getByRole('button', { name: /Suivant/ }).click();
    await page.getByRole('button', { name: /Calculer mon ROI/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 3/3')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /Retour/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
  });

  test('should handle edge case: minimum values', async ({ page }) => {
    // Set salary to minimum
    const salaryInput = page.locator('#calculateur-roi').locator('input[type="number"]').first();
    await salaryInput.fill('1500');
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
  });

  test('should handle edge case: maximum values', async ({ page }) => {
    // Set salary to maximum
    const salaryInput = page.locator('#calculateur-roi').locator('input[type="number"]').first();
    await salaryInput.fill('15000');
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
  });

  test('should work in English locale', async ({ page }) => {
    await page.goto('/en/studios-photo-automatises');
    await page.locator('#calculateur-roi').scrollIntoViewIfNeeded();
    await expect(page.getByText('Step 1/3')).toBeVisible();
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
  });

  test('should be responsive at 375px viewport', async ({ page, context }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/fr/studios-photo-automatises');
    // Dismiss cookie banner if visible
    const acceptBtn = page.getByRole('button', { name: /Tout accepter/ });
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
    }
    await page.locator('#calculateur-roi').scrollIntoViewIfNeeded();
    await expect(page.locator('#calculateur-roi').getByText('Étape 1/3')).toBeVisible();
    await page.getByRole('button', { name: /Suivant/ }).click();
    await expect(page.locator('#calculateur-roi').getByText('Étape 2/3')).toBeVisible();
  });
});
