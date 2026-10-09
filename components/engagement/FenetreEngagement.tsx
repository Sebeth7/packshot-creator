'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin, X } from 'lucide-react';
import { NavLink } from '@/components/layout/NavLink';
import { URL_CATALOGUE } from '@/lib/engagement/regles';
import { signalerClic, signalerFermeture, signalerImpression, type ModeFermeture } from '@/lib/engagement/mesure';
import { sessionPopin } from '@/lib/engagement/session';
import { COPY } from './contenu';
import { VISUEL } from './visuel';

const FOCALISABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Fenêtre de la pop-in d'engagement : `<dialog>` natif ouvert en modal (couche
 * supérieure, fond inerte, aucun décalage de mise en page), focus initial sur
 * « Fermer », focus piégé, Échap, retour du focus à la fermeture. Démo en CTA
 * principal, catalogue en CTA secondaire. Aucune animation.
 */
export default function FenetreEngagement({ onFermee }: { onFermee: () => void }) {
  const fenetre = useRef<HTMLDialogElement>(null);
  const retourFocus = useRef<HTMLElement | null>(null);
  const terminee = useRef(false);
  const impressionFaite = useRef(false);

  const terminer = useCallback(
    (mode: ModeFermeture | null, rendreFocus: boolean) => {
      if (terminee.current) return;
      terminee.current = true;
      // Fermeture sans conversion, ou clic Démo / Catalogue : plus d'apparition dans la session.
      sessionPopin().marquer(mode ? 'dismissed' : 'converted');
      if (mode) signalerFermeture(mode);
      const d = fenetre.current;
      if (d?.open) d.close();
      const cible = retourFocus.current;
      if (rendreFocus && cible?.isConnected) cible.focus({ preventScroll: true });
      onFermee();
    },
    [onFermee],
  );

  useEffect(() => {
    const d = fenetre.current;
    if (!d) return;
    const actif = document.activeElement;
    retourFocus.current = actif instanceof HTMLElement && actif !== document.body ? actif : null;
    if (!d.open) d.showModal();
    d.querySelector<HTMLElement>('[data-focus-initial]')?.focus();
    if (!impressionFaite.current) {
      impressionFaite.current = true;
      signalerImpression();
    }
    const surAnnulation = (e: Event) => {
      e.preventDefault();
      terminer('escape', true);
    };
    // Fermeture par un autre moyen que les nôtres (navigateur) : même sortie.
    const surFermeture = () => terminer('escape', true);
    d.addEventListener('cancel', surAnnulation);
    d.addEventListener('close', surFermeture);
    return () => {
      d.removeEventListener('cancel', surAnnulation);
      d.removeEventListener('close', surFermeture);
    };
  }, [terminer]);

  const surTouche = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      terminer('escape', true);
      return;
    }
    if (e.key !== 'Tab') return;
    const d = fenetre.current;
    if (!d) return;
    const elements = Array.from(d.querySelectorAll<HTMLElement>(FOCALISABLES));
    if (elements.length === 0) return;
    const premier = elements[0];
    const dernier = elements[elements.length - 1];
    const actif = document.activeElement;
    if (e.shiftKey && (actif === premier || !d.contains(actif))) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && (actif === dernier || !d.contains(actif))) {
      e.preventDefault();
      premier.focus();
    }
  };

  // Clic sur le fond assombri : la cible est le <dialog> lui-même, hors du panneau.
  const surClic = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === fenetre.current) terminer('backdrop', true);
  };

  return (
    <dialog
      ref={fenetre}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popin-engagement-titre"
      data-popin-engagement=""
      onKeyDown={surTouche}
      onClick={surClic}
      className="m-auto w-[min(960px,calc(100vw-4rem))] max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-future-dusk-900/55"
    >
      <div className="grid grid-cols-[44%_1fr]">
        <div className="relative min-h-full bg-future-dusk-100">
          <Image
            src={VISUEL.src}
            alt=""
            fill
            sizes="420px"
            unoptimized
            className="object-cover object-[28%_50%]"
          />
        </div>

        <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto px-10 pb-8 pt-12 xl:px-12">
          <button
            type="button"
            data-focus-initial=""
            aria-label={COPY.fermer}
            onClick={() => terminer('button', true)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-future-dusk-500 hover:bg-future-dusk-0 hover:text-future-dusk-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-very-peri-600"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <p className="inline-flex rounded-full bg-very-peri-50 px-4 py-1.5 text-sm font-semibold text-very-peri-700">
            {COPY.surtitre}
          </p>

          <h2
            id="popin-engagement-titre"
            className="mt-5 font-heading text-3xl font-bold leading-tight text-future-dusk-900 xl:text-[2.125rem]"
          >
            {COPY.titre}
          </h2>

          <p className="mt-5 text-base leading-relaxed text-future-dusk-500">
            {COPY.texteAvant}
            <strong className="font-semibold text-future-dusk-900">{COPY.texteGras}</strong>
            {COPY.texteApres}
          </p>

          <NavLink
            href="/contact"
            data-cta="demo"
            onClick={() => {
              signalerClic('demo');
              terminer(null, false);
            }}
            className="relative mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-very-peri-600 px-12 text-base font-semibold text-white shadow-sm hover:bg-very-peri-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-very-peri-600"
          >
            {COPY.ctaDemo}
            <ArrowRight className="absolute right-6 h-5 w-5" aria-hidden="true" />
          </NavLink>

          <Link
            href={URL_CATALOGUE}
            prefetch={false}
            data-cta="brochure"
            onClick={() => {
              signalerClic('brochure');
              terminer(null, false);
            }}
            className="relative mt-3 flex h-14 w-full items-center justify-center rounded-xl border border-future-dusk-150 bg-white px-12 text-base font-medium text-future-dusk-900 hover:border-future-dusk-200 hover:bg-future-dusk-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-very-peri-600"
          >
            {COPY.ctaCatalogue}
            <Download className="absolute right-6 h-5 w-5 text-future-dusk-600" aria-hidden="true" />
          </Link>

          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-future-dusk-500">
            <MapPin className="h-4 w-4 shrink-0 text-future-dusk-400" aria-hidden="true" />
            {COPY.reassurance}
          </p>

          <p className="mt-6 text-xs text-future-dusk-400">{COPY.microcopy}</p>
        </div>
      </div>
    </dialog>
  );
}
