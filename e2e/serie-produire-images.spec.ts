import { test, expect, type Page } from '@playwright/test';

/**
 * Série éditoriale « Produire ses images produit » : article 1 (décider) et
 * article 2 (produire).
 *
 * Fichier partagé par les deux PR et IDENTIQUE dans les deux. Chaque article
 * n'est contrôlé que s'il est en forme réécrite sur la Preview visée (présence
 * de `h2.psc-q`) ; sinon le test est ignoré. Chaque PR est donc verte avec sa
 * seule Preview, et une fois A ET B publiés les deux articles sont couverts.
 *
 * Parcours : réponse courte visible sans interaction, blocs dépliables au
 * clavier, sommaire vers une question, absence de défilement horizontal.
 */
const ARTICLES = [
  { url: '/fr/blog/est-il-utile-dinternaliser-sa-production-de-photos-packshot', questions: 7 },
  { url: '/fr/blog/e-commerce-comment-mettre-en-place-votre-studio-photo', questions: 8 },
];

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true })), url: baseURL! },
  ]);
});

/** Ignore le test si l'article n'est pas (encore) réécrit sur cette Preview. */
async function sauterSiAncien(page: Page, url: string) {
  await page.goto(url);
  const n = await page.locator('h2.psc-q').count();
  test.skip(n === 0, 'article non réécrit sur cette Preview (contrôlé dans sa PR dédiée)');
}

/** Fin du défilement doux et des corrections d'arrivée du sommaire (voir sommaire-blog.spec.ts). */
async function attendreFinDefilement(page: Page) {
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

/** Le titre visé est sous l'en-tête collant et dans la fenêtre. */
async function attendreTitreVisible(page: Page, index: number) {
  const p = await page.evaluate((i) => {
    const entete = document.querySelector('header.sticky')!.getBoundingClientRect().bottom;
    const r = document.querySelectorAll('h2.psc-q')[i].getBoundingClientRect();
    return { haut: r.top, bas: r.bottom, entete, fenetre: window.innerHeight };
  }, index);
  expect(p.haut).toBeGreaterThanOrEqual(p.entete - 1);
  expect(p.bas).toBeLessThanOrEqual(p.fenetre);
}

async function sansDebordement(page: Page) {
  const { scrollW, innerW } = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
  }));
  expect(scrollW).toBeLessThanOrEqual(innerW);
}

for (const { url, questions } of ARTICLES) {
  test.describe(url, () => {
    test('chaque question affiche sa réponse courte sans interaction', async ({ page }) => {
      await sauterSiAncien(page, url);
      await expect(page.locator('h2.psc-q')).toHaveCount(questions);
      const breves = page.locator('h2.psc-q + .psc-bref');
      await expect(breves).toHaveCount(questions);
      for (let i = 0; i < questions; i++) await expect(breves.nth(i)).toBeVisible();
    });

    test('un bloc dépliable s’ouvre et se referme au clavier', async ({ page }) => {
      await sauterSiAncien(page, url);
      const bloc = page.locator('details.psc-details').first();
      const resume = bloc.locator('summary');
      await resume.focus();
      await expect(resume).toBeFocused();
      await expect(bloc).not.toHaveAttribute('open', '');
      await page.keyboard.press('Enter');
      await expect(bloc).toHaveAttribute('open', '');
      await expect(bloc.locator('.psc-details__corps')).toBeVisible();
      await page.keyboard.press('Space');
      await expect(bloc).not.toHaveAttribute('open', '');
    });

    test('desktop : le sommaire mène à la quatrième question, visible sous l’en-tête', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await sauterSiAncien(page, url);
      const cible = page.locator('h2.psc-q').nth(3);
      const libelle = (await cible.innerText()).replace(/^\d+\s*/, '').trim();
      await page.locator('aside nav button').filter({ hasText: libelle.slice(0, 30) }).click();
      await attendreFinDefilement(page);
      await attendreTitreVisible(page, 3);
      await sansDebordement(page);
    });

    test('mobile : sommaire repliable, question atteinte, aucun défilement horizontal', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await sauterSiAncien(page, url);
      await sansDebordement(page);
      const cible = page.locator('h2.psc-q').nth(2);
      const libelle = (await cible.innerText()).replace(/^\d+\s*/, '').trim();
      const sommaire = page.locator('main div[class*="lg:hidden"]').first();
      await sommaire.locator('button').first().click();
      await sommaire.locator('li button').filter({ hasText: libelle.slice(0, 30) }).click();
      await attendreFinDefilement(page);
      await attendreTitreVisible(page, 2);
    });
  });
}
