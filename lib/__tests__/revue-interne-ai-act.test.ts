import { describe, expect, it } from 'vitest';
import { revueInterneAutorisee as autorisee } from '@/lib/revue-interne/acces';
import {
  PREVIEWS,
  decouperAuxModules,
  insererEmplacements,
  lireArticleRevue,
  type EmplacementVisuel,
} from '../../app/[lang]/revue-interne/ai-act/donnees';
import { lireModules } from '../../app/[lang]/revue-interne/ai-act/modules';

describe('previews internes AI Act — garde d’environnement', () => {
  it('autorise la Preview Vercel en FR', () => {
    expect(autorisee('fr', { VERCEL: '1', VERCEL_ENV: 'preview', NODE_ENV: 'production' })).toBe(true);
  });
  it('autorise le développement local hors Vercel', () => {
    expect(autorisee('fr', { NODE_ENV: 'development' })).toBe(true);
  });
  it('refuse la production Vercel', () => {
    expect(autorisee('fr', { VERCEL: '1', VERCEL_ENV: 'production', NODE_ENV: 'production' })).toBe(false);
  });
  it('refuse une build hors Vercel (CI, next start)', () => {
    expect(autorisee('fr', { NODE_ENV: 'production' })).toBe(false);
    expect(autorisee('fr', {})).toBe(false);
  });
  it('refuse l’environnement development de Vercel et les autres locales', () => {
    expect(autorisee('fr', { VERCEL: '1', VERCEL_ENV: 'development', NODE_ENV: 'development' })).toBe(false);
    expect(autorisee('en', { VERCEL: '1', VERCEL_ENV: 'preview' })).toBe(false);
    expect(autorisee('de-ch', { NODE_ENV: 'development' })).toBe(false);
  });
});

describe('previews internes AI Act — emplacements et modules', () => {
  const visuels: EmplacementVisuel[] = [
    { id: 'X1', emplacement: 'corps', ratio: '16:9', message: 'm1' },
    { id: 'X2', emplacement: 'corps', ratio: '16:9', message: 'm2' },
  ];
  const html = '<h2>Section un</h2><p>a</p><figure data-visuel="X1"></figure><h2>Section deux</h2><figure data-visuel="X2"></figure>';

  it('remplace par un repère le seul marqueur couvert par un module', () => {
    const sortie = insererEmplacements(html, visuels, new Set(['X1']));
    expect(sortie).toContain('<div data-module-revue="X1"></div>');
    expect(sortie).toContain('data-visuel="X2"');
    expect(sortie).toContain('Visuel X2 à intégrer');
  });

  it('échoue si un module n’a pas de marqueur', () => {
    expect(() => insererEmplacements(html, visuels, new Set(['X9']))).toThrow(/Module sans marqueur/);
  });

  it('découpe aux repères et contrôle la section H2', () => {
    const sortie = insererEmplacements(html, visuels, new Set(['X1']));
    const segments = decouperAuxModules(sortie, new Map([['X1', 'Section un']]));
    expect(segments.map((s) => s.type)).toEqual(['html', 'module', 'html']);
    expect(() => decouperAuxModules(sortie, new Map([['X1', 'Section deux']]))).toThrow(/hors de sa section/);
  });

  it('place chacun des huit modules sous sa section, avec un SVG par étape', () => {
    const attendus: Record<string, string[]> = {
      retouche: ['B1', 'B2', 'B3'],
      mannequins: ['C1', 'C2'],
      metadonnees: ['D1', 'D2', 'D3'],
    };
    for (const { slug } of PREVIEWS) {
      const article = lireArticleRevue(slug);
      expect(article).not.toBeNull();
      const modules = lireModules(slug);
      expect([...modules.keys()]).toEqual(attendus[slug]);
      for (const m of modules.values()) {
        expect(m.etapes.length).toBeGreaterThanOrEqual(2);
        for (const e of m.etapes) expect(e.image.startsWith('data:image/svg+xml;base64,')).toBe(true);
      }
      const sortie = insererEmplacements(article!.content, article!.visuels, new Set(modules.keys()));
      const segments = decouperAuxModules(sortie, new Map([...modules.values()].map((m) => [m.id, m.section])));
      expect(segments.filter((s) => s.type === 'module').map((s) => (s.type === 'module' ? s.id : ''))).toEqual(
        attendus[slug],
      );
    }
  });
});
