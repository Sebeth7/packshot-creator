import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getGuide, getAllGuideSlugs, getGuideAlternates } from '@/lib/content';
import { Link } from '@/i18n/routing';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Clock, Wrench, Box, ArrowLeft, ChevronRight } from 'lucide-react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { sanitizeHtml } from '@/lib/sanitize';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of ['fr', 'en'] as const) {
    for (const slug of getAllGuideSlugs(lang)) {
      out.push({ lang, slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuide(slug, lang as 'fr' | 'en');
  if (!guide) return { title: 'Guide introuvable' };

  const metaTitleSource = guide.metaTitle || guide.title;
  const cleanTitle = metaTitleSource.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu, '').trim();

  const alternates = getGuideAlternates(guide.webflowItemId);
  const languages: Record<string, string> = {};
  if (alternates.fr) languages.fr = `/fr/guide/${alternates.fr}`;
  if (alternates.en) languages.en = `/en/guide/${alternates.en}`;

  return {
    title: cleanTitle,
    description: guide.description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/guide/${slug}`,
      languages,
    },
    openGraph: {
      title: cleanTitle,
      description: guide.description,
      url: `https://www.packshot-creator.com/${lang}/guide/${slug}`,
      images: guide.image
        ? [{ url: guide.image, width: 1200, height: 630 }]
        : [{ url: `/api/og?title=${encodeURIComponent(cleanTitle)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const guide = getGuide(slug, lang as 'fr' | 'en');

  if (!guide) notFound();

  const h1Source = guide.h1 || guide.title;
  const cleanTitle = h1Source.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu, '').trim();

  // Schema.org HowTo
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: cleanTitle,
    description: guide.description,
    image: guide.image,
    totalTime: guide.duration ? `PT${guide.duration.replace(/[^0-9]/g, '')}M` : undefined,
    tool: guide.tool ? { '@type': 'HowToTool', name: guide.tool } : undefined,
    step: guide.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.structuredText || step.title,
      image: step.image,
    })),
  };

  // Schema.org FAQ
  const faqSchema = guide.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  const breadcrumbs = breadcrumbSchema([
    { name: lang === 'fr' ? 'Accueil' : 'Home', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Guides', url: `https://www.packshot-creator.com/${lang}/guide` },
    { name: cleanTitle, url: `https://www.packshot-creator.com/${lang}/guide/${slug}` },
  ]);

  return (
    <>
      <SchemaOrg schema={[howToSchema, breadcrumbs, ...(faqSchema ? [faqSchema] : [])]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <Link href="/guide" className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'fr' ? 'Tous les guides' : 'All guides'}
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {cleanTitle}
            </h1>
            {guide.description && (
              <p className="text-lg text-white/70 max-w-2xl">{guide.description}</p>
            )}

            {/* Metadata badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {guide.duration && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  {guide.duration}
                </span>
              )}
              {guide.tool && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white/80 text-sm">
                  <Wrench className="w-4 h-4" />
                  {guide.tool}
                </span>
              )}
              {guide.logistics && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white/80 text-sm">
                  <Box className="w-4 h-4" />
                  {guide.logistics}
                </span>
              )}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Main image */}
      {guide.image && (
        <section className="py-10 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={guide.image}
                alt={cleanTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      {guide.introText && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div
              className="prose prose-lg max-w-none text-future-dusk-600 prose-headings:text-future-dusk-900 prose-a:text-very-peri-600 prose-a:hover:text-very-peri-700"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(guide.introText) }}
            />
          </div>
        </section>
      )}

      {/* Steps */}
      {guide.steps.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <StaggerContainer stagger={0.08} className="space-y-16">
              {guide.steps.map((step, i) => (
                <StaggerItem key={i}>
                  <div className="relative">
                    {/* Step number */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-very-peri-100 text-very-peri-700 font-heading font-bold text-lg shrink-0">
                        {i + 1}
                      </span>
                      <h2 className="text-xl md:text-2xl font-heading font-bold text-future-dusk-900">
                        {step.title}
                      </h2>
                    </div>

                    {/* Step image */}
                    {step.image && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 shadow-sm">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 896px"
                        />
                      </div>
                    )}

                    {/* Step content */}
                    {step.content && (
                      <div
                        className="prose max-w-none text-future-dusk-600 prose-headings:text-future-dusk-900 prose-a:text-very-peri-600"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(step.content) }}
                      />
                    )}

                    {/* Separator */}
                    {i < guide.steps.length - 1 && (
                      <div className="mt-12 border-b border-neutral-100" />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* FAQ */}
      {guide.faqs.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <FadeInView>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-future-dusk-900 mb-10">
                {lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
              </h2>
            </FadeInView>
            <StaggerContainer stagger={0.08} className="space-y-4">
              {guide.faqs.map((faq, i) => (
                <StaggerItem key={i}>
                  <details className="group rounded-2xl border border-neutral-100 bg-white">
                    <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-future-dusk-900 hover:text-very-peri-600 transition-colors">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 text-future-dusk-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-6 text-future-dusk-600">
                      {faq.answer}
                    </div>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              {lang === 'fr' ? 'Besoin d\'un accompagnement personnalisé ?' : 'Need personalized guidance?'}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {lang === 'fr'
                ? 'Nos experts PackshotCreator sont à votre disposition pour vous aider à optimiser votre workflow photo produit.'
                : 'Our PackshotCreator experts are available to help optimize your product photography workflow.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-very-peri-700 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              {lang === 'fr' ? 'Contactez-nous' : 'Contact us'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
