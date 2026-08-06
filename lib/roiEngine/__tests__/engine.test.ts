/**
 * Recette du moteur ROI généralisé — les 8 profils obligatoires du CDC §11.
 * Machine témoin catalogue : Alphashot Pro G2 (20 450 €, cap. 250/j,
 * maintenance 0, consommables 500).
 */

import { describe, it, expect } from 'vitest';
import { computeRoi } from '../engine';
import { filterResultsForPublic } from '../publicFilter';
import { roiDossierSchema } from '../schema';
import type { RoiDossier } from '../types';

const PRO_G2 = 'alphashot-pro-g2';

describe('Profil 1 — Seb-case du 06/08 (vs existant, leasing 710 €/36 mois)', () => {
  const dossier: RoiDossier = {
    mode: 'vs-existant',
    volumeAnnuel: 200,
    capaciteJournaliereActuelle: 5,
    machine: { source: 'catalogue', machineId: PRO_G2, mode: 'leasing', mensualite: 710, nbMois: 36 },
    cashLines: [
      { id: 'presta', label: 'Prestataire externe', frequence: 'recurrent', montantAnnuel: 4700 * 12, pourcentageSupprimable: 100, source: 'client' },
      { id: 'equip', label: 'Équipement photo', frequence: 'recurrent', montantAnnuel: 3000, pourcentageSupprimable: 100, source: 'client' },
    ],
    timeLines: [
      // 1,5 opérateur à 80 % → 230 × 1,5 × 0,8 = 276 j/an
      { id: 'ops', label: 'Opérateurs photo internes', joursParAn: 276, pourcentageLiberable: 100 },
    ],
  };
  const r = computeRoi(dossier);

  it('économie directe ~50,9 k€/an', () => {
    // 59 400 cash supprimé − 8 520 loyers = 50 880
    expect(r.economieAnnuelle).toBeCloseTo(50_880, 0);
  });
  it('temps libéré ~275 j/an', () => {
    // 276 − 200/250 = 275,2
    expect(r.tempsLibereJours).toBeCloseTo(275.2, 1);
  });
  it('alerte incohérence volume (capacité déclarée ≫ objectif)', () => {
    expect(r.inputsSurcapacite).toBe(true);
  });
  it('break-even immédiat en leasing (économie positive)', () => {
    expect(r.breakEvenMois).toBe(1);
  });
  it('cash et temps jamais agrégés dans economieAnnuelle', () => {
    expect(r.economieAnnuelle).toBeLessThan(r.economieAnnuelle + r.valeurTempsLibere);
    expect(r.gainTotalAnnuel).toBeCloseTo(r.economieAnnuelle + r.valeurTempsLibere, 5);
  });
});

describe('Profil 2 — 100 % interne (2 op à 60 %, pas de presta)', () => {
  const dossier: RoiDossier = {
    mode: 'vs-existant',
    volumeAnnuel: 3000,
    machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
    cashLines: [],
    timeLines: [
      // 230 × 2 × 0,6 = 276 j/an
      { id: 'ops', label: 'Salariés internes', joursParAn: 276, pourcentageLiberable: 100 },
    ],
  };
  const r = computeRoi(dossier);

  it('économie cash négative (coût net) sans presta à supprimer', () => {
    // 0 − (20 450/5 + 0 + 500) = −4 590
    expect(r.economieAnnuelle).toBeCloseTo(-4590, 0);
  });
  it('temps libéré substantiel, valorisé séparément', () => {
    // 276 − 3000/250 = 264 j
    expect(r.tempsLibereJours).toBeCloseTo(264, 0);
    expect(r.valeurTempsLibere).toBeGreaterThan(50_000);
  });
  it("pas de « non rentable » : le gain temps l'emporte", () => {
    expect(r.isRentable).toBe(true);
  });
  it('coût net mensuel dérivable pour la présentation', () => {
    expect(Math.abs(r.economieAnnuelle) / 12).toBeCloseTo(382.5, 0);
  });
});

