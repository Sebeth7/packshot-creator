'use client';

import type { ReactNode } from 'react';
import { TELEPHONES } from './contenu';
import { mesurerAppel, type LieuClic } from './mesure';

/** Lien `tel:` France ou Suisse, mesuré au clic (sans donnée personnelle). */
export function LienTelephone({
  pays,
  lieu,
  className,
  children,
}: {
  pays: 'FR' | 'CH';
  lieu: LieuClic;
  className?: string;
  children?: ReactNode;
}) {
  const tel = TELEPHONES[pays];
  return (
    <a href={tel.href} onClick={() => mesurerAppel(pays, lieu)} className={className}>
      {children ?? tel.affiche}
    </a>
  );
}
