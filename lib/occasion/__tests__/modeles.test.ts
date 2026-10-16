/**
 * Présentation de trois modèles Orbitvu sur la landing d'occasion (décision de
 * Laurent, 16/10/2026) : Alphadesk (showroom), Alphashot Micro v2 (démonstrations
 * clients), Alphastudio XXL v2 (retour de salon). Présentation de MODÈLES, pas un
 * stock : aucun prix, aucune valeur fictive des exemples, aucune disponibilité
 * annoncée, aucun balisage `Offer`. Aucun réseau, aucun e-mail.
 */
import { describe, it, expect, vi } from 'vitest';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import OccasionOrbitvu from '@/components/landings/occasion/OccasionOrbitvu';
import { versCartes } from '@/components/landings/occasion/cartes';
import { contenuOccasion } from '@/components/landings/occasion/contenu';
import { FR } from '@/components/landings/occasion/contenu-fr';
import { EN } from '@/components/landings/occasion/contenu-en';
import { DE_CH } from '@/components/landings/occasion/contenu-de-ch';
import { MODELES_PRESENTES } from '@/data/occasion/modeles';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { ficheTechnique } from '@/data/produits/fiches-techniques';
import { FAMILLES } from '@/lib/occasion/formulaires';
import { LANGUES_OCCASION } from '@/lib/occasion/langues';
import { synchroniserPrefixeModele } from '@/lib/occasion/prefixe-modele';

// Le lien localisé de next-intl demande un fournisseur de contexte : remplacé par un lien simple.
vi.mock('@/i18n/routing', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/i18n/routing')>();
  const { createElement: h } = await import('react');
  return {
    ...original,
    Link: ({ href, children, className }: { href: unknown; children?: ReactNode; className?: string }) =>
      h('a', { href: typeof href === 'string' ? href : '#', className }, children),
  };
});

const FERMEE = { active: false, jusqua: null };
const CONTENUS = { fr: FR, en: EN, 'de-ch': DE_CH } as const;
// Prix, remise, promotion, déstockage, reconditionnement, et valeurs fictives des exemples (OCC-0x, état, licence…).
const INTERDIT =
  /€|CHF|\$\s?\d|\d+\s?%|\bprix\b|\bprice|\bpreis|tarif|devis|quote|offerte|remise|discount|rabatt|promo|solde|sale\b|déstock|clearance|bonnes? affaires|bargain|schnäppchen|reconditionn|refurbish|aufbereit|OCC-0|inspect|licen[cs]e|lizenz|garanti|warrant|gewährleist|en stock|in stock|disponible maintenant/i;

function page(langue: (typeof LANGUES_OCCASION)[number], opts: { machines?: ReturnType<typeof versCartes>; apercuInterne?: boolean } = {}): string {
  return renderToStaticMarkup(
    createElement(OccasionOrbitvu, {
      machines: opts.machines ?? [],
      apercuInterne: opts.apercuInterne ?? false,
      vue: 'reel',
      nombreReel: 0,
      collecte: FERMEE,
      alertes: FERMEE,
      langue,
    }),
  );
}

/** Texte lu par le visiteur : contenu des balises, plus les textes alternatifs (jamais les classes CSS). */
function texteVisible(html: string): string {
  const alts = [...html.matchAll(/\balt="([^"]*)"/g)].map((r) => r[1]);
  return [html.replace(/<[^>]+>/g, ' '), ...alts].join(' ');
}

/** Texte de la section « modèles » seule (du début de la section jusqu'à la suivante). */
function sectionModeles(html: string): string {
  const debut = html.indexOf('id="modeles"');
  expect(debut, 'section modèles présente').toBeGreaterThan(-1);
  const fin = html.indexOf('id="recherche"', debut);
  return html.slice(debut, fin);
}

