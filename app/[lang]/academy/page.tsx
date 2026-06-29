import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { GraduationCap, Camera, Brain, Calculator, CalendarDays, ArrowRight, Check, Award, ChevronDown, BookOpen, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { getAllFormations } from '@/lib/formations';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { getTestimonialsByCategory } from '@/data/testimonials';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { buildLanguages } from '@/lib/hreflang';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'academyHub.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/academy`,
      languages: buildLanguages('/fr/academy', { en: '/en/academy' }),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/academy`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(t('title'))}&type=formation&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`/api/og?title=${encodeURIComponent(t('title'))}&type=formation&lang=${lang}`],
    },
  };
}

export default async function AcademyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'academyHub' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://www.packshot-creator.com/${lang}/academy` },
  ];

  const academyFaqs = (['q1', 'q2', 'q3', 'q4', 'q5'] as const).map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  return (
    <>
      {/* Hero */}
      <HeroSection
        layout="split"
        gradient="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-emerald-900"
        badge={{
          icon: <Award className="h-4 w-4" />,
          label: 'Qualiopi',
          colorClass: 'bg-emerald-500/15 text-emerald-300',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        media={
          <Image
            src="/images/illustrations/pillar-formation.avif"
            alt="Academy PackshotCreator"
            width={640}
            height={480}
            className="rounded-2xl shadow-2xl"
            priority
          />
        }
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/25">
            <a href="#formations">{t('hero.ctaPrimary')}</a>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
            <Link href="/academy/simulateur-opco">{t('hero.ctaSecondary')}</Link>
          </Button>
        </div>
      </HeroSection>

      {/* Qualiopi — Ruban social proof fond sombre */}
      <section id="qualiopi" className="py-16 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-emerald-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10 mb-12">
            <StaggerItem>
              <div className="flex flex-col items-center md:items-start px-0 md:px-10 py-4">
                <span className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-none mb-3">
                  Qualiopi
                </span>
                <span className="text-sm text-future-dusk-300 uppercase tracking-wider">
                  {t('qualiopi.heading')}
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center md:items-start px-0 md:px-10 py-4">
                <span className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-none mb-3">
                  100%
                </span>
                <span className="text-sm text-future-dusk-300 uppercase tracking-wider">
                  {isFr ? 'Financement OPCO' : 'OPCO Funding'}
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center md:items-start px-0 md:px-10 py-4">
                <span className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-none mb-3">
                  25+
                </span>
                <span className="text-sm text-future-dusk-300 uppercase tracking-wider">
                  {isFr ? "Années d'expertise" : 'Years of expertise'}
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <FadeInView delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {(['benefit1', 'benefit2', 'benefit3', 'benefit4'] as const).map((key) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium text-white">{t(`qualiopi.${key}`)}</span>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Formations — Split 4/8 avec heading sticky gauche */}
      <section id="formations" className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: sticky heading */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Nos formations' : 'Our training'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('formations.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {t('formations.subtitle')}
              </p>
            </ScrollReveal>

            {/* Right: 2 stacked cards */}
            <div className="lg:col-span-8 space-y-8">
              {/* Packshot Training */}
              <ScrollReveal offset={40}>
                <SpringCard>
                  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
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
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                          <CalendarDays className="h-4 w-4 text-future-dusk-400" />
                          {t('formations.packshot.duration')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                          <GraduationCap className="h-4 w-4 text-future-dusk-400" />
                          {t('formations.packshot.level')}
                        </span>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 mb-6 text-sm">
                        <span className="font-semibold text-emerald-700">{isFr ? "Financement OPCO jusqu'à 100%" : 'Up to 100% OPCO funding'}</span>
                        <span className="text-emerald-600"> — {isFr ? 'Certifié Qualiopi' : 'Qualiopi certified'}</span>
                      </div>
                      <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                        <Link href="/academy/formations-packshot">
                          {t('formations.packshot.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SpringCard>
              </ScrollReveal>

              {/* IA Training */}
              <ScrollReveal offset={40}>
                <SpringCard>
                  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
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
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                          <CalendarDays className="h-4 w-4 text-future-dusk-400" />
                          {t('formations.ia.duration')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-future-dusk-600">
                          <GraduationCap className="h-4 w-4 text-future-dusk-400" />
                          {t('formations.ia.level')}
                        </span>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 mb-6 text-sm">
                        <span className="font-semibold text-emerald-700">{isFr ? "Financement OPCO jusqu'à 100%" : 'Up to 100% OPCO funding'}</span>
                        <span className="text-emerald-600"> — {isFr ? 'Certifié Qualiopi' : 'Qualiopi certified'}</span>
                      </div>
                      <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl w-full">
                        <Link href="/academy/formations-ia">
                          {t('formations.ia.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SpringCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue complet — liens vers les 6 formations individuelles */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Catalogue complet' : 'Full catalog'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900">
                {isFr ? 'Toutes nos formations' : 'All our training programs'}
              </h2>
            </div>
          </FadeInView>
          <StaggerContainer stagger={0.06} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllFormations().map((formation) => {
              const levelLabel = isFr
                ? `Niveau ${formation.niveau}`
                : `Level ${formation.niveau}`;
              const formatLabel = formation.format === 'blended'
                ? 'Blended'
                : isFr ? 'Présentiel' : 'In-person';
              const durationLabel = `${formation.duree_heures}h`;

              return (
                <StaggerItem key={formation.slug}>
                  <Link
                    href={{ pathname: '/academy/[slug]', params: { slug: formation.slug } }}
                    className="group block rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg ${
                        formation.categorie === 'ia'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-very-peri-100 text-very-peri-700'
                      }`}>
                        {formation.categorie === 'ia' ? <Brain className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                      </span>
                      <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-wider">
                        {levelLabel}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors text-sm leading-snug">
                      {formation.titre}
                    </h3>
                    <p className="text-xs text-future-dusk-500 mb-4 line-clamp-2">
                      {formation.description_courte}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-future-dusk-400">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {formatLabel}
                      </span>
                      {formation.eligible_opco && (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <Check className="h-3 w-3" />
                          OPCO
                        </span>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Tools — Fond sombre avec floating cards */}
      <section className="py-16 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-900" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {t('tools.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">{t('tools.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className={`grid gap-8 ${isFr ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <SpringCard>
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20 h-full flex flex-col">
                <Calculator className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                  {t('tools.simulator.title')}
                </h3>
                <p className="text-future-dusk-500 leading-relaxed mb-6 flex-1">
                  {t('tools.simulator.description')}
                </p>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/academy/simulateur-opco">
                    {t('tools.simulator.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
            <SpringCard>
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20 h-full flex flex-col">
                <CalendarDays className="h-10 w-10 text-very-peri-600 mb-4" />
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                  {t('tools.calendar.title')}
                </h3>
                <p className="text-future-dusk-500 leading-relaxed mb-6 flex-1">
                  {t('tools.calendar.description')}
                </p>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/academy/calendrier">
                    {t('tools.calendar.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
            {isFr && (
              <SpringCard>
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20 h-full flex flex-col">
                  <Euro className="h-10 w-10 text-amber-600 mb-4" />
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    Comparateur de financement
                  </h3>
                  <p className="text-future-dusk-500 leading-relaxed mb-6 flex-1">
                    Comparez les dispositifs OPCO, CPF et FNE-Formation pour choisir le financement adapté à votre situation.
                  </p>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/outil-financement">
                      Comparer les financements <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SpringCard>
            )}
          </div>
        </div>
      </section>

      {/* FAQ — Split heading sticky gauche, accordion droite */}
      <section className="py-16 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                  {t('faq.heading')}
                </TextReveal>
                <p className="text-future-dusk-500 leading-relaxed">
                  {isFr
                    ? 'Tout ce que vous devez savoir sur nos formations certifiées.'
                    : 'Everything you need to know about our certified training.'}
                </p>
              </ScrollReveal>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {(['q1', 'q2', 'q3', 'q4', 'q5'] as const).map((key) => (
                  <StaggerItem key={key}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-emerald-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-4 sm:p-6 lg:p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold text-future-dusk-900 text-left">
                          {t(`faq.${key}.question`)}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-0">
                        <p className="text-future-dusk-600 leading-relaxed">{t(`faq.${key}.answer`)}</p>
                      </div>
                    </details>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — Asymetrique 3/5 + 2/5 */}
      <section className="py-16 lg:py-28 bg-future-dusk-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-center mb-16">
              {t('finalCta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Dominant card 3/5 */}
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.heading')}</h3>
                <p className="text-emerald-100 text-lg mb-8 leading-relaxed flex-1">{t('finalCta.description')}</p>
                <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/contact">{t('finalCta.ctaPrimary')}</Link>
                </Button>
              </div>
            </SpringCard>

            {/* Secondary card 2/5 */}
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Simulateur OPCO' : 'OPCO Simulator'}
                </h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                  {isFr
                    ? 'Estimez le montant de votre financement formation en quelques clics.'
                    : 'Estimate your training funding amount in just a few clicks.'}
                </p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/academy/simulateur-opco">{t('finalCta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      <TestimonialsSection
        items={getTestimonialsByCategory('formation')}
        lang={lang as 'fr' | 'en'}
        headline={isFr ? 'Avis de nos stagiaires' : 'What our trainees say'}
        subhead={isFr
          ? 'Une sélection d\'avis publiés sur Google par les participants à nos formations.'
          : 'A selection of reviews published on Google by participants of our training programs.'}
      />

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(academyFaqs)]} />
    </>
  );
}
