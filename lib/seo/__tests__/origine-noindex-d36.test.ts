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
 * hôte pour les deux publics. Une règle fondée sur l'hôte seul désindexerait
 * `www`.
 *
 * Deux protections, testées séparément puis ensemble :
 * 1. la règle est écartée si la requête porte un en-tête Cloudflare ;
 * 2. la règle pose un marqueur, et le Worker retire l'en-tête sur `www` quand il
 *    le voit. Le pire cas (Vercel ne transmet aucun en-tête Cloudflare) est
 *    rejoué de bout en bout : `www` ne doit toujours rien recevoir.
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
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

  it('pose X-Robots-Tag: noindex et le marqueur D36, rien d\'autre', () => {
    expect(regles[0].headers).toEqual([
      { key: 'X-Robots-Tag', value: 'noindex' },
      { key: 'X-Packshot-Origin-Noindex', value: '1' },
    ]);
  });

  it('marqueur toujours posé avec le noindex, jamais seul', () => {
    for (const page of [...PAGES, '/robots.txt', '/api/og']) {
      for (const requete of [ORIGINE, { ...ORIGINE, ...RELAI_WORKER }, { host: 'www.packshot-creator.com' }]) {
        const a = entetesAjoutes(page, requete);
        expect(a['x-packshot-origin-noindex'] === '1').toBe(a['x-robots-tag'] === 'noindex');
      }
    }
  });
});

describe('D36 — seule source de X-Robots-Tag dans l\'application', () => {
  // Le Worker retire tout X-Robots-Tag d'une réponse marquée. Si une autre
  // source en posait un sur la même réponse, il serait retiré avec : ce test
  // oblige à revoir le retrait avant d'en ajouter une.
  const RACINE = path.resolve(import.meta.dirname, '..', '..', '..');
  const fichiers = (dossier: string): string[] =>
    readdirSync(path.join(RACINE, dossier), { recursive: true, withFileTypes: true })
      .filter((e) => e.isFile() && /\.(ts|tsx|js|mjs)$/.test(e.name) && !(e.parentPath ?? '').includes('__tests__'))
      .map((e) => path.join(e.parentPath ?? '', e.name));

  it('aucune mention de X-Robots-Tag dans app, components, lib, i18n, middleware', () => {
    const sources = [...fichiers('app'), ...fichiers('components'), ...fichiers('lib'), ...fichiers('i18n'),
      path.join(RACINE, 'middleware.ts')];
    const trouves = sources.filter((f) => /x-robots-tag/i.test(readFileSync(f, 'utf-8')));
    expect(trouves).toEqual([]);
  });

  it('dans next.config, X-Robots-Tag n\'apparaît que dans la règle D36', () => {
    const avecXRobots = regles.filter((r) => r.headers.some((h) => /^x-robots-tag$/i.test(h.key)));
    expect(avecXRobots).toHaveLength(1);
    expect(avecXRobots[0].headers.map((h) => h.key.toLowerCase())).toContain('x-packshot-origin-noindex');
  });
});

describe('D36 — origine sysnext.vercel.app, requête directe', () => {
  for (const page of PAGES) {
    it(`${page} → noindex et marqueur`, () => {
      expect(xRobots(page, ORIGINE)).toBe('noindex');
      expect(entetesAjoutes(page, ORIGINE)['x-packshot-origin-noindex']).toBe('1');
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

describe('D36 — chaîne complète www → Worker du dépôt → origine', () => {
  // L'origine simulée applique la règle de next.config à la requête que le
  // Worker lui envoie. `transmis` décide de ce que Vercel laisse arriver jusqu'à
  // son routage : tous les en-têtes, ou aucun en-tête Cloudflare (pire cas).
  let transmis: 'tous' | 'sans-cloudflare' = 'tous';
  const fetchOrigine = vi.spyOn(globalThis, 'fetch').mockImplementation(async (cible, init) => {
    const url = new URL(String(cible));
    const recue: Record<string, string> = Object.fromEntries(new Headers((init as RequestInit)?.headers).entries());
    if (transmis === 'sans-cloudflare') for (const cle of Object.keys(recue)) if (cle.startsWith('cf-')) delete recue[cle];
    recue.host = url.host;
    const html = '<html><head><meta name="robots" content="noindex, follow"/>' +
      `<link rel="canonical" href="https://www.packshot-creator.com${url.pathname}"/></head></html>`;
    return new Response(html, { status: 200, headers: { 'content-type': 'text/html', ...entetesAjoutes(url.pathname, recue) } });
  });
  afterAll(() => fetchOrigine.mockRestore());

  const www = (chemin: string) =>
    worker.fetch(
      new Request(`https://www.packshot-creator.com${chemin}`, {
        headers: { 'cf-ray': RELAI_WORKER['cf-ray'], 'cf-connecting-ip': RELAI_WORKER['cf-connecting-ip'] },
      }),
      { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' },
    );

  for (const cas of ['tous', 'sans-cloudflare'] as const) {
    for (const page of PAGES) {
      it(`${page} sur www, en-têtes Cloudflare ${cas === 'tous' ? 'transmis' : 'retirés par Vercel'} → ni noindex ni marqueur`, async () => {
        transmis = cas;
        fetchOrigine.mockClear();
        const r = await www(page);
        expect(fetchOrigine).toHaveBeenCalledTimes(1);
        expect(new URL(String(fetchOrigine.mock.calls[0][0])).host).toBe('sysnext.vercel.app');
        expect(r.headers.get('x-robots-tag')).toBeNull();
        expect(r.headers.get('x-packshot-origin-noindex')).toBeNull();
        const html = await r.text();
        expect(html).toContain('<meta name="robots" content="noindex, follow"/>');
        expect(html).toContain(`<link rel="canonical" href="https://www.packshot-creator.com${page}"/>`);
      });
    }
  }

  it('pire cas : sans le retrait du Worker, www aurait reçu le noindex', async () => {
    transmis = 'sans-cloudflare';
    const brute = await fetch('https://sysnext.vercel.app/fr', { headers: RELAI_WORKER });
    expect(brute.headers.get('x-robots-tag')).toBe('noindex');
    expect(brute.headers.get('x-packshot-origin-noindex')).toBe('1');
  });
});
