/**
 * Registre de la navigation des pages longues (règle D44) : les pages gelées par une
 * expérience SEO ou une PR ouverte ne reçoivent jamais la barre ; aucune famille à
 * sommaire latéral ne la reçoit ; chaque exception est motivée et datée.
 *
 * Navigation V9 (décision de Laurent du 16/10/2026) : la barre et le sommaire vertical à
 * droite peuvent coexister ; le sommaire vertical n'est activé que sur Studios FR, les
 * autres pages équipées attendent une validation distincte.
 */

import { describe, it, expect } from 'vitest';
import {
  NAVIGATION_PAGES_LONGUES,
  barreActive,
  sommaireLateralActif,
  LIBELLES_BARRE,
  LIBELLES_SOMMAIRE,
  type Langue,
} from '@/data/navigation/pages-longues';

const LANGUES: Langue[] = ['fr', 'en', 'de-ch'];

describe('Registre de la navigation des pages longues (D44)', () => {
  it('chaque exception porte un motif et une condition de sortie', () => {
    for (const r of NAVIGATION_PAGES_LONGUES) {
      for (const e of r.exceptions) {
        expect(e.motif.length, `${r.famille} ${e.slug}`).toBeGreaterThan(5);
        expect(e.jusqua.length, `${r.famille} ${e.slug}`).toBeGreaterThan(3);
      }
    }
  });

  it('les familles à sommaire latéral, statique ou sans navigation ne reçoivent jamais la barre', () => {
    for (const r of NAVIGATION_PAGES_LONGUES.filter((x) => x.forme !== 'barre')) {
      for (const l of LANGUES) expect(barreActive(r.famille, l, 'nimporte-quelle-page'), r.famille).toBe(false);
    }
  });

  it('pages témoins SEO gelées : Mode, F5, hub mode-textile, accueil', () => {
    for (const l of LANGUES) {
      expect(barreActive('landing-mode', l, 'packshot-mode')).toBe(false);
      expect(barreActive('landing-f5', l, 'packshot-e-commerce')).toBe(false);
      expect(barreActive('hub-sectoriel', l, 'mode-textile')).toBe(false);
      expect(barreActive('accueil', l, '')).toBe(false);
    }
  });

  it('Studios : barre sur la landing FR de #108 seulement (accord de Laurent du 16/10), gabarit transitoire EN et de-ch sans barre', () => {
    expect(barreActive('landing-gamme', 'fr', 'studios-photo-automatises')).toBe(true);
    expect(barreActive('landing-gamme', 'en', 'studios-photo-automatises')).toBe(false);
    expect(barreActive('landing-gamme', 'de-ch', 'studios-photo-automatises')).toBe(false);
  });

  it('navigation V9 : sommaire vertical à droite sur la landing Studios FR de #108 seulement', () => {
    expect(sommaireLateralActif('landing-gamme', 'fr', 'studios-photo-automatises')).toBe(true);
    expect(sommaireLateralActif('landing-gamme', 'en', 'studios-photo-automatises')).toBe(false);
    expect(sommaireLateralActif('landing-gamme', 'de-ch', 'studios-photo-automatises')).toBe(false);
  });

  it('navigation V9 : aucune autre famille ne reçoit le sommaire vertical (déploiement à valider séparément)', () => {
    const avecLateral = NAVIGATION_PAGES_LONGUES.filter((r) => r.lateral && r.lateral.length > 0).map((r) => r.famille);
    expect(avecLateral).toEqual(['landing-gamme']);
    for (const r of NAVIGATION_PAGES_LONGUES.filter((x) => x.famille !== 'landing-gamme')) {
      for (const l of LANGUES) expect(sommaireLateralActif(r.famille, l, 'nimporte-quelle-page'), r.famille).toBe(false);
    }
    for (const l of LANGUES) {
      expect(sommaireLateralActif('guide', l, 'comment-faire-focus-stacking-pour-photographier-bague')).toBe(false);
      expect(sommaireLateralActif('fiche-machine', l, 'alphashot-pro-g2')).toBe(false);
      expect(sommaireLateralActif('landing-ia', l, 'ia-photo-produit')).toBe(false);
    }
  });

  it('navigation V9 : le sommaire vertical a un nom de repère distinct de celui de la barre', () => {
    for (const l of LANGUES) expect(LIBELLES_SOMMAIRE[l].libelle).not.toBe(LIBELLES_BARRE[l].libelle);
  });

  it('contenus des PR ouvertes gelés (#27, #64)', () => {
    expect(barreActive('guide', 'fr', 'comment-faire-photos-multi-angles-chaussures')).toBe(false);
    expect(barreActive('guide', 'fr', 'comment-positionner-montre-avant-shooting-photo')).toBe(false);
    expect(barreActive('guide', 'fr', 'realiser-animation-360-professionnelle-chaussures')).toBe(false);
    for (const l of LANGUES) {
      expect(barreActive('blog-dedie-sans-sommaire', l, 'budget-studio-photo-automatise')).toBe(false);
      for (const slug of ['guide-achat-studio-2026', 'orbitvu-vs-concurrents', 'ia-photo-produit-guide-2026']) {
        expect(barreActive('blog-dedie-avec-sommaire', l, slug)).toBe(false);
      }
    }
  });

  it('guides de #91 équipés depuis sa fusion (06/10) : plus d’exception temporaire', () => {
    expect(barreActive('guide', 'fr', 'comment-creer-vues-multi-angles-automatique-objet')).toBe(true);
    expect(barreActive('guide', 'en', 'how-to-create-automatic-multi-angle-views-of-an-object')).toBe(true);
    expect(barreActive('guide', 'fr', 'comment-photographier-lunettes-e-commerce')).toBe(true);
  });

  it('pages pilotes équipées', () => {
    expect(barreActive('guide', 'fr', 'comment-faire-focus-stacking-pour-photographier-bague')).toBe(true);
    expect(barreActive('guide', 'en', 'how-to-do-focus-stacking-for-ring-photography')).toBe(true);
    expect(barreActive('blog-dedie-sans-sommaire', 'fr', 'studio-ia-vs-ia-generative')).toBe(true);
    expect(barreActive('blog-dedie-sans-sommaire', 'en', 'studio-ia-vs-ia-generative')).toBe(true);
    for (const l of LANGUES) expect(barreActive('fiche-machine', l, 'alphashot-pro-g2')).toBe(true);
  });

  it('familles généralisées : toute page d’une famille active reçoit la barre, y compris une page future', () => {
    for (const l of LANGUES) {
      expect(barreActive('guide', l, 'guide-futur')).toBe(true);
      expect(barreActive('fiche-machine', l, 'machine-future')).toBe(true);
      expect(barreActive('landing-ia', l, 'ia-photo-produit')).toBe(true);
      expect(barreActive('solution', l, 'solution-future')).toBe(true);
      expect(barreActive('blog-dedie-sans-sommaire', l, 'comparatif-orbitvu-ortery-styleshoots-2026')).toBe(true);
      expect(barreActive('blog-dedie-sans-sommaire', l, 'prestataire-packshot-vs-studio-interne')).toBe(false);
    }
    // #27 ne touche que les fichiers FR de ces guides : les versions EN restent équipées.
    expect(barreActive('guide', 'en', 'comment-faire-photos-multi-angles-chaussures')).toBe(true);
  });

  it('une famille inconnue ne reçoit ni la barre ni le sommaire vertical', () => {
    expect(barreActive('famille-inexistante', 'fr', 'x')).toBe(false);
    expect(sommaireLateralActif('famille-inexistante', 'fr', 'x')).toBe(false);
  });
});
