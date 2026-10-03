/**
 * Contrôle permanent de la règle D45 (R-PRODUCT-DIM) : les dimensions et charges des
 * machines ne divergent pas entre le référentiel, le sélecteur, le calculateur ROI,
 * les fiches (FAQ visible et FAQPage), les landings et leurs traductions.
 *
 * Il n'harmonise rien : une contradiction non résolue est admise seulement si elle est
 * inscrite dans data/produits/fiches-techniques.ts ou data/produits/ecarts-connus.ts,
 * avec son point de Q20.
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { MACHINES as ROI } from '@/components/calculators/ROICalculator/lib/machines';
import { MACHINES as SELECTEUR } from '@/components/machine-selector/lib/machines';
import { evaluateMachine } from '@/components/calculators/ROICalculator/lib/machineSelector';
import type { SelectionCriteria } from '@/components/calculators/ROICalculator/lib/types';
import { FICHES_TECHNIQUES, VALEURS_RETIREES, ficheTechnique } from '@/data/produits/fiches-techniques';
import { ECARTS_CATALOGUES, ECARTS_MESSAGES } from '@/data/produits/ecarts-connus';
import { extraireTriplets, extraireKg, extraireLongueurMax, memeTriplet, tripletDe, trier } from '../dimensions';

const ROOT = process.cwd();
const LANGUES = ['fr', 'en', 'de-ch'] as const;
const messages = Object.fromEntries(
  LANGUES.map((l) => [l, JSON.parse(fs.readFileSync(path.join(ROOT, 'messages', `${l}.json`), 'utf8'))]),
) as Record<(typeof LANGUES)[number], Record<string, unknown>>;

function lire(objet: unknown, cle: string): unknown {
  return cle.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), objet);
}

function chaines(objet: unknown, prefixe = ''): [string, string][] {
  if (typeof objet === 'string') return [[prefixe, objet]];
  if (objet && typeof objet === 'object') {
    return Object.entries(objet as Record<string, unknown>).flatMap(([k, v]) => chaines(v, prefixe ? `${prefixe}.${k}` : k));
  }
  return [];
}

const IDS = [...new Set([...ROI.map((m) => m.id), ...SELECTEUR.map((m) => m.id)])];
const CATALOGUES = [
  ['sélecteur', SELECTEUR],
  ['calculateur ROI', ROI],
] as const;

describe('Référentiel des fiches techniques (D45)', () => {
  it('couvre chaque machine des deux catalogues, et rien d’autre', () => {
    expect(FICHES_TECHNIQUES.map((f) => f.id).sort()).toEqual([...IDS].sort());
  });

  it('cite une source datée pour chaque fiche fabricant, une URL distincte par produit', () => {
    const urls = new Set<string>();
    for (const f of FICHES_TECHNIQUES) {
      if (!f.fabricant) {
        expect(f.version, f.id).toBe('sans-source');
        continue;
      }
      expect(f.fabricant.source.url, f.id).toMatch(/^https:\/\//);
      expect(f.fabricant.source.releveLe, f.id).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(urls.has(f.fabricant.source.url), `${f.id} : URL partagée`).toBe(false);
      urls.add(f.fabricant.source.url);
    }
  });

  it('ne confond pas deux générations : XL v2 et XL G2 renvoient à deux produits fabricant distincts', () => {
    expect(ficheTechnique('alphashot-xl-v2')?.fabricant?.nom).not.toBe(ficheTechnique('alphashot-xl-g2')?.fabricant?.nom);
    expect(ficheTechnique('alphashot-xl-v2')?.version).toBe('non-etablie'); // D29
  });

  it('a un statut cohérent avec les valeurs en présence', () => {
    for (const f of FICHES_TECHNIQUES) {
      const fab = f.fabricant;
      const psc = f.psc;
      const attendu = (memes: boolean | null) => {
        if (memes === null) return ['non-verifiable'];
        if (memes) return ['conforme'];
        return f.version === 'etablie' ? ['ecart', 'a-arbitrer'] : ['a-arbitrer'];
      };

      const objet = fab?.objetMax ? memeTriplet(tripletDe(psc.objetMax), fab.objetMax) : null;
      expect(attendu(objet), `${f.id} objetMax`).toContain(f.statuts.objetMax);
      if (fab && !fab.objetMax && fab.objetMaxTexte) {
        // « up to 18 cm long » : seule la plus grande dimension est comparable.
        expect(Math.max(...tripletDe(psc.objetMax)), f.id).toBe(Number(fab.objetMaxTexte.match(/\d+/)?.[0]));
      }

      const encombrement = fab?.machine && psc.encombrement ? memeTriplet(tripletDe(psc.encombrement), fab.machine) : null;
      expect(attendu(encombrement), `${f.id} encombrement`).toContain(f.statuts.encombrement);

      const charge = fab ? fab.charges.some((c) => c.type !== 'surfacique' && c.kg === psc.chargeKg) : null;
      expect(attendu(charge), `${f.id} charge`).toContain(f.statuts.charge);

      const ouvert = Object.values(f.statuts).some((s) => s === 'ecart' || s === 'a-arbitrer');
      if (ouvert) expect(f.q20.length, `${f.id} : contradiction sans point de Q20`).toBeGreaterThan(0);
    }
  });
});

describe('Valeurs consommées par le site', () => {
  for (const [nom, catalogue] of CATALOGUES) {
    it(`${nom} : dimensionsMax, studioFootprint et poidsMaxKg = référentiel`, () => {
      for (const m of catalogue) {
        const f = ficheTechnique(m.id)!;
        expect(m.dimensionsMax, m.id).toEqual(f.psc.objetMax);
        expect(m.studioFootprint ?? null, m.id).toEqual(f.psc.encombrement);
        expect(m.poidsMaxKg, m.id).toBe(f.psc.chargeKg);
      }
    });
  }

  it('les deux catalogues portent le même texte tailleMax et poidsMax', () => {
    for (const s of SELECTEUR) {
      const r = ROI.find((m) => m.id === s.id)!;
      expect(s.tailleMax, s.id).toBe(r.tailleMax);
      expect(s.poidsMax, s.id).toBe(r.poidsMax);
    }
  });

  it('le texte tailleMax affiché = la valeur de calcul dimensionsMax', () => {
    for (const m of ROI) {
      const t = extraireTriplets(m.tailleMax);
      if (t.length === 0) continue; // « Mobilier XXL », « Mannequin taille réelle » : texte sans chiffre
      expect(memeTriplet(t[0], tripletDe(m.dimensionsMax)), `${m.id} : ${m.tailleMax}`).toBe(true);
    }
  });

  it('FAQ et chiffres clés des fiches (FAQ visible et FAQPage) citent les valeurs de la fiche', () => {
    for (const m of ROI) {
      const admis = [tripletDe(m.dimensionsMax), ...(m.studioFootprint ? [tripletDe(m.studioFootprint)] : [])];
      const surfaces = [
        [m.dimensionsMax.l, m.dimensionsMax.w],
        ...(m.studioFootprint ? [[m.studioFootprint.l, m.studioFootprint.w]] : []),
      ].map((s) => trier(s).join('x'));
      const textes = [
        ...(m.faqItems ?? []).flatMap((q) => LANGUES.flatMap((l) => [q.question[l] ?? '', q.answer[l] ?? ''])),
        ...(m.keyStats ?? []).flatMap((k) => [k.value, ...LANGUES.map((l) => `${k.label[l] ?? ''} ${k.description[l] ?? ''}`)]),
      ];
      for (const texte of textes) {
        for (const t of extraireTriplets(texte)) {
          expect(admis.some((a) => memeTriplet(a, t)), `${m.id} : ${t.join('x')} dans « ${texte.slice(0, 80)} »`).toBe(true);
        }
        const sansTriplets = texte.replace(/\d{1,4}\s?[x×]\s?\d{1,4}\s?[x×]\s?\d{1,4}/g, ' ');
        for (const s of sansTriplets.matchAll(/(\d{1,3})\s?[x×]\s?(\d{1,3})\s?(cm|m)\b/g)) {
          if (s[3] === 'm') continue; // « 3x3m » : espace scénique du Fashion Studio Pro v2, listé au registre
          expect(surfaces, `${m.id} : ${s[0]}`).toContain(trier([Number(s[1]), Number(s[2])]).join('x'));
        }
      }
    }
  });
});

/** Lignes de tableau des landings : clé de message → machine du référentiel. */
const GABARITS: [string, string][] = [
  ['packshotMode.studios.rows.alphatable.gabarit', 'alphatable'],
  ['packshotMode.studios.rows.xxl.gabarit', 'alphastudio-xxl-v2'],
  ['packshotMode.studios.rows.xlg2.gabarit', 'alphashot-xl-g2'],
  ['packshotMode.studios.rows.prog2.gabarit', 'alphashot-pro-g2'],
  ['packshotMode.studios.rows.micro.gabarit', 'alphashot-micro-v2'],
  ['packshotEcommerce.r7.rows.micro.gabarit', 'alphashot-micro-v2'],
  ['packshotEcommerce.r7.rows.a360.gabarit', 'alphashot-360'],
  ['packshotEcommerce.r7.rows.prog2.gabarit', 'alphashot-pro-g2'],
  ['packshotEcommerce.r7.rows.xlg2.gabarit', 'alphashot-xl-g2'],
  ['packshotEcommerce.r7.rows.compact.gabarit', 'alphastudio-compact-v2'],
  ['packshotEcommerce.r7.rows.xxl.gabarit', 'alphastudio-xxl-v2'],
  ['packshotEcommerce.r7.rows.alphatable.gabarit', 'alphatable'],
  ['packshotEcommerce.r7.rows.furniture.gabarit', 'furniture-studio'],
  ['industrieDefense.faq.q7.answer', 'alphastudio-xxl-v2'],
];

