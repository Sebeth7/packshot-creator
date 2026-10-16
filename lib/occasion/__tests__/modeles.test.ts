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
import { FR } from '@/components/landings/occasion/contenu-fr';
import { EN } from '@/components/landings/occasion/contenu-en';
import { DE_CH } from '@/components/landings/occasion/contenu-de-ch';
import { MODELES_PRESENTES } from '@/data/occasion/modeles';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { ficheTechnique } from '@/data/produits/fiches-techniques';
import { FAMILLES } from '@/lib/occasion/formulaires';
import { LANGUES_OCCASION } from '@/lib/occasion/langues';

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
