import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { secteurs } from '@/data/secteurs';
import { CheckCircle, ArrowRight, Camera, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  return secteurs.map((secteur) => ({ slug: secteur.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);
  if (!secteur) return { title: 'Secteur non trouvé' };

  return {
    title: secteur.titre,
    description: secteur.description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie/${slug}`,
      languages: { fr: `/fr/industrie/${slug}`, en: `/en/industrie/${slug}` },
    },
    openGraph: {
      title: secteur.titre,
      description: secteur.description,
      images: [{ url: `/api/og?title=${encodeURIComponent(secteur.titre)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function SecteurPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);
  if (!secteur) notFound();

  const isFr = lang === 'fr';
  const heroImage = `/images/hero/hero-secteur-${slug.split('-')[0]}.avif`;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Industries', url: `https://www.packshot-creator.com/${lang}/industrie` },
    { name: secteur.titre.split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/industrie/${slug}` },
  ];

  const otherSectors = DEFAULT_SECTORS.filter((s) => s.slug !== slug).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <Link
                href="/industrie"
                className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-medium mb-6 hover:text-white transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                {isFr ? 'Toutes les industries' : 'All industries'}
              </Link>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {secteur.hero.titre}
              </h1>
              <p className="text-xl text-very-peri-200 font-medium mb-4">
                {secteur.hero.sousTitre}
              </p>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {secteur.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <Link href="/contact">{isFr ? 'Demander un devis gratuit' : 'Get a free quote'}</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/academy">{isFr ? 'Découvrir nos formations' : 'Discover our training'}</Link>
                </Button>
              </div>
            </FadeInView>
            <FadeInView direction="right" delay={0.2} className="relative">
              <Image
                src={heroImage}
                alt={secteur.hero.titre}
                width={640}
                height={480}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Problématiques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
                {secteur.problematiques.titre}
              </h2>
            </FadeInView>
            <StaggerContainer className="space-y-4">
              {secteur.problematiques.items.map((item, index) => (
                <StaggerItem key={index}>
                  <div
                    className="flex items-start gap-4 bg-neutral-50 rounded-xl p-6 border border-neutral-100 hover:border-very-peri-200 transition-colors"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg bg-very-peri-100 text-very-peri-700 text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-future-dusk-600 leading-relaxed">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {secteur.solutions.titre}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {secteur.solutions.items.map((solution, index) => (
              <StaggerItem key={index}>
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className={`h-2 ${index === 0 ? 'bg-very-peri-500' : 'bg-amber-500'}`} />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${
                        index === 0 ? 'bg-very-peri-100 text-very-peri-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {index === 0 ? <Camera className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900">
                        {solution.titre}
                      </h3>
                    </div>
                    <p className="text-future-dusk-500 mb-6">{solution.description}</p>
                    <ul className="space-y-3">
                      {solution.avantages.map((avantage, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-future-dusk-600">{avantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Cas Clients */}
      {secteur.casClients && secteur.casClients.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <FadeInView className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
                  {isFr ? 'Cas Clients' : 'Client Cases'} {secteur.titre.split(':')[0]}
                </h2>
              </FadeInView>
              <StaggerContainer className="space-y-6">
                {secteur.casClients.map((cas, index) => (
                  <StaggerItem key={index}>
                    <div
                      className="bg-gradient-to-r from-very-peri-50 to-white rounded-2xl p-8 border-l-4 border-very-peri-500"
                    >
                      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-3">
                        {cas.titre}
                      </h3>
                      <p className="text-future-dusk-500 leading-relaxed">{cas.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {secteur.faq && secteur.faq.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <FadeInView className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
                  {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
                </h2>
              </FadeInView>
              <StaggerContainer className="space-y-4">
                {secteur.faq.map((item, index) => (
                  <StaggerItem key={index}>
                    <details className="group bg-neutral-50 rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors">
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold text-future-dusk-900 text-left">
                          {item.question}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-future-dusk-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </details>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {secteur.cta.titre}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8 max-w-2xl mx-auto">
            {secteur.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {isFr ? 'Demander un devis gratuit' : 'Get a free quote'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/academy">
                {isFr ? 'Découvrir nos formations' : 'Discover our training'}
              </Link>
            </Button>
          </div>
        </FadeInView>
      </section>

      {/* Other Sectors */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-future-dusk-900">
              {isFr ? 'Découvrez nos autres secteurs' : 'Discover our other sectors'}
            </h3>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherSectors.map((other) => (
              <StaggerItem key={other.slug}>
                <Link
                  href={`/industrie/${other.slug}`}
                  className="group flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-100 hover:border-very-peri-300 hover:shadow-sm transition-all"
                >
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-very-peri-50 text-very-peri-600 shrink-0">
                    <other.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-future-dusk-800 group-hover:text-very-peri-600 transition-colors">
                    {other.name}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/industrie">
                {isFr ? 'Voir les 14 secteurs' : 'View all 14 sectors'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeInView>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        ...(secteur.faq ? [faqSchema(secteur.faq)] : []),
      ]} />
    </>
  );
}
