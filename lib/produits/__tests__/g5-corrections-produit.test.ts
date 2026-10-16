/**
 * Corrections produit G5 du 11/10/2026 (LOT-2 et LOT-6), sur preuves fabricant
 * non contradictoires seulement. Les points en HOLD (objet maximal du Furniture,
 * XXL, cadences, seuil de charge du Fashion, Alphashot G2) restent inchangés.
 */
import { describe, it, expect } from 'vitest';
import { MACHINES as ROI } from '@/components/calculators/ROICalculator/lib/machines';
import { MACHINES as SELECTEUR } from '@/components/machine-selector/lib/machines';
import { evaluateMachine } from '@/components/calculators/ROICalculator/lib/machineSelector';
import { ficheTechnique } from '@/data/produits/fiches-techniques';

const roi = (id: string) => ROI.find((m) => m.id === id)!;
const sel = (id: string) => SELECTEUR.find((m) => m.id === id)!;
const tient = (id: string, kg?: number, dims?: { l: number; w: number; h: number }) => {
  const r = evaluateMachine(roi(id), { productDimensions: dims, productWeight: kg, annualVolume: 30000, contentTypes: ['packshot'] });
  return !r.missingCriteria.includes('Dimensions produit trop grandes') && !r.missingCriteria.includes('Poids produit trop élevé');
};

describe('LOT-2 : XL Pro v2, XL G2, Furniture', () => {
  it('XL Pro v2 : objet affiché 50 × 30 × 70 (hauteur 70) dans les deux catalogues et la FAQ', () => {
    for (const m of [roi('alphashot-xl-pro-v2'), sel('alphashot-xl-pro-v2')]) {
      expect(m.tailleMax).toBe('50×30×70 cm');
      expect(m.dimensionsMax).toEqual({ l: 50, w: 30, h: 70 });
    }
    const faq = JSON.stringify(roi('alphashot-xl-pro-v2').faqItems);
    expect(faq).not.toMatch(/50x70x30/);
    expect(faq).toMatch(/50x30x70/);
  });

  it('XL Pro v2 : éligibilité inchangée (dimensions triées avant comme après)', () => {
    expect(tient('alphashot-xl-pro-v2', undefined, { l: 50, w: 30, h: 70 })).toBe(true);
    expect(tient('alphashot-xl-pro-v2', undefined, { l: 50, w: 70, h: 30 })).toBe(true);
    expect(tient('alphashot-xl-pro-v2', undefined, { l: 50, w: 30, h: 71 })).toBe(false);
  });

  it('XL G2 : dimensions de la machine 88 × 140 × 197, plus aucune trace de 142 × 87 × 176', () => {
    for (const m of [roi('alphashot-xl-g2'), sel('alphashot-xl-g2')]) {
      expect(m.studioFootprint).toEqual({ l: 88, w: 140, h: 197 });
    }
    const faq = JSON.stringify(roi('alphashot-xl-g2').faqItems);
    expect(faq).not.toMatch(/142x87|176 cm/);
    expect(faq).toMatch(/88x140 cm/);
  });

  it('Furniture : charge 1 000 kg (version 4 000 kg) ; un objet de 501 à 1 000 kg devient éligible', () => {
    expect(roi('furniture-studio').poidsMaxKg).toBe(1000);
    expect(sel('furniture-studio').poidsMaxKg).toBe(1000);
    expect(roi('furniture-studio').poidsMax).toBe('1 000 kg (version 4 000 kg)');
    for (const kg of [501, 750, 1000]) expect(tient('furniture-studio', kg), `${kg} kg`).toBe(true);
    expect(tient('furniture-studio', 1001)).toBe(false);
  });

  it('Furniture : encombrement = dimensions max fabricant, qualifié comme tel ; « 25 à 30 m2 » et « 500 kg » retirés', () => {
    const f = roi('furniture-studio');
    expect(f.studioFootprint).toEqual({ l: 670, w: 588, h: 302 });
    expect(f.studioFootprintMaxFabricant).toBe(true);
    const textes = JSON.stringify([f.faqItems, f.keyStats]);
    expect(textes).not.toMatch(/25 (à|to|bis) 30|500 ?kg|500x400/);
  });

  it('Furniture : objet maximal inchangé (HOLD, contradiction fabricant E1)', () => {
    expect(roi('furniture-studio').dimensionsMax).toEqual({ l: 250, w: 200, h: 180 });
    expect(ficheTechnique('furniture-studio')?.statuts.objetMax).toBe('a-arbitrer');
  });

  it('seules les machines dont la source dit « Dimensions max » portent la qualification max fabricant', () => {
    const qualifiees = ROI.filter((m) => m.studioFootprintMaxFabricant).map((m) => m.id).sort();
    expect(qualifiees).toEqual(['e-comm-studio-plus', 'furniture-studio']);
    for (const id of qualifiees) expect(ficheTechnique(id)?.fabricant?.source.intitule).toMatch(/^Dimensions max /);
  });
});

describe('LOT-6 : Micro, Alphadesk, Fashion', () => {
  it('Micro Pro v2 : 83 × 54 × 72', () => {
    for (const m of [roi('alphashot-micro-v2'), sel('alphashot-micro-v2')]) expect(m.studioFootprint).toEqual({ l: 83, w: 54, h: 72 });
    expect(JSON.stringify(roi('alphashot-micro-v2').faqItems)).not.toMatch(/83x52/);
  });

  it('Alphadesk : 156 × 124 × 138', () => {
    for (const m of [roi('alphadesk'), sel('alphadesk')]) expect(m.studioFootprint).toEqual({ l: 156, w: 124, h: 138 });
    expect(JSON.stringify(roi('alphadesk').faqItems)).not.toMatch(/137x123|155 cm/);
  });

  it('Fashion : charges ponctuelle et répartie distinctes, sans « /m² » ; seuil de calcul inchangé (SB2)', () => {
    for (const m of [roi('fashion-studio'), sel('fashion-studio')]) {
      expect(m.poidsMax).toBe('35 kg (charge ponctuelle) / 200 kg (charge répartie)');
      expect(m.poidsMax).not.toMatch(/\/m²/);
      expect(m.poidsMaxKg).toBe(0);
    }
  });
});