describe('Profil 3 — 100 % sous-traité (0 opérateur interne, cas impossible dans le wizard)', () => {
  const dossier: RoiDossier = {
    mode: 'vs-existant',
    volumeAnnuel: 2000,
    machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
    cashLines: [
      { id: 'presta', label: 'Prestataire photo (100 % du flux)', frequence: 'recurrent', montantAnnuel: 40_000, pourcentageSupprimable: 100, source: 'client' },
    ],
    timeLines: [
      { id: 'gestion', label: 'Gestion du prestataire', joursParAn: 10, pourcentageLiberable: 80 },
    ],
  };

  it('le schéma accepte 0 opérateur interne (timeLines quasi vides)', () => {
    expect(roiDossierSchema.safeParse(dossier).success).toBe(true);
    expect(roiDossierSchema.safeParse({ ...dossier, timeLines: [] }).success).toBe(true);
  });

  const r = computeRoi({ ...dossier, timeLines: [] });
  it('économie = presta supprimé − TCO machine', () => {
    // 40 000 − 4 590 = 35 410
    expect(r.economieAnnuelle).toBeCloseTo(35_410, 0);
  });
  it('0 temps libéré fictif (pas de demi-personne inventée)', () => {
    expect(r.tempsLibereJours).toBe(0);
    expect(r.valeurTempsLibere).toBe(0);
  });
  it('expose le temps machine à prévoir (nouveau temps interne, informatif)', () => {
    expect(r.tempsMachineJours).toBeCloseTo(8, 0); // 2000/250
    expect(r.coutTempsMachineIndicatif).toBeGreaterThan(0);
  });
  it('break-even en mois cohérent', () => {
    // 20 450 / ((40 000 − 500)/12) ≈ 6,2 mois
    expect(r.breakEvenMois).toBeCloseTo(6.2, 1);
  });
});

describe("Profil 4 — Création d'activité (baseline contrefactuelle référentiel)", () => {
  const base: RoiDossier = {
    mode: 'contrefactuel',
    volumeAnnuel: 2000,
    machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
    baselineLabel: 'par rapport à un scénario prestataire à 25 €/photo',
    cashLines: [
      { id: 'presta-ref', label: 'Prestataire (référentiel)', frequence: 'recurrent', montantAnnuel: 25 * 2000, pourcentageSupprimable: 100, source: 'referentiel' },
    ],
    timeLines: [],
  };

  it('baselineLabel obligatoire (étiquetage honnête)', () => {
    const { baselineLabel: _omitted, ...sansLabel } = base;
    expect(roiDossierSchema.safeParse(sansLabel).success).toBe(false);
    expect(roiDossierSchema.safeParse(base).success).toBe(true);
  });
  it('lignes cash « client » refusées en contrefactuel', () => {
    const triche = {
      ...base,
      cashLines: [{ ...base.cashLines[0], source: 'client' as const }],
    };
    expect(roiDossierSchema.safeParse(triche).success).toBe(false);
  });
  it('calcule vs la baseline sourcée et garde son étiquette', () => {
    const r = computeRoi(base);
    expect(r.baselineLabel).toContain('scénario prestataire');
    expect(r.economieAnnuelle).toBeCloseTo(50_000 - 4590, 0);
  });
  it('repli coût de revient quand aucune baseline crédible', () => {
    const r = computeRoi({ ...base, cashLines: [], prixReferenceParProduit: 25 });
    expect(r.coutRevient).not.toBeNull();
    expect(r.coutRevient!.coutParProduit).toBeCloseTo(4590 / 2000, 3);
    // Seuil : 4 590 / 25 ≈ 184 produits/an
    expect(r.coutRevient!.seuilRentabiliteProduitsAn).toBeCloseTo(183.6, 0);
  });
});

