import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Brain, Sparkles, Rocket, Gem, BarChart3, Award, Clock, GraduationCap, ArrowRight, Check, ChevronRight, ImageIcon, Wand2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, courseSchema } from '@/components/seo/SchemaOrg';

const IA_COURSES = [
  {
    key: 'niveau1',
    level: 1,
    titleFr: 'Découverte IA Photo Produit',
    titleEn: 'AI Product Photo Discovery',
    descFr: 'Introduction à l\'IA générative appliquée au e-commerce. Premiers pas avec BlendAI, génération de backgrounds et retouche automatique.',
    descEn: 'Introduction to generative AI applied to e-commerce. First steps with BlendAI, background generation and automatic retouching.',
    durationFr: '7h (1 jour)',
    durationEn: '7h (1 day)',
    format: 'Blended / Présentiel',
    color: 'bg-amber-400',
  },
  {
    key: 'niveau2',
    level: 2,
    titleFr: 'BlendAI Avancé & Workflow',
    titleEn: 'Advanced BlendAI & Workflow',
    descFr: 'Maîtrise avancée de BlendAI : prompts experts, lifestyle mises en scène, shadow/reflection, workflow batch automatisé.',
    descEn: 'Advanced BlendAI mastery: expert prompts, lifestyle staging, shadow/reflection, automated batch workflow.',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Blended / Présentiel',
    color: 'bg-amber-500',
  },
  {
    key: 'niveau3',
    level: 3,
    titleFr: 'Expert IA & Stratégie Visuelle',
    titleEn: 'Expert AI & Visual Strategy',
    descFr: 'Stratégie IA complète : A/B testing visuels, analytics conversion, intégration pipeline production, ROI optimisation.',
    descEn: 'Complete AI strategy: visual A/B testing, conversion analytics, production pipeline integration, ROI optimization.',
    durationFr: '14h (2 jours)',
    durationEn: '14h (2 days)',
    format: 'Présentiel',
    color: 'bg-amber-600',
  },
];

