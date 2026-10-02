'use client';

import { useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { VisuelCatalogue } from './visuels';

/**
 * Agrandissement d'une double page (V5 : matrice de sélection, illisible à la largeur
 * de la page). Fenêtre modale native : focus piégé et touche Échap gérés par le
 * navigateur. L'image est montrée à la taille du fichier, défilable dans les deux sens.
 */
export function AgrandirPage({ visuel, libelle }: { visuel: VisuelCatalogue; libelle: string }) {
  const dialogue = useRef<HTMLDialogElement>(null);
  if (!visuel.src) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => dialogue.current?.showModal()}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-very-peri-600 underline-offset-4 hover:text-very-peri-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400"
      >
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
        {libelle}
      </button>
      <dialog
        ref={dialogue}
        aria-label={visuel.texte}
        // Clic sur le voile, hors du contenu : fermeture.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[96vw] max-w-none overflow-hidden rounded-xl bg-white p-0 text-future-dusk-900 shadow-2xl backdrop:bg-future-dusk-900/80"
      >
        <div className="flex items-center justify-between gap-4 border-b border-future-dusk-100 px-4 py-2">
          <p className="text-sm font-semibold">{visuel.texte}</p>
          <button
            type="button"
            autoFocus
            onClick={() => dialogue.current?.close()}
            aria-label="Fermer l’agrandissement"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-future-dusk-700 hover:bg-future-dusk-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div tabIndex={0} data-lenis-prevent className="max-h-[calc(92vh-3.75rem)] overflow-auto focus:outline-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visuel.src}
            alt={visuel.alt}
            width={visuel.width}
            height={visuel.height}
            loading="lazy"
            className="block h-auto max-w-none"
            style={{ width: visuel.width }}
          />
        </div>
      </dialog>
    </>
  );
}
