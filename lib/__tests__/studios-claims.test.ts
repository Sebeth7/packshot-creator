/**
 * Landing Studios (#108) : les claims retirés ne reviennent pas, les faits publiés restent prudents.
 *
 * Périmètre : le namespace `studiosHardware` des trois locales routées, le composant FR
 * `LandingStudios.tsx` et le gabarit EN/de-ch de `page.tsx`. Les messages sont tous livrés au
 * navigateur (layout : `getMessages()`), d'où le contrôle des clés non rendues.
 *
 * Arbitrages de Laurent du 16/10/2026 :
 * - P2 : EN et de-ch partent des textes publiés par #109 (showroom de Beynost, délai d'environ
 *   12 jours sans garantie, livraison et installation en supplément, formation facturée à part,
 *   ROI de 6 à 12 mois sans garantie, Qualiopi rattaché à Sysnext, fourchette de prix de la FAQ) ;
 * - P3 : la capacité d'environ 500 photos par jour n'apparaît que sous condition (système,
 *   produits, organisation), jamais en « 500+ » ;
 * - restent exclus : nombre exact de systèmes, cadence non qualifiée, ROI de 9 mois, « 2 minutes »,
 *   démonstration de 30 minutes, gratuité, reflex, hotline, « dès le premier jour », « showroom de
 *   Lyon », offre agrégée, avis, compteurs, et BlendAI hors du lien vers la page IA actuelle.
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

/** Claims exclus dans les trois langues. */
const INTERDITS: Array<[string, RegExp]> = [
  ['nombre de systèmes', /\b(20|16|13)\s+(systèmes|systems|Orbitvu)/i],
  ['cadence non qualifiée', /500\s*\+/],
  ['ROI de 9 mois', /\b9\s*(mois|months|Monate|Monaten)\b/i],
  ['ROI en 2 minutes', /\b2\s*(minutes|Minuten)\b/i],
  ['démonstration de 30 minutes', /30\s*min/i],
  ['hotline', /hotline/i],
  ['gratuité', /gratuit|\bfree\b|kostenlos/i],
  ['reflex', /\bDSLR\b|reflex|Spiegelreflex/i],
  ['dès le premier jour', /premier jour|from day one|ab dem ersten Tag/i],
  ['showroom de Lyon', /showroom (de|in) Lyon|Lyon showroom|Showroom in Lyon/i],
  ['en quelques secondes', /in seconds|en quelques secondes|in Sekunden/i],
];

/** Une mention de la capacité de 500 photos est toujours conditionnelle (arbitrage P3). */
const CAPACITE = /\b500 (photos|Fotos)\b/i;
const CONDITION = /Selon le système utilisé|Depending on the system used|Je nach eingesetztem System/;

describe('studios : claims retirés ou encadrés', () => {
  for (const locale of LOCALES) {
    it(`messages ${locale} : aucun claim exclu`, () => {
      const fautes = messages[locale].flatMap(([cle, valeur]) =>
        INTERDITS.filter(([, motif]) => motif.test(valeur)).map(([nom]) => `${cle} : ${nom}`),
      );
      expect(fautes).toEqual([]);
    });

    it(`messages ${locale} : capacité de 500 photos par jour toujours conditionnelle (P3)`, () => {
      const fautes = messages[locale]
        .filter(([, valeur]) => CAPACITE.test(valeur) && !CONDITION.test(valeur))
        .map(([cle]) => cle);
      expect(fautes).toEqual([]);
    });

    it(`messages ${locale} : livraison et installation jamais présentées comme incluses (D32)`, () => {
      const fautes = messages[locale]
        .filter(([cle]) => !cle.endsWith('.question'))
        .filter(([, valeur]) =>
          valeur.split(/(?<=[.;])\s/).some((phrase) =>
            /(livraison|installation|delivery|lieferung)/i.test(phrase) && /\b(incluses?|included|inbegriffen)\b/i.test(phrase),
          ),
        )
        .map(([cle]) => cle);
      expect(fautes).toEqual([]);
    });

    it(`messages ${locale} : BlendAI seulement dans le lien vers la page IA actuelle`, () => {
      const fautes = messages[locale]
        .filter(([cle, valeur]) => /blendai/i.test(valeur) && !cle.startsWith('crossLinks.ia.'))
        .map(([cle]) => cle);
      expect(fautes).toEqual([]);
    });
  }

  it('FR : seul `meta` reste dans les messages (texte porté par LandingStudios)', () => {
    expect(new Set(messages.fr.map(([cle]) => cle.split('.')[0]))).toEqual(new Set(['meta']));
  });

  it('EN et de-ch : faits publiés par #109 conservés', () => {
    const valeur = (l: 'en' | 'de-ch', cle: string) => messages[l].find(([c]) => c === cle)?.[1] ?? '';
    expect(valeur('en', 'faqStudios.q5.answer')).toMatch(/Beynost, near Lyon/);
    expect(valeur('de-ch', 'faqStudios.q5.answer')).toMatch(/Beynost bei Lyon/);
    expect(valeur('en', 'faqStudios.q6.answer')).toMatch(/about 12 days; this is an indication, not a guarantee/);
    expect(valeur('de-ch', 'faqStudios.q6.answer')).toMatch(/rund 12 Tage; dies ist ein Richtwert ohne Garantie/);
    expect(valeur('en', 'support.step2description')).toMatch(/charged extra/);
    expect(valeur('de-ch', 'support.step2description')).toMatch(/zusätzlich verrechnet/);
  });

  it('sources : aucun claim exclu, ni dans la landing FR ni dans le gabarit EN/de-ch', () => {
    for (const [fichier, source] of [['LandingStudios.tsx', LANDING_FR], ['page.tsx', PAGE]] as const) {
      const fautes = INTERDITS.filter(([, motif]) => motif.test(source)).map(([nom]) => `${fichier} : ${nom}`);
      expect(fautes).toEqual([]);
      expect(source, `${fichier} : BlendAI`).not.toMatch(/blendai/i);
    }
  });

  it('landing FR : capacité conditionnelle, délai et ROI non garantis', () => {
    const phrases = LANDING_FR.split(/(?<=[.;])\s+/);
    for (const p of phrases.filter((x) => CAPACITE.test(x))) expect(p).toMatch(CONDITION);
    for (const p of phrases.filter((x) => /12 jours/.test(x))) expect(p).toMatch(/sans garantie/);
    for (const p of phrases.filter((x) => /6 et 12 mois/.test(x))) expect(p).toMatch(/sans garantie/);
  });

  it('sources : ni offre agrégée, ni avis, ni compteurs, ni badge 3D, ni ancre calculateur (D47)', () => {
    for (const source of [LANDING_FR, PAGE]) {
      expect(source).not.toMatch(/aggregateOffer\s*:/);
      expect(source).not.toMatch(/TestimonialsSection|reviewSchema|AnimatedCounter/);
      expect(source).not.toMatch(/label: '3D'/);
      expect(source).not.toMatch(/id=["']calculateur-roi/);
    }
  });

  it('landing FR : aucun prix, ni 3D, ni ancien visuel du hero', () => {
    expect(LANDING_FR).not.toMatch(/€|\bEUR\b|\bHT\b/);
    expect(LANDING_FR).not.toMatch(/\b3D\b/);
    expect(LANDING_FR).not.toMatch(/hero-studios-wide/);
  });
});