/** Blocs de messages dont chaque triplet doit appartenir à une machine du référentiel. */
const BLOCS_SURVEILLES = ['packshotMode', 'packshotEcommerce', 'industrieDefense', 'blogComparatif'];

describe('Landings et traductions', () => {
  for (const langue of LANGUES) {
    it(`${langue} : chaque ligne de tableau des landings = référentiel`, () => {
      for (const [cle, id] of GABARITS) {
        const valeur = lire(messages[langue], cle);
        expect(typeof valeur, `${langue} ${cle}`).toBe('string');
        const texte = valeur as string;
        const f = ficheTechnique(id)!;
        const connu = ECARTS_MESSAGES.find((e) => e.cle === cle);
        const triplets = extraireTriplets(texte);
        const longueur = extraireLongueurMax(texte);
        if (triplets.length > 0) {
          expect(memeTriplet(triplets[0], tripletDe(f.psc.objetMax)), `${langue} ${cle} : ${texte}`).toBe(true);
        } else if (longueur !== null) {
          expect(longueur, `${langue} ${cle}`).toBe(Math.max(...tripletDe(f.psc.objetMax)));
        } else {
          expect(connu, `${langue} ${cle} : ni dimension ni écart inscrit — « ${texte} »`).toBeDefined();
        }
        const kg = extraireKg(texte);
        if (kg.length > 0 && !connu) expect(kg[0], `${langue} ${cle}`).toBe(f.psc.chargeKg);
      }
    });

    it(`${langue} : tout triplet des blocs ${BLOCS_SURVEILLES.join(', ')} appartient à une machine`, () => {
      const connus = FICHES_TECHNIQUES.flatMap((f) => [tripletDe(f.psc.objetMax), ...(f.psc.encombrement ? [tripletDe(f.psc.encombrement)] : [])]);
      for (const bloc of BLOCS_SURVEILLES) {
        for (const [cle, texte] of chaines(messages[langue][bloc], bloc)) {
          for (const t of extraireTriplets(texte)) {
            expect(connus.some((c) => memeTriplet(c, t)), `${langue} ${cle} : ${t.join(' × ')} cm`).toBe(true);
          }
        }
      }
    });
  }

  it('FR, EN et de-ch portent les mêmes nombres pour chaque ligne surveillée', () => {
    for (const [cle] of GABARITS) {
      const nombres = LANGUES.map((l) => {
        const texte = String(lire(messages[l], cle) ?? '');
        return JSON.stringify({ t: extraireTriplets(texte).map((t) => trier(t)), kg: extraireKg(texte), max: extraireLongueurMax(texte) });
      });
      expect(new Set(nombres).size, `${cle} : ${nombres.join(' | ')}`).toBe(1);
    }
  });
});

