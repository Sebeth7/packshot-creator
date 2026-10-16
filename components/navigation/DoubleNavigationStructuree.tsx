'use client';

/**
 * Double navigation à sommaire latéral EN OVERLAY. Règle D44, utilisée par la fiche machine
 * (A2) : la barre horizontale en haut et le sommaire latéral `fixed` dans la gouttière
 * droite, autour d'un unique scroll-spy (`FournisseurSectionActive`), mêmes sections.
 *
 * Le seuil d'affichage du sommaire est porté par `classeLaterale` : la fiche Alphashot le
 * limite à ≥ 1920 px (`d44-laterale-fiche`, seuil CSS explicite). Le guide, lui, utilise
 * une vraie colonne réservée en flux (voir son gabarit), pas ce composant.
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
  classeLaterale,
}: {
  titre: string;
  libelle: string;
  libelleLateral: string;
  entrees: EntreeSommaire[];
  ancreFin?: string;
  /** Classe de seuil d'affichage du sommaire latéral overlay (ex. `d44-laterale-fiche`). */
  classeLaterale?: string;
}) {
  if (entrees.length === 0) return null;
  return (
    <FournisseurSectionActive ids={entrees.map((e) => e.id)} ancreFin={ancreFin}>
      <SommaireCollant titre={titre} libelle={libelle} entrees={entrees} ancreFin={ancreFin} />
      <SommaireLateral
        titre={titre}
        libelle={libelleLateral}
        entrees={entrees}
        variant="overlay"
        seuilClassName={classeLaterale}
      />
    </FournisseurSectionActive>
  );
}
