'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Camera, Sparkles, GraduationCap, Brain, Calculator, CalendarDays, X, Menu, TrendingUp, Glasses, Wine, HeartPulse, Shield, Search, HelpCircle, FileText, ClipboardCheck, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DropdownItem {
  href: string;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
}

interface DropdownSection {
  titleKey?: string;
  items: DropdownItem[];
}

function NavDropdown({
  label,
  sections,
  t,
}: {
  label: string;
  sections: DropdownSection[];
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-future-dusk-700 hover:text-very-peri-600 transition-colors py-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-100 p-2 min-w-[280px]">
            {sections.map((section, sIdx) => (
              <div key={sIdx}>
                {sIdx > 0 && <div className="border-t border-neutral-100 my-2" />}
                {section.titleKey && (
                  <span className="block px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-future-dusk-400">
                    {t(section.titleKey)}
                  </span>
                )}
                {section.items.map((item) =>
                  item.descKey ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-very-peri-50 transition-colors group"
                      onClick={() => setOpen(false)}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-very-peri-50 text-very-peri-600 group-hover:bg-very-peri-100 transition-colors">
                        {item.icon}
                      </span>
                      <div>
                        <span className="block text-sm font-medium text-future-dusk-800 group-hover:text-very-peri-700">
                          {t(item.labelKey)}
                        </span>
                        <span className="block text-xs text-future-dusk-400 mt-0.5 leading-relaxed">
                          {t(item.descKey)}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-xs font-semibold text-very-peri-600 hover:text-very-peri-700 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {t(item.labelKey)}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavSection({
  label,
  sections,
  t,
  onClose,
}: {
  label: string;
  sections: DropdownSection[];
  t: (key: string) => string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-3 text-base font-medium text-future-dusk-800"
        onClick={() => setExpanded(!expanded)}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-future-dusk-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="pl-4 pb-2 space-y-1">
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              {sIdx > 0 && <div className="border-t border-neutral-100 my-2" />}
              {section.titleKey && (
                <span className="block py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-future-dusk-400">
                  {t(section.titleKey)}
                </span>
              )}
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-2 text-sm text-future-dusk-600 hover:text-very-peri-600"
                  onClick={onClose}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-very-peri-50 text-very-peri-600">
                    {item.icon}
                  </span>
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const t = useTranslations('common.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const solutionSections: DropdownSection[] = [
    {
      items: [
        {
          href: '/studios-photo-automatises',
          labelKey: 'studios',
          descKey: 'studiosDesc',
          icon: <Camera className="h-4 w-4" />,
        },
        {
          href: '/ia-photo-produit',
          labelKey: 'aiSoftware',
          descKey: 'aiSoftwareDesc',
          icon: <Sparkles className="h-4 w-4" />,
        },
        {
          href: '/calculateur-roi',
          labelKey: 'roiCalculator',
          descKey: 'roiCalculatorDesc',
          icon: <TrendingUp className="h-4 w-4" />,
        },
      ],
    },
    {
      titleKey: 'bySector',
      items: [
        {
          href: '/industrie/lunetterie',
          labelKey: 'lunetterie',
          descKey: 'lunetterieDesc',
          icon: <Glasses className="h-4 w-4" />,
        },
        {
          href: '/industrie/food-alimentaire',
          labelKey: 'food',
          descKey: 'foodDesc',
          icon: <Wine className="h-4 w-4" />,
        },
        {
          href: '/industrie/sante-medical',
          labelKey: 'santeMedical',
          descKey: 'santeMedicalDesc',
          icon: <HeartPulse className="h-4 w-4" />,
        },
        {
          href: '/industrie/industrie-manufacturiere',
          labelKey: 'industrieDefense',
          descKey: 'industrieDefenseDesc',
          icon: <Shield className="h-4 w-4" />,
        },
        {
          href: '/industrie',
          labelKey: 'allSectors',
          descKey: '',
          icon: <></>,
        },
      ],
    },
    {
      titleKey: 'industrialDoc',
      items: [
        {
          href: '/solutions/documentation-technique-visuelle',
          labelKey: 'docTechnique',
          descKey: 'docTechniqueDesc',
          icon: <FileText className="h-4 w-4" />,
        },
        {
          href: '/solutions/documentation-qualite-produit',
          labelKey: 'docQualite',
          descKey: 'docQualiteDesc',
          icon: <ClipboardCheck className="h-4 w-4" />,
        },
        {
          href: '/solutions/documentation-probatoire',
          labelKey: 'docProbatoire',
          descKey: 'docProbatoireDesc',
          icon: <Scale className="h-4 w-4" />,
        },
      ],
    },
    {
      titleKey: 'guides',
      items: [
        {
          href: '/besoins-photographie-produit',
          labelKey: 'guidesBesoins',
          descKey: 'guidesBesoinsDesc',
          icon: <Search className="h-4 w-4" />,
        },
        {
          href: '/questions-cles-photographie-produit',
          labelKey: 'guidesQuestions',
          descKey: 'guidesQuestionsDesc',
          icon: <HelpCircle className="h-4 w-4" />,
        },
      ],
    },
  ];

  const academySections: DropdownSection[] = [
    {
      items: [
        {
          href: '/academy/formations-packshot',
          labelKey: 'formationsPackshot',
          descKey: 'formationsPackshotDesc',
          icon: <GraduationCap className="h-4 w-4" />,
        },
        {
          href: '/academy/formations-ia',
          labelKey: 'formationsIA',
          descKey: 'formationsIADesc',
          icon: <Brain className="h-4 w-4" />,
        },
        {
          href: '/academy/calendrier',
          labelKey: 'calendrier',
          descKey: 'calendrierDesc',
          icon: <CalendarDays className="h-4 w-4" />,
        },
      ],
    },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/packshot-creator-logo.png"
              alt="PackshotCreator"
              width={142}
              height={33}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            <NavDropdown
              label={t('solutions')}
              sections={solutionSections}
              t={t}
            />

            <NavDropdown
              label={t('academy')}
              sections={academySections}
              t={t}
            />

            <Link
              href="/blog"
              className="text-sm font-medium text-future-dusk-700 hover:text-very-peri-600 transition-colors py-2"
            >
              {t('blog')}
            </Link>

            <Link
              href="/a-propos"
              className="text-sm font-medium text-future-dusk-700 hover:text-very-peri-600 transition-colors py-2"
            >
              {t('about')}
            </Link>
          </nav>

          {/* Right side: Lang + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={pathname}
              locale={otherLocale}
              className="flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold text-future-dusk-500 hover:text-very-peri-600 hover:bg-very-peri-50 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Button asChild size="sm" className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-lg shadow-sm">
              <Link href="/contact">
                {t('receiveOffer')}
              </Link>
            </Button>
          </div>

          {/* Mobile: Lang + Burger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={pathname}
              locale={otherLocale}
              className="flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold text-future-dusk-500 hover:text-very-peri-600 hover:bg-very-peri-50 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-lg text-future-dusk-600 hover:bg-neutral-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('close') : t('menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="relative bg-white border-t border-neutral-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <nav className="divide-y divide-neutral-100" aria-label="Mobile navigation">
                {/* Solutions + Industries */}
                <MobileNavSection
                  label={t('solutions')}
                  sections={solutionSections}
                  t={t}
                  onClose={() => setMobileMenuOpen(false)}
                />

                {/* Academy */}
                <MobileNavSection
                  label={t('academy')}
                  sections={academySections}
                  t={t}
                  onClose={() => setMobileMenuOpen(false)}
                />

                {/* Blog */}
                <Link
                  href="/blog"
                  className="block py-3 text-base font-medium text-future-dusk-800 hover:text-very-peri-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('blog')}
                </Link>

                {/* About */}
                <Link
                  href="/a-propos"
                  className="block py-3 text-base font-medium text-future-dusk-800 hover:text-very-peri-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div className="mt-6 pb-4">
                <Button asChild className="w-full bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-lg">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    {t('receiveOffer')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
