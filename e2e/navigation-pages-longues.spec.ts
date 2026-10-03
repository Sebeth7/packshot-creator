import { test, expect, type Page } from '@playwright/test';

/**
 * Navigation des pages longues (règle D44) : barre de sommaire horizontale collante
 * (components/navigation/SommaireCollant.tsx) sur les familles équipées, rien sous
 * 1 024 px, jamais deux navigations collantes, pages gelées non équipées.
 * Registre : data/navigation/pages-longues.ts.
 */

/** Une page par famille équipée et par langue servie. */
const EQUIPEES = [
  '/fr/guide/comment-faire-focus-stacking-pour-photographier-bague',
  '/en/guide/how-to-do-focus-stacking-for-ring-photography',
  '/de-ch/guide/welche-ausrustung-fur-schmuckfotografie-wahlen',
  '/fr/guide/comment-obtenir-couleurs-fideles-photographie-produit',
  '/fr/blog/studio-ia-vs-ia-generative',
  '/en/blog/studio-ia-vs-ia-generative',
  '/fr/blog/comparatif-orbitvu-ortery-styleshoots-2026',
  '/fr/studio-photo/alphashot-pro-g2',
  '/en/studio-photo/alphashot-pro-g2',
  '/de-ch/fotostudio/alphashot-pro-g2',
  '/fr/studio-photo/alphastudio-xxl-v2',
  '/fr/studio-photo/e-comm-studio-plus',
  '/fr/ia-photo-produit',
  '/de-ch/ia-photo-produit',
  '/fr/solutions/documentation-technique-visuelle',
];

/** Pages gelées (expérience SEO ou PR ouverte) ou exclues par la règle : aucune barre ajoutée. */
const GELEES = [
  '/fr/packshot-e-commerce',
  '/fr/industrie/mode-textile',
  '/fr/studios-photo-automatises',
  '/fr/guide/comment-faire-photos-multi-angles-chaussures',
  '/fr/guide/comment-photographier-lunettes-e-commerce',
  '/fr/blog/budget-studio-photo-automatise',
  '/fr/blog/prestataire-packshot-vs-studio-interne',
  '/fr/packshot-amazon',
  '/fr',
];

const BARRE = 'nav.fixed[aria-label]';

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true })), url: baseURL! },
  ]);
});

async function etat(page: Page) {
  return page.evaluate((sel) => {
    const nav = [...document.querySelectorAll<HTMLElement>(sel)].find((n) => !n.closest('header')) ?? null;
    const entete = document.querySelector('header.sticky')!.getBoundingClientRect().bottom;
    const collantes = [...document.querySelectorAll('nav, aside')].filter((n) => {
      if (n.closest('header') || n.closest('footer')) return false;
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      for (let e: Element | null = n; e && e !== document.body; e = e.parentElement) {
        const p = getComputedStyle(e).position;
        if (p === 'sticky' || p === 'fixed') return true;
      }
      return false;
    }).length;
    if (!nav) return { present: false, visible: false, entete, collantes };
    const cs = getComputedStyle(nav);
    return {
      present: true,
      visible: cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0',
      haut: nav.getBoundingClientRect().top,
      bas: nav.getBoundingClientRect().bottom,
      actif: nav.querySelector('[aria-current="location"]')?.getAttribute('href') ?? null,
      cibles: [...nav.querySelectorAll('a')].map((a) => a.getAttribute('href')!.slice(1)),
      entete,
      collantes,
      liste: nav.querySelector('ol')!.getBoundingClientRect().right,
      cadre: nav.firstElementChild!.getBoundingClientRect().right,
    };
  }, BARRE);
}

async function defilerVers(page: Page, id: string) {
  await page.evaluate((cible) => {
    const el = document.getElementById(cible)!;
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100);
  }, id);
  await page.waitForTimeout(250);
}

test.describe('Barre de sommaire, desktop', () => {
  for (const largeur of [1024, 1440]) {
    test.describe(`${largeur} px`, () => {
      test.use({ viewport: { width: largeur, height: 900 } });

      for (const url of EQUIPEES) {
        test(`apparition, section active, ancres, disparition — ${url}`, async ({ page }) => {
          await page.goto(url, { waitUntil: 'networkidle' });
          const depart = await etat(page);
          expect(depart.present, 'barre rendue').toBe(true);
          expect(depart.visible, 'masquée en haut de page').toBe(false);
          const cibles = depart.cibles!;
          expect(cibles.length).toBeGreaterThanOrEqual(4);
          expect(cibles.length).toBeLessThanOrEqual(12);
          for (const id of cibles) expect(await page.locator(`#${id}`).count(), `cible #${id}`).toBe(1);

          for (const id of cibles) {
            await defilerVers(page, id);
            await expect.poll(async () => (await etat(page)).visible, { message: `visible sur #${id}`, timeout: 3000 }).toBe(true);
            await expect.poll(async () => (await etat(page)).actif, { message: `section active sur #${id}`, timeout: 3000 }).toBe(`#${id}`);
            const e = await etat(page);
            expect(Math.abs(e.haut! - e.entete), 'collée sous l’en-tête').toBeLessThanOrEqual(1);
            expect(e.liste!, 'liste dans le cadre').toBeLessThanOrEqual(e.cadre! + 1);
            expect(e.collantes, 'une seule navigation collante').toBe(1);
          }

          // Clavier : focus sur la troisième entrée, Entrée → titre visible sous la barre.
          await defilerVers(page, cibles[0]);
          const lien = page.locator(`${BARRE} a`).nth(2);
          await lien.focus();
          await page.keyboard.press('Enter');
          await page.waitForTimeout(600);
          const position = await page.evaluate((id) => document.getElementById(id)!.getBoundingClientRect().top, cibles[2]);
          const e = await etat(page);
          expect(position, 'cible sous la barre').toBeGreaterThanOrEqual(e.bas! - 1);
          expect(position, 'cible dans l’écran').toBeLessThan(900);

          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await expect.poll(async () => (await etat(page)).visible, { message: 'masquée en fin de page', timeout: 3000 }).toBe(false);
        });
      }
    });
  }
});

test.describe('Barre de sommaire, sous 1 024 px', () => {
  for (const largeur of [390, 768]) {
    test.describe(`${largeur} px`, () => {
      test.use({ viewport: { width: largeur, height: 844 }, hasTouch: true });
      for (const url of EQUIPEES.slice(0, 3)) {
        test(`aucune barre ni débordement — ${url}`, async ({ page }) => {
          await page.goto(url);
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
          await page.waitForTimeout(250);
          const e = await etat(page);
          expect(e.visible).toBe(false);
          const deborde = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
          expect(deborde).toBe(false);
        });
      }
    });
  }
});

test.describe('Pages gelées', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  for (const url of GELEES) {
    test(`aucune barre ajoutée — ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(250);
      expect((await etat(page)).present).toBe(false);
    });
  }
});
