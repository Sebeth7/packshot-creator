import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { CalendarDays, Award, Camera, Brain, ArrowRight, ChevronRight, Phone, Mail, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

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
      languages: { fr: '/fr/academy/calendrier', en: '/en/academy/calendrier' },
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
      {/* Hero */}
      <HeroSection
        title={
          <>
            <Link href="/academy" className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-sans font-medium mb-6 hover:text-white transition-colors">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Academy
            </Link>
            <div className="flex justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-sans font-medium px-4 py-1.5 rounded-full">
                <Award className="h-4 w-4" /> Qualiopi
              </span>
              <span className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-sans font-medium px-3 py-1.5 rounded-full">
                OPCO
              </span>
            </div>
            {isFr ? 'Calendrier Formations 2026' : 'Training Calendar 2026'}
          </>
        }
        subtitle={
          isFr
            ? 'Réservez votre session de formation. Choisissez parmi nos formations packshot Orbitvu et IA générative BlendAI.'
            : 'Book your training session. Choose from our Orbitvu packshot and BlendAI generative AI training courses.'
        }
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl">
            <Link href="/academy/formations-packshot">
              <Camera className="mr-2 h-4 w-4" /> {isFr ? 'Formations Packshot' : 'Packshot Training'}
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
            <Link href="/academy/formations-ia">
              <Brain className="mr-2 h-4 w-4" /> {isFr ? 'Formations IA' : 'AI Training'}
            </Link>
          </Button>
        </div>
      </HeroSection>

      {/* Calendar Placeholder */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('calendrier.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500">{t('calendrier.subtitle')}</p>
          </FadeInView>
          <div className="bg-neutral-50 rounded-2xl p-12 text-center border border-neutral-100">
            <CalendarDays className="h-16 w-16 text-very-peri-400 mx-auto mb-6" />
            <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
              {isFr ? 'Calendrier de réservation bientôt disponible' : 'Booking calendar coming soon'}
            </h3>
            <p className="text-future-dusk-500 mb-8 max-w-lg mx-auto">
              {isFr
                ? 'Notre système de prise de rendez-vous en ligne sera disponible prochainement. En attendant, contactez-nous pour réserver.'
                : 'Our online booking system will be available soon. In the meantime, contact us to book.'}
            </p>
            <Button asChild size="lg" className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl">
              <Link href="/contact">
                {isFr ? 'Nous contacter' : 'Contact us'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Date */}
      <section className="py-20 bg-neutral-50">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-very-peri-50 to-very-peri-100/50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                  {isFr ? 'Besoin d\'une date personnalisée ?' : 'Need a custom date?'}
                </h2>
                <p className="text-future-dusk-500 mb-6">
                  {isFr
                    ? 'Formation intra-entreprise ou date spécifique ? Nous adaptons notre calendrier à vos besoins.'
                    : 'In-company training or specific date? We adapt our calendar to your needs.'}
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl w-full">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-very-peri-200">
              <div className="text-center">
                <Users className="h-5 w-5 text-very-peri-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? '8 participants max' : '8 participants max'}</p>
              </div>
              <div className="text-center">
                <Clock className="h-5 w-5 text-very-peri-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? '1 à 3 jours' : '1 to 3 days'}</p>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 text-very-peri-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">Qualiopi</p>
              </div>
              <div className="text-center">
                <CalendarDays className="h-5 w-5 text-very-peri-600 mx-auto mb-1" />
                <p className="text-xs text-future-dusk-500">{isFr ? 'Sur mesure' : 'Custom'}</p>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
              {isFr ? 'Questions fréquentes sur l\'inscription' : 'Registration FAQ'}
            </h2>
          </FadeInView>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-neutral-50 rounded-2xl p-6 group">
                <summary className="font-heading font-bold text-future-dusk-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 text-future-dusk-400 transition-transform group-open:rotate-90 shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-sm text-future-dusk-500 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-50">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
            {isFr ? 'Vous hésitez encore ?' : 'Still undecided?'}
          </h2>
          <p className="text-future-dusk-500 mb-8">
            {isFr ? 'Consultez notre catalogue complet de formations' : 'Browse our full training catalog'}
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/academy">
              {isFr ? 'Voir toutes les formations' : 'View all training'} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeInView>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
