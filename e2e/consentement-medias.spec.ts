import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * Contenus externes des articles (Vimeo, Sketchfab, saasphoto.com) : façade
 * locale, information avant tout appel, iframe créée après accord explicite,
 * pour ce contenu seulement (lib/external-embeds.ts,
 * components/blog/YouTubeConsent.tsx). Bandeau cookies : focus et zone visible
 * (components/cookies/CookieBanner.tsx).
 *
 * Mesure du 08/10/2026 sur le build de `main` : chaque service était contacté
 * avant tout choix, après un refus et après une révocation. Les réponses des
 * services sont simulées : le test vérifie ce que la page DEMANDE.
 */

const CAS = [
  {
    service: 'Vimeo',
    article: '/fr/blog/optimiser-collaboration-equipe-success-story-shotflow',
    hote: /^https:\/\/player\.vimeo\.com\//,
    src: 'https://player.vimeo.com/video/842561038',
  },
  {
    service: 'Sketchfab',
    article: '/fr/blog/de-la-photographie-2d-aux-modeles-3d-de-vos-produits-introduction-a-la-photogrammetrie',
    hote: /^https:\/\/sketchfab\.com\//,
    src: 'https://sketchfab.com/models/e730252850194eccb75fa3a11a24e8dc/embed',
  },
  {
    service: 'saasphoto.com',
    article: '/fr/blog/photographie-de-produits-a-360-degres-en-interne',
    hote: /^https:\/\/saasphoto\.com\//,
    src: 'https://saasphoto.com/share/05HGU6/demo/Components/Drill_360/Drill_360.html',
  },
] as const;

const TIERS = /^https:\/\/(?:[a-z0-9-]+\.)*(?:vimeo\.com|vimeocdn\.com|sketchfab\.com|saasphoto\.com)\//i;
const REFUS = { analytics: false, externalMedia: false };
const TOUT = { analytics: true, externalMedia: true };

async function setConsent(context: BrowserContext, baseURL: string, value: Record<string, boolean>) {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true, ...value })), url: baseURL },
  ]);
}

/** Enregistre les requêtes vers les services et renvoie une page vide à leur place. */
async function watchServices(page: Page) {
  const requests: string[] = [];
  page.on('request', (r) => { if (TIERS.test(r.url())) requests.push(r.url()); });
  await page.route(TIERS, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>simulation</title>' }),
  );
  // Mesure d'audience (scénario « tout accepter ») : aucune requête réelle vers Google.
  await page.route(/googletagmanager\.com|google-analytics\.com/i, (route) => route.abort());
  return requests;
}

async function openArticle(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('load');
  // Hydratation : l'activateur pose role="button" sur les façades.
  await expect(page.locator('a.pkc-embed__facade').first()).toHaveAttribute('role', 'button');
  // Défilement jusqu'en bas : une iframe en chargement différé serait demandée ici.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
  });
  await page.waitForTimeout(500);
}

const facadeOf = (page: Page, src: string) => page.locator(`a.pkc-embed__facade[data-embed-src="${src}"]`);

