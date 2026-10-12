import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import interviews from '@/content/revue-entretiens-s3/interviews.json';
import complement from '@/content/revue-entretiens-s3/complement.json';

/**
 * Espace de revue éditoriale interne (entretiens Sébastien Jourdan, S3 — V2).
 *
 * Gardes de gouvernance : l'espace sert à la relecture en Preview, il ne doit
 * JAMAIS devenir une surface publique indexable. Ces tests verrouillent :
 *  - l'intégrité des dix entretiens, de leurs 23 croquis et des récits V2,
 *  - l'existence réelle des vraies photos et des destinations de maillage,
 *  - la barre sticky horizontale D44 (forme A), pas la colonne latérale,
 *  - la garde 404 en production + noindex/nofollow,
 *  - l'absence de la route du plan de site et de signature Sébastien publique.
 */
const ROOT = process.cwd();
const PAGE = path.join(ROOT, 'app/[lang]/revue-entretiens-s3/page.tsx');
const IMG_DIR = path.join(ROOT, 'public/images/revue-entretiens-s3');
const BLOG_FR = path.join(ROOT, 'content/blog/fr');
const GUIDES_FR = path.join(ROOT, 'content/guides/fr');
const source = fs.readFileSync(PAGE, 'utf8');

function hrefsDe(html: string): string[] {
  return [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
}
function tousLesHrefs(): string[] {
  const out: string[] = [...hrefsDe(complement.bio.html)];
  for (const r of Object.values(complement.recits)) out.push(...hrefsDe(r.html));
  return out;
}

describe('revue entretiens S3 — contenu et récits V2', () => {
  it('monte dix entretiens structurés', () => {
    expect(interviews).toHaveLength(10);
    for (const it of interviews) {
      expect(it.slug).toBe(`entretien-${it.num}`);
      expect(it.statut).toContain('À APPROUVER PAR SÉBASTIEN');
      expect(it.sections.length).toBeGreaterThan(4);
    }
  });

  it('fournit une biographie avec portrait réel et dix récits proposés', () => {
    expect(complement.bio.html.length).toBeGreaterThan(400);
    expect(complement.bio.timeline.length).toBeGreaterThanOrEqual(4);
    // Portrait réel de Sébastien (pas une image de studio générique).
    expect(complement.bio.portrait.src).toContain('portrait-sebastien-jourdan');
    expect(fs.existsSync(path.join(ROOT, 'public', complement.bio.portrait.src))).toBe(true);
    const nums = Object.keys(complement.recits);
    expect(nums).toHaveLength(10);
    for (const r of Object.values(complement.recits)) {
      expect(r.statut).toContain('À APPROUVER PAR SÉBASTIEN');
      expect(r.html.length).toBeGreaterThan(200);
      expect(r.provenance.length).toBeGreaterThan(20);
    }
  });

  it('les 23 croquis référencés existent sur le disque', () => {
    const refs = new Set<string>();
    for (const it of interviews) for (const s of it.sections) for (const f of s.figures) refs.add(f.name);
    expect(refs.size).toBe(23);
    for (const name of refs) expect(fs.existsSync(path.join(IMG_DIR, `${name}.svg`))).toBe(true);
  });

  it('toutes les vraies photos (portrait + récits) existent sur le disque', () => {
    const srcs = new Set<string>([complement.bio.portrait.src]);
    for (const r of Object.values(complement.recits)) for (const p of r.photos) srcs.add(p.src);
    expect(srcs.size).toBeGreaterThan(5);
    for (const s of srcs) {
      expect(s).toMatch(/^\/images\/.+\.(avif|webp|jpg|png)$/);
      expect(fs.existsSync(path.join(ROOT, 'public', s))).toBe(true);
    }
  });

  it('les lunettes ne servent que dans l’entretien 09 (pas de doublon visuel)', () => {
    for (const [num, r] of Object.entries(complement.recits)) {
      const lunettes = r.photos.some((p) => p.src.includes('lunettes'));
      if (num !== '09') expect(lunettes, `entretien ${num}`).toBe(false);
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

describe('revue entretiens S3 — maillage contextuel vérifié', () => {
  const hrefs = tousLesHrefs();

  it('comporte au moins quinze liens contextuels dans le corps des récits', () => {
    expect(hrefs.length).toBeGreaterThanOrEqual(15);
  });

  it('chaque destination interne existe réellement', () => {
    const secteurs = fs.readFileSync(path.join(ROOT, 'data/secteurs.ts'), 'utf8');
    const machines = fs.existsSync(path.join(ROOT, 'components/machine-selector/lib/machines.ts'))
      ? fs.readFileSync(path.join(ROOT, 'components/machine-selector/lib/machines.ts'), 'utf8') : '';
    const slugs = new Set(interviews.map((it) => it.slug));
    for (const h of hrefs) {
      if (h.startsWith('#')) {
        const base = h.slice(1).split('-').slice(0, 2).join('-');
        expect(slugs.has(base), `ancre ${h}`).toBe(true);
      } else if (h.startsWith('/fr/blog/')) {
        expect(fs.existsSync(path.join(BLOG_FR, `${h.split('/fr/blog/')[1]}.json`)), h).toBe(true);
      } else if (h.startsWith('/fr/guide/')) {
        expect(fs.existsSync(path.join(GUIDES_FR, `${h.split('/fr/guide/')[1]}.json`)), h).toBe(true);
      } else if (h.startsWith('/fr/industrie/')) {
        expect(secteurs.includes(`slug: '${h.split('/fr/industrie/')[1]}'`), h).toBe(true);
      } else if (h.startsWith('/fr/studio-photo/')) {
        const s = h.split('/fr/studio-photo/')[1];
        const ok = fs.existsSync(path.join(ROOT, 'app/[lang]/studio-photo', s)) // page dédiée
          || fs.existsSync(path.join(GUIDES_FR, `${s}.json`))
          || machines.includes(s); // slug machine (gabarit [slug])
        expect(ok, h).toBe(true);
      } else if (h.startsWith('/fr/')) {
        // route dédiée (dossier app/[lang]/<p>)
        expect(fs.existsSync(path.join(ROOT, 'app/[lang]', h.split('/fr/')[1].replace(/\/$/, ''))), h).toBe(true);
      }
    }
  });
});

describe('revue entretiens S3 — navigation D44 forme A', () => {
  it('utilise la barre horizontale collante mutualisée', () => {
    expect(source).toContain("from '@/components/navigation/SommaireCollant'");
    expect(source).toContain('<SommaireCollant');
    expect(source).toContain('ancreSommaire="sommaire-collection"');
  });

  it('ne réintroduit pas la colonne latérale B en desktop', () => {
    expect(source).not.toMatch(/hidden\s+w-\d+\s+shrink-0\s+lg:block/);
    expect(source).not.toContain('sticky top-24');
  });
});

describe('revue entretiens S3 — gardes de non-publication', () => {
  it('renvoie 404 en production et en rendu dynamique', () => {
    expect(source).toMatch(/process\.env\.VERCEL_ENV === 'production'/);
    expect(source).toContain("export const dynamic = 'force-dynamic'");
    expect(source).toContain('notFound()');
  });
  it('déclare robots noindex/nofollow', () => {
    expect(source).toMatch(/index:\s*false/);
    expect(source).toMatch(/follow:\s*false/);
  });
  it('n’est pas enregistrée dans le plan de site', () => {
    expect(fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8')).not.toContain('revue-entretiens');
  });
  it('ne pose pas « Sébastien Jourdan » comme auteur public', () => {
    expect(source).toContain('PackshotCreator');
    expect(source).not.toMatch(/author[^\n]*Sébastien Jourdan/);
  });
});
