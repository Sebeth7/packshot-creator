'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('common.footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-future-dusk-900 text-future-dusk-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logos/packshot-creator-logo.png"
                alt="PackshotCreator"
                width={142}
                height={33}
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-future-dusk-400 leading-relaxed max-w-xs mb-6">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/packshotcreator/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-future-dusk-800 text-future-dusk-400 hover:text-white hover:bg-very-peri-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@PackshotCreator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-future-dusk-800 text-future-dusk-400 hover:text-white hover:bg-very-peri-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {t('solutions')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/studios-photo-automatises" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('studios')}
                </Link>
              </li>
              <li>
                <Link href="/ia-photo-produit" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('aiSoftware')}
                </Link>
              </li>
              <li>
                <Link href="/studio-photo/selecteur-machines" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('machineSelector')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {t('industries')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/industrie/chaussures" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('shoes')}
                </Link>
              </li>
              <li>
                <Link href="/industrie/bijoux-joaillerie" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('jewelry')}
                </Link>
              </li>
              <li>
                <Link href="/industrie/food-alimentaire" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('food')}
                </Link>
              </li>
              <li>
                <Link href="/industrie/mode-textile" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('fashion')}
                </Link>
              </li>
              <li>
                <Link href="/industrie" className="text-sm text-very-peri-400 hover:text-very-peri-300 transition-colors">
                  {t('allIndustries')} &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {t('academy')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/academy/formations-packshot" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('formationsPackshot')}
                </Link>
              </li>
              <li>
                <Link href="/academy/formations-ia" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('formationsIA')}
                </Link>
              </li>
              <li>
                <Link href="/academy/simulateur-opco" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('simulateurOPCO')}
                </Link>
              </li>
              <li>
                <Link href="/academy/calendrier" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('calendrier')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              {t('company')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/a-propos" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('blog')}
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold text-white mt-6 mb-4 tracking-wide">
              {t('legal')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/mentions-legales" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-future-dusk-400 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                  className="text-sm text-future-dusk-400 hover:text-white transition-colors"
                >
                  {t('manageCookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-future-dusk-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-future-dusk-500">
            &copy; {currentYear} PackshotCreator. {t('rights')}
          </p>
          <p className="text-xs text-future-dusk-500">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
