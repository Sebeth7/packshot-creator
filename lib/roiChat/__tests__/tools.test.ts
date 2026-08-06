/**
 * Recette de la couche tools — garde-fous prix (CDC §3, profil 7 au niveau API).
 */

import { describe, it, expect } from 'vitest';
import { buildToolDefinitions, executeTool } from '../tools';

const DOSSIER_CATALOGUE = {
  mode: 'vs-existant',
  volumeAnnuel: 5000,
  machine: { source: 'catalogue', machineId: 'alphashot-pro-g2', mode: 'achat' },
  cashLines: [
    { id: 'presta', label: 'Prestataire', frequence: 'recurrent', montantAnnuel: 30_000, pourcentageSupprimable: 100, source: 'client' },
  ],
  timeLines: [],
};

describe('Garde-fous prix mode public', () => {
  it('price_list absent des tools publics, présent en interne', () => {
    expect(buildToolDefinitions('public').map((t) => t.name)).not.toContain('price_list');
    expect(buildToolDefinitions('interne').map((t) => t.name)).toContain('price_list');
  });

  it('price_list refuse de s\'exécuter en public (défense en profondeur)', () => {
    const r = executeTool('price_list', {}, 'public');
    expect(r.isError).toBe(true);
    expect(r.content).not.toContain('20450');
  });

  it('calculate public : aucun prix catalogue dans le retour', () => {
    const r = executeTool('calculate', DOSSIER_CATALOGUE, 'public');
    expect(r.isError).toBe(false);
    expect(r.content).not.toContain('20450');
    expect(r.content).not.toContain('38450');
  });

  it('compare_machines public : specs sans prix', () => {
    const r = executeTool(
      'compare_machines',
      { volumeAnnuel: 5000, tailleProduitsCategory: 'petit' },
      'public'
    );
    expect(r.isError).toBe(false);
    expect(r.content).not.toContain('prixAchatHT');
    expect(r.content).not.toContain('20450');
    expect(r.content).toContain('capaciteJour');
  });

  it('compare_machines interne : prix et mensualité leasing exposés', () => {
    const r = executeTool(
      'compare_machines',
      { volumeAnnuel: 5000, tailleProduitsCategory: 'petit' },
      'interne'
    );
    expect(r.content).toContain('prixAchatHT');
    expect(r.content).toContain('leasingMensualitePublique');
  });

  it('calculate interne : résultats complets (prix visibles)', () => {
    const r = executeTool('calculate', DOSSIER_CATALOGUE, 'interne');
    expect(r.isError).toBe(false);
    expect(r.content).toContain('20450');
    expect(r.calcResults).toBeDefined();
  });

  it('calculate avec dossier invalide : erreur explicite pour correction par le modèle', () => {
    const r = executeTool('calculate', { mode: 'vs-existant' }, 'interne');
    expect(r.isError).toBe(true);
    expect(r.content).toContain('invalide');
  });

  it('référentiels : statut draft/validé toujours présent', () => {
    const market = executeTool('market_reference', {}, 'public');
    expect(market.content).toContain('draft');
    const gains = executeTool('function_gains', {}, 'public');
    expect(gains.content).toContain('valide');
    expect(gains.content).toContain('mesure-donnees');
  });
});
