import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * Pop-in d'engagement (mission du 09/10/2026) : desktop, FR, 60 s + 70 % de
 * lecture + intention de sortie, une seule apparition par session, démo en CTA
 * principal, catalogue en repli avec `origine`. Le temps est piloté par
 * l'horloge de Playwright ; GA4 est remplacé par un relevé local des appels
 * `gtag` (aucun envoi réseau). Aucun formulaire, e-mail ni service tiers.
 *
 * Cible : un build de production local (`next start`) ou une Preview ; jamais
 * la production, où la pop-in n'est pas montée sans GO de publication.
 */

const PAGE_ELIGIBLE = '/fr/blog/guide-achat-studio-2026';
const URL_CATALOGUE = '/fr/catalogue-orbitvu-all-in-one?origine=brochure_exit_sitewide';
const TITRE = 'Découvrez ce qu’Orbitvu peut apporter à votre production visuelle.';

async function choixCookiesFait(context: BrowserContext, baseURL: string) {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true })), url: baseURL },
  ]);
}

/**
 * Relevé des appels `gtag`, propre au test. Il est tenu dans le sessionStorage
 * de l'onglet de test pour survivre à un chargement complet de page : sans la
 * landing de #82, le lien catalogue recharge la page.
 */
async function releverGA(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = (...a: unknown[]) => {
      const releve = JSON.parse(sessionStorage.getItem('__releve_ga') || '[]') as unknown[][];
      releve.push(a);
      sessionStorage.setItem('__releve_ga', JSON.stringify(releve));
    };
  });
}

async function evenementsGA(page: Page) {
  return page.evaluate(() =>
    (JSON.parse(sessionStorage.getItem('__releve_ga') || '[]') as unknown[][]).filter((e) => e[0] === 'event'),
  );
}

async function ouvrir(page: Page, chemin = PAGE_ELIGIBLE) {
  await page.clock.install();
  await page.goto(chemin);
  await page.waitForLoadState('networkidle');
}

async function lire(page: Page, part = 1) {
  await page.evaluate((p) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.round(max * p));
    window.dispatchEvent(new Event('scroll'));
  }, part);
}

/** Souris qui remonte puis quitte la fenêtre par le haut. */
async function sortirParLeHaut(page: Page) {
  await page.mouse.move(700, 300);
  await page.mouse.move(700, 6);
  await page.evaluate(() => {
    document.dispatchEvent(new MouseEvent('mouseout', { clientX: 700, clientY: -1, relatedTarget: null, bubbles: true }));
  });
}

const fenetre = (page: Page) => page.locator('dialog[data-popin-engagement]');

