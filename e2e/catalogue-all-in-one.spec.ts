import { test, expect, type Page, type Route } from '@playwright/test';

/**
 * Landing /fr/catalogue-orbitvu-all-in-one (kit du 02/10/2026, V3 et V4 du même jour).
 *
 * Les réponses de /api/catalogue sont simulées par `page.route` : aucun appel ne
 * sort du navigateur vers un service réel. Seul le dernier test interroge la
 * vraie route locale, pour vérifier qu'elle reste fermée (503) tant qu'aucun
 * service n'est branché.
 */

const URL_PAGE = '/fr/catalogue-orbitvu-all-in-one';
const H1 = 'Vos produits comme vous ne les avez jamais vus.';
const VIDEO = '/images/hero/hero-range-2025.mp4';
const POSTER = '/images/hero/hero-range-2025-poster.avif';
const PDF_SIMULE = 'https://exemple.test/catalogue-simule.pdf';

async function simulerApi(page: Page, status: number, body: unknown, delai = 0) {
  const appels: unknown[] = [];
  await page.route('**/api/catalogue', async (route: Route) => {
    appels.push(route.request().postDataJSON());
    if (delai) await new Promise((r) => setTimeout(r, delai));
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  return appels;
}

async function remplir(page: Page, { consultant = false } = {}) {
  await page.getByLabel('Prénom').fill('Claire');
  await page.getByLabel('E-mail professionnel').fill('claire@gmail.com');
  await page.getByLabel('Entreprise').fill('Atelier Exemple');
  await page.locator('#catalogue').getByText('Suisse', { exact: true }).click();
  if (consultant) await page.getByLabel(/Je souhaite être contacté\(e\)/).check();
}

test.describe('Landing catalogue All-in-One', () => {
  test.beforeEach(async ({ context }) => {
    // Bandeau cookies déjà réglé (analytique refusée) : il ne masque pas le formulaire.
    await context.addCookies([
      {
        name: 'cookie-consent',
        value: encodeURIComponent(JSON.stringify({ necessary: true, analytics: false, externalMedia: false })),
        url: 'http://localhost:3000',
      },
    ]);
  });

  test('H1, métadonnées noindex, aucune canonique ni hreflang', async ({ page }) => {
    await page.goto(URL_PAGE);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(H1);
    await expect(page).toHaveTitle('Catalogue Orbitvu All-in-One 2026 | PackshotCreator');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    // D37 : la landing n'ajoute aucun lien vers F5 (le Footer partagé, hors <main>, n'est pas modifié).
    await expect(page.locator('main a[href*="packshot-e-commerce"]')).toHaveCount(0);
  });

  test('formulaire : aucun pays présélectionné, consultant décoché, ni téléphone ni case marketing', async ({ page }) => {
    await page.goto(URL_PAGE);
    const form = page.locator('#catalogue form');
    await expect(form.locator('input[type="radio"]:checked')).toHaveCount(0);
    await expect(form.locator('input[type="checkbox"]')).toHaveCount(1);
    await expect(page.getByLabel(/Je souhaite être contacté\(e\)/)).not.toBeChecked();
    await expect(form.locator('input[type="tel"]')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Recevoir le catalogue All-in-One' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Recevoir le catalogue' })).toBeVisible();
  });

  test('vidéo de la home en desktop : muette, en boucle, bouton pause', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL_PAGE);
    const video = page.locator('section[aria-labelledby="catalogue-titre"] video');
    await expect(video).toHaveCount(1);
    await expect(video.locator('source')).toHaveAttribute('src', VIDEO);
    await expect(video).toHaveAttribute('poster', POSTER);
    expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.autoplay && v.playsInline)).toBe(true);
    const pause = page.getByRole('button', { name: 'Mettre en pause l’animation' });
    await pause.click();
    await expect(page.getByRole('button', { name: 'Lire l’animation' })).toBeVisible();
  });

  test('mobile : image fixe, la vidéo n’est pas téléchargée', async ({ page }) => {
    const mp4: string[] = [];
    page.on('request', (r) => {
      if (r.url().includes('hero-range-2025.mp4')) mp4.push(r.url());
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(URL_PAGE);
    await page.waitForLoadState('networkidle');
    const hero = page.locator('section[aria-labelledby="catalogue-titre"]');
    await expect(hero.locator('video')).toHaveCount(0);
    await expect(hero.locator(`img[src="${POSTER}"]`)).toHaveCount(1);
    expect(mp4).toEqual([]);
  });

  test('mouvement réduit : image fixe en desktop', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(URL_PAGE);
    const hero = page.locator('section[aria-labelledby="catalogue-titre"]');
    await expect(hero.locator(`img[src="${POSTER}"]`)).toHaveCount(1);
    await expect(hero.locator('video')).toHaveCount(0);
    await context.close();
  });

  test('bouton principal visible dans le premier écran à 1440 × 900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL_PAGE);
    const boite = await page.getByRole('button', { name: 'Recevoir le catalogue' }).boundingBox();
    expect(boite).not.toBeNull();
    expect(boite!.y + boite!.height).toBeLessThanOrEqual(900);
  });

  test('envoi vide : quatre messages, aucune requête', async ({ page }) => {
    const appels = await simulerApi(page, 200, {});
    await page.goto(URL_PAGE);
    await page.getByRole('button', { name: 'Recevoir le catalogue' }).click();
    for (const message of [
      'Indiquez votre prénom.',
      'Saisissez une adresse e-mail valide.',
      'Indiquez votre entreprise.',
      'Sélectionnez France ou Suisse.',
    ]) {
      await expect(page.getByText(message)).toBeVisible();
    }
    await expect(page.getByLabel('Prénom')).toHaveAttribute('aria-invalid', 'true');
    expect(appels).toHaveLength(0);
  });

  test('succès confirmé : bouton PDF, e-mail et consultant annoncés seulement sur confirmation', async ({ page }) => {
    const appels = await simulerApi(page, 200, {
      ok: true,
      pdfUrl: PDF_SIMULE,
      emailSent: true,
      contactRequestAccepted: true,
    });
    await page.goto(URL_PAGE);
    await remplir(page, { consultant: true });
    await page.getByRole('button', { name: 'Recevoir le catalogue' }).click();
    const titre = page.getByRole('heading', { name: 'Votre catalogue est prêt.' });
    await expect(titre).toBeFocused();
    await expect(page.getByRole('link', { name: 'Ouvrir le catalogue' })).toHaveAttribute('href', PDF_SIMULE);
    await expect(page.getByText('Le lien de téléchargement vous a également été envoyé par e-mail.')).toBeVisible();
    await expect(
      page.getByText("Votre demande d'échange avec un consultant PackshotCreator a été prise en compte."),
    ).toBeVisible();
    expect(appels).toHaveLength(1);
    expect(appels[0]).toMatchObject({ country: 'CH', consultantOptIn: true, email: 'claire@gmail.com' });
    expect(Object.keys(appels[0] as object)).not.toContain('marketingOptIn');
  });

  test('e-mail non confirmé, consultant non transmis : rien n’est affirmé', async ({ page }) => {
    await simulerApi(page, 200, { ok: true, pdfUrl: PDF_SIMULE, emailSent: false, contactRequestAccepted: false });
    await page.goto(URL_PAGE);
    await remplir(page, { consultant: true });
    await page.getByRole('button', { name: 'Recevoir le catalogue' }).click();
    await expect(
      page.getByText("Votre catalogue est disponible ci-dessous. Nous n'avons pas pu confirmer l'envoi du lien par e-mail."),
    ).toBeVisible();
    await expect(page.getByText(/envoyé par e-mail/)).toHaveCount(0);
    await expect(page.getByText(/a été prise en compte/)).toHaveCount(0);
    await expect(page.getByText("Envie d'en parler ? Contactez un consultant PackshotCreator.")).toBeVisible();
  });

  for (const [status, body, message] of [
    [503, { ok: false, error: 'catalogue_unavailable' }, 'Le fichier est momentanément indisponible. Réessayez ou contactez-nous.'],
    [429, { ok: false, error: 'rate_limited', retryAfterSec: 60 }, 'Plusieurs tentatives ont été détectées.'],
    [500, { ok: false, error: 'technical' }, "Votre demande n'a pas pu être finalisée. Réessayez dans quelques instants."],
  ] as const) {
    test(`réponse ${status} : message dédié, téléphones en repli, aucun succès`, async ({ page }) => {
      await simulerApi(page, status, body);
      await page.goto(URL_PAGE);
      await remplir(page);
      await page.getByRole('button', { name: 'Recevoir le catalogue' }).click();
      await expect(page.getByText(message)).toBeVisible();
      await expect(page.locator('#catalogue a[href="tel:+33147426666"]')).toBeVisible();
      await expect(page.locator('#catalogue a[href="tel:+41445804384"]')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Votre catalogue est prêt.' })).toHaveCount(0);
      if (status === 500) await expect(page.getByRole('button', { name: 'Réessayer' })).toBeVisible();
    });
  }

  test('double clic : une seule requête, bouton désactivé pendant l’envoi', async ({ page }) => {
    const appels = await simulerApi(page, 200, { ok: true, pdfUrl: PDF_SIMULE, emailSent: true, contactRequestAccepted: false }, 800);
    await page.goto(URL_PAGE);
    await remplir(page);
    const bouton = page.getByRole('button', { name: 'Recevoir le catalogue' });
    await bouton.dblclick();
    await expect(page.getByRole('button', { name: 'Préparation de votre catalogue…' })).toBeDisabled();
    await expect(page.getByRole('heading', { name: 'Votre catalogue est prêt.' })).toBeVisible();
    expect(appels).toHaveLength(1);
  });

  test('téléphones France et Suisse cliquables', async ({ page }) => {
    await page.goto(URL_PAGE);
    await expect(page.locator('a[href="tel:+33147426666"]').first()).toBeVisible();
    await expect(page.locator('a[href="tel:+41445804384"]').first()).toBeVisible();
    await expect(page.getByText('Zones desservies : France et Suisse.')).toBeVisible();
  });

  test('sélecteur de langue : EN et DE-CH vers l’accueil, jamais vers une URL inexistante', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL_PAGE);
    const groupe = page.locator('header [role="group"][aria-label="Language"]').first();
    await expect(groupe.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en');
    await expect(groupe.getByRole('link', { name: 'DE-CH' })).toHaveAttribute('href', '/de-ch');
  });

  for (const largeur of [320, 390, 768, 1024, 1440]) {
    test(`aucun débordement horizontal à ${largeur} px`, async ({ page }) => {
      await page.setViewportSize({ width: largeur, height: 900 });
      await page.goto(URL_PAGE);
      const deborde = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(deborde).toBe(false);
    });
  }

  test.describe('frise des studios (V4)', () => {
    const NOMS = [
      'Alphashot Micro Pro v2',
      'Alphashot 360',
      'Alphashot Pro G2',
      'Alphashot XL Pro v2',
      'Alphatable v2',
      'Alphastudio Compact Pro v2',
      'Bike Studio',
      'Furniture Studio',
      'E-Comm Studio+',
    ];
    const FRISE = 'section[aria-labelledby="gamme-titre"]';
    const position = (page: Page) =>
      page.locator('#frise-studios').evaluate((el) => ({ gauche: el.scrollLeft, max: el.scrollWidth - el.clientWidth }));

    async function contexteDesktop(browser: import('@playwright/test').Browser, reducedMotion: 'reduce' | 'no-preference') {
      // Souris et sans écran tactile, y compris dans le projet mobile : l'automatisme
      // est réservé aux grands écrans avec survol.
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion, hasTouch: false, isMobile: false });
      await context.addCookies([
        {
          name: 'cookie-consent',
          value: encodeURIComponent(JSON.stringify({ necessary: true, analytics: false, externalMedia: false })),
          url: 'http://localhost:3000',
        },
      ]);
      return context;
    }

    test('entre le hero et « Imaginez les possibilités » : neuf studios, sans doublon ni lien', async ({ page }) => {
      await page.goto(URL_PAGE);
      const ordre = await page.evaluate(() =>
        [...document.querySelectorAll('main section[aria-labelledby]')].map((s) => s.getAttribute('aria-labelledby')),
      );
      expect(ordre.slice(0, 3)).toEqual(['catalogue-titre', 'gamme-titre', 'possibilites-titre']);
      const frise = page.locator(FRISE);
      await expect(frise.getByRole('heading', { level: 2 })).toHaveText('Du bijou au mobilier, explorez les studios Orbitvu.');
      await expect(frise.getByText('UNE GAMME, DE MULTIPLES POSSIBILITÉS')).toBeVisible();
      const cartes = page.getByRole('list', { name: 'Studios Orbitvu' }).getByRole('listitem');
      await expect(cartes).toHaveCount(NOMS.length);
      for (const [i, nom] of NOMS.entries()) await expect(cartes.nth(i)).toContainText(nom);
      await expect(frise.locator('a')).toHaveCount(0);
      await expect(frise).not.toContainText('€');
      await expect(frise).not.toContainText('Alphashot XL G2');
    });

    test('précédent, suivant et clavier', async ({ browser }) => {
      const context = await contexteDesktop(browser, 'no-preference');
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      const precedent = page.getByRole('button', { name: 'Studios précédents' });
      const suivant = page.getByRole('button', { name: 'Studios suivants' });
      await expect(precedent).toBeDisabled();
      await suivant.click();
      await expect.poll(async () => (await position(page)).gauche).toBeGreaterThan(0);
      await expect(precedent).toBeEnabled();
      await expect(page.getByRole('button', { name: 'Reprendre le défilement' })).toBeVisible();
      const liste = page.getByRole('list', { name: 'Studios Orbitvu' });
      await liste.focus();
      const avant = (await position(page)).gauche;
      await page.keyboard.press('ArrowRight');
      await expect.poll(async () => (await position(page)).gauche).toBeGreaterThan(avant);
      await page.keyboard.press('End');
      await expect.poll(async () => { const p = await position(page); return p.max - p.gauche; }).toBeLessThanOrEqual(2);
      await expect(suivant).toBeDisabled();
      await page.keyboard.press('Home');
      await expect.poll(async () => (await position(page)).gauche).toBe(0);
      await expect(precedent).toBeDisabled();
      await context.close();
    });

    test('desktop : avancée automatique seulement vidéo hors champ, arrêtée par une interaction manuelle', async ({ browser }) => {
      const context = await contexteDesktop(browser, 'no-preference');
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      // Premier écran : la vidéo est dans le champ, la frise ne bouge pas.
      await page.waitForTimeout(5500);
      expect((await position(page)).gauche).toBe(0);
      await page.locator(FRISE).evaluate((s) => s.scrollIntoView({ block: 'center' }));
      await page.mouse.move(5, 5);
      await expect.poll(async () => (await position(page)).gauche, { timeout: 10_000 }).toBeGreaterThan(0);
      await page.getByRole('button', { name: 'Mettre en pause le défilement' }).click();
      await expect(page.getByRole('button', { name: 'Reprendre le défilement' })).toBeVisible();
      await page.mouse.move(5, 5);
      const figee = (await position(page)).gauche;
      await page.waitForTimeout(5500);
      expect((await position(page)).gauche).toBe(figee);
      await context.close();
    });

    test('mouvement réduit : ni bouton pause ni avancée automatique', async ({ browser }) => {
      const context = await contexteDesktop(browser, 'reduce');
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await page.locator(FRISE).evaluate((s) => s.scrollIntoView({ block: 'center' }));
      await page.mouse.move(5, 5);
      await expect(page.getByRole('button', { name: /défilement/ })).toHaveCount(0);
      await page.waitForTimeout(5500);
      expect((await position(page)).gauche).toBe(0);
      await context.close();
    });

    test('mobile : défilement horizontal à accroche, carte suivante entrevue, aucun automatisme', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(URL_PAGE);
      const liste = page.locator('#frise-studios');
      await liste.scrollIntoViewIfNeeded();
      await expect(page.getByRole('button', { name: /défilement/ })).toHaveCount(0);
      const mesure = await liste.evaluate((el) => {
        const [premiere, seconde] = [...el.querySelectorAll('li')].map((li) => li.getBoundingClientRect());
        return {
          accroche: getComputedStyle(el).scrollSnapType,
          defile: el.scrollWidth > el.clientWidth,
          secondeEntrevue: seconde.left < window.innerWidth && seconde.right > window.innerWidth,
          premiereEntiere: premiere.left >= 0 && premiere.right <= window.innerWidth,
        };
      });
      expect(mesure).toEqual({ accroche: 'x mandatory', defile: true, secondeEntrevue: true, premiereEntiere: true });
      await page.waitForTimeout(5000);
      expect((await position(page)).gauche).toBe(0);
    });
  });

  test('la vraie route locale reste fermée : 503, aucun succès', async ({ request }) => {
    const res = await request.post('/api/catalogue', {
      data: {
        firstName: 'Claire',
        email: 'claire@gmail.com',
        company: 'Atelier Exemple',
        country: 'FR',
        requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
      },
    });
    expect(res.status()).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'catalogue_unavailable' });
  });
});