describe('Valeurs retirées', () => {
  const RACINES = ['app', 'components', 'lib', 'messages', 'content', 'data'];
  const IGNORES = new Set(['data/produits/fiches-techniques.ts']);

  function fichiers(dossier: string): string[] {
    const absolu = path.join(ROOT, dossier);
    if (!fs.existsSync(absolu)) return [];
    return fs.readdirSync(absolu, { withFileTypes: true }).flatMap((e) => {
      const rel = path.join(dossier, e.name);
      if (e.isDirectory()) return e.name === '__tests__' || e.name === 'node_modules' ? [] : fichiers(rel);
      return /\.(tsx?|json|md|mdx|txt)$/.test(e.name) ? [rel] : [];
    });
  }

  it('aucune valeur retirée ne réapparaît (XXL 100 × 70 × 190 cm)', () => {
    const trouvees: string[] = [];
    for (const fichier of RACINES.flatMap(fichiers)) {
      if (IGNORES.has(fichier)) continue;
      const texte = fs.readFileSync(path.join(ROOT, fichier), 'utf8');
      for (const t of extraireTriplets(texte, { sansUnite: true })) {
        for (const r of VALEURS_RETIREES) {
          if (memeTriplet(t, r.triplet)) trouvees.push(`${fichier} : ${t.join('×')}`);
        }
      }
      for (const m of ROI) {
        // dimensionsMax écrit en objet : { l: 100, w: 70, h: 190 }
        const objet = VALEURS_RETIREES.find((r) => r.id === m.id);
        if (objet && memeTriplet(tripletDe(m.dimensionsMax), objet.triplet)) trouvees.push(`${m.id} : dimensionsMax`);
      }
    }
    expect(trouvees).toEqual([]);
  });
});

