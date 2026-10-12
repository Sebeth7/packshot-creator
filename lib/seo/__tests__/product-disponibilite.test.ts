/**
 * Arbitrage L05 (G5, 11/10/2026) : `InStock` seulement sur preuve actuelle de
 * disponibilité ; à défaut, la propriété est omise (ni `OutOfStock` ni
 * `PreOrder`). Aucune `Offer` pour une fiche hors de l'offre officielle actuelle.
 */
import { describe, it, expect } from 'vitest';
import { productSchema } from '@/components/seo/SchemaOrg';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { IDS_HORS_OFFRE_OFFICIELLE, estDansOffreOfficielle } from '@/data/produits/offre-officielle';

const base = {
  name: 'Alphashot XL G2',
  description: 'x',
  image: 'https://www.packshot-creator.com/x.png',
  url: 'https://www.packshot-creator.com/fr/studio-photo/alphashot-xl-g2',
  sku: 'alphashot-xl-g2',
  leasingOffer: { monthly: 1234, priceCurrency: 'EUR' as const, priceValidUntil: '2026-12-31' },
};

describe('productSchema : disponibilité', () => {
  it('sans preuve : Offer avec prix, sans availability', () => {
    const p = productSchema(base) as { offers: Record<string, unknown> };
    expect(p.offers.price).toBe(1234);
    expect(p.offers).not.toHaveProperty('availability');
    expect(JSON.stringify(p)).not.toMatch(/OutOfStock|PreOrder|InStock/);
  });

  it('avec preuve fournie explicitement : InStock', () => {
    const p = productSchema({ ...base, availability: 'https://schema.org/InStock' }) as { offers: Record<string, unknown> };
    expect(p.offers.availability).toBe('https://schema.org/InStock');
  });

  it('sans leasingOffer : aucune Offer', () => {
    expect(productSchema({ ...base, leasingOffer: undefined })).not.toHaveProperty('offers');
  });
});

describe('offre officielle actuelle', () => {
  it('les fiches hors offre existent dans le catalogue et sont délistées', () => {
    for (const id of IDS_HORS_OFFRE_OFFICIELLE) {
      const m = MACHINES.find((x) => x.id === id);
      expect(m, id).toBeDefined();
      expect(m?.delisted, id).toBe(true);
    }
  });

  it("l'Alphadesk, délistée sur le site mais présente chez Orbitvu, reste dans l'offre ; l'XL G2 aussi", () => {
    expect(estDansOffreOfficielle('alphadesk')).toBe(true);
    expect(estDansOffreOfficielle('alphashot-xl-g2')).toBe(true);
    expect(estDansOffreOfficielle('alphashot-xl-v2')).toBe(false);
  });
});