describe('Données : trois modèles validés par Laurent', () => {
  it('Alphadesk (showroom), Alphashot Micro v2 (démonstration), Alphastudio XXL v2 (salon), dans cet ordre', () => {
    expect(MODELES_PRESENTES.map((m) => [m.nom, m.origine])).toEqual([
      ['Alphadesk', 'showroom'],
      ['Alphashot Micro v2', 'demonstration'],
      ['Alphastudio XXL v2', 'salon'],
    ]);
    expect(MODELES_PRESENTES.map((m) => m.contextes.fr.origineDetail)).toEqual(['Showroom PackshotCreator', 'Démonstrations clients', 'Salon professionnel']);
    expect(MODELES_PRESENTES.map((m) => m.contextes.fr.usage)).toEqual(['Exposition et démonstrations', 'Bijoux et horlogerie', 'Présentation sur stand']);
  });

  it('chaque modèle existe dans le référentiel D45 et ses caractéristiques en proviennent', () => {
    for (const m of MODELES_PRESENTES) {
      const fiche = ficheTechnique(m.modeleId);
      expect(fiche, m.id).toBeDefined();
      const fab = fiche!.fabricant;
      expect(fab, m.id).not.toBeNull();
      const kg = fab!.charges[0].kg;
      for (const langue of LANGUES_OCCASION) expect(m.contextes[langue].charge, `${m.id} ${langue}`).toBe(`${kg} kg`);
    }
    const objet = (id: string) => ficheTechnique(id)!.fabricant!.objetMax;
    expect(MODELES_PRESENTES[0].contextes.fr.objet).toBe(objet('alphadesk')!.join(' × ') + ' cm');
    expect(MODELES_PRESENTES[2].contextes.fr.objet).toBe(objet('alphastudio-xxl-v2')!.join(' × ') + ' cm');
    // Micro v2 : la fiche Orbitvu ne donne qu'une longueur (« up to 18 cm long »), pas de triplet.
    expect(ficheTechnique('alphashot-micro-v2')!.fabricant!.objetMaxTexte).toBe('up to 18 cm long');
    expect(MODELES_PRESENTES[1].contextes.fr.objet).toBe('18 cm de long');
  });

  it('famille présélectionnée valide ; visuel du modèle présent dans public/, texte alternatif dans chaque langue', () => {
    for (const m of MODELES_PRESENTES) {
      expect((FAMILLES as readonly string[]).includes(m.famille), m.id).toBe(true);
      expect(existsSync(join(process.cwd(), 'public', m.visuel.src)), m.visuel.src).toBe(true);
      for (const langue of LANGUES_OCCASION) {
        expect(m.visuel.alt[langue].trim(), `${m.id} ${langue}`).not.toBe('');
        expect(m.visuel.alt[langue], `${m.id} ${langue}`).toContain(m.nom);
      }
    }
  });

  it('contextes EN et DE-CH réellement traduits, identiques aux textes des exemples (même vocabulaire validé)', () => {
    const ex = exemplesFictifs(new Date('2026-10-11T12:00:00Z'));
    for (const langue of ['en', 'de-ch'] as const) {
      const cartes = versCartes(ex, langue);
      expect(MODELES_PRESENTES.map((m) => m.contextes[langue].usage), langue).toEqual(cartes.map((c) => c.usage));
      expect(MODELES_PRESENTES.map((m) => m.contextes[langue].origineDetail), langue).not.toEqual(MODELES_PRESENTES.map((m) => m.contextes.fr.origineDetail));
    }
  });

  it('aucune valeur fictive reprise : aucun prix, aucune référence, aucun état, aucune licence, aucune garantie', () => {
    for (const m of MODELES_PRESENTES) {
      const texte = JSON.stringify(m);
      expect(texte, m.id).not.toMatch(INTERDIT);
      expect(Object.keys(m).sort(), m.id).toEqual(['contextes', 'famille', 'id', 'modeleId', 'nom', 'origine', 'visuel']);
    }
  });

  it('le registre réel reste séparé et vide : aucune machine réelle inventée', () => {
    expect(MACHINES_OCCASION).toHaveLength(0);
  });
});

