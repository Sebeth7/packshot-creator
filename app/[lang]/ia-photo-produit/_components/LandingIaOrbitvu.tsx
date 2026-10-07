import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, Camera, Layout, GraduationCap, ChevronDown } from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import { tx } from '@/lib/locale-text';

/**
 * Landing IA photo produit (refonte du 07/10/2026) : le produit est réellement photographié,
 * l'IA d'Orbitvu Station intervient avant et après la capture. Faits produit relus le
 * 07/10/2026 sur orbitvu.com (voir JOURNAL). Texte : namespace `iaPhotoProduit` de
 * messages/fr.json. Servie en FR seulement (D42, étape 7) : voir page.tsx.
 *
 * Navigation : forme C de D44 (schéma du workflow avec liens vers les sections), sans
 * barre collante ; exception `landing-ia` / fr dans data/navigation/pages-longues.ts.
 *
 * Visuels : uniquement des images réelles déjà publiées sur le site (fiches Alphashot
 * XL G2 et Pro G2, article « migrer un ancien studio »). Aucun visuel IA généré, aucune
 * interface reconstituée.
 */

type Href = ComponentProps<typeof Link>['href'];

const fiche = (slug: string): Href => ({ pathname: '/studio-photo/[slug]', params: { slug } });
const article = (slug: string): Href => ({ pathname: '/blog/[slug]', params: { slug } });
const guide = (slug: string): Href => ({ pathname: '/guide/[slug]', params: { slug } });

type Visuel = { src: string; w: number; h: number };

const VISUELS = {
  // Fiche Alphashot XL G2 (publiée par Sébastien le 07/07/2026).
  hero: { src: '/images/machines/alphashot-xl-g2/packshot-operator.avif', w: 880, h: 586 },
  capture: { src: '/images/machines/alphashot-xl-g2/soft-station-capture.avif', w: 1400, h: 875 },
  ocr: { src: '/images/machines/alphashot-xl-g2/soft-ai-ocr.avif', w: 1400, h: 945 },
  // Article « Migrer un ancien studio PackshotCreator » (PR #36, 25/09/2026).
  photoAssistant: { src: '/images/blog/migrer-ancien-packshotcreator/orbitvu-station-assistant-eclairage-ia.avif', w: 1600, h: 1000 },
} satisfies Record<string, Visuel>;

