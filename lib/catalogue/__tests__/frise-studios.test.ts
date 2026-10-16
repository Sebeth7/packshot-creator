/**
 * Frise des studios de la landing catalogue (V4, ruban continu en V5) : données tirées
 * de MACHINES et de getMachineImage, sans référence retirée du catalogue, images
 * présentes sur disque, gabarit croissant avec la taille des produits.
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { getMachineImage } from '@/lib/machine-images';
import { EXCLUSIONS_FRISE, familleStudio, gabaritStudio, studiosGamme } from '@/components/landings/catalogue-all-in-one/studios';

const studios = studiosGamme();

describe('frise des studios', () => {
  it('aucune référence retirée du catalogue (delisted)', () => {
    const retirees = new Set(MACHINES.filter((m) => m.delisted).map((m) => m.id));
    expect(studios.filter((s) => retirees.has(s.id))).toEqual([]);
  });

  it('toutes les références au catalogue, moins les exclusions motivées, dans l’ordre de MACHINES', () => {
    const attendues = MACHINES.filter((m) => !m.delisted && !(m.id in EXCLUSIONS_FRISE)).map((m) => m.id);
    expect(studios.map((s) => s.id)).toEqual(attendues);
    expect(studios.map((s) => s.id)).toEqual([
      'alphashot-micro-v2',
      'alphashot-360',
      'alphashot-pro-g2',
      'alphashot-xl-pro-v2',
      'alphatable',
      'alphastudio-compact-v2',
      'bike-studio',
      'furniture-studio',
      'e-comm-studio-plus',
    ]);
  });

  it('chaque exclusion vise une référence au catalogue et porte un motif', () => {
    for (const [id, motif] of Object.entries(EXCLUSIONS_FRISE)) {
      const machine = MACHINES.find((m) => m.id === id);
      expect(machine, id).toBeDefined();
      expect(machine?.delisted, id).toBeFalsy();
      expect(motif.length, id).toBeGreaterThan(5);
    }
  });

  it('XL G2 et XL Pro v2 ne sont pas présentés côte à côte comme équivalents (D29)', () => {
    const ids = studios.map((s) => s.id);
    expect(ids).toContain('alphashot-xl-pro-v2');
    expect(ids).not.toContain('alphashot-xl-g2');
  });

  it('noms exacts de MACHINES et images issues de getMachineImage, présentes sur disque', () => {
    for (const s of studios) {
      const machine = MACHINES.find((m) => m.id === s.id);
      expect(s.nom).toBe(machine?.nom);
      expect(s.image).toBe(getMachineImage(s.id));
      expect(s.image).not.toMatch(/placeholder/);
      expect(existsSync(path.join(process.cwd(), 'public', s.image)), s.image).toBe(true);
    }
  });

  it('familles d’usage tirées des données, sans chiffre', () => {
    expect(Object.fromEntries(studios.map((s) => [s.id, s.famille]))).toEqual({
      'alphashot-micro-v2': 'Petits produits',
      'alphashot-360': 'Petits produits',
      'alphashot-pro-g2': 'Petits produits',
      'alphashot-xl-pro-v2': 'Produits moyens',
      alphatable: 'Prise de vue à plat',
      'alphastudio-compact-v2': 'Grands produits',
      'bike-studio': 'Très grands produits',
      'furniture-studio': 'Très grands produits',
      'e-comm-studio-plus': 'Très grands produits',
    });
    expect(familleStudio({ tailleCategories: ['moyen', 'grand'], features: ['packshot'] })).toBe(
      'Produits moyens à grands produits',
    );
    for (const s of studios) expect(s.famille).not.toMatch(/\d/);
  });

  it('gabarit du visuel : la plus grande catégorie de taille traitée', () => {
    expect(Object.fromEntries(studios.map((s) => [s.id, s.gabarit]))).toEqual({
      'alphashot-micro-v2': 'petit',
      'alphashot-360': 'petit',
      'alphashot-pro-g2': 'petit',
      'alphashot-xl-pro-v2': 'moyen',
      alphatable: 'grand',
      'alphastudio-compact-v2': 'grand',
      'bike-studio': 'tres-grand',
      'furniture-studio': 'tres-grand',
      'e-comm-studio-plus': 'tres-grand',
    });
    expect(gabaritStudio({ tailleCategories: [] })).toBe('moyen');
  });
});
