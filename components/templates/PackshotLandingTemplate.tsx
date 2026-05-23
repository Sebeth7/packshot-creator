import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import { ArrowRight, CheckCircle, ChevronDown, Camera, Sparkles, GraduationCap, Quote, Box, Zap, Upload } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HeroSection } from '@/components/hero';
import { ContactForm } from '@/components/forms/ContactForm';

const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/images/logos/client-chanel.avif', w: 225, h: 225 },
  { name: 'Amazon', src: '/images/logos/client-amazon.avif', w: 409, h: 123 },
  { name: 'Safran', src: '/images/logos/client-safran.avif', w: 994, h: 228 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.avif', w: 600, h: 66 },
  { name: 'Valentino', src: '/images/logos/client-valentino.avif', w: 320, h: 157 },
  { name: 'Sandro', src: '/images/logos/client-sandro.avif', w: 390, h: 100 },
  { name: 'Seiko', src: '/images/logos/client-seiko.avif', w: 508, h: 99 },
  { name: 'Lidl', src: '/images/logos/client-lidl.avif', w: 177, h: 168 },
  { name: 'Würth', src: '/images/logos/client-wurth.avif', w: 485, h: 104 },
];

/** Maps machine IDs to their image paths in /public/images/machines/ */
const MACHINE_IMAGE_MAP: Record<string, string> = {
  'alphashot-micro-v2': '/images/machines/alphashot-micro-v2.avif',
  'alphashot-360': '/images/machines/alphashot-360.avif',
  'alphashot-g2': '/images/machines/alphashot-pro-g2.avif',
  'alphashot-pro-g2': '/images/machines/alphashot-pro-g2.avif',
  'alphashot-xl-v2': '/images/machines/alphashot-xl.avif',
  'alphashot-xl-wine-v2': '/images/machines/alphashot-xl.avif',
  'alphashot-xl-pro-v2': '/images/machines/alphashot-xl.avif',
  'alphadesk': '/images/machines/alphatable-alphadesk.avif',
  'alphatable': '/images/machines/alphatable-alphadesk.avif',
  'alphastudio-compact-v2': '/images/machines/alphastudio-compact.avif',
  'alphastudio-xxl-v2': '/images/machines/alphastudio-xxl.avif',
  'fashion-studio-basic': '/images/machines/fashion-studio.avif',
  'fashion-studio': '/images/machines/fashion-studio.avif',
  'bike-studio': '/images/machines/bike-studio.avif',
  'furniture-studio': '/images/machines/furniture-studio.avif',
  'e-comm-studio-plus': '/images/machines/ecomm-studio-plus.avif',
};

function getMachineImage(id: string): string {
  return MACHINE_IMAGE_MAP[id] || '/images/machines/placeholder-medium.svg';
}

export interface PackshotLandingConfig {
  namespace: string;
  slug: string;
  /** Short identifier for benefit illustration: bijoux, mode, ecommerce, amazon, industriel */
  benefitImageSlug: string;
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

function renderBold(text: string, onDark = false) {
  const parts = text.split(/<bold>(.*?)<\/bold>/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className={`font-semibold ${onDark ? 'text-white' : 'text-heading-dark'}`}>{part}</strong>
      : part
  );
}

function parseStatValue(value: string): { end: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^0-9]*?)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], end: parseInt(match[2], 10), suffix: match[3] };
}

