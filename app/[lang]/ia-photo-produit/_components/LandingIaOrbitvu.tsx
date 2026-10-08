import { getTranslations } from 'next-intl/server';
import Image, { getImageProps } from 'next/image';
import type { ComponentProps } from 'react';
import { ArrowRight, Camera, ScanText, Scale, ChevronDown } from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import { tx } from '@/lib/locale-text';

/**
 * Landing IA photo produit (refonte du 07/10/2026, deuxième passe du 08/10/2026) : le produit
 * est réellement photographié ; la page montre où l'IA d'Orbitvu Station intervient entre la
 * capture, le workflow et la diffusion. Faits produit relus le 08/10/2026 sur orbitvu.com
 * (voir JOURNAL). Texte : namespace `iaPhotoProduit` de messages/fr.json. Servie en FR
 * seulement (D42, étape 7) : voir page.tsx.
 *
 * Navigation : forme C de D44 (schéma du workflow avec liens vers les sections), sans
 * barre collante ; exception `landing-ia` / fr dans data/navigation/pages-longues.ts.
 *
 * Visuels : uniquement des images officielles Orbitvu déjà publiées sur le site (fiches
 * Alphashot XL G2 et Pro G2, article « migrer un ancien studio »). Aucun visuel IA généré,
 * aucune interface reconstituée ; sous 768 px, découpes de leur zone utile
 * (public/images/ia-photo-produit/). Les visuels manquants sont signalés par `VisuelRequis`,
 * rendu sur les Previews Vercel seulement.
 */

type Href = ComponentProps<typeof Link>['href'];

const fiche = (slug: string): Href => ({ pathname: '/studio-photo/[slug]', params: { slug } });
const article = (slug: string): Href => ({ pathname: '/blog/[slug]', params: { slug } });

type Fichier = { src: string; w: number; h: number };
/** `mobile` : découpe de la zone utile d'une capture d'interface, servie sous 768 px. */
type Visuel = Fichier & { mobile?: Fichier };

const VISUELS = {
  // Fiche Alphashot XL G2 (Sébastien, 07/07/2026) ; identique à orbitvu.com/products/alphashot-xl-g2.
  capture: {
    src: '/images/machines/alphashot-xl-g2/soft-station-capture.avif', w: 1400, h: 875,
    mobile: { src: '/images/ia-photo-produit/station-capture-sachet-mobile.avif', w: 720, h: 490 },
  },
  ocr: {
    src: '/images/machines/alphashot-xl-g2/soft-ai-ocr.avif', w: 1400, h: 945,
    mobile: { src: '/images/ia-photo-produit/station-ai-ocr-mobile.avif', w: 730, h: 675 },
  },
  // Article « Migrer un ancien studio PackshotCreator » (PR #36, 25/09/2026).
  photoAssistant: {
    src: '/images/blog/migrer-ancien-packshotcreator/orbitvu-station-assistant-eclairage-ia.avif', w: 1600, h: 1000,
    mobile: { src: '/images/ia-photo-produit/station-ai-templates-mobile.avif', w: 720, h: 560 },
  },
} satisfies Record<string, Visuel>;

