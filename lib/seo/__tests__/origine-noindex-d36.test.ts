/**
 * D36 — `X-Robots-Tag: noindex` sur l'origine `sysnext.vercel.app` seulement.
 *
 * La règle vit dans `headers()` de next.config.ts. Ce test l'évalue comme le
 * fait Next : l'expression régulière du chemin est compilée par
 * `buildCustomRoute` (celle du routes-manifest), les conditions `has` et
 * `missing` par `matchHas`.
 *
 * Le piège couvert : le Worker Cloudflare relaie `www` vers
 * `https://sysnext.vercel.app` (NEXTJS_ORIGIN). L'application voit donc le même
 * hôte pour les deux publics ; seuls les en-têtes Cloudflare les distinguent.
 * Une règle fondée sur l'hôte seul désindexerait `www`.
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import { createRequire } from 'node:module';
import nextConfig from '@/next.config';
import worker from '@/cloudflare-worker/src/index.js';

const require = createRequire(import.meta.url);
const { buildCustomRoute } = require('next/dist/lib/build-custom-route');
const { matchHas } = require('next/dist/shared/lib/router/utils/prepare-destination');

type Regle = {
  source: string;
  has?: unknown[];
  missing?: unknown[];
  headers: { key: string; value: string }[];
};

const regles = (await nextConfig.headers!()) as Regle[];
const compilees = regles.map((r) => ({ ...r, re: new RegExp(buildCustomRoute('header', r).regex) }));

/** En-têtes de réponse ajoutés par next.config pour une requête donnée. */
function entetesAjoutes(chemin: string, requete: Record<string, string>) {
  const ajoutes: Record<string, string> = {};
  for (const r of compilees) {
    if (!r.re.test(chemin)) continue;
    if (!matchHas({ headers: requete }, {}, r.has, r.missing)) continue;
    for (const h of r.headers) ajoutes[h.key.toLowerCase()] = h.value;
  }
  return ajoutes;
}
const xRobots = (chemin: string, requete: Record<string, string>) =>
  entetesAjoutes(chemin, requete)['x-robots-tag'];

// Ce que Cloudflare et le Worker transmettent à l'origine pour une requête www.
const RELAI_WORKER = {
  'cf-worker': 'packshot-creator.com',
  'cf-ray': 'a4343b3bab7b8970-IAD',
  'cf-connecting-ip': '203.0.113.7',
};

const ORIGINE = { host: 'sysnext.vercel.app' };

// Routes HTML indexables sur www, dans les trois locales.
const PAGES = [
  '/fr',
  '/en',
  '/de-ch',
  '/fr/contact',
  '/de-ch/kontakt',
  '/fr/packshot-mode',
  '/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste',
  '/en/blog',
  '/de-ch/branchen/schmuck',
];

describe('D36 — la règle', () => {
  it('est la seule règle headers() de next.config', () => {
    expect(regles).toHaveLength(1);
  });

  it('pose exactement X-Robots-Tag: noindex, rien d\'autre', () => {
    expect(regles[0].headers).toEqual([{ key: 'X-Robots-Tag', value: 'noindex' }]);
  });
});

describe('D36 — origine sysnext.vercel.app, requête directe', () => {
  for (const page of PAGES) {
    it(`${page} → noindex`, () => {
      expect(xRobots(page, ORIGINE)).toBe('noindex');
    });
  }

  it('racine / (307 vers /fr) → noindex, sans effet sur la redirection', () => {
    expect(xRobots('/', ORIGINE)).toBe('noindex');
  });

  it('pages autonomes hors locale (/calculateur-roi, /etude-clients-2026) → noindex', () => {
    expect(xRobots('/calculateur-roi', ORIGINE)).toBe('noindex');
    expect(xRobots('/etude-clients-2026', ORIGINE)).toBe('noindex');
  });

  it('hôte en majuscules et avec port : même hôte', () => {
    expect(xRobots('/fr', { host: 'SYSNEXT.VERCEL.APP:443' })).toBe('noindex');
  });
});

