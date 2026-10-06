import { existsSync } from 'node:fs';
import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * Sommaire des articles (règle D44, forme latérale du blog).
 *
 * Défauts mesurés, corrigés par components/blog/TableOfContents.tsx :
 * - 03/10/2026, mobile : après un clic dans le sommaire repliable, le titre visé
 *   finissait au-dessus de l'écran (−810 px et −191 px à 390 px) ;
 * - 03/10/2026, desktop : 29 sommaires latéraux dépassaient la hauteur utile (jusqu'à
 *   1 670 px), leurs dernières entrées restaient inaccessibles ;
 * - 06/10/2026, QA Chrome de la Preview #96, article A du cluster AI Act (22 entrées) :
 *   à 1 321 × 727, liste de 884 px sans défilement interne, six entrées hors écran ;
 *   à 390 px, après « 3. Recolorisation », titre à environ 717 px au-dessus de l'écran ;
 * - 06/10/2026, pendant la finalisation : entrée active fausse après un clic sur la
 *   première entrée ; molette du lecteur annulée par les corrections d'arrivée ; second
 *   clic rapproché perdu.
 *
 * Les positions sont mesurées en fin de défilement : un appel à `scrollIntoView` ne
 * prouve pas que le titre est visible.
 */

const ARTICLES_MOBILE = [
  '/fr/blog/generer-images-produit-ia',
  // Images sans dimensions chargées pendant le défilement (+3 662 px mesurés le 03/10).
  '/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots',
  '/en/blog/8-challenges-producing-visual-content',
];

/** Les trois sommaires les plus longs mesurés le 03/10. */
const ARTICLES_LONGS = [
  '/fr/blog/optimiser-travail-production-visuelle',
  '/fr/blog/8-defis-prodution-contenu-visuel',
  '/fr/blog/comment-choisir-objectif-en-photographie-packshot',
];

/**
 * Article A du cluster AI Act, apporté par la PR #96 : les défauts du 06/10 y ont été
 * relevés. Couvert dès que son contenu est présent dans la branche testée ; absent de
 * `main` au 06/10, il n'y est pas demandé.
 */
const ARTICLE_A = '/fr/blog/ai-act-images-produit';
const AVEC_A = existsSync(new URL('../content/blog/fr/ai-act-images-produit.json', import.meta.url));
const avecA = (urls: string[]) => (AVEC_A ? [...urls, ARTICLE_A] : urls);

/** Entrée nommée dans le scénario de la QA du 06/10, en plus des entrées testées partout. */
const ENTREE_SCENARIO: Record<string, string> = { [ARTICLE_A]: '3. Recolorisation' };

test.describe.configure({ timeout: 90_000 });

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

/** Le titre visé par une entrée : par son `data-toc-id`, sinon par son texte. */
async function cibleDe(entree: Locator) {
  return {
    id: await entree.getAttribute('data-toc-id'),
    libelle: (await entree.textContent())!.trim(),
  };
}

/**
 * Position du titre visé par rapport à l'en-tête collant du site, et premier titre de
 * l'article visible sous l'en-tête : la section où le lecteur arrive réellement.
 */
async function positionTitre(page: Page, cible: { id: string | null; libelle: string }) {
  return page.evaluate(({ id, libelle }) => {
    const entete = document.querySelector('header.sticky')!.getBoundingClientRect().bottom;
    // Premier `article` de `main` : l'article lui-même ; les suivants sont les cartes d'articles liés.
    const titres = [...document.querySelector('main article')!.querySelectorAll<HTMLElement>('h2, h3')];
    const titre = id ? document.getElementById(id) : titres.find((h) => h.textContent?.trim() === libelle);
    if (!titre) return null;
    const r = titre.getBoundingClientRect();
    const premier = titres.find((h) => h.getBoundingClientRect().bottom > entete + 1);
    return {
      haut: r.top,
      bas: r.bottom,
      entete,
      marge: parseFloat(getComputedStyle(titre).scrollMarginTop) || 0,
      hauteurFenetre: window.innerHeight,
      premierVisible: premier === titre,
    };
  }, cible);
}

function attendreSousEntete(p: Awaited<ReturnType<typeof positionTitre>>, quoi: string) {
  expect(p, `${quoi} : titre trouvé`).not.toBeNull();
  expect(p!.haut, `${quoi} : titre sous l'en-tête`).toBeGreaterThanOrEqual(p!.entete - 1);
  expect(p!.bas, `${quoi} : titre dans l'écran`).toBeLessThanOrEqual(p!.hauteurFenetre);
  expect(p!.premierVisible, `${quoi} : aucune autre section au-dessus, sous l'en-tête`).toBe(true);
}

// ---------------------------------------------------------------------------------------
// Sommaire repliable : mobile et tablette portrait (sous 1 024 px)
// ---------------------------------------------------------------------------------------

