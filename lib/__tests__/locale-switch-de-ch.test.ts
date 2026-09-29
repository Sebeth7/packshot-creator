/**
 * Sélecteur de langue des 8 hubs de-ch (/de-ch/branchen/<slug allemand>).
 *
 * Défaut corrigé (audit de maillage du 29/09/2026) : ces pages sont prérendues
 * sous leur chemin interne réécrit (/de-ch/industrie/<slug>). usePathname() de
 * next-intl renvoie alors « /industrie/<slug> », sans motif ni slug, et le
 * sélecteur recopiait le slug allemand sous /fr et /en : 26 liens en 404, 6 en 301.
 *
 * Attendus :
 * - FR : le hub FR du secteur, même cible que le hreflang `fr` de la page ;
 * - EN : /en/studios-photo-automatises, parce que les 17 hubs /en/industrie/*
 *   sont noindex (lib/seo-config.ts). Règle existante, identique au bouton EN
 *   des hubs FR.
 */
import { describe, it, expect, vi, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  DE_CH_COVERED_DYNAMIC,
  deChSectorSlug,
  localeSwitchHref,
} from '@/i18n/deChCoverage';
import { secteurs } from '@/data/secteurs';
import worker from '@/cloudflare-worker/src/index.js';

// Slug allemand (segment /de-ch/branchen/<…>) → slug du hub FR.
// Réciproque attendue de DE_CH_SECTOR_MAP (app/[lang]/industrie/[slug]/page.tsx).
const HUBS: Record<string, string> = {
  schmuck: 'bijoux-joaillerie',
  uhren: 'horlogerie',
  mode: 'mode-textile',
  schoenheit: 'cosmetiques-beaute',
  sport: 'sport-outdoor',
  brillen: 'lunetterie',
  elektronik: 'electronique-hightech',
  wein: 'vin-spiritueux',
};

const EN_ATTENDU = { href: '/studios-photo-automatises', locale: 'en' };
const frAttendu = (frSlug: string) => ({
  href: { pathname: '/industrie/[slug]', params: { slug: frSlug } },
  locale: 'fr',
});

const fetchOrigine = vi
  .spyOn(globalThis, 'fetch')
  .mockImplementation(async () => new Response('origine', { status: 299 }));
afterAll(() => fetchOrigine.mockRestore());

/** Réponse du Worker (R5 : source unique) pour un chemin de www. */
async function worker_repond(chemin: string) {
  const r = await worker.fetch(new Request(`https://www.packshot-creator.com${chemin}`), {
    NEXTJS_ORIGIN: 'https://sysnext.vercel.app',
  });
  return { statut: r.status, location: r.headers.get('location') };
}

const NEXT_CONFIG = readFileSync(path.resolve(import.meta.dirname, '..', '..', 'next.config.ts'), 'utf-8');

describe('sélecteur de langue des hubs de-ch', () => {
  it('la table du test couvre exactement les 8 hubs servis en de-ch', () => {
    expect(new Set(Object.keys(HUBS))).toEqual(DE_CH_COVERED_DYNAMIC['/industrie/[slug]']);
  });

  for (const [de, fr] of Object.entries(HUBS)) {
    describe(`/de-ch/branchen/${de}`, () => {
      it(`FR → /fr/industrie/${fr} (chemin concret du prérendu)`, () => {
        expect(localeSwitchHref(`/industrie/${de}`, undefined, 'de-ch', 'fr')).toEqual(frAttendu(fr));
      });

      it(`FR → /fr/industrie/${fr} (motif, pathname résolu côté client)`, () => {
        expect(localeSwitchHref('/industrie/[slug]', de, 'de-ch', 'fr')).toEqual(frAttendu(fr));
      });

      it('EN → /en/studios-photo-automatises, jamais /en/industrie/<slug allemand>', () => {
        expect(localeSwitchHref(`/industrie/${de}`, undefined, 'de-ch', 'en')).toEqual(EN_ATTENDU);
        expect(localeSwitchHref('/industrie/[slug]', de, 'de-ch', 'en')).toEqual(EN_ATTENDU);
      });

      it('la cible FR existe : hub FR prérendu, réciproque du slug allemand', () => {
        expect(secteurs.map((s) => s.slug)).toContain(fr);
        expect(deChSectorSlug(fr)).toBe(de);
        expect(fr).not.toBe(de);
      });

      it('la cible FR ne passe par aucune redirection (Worker, next.config)', async () => {
        expect(await worker_repond(`/fr/industrie/${fr}`)).toEqual({ statut: 299, location: null });
        expect(NEXT_CONFIG).not.toContain(`source: '/fr/industrie/${fr}'`);
      });
    });
  }

  it('la cible EN ne passe par aucune redirection (Worker, next.config)', async () => {
    expect(await worker_repond('/en/studios-photo-automatises')).toEqual({ statut: 299, location: null });
    expect(NEXT_CONFIG).not.toContain("source: '/en/studios-photo-automatises'");
  });
});

describe('sélecteur de langue hors hubs de-ch — inchangé', () => {
  it('hub FR → DE-CH sous le slug allemand, EN vers les studios', () => {
    expect(localeSwitchHref('/industrie/[slug]', 'bijoux-joaillerie', 'fr', 'de-ch')).toEqual({
      href: { pathname: '/industrie/[slug]', params: { slug: 'schmuck' } },
      locale: 'de-ch',
    });
    expect(localeSwitchHref('/industrie/[slug]', 'bijoux-joaillerie', 'fr', 'en')).toEqual(EN_ATTENDU);
  });

  it('index des secteurs de-ch → /industrie', () => {
    expect(localeSwitchHref('/industrie', undefined, 'de-ch', 'fr')).toEqual({ href: '/industrie', locale: 'fr' });
  });

  it('contact de-ch → /contact', () => {
    expect(localeSwitchHref('/contact', undefined, 'de-ch', 'en')).toEqual({ href: '/contact', locale: 'en' });
  });

  it('fiche studio de-ch (chemin concret du prérendu) → même id machine', () => {
    expect(localeSwitchHref('/studio-photo/alphashot-360', undefined, 'de-ch', 'fr')).toEqual({
      href: '/studio-photo/alphashot-360',
      locale: 'fr',
    });
  });

  it('article de-ch → article traduit via alternates.json', () => {
    const r = localeSwitchHref('/blog/[slug]', 'altes-packshotcreator-studio-migrieren', 'de-ch', 'fr');
    expect(r).toEqual({
      href: { pathname: '/blog/[slug]', params: { slug: 'migrer-ancien-packshotcreator' } },
      locale: 'fr',
    });
  });
});
