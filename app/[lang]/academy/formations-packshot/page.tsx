import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Camera, Zap, Target, TrendingUp, Award, Clock, GraduationCap, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, courseSchema } from '@/components/seo/SchemaOrg';

const PACKSHOT_COURSES = [
  {
    key: 'niveau1',
    level: 1,
    titleFr: 'Prise en main Studio Orbitvu',
    titleEn: 'Orbitvu Studio Getting Started',
    descFr: 'Maîtrisez les bases de la photographie packshot automatisée. Configuration studio, éclairage, premiers packshots professionnels.',
    descEn: 'Master the basics of automated packshot photography. Studio setup, lighting, first professional packshots.',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Blended / Présentiel',
    color: 'bg-very-peri-500',
  },
  {
    key: 'niveau2',
    level: 2,
    titleFr: 'Packshot Avancé & 360°',
    titleEn: 'Advanced Packshot & 360°',
    descFr: 'Techniques avancées : 360° interactif, focus stacking, ghost image, workflow batch pour gros catalogues.',
    descEn: 'Advanced techniques: interactive 360°, focus stacking, ghost image, batch workflow for large catalogs.',
    durationFr: '21h (3 jours)',
    durationEn: '21h (3 days)',
    format: 'Blended / Présentiel',
    color: 'bg-very-peri-600',
  },
  {
    key: 'niveau3',
    level: 3,
    titleFr: 'Expert Workflow & Intégration',
    titleEn: 'Expert Workflow & Integration',
    descFr: 'Optimisation avancée du workflow, intégration PIM/DAM, automatisation complète de la chaîne de production visuelle.',
    descEn: 'Advanced workflow optimization, PIM/DAM integration, full automation of the visual production chain.',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Présentiel',
    color: 'bg-very-peri-700',
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
      canonical: `https://packshot-creator.com/${lang}/academy/formations-packshot`,
      languages: { fr: '/fr/academy/formations-packshot', en: '/en/academy/formations-packshot' },
    },
  };
}

export default async function FormationsPackshotPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://packshot-creator.com/${lang}/academy` },
    { name: isFr ? 'Formations Packshot' : 'Packshot Training', url: `https://packshot-creator.com/${lang}/academy/formations-packshot` },
  ];

  const benefits = [
    { icon: <Zap className="h-6 w-6" />, title: isFr ? 'Productivité x10' : '10x Productivity', desc: isFr ? 'Automatisez vos prises de vue et réduisez le temps de production de 90%' : 'Automate your shots and reduce production time by 90%', color: 'bg-amber-100 text-amber-700' },
    { icon: <Target className="h-6 w-6" />, title: isFr ? 'Qualité professionnelle' : 'Professional Quality', desc: isFr ? 'Des images parfaitement calibrées selon les standards e-commerce' : 'Perfectly calibrated images to e-commerce standards', color: 'bg-very-peri-100 text-very-peri-700' },
    { icon: <TrendingUp className="h-6 w-6" />, title: isFr ? 'ROI rapide' : 'Fast ROI', desc: isFr ? 'Rentabilisez votre investissement en moins de 6 mois' : 'Return on investment in less than 6 months', color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/academy" className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-medium mb-6 hover:text-white transition-colors">
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Academy
              </Link>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Award className="h-4 w-4" /> Qualiopi
                </span>
                <span className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-medium px-3 py-1.5 rounded-full">
                  OPCO
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {isFr ? 'Formations Studios Photo Orbitvu' : 'Orbitvu Photo Studio Training'}
              </h1>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {isFr
                  ? 'Maîtrisez les studios photo automatisés Orbitvu pour produire des packshots e-commerce professionnels. Formations certifiées avec financement OPCO disponible.'
                  : 'Master Orbitvu automated photo studios to produce professional e-commerce packshots. Certified training with OPCO funding available.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <a href="#formations">{isFr ? 'Voir les formations' : 'View training'}</a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/academy/calendrier">{isFr ? 'Calendrier' : 'Calendar'}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustrations/pillar-hardware.avif"
                alt={isFr ? 'Formation studio photo Orbitvu' : 'Orbitvu photo studio training'}
                width={640}
                height={480}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Pourquoi se former aux studios Orbitvu ?' : 'Why train on Orbitvu studios?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${b.color} mx-auto mb-4`}>
                  {b.icon}
                </span>
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{b.title}</h3>
                <p className="text-sm text-future-dusk-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations Catalogue */}
      <section id="formations" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('catalogue.packshot_heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('catalogue.packshot_subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PACKSHOT_COURSES.map((course) => (
              <div key={course.key} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className={`h-2 ${course.color}`} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-very-peri-100 text-very-peri-700 text-sm font-bold">
                      {course.level}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">OPCO</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {isFr ? course.titleFr : course.titleEn}
                  </h3>
                  <p className="text-sm text-future-dusk-500 leading-relaxed mb-6">
                    {isFr ? course.descFr : course.descEn}
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
                  <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
                    <Link href="/contact">
                      {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualiopi & OPCO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
                <h3 className="text-2xl font-heading font-bold text-future-dusk-900">{t('qualiopi.heading')}</h3>
              </div>
              <p className="text-future-dusk-600 mb-6">{t('qualiopi.description')}</p>
              <ul className="space-y-3">
                {(['feature1', 'feature2', 'feature3'] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="text-sm text-future-dusk-600">{t(`qualiopi.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-very-peri-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">{t('opco.heading')}</h3>
              <p className="text-future-dusk-600 font-medium mb-6">{t('opco.description')}</p>
              <div className="space-y-4 text-sm text-future-dusk-600 mb-6">
                <p><strong>{isFr ? 'Salariés :' : 'Employees:'}</strong> {t('opco.salaries')}</p>
                <p><strong>{isFr ? 'Indépendants :' : 'Self-employed:'}</strong> {t('opco.independants')}</p>
              </div>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/academy/simulateur-opco">
                  {isFr ? 'Simuler mon financement' : 'Simulate my funding'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {isFr ? 'Prêt à vous former ?' : 'Ready to train?'}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8">
            {isFr ? 'Consultez notre calendrier pour choisir votre session de formation' : 'Check our calendar to choose your training session'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/academy/calendrier">
                {isFr ? 'Voir le calendrier' : 'View calendar'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/contact">{isFr ? 'Nous contacter' : 'Contact us'}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        courseSchema({ name: 'Formations Studios Photo Orbitvu', description: 'Formations certifiées Qualiopi sur les studios photo automatisés Orbitvu', url: `https://packshot-creator.com/${lang}/academy/formations-packshot` }),
      ]} />
    </>
  );
}
