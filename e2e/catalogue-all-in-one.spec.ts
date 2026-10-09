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
const VIDEO = 'https://videos.packshot-creator.com/orbitvu-gamme-2026-540p.mp4';
const POSTER = '/images/hero/orbitvu-gamme-2026-poster.avif';
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
    await expect(page).toHaveTitle('Studios photo Orbitvu : recevez le catalogue | PackshotCreator');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Découvrez les possibilités des studios photo automatisés Orbitvu et recevez le catalogue All-in-One pour explorer la gamme. France et Suisse.',
    );
    // Préparées seulement : ni canonique ni indexation (arbitrage de Laurent).
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /nofollow/);
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

  test('film de la gamme en desktop : muet, en boucle, bouton pause', async ({ page }) => {
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
      if (r.url().includes('orbitvu-gamme-2026-540p.mp4')) mp4.push(r.url());
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

  test('origine de la pop-in (#122) : transmise si attendue, jamais une valeur inconnue ni un UTM', async ({ page }) => {
    const appels = await simulerApi(page, 200, {
      ok: true,
      pdfUrl: PDF_SIMULE,
      emailSent: true,
      contactRequestAccepted: false,
    });
    for (const recherche of ['?origine=brochure_exit_sitewide', '?origine=utm_source%3Dnewsletter', '?utm_source=x', '']) {
      await page.goto(`${URL_PAGE}${recherche}`);
      await remplir(page);
      await page.getByRole('button', { name: 'Recevoir le catalogue' }).click();
      await expect(page.getByRole('heading', { name: 'Votre catalogue est prêt.' })).toBeVisible();
    }
    expect(appels).toHaveLength(4);
    expect(appels[0]).toMatchObject({ origine: 'brochure_exit_sitewide' });
    for (const appel of appels.slice(1)) expect(Object.keys(appel as object)).not.toContain('origine');
  });

  test('mention du formulaire : formulation P3 de Laurent, lien vers la politique de confidentialité', async ({ page }) => {
    await page.goto(URL_PAGE);
    const mention = page.locator('#catalogue').getByText(/Vos coordonnées sont utilisées/);
    await expect(mention).toContainText(
      'Vos coordonnées sont utilisées pour vous transmettre le catalogue et assurer le suivi de votre demande. Notre équipe est également à votre disposition pour vous conseiller dans le choix du studio Orbitvu adapté à vos produits.',
    );
    await expect(mention).not.toContainText('uniquement si vous en faites la demande');
    await expect(mention.getByRole('link', { name: 'politique de confidentialité' })).toHaveAttribute('href', '/fr/confidentialite');
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

  test.describe('frise des studios (V5 : ruban continu)', () => {
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
    /** Position du ruban : translation automatique, sinon défilement natif. */
    const position = (page: Page) =>
      page.locator('#frise-studios').evaluate((el) => {
        const piste = el.firstElementChild as HTMLElement;
        const m = /translate3d\((-?[\d.]+)px/.exec(piste.style.transform);
        const periode = (piste.firstElementChild as HTMLElement).offsetWidth;
        return { auto: !!m, x: m ? -Number(m[1]) : el.scrollLeft, periode, largeur: el.clientWidth };
      });

    async function contexte(
      browser: import('@playwright/test').Browser,
      { reducedMotion = 'no-preference', mobile = false }: { reducedMotion?: 'reduce' | 'no-preference'; mobile?: boolean } = {},
    ) {
      const context = await browser.newContext(
        mobile
          ? { viewport: { width: 390, height: 844 }, reducedMotion, hasTouch: true, isMobile: true }
          : { viewport: { width: 1440, height: 900 }, reducedMotion, hasTouch: false, isMobile: false },
      );
      await context.addCookies([
        {
          name: 'cookie-consent',
          value: encodeURIComponent(JSON.stringify({ necessary: true, analytics: false, externalMedia: false })),
          url: 'http://localhost:3000',
        },
      ]);
      return context;
    }

    /** Frise au centre de l'écran, vérifiée : le défilement doux de la page (Lenis),
     *  initialisé après le chargement, peut ramener la page en haut. */
    async function centrer(page: Page) {
      await page.waitForLoadState('networkidle');
      await expect(async () => {
        await page.locator(FRISE).evaluate((s) => s.scrollIntoView({ block: 'center' }));
        await expect(page.locator(FRISE)).toBeInViewport({ ratio: 0.6, timeout: 500 });
      }).toPass({ timeout: 10_000 });
      await page.mouse.move(5, 5);
    }

    test('entre le hero et « Imaginez les possibilités » : neuf studios accessibles, copies masquées', async ({ page }) => {
      await page.goto(URL_PAGE);
      const ordre = await page.evaluate(() =>
        [...document.querySelectorAll('main section[aria-labelledby]')].map((s) => s.getAttribute('aria-labelledby')),
      );
      expect(ordre.slice(0, 3)).toEqual(['catalogue-titre', 'gamme-titre', 'possibilites-titre']);
      const frise = page.locator(FRISE);
      await expect(frise.getByRole('heading', { level: 2 })).toHaveText('Du bijou au mobilier, explorez les studios Orbitvu.');
      // Une seule liste exposée : les copies de la boucle sont aria-hidden et inertes.
      await expect(frise.getByRole('list')).toHaveCount(1);
      const studios = page.getByRole('list', { name: 'Studios Orbitvu' }).getByRole('listitem');
      await expect(studios).toHaveCount(NOMS.length);
      for (const [i, nom] of NOMS.entries()) await expect(studios.nth(i)).toContainText(nom);
      const copies = page.locator('#frise-studios ul[aria-hidden="true"]');
      await expect(copies).toHaveCount(2);
      for (const copie of await copies.all()) expect(await copie.evaluate((u) => (u as HTMLElement).inert)).toBe(true);
      await expect(frise.locator('a')).toHaveCount(0);
      await expect(frise).not.toContainText('€');
      await expect(frise).not.toContainText('Alphashot XL G2');
    });

    test('desktop : ruban fin, visuels de 92 à 176 px', async ({ browser }) => {
      const context = await contexte(browser);
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      const mesure = await page.locator('#frise-studios').evaluate((el) => ({
        hauteur: el.getBoundingClientRect().height,
        largeurs: [...el.querySelectorAll('ul:not([aria-hidden]) li > div')].map((d) => d.getBoundingClientRect().width),
      }));
      expect(mesure.hauteur).toBeLessThanOrEqual(190);
      expect(Math.min(...mesure.largeurs)).toBeGreaterThanOrEqual(92);
      expect(Math.max(...mesure.largeurs)).toBeLessThanOrEqual(176);
      await context.close();
    });

    test('desktop : défilement continu dès que le ruban est visible, suspendu au survol, pause et reprise', async ({ browser }) => {
      const context = await contexte(browser);
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      // Premier écran : le ruban n'est pas dans le champ, il ne bouge pas.
      await page.waitForTimeout(3000);
      expect(await position(page)).toMatchObject({ auto: false, x: 0 });
      await centrer(page);
      await expect.poll(async () => (await position(page)).x, { timeout: 5_000 }).toBeGreaterThan(0);
      // Continu : de petits incréments réguliers, pas un saut de carte.
      const a = (await position(page)).x;
      await page.waitForTimeout(500);
      const b = (await position(page)).x;
      await page.waitForTimeout(500);
      const c = (await position(page)).x;
      for (const d of [b - a, c - b]) {
        expect(d).toBeGreaterThan(4);
        expect(d).toBeLessThan(30);
      }
      // Survol : arrêt, la position passe au défilement natif sans saut.
      await page.locator('#frise-studios').hover();
      const survol = await position(page);
      expect(survol.auto).toBe(false);
      expect(Math.abs(survol.x - c)).toBeLessThan(30);
      await page.waitForTimeout(1000);
      expect((await position(page)).x).toBe(survol.x);
      await page.mouse.move(5, 5);
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(survol.x);
      // Pause explicite puis reprise.
      await page.getByRole('button', { name: 'Mettre en pause le défilement' }).click();
      await page.mouse.move(5, 5);
      const figee = (await position(page)).x;
      await page.waitForTimeout(1500);
      expect((await position(page)).x).toBe(figee);
      await page.getByRole('button', { name: 'Reprendre le défilement' }).click();
      await page.mouse.move(5, 5);
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(figee);
      await context.close();
    });

    test('ruban visible, vidéo du hero encore à l’écran : le ruban défile et la vidéo se met en pause', async ({ browser }) => {
      const context = await contexte(browser);
      // Appels à play() et pause() comptés : le Chromium de test ne décode pas forcément
      // le H.264, l'état `paused` seul ne prouverait rien.
      await context.addInitScript(() => {
        const w = window as unknown as { __pauses: number; __lectures: number };
        w.__pauses = 0;
        w.__lectures = 0;
        const pause = HTMLMediaElement.prototype.pause;
        const play = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.pause = function () {
          w.__pauses += 1;
          return pause.call(this);
        };
        HTMLMediaElement.prototype.play = function () {
          w.__lectures += 1;
          return play.call(this);
        };
      });
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await page.waitForLoadState('networkidle');
      // Référence prise avant le défilement : le ruban démarre dès qu'il entre dans le champ.
      const pauses = await page.evaluate(() => (window as unknown as { __pauses: number }).__pauses);
      // Ruban en bas de l'écran : la vidéo reste visible au-dessus.
      await expect(async () => {
        await page.locator('#frise-studios').evaluate((el) => el.scrollIntoView({ block: 'end' }));
        await expect(page.locator('#frise-studios')).toBeInViewport({ ratio: 0.9, timeout: 500 });
        await expect(page.locator('#video-gamme')).toBeInViewport({ ratio: 0.3, timeout: 500 });
      }).toPass({ timeout: 10_000 });
      await page.mouse.move(5, 5);
      await expect.poll(async () => (await position(page)).x, { timeout: 5_000 }).toBeGreaterThan(0);
      await expect
        .poll(() => page.evaluate(() => (window as unknown as { __pauses: number }).__pauses))
        .toBeGreaterThan(pauses);
      // Retour en haut : le ruban s'arrête, la vidéo est relancée.
      const lectures = await page.evaluate(() => (window as unknown as { __lectures: number }).__lectures);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect.poll(async () => (await position(page)).auto).toBe(false);
      await expect
        .poll(() => page.evaluate(() => (window as unknown as { __lectures: number }).__lectures))
        .toBeGreaterThan(lectures);
      await context.close();
    });

    test('boucle sans saut : au bout d’une période, la position revient au début de la séquence', async ({ browser }) => {
      const context = await contexte(browser);
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await centrer(page);
      await page.getByRole('button', { name: 'Mettre en pause le défilement' }).click();
      const { periode } = await position(page);
      // Copies identiques : même visuel une période plus loin.
      const memes = await page.locator('#frise-studios').evaluate((el, p) => {
        const imgs = [...el.querySelectorAll('img')];
        const premiere = imgs[0].getBoundingClientRect().left;
        const plusLoin = imgs.find((i) => Math.abs(i.getBoundingClientRect().left - premiere - p) < 1);
        return !!plusLoin && plusLoin.getAttribute('src') === imgs[0].getAttribute('src');
      }, periode);
      expect(memes).toBe(true);
      await page.locator('#frise-studios').evaluate((el, p) => (el.scrollLeft = p - 4), periode);
      await page.getByRole('button', { name: 'Reprendre le défilement' }).click();
      await page.mouse.move(5, 5);
      await expect.poll(async () => { const p = await position(page); return p.auto && p.x < 40; }).toBe(true);
      await context.close();
    });

    test('clavier et boutons : le visiteur prend la main jusqu’à la reprise', async ({ browser }) => {
      const context = await contexte(browser);
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await centrer(page);
      const ruban = page.getByRole('group', { name: /Ruban des studios/ });
      await ruban.focus();
      await page.keyboard.press('ArrowRight');
      await expect(page.getByRole('button', { name: 'Reprendre le défilement' })).toBeVisible();
      // Fin de l'animation native de la flèche (≈ 150 ms) avant la touche suivante.
      await page.waitForTimeout(400);
      await page.keyboard.press('Home');
      await expect.poll(async () => (await position(page)).x).toBe(0);
      await page.keyboard.press('End');
      await expect.poll(async () => { const p = await position(page); return Math.abs(p.x - (p.periode - p.largeur)); }).toBeLessThan(2);
      await page.keyboard.press('Home');
      await page.getByRole('button', { name: 'Studios suivants' }).click();
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(0);
      await page.waitForTimeout(600);
      await ruban.focus();
      await page.keyboard.press('Home');
      await expect.poll(async () => (await position(page)).x).toBe(0);
      // Précédent depuis le début : défilement sans fin, pas de butée.
      await page.getByRole('button', { name: 'Studios précédents' }).click();
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(0);
      await page.waitForTimeout(1000);
      expect((await position(page)).auto).toBe(false);
      await context.close();
    });

    test('mouvement réduit : aucune translation automatique, consultation manuelle possible', async ({ browser }) => {
      const context = await contexte(browser, { reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await centrer(page);
      await expect(page.getByRole('button', { name: /défilement/ })).toHaveCount(0);
      await page.waitForTimeout(2500);
      expect(await position(page)).toMatchObject({ auto: false, x: 0 });
      await page.getByRole('button', { name: 'Studios suivants' }).click();
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(0);
      await context.close();
    });

    test('mobile : défilement continu, glisser au doigt prend la main', async ({ browser, browserName }) => {
      test.skip(browserName !== 'chromium', 'geste tactile simulé par CDP');
      const context = await contexte(browser, { mobile: true });
      const page = await context.newPage();
      await page.goto(URL_PAGE);
      await centrer(page);
      await expect(page.getByRole('button', { name: 'Studios suivants' })).toBeHidden();
      await expect(page.getByRole('button', { name: 'Mettre en pause le défilement' })).toBeVisible();
      await expect.poll(async () => (await position(page)).x, { timeout: 5_000 }).toBeGreaterThan(0);
      const boite = (await page.locator('#frise-studios').boundingBox())!;
      const y = boite.y + boite.height / 2;
      const avant = (await position(page)).x;
      const cdp = await context.newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y }] });
      for (let i = 1; i <= 12; i += 1) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 300 - 15 * i, y }] });
        await page.waitForTimeout(16);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await expect.poll(async () => (await position(page)).x).toBeGreaterThan(avant + 60);
      expect((await position(page)).auto).toBe(false);
      await expect(page.getByRole('button', { name: 'Reprendre le défilement' })).toBeVisible();
      await context.close();
    });
  });

  test.describe('catalogue réel (V5)', () => {
    async function chargee(locator: import('@playwright/test').Locator) {
      await locator.scrollIntoViewIfNeeded();
      await expect.poll(() => locator.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }

    test('couverture K1 réelle dans la carte du formulaire', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(URL_PAGE);
      const couverture = page.locator('#catalogue img[alt^="Couverture du catalogue Orbitvu All-in-One"]');
      await expect(couverture).toBeVisible();
      await chargee(couverture);
      expect((await couverture.boundingBox())!.width).toBeGreaterThanOrEqual(110);
    });

    test('desktop : doubles pages K5, K4 et vignette K6, section compacte, plus aucun emplacement neutre', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(URL_PAGE);
      const section = page.locator('section[aria-labelledby="studio-titre"]');
      // V5.1 : au moins 25 % de moins que les 1 361 px de la V5 à 1440 px.
      expect((await section.boundingBox())!.height).toBeLessThanOrEqual(1020);
      // K6 en vignette : pas plus large que la moitié de la colonne des visuels.
      expect((await section.locator('[data-page-catalogue="K6"]').boundingBox())!.width).toBeLessThan(400);
      for (const id of ['K5', 'K4', 'K6']) {
        const img = section.locator(`[data-page-catalogue="${id}"] img`);
        await expect(img).toBeVisible();
        await chargee(img);
      }
      await expect(section.locator('[data-page-catalogue="K3"]')).toBeHidden();
      await expect(page.locator('[data-emplacement]')).toHaveCount(0);
      await expect(page.locator('main')).not.toContainText('en attente');
      await expect(page.getByText(/téléchargement du\s+PDF non activé/)).toBeVisible();
    });

    test('mobile : pages seules K3 et K2 côte à côte, aucune double page sauf la vignette K6', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(URL_PAGE);
      const section = page.locator('section[aria-labelledby="studio-titre"]');
      for (const id of ['K3', 'K2', 'K6']) {
        const img = section.locator(`[data-page-catalogue="${id}"] img`);
        await expect(img).toBeVisible();
        await chargee(img);
      }
      await expect(section.locator('[data-page-catalogue="K5"]')).toBeHidden();
      await expect(section.locator('[data-page-catalogue="K4"]')).toBeHidden();
      const [k3, k2] = await Promise.all(['K3', 'K2'].map((id) => section.locator(`[data-page-catalogue="${id}"]`).boundingBox()));
      expect(Math.abs(k3!.y - k2!.y)).toBeLessThan(2);
    });

    test('matrice K6 : agrandissement dans une fenêtre modale, fermée par Échap', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(URL_PAGE);
      await page.getByRole('button', { name: /^Agrandir la matrice/ }).click();
      const dialogue = page.getByRole('dialog', { name: /matrice de sélection/ });
      await expect(dialogue).toBeVisible();
      const img = dialogue.locator('img');
      await chargee(img);
      expect((await img.boundingBox())!.width).toBeGreaterThan(2000);
      await page.keyboard.press('Escape');
      await expect(dialogue).toBeHidden();
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

  test('état de la route en lecture seule : sans secrets locaux, indisponible, aucun envoi', async ({ request }) => {
    const res = await request.get('/api/catalogue');
    expect(res.status()).toBe(200);
    expect(res.headers()['cache-control']).toContain('no-store');
    expect(await res.json()).toEqual({ disponible: false });
  });
});
