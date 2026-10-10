'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { VisuelCatalogue } from './visuels';

/**
 * Double page en vignette, agrandie au clic (V5.1 : matrice de sélection K6). La
 * vignette suffit à reconnaître la matrice ; sa lecture se fait dans une fenêtre
 * modale native (focus piégé et touche Échap gérés par le navigateur), image à la
 * taille du fichier, défilable dans les deux sens.
 */
export function AgrandirPage({
  visuel,
  libelle,
  sizes,
  className = '',
}: {
  visuel: VisuelCatalogue;
  /** Texte du bouton, repris dans son nom accessible. */
  libelle: string;
  /** `sizes` de la vignette. */
  sizes: string;
  className?: string;
}) {
  const dialogue = useRef<HTMLDialogElement>(null);
  if (!visuel.src) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => dialogue.current?.showModal()}
        aria-label={`${libelle} : ${visuel.texte}`}
        className={`group relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 focus-visible:ring-offset-2 ${className}`}
      >
        <span
          data-page-catalogue={visuel.id}
          className="relative block"
          style={{ aspectRatio: `${visuel.width} / ${visuel.height}` }}
        >
          <Image src={visuel.src} alt="" fill sizes={sizes} className="object-contain" />
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-future-dusk-900/80 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors group-hover:bg-very-peri-600"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          {libelle}
        </span>
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
