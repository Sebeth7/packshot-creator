import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Lightbulb, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

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

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/a-propos` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <FadeInView className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              PackshotCreator
            </h1>
            <p className="text-xl sm:text-2xl text-very-peri-200 font-medium mb-4">
              {t('hero.tagline')}
            </p>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                <Link href="/contact">
                  {t('hero.ctaPrimary')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                <Link href="/academy">
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
            {t('mission.heading')}
          </h2>
          <div className="bg-gradient-to-r from-very-peri-50 to-very-peri-100/50 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-future-dusk-700 leading-relaxed mb-6">
              {t('mission.p1')}
            </p>
            <p className="text-lg text-future-dusk-700 leading-relaxed">
              {t('mission.p2')}
            </p>
          </div>
        </FadeInView>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
              {t('values.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {VALUES.map(({ key, Icon, color }) => (
              <StaggerItem key={key}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-neutral-100">
                  <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${color} mx-auto mb-4`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-sm text-future-dusk-500">{t(`values.${key}.description`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4 text-center">
              {t('timeline.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 text-center mb-16 max-w-2xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </FadeInView>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-very-peri-500 to-very-peri-300 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {TIMELINE_YEARS.map((yearKey, index) => (
                <div
                  key={yearKey}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-8 flex h-8 w-8 items-center justify-center rounded-full bg-very-peri-600 shadow-lg md:left-1/2 md:-translate-x-1/2 z-10">
                    <span className="h-3 w-3 rounded-full bg-white" />
                  </div>

                  <div
                    className={`ml-20 w-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:border-very-peri-300 hover:shadow-md transition-all md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <span className="text-2xl font-heading font-bold text-very-peri-600">{YEAR_LABELS[yearKey]}</span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mt-1 mb-1">
                      {t(`timeline.${yearKey}.title`)}
                    </h3>
                    <p className="text-sm text-future-dusk-500">{t(`timeline.${yearKey}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-12 text-center">
              {t('stats.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STAT_VALUES.map((value, i) => (
              <StaggerItem key={value}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-heading font-bold text-very-peri-400 mb-2">{value}</div>
                  <p className="text-future-dusk-200">{t(`stats.stat${i + 1}.label`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {t('cta.ctaPrimary')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/academy">
                {t('cta.ctaSecondary')}
              </Link>
            </Button>
          </div>
        </FadeInView>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
