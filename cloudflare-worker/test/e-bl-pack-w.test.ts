/**
 * E-BL (PACK-W) — deux anciennes URL à backlinks rendues à leur équivalent exact.
 *
 * Comme lot-f.test.ts, ce fichier appelle le gestionnaire `fetch` du Worker :
 * l'ordre d'évaluation réel est testé (LEGACY_REDIRECTS avant shouldReturn410).
 *
 * - BL-042 : /ecommerce-jewelry-photography-tutorial répondait 410 (GONE_PATHS)
 *   alors que l'article existe en /en/blog/technique-photograph-jewelry-tutorial ;
 *   la variante /en/blog/… y redirigeait déjà.
 * - BL-018 : l'ancien article « 4 erreurs à éviter » redirigeait vers l'article
 *   voisin « 6 pratiques » ; l'article exact existe en FR.
 *
 * Code du dépôt seulement : aucun déploiement (R5, D4).
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import worker from '../src/index.js';

const ORIGINE_FACTICE = 299;
const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('origine', { status: ORIGINE_FACTICE }));
afterAll(() => fetchOrigine.mockRestore());

async function repondre(url: string): Promise<{ statut: number; cible: string | null }> {
  const reponse = await worker.fetch(new Request(url), { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' });
  const location = reponse.headers.get('location');
  return {
    statut: reponse.status,
    cible: location ? location.replace('https://www.packshot-creator.com', '') : null,
  };
}

describe('BL-042 — tutoriel bijoux : 301 vers l’article EN au lieu du 410', () => {
  const cible = '/en/blog/technique-photograph-jewelry-tutorial';
  for (const url of [
    'https://www.packshot-creator.com/ecommerce-jewelry-photography-tutorial',
    'https://www.packshot-creator.com/ecommerce-jewelry-photography-tutorial/',
    'https://en.packshot-creator.com/ecommerce-jewelry-photography-tutorial/',
  ]) {
    it(`${url} → 301 ${cible}`, async () => {
      expect(await repondre(url)).toEqual({ statut: 301, cible });
    });
  }

  it('la variante /en/blog/… redirige toujours vers la même cible', async () => {
    expect(await repondre('https://www.packshot-creator.com/en/blog/ecommerce-jewelry-photography-tutorial'))
      .toEqual({ statut: 301, cible });
  });

  it('la cible est servie par l’origine, sans redirection du Worker', async () => {
    expect((await repondre(`https://www.packshot-creator.com${cible}`)).statut).toBe(ORIGINE_FACTICE);
  });
});

describe('BL-018 — « 4 erreurs à éviter » : 301 vers l’article exact', () => {
  const cible = '/fr/blog/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter';
  for (const url of [
    'https://www.packshot-creator.com/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter',
    'https://fr.packshot-creator.com/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter/',
  ]) {
    it(`${url} → 301 ${cible}`, async () => {
      expect(await repondre(url)).toEqual({ statut: 301, cible });
    });
  }

  it('la cible est servie par l’origine, sans redirection du Worker', async () => {
    expect((await repondre(`https://www.packshot-creator.com${cible}`)).statut).toBe(ORIGINE_FACTICE);
  });

  it('l’article « 6 pratiques » garde ses propres redirections entrantes', async () => {
    expect(await repondre('https://www.packshot-creator.com/rich-media-visuels-produits-web-ecommerce-3D-taux-conversion'))
      .toEqual({ statut: 301, cible: '/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques' });
  });
});
