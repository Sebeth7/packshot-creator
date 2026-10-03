import { test, expect, type Page } from '@playwright/test';

/**
 * Sommaire des articles (règle D44, forme latérale du blog).
 *
 * Défauts mesurés le 03/10/2026, corrigés par components/blog/TableOfContents.tsx :
 * - mobile : après un clic dans le sommaire repliable, le titre visé finissait
 *   au-dessus de l'écran (−810 px et −191 px à 390 px) ;
 * - desktop : 29 sommaires latéraux dépassaient la hauteur utile (jusqu'à 1 670 px),
 *   leurs dernières entrées restaient inaccessibles.
 */

const ARTICLES_MOBILE = [
  '/fr/blog/generer-images-produit-ia',
  '/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots',
  '/en/blog/8-challenges-producing-visual-content',
];

/** Les trois sommaires les plus longs mesurés le 03/10. */
const ARTICLES_LONGS = [
  '/fr/blog/optimiser-travail-production-visuelle',
  '/fr/blog/8-defis-prodution-contenu-visuel',
  '/fr/blog/comment-choisir-objectif-en-photographie-packshot',
];

/** Consentement « nécessaires seulement » : le bandeau cookies ne masque pas la page. */
test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true })), url: baseURL! },
  ]);
});

async function attendreFinDefilement(page: Page) {
  // Le défilement doux part après le repli du panneau, dure plusieurs centaines de
  // millisecondes, et le composant corrige sa position à l'arrivée (jusqu'à 600 ms après).
  await page.waitForTimeout(400);
  let precedent = -1;
  let stable = 0;
  for (let i = 0; i < 60 && stable < 3; i++) {
    const y = await page.evaluate(() => window.scrollY);
    stable = Math.abs(y - precedent) < 1 ? stable + 1 : 0;
    precedent = y;
    await page.waitForTimeout(300);
  }
}

/** Position du titre visé par rapport à l'en-tête collant du site. */
async function positionTitre(page: Page, libelle: string) {
  return page.evaluate((texte) => {
    const entete = document.querySelector('header.sticky')!.getBoundingClientRect().bottom;
    const titre = [...document.querySelectorAll('main h2, main h3')].find((h) => h.textContent?.trim() === texte);
    if (!titre) return null;
    const r = titre.getBoundingClientRect();
    return { haut: r.top, bas: r.bottom, entete, hauteurFenetre: window.innerHeight };
  }, libelle);
}

test.describe('Sommaire repliable, mobile 390 px', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  for (const url of ARTICLES_MOBILE) {
    test(`le titre visé est entièrement visible sous l'en-tête — ${url}`, async ({ page }) => {
      await page.goto(url);
      const sommaire = page.locator('main div[class*="lg:hidden"]').filter({ has: page.locator('button[aria-expanded]') }).first();
      const bascule = sommaire.locator('button[aria-expanded]');

      for (const rang of ['troisième', 'dernière'] as const) {
        await bascule.tap();
        await expect(bascule).toHaveAttribute('aria-expanded', 'true');
        const entrees = sommaire.locator('[data-toc-id]');
        const entree = rang === 'troisième' ? entrees.nth(2) : entrees.last();
        const libelle = (await entree.textContent())!.trim();
        await entree.tap();
        await expect(bascule).toHaveAttribute('aria-expanded', 'false');
        await attendreFinDefilement(page);
        const p = await positionTitre(page, libelle);
        expect(p, libelle).not.toBeNull();
        expect(p!.haut, `${rang} entrée « ${libelle} » sous l'en-tête`).toBeGreaterThanOrEqual(p!.entete - 1);
        expect(p!.bas, `${rang} entrée « ${libelle} » dans l'écran`).toBeLessThanOrEqual(p!.hauteurFenetre);
      }
    });
  }

  test('au clavier : ouverture, tabulation, Entrée', async ({ page }) => {
    await page.goto(ARTICLES_MOBILE[0]);
    const sommaire = page.locator('main div[class*="lg:hidden"]').filter({ has: page.locator('button[aria-expanded]') }).first();
    const bascule = sommaire.locator('button[aria-expanded]');
    await bascule.focus();
    await page.keyboard.press('Enter');
    await expect(bascule).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const libelle = (await page.evaluate(() => document.activeElement?.textContent ?? '')).trim();
    await page.keyboard.press('Enter');
    await attendreFinDefilement(page);
    const p = await positionTitre(page, libelle);
    expect(p).not.toBeNull();
    expect(p!.haut).toBeGreaterThanOrEqual(p!.entete - 1);
    expect(p!.bas).toBeLessThanOrEqual(p!.hauteurFenetre);
  });
});

test.describe('Sommaire latéral, desktop 1 440 × 900', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const url of ARTICLES_LONGS) {
    test(`le sommaire tient dans la fenêtre et sa dernière entrée est atteignable — ${url}`, async ({ page }) => {
      await page.goto(url);
      const nav = page.locator('aside nav');
      await page.evaluate(() => window.scrollTo(0, document.querySelector('main article')!.getBoundingClientRect().top + window.scrollY + 400));
      await attendreFinDefilement(page);
      const boite = await nav.boundingBox();
      expect(boite!.y + boite!.height, 'bas du sommaire dans la fenêtre').toBeLessThanOrEqual(900);

      const derniere = nav.locator('[data-toc-id]').last();
      await derniere.scrollIntoViewIfNeeded();
      const bd = await derniere.boundingBox();
      expect(bd!.y + bd!.height, 'dernière entrée visible').toBeLessThanOrEqual(900);
      const libelle = (await derniere.textContent())!.trim();
      await derniere.click();
      await attendreFinDefilement(page);
      const p = await positionTitre(page, libelle);
      expect(p).not.toBeNull();
      expect(p!.haut).toBeGreaterThanOrEqual(p!.entete - 1);
      expect(p!.haut).toBeLessThan(p!.hauteurFenetre);
    });
  }

  test('une seule entrée active, et la colonne ne recouvre pas le pied de page', async ({ page }) => {
    await page.goto(ARTICLES_LONGS[0]);
    const nav = page.locator('aside nav');
    // Défilement progressif, comme un lecteur : l'entrée active suit les titres franchis.
    const cible = await page.evaluate(() => document.body.scrollHeight / 3);
    for (let i = 0; i < 60 && (await page.evaluate(() => window.scrollY)) < cible; i++) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(50);
    }
    await attendreFinDefilement(page);
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await attendreFinDefilement(page);
    const aside = await page.locator('aside').boundingBox();
    const pied = await page.locator('footer').boundingBox();
    expect(aside!.y + aside!.height).toBeLessThanOrEqual(pied!.y + 1);
  });
});
