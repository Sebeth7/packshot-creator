import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { MachineSelector } from '@/components/machine-selector';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Phone, Mail } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'Sélecteur de Studios Photo | Trouvez votre Orbitvu idéal'
      : 'Photo Studio Selector | Find your ideal Orbitvu',
    description: isFr
      ? 'Trouvez le studio photo automatisé parfait pour vos besoins. Comparez 16+ studios Orbitvu par taille, fonctionnalités et secteur.'
      : 'Find the perfect automated photo studio for your needs. Compare 16+ Orbitvu studios by size, features and sector.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/studio-photo/selecteur-machines`,
      languages: { fr: '/fr/studio-photo/selecteur-machines', en: '/en/studio-photo/selecteur-machines', 'x-default': '/fr/studio-photo/selecteur-machines' },
    },
    openGraph: {
      title: isFr
        ? 'Sélecteur de Studios Photo | Trouvez votre Orbitvu idéal'
        : 'Photo Studio Selector | Find your ideal Orbitvu',
      images: [{ url: `/api/og?title=${encodeURIComponent(isFr ? 'Sélecteur de Studios Photo' : 'Photo Studio Selector')}&type=product&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function MachineSelectorPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Studios Photo' : 'Photo Studios', url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
    { name: isFr ? 'Sélecteur' : 'Selector', url: `https://www.packshot-creator.com/${lang}/studio-photo/selecteur-machines` },
  ];

  const categories = [
    { label: isFr ? 'Bijoux & Montres' : 'Jewelry & Watches', color: 'bg-very-peri-500/10 text-very-peri-700' },
    { label: isFr ? 'Chaussures & Mode' : 'Shoes & Fashion', color: 'bg-amber-500/10 text-amber-700' },
    { label: isFr ? 'Mobilier & Grands objets' : 'Furniture & Large items', color: 'bg-emerald-500/10 text-emerald-700' },
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
              {isFr ? 'Studios Photo' : 'Photo Studios'}
            </Link>
            <br />
            {isFr ? 'Trouvez votre studio photo idéal' : 'Find your ideal photo studio'}
          </>
        }
        subtitle={
          isFr
            ? 'Plus de 16 studios Orbitvu pour tous vos besoins de photo produit. Filtrez par taille, fonctionnalités et secteur.'
            : 'Over 16 Orbitvu studios for all your product photography needs. Filter by size, features and sector.'
        }
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
            locale={isFr ? 'fr' : 'en'}
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
                {isFr ? 'Besoin d\'aide pour choisir ?' : 'Need help choosing?'}
              </h2>
              <p className="text-future-dusk-500 mb-6">
                {isFr
                  ? 'Nos experts sont là pour vous conseiller et vous aider à trouver la solution adaptée à vos besoins.'
                  : 'Our experts are here to advise you and help you find the solution suited to your needs.'}
              </p>
            </FadeInView>
            <FadeInView direction="right" delay={0.2}>
            <div className="space-y-4">
              <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" /> {isFr ? 'Demander un devis' : 'Request a quote'}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl w-full">
                <a href="tel:+33320199090">
                  <Phone className="mr-2 h-4 w-4" /> 03 20 19 90 90
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl w-full">
                <Link href="/studios-photo-automatises#calculateur-roi">
                  {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'} <ArrowRight className="ml-2 h-4 w-4" />
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
