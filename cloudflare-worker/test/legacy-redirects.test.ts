/**
 * Contrôles sur la table LEGACY_REDIRECTS du Worker Cloudflare.
 *
 * `cloudflare-worker/src/index.js` est la source unique du Worker (règle R5).
 * La table y est un littéral d'objet déclaré dans le corps de `fetch`, donc
 * non importable : on la relit depuis le texte du fichier.
 *
 * Le contrôle des doublons n'est pas décoratif. En JavaScript, une clé répétée
 * dans un littéral d'objet est silencieusement écrasée par la dernière
 * occurrence : une redirection peut être annulée sans qu'aucun outil ne le
 * signale. Deux doublons de ce type existaient dans la table avant ce lot.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const SOURCE = path.resolve(
  import.meta.dirname,
  '..',
  'src',
  'index.js',
);

const LIGNE_ENTREE = /^\s*"([^"]+)":\s*"([^"]*)",?\s*$/;

/** Renvoie les entrées de la table, dans l'ordre du fichier, doublons compris. */
function lireEntrees(): Array<{ cle: string; cible: string; ligne: number }> {
  const lignes = readFileSync(SOURCE, 'utf-8').split('\n');
  const debut = lignes.findIndex((l) => l.includes('const LEGACY_REDIRECTS = {'));
  if (debut === -1) throw new Error('LEGACY_REDIRECTS introuvable dans le Worker');

  const entrees: Array<{ cle: string; cible: string; ligne: number }> = [];
  for (let i = debut + 1; i < lignes.length; i++) {
    const ligne = lignes[i];
    if (/^\s*};\s*$/.test(ligne)) return entrees;
    const m = LIGNE_ENTREE.exec(ligne);
    if (!m) {
      throw new Error(
        `Ligne ${i + 1} de LEGACY_REDIRECTS non reconnue — une entrée par ligne, ` +
          `au format "cle": "cible", :\n${ligne}`,
      );
    }
    entrees.push({ cle: m[1], cible: m[2], ligne: i + 1 });
  }
  throw new Error('Fin de LEGACY_REDIRECTS introuvable');
}

const entrees = lireEntrees();
const table = new Map(entrees.map((e) => [e.cle, e.cible]));

describe('LEGACY_REDIRECTS — intégrité de la table', () => {
  it('contient au moins un millier d entrées (garde-fou de lecture)', () => {
    expect(entrees.length).toBeGreaterThan(700);
  });

  it('ne contient aucune clé en double', () => {
    const vues = new Map<string, number>();
    const doublons: string[] = [];
    for (const { cle, ligne } of entrees) {
      const premiere = vues.get(cle);
      if (premiere !== undefined) {
        doublons.push(
          `"${cle}" : ligne ${premiere} puis ligne ${ligne} — ` +
            `la première est silencieusement écrasée`,
        );
      } else {
        vues.set(cle, ligne);
      }
    }
    expect(doublons, `Clés en double :\n${doublons.join('\n')}`).toEqual([]);
  });

  it('ne cible jamais une URL qui serait elle-même une clé (pas de chaîne 301 -> 301)', () => {
    const chaines = entrees
      .filter((e) => table.has(e.cible))
      .map((e) => `"${e.cle}" -> "${e.cible}", qui est elle-même redirigée`);
    expect(chaines, `Chaînes de redirection :\n${chaines.join('\n')}`).toEqual([]);
  });

  it('a des cibles absolues commençant par /', () => {
    const fautives = entrees.filter((e) => !e.cible.startsWith('/')).map((e) => e.cle);
    expect(fautives).toEqual([]);
  });
});

describe('LEGACY_REDIRECTS — landings commerciales packshot-*', () => {
  // Constat du 17/09 : Google voyait ces trois landings comme des doublons de
  // leur URL racine legacy, parce que la racine redirigeait vers un article ou
  // un guide au lieu de la page commerciale.
  const attendu: Record<string, string> = {
    '/packshot-amazon': '/fr/packshot-amazon',
    '/packshot-e-commerce': '/fr/packshot-e-commerce',
    '/packshot-mode': '/fr/packshot-mode',
  };

  for (const [cle, cible] of Object.entries(attendu)) {
    it(`${cle} redirige vers ${cible}`, () => {
      expect(table.get(cle)).toBe(cible);
    });
  }
});

describe('LEGACY_REDIRECTS — anciens slugs FR, préfixés et non préfixés', () => {
  // Chaque ancien slug doit exister dans ses deux formes : avec /fr et sans.
  const correspondances: Record<string, string> = {
    '/industrie/bijoux': '/fr/industrie/bijoux-joaillerie',
    '/industrie/meubles': '/fr/industrie/mobilier-decoration',
    '/industrie/beautes': '/fr/industrie/cosmetiques-beaute',
    '/industrie/sports': '/fr/industrie/sport-outdoor',
    '/industrie/high-tech-electromenager-informatique': '/fr/industrie/electronique-hightech',
    '/industrie/simplifiez-production-de-vos-visuels-optique-lunetterie': '/fr/industrie/lunetterie',
    '/studio-photo/alphashot-micro': '/fr/studio-photo/alphashot-micro-v2',
    '/studio-photo/alphastudio-compact': '/fr/studio-photo/alphastudio-compact-v2',
    '/studio-photo/studio-photo-360-alphastudio-xxl': '/fr/studio-photo/alphastudio-xxl-v2',
    '/studio-photo/e-comm-studio': '/fr/studio-photo/e-comm-studio-plus',
    '/studio-photo/alphashot-xl': '/fr/studio-photo/alphashot-xl-g2',
  };

  for (const [sansPrefixe, cible] of Object.entries(correspondances)) {
    it(`${sansPrefixe} redirige vers ${cible}`, () => {
      expect(table.get(sansPrefixe)).toBe(cible);
    });
    it(`/fr${sansPrefixe} redirige vers ${cible}`, () => {
      expect(table.get(`/fr${sansPrefixe}`)).toBe(cible);
    });
  }
});

/**
 * DE_CH_MAP est une table distincte, consultee avant LEGACY_REDIRECTS pour tout
 * chemin commencant par /de. Une seule entree y est corrigee par ce lot.
 */
describe('DE_CH_MAP — cible de l ancienne fiche Alphashot XL', () => {
  it('/de/studio-photo/alphashot-xl redirige vers /de-ch/fotostudio/alphashot-xl-g2', () => {
    const source = readFileSync(SOURCE, 'utf-8');
    expect(source).toContain(
      '"/de/studio-photo/alphashot-xl": "/de-ch/fotostudio/alphashot-xl-g2"',
    );
  });

  it('ne cible plus alphashot-xl-v2, machine « delisted » hors sitemap et hors pied de page', () => {
    const source = readFileSync(SOURCE, 'utf-8');
    expect(source).not.toContain('"/de-ch/fotostudio/alphashot-xl-v2"');
  });
});