for (const cas of CAS) {
  test.describe(`Contenu ${cas.service} — consentement`, () => {
    for (const [etat, choix] of [['aucun choix', null], ['refus', REFUS], ['tout accepter', TOUT]] as const) {
      test(`${etat} : façade locale, aucune iframe, aucune requête`, async ({ page, context, baseURL }) => {
        await context.clearCookies();
        if (choix) await setConsent(context, baseURL!, choix);
        const tiers = await watchServices(page);
        await openArticle(page, cas.article);

        const facade = facadeOf(page, cas.src);
        await expect(facade).toHaveCount(1);
        await expect(facade).toHaveAttribute('href', cas.src);
        await expect(page.locator('iframe')).toHaveCount(0);
        // Boîte 16:9 réservée dès le rendu (et non plus 300 × 150).
        const box = await facade.boundingBox();
        expect(box).not.toBeNull();
        expect(Math.abs(box!.width / box!.height - 16 / 9)).toBeLessThan(0.02);
        expect(tiers.filter((u) => cas.hote.test(u))).toEqual([]);
      });
    }

    test('clic : information d\'abord ; Annuler ne charge rien et rend le focus', async ({ page, context, baseURL }) => {
      // Même avec la catégorie « Vidéos YouTube » acceptée : elle ne couvre pas ce service.
      await setConsent(context, baseURL!, TOUT);
      const tiers = await watchServices(page);
      await openArticle(page, cas.article);

      const facade = facadeOf(page, cas.src);
      await facade.click();
      const dialog = page.getByRole('dialog', { name: `Afficher un contenu ${cas.service}` });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('link', { name: `Ouvrir le contenu sur ${cas.service} (nouvel onglet)` })).toHaveAttribute('href', cas.src);
      await expect(dialog.getByText("Cet accord vaut pour ce contenu uniquement, sur cette page. Il n'est pas mémorisé.")).toBeVisible();
      expect(tiers).toEqual([]);

      await dialog.getByRole('button', { name: 'Annuler' }).click();
      await expect(dialog).toBeHidden();
      await expect(facade).toBeFocused();
      await page.waitForTimeout(500);
      expect(tiers).toEqual([]);
      await expect(page.locator(`iframe[src="${cas.src}"]`)).toHaveCount(0);
    });

    test('clavier : Entrée et Espace ouvrent l\'information, Échap la ferme ; accord : iframe pour ce contenu seulement', async ({ page, context, baseURL }) => {
      await setConsent(context, baseURL!, REFUS);
      const tiers = await watchServices(page);
      await openArticle(page, cas.article);

      const facade = facadeOf(page, cas.src);
      const dialog = page.getByRole('dialog', { name: `Afficher un contenu ${cas.service}` });
      await facade.focus();
      await page.keyboard.press('Enter');
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(facade).toBeFocused();
      await page.keyboard.press(' ');
      await expect(dialog).toBeVisible();
      expect(tiers).toEqual([]);

      await dialog.getByRole('button', { name: 'Autoriser et afficher le contenu' }).click();
      const iframe = page.locator(`iframe.pkc-yt__player[src="${cas.src}"]`);
      await expect(iframe).toHaveCount(1);
      await expect(iframe).toBeFocused();
      expect(await iframe.getAttribute('title')).toBeTruthy();
      await expect.poll(() => tiers.filter((u) => cas.hote.test(u)).length).toBeGreaterThan(0);
      // Rien n'est mémorisé : le cookie de consentement est inchangé.
      const cookie = (await context.cookies()).find((c) => c.name === 'cookie-consent');
      expect(JSON.parse(decodeURIComponent(cookie!.value))).toMatchObject(REFUS);

      // Rechargement : façade de nouveau, aucune requête.
      tiers.length = 0;
      await page.reload();
      await openArticle(page, cas.article);
      await expect(page.locator(`iframe[src="${cas.src}"]`)).toHaveCount(0);
      await expect(facadeOf(page, cas.src)).toHaveCount(1);
      expect(tiers).toEqual([]);
    });
  });
}

