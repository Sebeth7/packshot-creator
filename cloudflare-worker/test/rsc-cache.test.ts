/**
 * Cache HTML partagé et requêtes de navigation Next.js (P0 du crawl SF du 15/10/2026).
 *
 * Le Worker met en cache le HTML public (`cacheEverything`, 60 s). Une requête
 * RSC ou de préchargement Next.js vise la même URL que la page : si elle passait
 * par ce cache, le flux RSC serait servi aux requêtes HTML, et le HTML aux
 * requêtes RSC (le cache Cloudflare ignore `Vary`). Ces requêtes doivent donc
 * partir vers l'origine sans option `cf` ; le HTML ordinaire garde son cache.
 */
import { describe, it, expect, vi, afterAll, beforeEach } from 'vitest';
import worker from '../src/index.js';

const ENV = { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' };
const CACHE_HTML = {
  cacheTtl: 60,
  cacheEverything: true,
  cacheTtlByStatus: { '200-299': 60, '301-399': 86400, '404': 10, '500-599': 0 },
};

const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('ok', { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }));
afterAll(() => fetchOrigine.mockRestore());
beforeEach(() => fetchOrigine.mockClear());

async function servir(chemin: string, headers: Record<string, string> = {}, method = 'GET') {
  await worker.fetch(new Request(`https://www.packshot-creator.com${chemin}`, { method, headers }), ENV);
  expect(fetchOrigine).toHaveBeenCalledTimes(1);
  const [url, init] = fetchOrigine.mock.calls[0] as [string, RequestInit & { cf?: unknown; headers: Headers }];
  return { url, init };
}

describe('HTML ordinaire : cache partagé inchangé', () => {
  it('GET sans en-tête Next.js', async () => {
    const { url, init } = await servir('/fr/cgu', { accept: 'text/html,application/xhtml+xml' });
    expect(url).toBe('https://sysnext.vercel.app/fr/cgu');
    expect(init.cf).toEqual(CACHE_HTML);
  });

  it('GET sans aucun en-tête', async () => {
    const { init } = await servir('/fr/studio-photo/alphatable');
    expect(init.cf).toEqual(CACHE_HTML);
  });
});

describe('Requêtes de navigation Next.js : hors du cache partagé', () => {
  const cas: Array<[string, Record<string, string>]> = [
    ['RSC: 1', { rsc: '1' }],
    ['Next-Router-Prefetch seul', { 'next-router-prefetch': '1' }],
    ['Next-Router-Segment-Prefetch seul', { 'next-router-segment-prefetch': '/$d$lang/contact/__PAGE__' }],
    ['Next-Router-State-Tree seul', { 'next-router-state-tree': '%5B%22%22%5D' }],
    [
      'préchargement complet (en-têtes relevés par le crawl)',
      {
        accept: '*/*',
        rsc: '1',
        'next-router-prefetch': '1',
        'next-router-segment-prefetch': '/_tree',
        'next-url': '/fr',
      },
    ],
    ['RSC avec Accept text/html', { rsc: '1', accept: 'text/html' }],
    ['casse quelconque', { RSC: '1', 'Next-Router-State-Tree': 'x' }],
  ];

  for (const [nom, headers] of cas) {
    it(nom, async () => {
      const { url, init } = await servir('/fr/contact', headers);
      expect(url).toBe('https://sysnext.vercel.app/fr/contact');
      expect(init.cf).toBeUndefined();
      // Les en-têtes sont transmis à l'origine : Next.js répond toujours le flux RSC.
      for (const [k, v] of Object.entries(headers)) expect(init.headers.get(k)).toBe(v);
    });
  }
});

describe('Exclusions existantes conservées', () => {
  it('API', async () => {
    expect((await servir('/api/contact')).init.cf).toBeUndefined();
  });
  it('ressource _next', async () => {
    expect((await servir('/_next/static/chunks/main.js')).init.cf).toBeUndefined();
  });
  it('URL avec paramètre', async () => {
    expect((await servir('/fr/contact?subject=industrie')).init.cf).toBeUndefined();
  });
  it('POST', async () => {
    expect((await servir('/fr/contact', { 'content-type': 'text/plain' }, 'POST')).init.cf).toBeUndefined();
  });
  it('HEAD', async () => {
    expect((await servir('/fr/contact', {}, 'HEAD')).init.cf).toBeUndefined();
  });
  for (const cookie of ['__vercel_live_token=x', '__next_preview_data=x', 'session=abc', 'token=abc']) {
    it(`cookie sensible ${cookie.split('=')[0]}`, async () => {
      expect((await servir('/fr/contact', { cookie })).init.cf).toBeUndefined();
    });
  }
  it('cookie banal : cache conservé', async () => {
    expect((await servir('/fr/contact', { cookie: 'cookie-consent=accepted' })).init.cf).toEqual(CACHE_HTML);
  });
});
