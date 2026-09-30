/**
 * D36 — le Worker retire, sur www, le noindex que l'origine pose en accès direct.
 *
 * L'origine `sysnext.vercel.app` pose `X-Robots-Tag: noindex` sur son HTML,
 * avec le marqueur `X-Packshot-Origin-Noindex` (next.config.ts). Le Worker
 * relaie www vers cette même origine : si la réponse porte le marqueur, il
 * retire l'en-tête et le marqueur avant de répondre. Ce retrait ne dépend
 * d'aucun en-tête de requête transmis (ou non) par Vercel.
 *
 * Ce qui ne doit pas bouger : un X-Robots-Tag sans marqueur, les 410 du Worker
 * (qui portent le leur), le corps (balise robots, canonical), le statut, la
 * redirection, les autres en-têtes, les hosts en passage direct.
 */
import { describe, it, expect, vi, afterAll, beforeEach } from 'vitest';
import worker from '../src/index.js';

const ENV = { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' };
const D36 = { 'x-robots-tag': 'noindex', 'x-packshot-origin-noindex': '1' };

const HTML =
  '<html><head><meta name="robots" content="noindex, follow"/>' +
  '<link rel="canonical" href="https://www.packshot-creator.com/fr/outil-financement"/></head><body>ok</body></html>';

let reponseOrigine: () => Response = () => new Response('origine');
const fetchOrigine = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => reponseOrigine());
afterAll(() => fetchOrigine.mockRestore());
beforeEach(() => fetchOrigine.mockClear());

async function servir(chemin: string, origine: () => Response, host = 'www.packshot-creator.com') {
  reponseOrigine = origine;
  return worker.fetch(new Request(`https://${host}${chemin}`), ENV);
}

