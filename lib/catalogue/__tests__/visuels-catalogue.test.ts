/**
 * Pages du catalogue sur la landing (V5) : six exports réels, présents sur disque,
 * dimensions déclarées égales à celles des fichiers, aucune planche de contrôle ni PDF
 * dans public/.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { VISUELS } from '@/components/landings/catalogue-all-in-one/visuels';

const DOSSIER = path.join(process.cwd(), 'public', 'images', 'catalogue-all-in-one');

/** Dimensions d'un WebP (VP8, VP8L ou VP8X), lues dans l'en-tête. */
function dimensionsWebp(fichier: string): { width: number; height: number } {
  const b = readFileSync(fichier);
  expect(b.toString('ascii', 0, 4)).toBe('RIFF');
  expect(b.toString('ascii', 8, 12)).toBe('WEBP');
  const bloc = b.toString('ascii', 12, 16);
  if (bloc === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
  if (bloc === 'VP8L') {
    const n = b.readUInt32LE(21);
    return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
  }
  return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
}

describe('pages du catalogue', () => {
  it('six visuels renseignés, fichiers présents, dimensions exactes', () => {
    for (const v of Object.values(VISUELS)) {
      expect(v.src, v.id).toMatch(/^\/images\/catalogue-all-in-one\/k[1-6]-[a-z0-9-]+\.webp$/);
      const fichier = path.join(process.cwd(), 'public', v.src!);
      expect(existsSync(fichier), v.src!).toBe(true);
      expect(dimensionsWebp(fichier), v.id).toEqual({ width: v.width, height: v.height });
      expect(v.alt.length, v.id).toBeGreaterThan(20);
    }
  });

  it('doubles pages avec leur page seule pour mobile', () => {
    expect(VISUELS.K5.mobile).toBe('K3');
    expect(VISUELS.K4.mobile).toBe('K2');
    expect(VISUELS.K6.mobile).toBeUndefined();
  });

  it('ni PDF ni planche de contrôle dans public/', () => {
    expect(readdirSync(DOSSIER).sort()).toEqual(
      Object.values(VISUELS)
        .map((v) => path.basename(v.src!))
        .sort(),
    );
  });
});
