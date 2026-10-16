'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cheminExemplesFictifs, cheminOccasion, type LangueOccasion } from '@/lib/occasion/langues';
import { APERCU, texteBandeau, type CollecteAffichee } from './contenu';
import { useCollecteCourante } from './useCollecteCourante';

export const CHEMIN_REEL = cheminOccasion('fr');
export const CHEMIN_EXEMPLES = cheminExemplesFictifs('fr');

/**
 * Bandeau de l'aperçu interne (Preview et local seulement), repris du bandeau de
 * la maquette V4.1. La bascule ne change pas l'état d'une même page : elle mène
 * à l'une des deux vues, chacune calculée côté serveur depuis sa source (stock
 * réel, ou exemples fictifs de contrôle). Le texte suit l'état RÉEL de la
 * recherche (`collecte`) et de la liste d'alerte (`alertes`) : pendant une fenêtre
 * de test, il annonce les envois réels, puis repasse à l'état fermé à l'heure de
 * fin (`useCollecteCourante`).
 */
export function BandeauApercu({
  vue,
  nombreReel,
  collecte,
  alertes,
  langue = 'fr',
}: {
  vue: 'reel' | 'exemples';
  nombreReel: number;
  collecte: CollecteAffichee;
  alertes: CollecteAffichee;
  /** Langue de la page : la bascule mène aux deux vues de cette langue. */
  langue?: LangueOccasion;
}) {
  const [annotations, setAnnotations] = useState(true);
  const textes = texteBandeau(vue, useCollecteCourante(collecte), useCollecteCourante(alertes));

  const basculer = () => {
    const suivant = !annotations;
    setAnnotations(suivant);
    document.getElementById('occasion')?.setAttribute('data-annot', suivant ? 'on' : 'off');
  };

  const segment = (actif: boolean) =>
    `px-2.5 py-1 text-[12.5px] transition-colors ${actif ? 'bg-accent-gold font-bold text-future-dusk-800' : 'text-[#cfd3dd] hover:text-white'}`;

  return (
    <div
      data-test="bandeau-apercu"
      className="bg-[repeating-linear-gradient(135deg,#1E2230_0_14px,#232838_14px_28px)] text-[13px] text-white"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-[18px] gap-y-2 px-4 py-[9px] md:px-6">
        <span>
          <b
            data-test="bandeau-titre"
            className={`uppercase tracking-[0.08em] ${textes.test ? 'rounded bg-[#b42318] px-1.5 py-0.5 text-white' : 'text-accent-gold'}`}
          >
            {textes.titre}
          </b>{' '}
          · {textes.texte}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <span>{APERCU.etat}</span>
          <span className="inline-flex overflow-hidden rounded-lg border border-white/30" role="group" aria-label="Vue de l'aperçu">
            <Link href={cheminOccasion(langue)} className={segment(vue === 'reel')} aria-current={vue === 'reel' ? 'page' : undefined}>
              {APERCU.vueReelle} ({nombreReel === 0 ? 'aucune machine' : `${nombreReel} machine${nombreReel > 1 ? 's' : ''}`})
            </Link>
            <Link href={cheminExemplesFictifs(langue)} className={segment(vue === 'exemples')} aria-current={vue === 'exemples' ? 'page' : undefined}>
              {APERCU.vueExemples}
            </Link>
          </span>
          <button
            type="button"
            onClick={basculer}
            aria-pressed={annotations}
            className={`rounded-lg border px-2.5 py-1 text-[12.5px] ${annotations ? 'border-accent-gold text-accent-gold' : 'border-white/30 text-[#cfd3dd]'}`}
          >
            {APERCU.annotations}
          </button>
        </span>
      </div>
    </div>
  );
}
