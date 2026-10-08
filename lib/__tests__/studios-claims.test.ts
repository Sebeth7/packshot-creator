/**
 * Landing Studios (Wave 2, 08/10/2026) : les claims retirés par le registre L2 ne reviennent pas.
 *
 * Périmètre : le namespace `studiosHardware` des trois locales routées, le composant FR
 * `LandingStudios.tsx` et le gabarit EN/de-ch de `page.tsx`. Les messages sont tous livrés au
 * navigateur (layout : `getMessages()`), d'où le contrôle des clés non rendues.
 *
 * Les claims hors registre L2 § 5 encore présents en EN et de-ch (« 30 min », badge « 3D »,
 * noms de la FAQ q3) relèvent de la traduction depuis la FR validée : ils ne sont contrôlés
 * qu'en FR.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const racine = path.resolve(import.meta.dirname, '../..');
const lire = (fichier: string) => readFileSync(path.join(racine, fichier), 'utf8');

type Arbre = { [cle: string]: string | Arbre };

/** Valeurs à plat, avec leur chemin. */
function aplatir(arbre: Arbre, prefixe = ''): Array<[string, string]> {
  return Object.entries(arbre).flatMap(([cle, valeur]) =>
    typeof valeur === 'string' ? [[`${prefixe}${cle}`, valeur] as [string, string]] : aplatir(valeur, `${prefixe}${cle}.`),
  );
}

const LOCALES = ['fr', 'en', 'de-ch'] as const;
const messages = Object.fromEntries(
  LOCALES.map((l) => [l, aplatir(JSON.parse(lire(`messages/${l}.json`)).studiosHardware as Arbre)]),
) as Record<(typeof LOCALES)[number], Array<[string, string]>>;

/** Code sans commentaires : les commentaires citent les claims retirés pour les interdire. */
const sansCommentaires = (source: string) => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const PAGE = sansCommentaires(lire('app/[lang]/studios-photo-automatises/page.tsx'));
const LANDING_FR = sansCommentaires(lire('app/[lang]/studios-photo-automatises/_components/LandingStudios.tsx'));

/** Claims retirés dans les trois langues (registre L2, § 3 et § 5). */
const INTERDITS: Array<[string, RegExp]> = [
  ['nombre de systèmes', /\b20\s+(systèmes|systems|Orbitvu)/i],
  ['cadence 500+', /500\s*\+/],
  ['ROI chiffré', /\b9\s*(mois|months|Monate|Monaten)\b/i],
  ['5 000+ clients', /5[\s ,.]?000\s*\+/],
  ['BlendAI', /blendai/i],
  ['hotline', /hotline/i],
  ['ROI en 2 minutes', /\b2\s*(minutes|Minuten)\b/i],
  ['gratuité', /gratuit|\bfree\b|kostenlos/i],
  ['reflex', /\bDSLR\b|reflex|Spiegelreflex/i],
  ['Qualiopi', /qualiopi/i],
  ['dès le premier jour', /premier jour|from day one|ab dem ersten Tag/i],
  ['showroom de Lyon', /lyon/i],
  ['prix', /€|\bEUR\b/],
];

describe('studios : claims retirés (registre L2)', () => {
  for (const locale of LOCALES) {
    it(`messages ${locale} : aucun claim retiré`, () => {
      const fautes = messages[locale].flatMap(([cle, valeur]) =>
        INTERDITS.filter(([, motif]) => motif.test(valeur)).map(([nom]) => `${cle} : ${nom}`),
      );
      expect(fautes).toEqual([]);
    });

    it(`messages ${locale} : livraison et installation jamais présentées comme incluses (D32)`, () => {
      const fautes = messages[locale]
        .filter(([cle]) => !cle.endsWith('.question'))
        .filter(([, valeur]) => /\b(incluses?|included|inbegriffen)\b/i.test(valeur))
        .map(([cle]) => cle);
      expect(fautes).toEqual([]);
    });
  }

  it('FR : seul `meta` reste dans les messages (texte porté par LandingStudios)', () => {
    expect(new Set(messages.fr.map(([cle]) => cle.split('.')[0]))).toEqual(new Set(['meta']));
  });

  it('sources : aucun claim retiré, ni dans la landing FR ni dans le gabarit EN/de-ch', () => {
    for (const [fichier, source] of [['LandingStudios.tsx', LANDING_FR], ['page.tsx', PAGE]] as const) {
      const fautes = INTERDITS.filter(([, motif]) => motif.test(source)).map(([nom]) => `${fichier} : ${nom}`);
      expect(fautes).toEqual([]);
    }
  });

  it('sources : ni offre agrégée, ni avis, ni compteurs, ni ancre calculateur (D47)', () => {
    for (const source of [LANDING_FR, PAGE]) {
      expect(source).not.toMatch(/aggregateOffer\s*:/);
      expect(source).not.toMatch(/TestimonialsSection|reviewSchema|AnimatedCounter/);
      expect(source).not.toMatch(/id=["']calculateur-roi/);
    }
  });

  it('landing FR : ni durée de démonstration, ni badge 3D, ni ancien visuel du hero', () => {
    expect(LANDING_FR).not.toMatch(/30\s*min/i);
    expect(LANDING_FR).not.toMatch(/\b3D\b/);
    expect(LANDING_FR).not.toMatch(/hero-studios-wide/);
  });
});
