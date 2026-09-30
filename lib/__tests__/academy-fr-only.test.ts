/**
 * /academy est servie en français uniquement depuis le 30/09/2026 : /en/academy et
 * /de-ch/academy redirigent en 301 vers /fr/academy (next.config.ts). Les liens de
 * navigation, depuis toutes les locales, doivent pointer directement sur /fr, sans
 * passer par la redirection, et le sélecteur de langue ne doit pas renvoyer vers
 * une URL qui redirige aussitôt vers la page quittée.
 */
import { describe, it, expect } from 'vitest';
import { navPinLocale, resolveNavHref, localeSwitchHref } from '@/i18n/deChCoverage';

describe('academy : page FR uniquement', () => {
  it('lien de navigation vers /academy épinglé sur fr depuis en et de-ch', () => {
    expect(navPinLocale('en', '/academy')).toBe('fr');
    expect(navPinLocale('de-ch', '/academy')).toBe('fr');
    expect(resolveNavHref('en', '/academy')).toEqual({ href: '/academy', locale: 'fr' });
  });

  it('depuis fr, comportement normal', () => {
    expect(navPinLocale('fr', '/academy')).toBeUndefined();
  });

  it('les autres cibles ne sont pas affectées', () => {
    expect(navPinLocale('en', '/contact')).toBeUndefined();
    expect(navPinLocale('de-ch', '/contact')).toBeUndefined();
  });

  it('sélecteur de langue sur /fr/academy : EN et DE-CH mènent à l’accueil de la locale', () => {
    expect(localeSwitchHref('/academy', undefined, 'fr', 'en')).toEqual({ href: '/', locale: 'en' });
    expect(localeSwitchHref('/academy', undefined, 'fr', 'de-ch')).toEqual({ href: '/', locale: 'de-ch' });
    expect(localeSwitchHref('/academy', undefined, 'fr', 'fr')).toEqual({ href: '/academy', locale: 'fr' });
  });
});
