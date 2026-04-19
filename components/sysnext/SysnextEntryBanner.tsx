'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Factory } from 'lucide-react';

/**
 * Bannière H2 — entry-point visible sur la home PackshotCreator vers Sysnext Industrial Solutions.
 *
 * À placer sur `app/[lang]/page.tsx` (home PKC). Règle H2 du contrat d'étanchéité de cohabitation.
 * Porte d'entrée pour les prospects industriels tapant directement `packshot-creator.com`
 * sans source outbound identifiable (si source identifiable, le middleware H4 redirige automatiquement).
 *
 * Source : config/cohabitation-marques.md §5.1.
 * Draft matière brute — textes FR à valider/finaliser par Seb (règle d'or 2).
 */
export default function SysnextEntryBanner() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="bg-sysnext-900 text-white border-b border-sysnext-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sysnext-700 text-calibration-500">
              <Factory className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">
                {isFr
                  ? 'Vous êtes un industriel ? Découvrez Sysnext Industrial Solutions.'
                  : 'Industrial decision-maker? Discover Sysnext Industrial Solutions.'}
              </p>
              <p className="text-xs text-sysnext-200 leading-tight mt-0.5">
                {isFr
                  ? 'Documentation visuelle industrielle standardisée · Aftermarket, QC, MRO, forensique.'
                  : 'Standardised industrial visual documentation · Aftermarket, QC, MRO, forensics.'}
              </p>
            </div>
          </div>
          <Link
            href="/industrie-solutions"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-calibration-500 px-4 py-2 text-sm font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors"
          >
            {isFr ? 'Voir l\'offre industrielle' : 'See industrial offer'}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
