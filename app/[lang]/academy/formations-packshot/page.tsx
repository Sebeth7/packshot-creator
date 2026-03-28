import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Camera, Zap, Target, TrendingUp, Award, Clock, GraduationCap, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, courseSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

/* ── Bold sélectif emerald (couleur secondaire Academy) ── */
const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-emerald-700 font-semibold">{children}</strong>
);
const renderBold = (chunks: React.ReactNode) => <B>{chunks}</B>;

const PACKSHOT_COURSES = [
  {
    key: 'niveau1',
    level: 1,
    color: 'bg-very-peri-500',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Blended / Présentiel',
  },
  {
    key: 'niveau2',
    level: 2,
    color: 'bg-very-peri-600',
    durationFr: '21h (3 jours)',
    durationEn: '21h (3 days)',
    format: 'Blended / Présentiel',
  },
  {
    key: 'niveau3',
    level: 3,
    color: 'bg-very-peri-700',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Présentiel',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Formations Studios Photo Orbitvu | Certifiées Qualiopi'
      : 'Orbitvu Photo Studio Training | Qualiopi Certified',
    description: isFr
      ? 'Formations certifiées Qualiopi sur les studios photo automatisés Orbitvu. Maîtrisez la photographie packshot professionnelle. Financement OPCO jusqu\'à 100%.'
      : 'Qualiopi certified training on Orbitvu automated photo studios. Master professional packshot photography. OPCO funding up to 100%.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/academy/formations-packshot`,
      languages: { fr: '/fr/academy/formations-packshot', en: '/en/academy/formations-packshot' },
    },
    openGraph: {
      title: isFr
        ? 'Formations Studios Photo Orbitvu | Certifiées Qualiopi'
        : 'Orbitvu Photo Studio Training | Qualiopi Certified',
      images: [{ url: `/api/og?title=${encodeURIComponent(isFr ? 'Formations Studios Photo Orbitvu' : 'Orbitvu Photo Studio Training')}&type=formation&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function FormationsPackshotPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://www.packshot-creator.com/${lang}/academy` },
    { name: isFr ? 'Formations Packshot' : 'Packshot Training', url: `https://www.packshot-creator.com/${lang}/academy/formations-packshot` },
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: isFr ? 'Productivité x10' : '10x Productivity',
      desc: isFr
        ? <>Automatisez vos prises de vue et réduisez le temps de production de <B>90%</B></>
        : <>Automate your shots and reduce production time by <B>90%</B></>,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: isFr ? 'Qualité professionnelle' : 'Professional Quality',
      desc: isFr
        ? <>Des images <B>parfaitement calibrées</B> selon les standards e-commerce</>
        : <><B>Perfectly calibrated</B> images to e-commerce standards</>,
      color: 'bg-very-peri-100 text-very-peri-700',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: isFr ? 'ROI rapide' : 'Fast ROI',
      desc: isFr
        ? <>Rentabilisez votre investissement en <B>moins de 6 mois</B></>
        : <>Return on investment in <B>less than 6 months</B></>,
      color: 'bg-emerald-100 text-emerald-700',
    },
  ];

  const courseTitles: Record<string, { fr: string; en: string }> = {
    niveau1: { fr: 'Prise en main Studio Orbitvu', en: 'Orbitvu Studio Getting Started' },
    niveau2: { fr: 'Packshot Avancé & 360°', en: 'Advanced Packshot & 360°' },
    niveau3: { fr: 'Expert Workflow & Intégration', en: 'Expert Workflow & Integration' },
  };

  const courseDescs: Record<string, { fr: React.ReactNode; en: React.ReactNode }> = {
    niveau1: {
      fr: <>Maîtrisez les bases de la <B>photographie packshot automatisée</B>. Configuration studio, éclairage, premiers packshots professionnels.</>,
      en: <>Master the basics of <B>automated packshot photography</B>. Studio setup, lighting, first professional packshots.</>,
    },
    niveau2: {
      fr: <>Techniques avancées : <B>360° interactif</B>, focus stacking, ghost image, workflow batch pour <B>gros catalogues</B>.</>,
      en: <>Advanced techniques: <B>interactive 360°</B>, focus stacking, ghost image, batch workflow for <B>large catalogs</B>.</>,
    },
    niveau3: {
      fr: <>Optimisation avancée du workflow, intégration <B>PIM/DAM</B>, automatisation complète de la <B>chaîne de production visuelle</B>.</>,
      en: <>Advanced workflow optimization, <B>PIM/DAM</B> integration, full automation of the <B>visual production chain</B>.</>,
    },
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO — Split layout, fond sombre
          ════════════════════════════════════════════════════════════ */}
      <HeroSection
        layout="split"
        title={
          <>
            <Link href="/academy" className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-sans font-medium hover:text-white transition-colors">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              Academy
            </Link>
            <div className="flex items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-sans font-medium px-4 py-1.5 rounded-full">
                <Award className="h-4 w-4" /> Qualiopi
              </span>
              <span className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-sans font-medium px-3 py-1.5 rounded-full">
                OPCO
              </span>
            </div>
            <span className="block mt-6">{isFr ? 'Formations Studios Photo Orbitvu' : 'Orbitvu Photo Studio Training'}</span>
          </>
        }
        subtitle={
          isFr
            ? <span>Maîtrisez les <strong className="text-white font-semibold">studios photo automatisés Orbitvu</strong> pour produire des <strong className="text-white font-semibold">packshots e-commerce</strong> professionnels. Formations certifiées avec <strong className="text-white font-semibold">financement OPCO</strong> disponible.</span>
            : <span>Master <strong className="text-white font-semibold">Orbitvu automated photo studios</strong> to produce professional <strong className="text-white font-semibold">e-commerce packshots</strong>. Certified training with <strong className="text-white font-semibold">OPCO funding</strong> available.</span>
        }
        media={
          <Image
            src="/images/illustrations/pillar-hardware.avif"
            alt={isFr ? 'Formation studio photo Orbitvu' : 'Orbitvu photo studio training'}
            width={640}
            height={480}
            className="rounded-2xl shadow-2xl"
            priority
          />
        }
      >
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
            <a href="#formations">{isFr ? 'Voir les formations' : 'View training'}</a>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
            <Link href="/academy/calendrier">{isFr ? 'Calendrier' : 'Calendar'}</Link>
          </Button>
        </div>
      </HeroSection>

      {/* ════════════════════════════════════════════════════════════
          BENEFITS — Split image + bénéfices, fond blanc
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left — Image d'illustration */}
            <FadeInView direction="left">
              <ScrollReveal scale>
                <div className="relative">
                  <Image
                    src="/images/illustrations/pillar-formation.avif"
                    alt={isFr ? 'Formation photo produit en situation' : 'Product photography training in action'}
                    width={600}
                    height={700}
                    className="rounded-2xl shadow-2xl object-cover w-full"
                  />
                  {/* Badge flottant */}
                  <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-xl shadow-lg px-5 py-3 border border-neutral-100">
                    <p className="text-2xl font-heading font-bold text-emerald-600">500+</p>
                    <p className="text-xs text-future-dusk-500">{isFr ? 'stagiaires formés' : 'trained professionals'}</p>
                  </div>
                </div>
              </ScrollReveal>
            </FadeInView>

            {/* Right — Titre + 3 bénéfices empilés */}
            <FadeInView direction="right" delay={0.15}>
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'Pourquoi se former' : 'Why train'}
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-10">
                  {isFr ? 'Pourquoi se former aux studios Orbitvu ?' : 'Why train on Orbitvu studios?'}
                </TextReveal>

                <div className="space-y-0 divide-y divide-neutral-100">
                  {benefits.map((b, i) => (
                    <div key={b.title} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                      <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${b.color} flex-shrink-0 mt-0.5`}>
                        {b.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-1.5">{b.title}</h3>
                        <p className="text-future-dusk-500 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CATALOGUE — Grille 3 colonnes, fond blanc (distincte de Financement)
          ════════════════════════════════════════════════════════════ */}
      <section id="formations" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView direction="up">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {t('catalogue.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('catalogue.packshot_heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed">
                {t.rich('catalogue.packshot_subtitle', { bold: renderBold })}
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8">
            {PACKSHOT_COURSES.map((course, idx) => (
              <FadeInView key={course.key} direction={idx === 0 ? 'left' : idx === 2 ? 'right' : 'up'} delay={idx * 0.1}>
                <SpringCard className="h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow relative border border-neutral-100 h-full flex flex-col">
                    {/* Ghost number */}
                    <span className="absolute top-4 right-4 text-4xl lg:text-6xl font-heading font-bold text-neutral-100 select-none leading-none">
                      {String(course.level).padStart(2, '0')}
                    </span>
                    <div className={`h-2 ${course.color}`} />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-very-peri-100 text-very-peri-700 text-sm font-bold">
                          {course.level}
                        </span>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">OPCO</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                        {isFr ? courseTitles[course.key].fr : courseTitles[course.key].en}
                      </h3>
                      <p className="text-sm text-future-dusk-500 leading-relaxed mb-6">
                        {isFr ? courseDescs[course.key].fr : courseDescs[course.key].en}
                      </p>
                      <div className="space-y-2 text-sm text-future-dusk-600 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-future-dusk-400" />
                          {isFr ? course.durationFr : course.durationEn}
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-future-dusk-400" />
                          {course.format}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                          <Link href="/contact">
                            {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SpringCard>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FINANCEMENT — Split sticky 4/8, fond neutral-50
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: sticky heading */}
            <FadeInView direction="left" className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-emerald-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Financement' : 'Funding'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {isFr ? 'Formation financée, qualité certifiée' : 'Funded training, certified quality'}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {isFr
                  ? <>Nos formations sont <B>certifiées Qualiopi</B> et éligibles au <B>financement OPCO jusqu&apos;à 100%</B>.</>
                  : <>Our training is <B>Qualiopi certified</B> and eligible for <B>OPCO funding up to 100%</B>.</>
                }
              </p>
            </FadeInView>

            {/* Right: stacked cards */}
            <div className="lg:col-span-8 space-y-8">
              {/* Qualiopi card */}
              <FadeInView direction="right" delay={0.1}>
                <SpringCard>
                  <div className="bg-emerald-50 rounded-2xl p-6 sm:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-8 w-8 text-emerald-600" />
                      <h3 className="text-2xl font-heading font-bold text-future-dusk-900">{t('qualiopi.heading')}</h3>
                    </div>
                    <p className="text-future-dusk-600 mb-6">{t.rich('qualiopi.description', { bold: renderBold })}</p>
                    <ul className="space-y-3">
                      {(['feature1', 'feature2', 'feature3'] as const).map((key) => (
                        <li key={key} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                          <span className="text-sm text-future-dusk-600">{t(`qualiopi.${key}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpringCard>
              </FadeInView>
              {/* OPCO card */}
              <FadeInView direction="right" delay={0.2}>
                <SpringCard>
                  <div className="bg-very-peri-50 rounded-2xl p-6 sm:p-10">
                    <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">{t('opco.heading')}</h3>
                    <p className="text-future-dusk-600 font-medium mb-6">{t.rich('opco.description', { bold: renderBold })}</p>
                    <div className="space-y-4 text-sm text-future-dusk-600 mb-6">
                      <p><strong className="text-future-dusk-800">{isFr ? 'Salariés :' : 'Employees:'}</strong> {t('opco.salaries')}</p>
                      <p><strong className="text-future-dusk-800">{isFr ? 'Indépendants :' : 'Self-employed:'}</strong> {t('opco.independants')}</p>
                    </div>
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/academy/simulateur-opco">
                        {isFr ? 'Simuler mon financement' : 'Simulate my funding'} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </SpringCard>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA FINAL — Asymétrique 3/5 + 2/5, fond sombre
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <FadeInView direction="up">
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {isFr ? 'Prêt à vous former ?' : 'Ready to train?'}
            </TextReveal>
          </FadeInView>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Dominant 3/5 - calendrier */}
            <FadeInView direction="left" delay={0.1} className="lg:col-span-3">
              <SpringCard hoverY={-6}>
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                  <h3 className="text-3xl font-heading font-bold mb-4">{isFr ? 'Consultez le calendrier' : 'Check the calendar'}</h3>
                  <p className="text-emerald-100 text-lg mb-8 leading-relaxed flex-1">
                    {isFr ? 'Choisissez votre session de formation et rejoignez la prochaine promotion.' : 'Choose your training session and join the next class.'}
                  </p>
                  <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                    <Link href="/academy/calendrier">{isFr ? 'Voir le calendrier' : 'View calendar'} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </SpringCard>
            </FadeInView>
            {/* Secondary 2/5 - contact */}
            <FadeInView direction="right" delay={0.2} className="lg:col-span-2">
              <SpringCard hoverY={-6}>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 h-full flex flex-col">
                  <h3 className="text-2xl font-heading font-bold mb-4">{isFr ? 'Besoin de conseils ?' : 'Need advice?'}</h3>
                  <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                    {isFr ? 'Notre équipe vous accompagne pour choisir la formation adaptée à vos besoins.' : 'Our team helps you choose the right training for your needs.'}
                  </p>
                  <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                    <Link href="/contact">{isFr ? 'Nous contacter' : 'Contact us'}</Link>
                  </Button>
                </div>
              </SpringCard>
            </FadeInView>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        courseSchema({ name: 'Formations Studios Photo Orbitvu', description: 'Formations certifiées Qualiopi sur les studios photo automatisés Orbitvu', url: `https://www.packshot-creator.com/${lang}/academy/formations-packshot` }),
      ]} />
    </>
  );
}
