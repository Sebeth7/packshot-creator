/**
 * D29 (24/09/2026) — successeur commercial de l'Alphashot XL v2 = Alphashot XL G2.
 * Redirections /en de next.config.ts : destination xl-g2, un seul saut, destination
 * non redirigée ensuite (ni par next.config ni par le Worker).
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import worker from '../src/index.js';
import nextConfig from '../../next.config';

const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('origine', { status: 299 }));
afterAll(() => fetchOrigine.mockRestore());

async function worker301(chemin: string) {
  const r = await worker.fetch(new Request(`https://www.packshot-creator.com${chemin}`), {
    NEXTJS_ORIGIN: 'https://sysnext.vercel.app',
  });
  return { statut: r.status, cible: r.headers.get('location') };
}

describe('next.config.ts — anciennes URL XL et G2 vers alphashot-xl-g2', async () => {
  const redirects = await nextConfig.redirects!();
  const parSource = (s: string) => redirects.filter((r) => r.source === s);
  const cas: Record<string, string> = {
    '/en/photo-studio/alphashot-xl': '/en/studio-photo/alphashot-xl-g2',
    '/en/studio-photo/alphashot-xl': '/en/studio-photo/alphashot-xl-g2',
    '/en/photo-studio/alphashot-g2': '/en/studio-photo/alphashot-xl-g2',
  };
  for (const [source, destination] of Object.entries(cas)) {
    it(`${source} → 301 ${destination} (première règle applicable)`, () => {
      const regles = parSource(source);
      expect(regles.length).toBe(1);
      expect(regles[0]).toMatchObject({ destination, statusCode: 301 });
      const iSource = redirects.findIndex((r) => r.source === source);
      const iCatchAll = redirects.findIndex((r) => r.source === '/en/photo-studio/:slug');
      if (source.startsWith('/en/photo-studio/')) expect(iSource).toBeLessThan(iCatchAll);
    });
    it(`${source} n'est pas capté par le Worker (atteint next.config)`, async () => {
      expect((await worker301(source)).statut).toBe(299);
    });
  }
  it('aucune redirection next.config ne vise encore alphashot-xl-v2', () => {
    expect(redirects.filter((r) => r.destination.includes('alphashot-xl-v2'))).toEqual([]);
  });
  it('destination finale sans nouveau saut : ni next.config ni Worker ne redirigent xl-g2', async () => {
    expect(parSource('/en/studio-photo/alphashot-xl-g2')).toEqual([]);
    expect((await worker301('/en/studio-photo/alphashot-xl-g2')).statut).toBe(299);
  });
});
