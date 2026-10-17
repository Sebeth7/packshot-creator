'use client';

/**
 * Double navigation des articles de blog. Règle D44.
 *
 * L'article porte déjà son sommaire latéral (`TableOfContents`, colonne droite). Ce
 * composant ajoute la barre horizontale en haut, SANS second scroll-spy : le
 * `TableOfContents` rendu dans `children` rapporte sa section active au
 * `FournisseurSectionActiveRapportee`, et la barre n'en est que le reflet. La détection de
 * section active du blog, durcie par les incidents de défilement (images Webflow sans
 * dimensions), reste l'unique scroll-spy de la page.
 */
import { FournisseurSectionActiveRapportee } from './NavigationPageLongue';
import SommaireCollant, { type EntreeSommaire } from './SommaireCollant';

export default function DoubleNavigationBlog({
  actif,
  titre,
  libelle,
  entrees,
  children,
}: {
  /** Double navigation active pour cet article (pilote). Sinon : rendu inchangé. */
  actif: boolean;
  titre: string;
  libelle: string;
  entrees: EntreeSommaire[];
  children: React.ReactNode;
}) {
  // Hors pilote : aucun fournisseur, aucune barre — rendu identique à l'existant.
  if (!actif || entrees.length === 0) return <>{children}</>;
  return (
    <FournisseurSectionActiveRapportee>
      <SommaireCollant titre={titre} libelle={libelle} entrees={entrees} />
      {children}
    </FournisseurSectionActiveRapportee>
  );
}
