import { describe, it, expect } from 'vitest';
import { pickListL, pickL } from '../locale-text';
import { MACHINES as MACHINES_ROI } from '@/components/calculators/ROICalculator/lib/machines';
import { MACHINES as MACHINES_SELECTEUR } from '@/components/machine-selector/lib/machines';

// Traductions parallèles des cas d'usage (LANG A07) : même ordre, même longueur que
// la liste FR, et traduction identique d'un catalogue à l'autre pour une même machine.
describe('useCasesI18n des catalogues machines', () => {
  const catalogues = [
    ['ROI', MACHINES_ROI],
    ['sélecteur', MACHINES_SELECTEUR],
  ] as const;

  for (const [nom, machines] of catalogues) {
    it(`${nom} : chaque traduction a la longueur de la liste FR, sans chaîne vide`, () => {
      for (const m of machines) {
        if (!m.useCasesI18n) continue;
        expect(m.useCasesI18n.en, m.id).toHaveLength(m.useCases.length);
        expect(m.useCasesI18n['de-ch'], m.id).toHaveLength(m.useCases.length);
        for (const t of [...m.useCasesI18n.en, ...m.useCasesI18n['de-ch']]) {
          expect(t.trim(), m.id).not.toBe('');
          expect(t, m.id).not.toContain('ß');
        }
      }
    });
  }

  it('une même machine porte les mêmes cas d\'usage et traductions dans les deux catalogues', () => {
    for (const s of MACHINES_SELECTEUR) {
      const r = MACHINES_ROI.find((m) => m.id === s.id);
      if (!r) continue;
      expect(s.useCases, s.id).toEqual(r.useCases);
      expect(s.useCasesI18n, s.id).toEqual(r.useCasesI18n);
    }
  });

  it('les textes de-ch des avantages et limites du sélecteur sont ceux du catalogue ROI quand le FR est identique', () => {
    for (const s of MACHINES_SELECTEUR) {
      const r = MACHINES_ROI.find((m) => m.id === s.id);
      if (!r) continue;
      const deRoi = new Map(
        [...r.keyAdvantages, ...r.limitations].map((t) => [t.fr, t['de-ch']] as const),
      );
      for (const t of [...s.keyAdvantages, ...s.limitations]) {
        if (t['de-ch'] && deRoi.has(t.fr)) expect(t['de-ch'], `${s.id} : ${t.fr}`).toBe(deRoi.get(t.fr));
      }
    }
  });
});

describe('pickListL', () => {
  const fr = ['Bijoux', 'Montres'];
  const i18n = { en: ['Jewelry', 'Watches'], 'de-ch': ['Schmuck', 'Uhren'] };

  it('rend la liste de la langue demandée', () => {
    expect(pickListL('fr', fr, i18n)).toEqual(fr);
    expect(pickListL('en', fr, i18n)).toEqual(i18n.en);
    expect(pickListL('de-ch', fr, i18n)).toEqual(i18n['de-ch']);
  });

  it('retombe sur la liste FR sans traduction ou si la longueur diffère', () => {
    expect(pickListL('en', fr)).toEqual(fr);
    expect(pickListL('de-ch', fr, { en: ['Jewelry'], 'de-ch': ['Schmuck'] })).toEqual(fr);
  });

  it('pickL sert de-ch quand il est fourni, sinon l\'anglais', () => {
    expect(pickL('de-ch', { fr: 'a', en: 'b', 'de-ch': 'c' })).toBe('c');
    expect(pickL('de-ch', { fr: 'a', en: 'b' })).toBe('b');
  });
});