describe('Profil 5 — Différentiel XL G2 MDC (38 900 € devis) vs Alphashot XL (22 000 €)', () => {
  const dossier: RoiDossier = {
    mode: 'differentiel',
    volumeAnnuel: 850,
    machine: { source: 'fourni', mode: 'achat', prix: 38_900, label: 'Alphashot XL G2 MDC (devis)', machineId: 'alphashot-xl-g2' },
    baselineMachine: { source: 'fourni', mode: 'achat', prix: 22_000, label: 'Alphashot XL' },
    functionGains: [
      {
        fonction: 'mesure-donnees',
        label: 'Mesure/pesée dimensionnelle + capture données étiquettes',
        minutesParProduit: 8,
        euroParProduit: 4,
        source: 'Acté Seb 02/08 (vMeasure/Cubiscan, opérateur 30 €/h)',
      },
    ],
    cashLines: [],
    timeLines: [],
  };
  const r = computeRoi(dossier);

  it('retrouve 8 min / 4 €/produit', () => {
    expect(r.differentiel!.minutesParProduit).toBe(8);
    expect(r.differentiel!.gainParProduit).toBe(4);
  });
  it('break-even 4 225 produits (Δ 16 900 €)', () => {
    expect(r.differentiel!.deltaInvestissement).toBe(16_900);
    expect(r.differentiel!.breakEvenProduits).toBeCloseTo(4225, 0);
  });
  it('amorti ~5 ans à 850 produits/an', () => {
    expect(r.differentiel!.breakEvenAnnees).toBeCloseTo(4.97, 1);
  });
  it('dérive 4 €/produit depuis les minutes si euroParProduit absent (30 €/h)', () => {
    const sansEuro = computeRoi({
      ...dossier,
      functionGains: [{ ...dossier.functionGains![0], euroParProduit: undefined }],
    });
    expect(sansEuro.differentiel!.gainParProduit).toBeCloseTo(4, 1);
  });
  it('gain étiqueté temps valorisé (pas un décaissement évité)', () => {
    expect(r.differentiel!.gainType).toBe('temps-valorise');
  });
});

describe('Profil 6 — Prix remisé fourni (mode interne)', () => {
  const r = computeRoi({
    mode: 'vs-existant',
    volumeAnnuel: 5000,
    machine: { source: 'fourni', mode: 'achat', prix: 17_000, label: 'Pro G2 remisée', machineId: PRO_G2 },
    cashLines: [
      { id: 'presta', label: 'Prestataire', frequence: 'recurrent', montantAnnuel: 30_000, pourcentageSupprimable: 100, source: 'client' },
    ],
    timeLines: [],
  });

  it('calcule avec le prix fourni, pas le prix catalogue', () => {
    expect(r.machine.prixMachine).toBe(17_000);
    // TCO = 17 000/5 + maintenance 0 + consommables 500 (specs catalogue via machineId)
    expect(r.machine.tcoAnnuel).toBeCloseTo(3900, 0);
  });
  it('récupère les specs catalogue (capacité) sans toucher au prix', () => {
    expect(r.machine.capaciteJour).toBe(250);
  });
  it('la comparaison grille reste possible en interne (résultats non filtrés)', () => {
    expect(JSON.stringify(r)).toContain('17000');
  });
});

