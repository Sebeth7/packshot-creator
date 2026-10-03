/**
 * Registre de la navigation des pages longues (règle D44) : les pages gelées par une
 * expérience SEO ou une PR ouverte ne reçoivent jamais la barre ; aucune famille à
 * sommaire latéral ne la reçoit ; chaque exception est motivée et datée.
 */

import { describe, it, expect } from 'vitest';
import { NAVIGATION_PAGES_LONGUES, barreActive, type Langue } from '@/data/navigation/pages-longues';

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

  it('pages pilotes équipées', () => {
    expect(barreActive('guide', 'fr', 'comment-faire-focus-stacking-pour-photographier-bague')).toBe(true);
    expect(barreActive('guide', 'en', 'how-to-do-focus-stacking-for-ring-photography')).toBe(true);
    expect(barreActive('blog-dedie-sans-sommaire', 'fr', 'studio-ia-vs-ia-generative')).toBe(true);
    expect(barreActive('blog-dedie-sans-sommaire', 'en', 'studio-ia-vs-ia-generative')).toBe(true);
    for (const l of LANGUES) expect(barreActive('fiche-machine', l, 'alphashot-pro-g2')).toBe(true);
  });

  it('une famille inconnue ne reçoit pas la barre', () => {
    expect(barreActive('famille-inexistante', 'fr', 'x')).toBe(false);
  });
});
