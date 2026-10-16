'use client';

/**
 * Double navigation des pages structurées (guide, fiche machine). Règle D44.
 *
 * Rend, autour d'un unique scroll-spy (`FournisseurSectionActive`), la barre horizontale
 * en haut ET le sommaire vertical à droite, alimentés par les mêmes sections. Remplace le
 * rendu de la seule barre sur les pages basculées en double navigation ; les pages à barre
 * seule continuent de rendre `SommaireCollant` directement.
 */
import { FournisseurSectionActive } from './NavigationPageLongue';
import SommaireCollant, { type EntreeSommaire } from './SommaireCollant';
import SommaireLateral from './SommaireLateral';

export default function DoubleNavigationStructuree({
  titre,
  libelle,
  libelleLateral,
  entrees,
  ancreFin,
}: {
  titre: string;
  libelle: string;
  libelleLateral: string;
  entrees: EntreeSommaire[];
  ancreFin?: string;
}) {
  if (entrees.length === 0) return null;
  return (
    <FournisseurSectionActive ids={entrees.map((e) => e.id)} ancreFin={ancreFin}>
      <SommaireCollant titre={titre} libelle={libelle} entrees={entrees} ancreFin={ancreFin} />
      <SommaireLateral titre={titre} libelle={libelleLateral} entrees={entrees} />
    </FournisseurSectionActive>
  );
}
