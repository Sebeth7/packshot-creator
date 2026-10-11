'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export interface CroquisZoomProps {
  src: string;
  alt: string;
  caption?: string;
  /** Numéro affiché dans le filet (ex. « Croquis 4 »). */
  index?: number;
  /** `large` = pleine largeur de la colonne ; `inset` = encadré plus resserré. */
  variant?: 'large' | 'inset';
  className?: string;
}

/**
 * Croquis de méthode avec agrandissement accessible.
 *
 * - L'image reste visible et lisible sans JavaScript (contenu essentiel) ;
 *   l'agrandissement est une amélioration progressive.
 * - Dialogue modal au clavier : Échap ferme, le focus revient au déclencheur,
 *   fond cliquable pour fermer.
 * - `prefers-reduced-motion` respecté : aucune transition si l'utilisateur le demande.
 * - Dimensions explicites (1600×900) : pas de décalage de mise en page (CLS).
 */
export function CroquisZoom({
  src,
  alt,
  caption,
  index,
  variant = 'large',
  className = '',
}: CroquisZoomProps) {
  const [open, setOpen] = useState(false);
  const declencheurRef = useRef<HTMLButtonElement>(null);
  const fermerRef = useRef<HTMLButtonElement>(null);
  const titreId = useId();

  const fermer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fermer();
    };
    document.addEventListener('keydown', onKey);
    const precedent = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    fermerRef.current?.focus();
    const declencheur = declencheurRef.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = precedent;
      declencheur?.focus();
    };
  }, [open, fermer]);

  return (
    <figure
      className={`revue-figure not-prose my-10 ${
        variant === 'large' ? '' : 'mx-auto max-w-2xl'
      } ${className}`}
    >
      <div className="group relative overflow-hidden rounded-xl border border-future-dusk-150 bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <button
          ref={declencheurRef}
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-future-dusk-150 bg-white/90 px-3 py-1.5 text-xs font-medium text-future-dusk-700 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-very-peri-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-500 motion-reduce:transition-none"
          aria-label={`Agrandir le croquis${index ? ` ${index}` : ''}`}
        >
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          Agrandir
        </button>
      </div>
      {caption && (
        <figcaption className="mt-3 flex items-baseline gap-2 text-sm text-future-dusk-500">
          {index && (
            <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-very-peri-600">
              Croquis {index}
            </span>
          )}
          <span className="italic">{caption}</span>
        </figcaption>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-future-dusk-900/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titreId}
          onClick={fermer}
        >
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p id={titreId} className="text-sm text-white/90">
                {index ? `Croquis ${index} — ` : ''}
                {alt}
              </p>
              <button
                ref={fermerRef}
                type="button"
                onClick={fermer}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Fermer
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              width={1600}
              height={900}
              decoding="async"
              className="max-h-[80vh] w-full rounded-lg bg-white object-contain shadow-2xl"
            />
            {caption && (
              <p className="mt-3 text-center text-sm italic text-white/70">{caption}</p>
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
