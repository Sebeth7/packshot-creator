import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { getPathname, routing } from '@/i18n/routing';
import { productSchema } from '@/components/seo/SchemaOrg';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';

// Product.url et Offer.url des fiches de-ch (backlog F5 de #55, relevé du 08/10/2026
// sur un build local de main 06b18e2) : les fiches de-ch déclaraient
// /de-ch/studio-photo/<slug>, qui répond 307 vers /de-ch/fotostudio/<slug>
// (13 fiches du sitemap, et les 4 fiches `delisted`, prérendues elles aussi).

const ROOT = process.cwd();
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

/**
 * Exceptions connues, laissées en l'état et tracées : `Service.url` des 8 hubs
 * `/de-ch/branchen/*` vise `/de-ch/industrie/<slug>` (301). Le gabarit est touché
 * par #104 et #107 (HOLD) et sert le hub Mode (gel jusqu'au 26/11/2026).
 */
const EXCEPTIONS_HOLD = [path.join('app', '[lang]', 'industrie', '[slug]', 'page.tsx')];

describe('Product.url et Offer.url — URL canonique de la fiche', () => {
  it('le chemin de la fiche est /fotostudio en de-ch et /studio-photo en fr et en, pour toutes les machines', () => {
    expect(MACHINES.length).toBeGreaterThanOrEqual(13);
    for (const { id } of MACHINES) {
      const href = { pathname: '/studio-photo/[slug]' as const, params: { slug: id } };
      expect(getPathname({ locale: 'de-ch', href })).toBe(`/de-ch/fotostudio/${id}`);
      expect(getPathname({ locale: 'fr', href })).toBe(`/fr/studio-photo/${id}`);
      expect(getPathname({ locale: 'en', href })).toBe(`/en/studio-photo/${id}`);
    }
  });

  it('Offer.url reprend Product.url', () => {
    const url = 'https://www.packshot-creator.com/de-ch/fotostudio/alphashot-pro-g2';
    const p = productSchema({
      name: 'n',
      description: 'd',
      image: 'i',
      url,
      sku: 'alphashot-pro-g2',
      leasingOffer: { monthly: 1, priceCurrency: 'CHF', priceValidUntil: '2026-12-31' },
    });
    expect(p.url).toBe(url);
    expect('offers' in p ? p.offers?.url : undefined).toBe(url);
  });

  it('aucun productSchema ni serviceSchema ne déclare une URL `${lang}` sur un segment localisé en de-ch', () => {
    const localises = (Object.keys(routing.pathnames) as Pathname[])
      .filter((p) => deChPath(p) !== p)
      .map((p) => p.replace(/\/\[[^\]]+\]$/, ''));
    const fautes: string[] = [];
    let blocs = 0;
    for (const file of FILES) {
      if (EXCEPTIONS_HOLD.includes(file)) continue;
      const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
      for (const bloc of src.matchAll(/(?:productSchema|serviceSchema)\(\{([\s\S]*?)\n\s*\}\)/g)) {
        blocs++;
        for (const m of bloc[1].matchAll(/url: `https:\/\/www\.packshot-creator\.com\/\$\{lang\}(\/[^`$]*)/g)) {
          const prefixe = m[1].replace(/\/$/, '');
          if (localises.some((p) => p === prefixe || p.startsWith(`${prefixe}/`))) fautes.push(`${file} : ${m[0]}`);
        }
      }
    }
    expect(blocs).toBeGreaterThan(0);
    expect(fautes).toEqual([]);
  });
});