const MACHINES_ASSISTANT = [
  { slug: 'alphashot-pro-g2', nom: 'Alphashot Pro G2', src: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { slug: 'alphashot-xl-g2', nom: 'Alphashot XL G2', src: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
];

/** Étapes du workflow : ancre de la section qui les détaille, si elle existe. */
const ETAPES = [
  { cle: 's1', ancre: 'photo-assistant' },
  { cle: 's2', ancre: null },
  { cle: 's3', ancre: 'masking' },
  { cle: 's4', ancre: 'retoucher' },
  { cle: 's5', ancre: 'ocr' },
  { cle: 's6', ancre: null },
] as const;

const lien = (href: Href) => function LienTexte(chunks: ReactNode) {
  return (
    <Link href={href} className="text-very-peri-700 underline underline-offset-2 hover:text-very-peri-800">
      {chunks}
    </Link>
  );
};

const CONTENEUR = 'max-w-7xl mx-auto px-4 sm:px-6';
const TITRE_2 = 'text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 leading-tight mb-5';
const PARAGRAPHE = 'text-lg text-future-dusk-600 leading-relaxed';

function Figure({ visuel, alt, legende, priorite = false, sizes }: {
  visuel: Visuel;
  alt: string;
  legende?: string;
  priorite?: boolean;
  sizes: string;
}) {
  return (
    <figure>
      <Image
        src={visuel.src}
        alt={alt}
        width={visuel.w}
        height={visuel.h}
        sizes={sizes}
        priority={priorite}
        loading={priorite ? undefined : 'lazy'}
        className="w-full h-auto rounded-2xl border border-neutral-200 bg-white"
      />
      {legende && <figcaption className="mt-3 text-sm text-future-dusk-500 leading-relaxed">{legende}</figcaption>}
    </figure>
  );
}

export default async function LandingIaOrbitvu({ lang }: { lang: string }) {
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'IA Photo Produit', 'AI Product Photography', 'KI-Produktfotografie'), url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  return (
    <>
      {/* A. Hero : le produit photographié d'abord */}
      <section className="bg-neutral-100">
        <div className={`${CONTENEUR} py-14 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-future-dusk-500 mb-5">{t('hero.surtitre')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.05] tracking-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className={`${PARAGRAPHE} mb-3`}>{t('hero.p1')}</p>
            <p className={`${PARAGRAPHE} mb-8`}>{t('hero.p2')}</p>
            <Button asChild size="lg" className="w-full sm:w-auto h-auto min-h-14 py-3 whitespace-normal text-center bg-very-peri-600 hover:bg-very-peri-700 text-white px-8 text-base font-semibold rounded-xl">
              <Link href="/contact">{t('hero.cta')}</Link>
            </Button>
            <p className="mt-4 text-sm text-future-dusk-500">{t('hero.note')}</p>
          </div>
          <Figure visuel={VISUELS.hero} alt={t('hero.imageAlt')} priorite sizes="(max-width: 1024px) 100vw, 600px" />
        </div>
      </section>

      {/* B. Workflow : où l'IA intervient, et où elle n'intervient pas */}
      <section id="workflow" className="py-16 lg:py-24 bg-white">
        <div className={CONTENEUR}>
          <div className="max-w-3xl mb-10">
            <h2 className={TITRE_2}>{t('workflow.heading')}</h2>
            <p className={PARAGRAPHE}>{t('workflow.intro')}</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-sm text-future-dusk-500" aria-hidden="true">
                <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-very-peri-600" />{t('workflow.legendeIa')}</li>
                <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-neutral-400" />{t('workflow.legendeSans')}</li>
              </ul>
              <ol className="relative border-l-2 border-neutral-200 ml-3">
                {ETAPES.map(({ cle, ancre }, i) => {
                  const outil = t(`workflow.${cle}.outil`);
                  const titre = `${i + 1}. ${t(`workflow.${cle}.titre`)}`;
                  return (
                    <li key={cle} className="relative pl-7 pb-7 last:pb-0">
                      <span
                        className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ${outil ? 'bg-very-peri-600' : 'bg-white border-2 border-neutral-400'}`}
                        aria-hidden="true"
                      />
                      <p className="font-heading font-semibold text-future-dusk-900">
                        {ancre ? <a href={`#${ancre}`} className="hover:text-very-peri-700 hover:underline underline-offset-2">{titre}</a> : titre}
                      </p>
                      <p className="mt-1 text-future-dusk-600 leading-relaxed">{t(`workflow.${cle}.texte`)}</p>
                      {outil && (
                        <span className="mt-2 inline-block rounded-full bg-very-peri-50 px-3 py-1 text-xs font-semibold text-very-peri-700">
                          IA · {outil}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="lg:col-span-7">
              <Figure visuel={VISUELS.capture} alt={t('workflow.imageAlt')} legende={t('workflow.legende')} sizes="(max-width: 1024px) 100vw, 700px" />
            </div>
          </div>
        </div>
      </section>

      {/* C. AI Photo Assistant : avant la photo */}
      <section id="photo-assistant" className="py-16 lg:py-24 bg-neutral-50">
        <div className={`${CONTENEUR} grid lg:grid-cols-12 gap-10 lg:gap-14 items-start`}>
          <div className="lg:col-span-5">
            <h2 className={TITRE_2}>{t('photoAssistant.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('photoAssistant.p1')}</p>
            <p className={`${PARAGRAPHE} mb-8`}>{t('photoAssistant.p2')}</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-future-dusk-500 mb-3">{t('photoAssistant.compatibles')}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MACHINES_ASSISTANT.map((m) => (
                <li key={m.slug}>
                  <Link href={fiche(m.slug)} className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 hover:border-very-peri-300 transition-colors">
                    <span className="relative h-14 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image src={m.src} alt={m.nom} width={m.w} height={m.h} sizes="64px" className="h-full w-full object-contain" loading="lazy" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading font-semibold text-future-dusk-900">{m.nom}</span>
                      <span className="inline-flex items-center text-sm text-very-peri-700">
                        {t('photoAssistant.carteLien')} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Figure visuel={VISUELS.photoAssistant} alt={t('photoAssistant.imageAlt')} legende={t('photoAssistant.legende')} sizes="(max-width: 1024px) 100vw, 700px" />
          </div>
        </div>
      </section>

      {/* D et E. Après la capture : détourage et retouche */}
      <section className="py-16 lg:py-24 bg-white">
        <div className={`${CONTENEUR} grid lg:grid-cols-2 gap-12 lg:gap-16`}>
          <div id="masking">
            <h2 className={TITRE_2}>{t('masking.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('masking.p1')}</p>
            <p className={PARAGRAPHE}>
              {t.rich('masking.p2', { guideFondBlanc: lien(guide('comment-obtenir-fond-blanc-parfait-sans-detourage-produit')) })}
            </p>
          </div>
          <div id="retoucher">
            <h2 className={TITRE_2}>{t('retoucher.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('retoucher.p1')}</p>
            <p className={PARAGRAPHE}>{t('retoucher.p2')}</p>
          </div>
        </div>
      </section>

      {/* F. AI OCR : le même produit, ses données */}
      <section id="ocr" className="py-16 lg:py-24 bg-neutral-50">
        <div className={`${CONTENEUR} grid lg:grid-cols-12 gap-10 lg:gap-14 items-center`}>
          <div className="lg:col-span-5 lg:order-2">
            <h2 className={TITRE_2}>{t('ocr.heading')}</h2>
            <p className={PARAGRAPHE}>{t('ocr.p1')}</p>
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <Figure visuel={VISUELS.ocr} alt={t('ocr.imageAlt')} legende={t('ocr.legende')} sizes="(max-width: 1024px) 100vw, 700px" />
          </div>
        </div>
      </section>

      {/* G. Encart génératif */}
      <section className="py-14 lg:py-20 bg-white">
        <div className={CONTENEUR}>
          <div className="max-w-3xl rounded-2xl border border-neutral-200 p-6 lg:p-8">
            <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">{t('generatif.heading')}</h2>
            <p className="text-future-dusk-600 leading-relaxed mb-3">{t('generatif.p1')}</p>
            <p className="text-future-dusk-600 leading-relaxed mb-3">{t('generatif.p2')}</p>
            <p className="text-future-dusk-600 leading-relaxed">
              {t.rich('generatif.p3', { aiAct: lien(article('ai-act-images-produit')) })}
            </p>
          </div>
        </div>
      </section>

      {/* H. CTA final */}
      <section className="py-16 lg:py-24 bg-future-dusk-900 text-white">
        <div className={CONTENEUR}>
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold leading-tight mb-6">{t('demo.heading')}</h2>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-3">{t('demo.p1')}</p>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8">{t('demo.p2')}</p>
            <Button asChild size="lg" className="w-full sm:w-auto h-auto min-h-14 py-3 whitespace-normal text-center bg-white text-future-dusk-900 hover:bg-neutral-100 px-8 text-base font-semibold rounded-xl">
              <Link href="/contact">{t('demo.cta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* I. FAQ */}
      <section id="faq" className="py-16 lg:py-24 bg-neutral-50">
        <div className={CONTENEUR}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className={TITRE_2}>{t('faq.heading')}</h2>
              <p className="text-sm text-future-dusk-500 leading-relaxed">{t('faq.source')}</p>
            </div>
            <div className="lg:col-span-8 space-y-3">
              {faqItems.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:border-very-peri-200">
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-heading font-semibold text-future-dusk-900 text-left leading-snug">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1">
                    <p className="text-future-dusk-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liens de fin existants */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className={CONTENEUR}>
          <FadeInView className="mb-10">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">{t('liens.heading')}</span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios' as const, href: '/studios-photo-automatises' as const, icon: <Camera className="h-5 w-5" /> },
              { key: 'industrie' as const, href: '/industrie' as const, icon: <Layout className="h-5 w-5" /> },
              { key: 'academy' as const, href: '/academy' as const, icon: <GraduationCap className="h-5 w-5" /> },
            ].map((carte) => (
              <Link key={carte.key} href={carte.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-very-peri-600">{carte.icon}</span>
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-700 transition-colors">
                    {t(`liens.${carte.key}.title`)}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-600 group-hover:translate-x-1 transition-all ml-auto" />
                </div>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`liens.${carte.key}.desc`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqItems)]} />

      <MoneyPageResources slug="ia-photo-produit" lang={lang} />
    </>
  );
}
