import { describe, expect, it } from 'vitest';
import { revueInterneAutorisee as autorisee } from '@/lib/revue-interne/acces';
import fs from 'node:fs';
import path from 'node:path';
import {
  DOSSIER_VISUELS,
  PREVIEWS,
  decouperAuxModules,
  fichiersIllustrations,
  illustrationsArticle,
  insererEmplacements,
  insererIllustrations,
  lireArticleRevue,
  type EmplacementVisuel,
  type Illustration,
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
        expect(m.provenance.origine.length).toBeGreaterThan(20);
        expect([true, false, null]).toContain(m.provenance.ia);
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

describe('previews internes AI Act — illustrations fournies', () => {
  const exemple: Illustration = {
    id: 'X0',
    fichier: 'x0-exemple',
    largeurs: [1672, 836],
    largeur: 1672,
    hauteur: 941,
    alt: 'Objet « fictif »',
    legende: 'Illustration générée par IA. Exemple.',
    statut: 'ILLUSTRATION CONTEXTUELLE',
    provenance: { origine: 'test', ia: true },
  };

  it('remplace le marqueur par la figure, avec srcset et attributs échappés', () => {
    const sortie = insererIllustrations('<p>a</p><figure data-illustration="X0"></figure>', [exemple]);
    expect(sortie).toContain('src="/fr/revue-interne/ai-act/visuels/x0-exemple-836.avif"');
    expect(sortie).toContain('x0-exemple-1672.avif 1672w, /fr/revue-interne/ai-act/visuels/x0-exemple-836.avif 836w');
    expect(sortie).toContain('alt="Objet « fictif »"');
    expect(sortie).toContain('<figcaption>Illustration générée par IA. Exemple.</figcaption>');
    expect(sortie).not.toContain('data-illustration="X0"></figure>');
  });

  it('échoue sur un marqueur sans fiche ou une fiche sans marqueur', () => {
    expect(() => insererIllustrations('<figure data-illustration="X9"></figure>', [exemple])).toThrow(/sans fiche/);
    expect(() => insererIllustrations('<p>a</p>', [exemple])).toThrow(/sans marqueur/);
  });

  it('en-têtes B0, C0, D0 et illustrations B1, C2 : fichiers présents, légende IA, statut, provenance', () => {
    const attendus: Record<string, string[]> = {
      retouche: ['B0', 'B1'],
      mannequins: ['C0', 'C2'],
      metadonnees: ['D0'],
    };
    for (const { slug } of PREVIEWS) {
      const article = lireArticleRevue(slug)!;
      const illustrations = illustrationsArticle(article);
      expect(illustrations.map((i) => i.id)).toEqual(attendus[slug]);
      for (const i of illustrations) {
        expect(i.legende.startsWith('Illustration générée par IA. ')).toBe(true);
        expect(i.alt.length).toBeGreaterThan(30);
        // Aucun ALT ne présente le rendu comme une photographie (« studio photo » décrit le décor de D0).
        expect(i.alt).not.toMatch(/photographi/i);
        expect(i.provenance.ia).toBe(true);
        expect(i.statut.length).toBeGreaterThan(0);
        for (const l of i.largeurs) {
          expect(fs.existsSync(path.join(DOSSIER_VISUELS, `${i.fichier}-${l}.avif`))).toBe(true);
        }
      }
      // Les marqueurs du corps sont tous résolus ; le texte des modules reste en place.
      const html = insererIllustrations(article.content, article.illustrations);
      expect(html).not.toMatch(/<figure data-illustration="/);
    }
  });

  it('ne sert que les fichiers référencés, et tous les fichiers du dossier le sont', () => {
    const servis = fichiersIllustrations().sort();
    const presents = fs.readdirSync(DOSSIER_VISUELS).filter((f) => f.endsWith('.avif')).sort();
    expect(servis).toEqual(presents);
    expect(servis).toHaveLength(10);
  });
});
