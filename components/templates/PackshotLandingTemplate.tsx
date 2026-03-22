import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import { ArrowRight, CheckCircle, ChevronDown, Camera, Sparkles, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HeroSection } from '@/components/hero';

export interface PackshotLandingConfig {
  namespace: string;
  slug: string;
  heroIcon: LucideIcon;
  heroBadge: { fr: string; en: string };
  benefitIcons: LucideIcon[];
  machineIds: string[];
  faqCount: number;
}

interface Props {
  config: PackshotLandingConfig;
  lang: string;
  t: (key: string) => string;
}

export default function PackshotLandingTemplate({ config, lang, t }: Props) {
  const { slug, heroIcon: HeroIcon, heroBadge, benefitIcons, machineIds, faqCount } = config;
  const machines = machineIds.map(getMachineById).filter(Boolean);
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/${slug}` },
  ];

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(`faq.q${i + 1}.question`),
    answer: t(`faq.q${i + 1}.answer`),
  }));

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Immersive, centered
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        badge={{
          icon: <HeroIcon className="h-4 w-4" />,
          label: isFr ? heroBadge.fr : heroBadge.en,
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/contact', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '/studios-photo-automatises', variant: 'secondary' },
        ]}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. STATS — Dark ribbon, oversized numbers
          Design: Giant stats dominate. Numbers are the hero.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="text-center px-3 sm:px-6 lg:px-8">
                  <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                    {t(`stats.stat${i}.value`)}
                  </p>
                  <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                    {t(`stats.stat${i}.label`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. BENEFITS — Split 4/8, sticky heading, numbered cards
          Design: Asymmetric. Heading stays left, benefits scroll right.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left column: sticky heading */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Avantages' : 'Benefits'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('benefits.heading')}
              </TextReveal>
            </ScrollReveal>

            {/* Right column: stacked benefit cards */}
            <div className="lg:col-span-8 space-y-8">
              {benefitIcons.map((Icon, i) => (
                <ScrollReveal key={i} offset={40}>
                  <SpringCard>
                    <div className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-very-peri-200 transition-colors duration-300 p-4 sm:p-5 lg:p-10">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-very-peri-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-very-peri-700" />
                        </div>
                        <span className="text-2xl sm:text-3xl lg:text-6xl font-heading font-bold text-neutral-100 select-none leading-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                        {t(`benefits.item${i + 1}.title`)}
                      </h3>
                      <p className="text-future-dusk-500 leading-relaxed">
                        {t(`benefits.item${i + 1}.description`)}
                      </p>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. MACHINES — Dark bg, floating white card
          Design: Dark surround. Machine cards on white elevated surface.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-28 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-future-dusk-800 to-future-dusk-900" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Systèmes recommandés' : 'Recommended systems'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {t('machines.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {t('machines.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <FadeInView delay={0.2}>
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl shadow-black/20">
              <div className={`grid gap-8 ${machines.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {machines.map((machine) => {
                  if (!machine) return null;
                  const langKey = isFr ? 'fr' : 'en';
                  return (
                    <SpringCard key={machine.id} hoverY={-4}>
                      <div className="rounded-2xl border border-neutral-100 hover:border-very-peri-200 bg-neutral-50 overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg">
                        <div className="h-1.5 bg-gradient-to-r from-very-peri-500 to-very-peri-400" />
                        <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">
                          <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">
                            {machine.nom}
                          </h3>
                          <p className="text-sm text-future-dusk-500 mb-5">
                            {isFr ? `Jusqu'à ${machine.tailleMax}` : `Up to ${machine.tailleMax}`} &middot; {machine.capaciteJour} {isFr ? 'photos/jour' : 'photos/day'}
                          </p>
                          <ul className="space-y-2.5 mb-6 flex-grow">
                            {machine.keyAdvantages.slice(0, 3).map((adv, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-future-dusk-600">{adv[langKey]}</span>
                              </li>
                            ))}
                          </ul>
                          <Button asChild className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl w-full h-11 font-semibold">
                            <Link href="/contact">
                              {t('machines.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </SpringCard>
                  );
                })}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. FAQ — Two-column: heading left, accordion right
          Design: Split layout, heading stays while user scrolls FAQs.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                  {t('faq.heading')}
                </TextReveal>
                <p className="text-future-dusk-500 leading-relaxed">
                  {isFr
                    ? 'Les réponses à vos questions les plus fréquentes.'
                    : 'Answers to your most common questions.'}
                </p>
              </ScrollReveal>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {faqs.map((faq, i) => (
                  <StaggerItem key={i}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-4 sm:p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-heading font-semibold text-future-dusk-900 text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                          {faq.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                        <p className="text-future-dusk-500 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. FINAL CTA — Asymmetric 3/5 + 2/5
          Design: Demo card takes 3/5, guide card 2/5. Dot pattern bg.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-28 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-center mb-16">
              {t('cta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8">
            {/* Demo — 3/5 = dominant */}
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-4 sm:p-6 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">
                  {t('cta.heading')}
                </h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">
                  {t('cta.description')}
                </p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-4 sm:px-6 lg:px-8 h-11 sm:h-12 lg:h-14 text-sm sm:text-base shadow-lg w-fit">
                  <Link href="/contact">
                    {t('cta.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
            {/* Guide — 2/5 = secondary */}
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {t('cta.ctaSecondary')}
                </h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                  {isFr
                    ? 'Découvrez notre gamme complète de systèmes photo automatisés.'
                    : 'Explore our full range of automated photo systems.'}
                </p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-4 sm:px-6 lg:px-8 h-10 sm:h-11 lg:h-12 text-sm sm:text-base w-fit">
                  <Link href="/studios-photo-automatises">
                    {t('cta.ctaSecondary')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. CROSS-LINKS — Minimal, editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">
              {isFr ? 'Explorez nos solutions' : 'Explore our solutions'}
            </span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios', href: '/studios-photo-automatises', icon: <Camera className="h-5 w-5" />, title: isFr ? 'Studios Photo Automatisés' : 'Automated Photo Studios', desc: isFr ? '20 systèmes Orbitvu du bijou au mobilier.' : '20 Orbitvu systems from jewelry to furniture.' },
              { key: 'ia', href: '/ia-photo-produit', icon: <Sparkles className="h-5 w-5" />, title: isFr ? 'IA Photo Produit' : 'Product Photo AI', desc: isFr ? 'Transformez vos packshots en visuels lifestyle.' : 'Transform your packshots into lifestyle visuals.' },
              { key: 'academy', href: '/academy', icon: <GraduationCap className="h-5 w-5" />, title: isFr ? 'Academy' : 'Academy', desc: isFr ? 'Formations Qualiopi pour maîtriser votre système.' : 'Qualiopi training to master your system.' },
            ].map((link) => (
              <FadeInView key={link.key}>
                <Link href={link.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-very-peri-500">{link.icon}</span>
                    <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">
                    {link.desc}
                  </p>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
