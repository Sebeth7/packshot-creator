import { test, expect, type Page, type Download } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { computeRoi, filterResultsForPublic } from '@/lib/roiEngine';

/**
 * Génération du PDF ROI côté navigateur : conseiller conversationnel FR
 * (`/fr/calculateur-roi`) et assistant à étapes EN / de-ch, qui partagent
 * `PDFGenerator`.
 *
 * Régression du 16/10/2026 : « Invalid argument passed to jsPDF.scale ». Le
 * rendu PDF capturé était celui d'une instance de `DossierPanel` montée dans un
 * conteneur masqué (`display: none`) : sections en 0 × 0, hauteur d'image NaN.
 *
 * Aucun appel réel : `/api/roi-chat`, `/api/roi-lead` et `/api/roi-pdf` sont
 * simulés ; l'étude est calculée localement par le moteur, sur données fictives.
 */

const [machine] = MACHINES.filter((m) => m.prix > 0 && !m.prixSurDevis);

const ETUDE = filterResultsForPublic(
  computeRoi({
    mode: 'vs-existant',
    volumeAnnuel: 5000,
    machine: { source: 'catalogue', machineId: machine.id, mode: 'achat' },
    cashLines: [
      {
        id: 'presta',
        label: 'Prestataire',
        frequence: 'recurrent',
        montantAnnuel: 30_000,
        pourcentageSupprimable: 100,
        source: 'client',
      },
    ],
    timeLines: [],
  })
);

const EMAIL_FICTIF = 'test@example.com';

/** Simule toute requête vers /api/ ; renvoie la liste des chemins appelés. */
async function simulerApi(page: Page): Promise<string[]> {
  const appels: string[] = [];
  await page.route('**/api/**', async (route) => {
    const chemin = new URL(route.request().url()).pathname;
    appels.push(chemin);
    if (chemin === '/api/roi-chat') {
      const evenements = [
        { type: 'calc', results: ETUDE },
        { type: 'text', text: 'Analyse simulée.' },
      ];
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: evenements.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(''),
      });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  return appels;
}

/** Refus du bandeau cookies : il ne recouvre pas les boutons. */
async function refuserCookies(page: Page) {
  const baseURL = test.info().project.use.baseURL ?? 'http://localhost:3000';
  await page.context().addCookies([
    {
      name: 'cookie-consent',
      value: encodeURIComponent(JSON.stringify({ necessary: true, analytics: false, externalMedia: false })),
      url: baseURL,
    },
  ]);
}

function erreursConsole(page: Page): string[] {
  const erreurs: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') erreurs.push(m.text());
  });
  page.on('pageerror', (e) => erreurs.push(e.message));
  return erreurs;
}

/** PDF lisible : en-tête, taille, au moins `imagesMin` images (en-tête + sections). */
async function verifierPdf(download: Download, imagesMin: number) {
  const chemin = await download.path();
  const octets = await readFile(chemin);
  expect(octets.subarray(0, 5).toString('latin1')).toBe('%PDF-');
  expect(octets.length).toBeGreaterThan(20_000);
  const images = octets.toString('latin1').match(/\/Subtype\s*\/Image/g) ?? [];
  expect(images.length).toBeGreaterThanOrEqual(imagesMin);
}

/** Sections non vides et graphique dimensionné dans un rendu PDF hors écran. */
async function etatRendu(page: Page, conteneur: string) {
  return page.locator(conteneur).evaluate((c) => {
    const sections = Array.from(c.querySelectorAll('[data-pdf-section]')).map((s) => {
      const r = s.getBoundingClientRect();
      return { largeur: r.width, hauteur: r.height };
    });
    const svg = c.querySelector('[data-pdf-chart] .recharts-wrapper > svg.recharts-surface');
    const r = svg?.getBoundingClientRect();
    return { sections, graphique: r ? { largeur: r.width, hauteur: r.height } : null };
  });
}

async function obtenirEtude(page: Page) {
  await refuserCookies(page);
  await page.goto('/fr/calculateur-roi');
  const champ = page.getByLabel('Votre message');
  await champ.fill('Données fictives de test.');
  await champ.press('Enter');
  await expect(page.getByText('Analyse simulée.')).toBeVisible();
}

const RENDU_PDF = '[data-pdf-rendu]';