test.describe('Contenus externes — révocation et navigation', () => {
  test('choix enregistré sans contenus externes : iframe retirée, façade remise, aucune requête ensuite', async ({ page, context, baseURL }) => {
    const cas = CAS[0];
    await setConsent(context, baseURL!, TOUT);
    const tiers = await watchServices(page);
    await openArticle(page, cas.article);

    await facadeOf(page, cas.src).click();
    await page.getByRole('button', { name: 'Autoriser et afficher le contenu' }).click();
    await expect(page.locator(`iframe[src="${cas.src}"]`)).toHaveCount(1);

    // Gestionnaire de cookies : « Vidéos YouTube » décochée, enregistrement.
    await page.evaluate(() => window.dispatchEvent(new Event('open-cookie-banner')));
    await page.locator('label', { hasText: 'Vidéos YouTube' }).locator('input[type="checkbox"]').uncheck();
    await page.getByRole('button', { name: /Enregistrer mes choix/ }).click();
    await expect(page.locator(`iframe[src="${cas.src}"]`)).toHaveCount(0);
    await expect(facadeOf(page, cas.src)).toHaveCount(1);

    tiers.length = 0;
    await page.waitForTimeout(500);
    expect(tiers).toEqual([]);
  });

  test('navigation interne vers un article : façade, aucune requête', async ({ page, context, baseURL }) => {
    const cas = CAS[0];
    await setConsent(context, baseURL!, REFUS);
    const tiers = await watchServices(page);
    await page.goto('/fr/blog');
    await page.waitForLoadState('load');
    // Navigation côté client, sans rechargement du document.
    await page.evaluate((url) => (window as unknown as { next: { router: { push: (u: string) => void } } }).next.router.push(url), cas.article);
    await page.waitForURL(`**${cas.article}`);
    await expect(facadeOf(page, cas.src)).toHaveAttribute('role', 'button');
    await page.waitForTimeout(500);
    await expect(page.locator(`iframe[src="${cas.src}"]`)).toHaveCount(0);
    expect(tiers).toEqual([]);
  });
});

test.describe('Bandeau cookies — focus et zone visible', () => {
  test('rouvert depuis le pied de page au clavier : focus dans le bandeau, puis rendu au lien', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, REFUS);
    await page.goto('/fr/contact');
    await page.waitForLoadState('load');
    const trigger = page.locator('footer').getByRole('button', { name: 'Gérer les cookies' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const banner = page.getByRole('region', { name: 'Gestion des cookies' });
    await expect(banner).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(banner.getByRole('button', { name: 'Fermer' })).toBeFocused();
    await banner.getByRole('button', { name: 'Enregistrer mes choix' }).focus();
    await page.keyboard.press('Enter');
    await expect(banner).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('« gérer mes préférences » d\'une vidéo YouTube : focus dans le bandeau, puis rendu à la façade', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, REFUS);
    await watchServices(page);
    await page.route(/youtube\.com|youtube-nocookie\.com|ytimg\.com/i, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '' }));
    await page.goto('/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste');
    await page.waitForLoadState('load');
    const facade = page.locator('a.pkc-yt__facade[data-yt-id]').first();
    await expect(facade).toHaveAttribute('role', 'button');
    await facade.focus();
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'gérer mes préférences' }).click();
    const banner = page.getByRole('region', { name: 'Gestion des cookies' });
    await expect(banner).toBeFocused();
    await banner.getByRole('button', { name: 'Enregistrer mes choix' }).click();
    await expect(banner).toBeHidden();
    await expect(facade).toBeFocused();
  });

  test('chaque bouton du bandeau est dans la zone visible et cliquable (/fr, /fr/contact)', async ({ page, context }) => {
    await context.clearCookies();
    for (const path of ['/fr', '/fr/contact']) {
      await page.goto(path);
      await page.waitForLoadState('load');
      const banner = page.getByRole('region', { name: 'Gestion des cookies' });
      await expect(banner).toBeVisible();
      // Le recalage suit la zone visible à la frame suivante.
      await page.waitForTimeout(300);
      const horsZone = await banner.evaluate((el) => {
        const vv = window.visualViewport!;
        return [...el.querySelectorAll('button')]
          .map((b) => ({ b, r: b.getBoundingClientRect() }))
          .filter(({ r }) => r.left < vv.offsetLeft - 1 || r.top < vv.offsetTop - 1
            || r.right > vv.offsetLeft + vv.width + 1 || r.bottom > vv.offsetTop + vv.height + 1)
          .map(({ b }) => b.getAttribute('aria-label') || b.textContent?.trim());
      });
      expect(horsZone, path).toEqual([]);
      // Clic réel au centre du bouton : aucun autre bouton ne l'intercepte.
      await banner.getByRole('button', { name: /Personnaliser/ }).click({ timeout: 5000 });
      await expect(banner.getByText('Cookies analytiques', { exact: true })).toBeVisible();
      await context.clearCookies();
    }
  });
});
