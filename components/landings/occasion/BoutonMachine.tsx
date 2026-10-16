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
