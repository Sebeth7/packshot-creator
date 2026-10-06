import { test, expect, type Page } from '@playwright/test';
import { MACHINES } from '../components/machine-selector/lib/machines';

/**
 * Sélecteur de machines : parcours réel de /studio-photo/selecteur-machines.
 *
 * Réécrit le 03/10/2026 : l'ancienne version cherchait une barre de recherche, un tri
 * par prix, un bouton « Voir les détails » et des cartes `rounded-xl` qui n'existent
 * plus (11 tests sur 14 en échec sur `main` `de6c4cd`). Les attentes sont maintenant
 * dérivées du catalogue que la page affiche (components/machine-selector/lib/machines.ts) :
 * un changement de catalogue sans changement d'affichage, ou l'inverse, fait échouer le test.
 */

const VISIBLES = MACHINES.filter((m) => !m.delisted);
const cartes = (page: Page) => page.locator('.machine-selector a', { hasText: /^(Voir la fiche|View product|Produkt ansehen)$/ });
const noms = (page: Page) => page.locator('.machine-selector h3');

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true })), url: baseURL! },
  ]);
});

test.describe('Sélecteur de machines (FR)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/studio-photo/selecteur-machines');
    await page.waitForSelector('.machine-selector');
  });

  test('titre de page et filtres', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Trouvez votre studio photo idéal');
    await expect(page.getByText('Taille du produit à photographier')).toBeVisible();
    await expect(page.getByText('Niveau d\'automatisation')).toBeVisible();
    await expect(page.locator('select')).toHaveCount(2);
  });

  test('une carte par machine du catalogue non délistée, dans l’ordre du catalogue', async ({ page }) => {
    await expect(cartes(page)).toHaveCount(VISIBLES.length);
    await expect(noms(page)).toHaveText(VISIBLES.map((m) => m.nom));
  });

  test('chaque carte affiche la taille maximale du catalogue (D45)', async ({ page }) => {
    for (const m of VISIBLES) {
      const carte = page.locator('.machine-selector [class*="rounded-2xl border-2"]', { has: page.locator('h3', { hasText: m.nom }) });
      await expect(carte, m.nom).toContainText(m.tailleMax);
    }
  });

  test('filtre par taille : exactement les machines de la catégorie', async ({ page }) => {
    for (const categorie of ['petit', 'moyen', 'grand', 'tres-grand'] as const) {
      await page.locator('select').first().selectOption(categorie);
      const attendues = VISIBLES.filter((m) => m.tailleCategories.includes(categorie)).map((m) => m.nom);
      await expect(noms(page), categorie).toHaveText(attendues);
      await expect(page.getByText(new RegExp(`^${attendues.length} machines? sur ${MACHINES.length}$`))).toBeVisible();
    }
  });

  test('filtre par automatisation', async ({ page }) => {
    await page.locator('select').nth(1).selectOption('full-auto');
    const attendues = VISIBLES.filter((m) => m.automationLevel === 'full-auto').map((m) => m.nom);
    await expect(noms(page)).toHaveText(attendues);
  });

  test('aperçu : la fenêtre s’ouvre avec les points forts et se ferme', async ({ page }) => {
    const premiere = VISIBLES[0];
    await page.getByRole('button', { name: 'Aperçu' }).first().click();
    const fenetre = page.locator('[class*="fixed inset-0"]').filter({ has: page.locator('h2', { hasText: premiere.nom }) });
    await expect(fenetre).toBeVisible();
    await expect(fenetre.getByText('Points forts')).toBeVisible();
    await expect(fenetre.getByText('Taille max produit')).toBeVisible();
    await expect(fenetre).toContainText(premiere.tailleMax);
    await page.getByRole('button', { name: 'Fermer' }).click();
    await expect(fenetre).toBeHidden();

    await page.getByRole('button', { name: 'Aperçu' }).first().click();
    await expect(fenetre).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(fenetre).toBeHidden();
  });

  test('« Voir la fiche » mène à la fiche de la machine', async ({ page }) => {
    const premiere = VISIBLES[0];
    await cartes(page).first().click();
    await expect(page).toHaveURL(new RegExp(`/fr/studio-photo/${premiere.id}$`));
    await expect(page.locator('h1')).toContainText(premiere.nom);
  });

  test('réinitialiser les filtres', async ({ page }) => {
    await page.locator('select').first().selectOption('petit');
    await expect(cartes(page)).not.toHaveCount(VISIBLES.length);
    await page.getByRole('button', { name: 'Réinitialiser' }).click();
    await expect(cartes(page)).toHaveCount(VISIBLES.length);
    await expect(page.locator('select').first()).toHaveValue('');
  });

  test('bloc d’aide en bas de page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('Besoin d\'aide pour choisir ?')).toBeVisible();
    await expect(page.locator('a:has-text("Demander un devis")')).toBeVisible();
    await expect(page.locator('a:has-text("Calculer mon ROI")')).toBeVisible();
  });
});

test.describe('Sélecteur de machines (EN, de-ch)', () => {
  test('EN : titre et lien de fiche', async ({ page }) => {
    await page.goto('/en/studio-photo/selecteur-machines');
    await expect(page.locator('h1')).toContainText('Find your ideal photo studio');
    await expect(cartes(page).first()).toHaveText('View product');
    await expect(cartes(page)).toHaveCount(VISIBLES.length);
  });

  test('de-ch : titre et lien de fiche', async ({ page }) => {
    await page.goto('/de-ch/fotostudio/maschinen-finder');
    await expect(page.locator('h1')).toContainText('Finden Sie Ihr ideales Fotostudio');
    await expect(cartes(page).first()).toHaveText('Produkt ansehen');
    await expect(cartes(page)).toHaveCount(VISIBLES.length);
  });
});

test.describe('Sélecteur de machines (mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test('cartes sur une colonne, sans débordement', async ({ page }) => {
    await page.goto('/fr/studio-photo/selecteur-machines');
    await expect(page.locator('h1')).toBeVisible();
    await expect(cartes(page)).toHaveCount(VISIBLES.length);
    const [a, b] = await Promise.all([cartes(page).nth(0).boundingBox(), cartes(page).nth(1).boundingBox()]);
    expect(b!.y).toBeGreaterThan(a!.y);
    const deborde = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(deborde).toBe(false);
  });
});
