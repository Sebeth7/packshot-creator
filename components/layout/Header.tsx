'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Construire l'URL pour changer de langue (FR ↔ EN)
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6682a557f105555299d5aec6_Logo-Packshot-Creator.svg"
              alt="PackshotCreator Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/studios-photo-automatises" className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu transition-colors">
              Capture
            </Link>
            <Link href="/ia-photo-produit" className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu transition-colors">
              Création
            </Link>
            <Link href="/academy" className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu transition-colors">
              Formation
            </Link>
            <Link href="/blog" className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu transition-colors">
              Blog
            </Link>
          </nav>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href={pathname} locale={otherLocale} className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu">
              {otherLocale.toUpperCase()}
            </Link>
            <Button asChild className="bg-secondary-orbitvu hover:bg-primary-orbitvu text-white">
              <Link href="/contact">
                {t('nav.receiveOffer')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 space-y-2">
            <Link href="/studios-photo-automatises" className="block py-2 text-neutral-dark hover:text-secondary-orbitvu">
              Capture
            </Link>
            <Link href="/ia-photo-produit" className="block py-2 text-neutral-dark hover:text-secondary-orbitvu">
              Création
            </Link>
            <Link href="/academy" className="block py-2 text-neutral-dark hover:text-secondary-orbitvu">
              Formation
            </Link>
            <Link href="/blog" className="block py-2 text-neutral-dark hover:text-secondary-orbitvu">
              Blog
            </Link>
            <Link href={pathname} locale={otherLocale} className="block py-2 text-neutral-dark hover:text-secondary-orbitvu">
              {otherLocale.toUpperCase()}
            </Link>
            <Button asChild className="w-full bg-secondary-orbitvu hover:bg-primary-orbitvu text-white mt-4">
              <Link href="/contact">
                {t('nav.receiveOffer')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