test.describe('PDF du conseiller ROI (FR)', () => {
  for (const cas of [
    { nom: 'desktop, volet latéral', largeur: 1280, hauteur: 800, tiroir: false },
    { nom: 'mobile, tiroir ouvert', largeur: 390, hauteur: 844, tiroir: true },
  ]) {
    test(`le PDF est généré et téléchargé — ${cas.nom}`, async ({ page }) => {
      await page.setViewportSize({ width: cas.largeur, height: cas.hauteur });
      const erreurs = erreursConsole(page);
      const appels = await simulerApi(page);
      await obtenirEtude(page);
      if (cas.tiroir) await page.locator('button[aria-expanded]', { hasText: 'Votre dossier' }).click();

      const bouton = page.getByRole('button', { name: 'Télécharger le PDF' }).locator('visible=true');
      await expect(bouton).toHaveCount(1);
      await page.getByLabel('Votre email').locator('visible=true').fill(EMAIL_FICTIF);

      const telechargement = page.waitForEvent('download');
      await bouton.click();
      const fichier = await telechargement;
      await verifierPdf(fichier, 5);

      await expect(page.getByText('Votre analyse a été téléchargée')).toBeVisible();
      expect(appels.filter((a) => a === '/api/roi-lead')).toHaveLength(1);
      expect(erreurs.filter((e) => /jsPDF|NaN/.test(e))).toEqual([]);
    });
  }

  test('chaque rendu PDF est mis en page, graphique compris, même quand son volet est masqué', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await simulerApi(page);
    await obtenirEtude(page);
    // Mobile, tiroir fermé : seule l'instance du volet desktop (masqué) est montée.
    await expect(page.getByRole('button', { name: 'Télécharger le PDF', includeHidden: true })).toHaveCount(1);
    await expect(async () => {
      const etat = await etatRendu(page, RENDU_PDF);
      expect(etat.sections.length).toBeGreaterThan(0);
      for (const s of etat.sections) expect(s.largeur).toBeGreaterThan(0);
      expect(etat.graphique?.largeur ?? 0).toBeGreaterThan(0);
      expect(etat.graphique?.hauteur ?? 0).toBeGreaterThan(0);
    }).toPass();
  });

  test('le bouton de l’instance masquée produit un PDF (reproduction de la QA du 16/10)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const erreurs = erreursConsole(page);
    await simulerApi(page);
    await obtenirEtude(page);
    await page.evaluate((email) => {
      const aside = document.querySelector('aside[aria-label="Votre dossier"]')!;
      const champ = aside.querySelector('input[type="email"]') as HTMLInputElement;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(champ, email);
      champ.dispatchEvent(new Event('input', { bubbles: true }));
    }, EMAIL_FICTIF);
    const telechargement = page.waitForEvent('download');
    await page.evaluate(() => {
      const aside = document.querySelector('aside[aria-label="Votre dossier"]')!;
      Array.from(aside.querySelectorAll('button'))
        .find((b) => b.textContent?.includes('Télécharger le PDF'))!
        .click();
    });
    await verifierPdf(await telechargement, 5);
    expect(erreurs.filter((e) => /jsPDF|NaN/.test(e))).toEqual([]);
  });

  test('un échec local du PDF après un lead accepté n’est pas présenté comme un échec d’envoi', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const appels = await simulerApi(page);
    await obtenirEtude(page);
    // Panne locale provoquée : rendu PDF retiré de la mise en page.
    await page.locator(RENDU_PDF).evaluate((el) => {
      (el as HTMLElement).style.display = 'none';
    });
    await page.getByLabel('Votre email').locator('visible=true').fill(EMAIL_FICTIF);
    await page.getByRole('button', { name: 'Télécharger le PDF' }).locator('visible=true').click();

    await expect(page.getByText('Votre demande a bien été reçue.')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/envoi impossible/)).toHaveCount(0);
    expect(appels.filter((a) => a === '/api/roi-lead')).toHaveLength(1);

    // Nouvel essai : PDF seul, sans second envoi du lead.
    await page.locator(RENDU_PDF).evaluate((el) => {
      (el as HTMLElement).style.display = '';
    });
    const telechargement = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Réessayer le téléchargement' }).click();
    await verifierPdf(await telechargement, 5);
    expect(appels.filter((a) => a === '/api/roi-lead')).toHaveLength(1);
  });
});

test.describe('PDF de l’assistant à étapes (non-régression EN, de-ch)', () => {
  for (const cas of [
    { lang: 'en', url: '/en/calculateur-roi', etape: 'Step', suivant: 'Next', calculer: 'Calculate my ROI', telecharger: /Download PDF/ },
    { lang: 'de-ch', url: '/de-ch/roi-rechner', etape: 'Schritt', suivant: 'Weiter', calculer: 'Meinen ROI berechnen', telecharger: /PDF herunterladen/ },
  ]) {
    test(`le PDF est généré puis l’envoi part (${cas.lang})`, async ({ page }) => {
      const erreurs = erreursConsole(page);
      const appels = await simulerApi(page);
      await refuserCookies(page);
      await page.goto(cas.url);
      await expect(page.getByText(`${cas.etape} 1/3`)).toBeVisible();
      // Clic répété tant que l'étape ne change pas : le premier peut précéder l'hydratation.
      await expect(async () => {
        await page.getByRole('button', { name: cas.suivant, exact: true }).click();
        await expect(page.getByText(`${cas.etape} 2/3`)).toBeVisible({ timeout: 2_000 });
      }).toPass();
      await page.getByRole('button', { name: cas.calculer, exact: true }).click();
      await expect(page.getByText(`${cas.etape} 3/3`)).toBeVisible({ timeout: 10_000 });
      await expect(page.locator('[data-pdf-section="chart"] .recharts-wrapper > svg.recharts-surface')).toBeVisible();

      const champ = page.locator('#email');
      await champ.scrollIntoViewIfNeeded();
      await champ.fill(EMAIL_FICTIF);
      const telechargement = page.waitForEvent('download');
      await page.getByRole('button', { name: cas.telecharger }).click();
      await verifierPdf(await telechargement, 6);
      await expect.poll(() => appels.filter((a) => a === '/api/roi-pdf').length).toBe(1);
      expect(erreurs.filter((e) => /jsPDF|NaN/.test(e))).toEqual([]);
    });
  }
});
