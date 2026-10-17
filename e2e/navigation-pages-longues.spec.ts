import { test, expect, type Page } from '@playwright/test';

/**
 * Navigation des pages longues (règle D44) : barre de sommaire horizontale collante
 * (components/navigation/SommaireCollant.tsx) sur les familles équipées, rien sous
 * 1 024 px, pages gelées non équipées.
 *
 * Double navigation (décision du 15/10/2026) : sur les pages pilotes (Phase A), la barre
 * cohabite avec un sommaire vertical à droite (components/navigation/SommaireLateral.tsx,
 * rendu ≥ 1 280 px). Les deux sont synchronisés : mêmes ancres, même section active (un
 * seul scroll-spy). Le test ci-dessous vérifie donc UNE navigation collante sur les pages
 * à barre seule, et DEUX synchronisées sur les pilotes à partir de 1 280 px.
 * Registre : data/navigation/pages-longues.ts.
 *
 * Landing Studios FR (#108, pilote `landing-gamme`) : sommaire latéral en surimpression à partir de
 * 1 280 px, conteneurs à largeur réservée ; contrôles propres en fin de fichier.
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

/**
 * Pages en double navigation (Phase A). Seuils d'affichage du sommaire latéral distincts :
 * - guides pilotes : vraie colonne réservée, visible ≥ 1 280 px (A1) ;
 * - fiche Alphashot : overlay, visible seulement ≥ 1 920 px (A2, seuil CSS explicite) ;
 * - landing Studios FR : overlay à largeur réservée, visible ≥ 1 280 px.
 * Sous ces seuils : barre horizontale seule.
 */
const GUIDE_DOUBLE = new Set([
  '/fr/guide/comment-faire-focus-stacking-pour-photographier-bague',
  '/en/guide/how-to-do-focus-stacking-for-ring-photography',
]);
const FICHE_DOUBLE = new Set([
  '/fr/studio-photo/alphashot-pro-g2',
  '/en/studio-photo/alphashot-pro-g2',
  '/de-ch/fotostudio/alphashot-pro-g2',
]);
const STUDIOS_DOUBLE = new Set(['/fr/studios-photo-automatises']);
const SEUIL_GUIDE = 1280;
const SEUIL_FICHE = 1920;
const SEUIL_STUDIOS = 1280;

const BARRE = 'nav[data-d44="barre"]';
const LATERAL = 'nav[data-d44="lateral"]';

// Budget par test : Studios FR (10 sections, sélecteur, film) dépassait les 30 s par défaut sur le
// runner de la CI (#108, tête `a43f567`, 16/10/2026 : 1 024 px en échec après deux reprises, 1 440 px
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
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      // Masqué par un ancêtre (ex. colonne guide dans un `aside` `hidden` sous 1 280 px) :
      // le `display` propre reste « block », mais l'élément n'est pas rendu.
      if ((n as HTMLElement).getClientRects().length === 0) return false;
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
            // Barre seule → 1 ; pilote double navigation au-dessus de son seuil → 2.
            const estDouble =
              (GUIDE_DOUBLE.has(url) && largeur >= SEUIL_GUIDE) ||
              (FICHE_DOUBLE.has(url) && largeur >= SEUIL_FICHE) ||
              (STUDIOS_DOUBLE.has(url) && largeur >= SEUIL_STUDIOS);
            expect(e.collantes, 'navigations collantes attendues').toBe(estDouble ? 2 : 1);
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

async function controlerSync(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle' });
  const cibles = (await etat(page)).cibles!;
  // Au milieu de la page : les deux repères sont visibles.
  await defilerVers(page, cibles[Math.floor(cibles.length / 2)]);
  await page.waitForTimeout(300);
  const sync = await page.evaluate(() => {
    const reperes = [...document.querySelectorAll<HTMLElement>('nav[data-d44]')].filter((n) => {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      return n.getClientRects().length > 0; // non masqué par un ancêtre
    });
    const ancres = reperes.map((n) => [...n.querySelectorAll('a')].map((a) => a.getAttribute('href')!.slice(1)));
    const actifs = reperes.map((n) => n.querySelector('[aria-current="location"]')?.getAttribute('href') ?? null);
    return { nombre: reperes.length, ancres, actifs };
  });
  expect(sync.nombre, 'barre + sommaire latéral').toBe(2);
  // Mêmes ancres dans le même ordre.
  expect(sync.ancres[1]).toEqual(sync.ancres[0]);
  // Une seule section active, identique dans les deux repères.
  expect(sync.actifs[0], 'section active de la barre').not.toBeNull();
  expect(sync.actifs[1], 'section active du sommaire latéral').toBe(sync.actifs[0]);
}

