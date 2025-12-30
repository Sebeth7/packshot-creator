'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const t = useTranslations('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link href="/product-photography" className="text-sm font-body text-neutral-dark hover:text-primary-turquoise transition-colors">
              {t('nav.productPhotography')}
            </Link>
            <Link href="/workflow-management" className="text-sm font-body text-neutral-dark hover:text-primary-turquoise transition-colors">
              {t('nav.workflowManagement')}
            </Link>
            <Link href="/resources" className="text-sm font-body text-neutral-dark hover:text-primary-turquoise transition-colors">
              {t('nav.resources')}
            </Link>
            <Link href="/about" className="text-sm font-body text-neutral-dark hover:text-primary-turquoise transition-colors">
              {t('nav.about')}
            </Link>
          </nav>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/en" className="text-sm font-body text-neutral-dark hover:text-primary-turquoise">
              EN
            </Link>
            <Button asChild className="bg-primary-turquoise hover:bg-primary-dark text-white">
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
            <Link href="/product-photography" className="block py-2 text-neutral-dark hover:text-primary-turquoise">
              {t('nav.productPhotography')}
            </Link>
            <Link href="/workflow-management" className="block py-2 text-neutral-dark hover:text-primary-turquoise">
              {t('nav.workflowManagement')}
            </Link>
            <Link href="/resources" className="block py-2 text-neutral-dark hover:text-primary-turquoise">
              {t('nav.resources')}
            </Link>
            <Link href="/about" className="block py-2 text-neutral-dark hover:text-primary-turquoise">
              {t('nav.about')}
            </Link>
            <Button asChild className="w-full bg-primary-turquoise hover:bg-primary-dark text-white mt-4">
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
