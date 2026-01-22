import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6">
              {t('heading')}
            </h1>
            <div className="w-24 h-1 bg-secondary-orbitvu mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-neutral-medium max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Content: 2 colonnes (Formulaire + Info) */}
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Colonne gauche : Formulaire (3/5) */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-dark mb-6">
                {t('formTitle')}
              </h2>

              {/* OPTION A : Embed Typeform/Tally (RECOMMANDÉ) */}
              <div className="w-full h-[600px] bg-neutral-lighter/30 rounded-lg border-2 border-dashed border-neutral-light flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-neutral-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-neutral-medium font-medium mb-2">
                    {t('formPlaceholder')}
                  </p>
                  <p className="text-sm text-neutral-medium/60">
                    {t('formPlaceholderSubtitle')}
                  </p>
                </div>
              </div>

              {/* TODO: Remplacer par embed réel Typeform ou Tally
              <div className="w-full h-[600px]">
                <iframe
                  src="[URL_TYPEFORM_À_CONFIGURER]"
                  className="w-full h-full border-0 rounded-lg shadow-md"
                  title={t('formTitle')}
                />
              </div>
              */}
            </div>

            {/* Colonne droite : Coordonnées + Map (2/5) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Coordonnées */}
              <div className="bg-gradient-to-br from-primary-orbitvu/5 to-secondary-orbitvu/5 p-6 rounded-lg">
                <h3 className="font-heading text-xl font-bold text-neutral-dark mb-4">
                  {t('infoTitle')}
                </h3>
                <div className="space-y-4 text-neutral-medium">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-orbitvu flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-dark">{t('phone')}</p>
                      <p>{t('phoneValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-orbitvu flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-dark">{t('email')}</p>
                      <p>{t('emailValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-orbitvu flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-dark">{t('hours')}</p>
                      <p>{t('hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showroom */}
              <div>
                <h3 className="font-heading text-xl font-bold text-neutral-dark mb-4">
                  {t('showroomTitle')}
                </h3>
                <p className="text-neutral-medium mb-4 flex items-start gap-2">
                  <svg className="w-5 h-5 text-secondary-orbitvu flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t('showroomAddress')}</span>
                </p>

                {/* Google Maps - Placeholder */}
                <div className="w-full h-[300px] bg-neutral-lighter/30 rounded-lg border-2 border-dashed border-neutral-light flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg className="w-12 h-12 text-neutral-light mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-sm text-neutral-medium font-medium">
                      Google Maps à intégrer
                    </p>
                  </div>
                </div>

                {/* TODO: Remplacer par embed Google Maps réel
                <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=[COORDINATES_À_CONFIGURER]"
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Showroom PackshotCreator Lyon"
                  />
                </div>
                */}
              </div>

              {/* FAQ Contact */}
              <div>
                <h3 className="font-heading text-xl font-bold text-neutral-dark mb-4">
                  {t('faqTitle')}
                </h3>
                <div className="space-y-4">
                  <details className="group bg-white border border-neutral-light rounded-lg p-4 hover:border-secondary-orbitvu transition-colors">
                    <summary className="cursor-pointer font-medium text-neutral-dark list-none flex items-center justify-between">
                      <span>{t('faq1Question')}</span>
                      <svg className="w-5 h-5 text-secondary-orbitvu transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-neutral-medium text-sm leading-relaxed">
                      {t('faq1Answer')}
                    </p>
                  </details>

                  <details className="group bg-white border border-neutral-light rounded-lg p-4 hover:border-secondary-orbitvu transition-colors">
                    <summary className="cursor-pointer font-medium text-neutral-dark list-none flex items-center justify-between">
                      <span>{t('faq2Question')}</span>
                      <svg className="w-5 h-5 text-secondary-orbitvu transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-neutral-medium text-sm leading-relaxed">
                      {t('faq2Answer')}
                    </p>
                  </details>

                  <details className="group bg-white border border-neutral-light rounded-lg p-4 hover:border-secondary-orbitvu transition-colors">
                    <summary className="cursor-pointer font-medium text-neutral-dark list-none flex items-center justify-between">
                      <span>{t('faq3Question')}</span>
                      <svg className="w-5 h-5 text-secondary-orbitvu transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-neutral-medium text-sm leading-relaxed">
                      {t('faq3Answer')}
                    </p>
                  </details>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
