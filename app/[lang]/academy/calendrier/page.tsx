import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { CalendarDays, Award, Camera, Brain, ArrowRight, ChevronRight, Phone, Mail, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import SpringCard from '@/components/animations/SpringCard';
import { buildLanguages } from '@/lib/hreflang';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Calendrier Formations 2026 | PackshotCreator Academy'
      : 'Training Calendar 2026 | PackshotCreator Academy',
    description: isFr
      ? 'Consultez le calendrier des formations PackshotCreator Academy 2026. Réservez votre session packshot ou IA. Financement OPCO.'
      : 'View the PackshotCreator Academy 2026 training calendar. Book your packshot or AI session. OPCO funding.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/academy/calendrier`,
      languages: buildLanguages('/fr/academy/calendrier', { en: '/en/academy/calendrier' }),
    },
    openGraph: {
      title: isFr
        ? 'Calendrier Formations 2026 | PackshotCreator Academy'
        : 'Training Calendar 2026 | PackshotCreator Academy',
      images: [{ url: `/api/og?title=${encodeURIComponent(isFr ? 'Calendrier Formations 2026' : 'Training Calendar 2026')}&type=formation&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function CalendrierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://www.packshot-creator.com/${lang}/academy` },
    { name: isFr ? 'Calendrier' : 'Calendar', url: `https://www.packshot-creator.com/${lang}/academy/calendrier` },
  ];

  const faqs = [
    { q: isFr ? 'Comment réserver ma session ?' : 'How to book my session?', a: isFr ? 'Sélectionnez la date qui vous convient et suivez les étapes de réservation. Confirmation par email immédiate.' : 'Select your preferred date and follow the booking steps. Instant email confirmation.' },
    { q: isFr ? 'Puis-je annuler ou reporter ?' : 'Can I cancel or postpone?', a: isFr ? 'Oui, jusqu\'à 7 jours avant sans frais. Au-delà, frais de gestion de 30%.' : 'Yes, up to 7 days before at no charge. After that, 30% management fee.' },
    { q: isFr ? 'Comment fonctionne le financement OPCO ?' : 'How does OPCO funding work?', a: isFr ? 'Nos formations sont certifiées Qualiopi et éligibles OPCO. Nous fournissons tous les documents nécessaires. Délai moyen : 2-3 semaines.' : 'Our trainings are Qualiopi certified and OPCO eligible. We provide all necessary documents. Average delay: 2-3 weeks.' },
    { q: isFr ? 'Formations disponibles en distanciel ?' : 'Remote training available?', a: isFr ? 'Oui, nous proposons blended learning (mix présentiel/distanciel) et 100% distanciel selon les modules.' : 'Yes, we offer blended learning (mix in-person/remote) and 100% remote depending on modules.' },
    { q: isFr ? 'Nombre de participants par session ?' : 'Participants per session?', a: isFr ? 'Maximum 8 participants par session pour un accompagnement personnalisé.' : 'Maximum 8 participants per session for personalized support.' },
    { q: isFr ? 'Certification à l\'issue ?' : 'Certification on completion?', a: isFr ? 'Oui, attestation de formation certifiée Qualiopi précisant les compétences acquises.' : 'Yes, Qualiopi certified training certificate specifying acquired skills.' },
  ];

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO — Centré, fond sombre
          ════════════════════════════════════════════════════════════ */}
      <HeroSection
        title={
          <>
            <Link href="/academy" className="inline-flex items-center gap-1.5 text-emerald-300 text-sm font-sans font-medium mb-6 hover:text-white transition-colors">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Academy
            </Link>
            <div className="flex justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-sans font-medium px-4 py-1.5 rounded-full">
                <Award className="h-4 w-4" /> Qualiopi
              </span>
              <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-sans font-medium px-3 py-1.5 rounded-full">
                OPCO
              </span>
            </div>
            {isFr ? 'Calendrier Formations 2026' : 'Training Calendar 2026'}
          </>
        }
        subtitle={
          isFr
            ? <span>Réservez votre session de formation. Choisissez parmi nos formations <strong className="text-white font-semibold">packshot Orbitvu</strong> et <strong className="text-white font-semibold">IA générative BlendAI</strong>.</span>
            : <span>Book your training session. Choose from our <strong className="text-white font-semibold">Orbitvu packshot</strong> and <strong className="text-white font-semibold">BlendAI generative AI</strong> training courses.</span>
        }
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/25">
            <Link href="/academy/formations-packshot">
              <Camera className="mr-2 h-4 w-4" /> {isFr ? 'Formations Packshot' : 'Packshot Training'}
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/25">
            <Link href="/academy/formations-ia">
              <Brain className="mr-2 h-4 w-4" /> {isFr ? 'Formations IA' : 'AI Training'}
            </Link>
          </Button>
        </div>
      </HeroSection>

      {/* ════════════════════════════════════════════════════════════
          CALENDAR PLACEHOLDER — fond blanc
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView direction="up">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Calendrier' : 'Calendar'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('calendrier.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed">{t('calendrier.subtitle')}</p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.15}>
            <div className="bg-future-dusk-0 rounded-2xl p-12 text-center border border-neutral-100">
              <CalendarDays className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                {isFr ? 'Calendrier de réservation bientôt disponible' : 'Booking calendar coming soon'}
              </h3>
              <p className="text-future-dusk-500 mb-8 max-w-lg mx-auto">
                {isFr
                  ? 'Notre système de prise de rendez-vous en ligne sera disponible prochainement. En attendant, contactez-nous pour réserver.'
                  : 'Our online booking system will be available soon. In the meantime, contact us to book.'}
              </p>
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                <Link href="/contact">
                  {isFr ? 'Nous contacter' : 'Contact us'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          DATE PERSONNALISÉE — fond neutral-50
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <FadeInView direction="left" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-3 block">
                  {isFr ? 'Sur mesure' : 'Custom'}
                </span>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                  {isFr ? 'Besoin d\'une date personnalisée ?' : 'Need a custom date?'}
                </h2>
                <p className="text-future-dusk-500 leading-relaxed">
                  {isFr
                    ? <>Formation <strong className="text-emerald-700 font-semibold">intra-entreprise</strong> ou date spécifique ? Nous adaptons notre calendrier à vos besoins.</>
                    : <><strong className="text-emerald-700 font-semibold">In-company</strong> training or specific date? We adapt our calendar to your needs.</>
                  }
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl w-full">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" /> {isFr ? 'Demander un devis' : 'Request a quote'}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl w-full">
                  <a href="tel:+33320199090">
                    <Phone className="mr-2 h-4 w-4" /> 03 20 19 90 90
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-emerald-200">
              <div className="text-center">
                <Users className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? '8 participants max' : '8 participants max'}</p>
              </div>
              <div className="text-center">
                <Clock className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? '1 à 3 jours' : '1 to 3 days'}</p>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">Qualiopi</p>
              </div>
              <div className="text-center">
                <CalendarDays className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? 'Sur mesure' : 'Custom'}</p>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FAQ — Split sticky, fond future-dusk-0
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: sticky heading */}
            <FadeInView direction="left" className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-4 block">
                FAQ
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {isFr ? 'Questions fréquentes sur l\'inscription' : 'Registration FAQ'}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {isFr
                  ? <>Tout ce que vous devez savoir avant de <strong className="text-emerald-700 font-semibold">réserver votre session</strong>.</>
                  : <>Everything you need to know before <strong className="text-emerald-700 font-semibold">booking your session</strong>.</>
                }
              </p>
            </FadeInView>

            {/* Right: accordion */}
            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, idx) => (
                <FadeInView key={faq.q} direction="right" delay={idx * 0.05}>
                  <details className="bg-white rounded-2xl p-6 group shadow-sm">
                    <summary className="font-heading font-bold text-future-dusk-900 cursor-pointer list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-4 w-4 text-future-dusk-400 transition-transform group-open:rotate-90 shrink-0 ml-4" />
                    </summary>
                    <p className="mt-4 text-sm text-future-dusk-500 leading-relaxed">{faq.a}</p>
                  </details>
                </FadeInView>
              ))}
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
            <FadeInView direction="left" delay={0.1} className="lg:col-span-3">
              <SpringCard hoverY={-6}>
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                  <h3 className="text-3xl font-heading font-bold mb-4">{isFr ? 'Découvrez nos formations' : 'Discover our training'}</h3>
                  <p className="text-emerald-100 text-lg mb-8 leading-relaxed flex-1">
                    {isFr ? 'Packshot Orbitvu ou IA BlendAI — trouvez la formation qui correspond à vos objectifs.' : 'Orbitvu packshot or BlendAI AI — find the training that matches your goals.'}
                  </p>
                  <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                    <Link href="/academy">{isFr ? 'Voir toutes les formations' : 'View all training'} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </SpringCard>
            </FadeInView>
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

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
