import { test, expect, type Page } from '@playwright/test';

/**
 * Navigation des pages longues (règle D44) : barre de sommaire horizontale collante
 * (components/navigation/SommaireCollant.tsx) sur les familles équipées, rien sous
 * 1 024 px, pages gelées non équipées. Registre : data/navigation/pages-longues.ts.
 *
 * Navigation V9 (décision de Laurent du 16/10/2026, R-UX-LONG § 2 bis) : sur les pages
 * de `NAVIGATION_V9`, la barre et le sommaire vertical à droite coexistent à partir de
 * 1 280 px (deux navigations collantes, synchronisées) ; partout ailleurs, une seule.
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
  '/fr/studios-photo-automatises',
];

/** Pages gelées (expérience SEO ou PR ouverte) ou exclues par la règle : aucune barre ajoutée. */
const GELEES = [
  '/fr/packshot-e-commerce',
  '/fr/industrie/mode-textile',
  '/en/studios-photo-automatises',
  '/de-ch/studios-photo-automatises',
  '/fr/guide/comment-faire-photos-multi-angles-chaussures',
  '/fr/blog/budget-studio-photo-automatise',
  '/fr/blog/prestataire-packshot-vs-studio-interne',
  '/fr/packshot-amazon',
  '/fr',
];

/** Pages à double navigation V9 (barre + sommaire vertical) : Studios FR seulement. */
const NAVIGATION_V9 = ['/fr/studios-photo-automatises'];

const BARRE = 'nav.fixed[aria-label]';
const SOMMAIRE = 'nav[aria-label="Sommaire de la page"]';

// Budget par test : Studios FR (10 sections, sélecteur, film) dépassait les 30 s par défaut sur le
// runner de la CI (tête `a43f567`, 16/10/2026 : 1 024 px en échec après deux reprises, 1 440 px
// instable), sans erreur d'assertion. Même budget que `sommaire-blog.spec.ts`.
test.describe.configure({ timeout: 90_000 });

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
      // Rendue et visible : un ancêtre `display: none` (colonne masquée sous 1 280 px) l'exclut.
      if (!n.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
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
            const attendues = largeur >= 1280 && NAVIGATION_V9.includes(url) ? 2 : 1;
            expect(e.collantes, 'navigations collantes (V9 : barre + sommaire vertical)').toBe(attendues);
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

/** Navigation V9 sur Studios FR : sommaire vertical à droite, synchronisé avec la barre. */
async function sommaire(page: Page) {
  return page.evaluate(
    ([selBarre, selSommaire]) => {
      const barre = [...document.querySelectorAll<HTMLElement>(selBarre)].find((n) => !n.closest('header'))!;
      const nav = document.querySelector<HTMLElement>(selSommaire);
      const panneau = nav?.parentElement ?? null;
      const visible = !!nav && nav.checkVisibility({ opacityProperty: true, visibilityProperty: true });
      const r = panneau?.getBoundingClientRect();
      // Contenus de la zone que le panneau recouvrirait (titres, textes, médias, contrôles).
      const recouverts =
        visible && r
          ? [...document.querySelectorAll<HTMLElement>('main section :is(h2, h3, p, li, figure, img, a, button, summary, select, input)')]
              .filter((el) => !panneau!.contains(el) && el.checkVisibility())
              .filter((el) => {
                const b = el.getBoundingClientRect();
                return b.width > 0 && b.height > 0 && b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top;
              })
              .map((el) => `${el.tagName.toLowerCase()} ${(el.textContent ?? '').trim().slice(0, 40)}`)
          : [];
      return {
        visible,
        actif: nav?.querySelector('[aria-current="location"]')?.getAttribute('data-toc-id') ?? null,
        actifBarre: barre.querySelector('[aria-current="location"]')?.getAttribute('href')?.slice(1) ?? null,
        entrees: nav ? [...nav.querySelectorAll('[data-toc-id]')].map((b) => b.getAttribute('data-toc-id')) : [],
        cibles: [...barre.querySelectorAll('a')].map((a) => a.getAttribute('href')!.slice(1)),
        haut: r?.top ?? null,
        bas: r?.bottom ?? null,
        droite: r?.right ?? null,
        basBarre: barre.getBoundingClientRect().bottom,
        recouverts,
      };
    },
    [BARRE, SOMMAIRE],
  );
}

test.describe('Navigation V9 — Studios FR, 1 440 px', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  const url = '/fr/studios-photo-automatises';

  test('sommaire vertical : mêmes ancres que la barre, section active partagée, aucun recouvrement', async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    const depart = await sommaire(page);
    expect(depart.entrees, 'mêmes ancres que la barre').toEqual(depart.cibles);
    for (const id of depart.cibles) expect(await page.locator(`[id="${id}"]`).count(), `ancre #${id} unique`).toBe(1);

    for (const id of depart.cibles) {
      await defilerVers(page, id);
      await expect.poll(async () => (await sommaire(page)).actif, { message: `sommaire actif sur #${id}`, timeout: 3000 }).toBe(id);
      const s = await sommaire(page);
      expect(s.visible, `visible sur #${id}`).toBe(true);
      expect(s.actifBarre, `barre et sommaire synchronisés sur #${id}`).toBe(id);
      expect(s.haut!, 'sous la barre').toBeGreaterThanOrEqual(s.basBarre);
      expect(s.droite!, 'dans l’écran').toBeLessThanOrEqual(1440);
      expect(s.recouverts, `aucun contenu recouvert sur #${id}`).toEqual([]);
    }
  });

  test('clic et clavier : le titre visé arrive sous la barre, focus visible', async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    const { cibles } = await sommaire(page);
    await defilerVers(page, cibles[0]);
    for (const id of [cibles[4], cibles[cibles.length - 1], cibles[1]]) {
      await page.locator(`${SOMMAIRE} [data-toc-id="${id}"]`).click();
      await expect.poll(async () => (await sommaire(page)).actif, { message: `actif après clic sur #${id}`, timeout: 4000 }).toBe(id);
      const { basBarre } = await sommaire(page);
      const haut = await page.evaluate((c) => document.getElementById(c)!.querySelector('h2')!.getBoundingClientRect().top, id);
      expect(haut, `titre de #${id} sous la barre`).toBeGreaterThanOrEqual(basBarre - 1);
      expect(haut, `titre de #${id} dans l’écran`).toBeLessThan(900);
    }

    // Clavier : Tab depuis l'entrée précédente, puis Entrée.
    await page.locator(`${SOMMAIRE} [data-toc-id="${cibles[5]}"]`).focus();
    await page.keyboard.press('Tab');
    const bouton = page.locator(`${SOMMAIRE} [data-toc-id="${cibles[6]}"]`);
    await expect(bouton).toBeFocused();
    expect(await bouton.evaluate((b) => b.matches(':focus-visible') && getComputedStyle(b).boxShadow !== 'none'), 'focus visible').toBe(true);
    await page.keyboard.press('Enter');
    await expect.poll(async () => (await sommaire(page)).actif, { timeout: 4000 }).toBe(cibles[6]);
    expect((await sommaire(page)).actifBarre).toBe(cibles[6]);
  });

  test('fin de zone : le sommaire ne recouvre ni la demande de démonstration ni le formulaire', async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    await defilerVers(page, 'demonstration');
    await page.waitForTimeout(300);
    const s = await sommaire(page);
    const demo = await page.evaluate(() => document.getElementById('demonstration')!.getBoundingClientRect().top);
    expect(s.bas!, 'panneau au-dessus de la démonstration').toBeLessThanOrEqual(demo + 1);
    expect((await etat(page)).visible, 'barre masquée sur la démonstration').toBe(false);
  });
});

