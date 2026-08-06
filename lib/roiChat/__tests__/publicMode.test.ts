/**
 * Recette du mode PUBLIC (UX §8 lots 2/3/6 + CDC §11 profil 7 au niveau
 * statique) : aucun prix catalogue ne doit pouvoir atteindre le contexte LLM
 * public — ni par le prompt, ni par les tools, ni par les référentiels.
 */

import { describe, it, expect } from 'vitest';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { computeRoi, filterResultsForPublic } from '@/lib/roiEngine';
import { rehydratePublicResults, buildHypotheses } from '../publicDisplay';
import { SYSTEM_PROMPT_PUBLIC, SYSTEM_PROMPT_INTERNE } from '../systemPrompt';
import { buildToolDefinitions, executeTool } from '../tools';

/** Tous les prix catalogue non nuls, en chaînes à traquer dans les payloads. */
const CATALOGUE_PRICES = MACHINES.filter((m) => m.prix > 0).map((m) => String(m.prix));

/** Deux machines catalogue avec prix pour le mode différentiel. */
const [m1, m2] = MACHINES.filter((m) => m.prix > 0 && !m.prixSurDevis);

describe('Prompt public — invariants anti-fuite', () => {
  it('ne contient aucun prix catalogue', () => {
    for (const prix of CATALOGUE_PRICES) {
      expect(SYSTEM_PROMPT_PUBLIC).not.toContain(prix);
    }
  });

  it('contient les conventions clés (chips, dossier, devis, moteur)', () => {
    expect(SYSTEM_PROMPT_PUBLIC).toContain('[[choix:');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('update_dossier');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('devis personnalisé');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('marge de croissance');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('230 jours');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('4 000 €/mois');
  });

  it('registre client : pas de vocabulaire du registre interne', () => {
    expect(SYSTEM_PROMPT_PUBLIC).not.toContain('price_list');
    expect(SYSTEM_PROMPT_PUBLIC).not.toContain('grille tarifaire');
    expect(SYSTEM_PROMPT_PUBLIC).not.toContain('marge de négociation');
    // Le prompt interne, lui, garde bien son registre
    expect(SYSTEM_PROMPT_INTERNE).toContain('price_list');
  });
});

describe('Tools publics — update_dossier et périmètre', () => {
  it('update_dossier déclaré en public, absent en interne', () => {
    expect(buildToolDefinitions('public').map((t) => t.name)).toContain('update_dossier');
    expect(buildToolDefinitions('interne').map((t) => t.name)).not.toContain('update_dossier');
  });

  it('update_dossier : sanitize + retour dossierUpdate pour le SSE', () => {
    const r = executeTool(
      'update_dossier',
      { secteur: 'cosmétique', volumeAnnuel: 2000, inconnu: 'x' },
      'public'
    );
    expect(r.isError).toBe(false);
    expect(r.dossierUpdate).toEqual({ secteur: 'cosmétique', volumeAnnuel: 2000 });
    expect(r.content).toContain('secteur');
  });
});

describe('Filtre public — mode différentiel catalogue', () => {
  const results = computeRoi({
    mode: 'differentiel',
    volumeAnnuel: 1000,
    machine: { source: 'catalogue', machineId: m1.id, mode: 'achat' },
    baselineMachine: { source: 'catalogue', machineId: m2.id, mode: 'achat' },
    functionGains: [
      { fonction: 'mesure-donnees', label: 'Mesure', minutesParProduit: 8, euroParProduit: 4, source: 'référentiel' },
    ],
    cashLines: [],
    timeLines: [],
  });
  const pub = filterResultsForPublic(results);

  it('les deltas d\'investissement catalogue sont masqués', () => {
    expect(pub.differentiel?.deltaInvestissement).toBeNull();
    expect(pub.differentiel?.deltaInvestissementNetIS).toBeNull();
  });

  it('la baseline expose son identité mais aucun champ prix', () => {
    expect(pub.baselineMachineResolved?.machineNom).toBe(m2.nom);
    expect(Object.keys(pub.baselineMachineResolved!).sort()).toEqual(
      ['capaciteJour', 'machineId', 'machineNom', 'mode', 'nbMois', 'prixSource'].sort()
    );
  });

  it('les champs prix de la machine étudiée restent masqués (achat catalogue)', () => {
    expect(pub.machine.prixMachine).toBeNull();
    expect(pub.machine.tcoAnnuel).toBeNull();
    expect(pub.machine.coutTotalInvestissement).toBeNull();
  });
});

describe('Réhydratation affichage public (statu quo wizard)', () => {
  const dossier = {
    mode: 'vs-existant' as const,
    volumeAnnuel: 5000,
    machine: { source: 'catalogue' as const, machineId: m1.id, mode: 'achat' as const },
    cashLines: [
      {
        id: 'presta',
        label: 'Prestataire',
        frequence: 'recurrent' as const,
        montantAnnuel: 30_000,
        pourcentageSupprimable: 100,
        source: 'client' as const,
      },
    ],
    timeLines: [],
  };

  it('retrouve le TCO catalogue depuis le bundle client', () => {
    const full = computeRoi(dossier);
    const pub = filterResultsForPublic(full);
    expect(pub.machine.tcoAnnuel).toBeNull(); // bien masqué côté LLM
    const rehydrated = rehydratePublicResults(pub);
    expect(rehydrated.machine.tcoAnnuel).toBeCloseTo(full.machine.tcoAnnuel, 5);
    expect(rehydrated.machine.coutOperationnelAnnuel).toBeCloseTo(
      full.machine.coutOperationnelAnnuel,
      5
    );
  });

  it('hypothèses affichées : conventions du calculateur', () => {
    const pub = filterResultsForPublic(computeRoi(dossier));
    const labels = buildHypotheses(pub).map((h) => `${h.label} ${h.value}`).join(' | ');
    expect(labels).toContain('230 jours');
    expect(labels).toMatch(/4\s000 €\/mois/);
    expect(labels).toContain("Durée d'analyse 60 mois");
  });
});