/** Le bouton de bascule, repéré par la structure : le test doit aussi pouvoir échouer sur l'ancien code. */
function sommaireRepliable(page: Page) {
  const sommaire = page.locator('main div[class*="lg:hidden"]').first();
  return { sommaire, bascule: sommaire.locator('button').first() };
}

const REPLIABLE = [
  { nom: 'mobile 390 × 844', viewport: { width: 390, height: 844 }, urls: avecA(ARTICLES_MOBILE) },
  { nom: 'mobile 360 × 740', viewport: { width: 360, height: 740 }, urls: avecA([ARTICLES_MOBILE[1]]) },
  { nom: 'tablette 820 × 1180', viewport: { width: 820, height: 1180 }, urls: avecA([ARTICLES_MOBILE[0]]) },
];

for (const { nom, viewport, urls } of REPLIABLE) {
  test.describe(`Sommaire repliable, ${nom}`, () => {
    test.use({ viewport, isMobile: true, hasTouch: true });

    for (const url of urls) {
      test(`le titre visé est visible sous l'en-tête, panneau replié avant le défilement — ${url}`, async ({ page }) => {
        await page.goto(url);
        const { sommaire, bascule } = sommaireRepliable(page);
        await bascule.tap();
        const nombre = await sommaire.locator('ul button').count();
        await bascule.tap();
        const scenario = ENTREE_SCENARIO[url];
        const rangs: { nom: string; rang: number | string }[] = [
          ...(scenario ? [{ nom: `« ${scenario} »`, rang: scenario }] : []),
          { nom: 'troisième', rang: 2 },
          { nom: 'du milieu', rang: Math.floor(nombre / 2) },
          { nom: 'dernière', rang: nombre - 1 },
        ];

        for (const { nom: quelle, rang } of rangs) {
          // Le sommaire est en tête d'article : le lecteur y remonte pour l'ouvrir.
          await bascule.scrollIntoViewIfNeeded();
          await bascule.tap();
          const entrees = sommaire.locator('ul button');
          const entree = typeof rang === 'number' ? entrees.nth(rang) : entrees.filter({ hasText: rang }).first();
          await entree.scrollIntoViewIfNeeded();
          const cible = await cibleDe(entree);
          // Position de la page au moment où le panneau disparaît : elle n'a pas encore bougé.
          await page.evaluate(() => {
            const w = window as unknown as { __yAvant: number; __yAuRepli: number | null };
            const zone = document.querySelector('main div[class*="lg:hidden"]')!;
            w.__yAvant = window.scrollY;
            w.__yAuRepli = null;
            new MutationObserver((_, obs) => {
              if (zone.querySelectorAll('ul').length === 0) {
                w.__yAuRepli = window.scrollY;
                obs.disconnect();
              }
            }).observe(zone, { childList: true, subtree: true });
          });
          await entree.tap();
          await attendreFinDefilement(page);
          attendreSousEntete(await positionTitre(page, cible), `${quelle} entrée « ${cible.libelle} »`);
          const { yAvant, yAuRepli } = await page.evaluate(() => {
            const w = window as unknown as { __yAvant: number; __yAuRepli: number | null };
            return { yAvant: w.__yAvant, yAuRepli: w.__yAuRepli };
          });
          expect(yAuRepli, `${quelle} entrée : panneau replié`).not.toBeNull();
          expect(Math.abs(yAuRepli! - yAvant), `${quelle} entrée : repli avant tout défilement`).toBeLessThan(1);
          await expect(bascule).toHaveAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

test.describe('Sommaire repliable, mobile 390 × 844 : clavier, ouvertures répétées, mouvement réduit', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('au clavier : ouverture, tabulation, Entrée', async ({ page }) => {
    await page.goto(ARTICLES_MOBILE[0]);
    const { bascule } = sommaireRepliable(page);
    await bascule.focus();
    await page.keyboard.press('Enter');
    await expect(bascule).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const libelle = (await page.evaluate(() => document.activeElement?.textContent ?? '')).trim();
    const id = await page.evaluate(() => document.activeElement?.getAttribute('data-toc-id') ?? null);
    await page.keyboard.press('Enter');
    await attendreFinDefilement(page);
    attendreSousEntete(await positionTitre(page, { id, libelle }), `Entrée sur « ${libelle} »`);
  });

  test('ouvertures et fermetures répétées : aucun défilement, aucun débordement horizontal', async ({ page }) => {
    await page.goto(avecA([ARTICLES_MOBILE[0]]).at(-1)!);
    const { bascule } = sommaireRepliable(page);
    await bascule.scrollIntoViewIfNeeded();
    const y0 = await page.evaluate(() => window.scrollY);
    for (let i = 0; i < 4; i++) {
      await bascule.tap();
      await expect(bascule).toHaveAttribute('aria-expanded', i % 2 === 0 ? 'true' : 'false');
    }
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(y0, 0);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
      'débordement horizontal',
    ).toBeLessThanOrEqual(0);
  });

  test.describe('mouvement réduit', () => {
    test('saut direct, sans défilement doux, titre visible', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(() => {
        const w = window as unknown as { __comportements: string[] };
        w.__comportements = [];
        const origine = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function (this: Element, arg?: boolean | ScrollIntoViewOptions) {
          w.__comportements.push(typeof arg === 'object' ? (arg.behavior ?? 'auto') : 'auto');
          return origine.call(this, arg);
        };
      });
      await page.goto(ARTICLES_MOBILE[0]);
      const { sommaire, bascule } = sommaireRepliable(page);
      await bascule.tap();
      const entree = sommaire.locator('ul button').last();
      await entree.scrollIntoViewIfNeeded();
      const cible = await cibleDe(entree);
      await entree.tap();
      await attendreFinDefilement(page);
      attendreSousEntete(await positionTitre(page, cible), `dernière entrée « ${cible.libelle} »`);
      const comportements = await page.evaluate(() => (window as unknown as { __comportements: string[] }).__comportements);
      expect(comportements.length).toBeGreaterThan(0);
      expect(comportements, 'aucun défilement doux').not.toContain('smooth');
    });
  });
});

// ---------------------------------------------------------------------------------------
// Sommaire latéral : desktop (1 024 px et plus)
// ---------------------------------------------------------------------------------------

const LATERAL = [
  // Viewport de la QA Chrome du 06/10 sur la Preview #96.
  { viewport: { width: 1321, height: 727 }, urls: avecA(ARTICLES_LONGS) },
  { viewport: { width: 1440, height: 900 }, urls: avecA([ARTICLES_LONGS[0]]) },
  { viewport: { width: 1180, height: 727 }, urls: avecA([ARTICLES_LONGS[1]]) },
  { viewport: { width: 1024, height: 768 }, urls: avecA([ARTICLES_LONGS[2]]) },
];

/** Lecteur au milieu de l'article : la colonne est collée sous l'en-tête. */
async function lireAuMilieu(page: Page) {
  await page.evaluate(() =>
    window.scrollTo(0, document.querySelector('main article')!.getBoundingClientRect().top + window.scrollY + 400),
  );
  await attendreFinDefilement(page);
}

async function geometrieListe(page: Page) {
  return page.evaluate(() => {
    const liste = document.querySelector('aside nav ul')!.parentElement!;
    const r = liste.getBoundingClientRect();
    return {
      haut: r.top,
      bas: r.bottom,
      client: liste.clientHeight,
      contenu: liste.scrollHeight,
      overflowY: getComputedStyle(liste).overflowY,
      entete: document.querySelector('header.sticky')!.getBoundingClientRect().bottom,
    };
  });
}

/** L'entrée active est unique, c'est celle du titre visé, et elle est visible dans la liste. */
async function attendreEntreeActive(page: Page, cible: { id: string | null; libelle: string }, quoi: string) {
  const actives = page.locator('aside nav [aria-current="location"]');
  await expect(actives, `${quoi} : une seule entrée active`).toHaveCount(1);
  if (cible.id) await expect(actives, `${quoi} : entrée active = titre visé`).toHaveAttribute('data-toc-id', cible.id);
  else await expect(actives, `${quoi} : entrée active = titre visé`).toHaveText(cible.libelle);
  const b = (await actives.boundingBox())!;
  const l = await geometrieListe(page);
  expect(b.y, `${quoi} : entrée active visible dans la liste (haut)`).toBeGreaterThanOrEqual(l.haut - 1);
  expect(b.y + b.height, `${quoi} : entrée active visible dans la liste (bas)`).toBeLessThanOrEqual(l.bas + 1);
}

for (const { viewport, urls } of LATERAL) {
  test.describe(`Sommaire latéral, desktop ${viewport.width} × ${viewport.height}`, () => {
    test.use({ viewport });

    for (const url of urls) {
      test(`collé, dans la fenêtre, défilement interne, toutes les entrées atteignables — ${url}`, async ({ page }) => {
        await page.goto(url);
        const nav = page.locator('aside nav');
        const entrees = nav.locator('button');
        const article = page.locator('main article').first();
        const avant = (await article.boundingBox())!;
        await lireAuMilieu(page);

        const boite = (await nav.boundingBox())!;
        const l = await geometrieListe(page);
        expect(boite.y, 'colonne collée sous l\'en-tête').toBeGreaterThanOrEqual(l.entete);
        expect(boite.y + boite.height, 'bas du sommaire dans la fenêtre').toBeLessThanOrEqual(viewport.height);
        expect(l.contenu, 'liste plus longue que sa boîte : le cas visé').toBeGreaterThan(l.client);
        expect(l.overflowY, 'défilement interne').toMatch(/auto|scroll/);

        // Chaque entrée, de la première à la dernière, peut être amenée dans la fenêtre.
        const nombre = await entrees.count();
        for (let i = 0; i < nombre; i++) {
          await entrees.nth(i).scrollIntoViewIfNeeded();
          const b = (await entrees.nth(i).boundingBox())!;
          expect(b.y + b.height, `entrée ${i + 1}/${nombre} dans la fenêtre`).toBeLessThanOrEqual(viewport.height);
          expect(b.y, `entrée ${i + 1}/${nombre} sous l'en-tête`).toBeGreaterThanOrEqual(l.entete);
        }

        // Dernière, puis première entrée : titre sous l'en-tête, entrée active juste et visible.
        for (const [quelle, i] of [['dernière', nombre - 1], ['première', 0]] as const) {
          const entree = entrees.nth(i);
          const cible = await cibleDe(entree);
          await entree.click();
          await attendreFinDefilement(page);
          attendreSousEntete(await positionTitre(page, cible), `${quelle} entrée « ${cible.libelle} »`);
          await attendreEntreeActive(page, cible, `${quelle} entrée`);
        }

        // Le contenu principal ne bouge pas.
        const apres = (await article.boundingBox())!;
        expect(apres.x).toBeCloseTo(avant.x, 0);
        expect(apres.width).toBeCloseTo(avant.width, 0);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
          'débordement horizontal',
        ).toBeLessThanOrEqual(0);
      });
    }
  });
}

test.describe('Sommaire latéral, desktop : clavier, clics successifs, molette, pied de page', () => {
  test.use({ viewport: { width: 1321, height: 727 } });
  const URL = avecA([ARTICLES_LONGS[0]]).at(-1)!;

  test('au clavier : chaque entrée reçoit le focus en restant visible, Entrée sur la dernière', async ({ page }) => {
    await page.goto(URL);
    const entrees = page.locator('aside nav button');
    await lireAuMilieu(page);
    const nombre = await entrees.count();
    await entrees.first().focus();
    for (let i = 1; i < nombre; i++) {
      await page.keyboard.press('Tab');
      await expect(entrees.nth(i)).toBeFocused();
      const b = (await entrees.nth(i).boundingBox())!;
      const l = await geometrieListe(page);
      expect(b.y + b.height, `entrée ${i + 1} focalisée, visible`).toBeLessThanOrEqual(Math.min(l.bas, 727) + 1);
      expect(b.y, `entrée ${i + 1} focalisée, visible`).toBeGreaterThanOrEqual(l.haut - 1);
    }
    const cible = await cibleDe(entrees.last());
    await page.keyboard.press('Enter');
    await attendreFinDefilement(page);
    attendreSousEntete(await positionTitre(page, cible), `Entrée sur « ${cible.libelle} »`);
    await attendreEntreeActive(page, cible, 'Entrée');
  });

  test('deux clics rapprochés : la page finit sur le second titre', async ({ page }) => {
    await page.goto(URL);
    const entrees = page.locator('aside nav button');
    await lireAuMilieu(page);
    const nombre = await entrees.count();
    await entrees.last().scrollIntoViewIfNeeded();
    await entrees.last().click();
    await page.waitForTimeout(150);
    const seconde = entrees.nth(Math.min(5, nombre - 2));
    const cible = await cibleDe(seconde);
    await seconde.click();
    await attendreFinDefilement(page);
    attendreSousEntete(await positionTitre(page, cible), `second clic « ${cible.libelle} »`);
    await attendreEntreeActive(page, cible, 'second clic');
  });

  test('molette pendant le défilement : la page reste où le lecteur l\'amène', async ({ page }) => {
    await page.goto(URL);
    const entrees = page.locator('aside nav button');
    await lireAuMilieu(page);
    await entrees.last().scrollIntoViewIfNeeded();
    const cible = await cibleDe(entrees.last());
    await entrees.last().click();
    await page.waitForTimeout(300);
    await page.mouse.move(500, 400);
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, -500);
      await page.waitForTimeout(40);
    }
    await attendreFinDefilement(page);
    const p = (await positionTitre(page, cible))!;
    // Ramenée de force sur le titre, la page le placerait à sa marge de défilement (96 px).
    expect(Math.abs(p.haut - p.marge), 'page non ramenée sur le titre').toBeGreaterThan(200);
  });

  test('une seule entrée active en lecture, et la colonne ne recouvre pas le pied de page', async ({ page }) => {
    await page.goto(URL);
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
    const navBoite = await nav.boundingBox();
    const pied = await page.locator('footer').boundingBox();
    expect(aside!.y + aside!.height).toBeLessThanOrEqual(pied!.y + 1);
    expect(navBoite!.y + navBoite!.height).toBeLessThanOrEqual(pied!.y + 1);
  });
});
