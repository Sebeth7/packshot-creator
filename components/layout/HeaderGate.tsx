'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import SysnextHeader from '@/components/sysnext/SysnextHeader';

/**
 * Route le rendu du Header selon le chemin courant.
 * - Sous /[lang]/industrie-solutions/* → SysnextHeader (mini-site Sysnext)
 * - Partout ailleurs → Header PackshotCreator
 *
 * Règle R1 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Source : config/cohabitation-marques.md §3 R1.
 */
export default function HeaderGate() {
  const pathname = usePathname() ?? '';
  const isSysnext = /^\/(fr|en)\/industrie-solutions(\/|$)/.test(pathname);
  return isSysnext ? <SysnextHeader /> : <Header />;
}