describe('D36 — www.packshot-creator.com : aucun noindex ajouté', () => {
  for (const page of PAGES) {
    it(`${page} relayée par le Worker (hôte vu : sysnext.vercel.app) → rien`, () => {
      expect(xRobots(page, { ...ORIGINE, ...RELAI_WORKER })).toBeUndefined();
    });
  }

  it.each(Object.entries(RELAI_WORKER))('un seul marqueur Cloudflare suffit : %s', (cle, valeur) => {
    expect(xRobots('/fr', { ...ORIGINE, [cle]: valeur })).toBeUndefined();
  });

  it('hôte www.packshot-creator.com, avec ou sans marqueurs → rien', () => {
    expect(xRobots('/fr', { host: 'www.packshot-creator.com' })).toBeUndefined();
    expect(xRobots('/fr', { host: 'www.packshot-creator.com', ...RELAI_WORKER })).toBeUndefined();
  });
});

describe('D36 — autres hôtes : comportement inchangé', () => {
  it.each([
    ['localhost:3000'],
    ['127.0.0.1:3000'],
    ['sysnext-git-main-sebs-projects-ca1e93a7.vercel.app'],
    ['sysnext-sebs-projects-ca1e93a7.vercel.app'],
    ['sysnext.vercel.app.example.com'],
    ['xsysnext.vercel.app'],
  ])('%s → rien', (host) => {
    expect(xRobots('/fr', { host })).toBeUndefined();
  });
});

describe('D36 — portée : documents HTML seulement', () => {
  it.each([
    ['/robots.txt'],
    ['/sitemap.xml'],
    ['/llms.txt'],
    ['/favicon.ico'],
    ['/images/backgrounds/background-cta-soft.webp'],
    ['/_next/static/chunks/0ee850a3fcaa46fc.js'],
    ['/_next/static/chunks/2bc9857df1452a22.css'],
    ['/_next/static/media/013cdec7b2705c72-s.p.fa9836b9.woff2'],
    ['/_next/image'],
    ['/_vercel/speed-insights/vitals'],
    ['/api/contact'],
    ['/api/og'],
  ])('%s sur l\'origine → rien', (chemin) => {
    expect(xRobots(chemin, ORIGINE)).toBeUndefined();
  });
});

describe('D36 — chaîne réelle www → Worker du dépôt → origine', () => {
  const fetchOrigine = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => new Response('origine', { status: 200 }));
  afterAll(() => fetchOrigine.mockRestore());

  it('le Worker relaie vers sysnext.vercel.app en recopiant cf-ray et cf-connecting-ip', async () => {
    fetchOrigine.mockClear();
    await worker.fetch(
      new Request('https://www.packshot-creator.com/fr/contact', {
        headers: { 'cf-ray': RELAI_WORKER['cf-ray'], 'cf-connecting-ip': RELAI_WORKER['cf-connecting-ip'] },
      }),
      { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' },
    );
    expect(fetchOrigine).toHaveBeenCalledTimes(1);
    const [cible, init] = fetchOrigine.mock.calls[0] as [string, RequestInit];
    const url = new URL(cible);
    expect(url.host).toBe('sysnext.vercel.app');

    // La requête telle que l'origine la reçoit. L'hôte est celui de l'URL
    // cible ; CF-Worker, ajouté par le runtime Cloudflare, n'existe pas ici :
    // le test ne s'appuie que sur ce que le code du Worker transmet.
    const recue = Object.fromEntries(new Headers(init.headers).entries());
    recue.host = url.host;
    expect(xRobots(url.pathname, recue)).toBeUndefined();
    // Sans les en-têtes Cloudflare, la même requête recevrait le noindex.
    expect(xRobots(url.pathname, { host: url.host })).toBe('noindex');
  });

  it('le Worker renvoie tel quel un X-Robots-Tag de l\'origine : la garde est à l\'origine', async () => {
    fetchOrigine.mockImplementationOnce(
      async () => new Response('origine', { status: 200, headers: { 'x-robots-tag': 'noindex' } }),
    );
    const r = await worker.fetch(new Request('https://www.packshot-creator.com/fr'), {
      NEXTJS_ORIGIN: 'https://sysnext.vercel.app',
    });
    expect(r.headers.get('x-robots-tag')).toBe('noindex');
  });
});
