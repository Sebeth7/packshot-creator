import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import {
  Sparkles, ArrowRight, Camera, Layout, GraduationCap, ChevronDown,
  Lightbulb, Scissors, Paintbrush, ScanText, Info,
} from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/hero';
import { FadeInView } from '@/components/animations';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import SommaireCollant from '@/components/navigation/SommaireCollant';
import { barreActive, LIBELLES_BARRE, type Langue } from '@/data/navigation/pages-longues';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import { tx } from '@/lib/locale-text';

/**
 * Landing IA photo produit reconstruite (07/10/2026) : capacités Orbitvu AI Toolkit
 * établies par le fresh-check orbitvu.com de Laurent du 07/10, repli A4 (aucun prix
 * d'abonnement, aucun cas client, aucun visuel dont la publication n'est pas établie,
 * aucun claim BlendAI). Texte : namespace `iaPhotoProduit` de messages/fr.json.
 *
 * Servie en FR seulement pour l'instant : EN et de-ch gardent l'ancienne page jusqu'à la
 * traduction depuis la version FR validée (D42, étape 7). Voir page.tsx.
 */

type Href = ComponentProps<typeof Link>['href'];

const fiche = (slug: string): Href => ({ pathname: '/studio-photo/[slug]', params: { slug } });
const secteur = (slug: string): Href => ({ pathname: '/industrie/[slug]', params: { slug } });
const article = (slug: string): Href => ({ pathname: '/blog/[slug]', params: { slug } });
const guide = (slug: string): Href => ({ pathname: '/guide/[slug]', params: { slug } });

/** Ancre de la section 1, cible permanente du CTA secondaire du hero. */
const ANCRE_FONCTIONS = 'fonctions-ia-orbitvu';

const ETAPES = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const;

