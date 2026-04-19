'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';

/**
 * Header dédié à Sysnext Industrial Solutions.
 *
 * Affiché exclusivement sous /[lang]/industrie-solutions/* (règle R1 cohabitation).
 * Navigation restreinte aux univers Sysnext : hub, solutions, cas clients, blog, contact.
 * Endorsement « A Packshot-Creator company » sous le wordmark.
 *
 * Source : config/cohabitation-marques.md
 * Draft matière brute — textes FR à valider/finaliser par Seb (règle d'or 2).
 */
export default function SysnextHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const isFr = locale === 'fr';

  const navItems = [
    { href: '/industrie-solutions', labelFr: 'Solutions', labelEn: 'Solutions' },
    { href: '/industrie-solutions#cas-clients', labelFr: 'Cas clients', labelEn: 'Case studies' },
    { href: '/industrie-solutions/blog', labelFr: 'Blog', labelEn: 'Blog' },
    { href: '/industrie-solutions#fondateur', labelFr: 'Le fondateur', labelEn: 'Founder' },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-sysnext-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Wordmark Sysnext */}
          <Link href="/industrie-solutions" className="flex flex-col">
            <span
              className="font-sysnext-sans font-bold text-2xl tracking-[0.08em] text-white leading-none"
              aria-label="Sysnext Industrial Solutions"
            >
              SYSNEXT
            </span>
            <span className="font-sysnext-sans font-medium text-[10px] tracking-[0.2em] text-sysnext-200 leading-tight mt-1">
              INDUSTRIAL SOLUTIONS
            </span>
            <span className="font-sysnext-sans italic text-[9px] text-sysnext-200/80 mt-0.5 leading-none">
              A Packshot-Creator company
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Sysnext main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-sysnext-200 hover:text-white transition-colors"
              >
                {isFr ? item.labelFr : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* Right side : lang + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={pathname}
              locale={otherLocale}
              className="flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold text-sysnext-200 hover:text-white hover:bg-sysnext-700 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href="/industrie-solutions#contact"
              className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-4 py-2 text-sm font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-sm"
            >
              {isFr ? 'Réserver une démo' : 'Book a demo'}
            </Link>
          </div>

          {/* Mobile : lang + burger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={pathname}
              locale={otherLocale}
              className="flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold text-sysnext-200 hover:text-white hover:bg-sysnext-700 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-lg text-sysnext-200 hover:bg-sysnext-700 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40">
          <div
            className="absolute inset-0 bg-graphite-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative bg-sysnext-900 border-t border-sysnext-700 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-1" aria-label="Sysnext mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-base font-medium text-sysnext-200 hover:text-white border-b border-sysnext-700/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isFr ? item.labelFr : item.labelEn}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  href="/industrie-solutions#contact"
                  className="block w-full text-center rounded-md bg-calibration-500 px-4 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isFr ? 'Réserver une démo' : 'Book a demo'}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
