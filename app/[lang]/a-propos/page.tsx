import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, Lightbulb, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'about' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/a-propos`,
      languages: { fr: '/fr/a-propos', en: '/en/a-propos' },
    },
    openGraph: {
      title: t('meta.title'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

const TIMELINE_YEARS = ['y2004', 'y2006', 'y2010', 'y2012', 'y2013', 'y2014', 'y2018', 'y2023', 'y2024'] as const;
const YEAR_LABELS: Record<string, string> = { y2004: '2004', y2006: '2006', y2010: '2010', y2012: '2012', y2013: '2013', y2014: '2014', y2018: '2018', y2023: '2023', y2024: '2024' };

const VALUES = [
  { key: 'innovation', Icon: Lightbulb, color: 'bg-amber-100 text-amber-700' },
  { key: 'performance', Icon: Zap, color: 'bg-very-peri-100 text-very-peri-700' },
  { key: 'excellence', Icon: Award, color: 'bg-emerald-100 text-emerald-700' },
] as const;

const STAT_VALUES = ['20+', '150', '4000m²', '16+'];

export default async function AProposPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'about' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/a-propos` },
  ];

  const heroValue = VALUES[0];

  return (
    <>
      {/* Hero */}
      <HeroSection
        title="PackshotCreator"
        subtitle={t('hero.description')}
        ctas={[
          { label: t('hero.ctaPrimary'), href: '/contact', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '/academy', variant: 'secondary' },
        ]}
      >
        <p className="text-xl sm:text-2xl text-very-peri-200 font-medium mb-4">
          {t('hero.tagline')}
        </p>
      </HeroSection>

      {/* Mission — Split 4/8 */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: sticky heading */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Notre mission' : 'Our mission'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {t('mission.heading')}
              </TextReveal>
            </ScrollReveal>

            {/* Right: mission text */}
            <div className="lg:col-span-8">
              <ScrollReveal offset={30}>
                <div className="bg-gradient-to-r from-very-peri-50 to-very-peri-100/50 rounded-2xl p-6 sm:p-10 lg:p-14">
                  <p className="text-lg text-future-dusk-700 leading-relaxed mb-6">{t('mission.p1')}</p>
                  <p className="text-lg text-future-dusk-700 leading-relaxed">{t('mission.p2')}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal offset={40}>
                <div className="mt-8">
                  <Image
                    src="/images/illustrations/team-showroom.avif"
                    alt="Équipe PackshotCreator dans le showroom"
                    width={1344}
                    height={768}
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Bento Grid */}
      <section className="py-16 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Nos valeurs' : 'Our values'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {t('values.heading')}
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Hero card — Innovation (first value) */}
            <ScrollReveal offset={30}>
              <SpringCard className="h-full">
                <div className="bg-white rounded-2xl border border-neutral-100 hover:border-very-peri-300 p-10 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl">
                  <span className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${heroValue.color} mb-6`}>
                    <heroValue.Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                    {t(`values.${heroValue.key}.title`)}
                  </h3>
                  <p className="text-future-dusk-600 leading-relaxed text-lg flex-1">
                    {t(`values.${heroValue.key}.description`)}
                  </p>
                </div>
              </SpringCard>
            </ScrollReveal>

            {/* 2 smaller cards stacked */}
            <div className="space-y-6">
              {VALUES.slice(1).map(({ key, Icon, color }) => (
                <ScrollReveal key={key} offset={20}>
                  <SpringCard hoverY={-3} hoverScale={1.005}>
                    <div className="bg-white rounded-2xl border border-neutral-100 hover:border-very-peri-300 p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                      <div className="flex items-start gap-5">
                        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${color} flex-shrink-0 mt-1`}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{t(`values.${key}.title`)}</h3>
                          <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`values.${key}.description`)}</p>
                        </div>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — ScrollReveal + giant numbers + alternating bg */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4 text-center">
              {t('timeline.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 text-center mb-16 max-w-2xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-very-peri-500 to-very-peri-300 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {TIMELINE_YEARS.map((yearKey, index) => (
                <ScrollReveal key={yearKey} offset={30}>
                  <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-8 flex h-8 w-8 items-center justify-center rounded-full bg-very-peri-600 shadow-lg md:left-1/2 md:-translate-x-1/2 z-10">
                      <span className="h-3 w-3 rounded-full bg-white" />
                    </div>

                    <div
                      className={`ml-20 w-full rounded-2xl border border-neutral-100 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} p-6 shadow-sm hover:border-very-peri-300 hover:shadow-md transition-all md:ml-0 md:w-5/12 ${
                        index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                      }`}
                    >
                      <span className="text-3xl font-heading font-bold text-very-peri-600">{YEAR_LABELS[yearKey]}</span>
                      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mt-1 mb-1">
                        {t(`timeline.${yearKey}.title`)}
                      </h3>
                      <p className="text-sm text-future-dusk-500">{t(`timeline.${yearKey}.description`)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — Ruban stats avec nombres 7xl */}
      <section className="py-16 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-16 text-center">
              {t('stats.heading')}
            </h2>
          </ScrollReveal>
          <StaggerContainer stagger={0.12} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {STAT_VALUES.map((value, i) => (
              <StaggerItem key={value}>
                <div className="text-center px-4 sm:px-6 lg:px-8">
                  <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight">{value}</p>
                  <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">{t(`stats.stat${i + 1}.label`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA — Asymetrique 3/5 + 2/5 */}
      <section className="py-16 lg:py-28 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-center mb-16">
              {t('cta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('cta.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">{t('cta.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/contact">{t('cta.ctaPrimary')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </SpringCard>
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">{isFr ? 'Nos formations' : 'Our training'}</h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                  {isFr ? 'Découvrez nos formations certifiées Qualiopi pour maîtriser la photo produit.' : 'Discover our Qualiopi-certified training to master product photography.'}
                </p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/academy">{t('cta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
