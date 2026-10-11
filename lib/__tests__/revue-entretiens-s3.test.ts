import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import interviews from '@/content/revue-entretiens-s3/interviews.json';

/**
 * Espace de revue éditoriale interne (entretiens Sébastien Jourdan, S3).
 *
 * Gardes de gouvernance : l'espace sert à la relecture en Preview, il ne doit
 * JAMAIS devenir une surface publique indexable. Ces tests verrouillent :
 *  - l'intégrité des dix entretiens et de leurs 23 croquis,
 *  - la garde 404 en production + noindex/nofollow dans la page,
 *  - l'absence de la route du plan de site,
 *  - l'absence de signature « Sébastien Jourdan » comme auteur public,
 *  - la validité des liens internes « pour aller plus loin ».
 */
const ROOT = process.cwd();
const PAGE = path.join(ROOT, 'app/[lang]/revue-entretiens-s3/page.tsx');
const IMG_DIR = path.join(ROOT, 'public/images/revue-entretiens-s3');
const BLOG_FR = path.join(ROOT, 'content/blog/fr');

describe('revue entretiens S3 — intégrité du contenu', () => {
  it('monte exactement dix entretiens structurés', () => {
    expect(interviews).toHaveLength(10);
    for (const it of interviews) {
      expect(it.num).toMatch(/^\d{2}$/);
      expect(it.slug).toBe(`entretien-${it.num}`);
      expect(it.titre.length).toBeGreaterThan(5);
      expect(it.sous_titre.length).toBeGreaterThan(5);
      expect(it.statut).toContain('À APPROUVER PAR SÉBASTIEN');
      expect(it.intro.length).toBeGreaterThan(0);
      expect(it.a_retenir).toContain('À retenir');
      expect(it.sections.length).toBeGreaterThan(4);
      for (const s of it.sections) {
        expect(s.id).toMatch(/^entretien-\d{2}-q\d+$/);
        expect(s.question.length).toBeGreaterThan(5);
      }
    }
  });

  it('les 23 croquis référencés existent sur le disque', () => {
    const refs = new Set<string>();
    for (const it of interviews) {
      for (const s of it.sections) {
        for (const f of s.figures) {
          expect(f.src).toMatch(/^\/images\/revue-entretiens-s3\/[A-Z0-9_]+\.svg$/);
          refs.add(f.name);
        }
      }
    }
    expect(refs.size).toBe(23);
    for (const name of refs) {
      expect(fs.existsSync(path.join(IMG_DIR, `${name}.svg`))).toBe(true);
    }
  });

  it('chaque entretien a un encadré méthode', () => {
    for (const it of interviews) {
      const encadres = it.sections.flatMap((s) =>
        s.contenu.filter((b: { t: string }) => b.t === 'encadre'),
      );
      expect(encadres.length).toBeGreaterThanOrEqual(1);
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

describe('revue entretiens S3 — liens internes', () => {
  const source = fs.readFileSync(PAGE, 'utf8');

  it('tous les slugs d’article liés pointent vers un article existant', () => {
    // slugs dans LIENS (blog:) et dans PAGES_PUBLIQUES (slug:)
    const slugs = [
      ...source.matchAll(/(?:blog|slug): '([a-z0-9-]+)'/g),
    ].map((m) => m[1]);
    expect(slugs.length).toBeGreaterThan(5);
    for (const slug of slugs) {
      expect(fs.existsSync(path.join(BLOG_FR, `${slug}.json`))).toBe(true);
    }
  });

  it('les liens vers des pages dédiées existent comme routes', () => {
    const pages = [...source.matchAll(/page: '\/([a-z0-9-]+)'/g)].map((m) => m[1]);
    for (const p of pages) {
      expect(fs.existsSync(path.join(ROOT, 'app/[lang]', p))).toBe(true);
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
