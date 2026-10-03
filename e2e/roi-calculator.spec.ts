import { test, expect, type Page } from '@playwright/test';

/**
 * Calculateur ROI : l'outil réellement servi (état de main au 03/10/2026, AR-01).
 *
 * - `/{lang}/studios-photo-automatises` : section teaser `#calculateur-roi`, dont le
 *   bouton mène au calculateur autonome. Le calculateur n'est plus intégré à Studios.
 * - `/fr/calculateur-roi` : conseiller ROI conversationnel (`RoiPublicChat`, GO Seb 06/08).
 * - `/en/calculateur-roi` et `/de-ch/roi-rechner` : assistant à trois étapes
 *   (`ROICalculatorWizard`), conservé jusqu'à l'extension multilingue du conseiller.
 *
 * Aucun appel réel. Toute requête du navigateur vers `/api/` est simulée :
 * `/api/roi-pdf` (Resend + Pipedrive, lead réel), `/api/roi-lead` (lead),
 * `/api/roi-chat` (API d'IA facturée). Le formulaire e-mail n'est jamais soumis.
 */

const PAGE_CALCULATEUR = {
  fr: '/fr/calculateur-roi',
  en: '/en/calculateur-roi',
  'de-ch': '/de-ch/roi-rechner',
} as const;

/** Simule toute requête vers /api/ et renvoie la liste des appels interceptés. */
async function simulerApi(page: Page): Promise<string[]> {
  const appels: string[] = [];
  await page.route('**/api/**', async (route) => {
    const requete = route.request();
    const chemin = new URL(requete.url()).pathname;
    appels.push(`${requete.method()} ${chemin}`);
    if (chemin === '/api/roi-chat') {
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: 'data: {"type":"text","text":"Réponse simulée du conseiller."}\n\n',
      });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"simule":true}' });
  });
  return appels;
}

const APPELS_LEAD = /\/api\/roi-(pdf|lead)$/;

test.describe('Calculateur ROI — section de Studios', () => {
  for (const lang of ['fr', 'en', 'de-ch'] as const) {
    test(`section #calculateur-roi unique et visible, bouton vers le calculateur (${lang})`, async ({ page }) => {
      await page.goto(`/${lang}/studios-photo-automatises`);
      await expect(page.locator('[id="calculateur-roi"]')).toHaveCount(1);
      const section = page.locator('#calculateur-roi');
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section.locator(`a[href="${PAGE_CALCULATEUR[lang]}"]`)).toBeVisible();
    });
  }
});