test.describe('Pop-in d’engagement — desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ context, baseURL }) => {
    await choixCookiesFait(context, baseURL!);
  });

  test('apparaît quand les trois conditions sont réunies, avec la copy et l’accessibilité attendues', async ({ page }) => {
    await releverGA(page);
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);

    const d = fenetre(page);
    await expect(d).toBeVisible();
    await expect(page.getByRole('dialog', { name: TITRE })).toBeVisible();
    await expect(d).toHaveAttribute('aria-modal', 'true');
    await expect(d).toHaveAttribute('aria-labelledby', 'popin-engagement-titre');
    await expect(d.getByText('Pas encore prêt pour une démo ?')).toBeVisible();
    await expect(d.locator('strong')).toHaveText('studio automatisé Orbitvu');
    await expect(d.getByText('France • Suisse • Réponse par e-mail')).toBeVisible();
    await expect(d.getByText('Le catalogue est envoyé par e-mail.')).toBeVisible();
    await expect(d.getByRole('button', { name: 'Fermer' })).toBeFocused();

    const demo = d.getByRole('link', { name: 'Demander une démo' });
    const catalogue = d.getByRole('link', { name: 'Recevoir le catalogue' });
    await expect(demo).toHaveAttribute('href', '/fr/contact');
    await expect(catalogue).toHaveAttribute('href', URL_CATALOGUE);
    // Hiérarchie : la démo est pleine, le catalogue en contour.
    const fonds = await Promise.all(
      [demo, catalogue].map((l) => l.evaluate((el) => getComputedStyle(el).backgroundColor)),
    );
    expect(fonds[0]).not.toBe(fonds[1]);
    expect(fonds[1]).toBe('rgb(255, 255, 255)');

    expect(await evenementsGA(page)).toContainEqual(['event', 'exit_modal_view', { cta_location: 'exit_modal' }]);
  });

  test('aucune apparition avant 60 s, puis apparition une fois le temps atteint', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(30_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toHaveCount(0);
    await page.clock.fastForward(31_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toBeVisible();
  });

  test('aucune apparition sous 70 % de lecture', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 0.3);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toHaveCount(0);
  });

  test('aucune apparition sans intention de sortie, ni sur une sortie latérale', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await page.mouse.move(700, 400);
    await page.mouse.move(10, 400);
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('mouseout', { clientX: -1, clientY: 400, relatedTarget: null, bubbles: true }));
    });
    await page.clock.fastForward(5_000);
    await expect(fenetre(page)).toHaveCount(0);
  });

  test('fermeture par Échap : focus rendu, puis plus aucune apparition dans la session', async ({ page }) => {
    await releverGA(page);
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    const lien = page.locator('main a[href]').first();
    await lien.focus();
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(fenetre(page)).toHaveCount(0);
    await expect(lien).toBeFocused();
    await sortirParLeHaut(page);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toHaveCount(0);
    expect(await evenementsGA(page)).toContainEqual([
      'event',
      'cta_click',
      { cta_name: 'close', cta_location: 'exit_modal', close_method: 'escape' },
    ]);
  });

  test('fermeture par le bouton X et focus piégé dans la fenêtre', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    const d = fenetre(page);
    await expect(d).toBeVisible();
    const fermer = d.getByRole('button', { name: 'Fermer' });
    await expect(fermer).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(d.getByRole('link', { name: 'Demander une démo' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(d.getByRole('link', { name: 'Recevoir le catalogue' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(fermer).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(d.getByRole('link', { name: 'Recevoir le catalogue' })).toBeFocused();
    await fermer.click();
    await expect(d).toHaveCount(0);
  });

  test('clic Démo : page contact, mesure sans donnée personnelle', async ({ page }) => {
    await releverGA(page);
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await fenetre(page).getByRole('link', { name: 'Demander une démo' }).click();
    await expect(page).toHaveURL(/\/fr\/contact$/);
    await expect(fenetre(page)).toHaveCount(0);
    const evts = await evenementsGA(page);
    expect(evts).toContainEqual(['event', 'cta_click', { cta_name: 'demo', cta_location: 'exit_modal' }]);
    const parametres = evts.filter((e) => e[1] === 'exit_modal_view' || e[1] === 'cta_click').map((e) => e[2]);
    for (const p of parametres) {
      expect(Object.keys(p as object).every((k) => ['cta_name', 'cta_location', 'close_method'].includes(k))).toBe(true);
    }
    expect(JSON.stringify(parametres)).not.toMatch(/@|utm_/);
  });

  test('clic Catalogue : landing avec origine, sans UTM', async ({ page }) => {
    await releverGA(page);
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await fenetre(page).getByRole('link', { name: 'Recevoir le catalogue' }).click();
    await expect(page).toHaveURL(/\/fr\/catalogue-orbitvu-all-in-one\?origine=brochure_exit_sitewide$/);
    expect(page.url()).not.toContain('utm_');
    expect(await evenementsGA(page)).toContainEqual(['event', 'cta_click', { cta_name: 'brochure', cta_location: 'exit_modal' }]);
  });

  test('aucun impact serveur : ni formulaire, ni API, ni service tiers pendant le parcours', async ({ page }) => {
    const requetes: string[] = [];
    page.on('request', (r) => {
      if (r.method() !== 'GET' || /\/api\//.test(r.url()) || !r.url().startsWith(new URL(page.url() || 'http://localhost').origin)) {
        requetes.push(`${r.method()} ${r.url()}`);
      }
    });
    await ouvrir(page);
    requetes.length = 0;
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toBeVisible();
    await fenetre(page).getByRole('button', { name: 'Fermer' }).click();
    expect(requetes).toEqual([]);
  });

  test('pas d’apparition quand une autre fenêtre occupe l’écran', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await page.evaluate(() => {
      document.body.style.overflow = 'hidden';
    });
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toHaveCount(0);
  });

  test('aucun décalage de mise en page à l’ouverture', async ({ page }) => {
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    const avant = await page.evaluate(() => {
      const h = document.querySelector('header')!.getBoundingClientRect();
      const m = document.querySelector('main')!.getBoundingClientRect();
      return { h: [h.x, h.y, h.width], m: [m.x, m.y, m.width], w: document.documentElement.clientWidth };
    });
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toBeVisible();
    const apres = await page.evaluate(() => {
      const h = document.querySelector('header')!.getBoundingClientRect();
      const m = document.querySelector('main')!.getBoundingClientRect();
      return { h: [h.x, h.y, h.width], m: [m.x, m.y, m.width], w: document.documentElement.clientWidth };
    });
    expect(apres).toEqual(avant);
  });
});

test.describe('Pop-in d’engagement — routes et langues hors couverture', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ context, baseURL }) => {
    await choixCookiesFait(context, baseURL!);
  });

  for (const chemin of [
    '/fr/contact',
    '/fr/calculateur-roi',
    '/fr/mentions-legales',
    '/fr/academy',
    '/fr',
    '/fr/packshot-e-commerce',
    '/fr/packshot-mode',
    '/en/studios-photo-automatises',
  ]) {
    test(`aucune apparition sur ${chemin}`, async ({ page }) => {
      await ouvrir(page, chemin);
      await lire(page, 1);
      await page.clock.fastForward(61_000);
      await sortirParLeHaut(page);
      await page.clock.fastForward(1_000);
      await expect(fenetre(page)).toHaveCount(0);
    });
  }
});

