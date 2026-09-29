import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { getPathname, routing } from '@/i18n/routing';
import { articleSchema } from '@/components/seo/SchemaOrg';
import { getArticle } from '@/lib/content';

// Corrections JSON-LD techniques du 29/09/2026 : fil d'Ariane de-ch (307),
// étape « Solutions » (404), Organization unique, dateModified des sources.

const ROOT = process.cwd();
const SITE = 'https://www.packshot-creator.com';
type Pathname = keyof typeof routing.pathnames;

function sources(dir: string): string[] {
  return fs
    .readdirSync(path.join(ROOT, dir), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))
    .map((f) => path.join(dir, f));
}
const FILES = [...sources('app'), ...sources('components')];

/** Chemin de-ch d'un pathname déclaré (identique à la clé s'il n'est pas localisé). */
function deChPath(p: Pathname): string {
  const v = routing.pathnames[p];
  return typeof v === 'string' ? v : v['de-ch'];
}

/** URL à suffixe statique des fils d'Ariane construits à la main : `${SITE}/${lang}/<suffixe>`. */
function breadcrumbStaticUrls(): { file: string; suffix: string }[] {
  const out: { file: string; suffix: string }[] = [];
  for (const file of FILES) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    for (const block of src.matchAll(/(?:const breadcrumbs = \[|breadcrumbSchema\(\[)([\s\S]*?)\n\s*\]/g)) {
      for (const m of block[1].matchAll(/url: `https:\/\/www\.packshot-creator\.com\/\$\{lang\}(\/[^`]*)?`/g)) {
        out.push({ file, suffix: m[1] ?? '' });
      }
    }
  }
  return out;
}

describe('BreadcrumbList — URL résolues par les routes localisées', () => {
  it('getPathname donne le segment de-ch des 9 pathnames corrigés, et le chemin inchangé en fr et en', () => {
    // [href, chemin fr et en, chemin de-ch]
    const cas: [Parameters<typeof getPathname>[0]['href'], string, string][] = [
      [{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-pro-g2' } }, '/studio-photo/alphashot-pro-g2', '/fotostudio/alphashot-pro-g2'],
      ['/studio-photo/selecteur-machines', '/studio-photo/selecteur-machines', '/fotostudio/maschinen-finder'],
      ['/a-propos', '/a-propos', '/wer-sind-wir'],
      ['/besoins-photographie-produit', '/besoins-photographie-produit', '/produktfotografie-bedarf'],
      ['/calculateur-roi', '/calculateur-roi', '/roi-rechner'],
      ['/contact', '/contact', '/kontakt'],
      ['/industrie', '/industrie', '/branchen'],
      ['/packshot-industriel', '/packshot-industriel', '/packshot-industrie'],
      ['/questions-cles-photographie-produit', '/questions-cles-photographie-produit', '/wichtige-fragen-produktfotografie'],
    ];
    for (const [href, fr, deCh] of cas) {
      expect(getPathname({ locale: 'de-ch', href })).toBe(`/de-ch${deCh}`);
      expect(getPathname({ locale: 'fr', href })).toBe(`/fr${fr}`);
      expect(getPathname({ locale: 'en', href })).toBe(`/en${fr}`);
    }
  });

  it('aucun fil d’Ariane construit à la main ne vise un segment localisé en de-ch, ni un chemin sans route', () => {
    const urls = breadcrumbStaticUrls();
    expect(urls.length).toBeGreaterThan(30);
    const declared = (Object.keys(routing.pathnames) as Pathname[]).map((p) => ({
      p,
      re: new RegExp(`^${p.replace(/\[[^\]]+\]/g, '[^/]+')}$`),
    }));
    const localises = declared.filter(({ p }) => deChPath(p) !== p).map(({ p }) => p);
    const fautes = urls.filter(({ suffix }) => {
      if (suffix === '') return false; // accueil /${lang}
      const i = suffix.indexOf('${');
      if (i >= 0) {
        // Suffixe interpolé (/studio-photo/${slug}) : seul le préfixe statique
        // se contrôle. Un préfixe réduit à « / » ne dit rien : non contrôlé.
        const prefixe = suffix.slice(0, i);
        return prefixe !== '/' && localises.some((p) => p.startsWith(prefixe));
      }
      const route = declared.find(({ re }) => re.test(suffix));
      if (!route) return true; // ex. /solutions : aucune page (404)
      return deChPath(route.p) !== route.p; // localisé : 307 en de-ch
    });
    expect(fautes).toEqual([]);
  });
});

describe('Organization — une seule définition', () => {
  it('aucune page ne dérive une variante de organizationSchema()', () => {
    const variantes = FILES.filter((f) => /\.\.\.organizationSchema\(/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));
    expect(variantes).toEqual([]);
  });

  it('la page distributeur Suisse émet le schéma commun', () => {
    const src = fs.readFileSync(path.join(ROOT, 'app/[lang]/distributeur-orbitvu-suisse/page.tsx'), 'utf8');
    expect(src).toMatch(/schema=\{\[\s*organizationSchema\(\),/);
  });
});

describe('Article.dateModified — valeur des sources de contenu', () => {
  const base = { title: 't', description: 'd', url: `${SITE}/fr/blog/x`, datePublished: '2024-01-08T00:00:00.000Z' };

  it('transmet dateModified sans toucher datePublished', () => {
    const a = articleSchema({ ...base, dateModified: '2026-05-02' });
    expect(a.datePublished).toBe('2024-01-08T00:00:00.000Z');
    expect(a.dateModified).toBe('2026-05-02');
  });

  it('sans dateModified dans la source, repli inchangé sur datePublished', () => {
    expect(articleSchema(base).dateModified).toBe('2024-01-08T00:00:00.000Z');
  });

  it('le chargeur expose dateModified des 3 fichiers qui le portent, et seulement eux', () => {
    const avec = [
      ['fr', 'guide-photographie-packshot-pourquoi-faire-packshots'],
      ['en', 'packshot-photography-guide-why-make-product-packshots'],
      ['de-ch', 'leitfaden-packshot-fotografie-warum-packshots-machen'],
    ] as const;
    for (const [lang, slug] of avec) {
      const a = getArticle(slug, lang);
      expect(a?.dateModified).toBe('2026-05-02');
      expect(a?.date).toBe('2024-01-08T00:00:00.000Z');
    }
    const dir = path.join(ROOT, 'content/blog');
    const porteurs = fs
      .readdirSync(dir, { recursive: true })
      .map(String)
      .filter((f) => f.endsWith('.json') && f !== 'alternates.json')
      .filter((f) => 'dateModified' in JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
    expect(porteurs).toHaveLength(3);
  });
});