describe('D36 — réponse de l\'origine marquée : noindex retiré sur www', () => {
  it('HTML : X-Robots-Tag et marqueur retirés, le reste intact', async () => {
    const r = await servir('/fr/contact', () =>
      new Response(HTML, {
        status: 200,
        headers: { ...D36, 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0', 'x-vercel-cache': 'HIT' },
      }),
    );
    expect(r.status).toBe(200);
    expect(r.headers.get('x-robots-tag')).toBeNull();
    expect(r.headers.get('x-packshot-origin-noindex')).toBeNull();
    expect(r.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(r.headers.get('cache-control')).toBe('public, max-age=0');
    expect(r.headers.get('x-vercel-cache')).toBe('HIT');
    expect(r.headers.get('x-served-by')).toBe('nextjs');
    expect(fetchOrigine).toHaveBeenCalledTimes(1);
  });

  it('corps inchangé : balise robots et canonical conservées', async () => {
    const r = await servir('/fr/outil-financement', () =>
      new Response(HTML, { headers: { ...D36, 'content-type': 'text/html' } }),
    );
    expect(await r.text()).toBe(HTML);
  });

  it('redirection marquée : Location et statut conservés, noindex retiré', async () => {
    const r = await servir('/fr/packshot-bijoux', () =>
      new Response(null, { status: 308, headers: { ...D36, location: '/fr/industrie/bijoux-joaillerie' } }),
    );
    expect(r.status).toBe(308);
    expect(r.headers.get('location')).toBe('/fr/industrie/bijoux-joaillerie');
    expect(r.headers.get('x-robots-tag')).toBeNull();
    expect(r.headers.get('x-packshot-origin-noindex')).toBeNull();
  });

  it('réécriture du Link hreflang toujours appliquée', async () => {
    const r = await servir('/fr', () =>
      new Response(HTML, {
        headers: { ...D36, link: '<https://sysnext.vercel.app/en>; rel="alternate"; hreflang="en"' },
      }),
    );
    expect(r.headers.get('link')).toBe('<https://www.packshot-creator.com/en>; rel="alternate"; hreflang="en"');
    expect(r.headers.get('x-robots-tag')).toBeNull();
  });

  it('nom du marqueur insensible à la casse', async () => {
    const r = await servir('/fr', () =>
      new Response(HTML, { headers: { 'X-Robots-Tag': 'noindex', 'X-Packshot-Origin-Noindex': '1' } }),
    );
    expect(r.headers.get('x-robots-tag')).toBeNull();
  });
});

describe('D36 — sans marqueur, rien n\'est retiré', () => {
  it('X-Robots-Tag légitime sans marqueur : conservé tel quel', async () => {
    const r = await servir('/fr/document', () =>
      new Response('pdf', { headers: { 'x-robots-tag': 'noindex, nofollow', 'content-type': 'application/pdf' } }),
    );
    expect(r.headers.get('x-robots-tag')).toBe('noindex, nofollow');
  });

  it('HTML sans en-tête (état actuel de l\'origine) : aucun en-tête ajouté, corps identique', async () => {
    const r = await servir('/fr/outil-financement', () => new Response(HTML, { headers: { 'content-type': 'text/html' } }));
    expect(r.headers.get('x-robots-tag')).toBeNull();
    expect(await r.text()).toBe(HTML);
  });

  it.each([
    ['/robots.txt', 'text/plain'],
    ['/llms.txt', 'text/plain'],
    ['/sitemap.xml', 'application/xml'],
    ['/_next/static/chunks/580572fb638b2896.js', 'application/javascript'],
    ['/images/backgrounds/background-cta-soft.webp', 'image/webp'],
    ['/api/og', 'image/png'],
  ])('%s : en-têtes de l\'origine transmis tels quels', async (chemin, type) => {
    const r = await servir(chemin, () => new Response('x', { headers: { 'content-type': type, etag: '"abc"' } }));
    expect(r.headers.get('content-type')).toBe(type);
    expect(r.headers.get('etag')).toBe('"abc"');
    expect(r.headers.get('x-robots-tag')).toBeNull();
  });
});

describe('D36 — redirections : inchangées', () => {
  it('redirection de l\'origine sans marqueur : statut, Location et en-têtes transmis tels quels', async () => {
    const r = await servir('/fr/contact/demande-demo', () =>
      new Response(null, { status: 301, headers: { location: '/fr/contact?subject=demo', 'cache-control': 'public, max-age=31536000' } }),
    );
    expect(r.status).toBe(301);
    expect(r.headers.get('location')).toBe('/fr/contact?subject=demo');
    expect(r.headers.get('cache-control')).toBe('public, max-age=31536000');
    expect(r.headers.get('x-robots-tag')).toBeNull();
  });

  it.each([
    ['/', 'https://www.packshot-creator.com/fr'],
    ['/de/kontakt', null],
    ['/secteur/bijoux', 'https://www.packshot-creator.com/fr/industrie/bijoux-joaillerie'],
  ])('redirection calculée par le Worker (%s) : origine non appelée, aucun X-Robots-Tag', async (chemin, cible) => {
    const r = await servir(chemin, () => new Response('jamais'));
    expect(r.status).toBe(301);
    if (cible) expect(r.headers.get('location')).toBe(cible);
    expect(r.headers.get('x-robots-tag')).toBeNull();
    expect(fetchOrigine).not.toHaveBeenCalled();
  });
});

describe('D36 — réponses hors origine : non concernées', () => {
  it.each([
    ['/secteur/bijoux/exemples-bagues', 'l. 1643 : /secteur/*/exemples-*'],
    ['/industry/jewelry/examples-rings', 'l. 1829 : /industry/*/examples-*'],
    ['/3d-products-models', 'l. 1990 : GONE_PATHS'],
    ['/ftp/catalogue', 'l. 1990 : préfixe /ftp/'],
  ])('410 du Worker %s (%s) : X-Robots-Tag « noindex, nofollow » conservé, origine non appelée', async (chemin) => {
    const r = await servir(chemin, () => new Response('jamais'));
    expect(r.status).toBe(410);
    expect(r.headers.get('x-robots-tag')).toBe('noindex, nofollow');
    expect(await r.text()).toContain('<meta name="robots" content="noindex">');
    expect(fetchOrigine).not.toHaveBeenCalled();
  });

  it.each([['videos.packshot-creator.com'], ['books.packshot-creator.com'], ['trail.packshot-creator.com']])(
    'host en passage direct (%s) : réponse de son origine renvoyée telle quelle',
    async (host) => {
      const r = await servir('/fichier', () => new Response('tiers', { headers: { ...D36, etag: '"t"' } }), host);
      expect(r.headers.get('x-robots-tag')).toBe('noindex');
      expect(r.headers.get('x-packshot-origin-noindex')).toBe('1');
      expect(r.headers.get('etag')).toBe('"t"');
      expect(fetchOrigine).toHaveBeenCalledTimes(1);
    },
  );

  it.each([['fr.packshot-creator.com'], ['packshot-creator.com'], ['news.packshot-creator.com']])(
    'host legacy (%s) : 301 vers www, origine non appelée',
    async (host) => {
      const r = await servir('/une-page', () => new Response('jamais'), host);
      expect(r.status).toBe(301);
      expect(r.headers.get('location')).toMatch(/^https:\/\/www\.packshot-creator\.com\//);
      expect(r.headers.get('x-robots-tag')).toBeNull();
      expect(fetchOrigine).not.toHaveBeenCalled();
    },
  );
});
