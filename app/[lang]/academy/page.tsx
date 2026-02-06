import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { GraduationCap, Camera, Brain, Calculator, CalendarDays, ArrowRight, Check, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'academyHub.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/academy`,
      languages: { fr: '/fr/academy', en: '/en/academy' },
    },
  };
}

export default async function AcademyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'academyHub' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://packshot-creator.com/${lang}/academy` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-emerald-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Award className="h-4 w-4" />
                Qualiopi
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/25">
                  <Link href="#formations">{t('hero.ctaPrimary')}</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/academy/simulateur-opco">{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustrations/pillar-formation.avif"
                alt="Academy PackshotCreator"
                width={640}
                height={480}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qualiopi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-8 w-8 text-emerald-600" />
                  <h2 className="text-3xl font-heading font-bold text-future-dusk-900">
                    {t('qualiopi.heading')}
                  </h2>
                </div>
                <p className="text-future-dusk-600 leading-relaxed mb-6">
                  {t('qualiopi.description')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(['benefit1', 'benefit2', 'benefit3', 'benefit4'] as const).map((key) => (
                  <div key={key} className="bg-white rounded-xl p-4 shadow-sm">
                    <Check className="h-5 w-5 text-emerald-600 mb-2" />
                    <p className="text-sm font-medium text-future-dusk-800">{t(`qualiopi.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section id="formations" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('formations.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('formations.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Packshot Training */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-2 bg-very-peri-500" />
              <div className="p-8">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                  <Camera className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                  {t('formations.packshot.title')}
                </h3>
                <p className="text-future-dusk-500 leading-relaxed mb-6">
                  {t('formations.packshot.description')}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                    <CalendarDays className="h-4 w-4 text-future-dusk-400" />
                    {t('formations.packshot.duration')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                    <GraduationCap className="h-4 w-4 text-future-dusk-400" />
                    {t('formations.packshot.level')}
                  </span>
                </div>
                <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                  <Link href="/academy/formations-packshot">
                    {t('formations.packshot.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* IA Training */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-2 bg-amber-500" />
              <div className="p-8">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 text-amber-700 mb-4">
                  <Brain className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                  {t('formations.ia.title')}
                </h3>
                <p className="text-future-dusk-500 leading-relaxed mb-6">
                  {t('formations.ia.description')}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                    <CalendarDays className="h-4 w-4 text-future-dusk-400" />
                    {t('formations.ia.duration')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                    <GraduationCap className="h-4 w-4 text-future-dusk-400" />
                    {t('formations.ia.level')}
                  </span>
                </div>
                <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl w-full">
                  <Link href="/academy/formations-ia">
                    {t('formations.ia.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools: Simulator + Calendar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('tools.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('tools.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8 group hover:shadow-lg transition-shadow">
              <Calculator className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                {t('tools.simulator.title')}
              </h3>
              <p className="text-future-dusk-500 leading-relaxed mb-6">
                {t('tools.simulator.description')}
              </p>
              <Button asChild variant="outline" className="rounded-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors">
                <Link href="/academy/simulateur-opco">
                  {t('tools.simulator.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-very-peri-50 rounded-2xl p-8 group hover:shadow-lg transition-shadow">
              <CalendarDays className="h-10 w-10 text-very-peri-600 mb-4" />
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                {t('tools.calendar.title')}
              </h3>
              <p className="text-future-dusk-500 leading-relaxed mb-6">
                {t('tools.calendar.description')}
              </p>
              <Button asChild variant="outline" className="rounded-xl group-hover:bg-very-peri-600 group-hover:text-white group-hover:border-very-peri-600 transition-colors">
                <Link href="/academy/calendrier">
                  {t('tools.calendar.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {t('finalCta.heading')}
          </h2>
          <p className="text-lg text-future-dusk-300 mb-8 max-w-2xl mx-auto">
            {t('finalCta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg">
              <Link href="/contact">{t('finalCta.ctaPrimary')}</Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
              <Link href="/academy/simulateur-opco">{t('finalCta.ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