const MACHINES_ASSISTANT = [
  { slug: 'alphashot-pro-g2', nom: 'Alphashot Pro G2', src: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { slug: 'alphashot-xl-g2', nom: 'Alphashot XL G2', src: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
];

/** Chaîne de production : briques PackshotCreator, étapes et ancre de la section qui les détaille. */
type Etape = { cle: string; ancre: string | null };

const PHASES: readonly { cle: string; etapes: readonly Etape[] }[] = [
  { cle: 'capture', etapes: [{ cle: 'e1', ancre: 'photo-assistant' }, { cle: 'e2', ancre: null }] },
  { cle: 'workflow', etapes: [{ cle: 'e3', ancre: null }] },
  { cle: 'ia', etapes: [{ cle: 'e4', ancre: 'masking' }, { cle: 'e5', ancre: 'retoucher' }, { cle: 'e6', ancre: 'ocr' }] },
  { cle: 'diffusion', etapes: [{ cle: 'e7', ancre: null }] },
];

/** Numéro d'ordre de chaque étape dans la chaîne (1 à 7). */
const NUMEROS: Record<string, number> = Object.fromEntries(
  PHASES.flatMap((p) => p.etapes).map((e, i) => [e.cle, i + 1]),
);

/** Les marqueurs de visuels manquants n'apparaissent que sur les Previews et en développement. */
const REVUE = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';

const CONTENEUR = 'max-w-7xl mx-auto px-4 sm:px-6';
const TITRE_2 = 'text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 leading-tight mb-5';
const PARAGRAPHE = 'text-lg text-future-dusk-600 leading-relaxed';

function Figure({ visuel, alt, legende, lienEntier, priorite = false, sizes }: {
  visuel: Visuel;
  alt: string;
  legende?: string;
  /** Libellé du lien vers la capture entière, affiché sous 768 px quand une version recadrée est servie. */
  lienEntier?: string;
  priorite?: boolean;
  sizes: string;
}) {
  const m = visuel.mobile;
  const chargement = priorite ? ({ fetchPriority: 'high', loading: 'eager' } as const) : ({ loading: 'lazy' } as const);
  let image;
  if (m) {
    // Direction artistique (getImageProps) : capture entière à partir de 768 px, zone utile en dessous.
    const commun = { alt, sizes, ...chargement };
    const { props: { srcSet: srcSetLarge } } = getImageProps({ ...commun, src: visuel.src, width: visuel.w, height: visuel.h });
    const { props: { srcSet: srcSetMobile, ...img } } = getImageProps({ ...commun, src: m.src, width: m.w, height: m.h });
    image = (
      <picture>
        <source media="(min-width: 768px)" srcSet={srcSetLarge} width={visuel.w} height={visuel.h} />
        <source media="(max-width: 767px)" srcSet={srcSetMobile} width={m.w} height={m.h} />
        <img {...img} alt={alt} className="block w-full h-auto" />
      </picture>
    );
  } else {
    image = <Image src={visuel.src} alt={alt} width={visuel.w} height={visuel.h} sizes={sizes} {...chargement} className="block w-full h-auto" />;
  }
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">{image}</div>
      {(legende || (m && lienEntier)) && (
        <figcaption className="mt-3 text-sm text-future-dusk-500 leading-relaxed">
          {legende}
          {m && lienEntier && (
            <a href={visuel.src} className="md:hidden block mt-1 text-very-peri-700 underline underline-offset-2">
              {lienEntier}
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** Emplacement d'un visuel réel à fournir (ASSET_REQUIRED) ; jamais rendu en production. */
function VisuelRequis({ texte }: { texte: string }) {
  if (!REVUE) return null;
  return (
    <div data-asset-required className="mt-6 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-mono font-semibold">ASSET_REQUIRED_REAL</p>
      <p className="mt-1">{texte}</p>
    </div>
  );
}

export default async function LandingIaOrbitvu({ lang }: { lang: string }) {
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'IA Photo Produit', 'AI Product Photography', 'KI-Produktfotografie'), url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  return (
    <>
      {/* A. Hero : le produit photographié d'abord. Sous 1 024 px : titre, capture, texte et CTA. */}
      <section className="bg-neutral-100">
        <div className={`${CONTENEUR} py-10 lg:py-24 grid lg:grid-cols-2 gap-x-16 gap-y-6 lg:items-center`}>
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-future-dusk-500 mb-4">{t('hero.surtitre')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.05] tracking-tight">
              {t('hero.title')}
            </h1>
          </div>
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <Figure
              visuel={VISUELS.capture}
              alt={t('hero.imageAlt')}
              legende={t('hero.legende')}
              priorite
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className={`${PARAGRAPHE} mb-6`}>{t('hero.p1')}</p>
            <Button asChild size="lg" className="w-full sm:w-auto h-auto min-h-14 py-3 whitespace-normal text-center bg-very-peri-600 hover:bg-very-peri-700 text-white px-8 text-base font-semibold rounded-xl">
              <Link href="/contact">{t('hero.cta')}</Link>
            </Button>
            <p className="mt-4 text-sm text-future-dusk-500">{t('hero.note')}</p>
          </div>
        </div>
      </section>

      {/* B. Chaîne de production : capture, workflow, IA, diffusion. Les pastilles nomment l'outil IA, ou son absence. */}
      <section id="workflow" className="py-16 lg:py-24 bg-white">
        <div className={CONTENEUR}>
          <div className="max-w-3xl mb-10">
            <h2 className={TITRE_2}>{t('workflow.heading')}</h2>
            <p className={PARAGRAPHE}>{t('workflow.intro')}</p>
          </div>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PHASES.map((phase) => (
              <li key={phase.cle} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-future-dusk-500 mb-4">{t(`workflow.phases.${phase.cle}`)}</p>
                <ol className="space-y-5">
                  {phase.etapes.map(({ cle, ancre }) => {
                    const outil = t(`workflow.${cle}.outil`);
                    const titre = `${NUMEROS[cle]}. ${t(`workflow.${cle}.titre`)}`;
                    return (
                      <li key={cle}>
                        <p className="font-heading font-semibold text-future-dusk-900">
                          {ancre ? <a href={`#${ancre}`} className="hover:text-very-peri-700 underline-offset-2 hover:underline">{titre}</a> : titre}
                        </p>
                        <p className="mt-1 text-sm text-future-dusk-600 leading-relaxed">{t(`workflow.${cle}.texte`)}</p>
                        {outil ? (
                          <span className="mt-2 inline-block rounded-full bg-very-peri-600 px-3 py-1 text-xs font-semibold text-white">IA · {outil}</span>
                        ) : (
                          <span className="mt-2 inline-block rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold text-future-dusk-500">{t('workflow.sansIa')}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C. AI Photo Assistant : avant le déclenchement */}
      <section id="photo-assistant" className="py-16 lg:py-24 bg-neutral-50">
        <div className={`${CONTENEUR} grid lg:grid-cols-12 gap-10 lg:gap-14 items-start`}>
          <div className="lg:col-span-5">
            <h2 className={TITRE_2}>{t('photoAssistant.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-8`}>{t('photoAssistant.p1')}</p>
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
            <Figure
              visuel={VISUELS.photoAssistant}
              alt={t('photoAssistant.imageAlt')}
              legende={t('photoAssistant.legende')}
              lienEntier={t('captureEntiere')}
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <VisuelRequis texte="Capture confirmée d'AI Photo Assistant, de préférence sur le sachet de café. La capture actuelle montre le panneau « AI Templates » : rattachement à AI Photo Assistant non établi." />
          </div>
        </div>
      </section>

      {/* D et E. Après la capture : détourage et retouche */}
      <section className="py-16 lg:py-24 bg-white">
        <div className={`${CONTENEUR} grid lg:grid-cols-2 gap-12 lg:gap-16`}>
          <div id="masking">
            <h2 className={TITRE_2}>{t('masking.heading')}</h2>
            <p className={PARAGRAPHE}>{t('masking.p1')}</p>
            <VisuelRequis texte="Avant/après AI Masking du même produit (idéalement le sachet de café), images réelles issues d'Orbitvu Station." />
          </div>
          <div id="retoucher">
            <h2 className={TITRE_2}>{t('retoucher.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-4`}>{t('retoucher.p1')}</p>
            <p className={PARAGRAPHE}>{t('retoucher.p2')}</p>
            <VisuelRequis texte="Avant/après AI Retoucher du même produit, images réelles issues d'Orbitvu Station." />
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
            <Figure
              visuel={VISUELS.ocr}
              alt={t('ocr.imageAlt')}
              legende={t('ocr.legende')}
              lienEntier={t('captureEntiere')}
              sizes="(max-width: 1024px) 100vw, 700px"
            />
          </div>
        </div>
      </section>

      {/* G. CTA final */}
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

      {/* H. FAQ */}
      <section id="faq" className="py-16 lg:py-24 bg-neutral-50">
        <div className={CONTENEUR}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className={TITRE_2}>{t('faq.heading')}</h2>
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

      {/* Liens de fin nommés : équipement, données produit, pilier AI Act */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className={CONTENEUR}>
          <FadeInView className="mb-10">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">{t('liens.heading')}</span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios' as const, href: '/studios-photo-automatises' as Href, icon: <Camera className="h-5 w-5" /> },
              { key: 'donnees' as const, href: article('alphashot-xl-g2-photo-mesures-donnees-produit'), icon: <ScanText className="h-5 w-5" /> },
              { key: 'aiAct' as const, href: article('ai-act-images-produit'), icon: <Scale className="h-5 w-5" /> },
            ].map((carte) => (
              <Link key={carte.key} href={carte.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-very-peri-600">{carte.icon}</span>
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-700 transition-colors">
                    {t(`liens.${carte.key}.title`)}
                  </h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-future-dusk-300 group-hover:text-very-peri-600 group-hover:translate-x-1 transition-all ml-auto" />
                </div>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`liens.${carte.key}.desc`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqItems)]} />

      {/* Ressources partagées des money pages, sans les trois articles retirés de cette page le 08/10/2026
          (vocabulaire « révolution », intention text-to-image) ; la table partagée reste inchangée. */}
      <MoneyPageResources
        slug="ia-photo-produit"
        lang={lang}
        exclure={['generer-images-produit-ia', 'ia-lumieres-virtuelles-revolution-packshot', 'comment-ia-revolutionne-production-visuelle']}
      />
    </>
  );
}
