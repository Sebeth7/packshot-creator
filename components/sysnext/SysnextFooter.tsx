'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * Footer dédié à Sysnext Industrial Solutions.
 *
 * Affiché exclusivement sous /[lang]/industrie-solutions/* (règle R1 cohabitation).
 * Endorsement « A Packshot-Creator company » + lien discret vers PKC en mentions légales uniquement (règle R3).
 *
 * Source : config/cohabitation-marques.md
 * Draft matière brute — textes FR à valider/finaliser par Seb (règle d'or 2).
 */
export default function SysnextFooter() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sysnext-900 text-sysnext-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/industrie-solutions" className="inline-flex flex-col mb-4">
              <span className="font-sysnext-sans font-bold text-xl tracking-[0.08em] text-white leading-none">
                SYSNEXT
              </span>
              <span className="font-sysnext-sans font-medium text-[10px] tracking-[0.2em] text-sysnext-200 leading-tight mt-1">
                INDUSTRIAL SOLUTIONS
              </span>
              <span className="font-sysnext-sans italic text-[9px] text-sysnext-200/80 mt-0.5 leading-none">
                A Packshot-Creator company — 25 years of precision imaging
              </span>
            </Link>
            <p className="text-sm text-sysnext-200/80 leading-relaxed max-w-md">
              {isFr
                ? 'Documentation visuelle industrielle standardisée. Stations Orbitvu pilotées par Templates verrouillés, intégrées à votre ERP/PIM/GMAO, utilisables par un opérateur non-photographe.'
                : 'Standardised industrial visual documentation. Orbitvu stations driven by locked templates, integrated into your ERP/PIM/MMS, usable by a non-photographer operator.'}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {isFr ? 'Solutions' : 'Solutions'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/industrie-solutions/catalogue-pieces-detachees" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'Catalogue pièces détachées' : 'Spare parts catalogue'}
                </Link>
              </li>
              <li>
                <Link href="/industrie-solutions/controle-qualite-inspection" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'Contrôle qualité' : 'Quality control'}
                </Link>
              </li>
              <li>
                <Link href="/industrie-solutions/mro-aeronautique-civile" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'MRO aéronautique civile' : 'Civil aeronautical MRO'}
                </Link>
              </li>
              <li>
                <Link href="/industrie-solutions/documentation-forensique" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'Documentation forensique' : 'Forensic documentation'}
                </Link>
              </li>
              <li>
                <Link href="/industrie-solutions/calculateur-roi" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'Calculateur ROI' : 'ROI calculator'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {isFr ? 'Contact' : 'Contact'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/industrie-solutions#contact" className="text-sysnext-200 hover:text-white transition-colors">
                  {isFr ? 'Réserver une démo' : 'Book a demo'}
                </Link>
              </li>
              <li>
                <a href="mailto:industriel@sysnext.com" className="text-sysnext-200 hover:text-white transition-colors">
                  industriel@sysnext.com
                </a>
              </li>
              <li>
                <a href="tel:+33147426666" className="text-sysnext-200 hover:text-white transition-colors">
                  +33 1 47 42 66 66
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.linkedin.com/showcase/sysnext-industrial-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sysnext-200 hover:text-white transition-colors"
                  aria-label="Sysnext Industrial Solutions sur LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-sysnext-700/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-sysnext-200/70">
          <div>
            © {currentYear} Sysnext Industrial Solutions —{' '}
            <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-white">
              {isFr ? 'Mentions légales' : 'Legal notice'}
            </Link>{' '}
            ·{' '}
            <Link href="/confidentialite" className="underline underline-offset-2 hover:text-white">
              {isFr ? 'Confidentialité' : 'Privacy'}
            </Link>{' '}
            ·{' '}
            <Link href="/cgu" className="underline underline-offset-2 hover:text-white">
              CGU
            </Link>
          </div>
          <div className="italic">
            {isFr
              ? 'Sysnext Industrial Solutions est une marque commerciale de Packshot-Creator.'
              : 'Sysnext Industrial Solutions is a trade name of Packshot-Creator.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