test.describe('Double navigation guides (A1) — barre + colonne réservée, ≥ 1 280 px', () => {
  test.use({ viewport: { width: SEUIL_GUIDE, height: 900 } });
  for (const url of GUIDE_DOUBLE) {
    test(`deux repères synchronisés, mêmes ancres, même section active — ${url}`, async ({ page }) => {
      await controlerSync(page, url);
    });
  }
});

test.describe('Double navigation fiche (A2) — barre + sommaire overlay, ≥ 1 920 px', () => {
  test.use({ viewport: { width: SEUIL_FICHE, height: 1080 } });
  for (const url of FICHE_DOUBLE) {
    test(`deux repères synchronisés, mêmes ancres, même section active — ${url}`, async ({ page }) => {
      await controlerSync(page, url);
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

/* ------------------------------------------------------------------------------------------------
 * Landing Studios FR (#108) : double navigation à sommaire latéral en surimpression.
 * ---------------------------------------------------------------------------------------------- */

const STUDIOS = '/fr/studios-photo-automatises';

/** Barre et sommaire latéral : visibilité, section active, géométrie, contenus recouverts. */
async function lateral(page: Page) {
  return page.evaluate(
    ([selBarre, selLateral]) => {
      const barre = [...document.querySelectorAll<HTMLElement>(selBarre)].find((n) => !n.closest('header'))!;
      const nav = document.querySelector<HTMLElement>(selLateral);
      const visible = !!nav && nav.checkVisibility({ opacityProperty: true, visibilityProperty: true });
      const r = nav?.getBoundingClientRect();
      // Contenus de la page que le sommaire recouvrirait (titres, textes, médias, contrôles).
      const recouverts =
        visible && r
          ? [...document.querySelectorAll<HTMLElement>('main section :is(h2, h3, p, li, figure, img, a, button, summary, select, input, label, textarea)')]
              .filter((el) => !nav!.contains(el) && el.checkVisibility())
              .filter((el) => {
                const b = el.getBoundingClientRect();
                return b.width > 0 && b.height > 0 && b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top;
              })
              .map((el) => `${el.tagName.toLowerCase()} ${(el.textContent ?? '').trim().slice(0, 40)}`)
          : [];
      return {
        visible,
        actif: nav?.querySelector('[aria-current="location"]')?.getAttribute('href')?.slice(1) ?? null,
        actifBarre: barre.querySelector('[aria-current="location"]')?.getAttribute('href')?.slice(1) ?? null,
        entrees: nav ? [...nav.querySelectorAll('a')].map((a) => a.getAttribute('href')!.slice(1)) : [],
        cibles: [...barre.querySelectorAll('a')].map((a) => a.getAttribute('href')!.slice(1)),
        haut: r?.top ?? null,
        bas: r?.bottom ?? null,
        gauche: r?.left ?? null,
        droite: r?.right ?? null,
        basBarre: barre.getBoundingClientRect().bottom,
        hauteurEcran: window.innerHeight,
        recouverts,
      };
    },
    [BARRE, LATERAL],
  );
}

/**
 * Arrivée d'un défilement lancé depuis un sommaire : page immobile, titre posé sous la barre et
 * section active dans les deux navigations. L'entrée devient active avant la fin du défilement doux
 * (mesuré le 16/10 en remontant de la FAQ vers #capture : actif à 608 ms, titre encore à −793 px,
 * posé à 225 px ensuite) : mesurer dès qu'elle est active échouait sur le runner de la CI.
 */
async function arrivee(page: Page, id: string) {
  let y = -1;
  await expect
    .poll(async () => { const avant = y; y = await page.evaluate(() => window.scrollY); return y === avant; }, {
      message: `page immobile après le choix de #${id}`,
      intervals: [300],
      timeout: 10_000,
    })
    .toBe(true);
  await expect
    .poll(
      async () => {
        const s = await lateral(page);
        const haut = await page.evaluate((c) => document.getElementById(c)!.querySelector('h2')!.getBoundingClientRect().top, id);
        const pose = haut >= s.basBarre - 1 && haut < s.hauteurEcran && s.actif === id && s.actifBarre === id;
        return pose ? 'posé' : `titre à ${haut} px (barre : ${s.basBarre}), latéral : ${s.actif}, barre : ${s.actifBarre}`;
      },
      { message: `#${id} posé sous la barre et actif dans les deux navigations`, timeout: 5000 },
    )
    .toBe('posé');
}

test.describe('Studios FR — double navigation, 1 440 px', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('mêmes ancres que la barre, section active partagée, aucun contenu recouvert', async ({ page }) => {
    await page.goto(STUDIOS, { waitUntil: 'networkidle' });
    const depart = await lateral(page);
    expect(depart.visible, 'masqué en haut de page, comme la barre').toBe(false);
    expect(depart.entrees, 'mêmes ancres, même ordre').toEqual(depart.cibles);
    expect(depart.cibles).toHaveLength(10);
    for (const id of depart.cibles) {
      expect(await page.locator(`[id="${id}"]`).count(), `ancre #${id} unique`).toBe(1);
      expect(await page.locator(`[id="${id}"] h2`).count(), `titre de #${id}`).toBeGreaterThanOrEqual(1);
    }

    for (const id of depart.cibles) {
      await defilerVers(page, id);
      await expect.poll(async () => (await lateral(page)).actif, { message: `latéral actif sur #${id}`, timeout: 3000 }).toBe(id);
      const s = await lateral(page);
      expect(s.visible, `visible sur #${id}`).toBe(true);
      expect(s.actifBarre, `barre et latéral synchronisés sur #${id}`).toBe(id);
      expect(s.haut!, 'sous la barre').toBeGreaterThanOrEqual(s.basBarre);
      expect(s.bas!, 'dans la hauteur de l’écran').toBeLessThanOrEqual(s.hauteurEcran);
      expect(s.droite!, 'dans la largeur de l’écran').toBeLessThanOrEqual(1440);
      expect(s.recouverts, `aucun contenu recouvert sur #${id}`).toEqual([]);
    }
  });

  test('clic et clavier : le titre visé arrive sous la barre, focus visible', async ({ page }) => {
    await page.goto(STUDIOS, { waitUntil: 'networkidle' });
    const { cibles } = await lateral(page);
    await defilerVers(page, cibles[0]);
    for (const id of [cibles[4], cibles[cibles.length - 1], cibles[1]]) {
      await page.locator(`${LATERAL} a[href="#${id}"]`).click();
      await arrivee(page, id);
    }

    // Clavier : Tab depuis l'entrée précédente, puis Entrée.
    await page.locator(`${LATERAL} a[href="#${cibles[5]}"]`).focus();
    await page.keyboard.press('Tab');
    const lien = page.locator(`${LATERAL} a[href="#${cibles[6]}"]`);
    await expect(lien).toBeFocused();
    expect(await lien.evaluate((a) => a.matches(':focus-visible') && getComputedStyle(a).boxShadow !== 'none'), 'focus visible').toBe(true);
    await page.keyboard.press('Enter');
    await arrivee(page, cibles[6]);
  });

  test('fin de zone : ni la demande de démonstration ni le formulaire ne sont recouverts', async ({ page }) => {
    await page.goto(STUDIOS, { waitUntil: 'networkidle' });
    for (const hautDemo of [700, 450, 200]) {
      await page.evaluate((h) => {
        const el = document.getElementById('demonstration')!;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - h);
      }, hautDemo);
      await page.waitForTimeout(300);
      expect((await lateral(page)).recouverts, `démonstration à ${hautDemo} px`).toEqual([]);
    }
    await defilerVers(page, 'demonstration');
    await expect.poll(async () => (await lateral(page)).visible, { message: 'latéral masqué sur la démonstration', timeout: 3000 }).toBe(false);
    expect((await etat(page)).visible, 'barre masquée sur la démonstration').toBe(false);
  });
});

test.describe('Studios FR — balayage de la page, sommaire latéral visible', () => {
  for (const [largeur, hauteur] of [[1280, 800], [1440, 900]]) {
    test.describe(`${largeur} × ${hauteur} px`, () => {
      test.use({ viewport: { width: largeur, height: hauteur } });
      test('aucun contenu recouvert, de la première section à la démonstration', async ({ page }) => {
        await page.goto(STUDIOS, { waitUntil: 'networkidle' });
        const [debut, fin] = await page.evaluate(() => [
          document.getElementById('a-quoi-sert')!.getBoundingClientRect().top + window.scrollY,
          document.getElementById('demonstration')!.getBoundingClientRect().top + window.scrollY,
        ]);
        let controles = 0;
        for (let y = debut - 200; y <= fin; y += 300) {
          await page.evaluate((v) => window.scrollTo(0, v), y);
          await page.waitForTimeout(120);
          const s = await lateral(page);
          if (!s.visible) continue;
          controles++;
          expect(s.recouverts, `défilement à ${Math.round(y)} px`).toEqual([]);
          expect(s.bas!, `sommaire dans l’écran à ${Math.round(y)} px`).toBeLessThanOrEqual(hauteur);
        }
        expect(controles, 'positions contrôlées avec le sommaire visible').toBeGreaterThan(10);
      });
    });
  }
});

test.describe('Studios FR — écran bas (1 280 × 600 px)', () => {
  test.use({ viewport: { width: 1280, height: 600 } });

  test('sommaire latéral contenu dans l’écran, dernière entrée atteignable', async ({ page }) => {
    await page.goto(STUDIOS, { waitUntil: 'networkidle' });
    await defilerVers(page, 'projet');
    await expect.poll(async () => (await lateral(page)).visible, { timeout: 3000 }).toBe(true);
    const s = await lateral(page);
    expect(s.bas!, 'bas du sommaire dans l’écran').toBeLessThanOrEqual(600);
    expect(s.recouverts, 'aucun contenu recouvert').toEqual([]);
    const dernier = page.locator(`${LATERAL} a[href="#faq"]`);
    await dernier.scrollIntoViewIfNeeded();
    await dernier.click();
    await arrivee(page, 'faq');
  });
});

test.describe('Studios FR — 1 024 et 1 279 px : barre seule', () => {
  for (const largeur of [1024, 1279]) {
    test.describe(`${largeur} px`, () => {
      test.use({ viewport: { width: largeur, height: 900 } });
      test('sommaire latéral absent, une seule navigation collante', async ({ page }) => {
        await page.goto(STUDIOS, { waitUntil: 'networkidle' });
        await defilerVers(page, 'collection');
        await expect.poll(async () => (await etat(page)).visible, { timeout: 3000 }).toBe(true);
        expect((await lateral(page)).visible, 'latéral masqué').toBe(false);
        expect((await etat(page)).collantes).toBe(1);
      });
    });
  }
});

test.describe('Studios FR — mobile et tablette', () => {
  for (const largeur of [390, 768]) {
    test.describe(`${largeur} px`, () => {
      test.use({ viewport: { width: largeur, height: 844 }, hasTouch: true });

      test('aucune navigation collante, chaîne S1 statique, titre visible après le choix', async ({ page }) => {
        await page.goto(STUDIOS, { waitUntil: 'networkidle' });
        const chaine = page.locator('nav[aria-labelledby="chaine-titre"]');
        await expect(chaine.locator('a')).toHaveCount(6);
        await chaine.locator('a[href="#images"]').tap();
        await expect
          .poll(async () => page.evaluate(() => document.getElementById('images')!.getBoundingClientRect().top), { timeout: 4000 })
          .toBeLessThan(200);
        const { titre, entete } = await page.evaluate(() => ({
          titre: document.getElementById('images')!.querySelector('h2')!.getBoundingClientRect().top,
          entete: document.querySelector('header.sticky')!.getBoundingClientRect().bottom,
        }));
        expect(titre, 'titre sous l’en-tête').toBeGreaterThanOrEqual(entete);
        const e = await etat(page);
        expect(e.visible, 'aucune barre fixe').toBe(false);
        expect(e.collantes, 'aucune navigation collante').toBe(0);
        expect((await lateral(page)).visible, 'aucun sommaire latéral').toBe(false);
        const deborde = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        expect(deborde).toBe(false);
      });
    });
  }
});
