'use client';

/** Événement de présélection d'une machine dans le formulaire de demande. */
export const EVENEMENT_MACHINE = 'occasion:machine';

/** Bouton « Cette machine m'intéresse » d'une carte : présélectionne sa référence. */
export function BoutonMachine({ reference, children, className }: { reference: string; children: React.ReactNode; className: string }) {
  return (
    <button
      type="button"
      data-machine={reference}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(EVENEMENT_MACHINE, { detail: reference }))}
    >
      {children}
    </button>
  );
}

/** Événement de demande d'informations sur un MODÈLE (présentation sans stock). */
export const EVENEMENT_MODELE = 'occasion:modele';

export interface DemandeModele {
  famille: string;
  besoin: string;
}

/**
 * Bouton discret d'une carte de modèle : présélectionne la famille et propose un
 * début de texte dans le formulaire de demande (modifiable). Aucune route ni donnée
 * supplémentaire : le formulaire de recherche est inchangé.
 */
export function BoutonModele({ famille, besoin, children, className }: { famille: string; besoin: string; children: React.ReactNode; className: string }) {
  return (
    <button
      type="button"
      data-modele={famille}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<DemandeModele>(EVENEMENT_MODELE, { detail: { famille, besoin } }))}
    >
      {children}
    </button>
  );
}
