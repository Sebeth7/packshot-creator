/**
 * Lot F — comportement du Worker sur les chemins du lot, et redirections de-ch
 * de next.config.ts.
 *
 * Contrairement à legacy-redirects.test.ts, qui relit les tables depuis le
 * texte, ce fichier appelle le gestionnaire `fetch` du Worker lui-même : c'est
 * l'ordre d'évaluation réel qui est testé (une clé de LEGACY_REDIRECTS n'a
 * d'effet que si aucune règle évaluée avant elle ne répond).
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import worker from '../src/index.js';
import nextConfig from '../../next.config';

const ORIGINE_FACTICE = 299;
const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('origine', { status: ORIGINE_FACTICE }));
afterAll(() => fetchOrigine.mockRestore());

async function repondre(chemin: string): Promise<{ statut: number; cible: string | null }> {
  const reponse = await worker.fetch(
    new Request(`https://www.packshot-creator.com${chemin}`),
    { NEXTJS_ORIGIN: 'https://sysnext.vercel.app' },
  );
  const location = reponse.headers.get('location');
  return {
    statut: reponse.status,
    cible: location ? location.replace('https://www.packshot-creator.com', '') : null,
  };
}

function verifier(table: Record<string, string>) {
  for (const [source, cible] of Object.entries(table)) {
    it(`${source} → 301 ${cible}`, async () => {
      expect(await repondre(source)).toEqual({ statut: 301, cible });
    });
  }
}

describe('Annexe K — mappings ajoutés ou corrigés', () => {
  verifier({
    '/range-maestrobot/3d-scan-modeling-product': '/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste',
    '/packshot-creator-new-photo-software-2018': '/fr/ia-photo-produit',
    '/packshot-creator-new-photo-software-2018/': '/fr/ia-photo-produit',
    '/product/2d-photo-studio-packshotcompact': '/en/studio-photo/alphastudio-compact-v2',
    '/product/photo-studio-packshot-one': '/fr/studio-photo/alphastudio-compact-v2',
    '/packshot-mac/index.html': '/fr',
    '/concours/index.html': '/fr',
    '/gamme-studio/plateforme-360-grand-format-spin-o9t/presentation': '/fr/studio-photo/alphashot-xl-g2',
    '/avis/fashion-center-shootings-photo-mode': '/fr/industrie/mode-textile',
    '/exklusive-angebote': '/de-ch',
    '/sonderangebote-packshotcreator-fotostudios': '/de-ch/studios-photo-automatises',
    '/treffen-sie-uns-auf-einer-messe': '/de-ch',
    '/special-june-2014-offers': '/fr/studios-photo-automatises',
    '/presse/livre-blanc': '/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce',
    '/drake-store': '/en',
    '/gamma-pro/mini-studio-foto-produto-e-commerce-start/presentazione': '/en/studio-photo/alphashot-360',
    '/rich-media-visuels-produits-web-ecommerce-3D-taux-conversion': '/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques',
  });
});

describe('Annexe K — anciens 410 désormais mappés', () => {
  // /commun/presse-details.html/3 n'était pas dans GONE_PATHS : son 410 venait
  // du préfixe /commun/ de shouldReturn410. LEGACY_REDIRECTS est consultée
  // avant shouldReturn410 : la clé suffit, sans exception à la règle de préfixe.
  verifier({
    '/commun/presse-details.html/3': '/fr/a-propos',
    '/2018-guide-e-commerce-photos': '/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce',
    '/range-pro/foto-studio-enterprise-packshot-creator-x2/prasentation': '/de-ch/studios-photo-automatises',
    '/range-studio/studio-photo-without-clipping-packshot-r3/presentation': '/en/studio-photo/alphashot-360',
  });

  it('la règle de préfixe /commun/ reste en 410 pour les autres chemins', async () => {
    expect((await repondre('/commun/presse-details.html/4')).statut).toBe(410);
  });
});

describe('Annexe K — entrée déjà conforme, inchangée', () => {
  verifier({ '/industrie-defense': '/fr/industrie/defense-securite' });
});

describe('alphashot-xl-v2 → alphashot-xl-g2 dans LEGACY_REDIRECTS', () => {
  verifier({
    '/commun/packshot-3d.html': '/en/studio-photo/alphashot-xl-g2',
    '/gamme-studio/studio-photo-sans-detourage-packshot-r3/specifications': '/en/studio-photo/alphashot-xl-g2',
    '/product/maestrobot-studio-3d': '/en/studio-photo/alphashot-xl-g2',
    '/produit/alphashot-xl': '/fr/studio-photo/alphashot-xl-g2',
    '/produit/packshotcreator-r3': '/fr/studio-photo/alphashot-xl-g2',
    '/produit/studio-photo-sans-detourage-packshot-r3': '/fr/studio-photo/alphashot-xl-g2',
    '/commun/packshot-pro-3d-hd.html': '/en/studio-photo/alphashot-xl-g2',
  });

  it('LEGACY_REDIRECTS ne cible plus alphashot-xl-v2', () => {
    const source = readFileSync(path.resolve(import.meta.dirname, '..', 'src', 'index.js'), 'utf-8');
    const lignes = source.split('\n');
    const debut = lignes.findIndex((l) => l.includes('const LEGACY_REDIRECTS = {'));
    let fin = debut;
    while (!/^\s*};\s*$/.test(lignes[fin])) fin++;
    const restantes = lignes.slice(debut, fin).filter((l) => l.includes('alphashot-xl-v2'));
    expect(restantes).toEqual([]);
  });
});

describe('Lot C — bascules vers le FR et chemin sans règle', () => {
  verifier({
    '/fr/blog/potential-advantages-e-commerce-businesses': '/fr/blog/avantage-du-e-commerce-pour-les-entreprises',
    '/fr/blog/series-e-commerce-ebooks-shooting-products': '/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce',
    '/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie': '/fr/blog/comment-mettre-en-valeur-un-produit-guide-photographie-packshot',
  });
});

describe('Doublon GONE_PATHS / LEGACY_REDIRECTS retiré', () => {
  verifier({ '/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026': '/en/blog/comparatif-orbitvu-ortery-styleshoots-2026' });
});

describe('Témoins hors lot, inchangés', () => {
  verifier({
    '/': '/fr',
    '/de/studio-photo/alphashot-xl': '/de-ch/fotostudio/alphashot-xl-g2',
  });
});

describe('next.config.ts — /de-ch/industrie/<slug> vers /de-ch/branchen', () => {
  const page = readFileSync(
    path.resolve(import.meta.dirname, '..', '..', 'app', '[lang]', 'industrie', '[slug]', 'page.tsx'),
    'utf-8',
  );
  const bloc = /const DE_CH_SECTOR_MAP: Record<string, string> = \{([\s\S]*?)\};/.exec(page);
  if (!bloc) throw new Error('DE_CH_SECTOR_MAP introuvable dans app/[lang]/industrie/[slug]/page.tsx');
  // Clé = slug allemand, valeur = slug FR.
  const secteurs = [...bloc[1].matchAll(/^\s*'?([a-z-]+)'?:\s*'([a-z-]+)',?\s*$/gm)].map((m) => ({
    de: m[1],
    fr: m[2],
  }));

  it('lit les 8 secteurs de DE_CH_SECTOR_MAP', () => {
    expect(secteurs).toHaveLength(8);
  });

  const regles = async () => {
    const redirects = await nextConfig.redirects!();
    return redirects.filter((r) => r.source.startsWith('/de-ch/industrie/'));
  };

  it('chaque slug FR mène au slug allemand, en 301', async () => {
    const r = await regles();
    for (const { de, fr } of secteurs) {
      const regle = r.find((x) => x.source === `/de-ch/industrie/${fr}`);
      expect(regle, fr).toMatchObject({ destination: `/de-ch/branchen/${de}`, statusCode: 301 });
    }
  });

  it('chaque slug allemand mène à sa propre page, en 301', async () => {
    const r = await regles();
    for (const { de } of secteurs) {
      const regle = r.find((x) => x.source === `/de-ch/industrie/${de}`);
      expect(regle, de).toMatchObject({ destination: `/de-ch/branchen/${de}`, statusCode: 301 });
    }
  });

  it('le repli vers le hub /de-ch/branchen vient en dernier', async () => {
    const r = await regles();
    expect(r.at(-1)).toEqual({ source: '/de-ch/industrie/:slug', destination: '/de-ch/branchen', statusCode: 301 });
    expect(r).toHaveLength(secteurs.length * 2 + 1);
  });
});
