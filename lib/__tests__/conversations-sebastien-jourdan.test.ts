import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import fr from '@/content/conversations-sebastien-jourdan/fr.json';
import en from '@/content/conversations-sebastien-jourdan/en.json';
import deCh from '@/content/conversations-sebastien-jourdan/de-ch.json';

/**
 * Hub éditorial PUBLIC « Conversations avec Sébastien Jourdan » (hors blog, trilingue).
 *
 * Contraire de l'espace de revue interne : cette page EST indexable. Les gardes
 * verrouillent : structure identique des trois langues, existence réelle des 23
 * croquis et des photos, de-ch sans « ß », auteur éditorial = PackshotCreator
 * (Sébastien = sujet via `about`), aucun schéma d'interview enregistrée, et la
 * présence des trois URL au plan de site.
 */
const ROOT = process.cwd();
const PAGE = path.join(ROOT, 'app/[lang]/conversations-sebastien-jourdan/page.tsx');
const source = fs.readFileSync(PAGE, 'utf8');

type Photo = { src: string };
type Figure = { src: string };
type Section = { figures: Figure[] };
type Entretien = { num: string; slug: string; sections: Section[]; recitPhotos: Photo[] };
type Collection = { transparence: string; bio: { portrait: { src: string } }; entretiens: Entretien[] };

const COLL: Record<string, Collection> = {
  fr: fr as Collection,
  en: en as Collection,
  'de-ch': deCh as Collection,
};

describe('hub conversations — intégrité trilingue', () => {
  it('monte dix conversations par langue, structure alignée sur le FR', () => {
    for (const [loc, c] of Object.entries(COLL)) {
      expect(c.entretiens, loc).toHaveLength(10);
      for (let i = 0; i < 10; i += 1) {
        expect(c.entretiens[i].num).toBe((fr as Collection).entretiens[i].num);
        expect(c.entretiens[i].slug).toBe((fr as Collection).entretiens[i].slug);
        expect(c.entretiens[i].sections.length).toBe((fr as Collection).entretiens[i].sections.length);
      }
      expect(c.bio.portrait.src).toContain('portrait-sebastien-jourdan');
      expect(c.transparence.length).toBeGreaterThan(100);
    }
  });

  it('référence 23 croquis et des photos qui existent toutes sur le disque', () => {
    const refs = new Set<string>();
    for (const e of (fr as Collection).entretiens) {
      for (const s of e.sections) for (const f of s.figures) refs.add(f.src);
      for (const p of e.recitPhotos) refs.add(p.src);
    }
    refs.add((fr as Collection).bio.portrait.src);
    const svgs = [...refs].filter((s) => s.endsWith('.svg'));
    expect(svgs.length).toBe(23);
    for (const s of refs) expect(fs.existsSync(path.join(ROOT, 'public', s)), s).toBe(true);
  });

  it('l’adaptation de-ch ne contient aucun « ß »', () => {
    expect(JSON.stringify(deCh)).not.toContain('ß');
  });

  it('est publique et indexable : aucune garde 404 production ni noindex', () => {
    expect(source).not.toContain("VERCEL_ENV === 'production'");
    expect(source).not.toMatch(/robots:\s*\{\s*index:\s*false/);
    expect(source).toContain('PUBLISHED_LANGS');
    expect(source).toContain('canonical:');
    expect(source).toContain('buildLanguages(');
  });

  it('données structurées sincères : auteur PackshotCreator, Sébastien en sujet, pas d’interview', () => {
    expect(source).not.toMatch(/['"]@type['"]:\s*['"](Interview|VideoObject)['"]/);
    expect(source).toMatch(/@type['"]:\s*'Article'/);
    expect(source).toContain('#person-sebastien-jourdan');
    expect(source).toContain('about:');
  });

  it('est inscrite au plan de site dans les trois langues', () => {
    const sm = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
    for (const p of [
      '/fr/conversations-sebastien-jourdan',
      '/en/conversations-sebastien-jourdan',
      '/de-ch/conversations-sebastien-jourdan',
    ]) {
      expect(sm).toContain(p);
    }
  });
});