describe('Fonctions de recommandation : valeurs réellement consommées', () => {
  const critere = (dims?: { l: number; w: number; h: number }, kg?: number): SelectionCriteria => ({
    productDimensions: dims,
    productWeight: kg,
    annualVolume: 30000,
    contentTypes: ['packshot'],
  });
  const tient = (id: string, dims?: { l: number; w: number; h: number }, kg?: number) => {
    const r = evaluateMachine(ROI.find((m) => m.id === id)!, critere(dims, kg));
    return !r.missingCriteria.includes('Dimensions produit trop grandes') && !r.missingCriteria.includes('Poids produit trop élevé');
  };

  it('Alphastudio XXL (version documentée 100 × 90 × 190) : 90 cm accepté, 91 cm refusé', () => {
    expect(tient('alphastudio-xxl-v2', { l: 100, w: 90, h: 190 })).toBe(true);
    expect(tient('alphastudio-xxl-v2', { l: 100, w: 91, h: 190 })).toBe(false);
    expect(tient('alphastudio-xxl-v2', { l: 100, w: 70, h: 190 })).toBe(true);
  });

  it('Alphastudio XXL : rotation du produit prise en compte', () => {
    expect(tient('alphastudio-xxl-v2', { l: 190, w: 100, h: 90 })).toBe(true);
    expect(tient('alphastudio-xxl-v2', { l: 90, w: 190, h: 100 })).toBe(true);
    expect(tient('alphastudio-xxl-v2', { l: 191, w: 100, h: 90 })).toBe(false);
    expect(tient('alphastudio-xxl-v2', { l: 190, w: 101, h: 90 })).toBe(false);
  });

  it('Alphastudio XXL : 100 kg accepté, 101 kg refusé', () => {
    expect(tient('alphastudio-xxl-v2', undefined, 100)).toBe(true);
    expect(tient('alphastudio-xxl-v2', undefined, 101)).toBe(false);
  });

  it('chaque machine accepte son objet maximal et refuse 1 cm de plus sur la plus grande dimension', () => {
    for (const m of ROI) {
      const d = m.dimensionsMax;
      expect(tient(m.id, d), m.id).toBe(true);
      const [a, b, c] = [d.l, d.w, d.h].sort((x, y) => y - x);
      expect(tient(m.id, { l: a + 1, w: b, h: c }), m.id).toBe(false);
    }
  });

  it('chaque machine à charge chiffrée accepte sa charge et refuse 1 kg de plus', () => {
    for (const m of ROI.filter((x) => x.poidsMaxKg > 0)) {
      expect(tient(m.id, undefined, m.poidsMaxKg), m.id).toBe(true);
      expect(tient(m.id, undefined, m.poidsMaxKg + 1), m.id).toBe(false);
    }
  });
});

describe('Écarts commerciaux entre catalogues (hors dimensions)', () => {
  it('seuls les écarts inscrits dans data/produits/ecarts-connus.ts existent, et ils existent tous', () => {
    const constates: string[] = [];
    for (const s of SELECTEUR) {
      const r = ROI.find((m) => m.id === s.id)!;
      for (const champ of ['tailleCategories', 'capaciteJour'] as const) {
        if (JSON.stringify(s[champ]) !== JSON.stringify(r[champ])) {
          constates.push(`${s.id}.${champ} ${JSON.stringify(s[champ])} / ${JSON.stringify(r[champ])}`);
        }
      }
    }
    const inscrits = ECARTS_CATALOGUES.map((e) => `${e.id}.${e.champ} ${JSON.stringify(e.selecteur)} / ${JSON.stringify(e.roi)}`);
    expect(constates.sort()).toEqual(inscrits.sort());
  });
});
