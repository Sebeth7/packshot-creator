import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { MachineSelector } from '@/components/machine-selector';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Phone, Mail } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { buildLanguages } from '@/lib/hreflang';
import { tx } from '@/lib/locale-text';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/fotostudio/maschinen-finder';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const title = tx(
    lang,
    'Sélecteur de Studios Photo | Trouvez votre Orbitvu idéal',
    'Photo Studio Selector | Find your ideal Orbitvu',
    'Fotostudio-Finder | Finden Sie Ihr ideales Orbitvu',
  );
  const ogTitleShort = tx(lang, 'Sélecteur de Studios Photo', 'Photo Studio Selector', 'Fotostudio-Finder');

  return {
    title,
    description: tx(
      lang,
      'Trouvez le studio photo automatisé parfait pour vos besoins. Comparez 16+ studios Orbitvu par taille, fonctionnalités et secteur.',
      'Find the perfect automated photo studio for your needs. Compare 16+ Orbitvu studios by size, features and sector.',
      'Finden Sie das perfekte automatisierte Fotostudio für Ihre Bedürfnisse. Vergleichen Sie über 16 Orbitvu-Studios nach Grösse, Funktionen und Branche.',
    ),
    alternates: {
      canonical:
        lang === 'de-ch'
          ? `https://www.packshot-creator.com${DE_CH_PATH}`
          : `https://www.packshot-creator.com/${lang}/studio-photo/selecteur-machines`,
      languages: buildLanguages('/fr/studio-photo/selecteur-machines', { en: '/en/studio-photo/selecteur-machines', deCh: DE_CH_PATH }),
    },
    openGraph: {
      title,
      images: [{ url: `/api/og?title=${encodeURIComponent(ogTitleShort)}&type=product&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function MachineSelectorPage({ params }: PageProps) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'Studios Photo', 'Photo Studios', 'Fotostudios'), url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
    { name: tx(lang, 'Sélecteur', 'Selector', 'Finder'), url: `https://www.packshot-creator.com/${lang}/studio-photo/selecteur-machines` },
  ];

  const categories = [
    { label: tx(lang, 'Bijoux & Montres', 'Jewelry & Watches', 'Schmuck & Uhren'), color: 'bg-very-peri-500/10 text-very-peri-700' },
    { label: tx(lang, 'Chaussures & Mode', 'Shoes & Fashion', 'Schuhe & Mode'), color: 'bg-amber-500/10 text-amber-700' },
    { label: tx(lang, 'Mobilier & Grands objets', 'Furniture & Large items', 'Möbel & Grosse Objekte'), color: 'bg-emerald-500/10 text-emerald-700' },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={
          <>
            <Link
              href="/studios-photo-automatises"
              className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-medium font-sans mb-6 hover:text-white transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              {tx(lang, 'Studios Photo', 'Photo Studios', 'Fotostudios')}
            </Link>
            <br />
            {tx(lang, 'Trouvez votre studio photo idéal', 'Find your ideal photo studio', 'Finden Sie Ihr ideales Fotostudio')}
          </>
        }
        subtitle={tx(
          lang,
          'Plus de 16 studios Orbitvu pour tous vos besoins de photo produit. Filtrez par taille, fonctionnalités et secteur.',
          'Over 16 Orbitvu studios for all your product photography needs. Filter by size, features and sector.',
          'Über 16 Orbitvu-Studios für alle Ihre Produktfotografie-Bedürfnisse. Filtern Sie nach Grösse, Funktionen und Branche.',
        )}
      >
        <StaggerContainer className="flex flex-wrap justify-center gap-3" delay={0.3}>
          {categories.map((cat) => (
            <StaggerItem key={cat.label}>
              <span className={`inline-flex items-center gap-2 ${cat.color} text-sm font-medium px-4 py-2 rounded-full`}>
                {cat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </HeroSection>

      {/* Machine Selector */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
          <MachineSelector
            mode="display"
            showFilters={true}
            showPrices={false}
            locale={lang as 'fr' | 'en'}
          />
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeInView direction="left">
              <h2 className="text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                {tx(lang, 'Besoin d\'aide pour choisir ?', 'Need help choosing?', 'Brauchen Sie Hilfe bei der Auswahl?')}
              </h2>
              <p className="text-future-dusk-500 mb-6">
                {tx(
                  lang,
                  'Nos experts sont là pour vous conseiller et vous aider à trouver la solution adaptée à vos besoins.',
                  'Our experts are here to advise you and help you find the solution suited to your needs.',
                  'Unsere Experten beraten Sie und helfen Ihnen, die passende Lösung für Ihre Bedürfnisse zu finden.',
                )}
              </p>
            </FadeInView>
            <FadeInView direction="right" delay={0.2}>
            <div className="space-y-4">
              <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" /> {tx(lang, 'Demander un devis', 'Request a quote', 'Offerte anfordern')}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl w-full">
                <a href={lang === 'de-ch' ? 'tel:+41445804384' : 'tel:+33320199090'}>
                  <Phone className="mr-2 h-4 w-4" /> {lang === 'de-ch' ? '+41 44 580 43 84' : '03 20 19 90 90'}
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl w-full">
                <Link href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }}>
                  {tx(lang, 'Calculer mon ROI', 'Calculate my ROI', 'Meinen ROI berechnen')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