test.describe('Navigation V9 — Studios FR, 1 024 px', () => {
  test.use({ viewport: { width: 1024, height: 900 } });

  test('barre seule en élément collant, sommaire repliable dans le flux', async ({ page }) => {
    await page.goto('/fr/studios-photo-automatises', { waitUntil: 'networkidle' });
    expect((await sommaire(page)).visible, 'colonne de droite masquée').toBe(false);
    await expect(page.getByRole('button', { name: 'Sommaire', exact: true })).toBeVisible();
    await defilerVers(page, 'collection');
    const e = await etat(page);
    expect(e.visible).toBe(true);
    expect(e.collantes).toBe(1);
  });
});

test.describe('Navigation V9 — Studios FR, mobile', () => {
  for (const largeur of [390, 768]) {
    test.describe(`${largeur} px`, () => {
      test.use({ viewport: { width: largeur, height: 844 }, hasTouch: true });

      test('sommaire repliable accessible, aucune barre fixe, titre visible après le choix', async ({ page }) => {
        await page.goto('/fr/studios-photo-automatises', { waitUntil: 'networkidle' });
        const bouton = page.getByRole('button', { name: 'Sommaire', exact: true });
        await expect(bouton).toHaveAttribute('aria-expanded', 'false');
        await bouton.click();
        await expect(bouton).toHaveAttribute('aria-expanded', 'true');
        const panneau = page.locator(`[id="${await bouton.getAttribute('aria-controls')}"]`);
        await expect(panneau.locator('[data-toc-id]')).toHaveCount(10);
        await panneau.locator('[data-toc-id="projet"]').click();
        await expect(bouton).toHaveAttribute('aria-expanded', 'false');
        await expect
          .poll(async () => page.evaluate(() => document.getElementById('projet')!.getBoundingClientRect().top), { timeout: 4000 })
          .toBeLessThan(200);
        const { titre, entete } = await page.evaluate(() => ({
          titre: document.getElementById('projet')!.querySelector('h2')!.getBoundingClientRect().top,
          entete: document.querySelector('header.sticky')!.getBoundingClientRect().bottom,
        }));
        expect(titre, 'titre sous l’en-tête').toBeGreaterThanOrEqual(entete);
        const e = await etat(page);
        expect(e.visible, 'aucune barre fixe').toBe(false);
        expect(e.collantes, 'aucune navigation collante').toBe(0);
        const deborde = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        expect(deborde).toBe(false);
      });
    });
  }
});
