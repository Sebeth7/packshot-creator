/**
 * Publication en deux étapes (décision de Laurent, 16/10/2026) : étape A, recherche
 * seule ; la liste d'alerte reste fermée. En vue publique, ni section d'alerte ni
 * lien vers elle tant que la liste est fermée ; l'aperçu interne la montre toujours ;
 * ouverte, elle réapparaît sans autre modification. Aucun réseau, aucun e-mail.
 */
import { describe, it, expect, vi } from 'vitest';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import OccasionOrbitvu from '@/components/landings/occasion/OccasionOrbitvu';
import { alertesProposees } from '@/lib/occasion/alertes/affichage';
import { LANGUES_OCCASION } from '@/lib/occasion/langues';

// Le lien localisé de next-intl demande un fournisseur de contexte : remplacé par un lien simple.
vi.mock('@/i18n/routing', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/i18n/routing')>();
  const { createElement: h } = await import('react');
  return {
    ...original,
    Link: ({ href, children, className }: { href: unknown; children?: ReactNode; className?: string }) =>
      h('a', { href: typeof href === 'string' ? href : '#', className }, children),
  };
});

const FERMEE = { active: false, jusqua: null };
const OUVERTE = { active: true, jusqua: null };

function page(langue: (typeof LANGUES_OCCASION)[number], opts: { apercuInterne: boolean; alertes: { active: boolean; jusqua: string | null } }): string {
  return renderToStaticMarkup(
    createElement(OccasionOrbitvu, {
      machines: [],
      apercuInterne: opts.apercuInterne,
      vue: 'reel',
      nombreReel: 0,
      collecte: FERMEE,
      alertes: opts.alertes,
      langue,
    }),
  );
}

describe('alertesProposees', () => {
  it('visible en aperçu interne, ou lorsque la liste est réellement ouverte', () => {
    expect(alertesProposees(FERMEE, false)).toBe(false);
    expect(alertesProposees(FERMEE, true)).toBe(true);
    expect(alertesProposees(OUVERTE, false)).toBe(true);
    expect(alertesProposees(OUVERTE, true)).toBe(true);
  });
});

describe('Landing : section et lien d\'alerte selon l\'état de la liste (FR, EN, DE-CH)', () => {
  for (const langue of LANGUES_OCCASION) {
    it(`${langue} : vue publique, alertes fermées : ni formulaire, ni lien, ni ancre ; recherche intacte`, () => {
      const html = page(langue, { apercuInterne: false, alertes: FERMEE });
      expect(html).not.toContain('id="alertes"');
      expect(html).not.toContain('id="f-alertes"');
      expect(html).not.toContain('href="#alertes"');
      expect(html).not.toContain('id="a-email"');
      expect(html).toContain('id="recherche"');
      expect(html).toContain('id="f-recherche"');
      expect(html).toContain('data-etat="vide"');
    });

    it(`${langue} : aperçu interne, alertes fermées : section visible avec son avis`, () => {
      const html = page(langue, { apercuInterne: true, alertes: FERMEE });
      expect(html).toContain('id="alertes"');
      expect(html).toContain('id="f-alertes"');
      expect(html).toContain('href="#alertes"');
    });

    it(`${langue} : vue publique, alertes ouvertes : section et lien réapparaissent (étape B)`, () => {
      const html = page(langue, { apercuInterne: false, alertes: OUVERTE });
      expect(html).toContain('id="alertes"');
      expect(html).toContain('id="f-alertes"');
      expect(html).toContain('href="#alertes"');
    });
  }
});