test.describe('Calculateur ROI — assistant à étapes (EN)', () => {
  let appels: string[] = [];

  test.beforeEach(async ({ page }) => {
    appels = await simulerApi(page);
    await page.goto(PAGE_CALCULATEUR.en);
  });

  test.afterEach(() => {
    expect(appels.filter((a) => APPELS_LEAD.test(a)), 'aucun envoi de lead').toHaveLength(0);
  });

  test('should show step 1 with operator count slider', async ({ page }) => {
    await expect(page.getByText('Step 1/3')).toBeVisible();
    await expect(page.getByText(/How many people work/)).toBeVisible();
    await expect(page.locator('role=slider').first()).toBeVisible();
  });

  test('should allow adjusting salary cost', async ({ page }) => {
    const salaryInput = page.locator('form input[type="number"]').first();
    await expect(salaryInput).toBeVisible();
    await salaryInput.fill('5000');
    await expect(salaryInput).toHaveValue('5000');
  });

  test('should allow adjusting time percentage', async ({ page }) => {
    await expect(page.getByText(/percentage of their time/)).toBeVisible();
    // Au moins deux curseurs (opérateurs, pourcentage de temps) ; attente de l'hydratation.
    await expect(page.locator('form').locator('role=slider').nth(1)).toBeVisible();
  });

  test('should toggle external provider (yes/no)', async ({ page }) => {
    await expect(page.getByText(/external provider\?/)).toBeVisible();
    await page.locator('label[for="externe-yes"]').click();
    await expect(page.getByText(/Average monthly external provider budget/)).toBeVisible();
    await page.locator('label[for="externe-no"]').click();
    await expect(page.getByText(/Average monthly external provider budget/)).not.toBeVisible();
  });

  test('should ask for daily photo count', async ({ page }) => {
    await expect(page.getByText(/finalized products do you photograph per day/)).toBeVisible();
  });

  test('should navigate to step 2 with valid inputs', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
  });

  test('should show step 2 with production goals', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
    await expect(page.getByText(/products do you need to photograph per year/)).toBeVisible();
  });

  test('should allow selecting product sizes (4 options)', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
    for (const size of ['petit', 'moyen', 'grand', 'tres-grand']) {
      await expect(page.locator(`label[for="size-${size}"]`)).toBeVisible();
    }
  });

  test('should allow adjusting equipment budget', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
    await expect(page.getByText(/annual budget for photo equipment/)).toBeVisible();
    await expect(page.locator('form input[type="number"]').first()).toBeVisible();
  });

  test('should navigate to step 3 (results)', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
    await page.getByRole('button', { name: /Calculate my ROI/ }).click();
    await expect(page.getByText('Step 3/3')).toBeVisible({ timeout: 5000 });
  });

  test('should display ROI metrics, machine, table and timeline', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await page.getByRole('button', { name: /Calculate my ROI/ }).click();
    await expect(page.getByText('Step 3/3')).toBeVisible({ timeout: 5000 });
    for (const section of ['hero', 'machine', 'table', 'timeline']) {
      await expect(page.locator(`[data-pdf-section="${section}"]`)).toBeVisible();
    }
    await expect(page.locator('[data-pdf-section="machine"]').getByText('Recommended model', { exact: true })).toBeVisible();
  });

  test('should display email capture form (not submitted)', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await page.getByRole('button', { name: /Calculate my ROI/ }).click();
    await expect(page.getByText('Step 3/3')).toBeVisible({ timeout: 5000 });
    const emailInput = page.locator('#email');
    await emailInput.scrollIntoViewIfNeeded();
    await expect(emailInput).toBeVisible();
    await expect(page.getByRole('button', { name: /Download PDF/ })).toBeVisible();
  });

  test('should allow navigating back to step 1 from step 2', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
    await page.getByRole('button', { name: /Back/ }).click();
    await expect(page.getByText('Step 1/3')).toBeVisible();
  });

  test('should allow navigating back to step 2 from step 3', async ({ page }) => {
    await page.getByRole('button', { name: /Next/ }).click();
    await page.getByRole('button', { name: /Calculate my ROI/ }).click();
    await expect(page.getByText('Step 3/3')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /Back/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
  });

  for (const salaire of ['1500', '15000']) {
    test(`should accept salary cost ${salaire} and go to step 2`, async ({ page }) => {
      await page.locator('form input[type="number"]').first().fill(salaire);
      await page.getByRole('button', { name: /Next/ }).click();
      await expect(page.getByText('Step 2/3')).toBeVisible();
    });
  }

  test('should be responsive at 375px viewport', async ({ page, context }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PAGE_CALCULATEUR.en);
    const accept = page.getByRole('button', { name: /Accept all|Tout accepter/ });
    if (await accept.isVisible({ timeout: 2000 }).catch(() => false)) await accept.click();
    await expect(page.getByText('Step 1/3')).toBeVisible();
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByText('Step 2/3')).toBeVisible();
  });
});

test.describe('Calculateur ROI — assistant à étapes (de-ch)', () => {
  test('Schritt 1/3 puis Schritt 2/3 sur /de-ch/roi-rechner', async ({ page }) => {
    const appels = await simulerApi(page);
    await page.goto(PAGE_CALCULATEUR['de-ch']);
    await expect(page.getByText('Schritt 1/3')).toBeVisible();
    await page.getByRole('button', { name: /Weiter/ }).click();
    await expect(page.getByText('Schritt 2/3')).toBeVisible();
    expect(appels.filter((a) => APPELS_LEAD.test(a))).toHaveLength(0);
  });
});

test.describe('Calculateur ROI — conseiller conversationnel (FR)', () => {
  test('la page FR sert le conseiller, sans appel au chargement', async ({ page }) => {
    const appels = await simulerApi(page);
    await page.goto(PAGE_CALCULATEUR.fr);
    await expect(page.getByLabel('Votre message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Envoyer' })).toBeVisible();
    await expect(page.getByText('Étape 1/3')).toHaveCount(0);
    await page.waitForLoadState('networkidle');
    expect(appels).toHaveLength(0);
  });

  test('un message part vers /api/roi-chat simulé et la réponse s’affiche', async ({ page }) => {
    const appels = await simulerApi(page);
    const corps: unknown[] = [];
    page.on('request', (r) => { if (r.url().endsWith('/api/roi-chat')) corps.push(r.postDataJSON()); });
    await page.goto(PAGE_CALCULATEUR.fr);
    await page.getByLabel('Votre message').fill('Nous produisons 3 000 photos par an.');
    await page.getByRole('button', { name: 'Envoyer' }).click();
    await expect(page.getByText('Réponse simulée du conseiller.')).toBeVisible();
    expect(appels).toEqual(['POST /api/roi-chat']);
    expect(corps[0]).toMatchObject({ surface: 'public' });
  });
});
