import { describe, it, expect } from 'vitest';
import {
  mergeDossier,
  sanitizeDossierUpdate,
  formatDossierValue,
  type RoiPublicDossier,
} from '../dossier';

describe('Dossier vivant (mode public)', () => {
  it('mergeDossier : les champs fournis écrasent, les autres restent', () => {
    const base: RoiPublicDossier = { secteur: 'cosmétique', volumeAnnuel: 2000 };
    const next = mergeDossier(base, { volumeAnnuel: 3000, financement: 'leasing' });
    expect(next).toEqual({ secteur: 'cosmétique', volumeAnnuel: 3000, financement: 'leasing' });
  });

  it('mergeDossier : ignore null/undefined/chaînes vides/tableaux vides', () => {
    const base: RoiPublicDossier = { secteur: 'vins' };
    const next = mergeDossier(base, {
      secteur: '',
      typesContenu: [],
      situation: undefined,
    });
    expect(next).toEqual({ secteur: 'vins' });
  });

  it('sanitizeDossierUpdate : ne garde que les champs connus, bien typés', () => {
    const update = sanitizeDossierUpdate({
      secteur: '  horlogerie ',
      volumeAnnuel: 1500.6,
      typesContenu: ['packshot', 42, '360°'],
      injection: 'DROP TABLE',
      autres: ['ERP SAP'],
    });
    expect(update).toEqual({
      secteur: 'horlogerie',
      volumeAnnuel: 1501,
      typesContenu: ['packshot', '360°'],
      autres: ['ERP SAP'],
    });
  });

  it('sanitizeDossierUpdate : input non-objet → vide, volume négatif rejeté', () => {
    expect(sanitizeDossierUpdate(null)).toEqual({});
    expect(sanitizeDossierUpdate('texte')).toEqual({});
    expect(sanitizeDossierUpdate({ volumeAnnuel: -5 })).toEqual({});
  });

  it('sanitizeDossierUpdate : tronque les chaînes trop longues (anti-abus)', () => {
    const update = sanitizeDossierUpdate({ secteur: 'x'.repeat(500) });
    expect(update.secteur).toHaveLength(200);
  });

  it('formatDossierValue : nombre, liste, absent', () => {
    const d: RoiPublicDossier = { volumeAnnuel: 2000, typesContenu: ['packshot', '360°'] };
    // toLocaleString('fr-FR') sépare les milliers par une espace insécable
    expect(formatDossierValue(d, 'volumeAnnuel')).toMatch(/^2\s000 produits\/an$/);
    expect(formatDossierValue(d, 'typesContenu')).toBe('packshot, 360°');
    expect(formatDossierValue(d, 'secteur')).toBeNull();
  });
});
