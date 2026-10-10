'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APERCU } from './contenu';

export const CHEMIN_REEL = '/fr/studios-photo-automatises/opportunites';
export const CHEMIN_EXEMPLES = '/fr/studios-photo-automatises/opportunites/exemples-fictifs';

/**
 * Bandeau de l'aperçu interne (Preview et local seulement), repris du bandeau de
 * la maquette V4.1. La bascule ne change pas l'état d'une même page : elle mène
 * à l'une des deux vues, chacune calculée côté serveur depuis sa source (stock
 * réel, ou exemples fictifs de contrôle).
 */
export function BandeauApercu({ vue, nombreReel }: { vue: 'reel' | 'exemples'; nombreReel: number }) {
  const [annotations, setAnnotations] = useState(true);
  const textes = vue === 'exemples' ? APERCU.exemples : APERCU.reel;

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
          <b className="uppercase tracking-[0.08em] text-accent-gold">{textes.titre}</b> · {textes.texte}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <span>{APERCU.etat}</span>
          <span className="inline-flex overflow-hidden rounded-lg border border-white/30" role="group" aria-label="Vue de l'aperçu">
            <Link href={CHEMIN_REEL} className={segment(vue === 'reel')} aria-current={vue === 'reel' ? 'page' : undefined}>
              {APERCU.vueReelle} ({nombreReel === 0 ? 'aucune machine' : `${nombreReel} machine${nombreReel > 1 ? 's' : ''}`})
            </Link>
            <Link href={CHEMIN_EXEMPLES} className={segment(vue === 'exemples')} aria-current={vue === 'exemples' ? 'page' : undefined}>
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
