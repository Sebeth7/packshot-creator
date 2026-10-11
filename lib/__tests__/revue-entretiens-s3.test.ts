import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import interviews from '@/content/revue-entretiens-s3/interviews.json';

/**
 * Espace de revue éditoriale interne (entretiens Sébastien Jourdan, S3).
 *
 * Gardes de gouvernance : l'espace sert à la relecture en Preview, il ne doit
 * JAMAIS devenir une surface publique indexable. Ces tests verrouillent :
 *  - l'intégrité des dix entretiens et de leurs visuels,
 *  - la garde 404 en production + noindex/nofollow dans la page,
 *  - l'absence de la route du plan de site,
 *  - l'absence de signature « Sébastien Jourdan » comme auteur public.
 */
const ROOT = process.cwd();
const PAGE = path.join(ROOT, 'app/[lang]/revue-entretiens-s3/page.tsx');
const IMG_DIR = path.join(ROOT, 'public/images/revue-entretiens-s3');

describe('revue entretiens S3 — intégrité du contenu', () => {
  it('monte exactement dix entretiens', () => {
    expect(interviews).toHaveLength(10);
  });

  it('chaque entretien a les champs requis et un corps HTML non vide', () => {
    for (const it of interviews) {
      expect(it.num).toMatch(/^\d{2}$/);
      expect(it.slug).toBe(`entretien-${it.num}`);
      expect(it.titre.length).toBeGreaterThan(5);
      expect(it.statut).toContain('À APPROUVER PAR SÉBASTIEN');
      expect(it.html.length).toBeGreaterThan(500);
      expect(it.html).toContain('<h3>');
    }
  });

  it('les 23 croquis référencés existent sur le disque', () => {
    const refs = new Set<string>();
    for (const it of interviews) {
      const m = it.html.matchAll(/\/images\/revue-entretiens-s3\/([A-Z0-9_]+)\.svg/g);
      for (const r of m) refs.add(r[1]);
    }
    expect(refs.size).toBe(23);
    for (const name of refs) {
      expect(fs.existsSync(path.join(IMG_DIR, `${name}.svg`))).toBe(true);
    }
  });

  it('aucun SVG ne contient de script ou de gestionnaire d’événement', () => {
    for (const f of fs.readdirSync(IMG_DIR).filter((n) => n.endsWith('.svg'))) {
      const svg = fs.readFileSync(path.join(IMG_DIR, f), 'utf8');
      expect(svg).not.toMatch(/<script/i);
      expect(svg).not.toMatch(/on(load|error|click)=/i);
    }
  });
});

describe('revue entretiens S3 — gardes de non-publication', () => {
  const source = fs.readFileSync(PAGE, 'utf8');

  it('renvoie 404 en production', () => {
    expect(source).toMatch(/process\.env\.VERCEL_ENV === 'production'/);
    expect(source).toContain('notFound()');
  });

  it('est en rendu dynamique (la garde production s’applique à chaque requête)', () => {
    expect(source).toContain("export const dynamic = 'force-dynamic'");
  });

  it('déclare robots noindex/nofollow', () => {
    expect(source).toMatch(/index:\s*false/);
    expect(source).toMatch(/follow:\s*false/);
  });

  it('n’est pas enregistrée dans le plan de site', () => {
    const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
    expect(sitemap).not.toContain('revue-entretiens');
  });

  it('ne pose pas « Sébastien Jourdan » comme auteur public', () => {
    expect(source).toContain('PackshotCreator');
    expect(source).not.toMatch(/author[^\n]*Sébastien Jourdan/);
  });
});