describe('Textes de la section dans les trois langues', () => {
  it('aucun prix, promotion, déstockage ni reconditionnement ; aucune disponibilité annoncée', () => {
    for (const [langue, c] of Object.entries(CONTENUS)) {
      const texte = [c.MODELES.surtitre, c.MODELES.titre, c.MODELES.texte, ...Object.values(c.MODELES.libelles), c.MODELES.bouton, c.MODELES.besoin, c.MODELES.credit].join(' ');
      expect(texte, langue).not.toMatch(INTERDIT);
    }
  });

  it('le texte dit que les visuels illustrent le modèle et que la disponibilité d\'une unité est confirmée sur demande', () => {
    expect(FR.MODELES.texte).toMatch(/illustrent le modèle/);
    expect(FR.MODELES.texte).toMatch(/confirmée sur demande/);
    expect(EN.MODELES.texte).toMatch(/illustrate the model/);
    expect(EN.MODELES.texte).toMatch(/confirmed on request/);
    expect(DE_CH.MODELES.texte).toMatch(/zeigen das Modell/);
    expect(DE_CH.MODELES.texte).toMatch(/auf Anfrage bestätigt/);
  });

  it('le début de texte proposé par le bouton contient le nom du modèle dans chaque langue', () => {
    for (const [langue, c] of Object.entries(CONTENUS)) {
      expect(c.MODELES.besoin, langue).toContain('{nom}');
      expect(c.MODELES.besoin.replace('{nom}', 'Alphadesk').trim().length, langue).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('Rendu de la landing sans stock (état réel au 16/10/2026)', () => {
  it.each(LANGUES_OCCASION)('%s : trois cartes visibles, dans l\'ordre, entre le hero et la recherche, sans aucun prix', (langue) => {
    const html = page(langue);
    const bloc = sectionModeles(html);
    const c = CONTENUS[langue];
    expect(html.indexOf('id="occasion-titre"')).toBeLessThan(html.indexOf('id="modeles"'));
    expect(html.indexOf('id="modeles"')).toBeLessThan(html.indexOf('id="recherche"'));
    expect(bloc).toContain(c.MODELES.titre.replace(/'/g, '&#x27;'));
    const ids = [...bloc.matchAll(/data-modele-id="([^"]+)"/g)].map((r) => r[1]);
    expect(ids).toEqual(['alphadesk', 'alphashot-micro-v2', 'alphastudio-xxl-v2']);
    for (const m of MODELES_PRESENTES) {
      const x = m.contextes[langue];
      expect(bloc, `${langue} ${m.id}`).toContain(m.nom);
      expect(bloc, `${langue} ${m.id}`).toContain(x.origineDetail);
      expect(bloc, `${langue} ${m.id}`).toContain(x.usage);
      expect(bloc, `${langue} ${m.id}`).toContain(x.charge);
      expect(bloc, `${langue} ${m.id}`).toContain(m.visuel.src.split('/').pop()!);
    }
    expect((bloc.match(/data-modele="/g) ?? []).length).toBe(3);
    expect(texteVisible(bloc)).not.toMatch(INTERDIT);
    // Ni référence d'unité (OCC-), ni mention fictive, ni disponibilité d'unité.
    expect(html).not.toMatch(/OCC-0|Exemple fictif|Fictitious example|Fiktives Beispiel/);
  });

  it.each(LANGUES_OCCASION)('%s : la présentation de modèles n\'est qu\'un affichage — aucune donnée structurée, aucun Offer', (langue) => {
    const html = page(langue);
    expect(html).not.toMatch(/application\/ld\+json|schema\.org|"Offer"|itemprop|\bOffer\b/);
  });

  it.each(LANGUES_OCCASION)('%s : la recherche reste fonctionnelle, les alertes restent masquées en vue publique', (langue) => {
    const html = page(langue);
    expect(html).toContain('id="recherche"');
    expect(html).toContain('<form');
    expect(html).not.toContain('id="alertes"');
    expect(html).not.toContain('data-test="alt-alerte"');
  });

  it('aperçu interne : les trois cartes sont aussi présentes, l\'état reste « vide »', () => {
    const html = page('fr', { apercuInterne: true });
    expect(html).toContain('data-etat="vide"');
    expect(sectionModeles(html)).toContain('data-modele-id="alphadesk"');
  });

  it('avec des machines réelles affichées, la présentation de modèles disparaît (jamais deux présentations)', () => {
    const cartes = versCartes(exemplesFictifs(new Date('2026-10-11T12:00:00Z')), 'fr');
    const html = page('fr', { machines: cartes });
    expect(html).not.toContain('id="modeles"');
    expect(html).not.toContain('data-modele-id');
    expect(html).toContain('id="machines"');
  });
});

describe('Code de la section : aucune mention de prix, aucun balisage', () => {
  const codeSeul = (f: string) =>
    readFileSync(join(process.cwd(), f), 'utf8')
      .split('\n')
      .filter((l) => !/^\s*(\*|\/\/|\/\*\*)/.test(l))
      .join('\n');

  it('ModelesOccasion et modeles.ts : ni prix, ni Offer, ni Product, ni donnée structurée', () => {
    for (const f of ['components/landings/occasion/ModelesOccasion.tsx', 'data/occasion/modeles.ts']) {
      expect(codeSeul(f), f).not.toMatch(/price|prix|Offer|Product|ld\+json|availability/i);
    }
  });
});

describe('V9 (16/10) — badges : cadres d\'usage, jamais l\'origine ni l\'existence d\'une unité', () => {
  const ORIGINE_OU_UNITE = /retour|ancien|former|back from|ehemalig|rückläufer|demogerät|demo machine|machine de démonstration|\bunit\b|unité|gerät\b/i;

  it('trois badges de contexte par langue, sans formule d\'origine ni d\'unité précise', () => {
    for (const [langue, c] of Object.entries(CONTENUS)) {
      expect(Object.keys(c.MODELES.badges), langue).toEqual(['showroom', 'demonstration', 'salon']);
      for (const [cadre, badge] of Object.entries(c.MODELES.badges)) expect(badge, `${langue} ${cadre}`).not.toMatch(ORIGINE_OU_UNITE);
    }
    expect(Object.values(DE_CH.MODELES.badges)).toEqual(['Showroom-Präsentation', 'Vorführung', 'Messepräsentation']);
  });

  it('rendu : chaque carte porte le badge de son cadre, « Messerückläufer » n\'apparaît nulle part', () => {
    for (const langue of LANGUES_OCCASION) {
      const html = page(langue);
      const bloc = sectionModeles(html);
      const { MODELES } = contenuOccasion(langue);
      for (const m of MODELES_PRESENTES) expect(texteVisible(bloc), `${langue} ${m.id}`).toContain(MODELES.badges[m.origine]);
      expect(html, langue).not.toContain('Messerückläufer');
      // Anciens badges d'origine (ORIGINES[...].carte) : absents de la section.
      for (const o of ['showroom', 'demonstration', 'salon'] as const) expect(texteVisible(bloc), `${langue} ${o}`).not.toContain(contenuOccasion(langue).ORIGINES[o].carte);
    }
    expect(texteVisible(sectionModeles(page('de-ch')))).toContain('Messepräsentation');
  });

  it('la ligne de fiche s\'intitule « Contexte », plus « Origine » (aucune origine d\'unité certifiée)', () => {
    expect([FR.MODELES.libelles.contexte, EN.MODELES.libelles.contexte, DE_CH.MODELES.libelles.contexte]).toEqual(['Contexte', 'Context', 'Kontext']);
    for (const langue of LANGUES_OCCASION) {
      const texte = texteVisible(sectionModeles(page(langue)));
      expect(texte, langue).not.toMatch(/\bOrigine\b|\bOrigin\b|\bHerkunft\b/);
    }
  });

  it('aucune garantie attribuée aux trois illustrations ; la section générale sur la garantie des machines réelles est conservée', () => {
    for (const langue of LANGUES_OCCASION) {
      const html = page(langue);
      expect(texteVisible(sectionModeles(html)), langue).not.toMatch(/garanti|warrant|gewährleist/i);
      expect(html, langue).toContain(contenuOccasion(langue).GARANTIE.titre.replace(/'/g, '&#x27;'));
    }
  });
});

describe('V9 (16/10) — préfixe automatique du message : le dernier modèle choisi fait foi', () => {
  const A = 'Informations sur le modèle Alphadesk.';
  const B = 'Informations sur le modèle Alphashot Micro v2.';
  const C = 'Informations sur le modèle Alphastudio XXL v2.';

  it('champ vide : le préfixe est inséré et suivi', () => {
    expect(synchroniserPrefixeModele('', null, A)).toEqual({ texte: A, prefixe: A });
    expect(synchroniserPrefixeModele('   ', null, A)).toEqual({ texte: A, prefixe: A });
  });

  it('clics successifs sans saisie : le préfixe suit le dernier modèle', () => {
    let etat = synchroniserPrefixeModele('', null, A);
    etat = synchroniserPrefixeModele(etat.texte, etat.prefixe, B);
    expect(etat).toEqual({ texte: B, prefixe: B });
    etat = synchroniserPrefixeModele(etat.texte, etat.prefixe, C);
    expect(etat).toEqual({ texte: C, prefixe: C });
    etat = synchroniserPrefixeModele(etat.texte, etat.prefixe, C);
    expect(etat.texte).toBe(C);
  });

  it('texte du visiteur après le préfixe : conservé intégralement, seul le préfixe change', () => {
    const perso = `${A} Je cherche un studio pour des montres, livraison en Suisse.\nMerci de me rappeler.`;
    const etat = synchroniserPrefixeModele(perso, A, B);
    expect(etat.texte).toBe(`${B} Je cherche un studio pour des montres, livraison en Suisse.\nMerci de me rappeler.`);
    expect(etat.prefixe).toBe(B);
    const suite = synchroniserPrefixeModele(etat.texte, etat.prefixe, C);
    expect(suite.texte).toBe(`${C} Je cherche un studio pour des montres, livraison en Suisse.\nMerci de me rappeler.`);
  });

  it('texte rédigé avant tout clic, préfixe modifié ou supprimé par le visiteur : jamais touché', () => {
    const redige = 'Bonjour, je souhaite un devis pour un studio de bijoux.';
    expect(synchroniserPrefixeModele(redige, null, A)).toEqual({ texte: redige, prefixe: null });
    const modifie = 'Informations sur le modèle Alphadesk, pour juin. Merci.';
    expect(synchroniserPrefixeModele(modifie, A, B)).toEqual({ texte: modifie, prefixe: null });
    const decale = `Bonjour. ${A}`;
    expect(synchroniserPrefixeModele(decale, A, B)).toEqual({ texte: decale, prefixe: null });
    // Une fois le préfixe perdu, les clics suivants ne réécrivent plus rien.
    expect(synchroniserPrefixeModele(modifie, null, C).texte).toBe(modifie);
  });

  it('dans chaque langue : la séquence réelle des trois clics, avec saisie personnelle entre deux', () => {
    for (const langue of LANGUES_OCCASION) {
      const { MODELES } = contenuOccasion(langue);
      const prefixes = MODELES_PRESENTES.map((m) => MODELES.besoin.replace('{nom}', m.nom));
      let etat = synchroniserPrefixeModele('', null, prefixes[0]);
      etat = synchroniserPrefixeModele(etat.texte + ' Mon texte.', etat.prefixe, prefixes[1]);
      etat = synchroniserPrefixeModele(etat.texte, etat.prefixe, prefixes[2]);
      expect(etat.texte, langue).toBe(`${prefixes[2]} Mon texte.`);
    }
  });
});

describe('V9 (16/10) — mise en page mobile et câblage du formulaire', () => {
  const codeSeul = (f: string) =>
    readFileSync(join(process.cwd(), f), 'utf8')
      .split('\n')
      .filter((l) => !/^\s*(\*|\/\/|\/\*\*)/.test(l))
      .join('\n');

  it('cartes : colonne de texte bornée (minmax(0,1fr), min-w-0), retour à la ligne, lignes empilées en de-ch jusqu\'à lg', () => {
    const src = codeSeul('components/landings/occasion/ModelesOccasion.tsx');
    expect(src).toContain('grid-cols-[40%_minmax(0,1fr)]');
    expect(src).toContain('flex min-w-0 flex-1');
    expect(src).toContain('break-words');
    expect(src).toMatch(/'de-ch': \{ dl: 'grid-cols-\[minmax\(0,1fr\)\] gap-y-0 lg:grid-cols-\[auto_1fr\]/);
    expect(src).toContain("autre: {");
    expect(src).toContain('min-[380px]:grid-cols-[auto_1fr]');
    // Aucun texte masqué : pas de `hidden`, `truncate` ni `line-clamp` dans les cartes.
    expect(src).not.toMatch(/\bhidden\b[^\n]*\{MODELES\.(libelles|badges)|truncate|line-clamp/);
  });

  it('formulaire : famille toujours alignée sur le dernier modèle, préfixe synchronisé par la fonction dédiée, schéma et envoi inchangés', () => {
    const src = codeSeul('components/landings/occasion/FormulaireRecherche.tsx');
    expect(src).toContain("setValue('famille', famille as (typeof FAMILLES)[number]);");
    expect(src).toContain('synchroniserPrefixeModele(getValues(\'besoin\'), prefixeModele.current, besoin)');
    expect(src).toContain('prefixeModele.current = prefixe;');
    expect(src).not.toContain("if (!getValues('besoin').trim()) setValue('besoin', besoin);");
  });
});
