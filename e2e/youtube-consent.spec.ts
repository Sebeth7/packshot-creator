import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * Vidéos YouTube des articles : façade locale, information avant tout appel,
 * lecteur youtube-nocookie.com après accord (lib/youtube.ts,
 * components/blog/YouTubeConsent.tsx).
 *
 * Les réponses YouTube sont simulées : le test vérifie ce que la page DEMANDE,
 * pas le service de YouTube.
 */

const ARTICLE = '/fr/blog/orbitvu-lautomatisation-au-service-de-la-photographie-3d-360deg';
const TIERS_YOUTUBE = /youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com|ggpht\.com|doubleclick\.net/i;

async function setConsent(context: BrowserContext, baseURL: string, value: Record<string, boolean>) {
  await context.addCookies([
    { name: 'cookie-consent', value: encodeURIComponent(JSON.stringify({ necessary: true, ...value })), url: baseURL },
  ]);
}

/** Enregistre les requêtes YouTube et renvoie une page vide à la place du service. */
async function watchYouTube(page: Page) {
  const requests: string[] = [];
  page.on('request', (r) => { if (TIERS_YOUTUBE.test(r.url())) requests.push(r.url()); });
  await page.route(TIERS_YOUTUBE, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>simulation</title>' }),
  );
  return requests;
}

async function openArticle(page: Page) {
  await page.goto(ARTICLE);
  await page.waitForLoadState('load');
  // Hydratation : l'activateur pose role="button" sur les façades.
  await expect(page.locator('a.pkc-yt__facade').first()).toHaveAttribute('role', 'button');
}

test.describe('Vidéos YouTube — consentement', () => {
  test('nouvelle visite : façades locales, aucune requête YouTube', async ({ page, context }) => {
    await context.clearCookies();
    const yt = await watchYouTube(page);
    await openArticle(page);
    await page.waitForTimeout(1500);

    const facades = page.locator('a.pkc-yt__facade');
    expect(await facades.count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
    for (const href of await facades.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}(&t=\d+s)?$/);
    }
    // Boîte 16:9, pas de 300 × 150
    const box = await facades.first().boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs(box!.width / box!.height - 16 / 9)).toBeLessThan(0.02);
    expect(yt).toEqual([]);
  });

  test('clic sans consentement : information d\'abord, Annuler ne charge rien', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: false, externalMedia: false });
    const yt = await watchYouTube(page);
    await openArticle(page);

    const facade = page.locator('a.pkc-yt__facade').first();
    await facade.click();
    const dialog = page.getByRole('dialog', { name: 'Lire une vidéo YouTube' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Autoriser et lire la vidéo' })).toBeVisible();
    await expect(dialog.getByRole('link', { name: /Ouvrir la vidéo sur YouTube/ })).toHaveAttribute('target', '_blank');
    await expect(dialog.getByRole('link', { name: /Règles de confidentialité de Google/ })).toHaveAttribute(
      'href',
      'https://policies.google.com/privacy',
    );
    expect(yt).toEqual([]);

    await dialog.getByRole('button', { name: 'Annuler' }).click();
    await expect(dialog).toBeHidden();
    await expect(facade).toBeFocused();
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
    await page.waitForTimeout(1000);
    expect(yt).toEqual([]);
  });

  test('Échap et croix ferment sans appel tiers', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: true, externalMedia: false });
    const yt = await watchYouTube(page);
    await openArticle(page);
    const dialog = page.getByRole('dialog');

    await page.locator('a.pkc-yt__facade').first().click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    await page.locator('a.pkc-yt__facade').first().click();
    await dialog.getByRole('button', { name: 'Fermer' }).click();
    await expect(dialog).toBeHidden();

    await page.waitForTimeout(1000);
    expect(yt).toEqual([]);
  });

  test('Autoriser et lire : lecteur youtube-nocookie, départ, rel=0, sans mémoriser l\'accord', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: false, externalMedia: false });
    const yt = await watchYouTube(page);
    await openArticle(page);

    const facade = page.locator('a.pkc-yt__facade[data-yt-start]').first();
    const id = await facade.getAttribute('data-yt-id');
    const start = await facade.getAttribute('data-yt-start');
    const title = await facade.getAttribute('data-yt-title');
    await facade.click();
    await page.getByRole('button', { name: 'Autoriser et lire la vidéo' }).click();

    const player = page.locator('iframe.pkc-yt__player');
    await expect(player).toHaveCount(1);
    await expect(player).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&start=${start}`);
    await expect(player).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    await expect(player).toHaveAttribute('allowfullscreen', '');
    await expect(player).toHaveAttribute('title', title!);
    expect((await player.getAttribute('allow')) ?? '').toContain('autoplay');
    expect(yt.length).toBeGreaterThan(0);
    expect(yt.every((u) => u.startsWith('https://www.youtube-nocookie.com/'))).toBe(true);

    // Accord ponctuel : la préférence enregistrée n'est pas modifiée
    const c = (await context.cookies()).find((x) => x.name === 'cookie-consent');
    expect(JSON.parse(decodeURIComponent(c!.value)).externalMedia).toBe(false);
    // Les autres vidéos restent des façades
    expect(await page.locator('a.pkc-yt__facade').count()).toBeGreaterThanOrEqual(2);
  });

  test('contenus externes acceptés : rien sans clic, lecteur direct au clic', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: false, externalMedia: true });
    const yt = await watchYouTube(page);
    await openArticle(page);
    await page.waitForTimeout(1500);
    expect(yt).toEqual([]);
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);

    await page.locator('a.pkc-yt__facade').first().click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('iframe.pkc-yt__player')).toHaveCount(1);
    await expect(page.locator('iframe.pkc-yt__player')).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
  });

  test('retrait de la catégorie : lecteur retiré, façade remise', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: false, externalMedia: true });
    await watchYouTube(page);
    await openArticle(page);
    const before = await page.locator('a.pkc-yt__facade').count();
    await page.locator('a.pkc-yt__facade').first().click();
    await expect(page.locator('iframe.pkc-yt__player')).toHaveCount(1);

    await page.evaluate(() => window.dispatchEvent(new Event('open-cookie-banner')));
    await page.getByRole('button', { name: /Tout refuser/ }).click();
    await expect(page.locator('iframe.pkc-yt__player')).toHaveCount(0);
    await expect(page.locator('a.pkc-yt__facade')).toHaveCount(before);
  });

  test('clavier : Espace et Entrée ouvrent l\'information, Espace ne fait pas défiler', async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, { analytics: false, externalMedia: false });
    const yt = await watchYouTube(page);
    await openArticle(page);
    const facade = page.locator('a.pkc-yt__facade').first();
    const dialog = page.getByRole('dialog');

    await facade.scrollIntoViewIfNeeded();
    await facade.focus();
    const y = await page.evaluate(() => window.scrollY);
    await page.keyboard.press('Space');
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(y);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(facade).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    expect(yt).toEqual([]);
  });

  test('sans JavaScript : la façade reste un lien vers YouTube, aucune ressource YouTube', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    const yt = await watchYouTube(page);
    await page.goto(ARTICLE);
    await page.waitForLoadState('load');
    const facade = page.locator('a.pkc-yt__facade').first();
    await expect(facade).toHaveAttribute('href', /^https:\/\/www\.youtube\.com\/watch\?v=/);
    await expect(facade).toHaveAttribute('target', '_blank');
    await expect(facade).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
    expect(yt).toEqual([]);
    await context.close();
  });
});
