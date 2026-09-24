/**
 * P0-E / P0-D (24/09/2026) — lot automatique restreint aux équivalents exacts
 * (EXACT_EQUIVALENT) et aux successeurs documentés (DOCUMENTED_SUCCESSOR).
 * Les mappings REVIEW sont testés comme INCHANGÉS pour rendre visible toute dérive.
 * Appelle le gestionnaire `fetch` du Worker (ordre d'évaluation réel).
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import worker from '../src/index.js';

const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('origine', { status: 299 }));
afterAll(() => fetchOrigine.mockRestore());

async function repondre(chemin: string) {
  const r = await worker.fetch(new Request(`https://www.packshot-creator.com${chemin}`), {
    NEXTJS_ORIGIN: 'https://sysnext.vercel.app',
  });
  const loc = r.headers.get('location');
  return { statut: r.status, cible: loc ? loc.replace('https://www.packshot-creator.com', '') : null };
}
function verifier(table: Record<string, string>) {
  for (const [source, cible] of Object.entries(table)) {
    it(`${source} → 301 ${cible}`, async () => {
      expect(await repondre(source)).toEqual({ statut: 301, cible });
    });
  }
}

describe('EXACT_EQUIVALENT — même contenu ou même fonction', () => {
  verifier({
    '/de/blog/leitfaden-packshot-fotografie-warum-packshots-machen': '/de-ch/blog/leitfaden-packshot-fotografie-warum-packshots-machen',
    '/de/blog/produkt-vorstellen-leitfaden-packshot-fotografie': '/de-ch/blog/produkt-vorstellen-leitfaden-packshot-fotografie',
    '/de/guide/wie-uhr-vor-fotoshooting-positionieren': '/de-ch/guide/wie-uhr-vor-fotoshooting-positionieren',
    '/de/guide/quel-equipement-choisir-pour-photo-bijoux': '/de-ch/guide/welche-ausrustung-fur-schmuckfotografie-wahlen',
    '/de/fotostudio/bike-studio': '/de-ch/fotostudio/bike-studio',
    '/de/fotostudio/furniture-studio': '/de-ch/fotostudio/furniture-studio',
    '/de/fotostudio/alphatable': '/de-ch/fotostudio/alphatable',
    '/de/fotostudio/fashion-studio': '/de-ch/fotostudio/fashion-studio',
    '/de/branchen/mode': '/de-ch/branchen/mode',
    '/de/branchen/schoenheit': '/de-ch/branchen/schoenheit',
    '/de/branchen/produktansichten-ihrer-brillen-ganz-einfach-selbst-produzieren': '/de-ch/branchen/brillen',
    '/de/guides': '/de-ch/guide',
    '/de/blog-produits': '/de-ch/blog',
  });
});

describe('DOCUMENTED_SUCCESSOR — précédent écrit dans le dépôt', () => {
  verifier({
    '/de/fotostudio/alphashot-micro': '/de-ch/fotostudio/alphashot-micro-v2',
    '/de/fotostudio/alphastudio-compact': '/de-ch/fotostudio/alphastudio-compact-v2',
    '/de/fotostudio/alphastudio-xxl': '/de-ch/fotostudio/alphastudio-xxl-v2',
    '/de/branchen/flaschen': '/de-ch/branchen/wein',
    '/packshot-packshotcreator/packshot-mannequin': '/fr/studio-photo/fashion-studio',
  });
});

describe('Déterministe — chaînes et doublon', () => {
  verifier({
    '/industrie/shootings-photo': '/fr/industrie',
    '/industrie/bouteilles': '/fr/industrie/vin-spiritueux',
    '/industrie/art-de-table-photos-culinaires': '/fr/industrie/food-alimentaire',
    '/industrie/pieces-techniques': '/fr/industrie/pieces-techniques-industrie',
    '/industrie/lunetterie': '/fr/industrie/lunetterie',
    '/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22': '/fr/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle',
  });
});

describe('Variante /amp du doublon « -22 » — 410 conservé', () => {
  // Sans entrée propre, la variante passait de 410 à 301 vers /fr/blog/…-22/amp, qui répond 404.
  for (const chemin of [
    '/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp',
    '/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp/',
  ]) {
    it(`${chemin} → 410`, async () => {
      expect(await repondre(chemin)).toEqual({ statut: 410, cible: null });
    });
  }
});

describe('D29 — successeur de l\'Alphashot XL v2 : XL G2 (décision de Laurent du 24/09/2026)', () => {
  verifier({
    '/de/fotostudio/alphashot-xl': '/de-ch/fotostudio/alphashot-xl-g2',
  });
});

describe('REVIEW — inchangés dans cette PR', () => {
  verifier({
    '/de/workflow-management-shotflow': '/de-ch',
    '/de/altes-fotostudio': '/de-ch',
    '/de/automatisieren-produktfotografie-packshotcreator': '/de-ch',
    '/de/produkte': '/de-ch',
    '/de/guide/welche-einstellungen-fur-schmuckfotografie': '/de-ch/guide',
    '/packshot-packshotcreator/packshot-mode': '/fr',
    '/packshot-packshotcreator/packshot-e-commerce': '/fr',
  });
});
