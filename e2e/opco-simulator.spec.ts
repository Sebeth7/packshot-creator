import { test, expect } from '@playwright/test';

test.describe('OPCO Simulator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/academy/simulateur-opco');
  });

  test('should display the simulator page with hero section', async ({ page }) => {
    // Verify page title
    await expect(page.locator('h1')).toContainText('éligibilité au financement OPCO');

    // Verify Qualiopi badge
    await expect(page.getByText('Formations certifiées Qualiopi')).toBeVisible();

    // Verify simulator is present
    await expect(page.locator('.opco-simulator')).toBeVisible();
  });

  test('should show step 1 with professional status options', async ({ page }) => {
    // Verify we're on step 1
    await expect(page.getByText('Étape 1 sur 4')).toBeVisible();
    await expect(page.getByText('Votre profil')).toBeVisible();

    // Verify all status options are present (real labels from STATUT_LABELS)
    await expect(page.getByText('Salarié(e) en CDI')).toBeVisible();
    await expect(page.getByText('Dirigeant(e) salarié(e)')).toBeVisible();
    await expect(page.getByText('Auto-entrepreneur (sans salarié)')).toBeVisible();
    await expect(page.getByText("Demandeur d'emploi")).toBeVisible();
  });

  test('should navigate through all steps for eligible salarié', async ({ page }) => {
    // Step 1: Select Salarié en CDI
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Step 2: Company info
    await expect(page.getByText('Étape 2 sur 4')).toBeVisible();
    await expect(page.getByText('Votre entreprise')).toBeVisible();

    // Select company size
    await page.getByText('Moins de 11 salariés').click();

    // Select sector
    await page.getByText('E-commerce, vente à distance').click();

    // Confirm contributions are up to date
    await page.getByRole('button', { name: 'Oui' }).click();

    await page.getByRole('button', { name: 'Suivant' }).click();

    // Step 3: Training selection
    await expect(page.getByText('Étape 3 sur 4')).toBeVisible();
    await expect(page.getByText('Votre formation')).toBeVisible();

    // Select a formation (real label from FORMATIONS_DISPONIBLES)
    await page.getByText('Formation Packshot Initiation').click();

    // Confirm professional link
    await page.getByText('Oui, directement lié').click();

    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Step 4: Result
    await expect(page.getByText('Étape 4 sur 4')).toBeVisible();
    await expect(page.getByText('Vous êtes éligible au financement OPCO')).toBeVisible();
  });

  test('should show non-eligible result for demandeur d\'emploi', async ({ page }) => {
    // Step 1: Select Demandeur d'emploi
    await page.getByText("Demandeur d'emploi").click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Step 2: Company info (demandeur d'emploi still goes through this step)
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Je ne sais pas' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Step 3: Training selection
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Oui, directement lié').click();
    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Step 4: Should show redirection to France Travail / CPF
    await expect(page.getByText('Financement OPCO non disponible')).toBeVisible();
    await expect(page.getByText('Alternative de financement')).toBeVisible();
  });

  test('should display warning when contributions not up to date', async ({ page }) => {
    // Step 1
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Step 2: Select "Non" for contributions
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Non' }).click();

    // Should show warning message
    await expect(page.getByText("L'entreprise doit être à jour de ses cotisations URSSAF")).toBeVisible();
  });

  test('should display CPF warning when formation not linked to professional activity', async ({ page }) => {
    // Navigate to step 3
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Select formation and indicate no professional link
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Non, intérêt personnel').click();

    // Should show CPF suggestion
    await expect(page.getByText("Le financement OPCO nécessite un lien direct avec l'activité professionnelle")).toBeVisible();
  });

  test('should display contact form on result page', async ({ page }) => {
    // Complete the simulator
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Oui, directement lié').click();
    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Verify contact form is present
    await expect(page.getByText('Recevoir mon estimation détaillée')).toBeVisible();
    await expect(page.getByLabel('Prénom *')).toBeVisible();
    await expect(page.getByLabel('Nom *')).toBeVisible();
    await expect(page.getByLabel('Email professionnel *')).toBeVisible();
    await expect(page.getByLabel('Téléphone')).toBeVisible();
    await expect(page.getByLabel('Entreprise')).toBeVisible();
  });

  test('should allow restarting the simulation', async ({ page }) => {
    // Complete the simulator
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Oui, directement lié').click();
    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Click restart button
    await page.getByText('Recommencer la simulation').click();

    // Should be back to step 1
    await expect(page.getByText('Étape 1 sur 4')).toBeVisible();
  });

  test('should navigate back with Previous button', async ({ page }) => {
    // Go to step 2
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByText('Étape 2 sur 4')).toBeVisible();

    // Go back to step 1
    await page.getByRole('button', { name: 'Précédent' }).click();
    await expect(page.getByText('Étape 1 sur 4')).toBeVisible();
  });

  test('should disable Next button until valid selection', async ({ page }) => {
    // Next button should be disabled initially
    const nextButton = page.getByRole('button', { name: 'Suivant' });
    await expect(nextButton).toBeDisabled();

    // Select a status
    await page.getByText('Salarié(e) en CDI').click();

    // Now Next should be enabled
    await expect(nextButton).toBeEnabled();
  });

  test('should display Qualiopi badge in step 3', async ({ page }) => {
    // Navigate to step 3
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Verify Qualiopi badge is displayed
    await expect(page.getByText('Formation certifiée Qualiopi')).toBeVisible();
    await expect(page.getByText('PackshotCreator Academy est certifié Qualiopi')).toBeVisible();
  });

  test('should show funding estimate for eligible user', async ({ page }) => {
    // Complete simulator as eligible salarié
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Oui, directement lié').click();
    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Verify funding estimate details
    await expect(page.getByText('Estimation du financement')).toBeVisible();
    await expect(page.getByText('Votre OPCO')).toBeVisible();
    await expect(page.getByText('Coût de la formation')).toBeVisible();
    await expect(page.getByText('Prise en charge OPCO')).toBeVisible();
    await expect(page.getByText('Reste à charge')).toBeVisible();
  });

  test('should show next steps for eligible user', async ({ page }) => {
    // Complete simulator as eligible salarié
    await page.getByText('Salarié(e) en CDI').click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Moins de 11 salariés').click();
    await page.getByText('E-commerce, vente à distance').click();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByText('Formation Packshot Initiation').click();
    await page.getByText('Oui, directement lié').click();
    await page.getByRole('button', { name: 'Voir mon résultat' }).click();

    // Verify next steps are displayed
    await expect(page.getByText('Prochaines étapes')).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    // Verify FAQ section is present on the page
    await expect(page.getByText('Questions fréquentes')).toBeVisible();
    await expect(page.getByText("Qu'est-ce qu'un OPCO ?")).toBeVisible();
  });

  test('should work in English locale', async ({ page }) => {
    await page.goto('/en/academy/simulateur-opco');

    // Verify English content
    await expect(page.locator('h1')).toContainText('Check your OPCO funding eligibility');
    await expect(page.getByText('Step 1 of 4')).toBeVisible();
    await expect(page.getByText('Permanent employee (CDI)')).toBeVisible();
  });
});