export default function PackshotLandingTemplate({ config, lang, t }: Props) {
  const { slug, benefitImageSlug, heroIcon: HeroIcon, heroBadge, benefitIcons, machineIds, faqCount } = config;
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
        backgroundImage={`/images/hero/hero-landing-${config.benefitImageSlug}.avif`}
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
          <FadeInView className="text-center mb-10">
            <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em]">
              {isFr ? 'Chiffres clés' : 'Key figures'}
            </span>
          </FadeInView>
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[1, 2, 3].map((i) => {
              const rawValue = t(`stats.stat${i}.value`);
              const parsed = parseStatValue(rawValue);
              return (
                <StaggerItem key={i}>
                  <div className="text-center px-3 sm:px-6 lg:px-8">
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                      {parsed ? (
                        <AnimatedCounter
                          end={parsed.end}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                          duration={2.5}
                        />
                      ) : rawValue}
                    </p>
                    <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                      {t(`stats.stat${i}.label`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2b. LOGO BAR — Trust strip
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-6">
              {isFr ? 'Ils produisent leurs packshots avec nous' : 'They produce their packshots with us'}
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex items-center gap-x-10 sm:gap-x-14 animate-marquee w-max">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <div key={`${logo.name}-${i}`} className="w-[90px] h-[34px] sm:w-[120px] sm:h-[40px] flex-shrink-0 flex items-center justify-center opacity-60">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.w}
                      height={logo.h}
                      sizes="120px"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2c. BREATHER — Full-bleed visual pause
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full h-[300px] lg:h-[400px] bg-neutral-100 overflow-hidden">
        <Image
          src="/images/illustrations/breather-showroom.avif"
          alt="Showroom PackshotCreator"
          fill
          className="object-cover"
          loading="lazy"
        />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. BENEFITS — Split 4/8, sticky heading, numbered cards
          Design: Asymmetric. Heading stays left, benefits scroll right.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left column: sticky heading */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Avantages' : 'Benefits'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('benefits.heading')}
              </TextReveal>
              {/* Benefit illustration */}
              <div className="hidden lg:block mt-8">
                <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={`/images/illustrations/benefits-${benefitImageSlug}.avif`}
                    alt={t('benefits.heading')}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
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
                        {renderBold(t(`benefits.item${i + 1}.description`))}
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
          3b. HOW IT WORKS — 3-step process
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-very-peri-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Comment ça marche' : 'How it works'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {isFr ? '3 étapes. Zéro compétence photo.' : '3 steps. Zero photo skills.'}
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                Icon: Box,
                title: isFr ? 'Placez votre produit' : 'Place your product',
                desc: isFr
                  ? 'Ouvrez le studio, posez l\'objet. Le logiciel guide l\'opérateur pour le positionnement optimal.'
                  : 'Open the studio, place the item. The software guides the operator for optimal positioning.',
              },
              {
                step: '02',
                Icon: Zap,
                title: isFr ? 'Capturez en un clic' : 'Capture in one click',
                desc: isFr
                  ? 'Photo, 360°, vidéo : tout est automatisé. Éclairage LED calibré, cadrage, détourage IQ Mask.'
                  : 'Photo, 360°, video: everything is automated. Calibrated LED lighting, framing, IQ Mask clipping.',
              },
              {
                step: '03',
                Icon: Upload,
                title: isFr ? 'Exportez partout' : 'Export everywhere',
                desc: isFr
                  ? 'Formats marketplace-ready en un clic. Intégration PIM/DAM. Publication directe sur vos canaux.'
                  : 'Marketplace-ready formats in one click. PIM/DAM integration. Direct publishing to your channels.',
              },
            ].map((item, i) => (
              <FadeInView key={i} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} delay={i * 0.15}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <span className="text-7xl lg:text-8xl font-heading font-bold text-very-peri-100 select-none leading-none">
                      {item.step}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                        <item.Icon className="h-7 w-7 text-very-peri-600" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-future-dusk-500 leading-relaxed max-w-sm mx-auto">
                    {item.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. MACHINES — Dark bg, floating white card
          Design: Dark surround. Machine cards on white elevated surface.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-future-dusk-800 to-future-dusk-900" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Systèmes recommandés' : 'Recommended systems'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
                {t('machines.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {renderBold(t('machines.subtitle'), true)}
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
                        <div className="h-2 bg-gradient-to-r from-very-peri-500 to-very-peri-400" />
                        {/* Machine image */}
                        <div className="relative w-full h-[140px] bg-white flex items-center justify-center">
                          <Image
                            src={getMachineImage(machine.id)}
                            alt={machine.nom}
                            width={200}
                            height={140}
                            className="object-contain max-h-[120px] w-auto"
                            loading="lazy"
                          />
                        </div>
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
          4b. TESTIMONIAL — Social proof quote
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-6 block">
                {isFr ? 'Témoignage client' : 'Client testimonial'}
              </span>
              <Quote className="h-10 w-10 text-very-peri-200 mx-auto mb-6" strokeWidth={1.5} />
              <blockquote className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 leading-snug mb-8">
                &ldquo;{t('testimonial.quote')}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-future-dusk-900">{t('testimonial.author')}</p>
                <p className="text-sm text-future-dusk-500">{t('testimonial.role')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. FAQ — Two-column: heading left, accordion right
          Design: Split layout, heading stays while user scrolls FAQs.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
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
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {t('cta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8">
            {/* Contact form — 3/5 = dominant */}
            <FadeInView direction="left" className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10">
                <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">
                  {isFr ? 'Réservez votre démo' : 'Book your demo'}
                </h3>
                <ContactForm locale={isFr ? 'fr' : 'en'} compact defaultRequestType="demo" />
              </div>
            </FadeInView>
            {/* ROI — 2/5 = secondary */}
            <FadeInView direction="right" delay={0.15} className="lg:col-span-2 flex flex-col gap-4 lg:gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {isFr ? 'Calculez votre ROI' : 'Calculate your ROI'}
                  </h3>
                  <p className="text-future-dusk-300 mb-8 leading-relaxed">
                    {isFr
                      ? 'Estimez vos économies en 2 minutes. Résultat personnalisé et immédiat.'
                      : 'Estimate your savings in 2 minutes. Personalized and instant results.'}
                  </p>
                </div>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-4 sm:px-6 lg:px-8 h-10 sm:h-11 lg:h-12 text-sm sm:text-base w-fit">
                  <Link href="/calculateur-roi">
                    {t('cta.ctaSecondary')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-very-peri-500/20 to-very-peri-600/10 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-very-peri-400/20">
                <p className="text-very-peri-200 text-sm leading-relaxed">
                  {isFr
                    ? '30 minutes avec un expert. Voyez nos systèmes en action sur vos propres produits.'
                    : '30 minutes with an expert. See our systems in action on your own products.'}
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. CROSS-LINKS — Minimal, editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em]">
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