describe('Profil 7 — Aucune fuite de prix catalogue en mode public', () => {
  it('achat catalogue : prix, TCO et investissement masqués', () => {
    const r = computeRoi({
      mode: 'vs-existant',
      volumeAnnuel: 5000,
      machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
      cashLines: [
        { id: 'presta', label: 'Prestataire', frequence: 'recurrent', montantAnnuel: 30_000, pourcentageSupprimable: 100, source: 'client' },
      ],
      timeLines: [{ id: 'ops', label: 'Interne', joursParAn: 100, pourcentageLiberable: 100 }],
    });
    const pub = filterResultsForPublic(r);
    expect(pub.machine.prixMachine).toBeNull();
    expect(pub.machine.tcoAnnuel).toBeNull();
    expect(pub.machine.coutTotalInvestissement).toBeNull();
    // Le prix catalogue (20 450) n'apparaît nulle part dans la sortie sérialisée
    expect(JSON.stringify(pub)).not.toContain('20450');
    // Les métriques licites restent exposées
    expect(pub.economieAnnuelle).not.toBeNull();
    expect(pub.breakEvenMois).not.toBeNull();
    expect(pub.roiPourcent).not.toBeNull();
    expect(pub.tempsLibereJours).toBeGreaterThan(0);
  });

  it('différentiel avec machine catalogue : delta d\'investissement masqué', () => {
    const r = computeRoi({
      mode: 'differentiel',
      volumeAnnuel: 1000,
      machine: { source: 'catalogue', machineId: 'alphashot-xl-g2', mode: 'achat' },
      baselineMachine: { source: 'catalogue', machineId: 'alphashot-xl-pro-v2', mode: 'achat' },
      functionGains: [
        { fonction: 'mesure-donnees', label: 'Mesure', minutesParProduit: 8, euroParProduit: 4, source: 'référentiel' },
      ],
      cashLines: [],
      timeLines: [],
    });
    const pub = filterResultsForPublic(r);
    expect(pub.differentiel!.deltaInvestissement).toBeNull();
    expect(pub.differentiel!.deltaInvestissementNetIS).toBeNull();
    const json = JSON.stringify(pub);
    expect(json).not.toContain('38450'); // prix XL G2
    expect(json).not.toContain('22450'); // prix XL Pro v2
    // Le gain par produit (référentiel public) reste exposé
    expect(pub.differentiel!.gainParProduit).toBe(4);
  });

  it('prix FOURNI par l\'utilisateur : restitué (c\'est sa donnée)', () => {
    const r = computeRoi({
      mode: 'vs-existant',
      volumeAnnuel: 1000,
      machine: { source: 'fourni', mode: 'leasing', mensualite: 710, nbMois: 36, label: 'Offre reçue' },
      cashLines: [],
      timeLines: [],
    });
    const pub = filterResultsForPublic(r);
    expect(pub.machine.tcoAnnuel).toBeCloseTo(8520, 0);
  });

  it('leasing catalogue (règle publique ×1,3/60 déjà affichée sur le site) : loyers exposés, prix d\'achat non', () => {
    const r = computeRoi({
      mode: 'vs-existant',
      volumeAnnuel: 1000,
      machine: { source: 'catalogue', machineId: PRO_G2, mode: 'leasing' },
      cashLines: [],
      timeLines: [],
    });
    const pub = filterResultsForPublic(r);
    expect(pub.machine.prixMachine).toBeNull();
    expect(pub.machine.tcoAnnuel).not.toBeNull();
    expect(JSON.stringify(pub)).not.toContain('20450');
  });
});

describe('Profil 8 — Volume incohérent (confusion mensuel/annuel)', () => {
  it('signale la surcapacité pour reformulation avant calcul', () => {
    // Le client dit « 200 par an » mais sa capacité déclarée écrase l'objectif
    const r = computeRoi({
      mode: 'vs-existant',
      volumeAnnuel: 200,
      capaciteJournaliereActuelle: 30,
      machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
      cashLines: [],
      timeLines: [{ id: 'ops', label: 'Interne', joursParAn: 230, pourcentageLiberable: 100 }],
    });
    expect(r.inputsSurcapacite).toBe(true);
  });
  it('pas de faux positif quand volume et capacité sont cohérents', () => {
    const r = computeRoi({
      mode: 'vs-existant',
      volumeAnnuel: 6000,
      capaciteJournaliereActuelle: 30,
      machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
      cashLines: [],
      timeLines: [{ id: 'ops', label: 'Interne', joursParAn: 230, pourcentageLiberable: 100 }],
    });
    expect(r.inputsSurcapacite).toBe(false);
  });
});

describe('Garde-fous du schéma', () => {
  it('ligne récurrente sans montantAnnuel refusée', () => {
    const bad = {
      mode: 'vs-existant',
      volumeAnnuel: 1000,
      machine: { source: 'catalogue', machineId: PRO_G2, mode: 'achat' },
      cashLines: [{ id: 'x', label: 'X', frequence: 'recurrent', pourcentageSupprimable: 100, source: 'client' }],
      timeLines: [],
    };
    expect(roiDossierSchema.safeParse(bad).success).toBe(false);
  });
  it('différentiel sans baselineMachine ou sans gains refusé', () => {
    const bad = {
      mode: 'differentiel',
      volumeAnnuel: 1000,
      machine: { source: 'fourni', mode: 'achat', prix: 38_900 },
      cashLines: [],
      timeLines: [],
    };
    expect(roiDossierSchema.safeParse(bad).success).toBe(false);
  });
  it('machine catalogue inconnue : erreur explicite', () => {
    expect(() =>
      computeRoi({
        mode: 'vs-existant',
        volumeAnnuel: 1000,
        machine: { source: 'catalogue', machineId: 'machine-inexistante', mode: 'achat' },
        cashLines: [],
        timeLines: [],
      })
    ).toThrow(/inconnue/);
  });
});