// Visuels du catalogue déjà publiés sur les fiches (lib/machine-images.ts) ; aucun visuel de
// résultat IA tant qu'IA-2 n'établit pas leur droit de publication.
const MACHINES_ASSISTANT = [
  { slug: 'alphashot-pro-g2', nom: 'Alphashot Pro G2', src: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { slug: 'alphashot-xl-g2', nom: 'Alphashot XL G2', src: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
];

const lien = (href: Href) => function LienTexte(chunks: ReactNode) {
  return (
    <Link href={href} className="text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700">
      {chunks}
    </Link>
  );
};

function Titre2({ children }: { children: string }) {
  return (
    <h2 className="text-3xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
      {children}
    </h2>
  );
}

const PARAGRAPHE = 'text-lg text-future-dusk-600 leading-relaxed';

export default async function LandingIaOrbitvu({ lang }: { lang: string }) {
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });
  const gras = (chunks: ReactNode) => <strong className="text-amber-300 font-semibold">{chunks}</strong>;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'IA Photo Produit', 'AI Product Photography', 'KI-Produktfotografie'), url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  const faqItems = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  // Barre de sommaire collante (D44) : libellés = titres H2 de la page. Les id ne sont
  // posés que si la barre est active, sauf celui de la section 1 (cible du hero).
  const barre = barreActive('landing-ia', lang as Langue, 'ia-photo-produit');
  const ancre = (id: string) => (barre ? id : undefined);
  const entreesSommaire = barre
    ? [
        { id: ANCRE_FONCTIONS, libelle: t('toolkit.heading') },
        { id: 'prise-de-vue', libelle: t('priseDeVue.heading') },
        { id: 'post-production', libelle: t('postProduction.heading') },
        { id: 'donnees-produit', libelle: t('donnees.heading') },
        { id: 'ia-generative', libelle: t('generatif.heading') },
        { id: 'on-model', libelle: t('onModel.heading') },
        { id: 'conditions', libelle: t('conditions.heading') },
        { id: 'faq', libelle: t('faq.heading') },
      ]
    : [];

  return (
    <>
      {barre && (
        <SommaireCollant
          titre={LIBELLES_BARRE[lang as Langue].titre}
          libelle={LIBELLES_BARRE[lang as Langue].libelle}
          entrees={entreesSommaire}
        />
      )}

      {/* 0. Hero */}
      <HeroSection
        layout="centered"
        align="left"
        badge={{
          icon: <Sparkles className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-very-peri-500/20 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t.rich('hero.subtitle', { bold: gras })}
      >
        <div className="mt-10 flex flex-col sm:flex-row gap-4 mb-2">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white px-8 h-14 text-base font-semibold rounded-xl shadow-lg shadow-very-peri-500/25">
            <Link href="/contact">{t('hero.ctaPrimary')}</Link>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-14 text-base rounded-xl">
            <a href={`#${ANCRE_FONCTIONS}`}>
              {t('hero.ctaSecondary')} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <p className="text-sm text-future-dusk-300">{t('hero.note')}</p>
      </HeroSection>

      {/* 1. Orbitvu AI Toolkit et workflow */}
      <section id={ANCRE_FONCTIONS} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Titre2>{t('toolkit.heading')}</Titre2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('toolkit.p1')}</p>
            <p className={PARAGRAPHE}>{t.rich('toolkit.p2', { studios: lien('/studios-photo-automatises') })}</p>
          </div>

          <h3 className="mt-14 mb-6 text-xl lg:text-2xl font-heading font-bold text-future-dusk-900">
            {t('workflow.heading')}
          </h3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((etape, i) => (
              <li key={etape} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-very-peri-100 text-sm font-bold text-very-peri-700">
                  {i + 1}
                </span>
                <p className="mt-3 font-heading font-semibold text-future-dusk-900">{t(`workflow.${etape}.title`)}</p>
                <p className="mt-1 text-sm text-future-dusk-500 leading-relaxed">{t(`workflow.${etape}.text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2 (A). Prise de vue : AI Photo Assistant */}
      <section id={ancre('prise-de-vue')} className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-very-peri-100 text-very-peri-700 mb-5">
              <Lightbulb className="h-5 w-5" />
            </span>
            <Titre2>{t('priseDeVue.heading')}</Titre2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('priseDeVue.p1')}</p>
            <p className={`${PARAGRAPHE} mb-4`}>{t('priseDeVue.p2')}</p>
            <p className={PARAGRAPHE}>
              {t.rich('priseDeVue.p3', { proG2: lien(fiche('alphashot-pro-g2')), xlG2: lien(fiche('alphashot-xl-g2')) })}
            </p>
          </div>
          <ul className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {MACHINES_ASSISTANT.map((m) => (
              <li key={m.slug}>
                <Link href={fiche(m.slug)} className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <span className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <Image src={m.src} alt={m.nom} width={m.w} height={m.h} sizes="96px" className="h-full w-full object-contain" loading="lazy" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading font-semibold text-future-dusk-900">{m.nom}</span>
                    <span className="mt-1 inline-flex items-center text-sm text-very-peri-600">
                      {t('priseDeVue.carteLien')} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 (B). Post-production : AI Masking et AI Retoucher */}
      <section id={ancre('post-production')} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Titre2>{t('postProduction.heading')}</Titre2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="rounded-2xl border border-neutral-200 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 flex-shrink-0">
                  <Scissors className="h-5 w-5" />
                </span>
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-future-dusk-900">{t('postProduction.masking.title')}</h3>
              </div>
              <p className={`${PARAGRAPHE} mb-4`}>{t('postProduction.masking.p1')}</p>
              <p className={PARAGRAPHE}>
                {t.rich('postProduction.masking.p2', { guideFondBlanc: lien(guide('comment-obtenir-fond-blanc-parfait-sans-detourage-produit')) })}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 flex-shrink-0">
                  <Paintbrush className="h-5 w-5" />
                </span>
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-future-dusk-900">{t('postProduction.retoucher.title')}</h3>
              </div>
              <p className={`${PARAGRAPHE} mb-4`}>{t('postProduction.retoucher.p1')}</p>
              <p className={`${PARAGRAPHE} mb-4`}>
                {t.rich('postProduction.retoucher.p2', { hubBijoux: lien(secteur('bijoux-joaillerie')) })}
              </p>
              <p className={PARAGRAPHE}>{t('postProduction.retoucher.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 (C). Données produit : AI OCR */}
      <section id={ancre('donnees-produit')} className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-very-peri-100 text-very-peri-700 mb-5">
              <ScanText className="h-5 w-5" />
            </span>
            <Titre2>{t('donnees.heading')}</Titre2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('donnees.p1')}</p>
            <p className={PARAGRAPHE}>
              {t.rich('donnees.p2', {
                hubVin: lien(secteur('vin-spiritueux')),
                articleXl: lien(article('alphashot-xl-g2-photo-mesures-donnees-produit')),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* 5 (D). Ce qui est génératif aujourd'hui */}
      <section id={ancre('ia-generative')} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Titre2>{t('generatif.heading')}</Titre2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('generatif.p1')}</p>
            <p className={`${PARAGRAPHE} mb-4`}>{t('generatif.p2')}</p>
            <p className={PARAGRAPHE}>
              {t.rich('generatif.p3', {
                article: lien(article('generer-images-produit-ia')),
                aiAct: lien(article('ai-act-images-produit')),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* 6 (E). Annoncé par Orbitvu : On-model */}
      <section id={ancre('on-model')} className="pb-16 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 mb-4">{t('onModel.heading')}</h2>
            <p className={PARAGRAPHE}>{t('onModel.p1')}</p>
          </div>
        </div>
      </section>

      {/* 7. Conditions et essai */}
      <section id={ancre('conditions')} className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Titre2>{t('conditions.heading')}</Titre2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('conditions.p1')}</p>
            <p className={`${PARAGRAPHE} mb-4`}>{t('conditions.p2')}</p>
            <p className={`${PARAGRAPHE} mb-6`}>{t('conditions.p3')}</p>
            <p className="flex items-start gap-2 text-sm text-future-dusk-400">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              {t('conditions.source')}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Démonstration */}
      <section className="py-16 lg:py-24 bg-future-dusk-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold leading-[1.1] mb-6">{t('demo.heading')}</h2>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8">{t('demo.p1')}</p>
            <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white px-8 h-14 text-base font-semibold rounded-xl shadow-lg shadow-very-peri-500/25">
              <Link href="/contact">{t('demo.cta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id={ancre('faq')} className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">FAQ</span>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('faq.heading')}
              </h2>
              <p className="text-future-dusk-500 leading-relaxed">{t('faq.intro')}</p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                  <summary className="flex items-center justify-between gap-4 p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-heading font-semibold text-future-dusk-900 text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                      {faq.question}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                    <p className="text-future-dusk-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liens de fin : les trois cartes existantes, descriptions sans chiffre non sourcé */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">
              {t('liens.heading')}
            </span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios' as const, href: '/studios-photo-automatises' as const, icon: <Camera className="h-5 w-5" /> },
              { key: 'industrie' as const, href: '/industrie' as const, icon: <Layout className="h-5 w-5" /> },
              { key: 'academy' as const, href: '/academy' as const, icon: <GraduationCap className="h-5 w-5" /> },
            ].map((carte) => (
              <Link key={carte.key} href={carte.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-very-peri-500">{carte.icon}</span>
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                    {t(`liens.${carte.key}.title`)}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" />
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
