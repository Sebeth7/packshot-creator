'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import SysnextFooter from '@/components/sysnext/SysnextFooter';

/**
 * Route le rendu du Footer selon le chemin courant.
 * - Sous /[lang]/industrie-solutions/* → SysnextFooter (mini-site Sysnext)
 * - Partout ailleurs → Footer PackshotCreator
 *
 * Règle R1 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Source : config/cohabitation-marques.md §3 R1.
 */
export default function FooterGate() {
  const pathname = usePathname() ?? '';
  const isSysnext = /^\/(fr|en)\/industrie-solutions(\/|$)/.test(pathname);
  return isSysnext ? <SysnextFooter /> : <Footer />;
}
