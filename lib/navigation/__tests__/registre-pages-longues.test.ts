/**
 * Registre de la navigation des pages longues (règle D44) : les pages gelées par une
 * expérience SEO ou une PR ouverte ne reçoivent jamais la barre ; chaque exception est
 * motivée et datée. Depuis la décision du 15/10/2026, une page longue peut porter DEUX
 * navigations synchronisées (barre + sommaire latéral) : le déploiement est progressif,
 * piloté par `formeSecondeActive` / `navigationPageLongue` (Phase A ci-dessous).
 */

import { describe, it, expect } from 'vitest';
import {
  NAVIGATION_PAGES_LONGUES,
  barreActive,
  formeSecondeActive,
  navigationPageLongue,
  LIBELLES_BARRE,
  LIBELLES_LATERAL,
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

  it('landing Studios : barre sur la page FR seulement (#108), EN et de-ch sur leur gabarit transitoire', () => {
    expect(barreActive('landing-gamme', 'fr', 'studios-photo-automatises')).toBe(true);
    expect(barreActive('landing-gamme', 'en', 'studios-photo-automatises')).toBe(false);
    expect(barreActive('landing-gamme', 'de-ch', 'studios-photo-automatises')).toBe(false);
    // Aucune autre page de la famille n’est équipée.
    for (const l of LANGUES) expect(barreActive('landing-gamme', l, 'landing-future')).toBe(false);
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

  it('une famille inconnue ne reçoit pas la barre', () => {
    expect(barreActive('famille-inexistante', 'fr', 'x')).toBe(false);
  });
});

describe('Double navigation D44 (Phase A) : seconde forme et vue d’ensemble', () => {
  it('guide pilote : barre + sommaire latéral (FR et EN), une seule page de la famille', () => {
    expect(formeSecondeActive('guide', 'fr', 'comment-faire-focus-stacking-pour-photographier-bague')).toBe('laterale');
    expect(formeSecondeActive('guide', 'en', 'how-to-do-focus-stacking-for-ring-photography')).toBe('laterale');
    expect(navigationPageLongue('guide', 'fr', 'comment-faire-focus-stacking-pour-photographier-bague')).toEqual({
      barre: true,
      laterale: true,
    });
    // Un autre guide garde la barre seule tant que la généralisation (Phase B) n’est pas faite.
    expect(formeSecondeActive('guide', 'fr', 'guide-futur')).toBeNull();
    expect(navigationPageLongue('guide', 'fr', 'guide-futur')).toEqual({ barre: true, laterale: false });
  });

  it('fiche pilote : barre + sommaire latéral (toutes langues), une seule fiche', () => {
    for (const l of LANGUES) {
      expect(formeSecondeActive('fiche-machine', l, 'alphashot-pro-g2')).toBe('laterale');
      expect(navigationPageLongue('fiche-machine', l, 'alphashot-pro-g2')).toEqual({ barre: true, laterale: true });
    }
    expect(formeSecondeActive('fiche-machine', 'fr', 'machine-future')).toBeNull();
    expect(navigationPageLongue('fiche-machine', 'fr', 'machine-future')).toEqual({ barre: true, laterale: false });
  });

  it('blog pilote : sommaire latéral existant + barre ajoutée (FR et EN), un seul article', () => {
    expect(formeSecondeActive('blog-commun', 'fr', 'images-ia-metadonnees-marketplaces')).toBe('barre');
    expect(formeSecondeActive('blog-commun', 'en', 'ai-product-images-metadata-marketplaces')).toBe('barre');
    expect(navigationPageLongue('blog-commun', 'fr', 'images-ia-metadonnees-marketplaces')).toEqual({
      barre: true,
      laterale: true,
    });
    // Les autres articles gardent le sommaire latéral seul, sans barre.
    expect(formeSecondeActive('blog-commun', 'fr', 'eclairage-photos-produits')).toBeNull();
    expect(navigationPageLongue('blog-commun', 'fr', 'eclairage-photos-produits')).toEqual({
      barre: false,
      laterale: true,
    });
  });

  it('une page gelée ne reçoit jamais la seconde forme', () => {
    // Guide gelé par #27 (FR) : ni barre, ni seconde forme.
    expect(formeSecondeActive('guide', 'fr', 'comment-faire-photos-multi-angles-chaussures')).toBeNull();
    // Familles gelées / exclues.
    for (const l of LANGUES) {
      expect(formeSecondeActive('landing-mode', l, 'packshot-mode')).toBeNull();
      expect(formeSecondeActive('hub-sectoriel', l, 'mode-textile')).toBeNull();
    }
  });

  it('landing Studios pilote : barre + sommaire latéral sur la page FR seulement (#108)', () => {
    expect(formeSecondeActive('landing-gamme', 'fr', 'studios-photo-automatises')).toBe('laterale');
    expect(navigationPageLongue('landing-gamme', 'fr', 'studios-photo-automatises')).toEqual({
      barre: true,
      laterale: true,
    });
    for (const l of ['en', 'de-ch'] as const) {
      expect(formeSecondeActive('landing-gamme', l, 'studios-photo-automatises')).toBeNull();
      expect(navigationPageLongue('landing-gamme', l, 'studios-photo-automatises')).toEqual({
        barre: false,
        laterale: false,
      });
    }
    for (const l of LANGUES) expect(formeSecondeActive('landing-gamme', l, 'landing-future')).toBeNull();
  });

  it('les noms accessibles de la barre et du sommaire latéral restent distincts (deux repères)', () => {
    for (const l of LANGUES) expect(LIBELLES_LATERAL[l]).not.toBe(LIBELLES_BARRE[l].libelle);
  });

  it('une famille sans seconde forme déclarée n’en reçoit pas', () => {
    expect(formeSecondeActive('solution', 'fr', 'solution-future')).toBeNull();
    expect(formeSecondeActive('famille-inexistante', 'fr', 'x')).toBeNull();
  });
});
