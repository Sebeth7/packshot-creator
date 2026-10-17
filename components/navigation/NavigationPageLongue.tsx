'use client';

/**
 * Double navigation des pages longues (règle D44, décision Laurent du 15/10/2026).
 *
 * Une page longue éligible porte DEUX navigations synchronisées : la barre horizontale
 * collante en haut (`SommaireCollant`, forme A) et le sommaire vertical à droite
 * (`SommaireLateral`, forme B). Les deux lisent le même état de section active, calculé
 * une seule fois, par l'un de ces deux fournisseurs :
 *
 * - `FournisseurSectionActive` (pages structurées : guide, fiche machine) calcule l'état
 *   avec le scroll-spy mutualisé `useSectionActive` à partir des `id` des sections.
 * - `FournisseurSectionActiveRapportee` (blog) ne calcule rien : il reçoit la section
 *   active du `TableOfContents`, dont la détection — durcie par les incidents de défilement
 *   des 03 et 06/10 (images Webflow sans dimensions) — reste l'unique scroll-spy de la
 *   page. La barre n'en est qu'un reflet.
 *
 * Dans les deux cas : un seul scroll-spy par page. Un `SommaireCollant` rendu HORS de tout
 * fournisseur conserve son comportement autonome d'origine (pages à barre seule non
 * encore basculées en double navigation).
 */
import { createContext, useContext, useState } from 'react';
import { useSectionActive, type EtatSection } from './useSectionActive';

/** État de section active, lu par la barre et le sommaire latéral. */
export const SectionActiveContext = createContext<EtatSection | null>(null);

/** Permet au `TableOfContents` de rapporter la section active au fournisseur du blog. */
export const RapporteurSectionContext = createContext<((id: string | null) => void) | null>(null);

export function useEtatSection(): EtatSection | null {
  return useContext(SectionActiveContext);
}

export function useRapporteurSection(): ((id: string | null) => void) | null {
  return useContext(RapporteurSectionContext);
}

/** Pages structurées (guide, fiche) : scroll-spy mutualisé sur les `id` des sections. */
export function FournisseurSectionActive({
  ids,
  ancreSommaire,
  ancreFin,
  children,
}: {
  ids: string[];
  ancreSommaire?: string;
  ancreFin?: string;
  children: React.ReactNode;
}) {
  const etat = useSectionActive(ids, { ancreSommaire, ancreFin }, true);
  return <SectionActiveContext.Provider value={etat}>{children}</SectionActiveContext.Provider>;
}

/** Blog : la section active vient du `TableOfContents` (unique scroll-spy de la page). */
export function FournisseurSectionActiveRapportee({ children }: { children: React.ReactNode }) {
  const [actif, setActif] = useState<string | null>(null);
  const etat: EtatSection = { actif, visible: actif !== null, haut: 64 };
  return (
    <RapporteurSectionContext.Provider value={setActif}>
      <SectionActiveContext.Provider value={etat}>{children}</SectionActiveContext.Provider>
    </RapporteurSectionContext.Provider>
  );
}