test.describe('Pop-in d’engagement — bandeau cookies', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('rien tant que le bandeau est affiché ; possible une fois le choix enregistré', async ({ page }) => {
    await ouvrir(page);
    await expect(page.getByRole('button', { name: /refuser/i })).toBeVisible();
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toHaveCount(0);
    await page.getByRole('button', { name: /refuser/i }).first().click();
    await sortirParLeHaut(page);
    await expect(fenetre(page)).toBeVisible();
  });
});

test.describe('Pop-in d’engagement — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('jamais sur mobile, et aucun téléchargement du visuel', async ({ page, context, baseURL }) => {
    await choixCookiesFait(context, baseURL!);
    const visuel: string[] = [];
    page.on('request', (r) => {
      if (r.url().includes('orbitvu-gamme-2026-poster')) visuel.push(r.url());
    });
    await ouvrir(page);
    await lire(page, 1);
    await page.clock.fastForward(61_000);
    await sortirParLeHaut(page);
    await page.clock.fastForward(1_000);
    await expect(fenetre(page)).toHaveCount(0);
    expect(visuel).toEqual([]);
  });
});

test.describe('Pop-in d’engagement — rendu', () => {
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1280, height: 720 },
  ]) {
    test(`tient dans l’écran en ${viewport.width} × ${viewport.height}`, async ({ page, context, baseURL }, info) => {
      await page.setViewportSize(viewport);
      await choixCookiesFait(context, baseURL!);
      await ouvrir(page);
      await lire(page, 1);
      await page.clock.fastForward(61_000);
      await sortirParLeHaut(page);
      const d = fenetre(page);
      await expect(d).toBeVisible();
      await expect(d.locator('img')).toHaveJSProperty('complete', true);
      const boite = (await d.boundingBox())!;
      expect(boite.x).toBeGreaterThanOrEqual(0);
      expect(boite.y).toBeGreaterThanOrEqual(0);
      expect(boite.x + boite.width).toBeLessThanOrEqual(viewport.width);
      expect(boite.y + boite.height).toBeLessThanOrEqual(viewport.height);
      for (const nom of ['Demander une démo', 'Recevoir le catalogue']) {
        const b = (await d.getByRole('link', { name: nom }).boundingBox())!;
        expect(b.y + b.height).toBeLessThanOrEqual(viewport.height);
      }
      await page.screenshot({ path: info.outputPath(`popin-${viewport.width}x${viewport.height}.png`) });
    });
  }
});
