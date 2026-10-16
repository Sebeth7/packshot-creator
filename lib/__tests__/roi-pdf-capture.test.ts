/**
 * Garde-fous de la capture PDF du calculateur ROI (`pdfCapture.ts`).
 *
 * Régression du 16/10/2026 : une section capturée dans un conteneur masqué
 * donnait un canvas de 0 × 0 ; la formule (hauteur × largeur) / largeur valait
 * NaN et jsPDF levait « Invalid argument passed to jsPDF.scale ».
 */

import { describe, it, expect } from 'vitest';
import {
  PdfGenerationError,
  etatSection,
  hauteurImageMm,
} from '@/components/calculators/ROICalculator/lib/pdfCapture';

describe('etatSection', () => {
  it('section masquée (0 × 0) : non rendue', () => {
    expect(etatSection(0, 0)).toBe('non-rendue');
  });

  it('largeur non finie ou nulle : non rendue', () => {
    expect(etatSection(Number.NaN, 400)).toBe('non-rendue');
    expect(etatSection(0, 400)).toBe('non-rendue');
    expect(etatSection(-1, 400)).toBe('non-rendue');
  });

  it('mise en page sans hauteur : vide (rien à capturer)', () => {
    expect(etatSection(762, 0)).toBe('vide');
    expect(etatSection(762, Number.NaN)).toBe('vide');
  });

  it('section dimensionnée : à capturer', () => {
    expect(etatSection(762, 488)).toBe('a-capturer');
  });
});

describe('hauteurImageMm', () => {
  it('conserve le rapport de la capture', () => {
    // Graphique du rendu PDF : 762 × 488 px à l'échelle 2, posé sur 190 mm
    expect(hauteurImageMm(1524, 976, 190)).toBeCloseTo(121.68, 2);
  });

  it('canvas 0 × 0 : erreur explicite au lieu de NaN (cas du 16/10)', () => {
    // Formule d'origine : (0 × 190) / 0 = NaN, transmis à jsPDF
    expect(Number.isNaN((0 * 190) / 0)).toBe(true);
    expect(() => hauteurImageMm(0, 0, 190)).toThrow(PdfGenerationError);
    try {
      hauteurImageMm(0, 0, 190);
    } catch (e) {
      expect((e as PdfGenerationError).code).toBe('capture-vide');
    }
  });

  it('dimensions partiellement nulles ou non finies : erreur', () => {
    expect(() => hauteurImageMm(1524, 0, 190)).toThrow(PdfGenerationError);
    expect(() => hauteurImageMm(0, 976, 190)).toThrow(PdfGenerationError);
    expect(() => hauteurImageMm(Number.POSITIVE_INFINITY, 976, 190)).toThrow(PdfGenerationError);
    expect(() => hauteurImageMm(1524, 976, Number.NaN)).toThrow(PdfGenerationError);
  });

  it('le résultat est toujours un nombre fini positif', () => {
    for (const [l, h] of [[1, 1], [1524, 1], [3000, 20000]]) {
      const mm = hauteurImageMm(l, h, 190);
      expect(Number.isFinite(mm)).toBe(true);
      expect(mm).toBeGreaterThan(0);
    }
  });
});

describe('PdfGenerationError', () => {
  it('porte un code et conserve la cause', () => {
    const cause = new Error('html2canvas');
    const e = new PdfGenerationError('capture-impossible', 'message', { cause });
    expect(e).toBeInstanceOf(Error);
    expect(e.name).toBe('PdfGenerationError');
    expect(e.code).toBe('capture-impossible');
    expect(e.cause).toBe(cause);
  });
});
