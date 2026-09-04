'use client';

import { type ComponentProps } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { resolveNavHref, type LinkHref } from '@/i18n/deChCoverage';

type LinkProps = ComponentProps<typeof Link>;

/**
 * Lien de navigation globale (Header/Footer) avec épinglage de-ch automatique.
 *
 * Sur la locale de-ch (Suisse alémanique), une cible non couverte par la
 * traduction allemande est rendue avec `locale="fr"` (cf i18n/deChCoverage).
 * Sur fr/en, comportement identique au Link next-intl. Ne pas utiliser pour le
 * sélecteur de langue (qui pilote `locale` lui-même).
 */
export function NavLink({ href, locale, ...props }: LinkProps) {
  const current = useLocale();
  // Une locale explicitement fournie (rare) a priorité sur l'épinglage auto.
  if (locale) return <Link href={href} locale={locale} {...props} />;
  // de-ch : secteur traduit → slug allemand ; sinon épinglage fr/en (cf deChCoverage).
  const resolved = resolveNavHref(current, href as LinkHref);
  return <Link href={resolved.href as LinkProps['href']} locale={resolved.locale} {...props} />;
}