const LEARN_FEATURES = [
  { icon: <ImageIcon className="h-5 w-5" />, titleFr: 'Génération de backgrounds', titleEn: 'Background generation', descFr: 'Créez des décors réalistes et contextuels pour vos produits en quelques clics.', descEn: 'Create realistic contextual backgrounds for your products in just a few clicks.' },
  { icon: <Wand2 className="h-5 w-5" />, titleFr: 'Shadow & Reflection', titleEn: 'Shadow & Reflection', descFr: 'Générez des ombres et reflets photoréalistes pour une intégration naturelle.', descEn: 'Generate photorealistic shadows and reflections for natural integration.' },
  { icon: <Layers className="h-5 w-5" />, titleFr: 'Workflow automatisé', titleEn: 'Automated workflow', descFr: 'Intégrez BlendAI dans votre pipeline pour automatiser la création à grande échelle.', descEn: 'Integrate BlendAI into your pipeline to automate creation at scale.' },
  { icon: <BarChart3 className="h-5 w-5" />, titleFr: 'ROI & Analytics', titleEn: 'ROI & Analytics', descFr: 'Mesurez l\'impact de vos visuels augmentés sur vos conversions.', descEn: 'Measure the impact of your augmented visuals on your conversions.' },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Formations IA BlendAI | IA Générative Photo Produit | Qualiopi'
      : 'BlendAI AI Training | Generative AI Product Photo | Qualiopi',
    description: isFr
      ? 'Formations certifiées Qualiopi sur l\'IA générative appliquée au e-commerce. Maîtrisez BlendAI pour créer des visuels lifestyle. Financement OPCO.'
      : 'Qualiopi certified training on generative AI for e-commerce. Master BlendAI to create lifestyle visuals. OPCO funding.',
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/academy/formations-ia`,
      languages: { fr: '/fr/academy/formations-ia', en: '/en/academy/formations-ia' },
    },
  };
}

export default async function FormationsIAPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://packshot-creator.com/${lang}/academy` },
    { name: isFr ? 'Formations IA' : 'AI Training', url: `https://packshot-creator.com/${lang}/academy/formations-ia` },
  ];

  const benefits = [
    { icon: <Rocket className="h-6 w-6" />, title: isFr ? 'Créativité augmentée' : 'Augmented Creativity', desc: isFr ? 'Générez des mises en scène produits illimitées en quelques secondes' : 'Generate unlimited product staging in seconds', color: 'bg-amber-100 text-amber-700' },
    { icon: <Gem className="h-6 w-6" />, title: isFr ? 'Qualité professionnelle' : 'Professional Quality', desc: isFr ? 'Des visuels réalistes et cohérents avec votre identité de marque' : 'Realistic visuals consistent with your brand identity', color: 'bg-very-peri-100 text-very-peri-700' },
    { icon: <BarChart3 className="h-6 w-6" />, title: isFr ? 'Performance prouvée' : 'Proven Performance', desc: isFr ? '+40% de taux de conversion avec des visuels augmentés par IA' : '+40% conversion rate with AI-augmented visuals', color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-[#2d1b4e] to-amber-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/academy" className="inline-flex items-center gap-1.5 text-amber-300 text-sm font-medium mb-6 hover:text-white transition-colors">
                <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Academy
              </Link>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Award className="h-4 w-4" /> Qualiopi
                </span>
                <span className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Brain className="h-4 w-4" /> IA Générative
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {isFr ? 'Formations IA BlendAI' : 'BlendAI AI Training'}
              </h1>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {isFr
                  ? 'Maîtrisez l\'IA générative appliquée au e-commerce. Créez des visuels produits augmentés avec BlendAI et révolutionnez votre workflow. Formations certifiées avec financement OPCO.'
                  : 'Master generative AI for e-commerce. Create augmented product visuals with BlendAI and revolutionize your workflow. Certified training with OPCO funding.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/25">
                  <a href="#formations">{isFr ? 'Voir les formations' : 'View training'}</a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/academy/calendrier">{isFr ? 'Calendrier' : 'Calendar'}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image src="/images/illustrations/pillar-ia.avif" alt="Formation IA BlendAI" width={640} height={480} className="rounded-2xl shadow-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Pourquoi se former à l\'IA générative ?' : 'Why train on generative AI?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${b.color} mx-auto mb-4`}>{b.icon}</span>
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{b.title}</h3>
                <p className="text-sm text-future-dusk-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Catalogue */}
      <section id="formations" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">{t('catalogue.ia_heading')}</h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">{t('catalogue.ia_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {IA_COURSES.map((course) => (
              <div key={course.key} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className={`h-2 ${course.color}`} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-amber-100 text-amber-700 text-sm font-bold">{course.level}</span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">OPCO</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">{isFr ? course.titleFr : course.titleEn}</h3>
                  <p className="text-sm text-future-dusk-500 leading-relaxed mb-6">{isFr ? course.descFr : course.descEn}</p>
                  <div className="space-y-2 text-sm text-future-dusk-600 mb-6">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-future-dusk-400" />{isFr ? course.durationFr : course.durationEn}</div>
                    <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-future-dusk-400" />{course.format}</div>
                  </div>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl w-full">
                    <Link href="/contact">{isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Ce que vous apprendrez avec BlendAI' : 'What you\'ll learn with BlendAI'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {LEARN_FEATURES.map((feat) => (
              <div key={feat.titleFr} className="bg-amber-50 rounded-2xl p-6">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-amber-100 text-amber-700 mb-3">{feat.icon}</span>
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{isFr ? feat.titleFr : feat.titleEn}</h3>
                <p className="text-sm text-future-dusk-500">{isFr ? feat.descFr : feat.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualiopi & OPCO */}
      <section className="py-20 bg-neutral-50">
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
                  <li key={key} className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-600 shrink-0" /><span className="text-sm text-future-dusk-600">{t(`qualiopi.${key}`)}</span></li>
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
                <Link href="/academy/simulateur-opco">{isFr ? 'Simuler mon financement' : 'Simulate my funding'} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {isFr ? 'Prêt à révolutionner votre création visuelle ?' : 'Ready to revolutionize your visual creation?'}
          </h2>
          <p className="text-lg text-amber-100 mb-8">{isFr ? 'Consultez notre calendrier pour choisir votre session de formation IA' : 'Check our calendar to choose your AI training session'}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-amber-50 rounded-xl shadow-lg">
              <Link href="/academy/calendrier">{isFr ? 'Voir le calendrier' : 'View calendar'} <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
        courseSchema({ name: 'Formations IA BlendAI', description: 'Formations certifiées Qualiopi sur l\'IA générative appliquée au e-commerce', url: `https://packshot-creator.com/${lang}/academy/formations-ia` }),
      ]} />
    </>
  );
}
