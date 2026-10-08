import { getTranslations } from 'next-intl/server';
import Image, { getImageProps } from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import {
  ArrowDown, ArrowRight, Brush, Camera, ChevronDown, Images, Lightbulb, Scale, ScanText, Scissors,
} from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import { tx } from '@/lib/locale-text';

/**
 * Landing IA photo produit (refonte du 07/10/2026 ; deuxième passe, verdict lexical et refonte
 * visuelle du 08/10/2026). Récit : produit réel → capture → action de l'IA → résultat → usage.
 * Chaque fonction IA répond à quatre questions (entrée, ce que fait l'IA, résultat, utilité).
 * Faits produit relus le 08/10/2026 sur orbitvu.com (voir JOURNAL). Texte : namespace
 * `iaPhotoProduit` de messages/fr.json. Servie en FR seulement (D42, étape 7) : voir page.tsx.
 *
 * Navigation : forme C de D44 (schéma du workflow avec liens vers les sections), sans
 * barre collante ; exception `landing-ia` / fr dans data/navigation/pages-longues.ts.
 *
 * Visuels, deux statuts à ne jamais confondre :
 * - preuves réelles : images officielles Orbitvu déjà publiées sur le site (fiche Alphashot
 *   XL G2) et leurs découpes (public/images/ia-photo-produit/station-*, recadrage seul) ;
 * - illustrations éditoriales V105-E1 à E4 (public/images/ia-photo-produit/v105-*) : générées
 *   par ChatGPT (pack de Laurent du 08/10/2026), produit et personne fictifs, légendées
 *   « Illustration générée par IA ». Elles ne prouvent aucun résultat Orbitvu.
 * Aucune interface reconstituée, aucun avant/après fabriqué : les preuves manquantes sont
 * signalées par `VisuelRequis` et `AvantApres`, rendus sur les Previews Vercel seulement.
 */

type Href = ComponentProps<typeof Link>['href'];

const fiche = (slug: string): Href => ({ pathname: '/studio-photo/[slug]', params: { slug } });
const article = (slug: string): Href => ({ pathname: '/blog/[slug]', params: { slug } });

type Fichier = { src: string; w: number; h: number };
/** `mobile` : autre découpe du même visuel, servie sous 768 px. */
type Visuel = Fichier & { mobile?: Fichier };

const VISUELS = {
  // Illustrations éditoriales V105 (EDITORIAL_ILLUSTRATION, ChatGPT, 08/10/2026), dimensions natives.
  hero: {
    src: '/images/ia-photo-produit/v105-e1-hero-workflow.avif', w: 830, h: 467,
    mobile: { src: '/images/ia-photo-produit/v105-e1-hero-workflow-mobile.avif', w: 540, h: 467 },
  },
  controle: { src: '/images/ia-photo-produit/v105-e2-controle-operateur.avif', w: 591, h: 394 },
  usages: { src: '/images/ia-photo-produit/v105-e3-produit-usages.avif', w: 693, h: 462 },
  retoucheContexte: { src: '/images/ia-photo-produit/v105-e4-retouche-contexte.avif', w: 693, h: 462 },
  // Capture Orbitvu Station de la fiche Alphashot XL G2 (Sébastien, 07/07/2026), identique à
  // orbitvu.com/products/alphashot-xl-g2/images/station.webp ; sous 768 px, le sachet dans le cadre de visée.
  capture: {
    src: '/images/machines/alphashot-xl-g2/soft-station-capture.avif', w: 1400, h: 875,
    mobile: { src: '/images/ia-photo-produit/station-capture-sachet-mobile.avif', w: 720, h: 490 },
  },
  // Découpes du visuel AI OCR de la même fiche (identique à …/closer-look/etykieta-2-v2.webp).
  ocrEtiquette: { src: '/images/ia-photo-produit/station-ai-ocr-etiquette.avif', w: 680, h: 820 },
  ocrChamps: { src: '/images/ia-photo-produit/station-ai-ocr-champs.avif', w: 615, h: 830 },
  ocrEntier: { src: '/images/machines/alphashot-xl-g2/soft-ai-ocr.avif', w: 1400, h: 945 },
} satisfies Record<string, Visuel>;

const MACHINES_ASSISTANT = [
  { slug: 'alphashot-pro-g2', nom: 'Alphashot Pro G2', src: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { slug: 'alphashot-xl-g2', nom: 'Alphashot XL G2', src: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
];

/** Actions de l'IA résumées dans le hero, avec l'ancre de la section qui les détaille. */
const ACTIONS_HERO = [
  { cle: 'eclairage', ancre: 'photo-assistant', icone: Lightbulb },
  { cle: 'detourage', ancre: 'masking', icone: Scissors },
  { cle: 'retouche', ancre: 'retoucher', icone: Brush },
  { cle: 'lecture', ancre: 'ocr', icone: ScanText },
] as const;

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
const TITRE_2 = 'text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 leading-tight mb-4';
const PARAGRAPHE = 'text-lg text-future-dusk-600 leading-relaxed';

function Figure({ visuel, alt, legende, lienEntier, priorite = false, sizes, cadre = true }: {
  visuel: Visuel;
  alt: string;
  legende?: string;
  /** Lien vers le visuel entier, affiché sous 768 px. */
  lienEntier?: { href: string; libelle: string };
  priorite?: boolean;
  sizes: string;
  cadre?: boolean;
}) {
  const m = visuel.mobile;
  const chargement = priorite ? ({ fetchPriority: 'high', loading: 'eager' } as const) : ({ loading: 'lazy' } as const);
  let image;
  if (m) {
    // Direction artistique (getImageProps) : une découpe à partir de 768 px, une autre en dessous.
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
      <div className={cadre ? 'overflow-hidden rounded-2xl border border-neutral-200 bg-white' : 'overflow-hidden rounded-xl'}>{image}</div>
      {(legende || lienEntier) && (
        <figcaption className="mt-2 text-sm text-future-dusk-500 leading-relaxed">
          {legende}
          {lienEntier && (
            <a href={lienEntier.href} className="md:hidden block mt-1 text-very-peri-700 underline underline-offset-2">
              {lienEntier.libelle}
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

/**
 * Emplacement d'un avant/après réel (même produit, même cadrage). Sans visuels fournis, rien n'est
 * rendu en production ; sur les Previews, deux cadres vides signalent la preuve attendue.
 */
function AvantApres({ texte }: { texte: string }) {
  if (!REVUE) return null;
  return (
    <div data-asset-required className="mt-6 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="grid grid-cols-2 gap-3" aria-hidden="true">
        {['Avant', 'Après'].map((l) => (
          <div key={l} className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-amber-400 bg-white/60 font-mono text-xs">
            {l}
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono font-semibold">ASSET_REQUIRED_REAL</p>
      <p className="mt-1">{texte}</p>
    </div>
  );
}

/**
 * Déroulé d'une fonction IA en quatre temps : entrée, action de l'IA, résultat, utilité.
 * `ligne` : horizontal à partir de 1 024 px ; sinon toujours vertical.
 */
function Deroule({ libelles, items, ligne = false }: {
  libelles: { entree: string; action: string; resultat: string; utilite: string };
  items: { entree: string; action: string; resultat: string; utilite: string };
  ligne?: boolean;
}) {
  const ordre = ['entree', 'action', 'resultat', 'utilite'] as const;
  return (
    <ol className={`flex flex-col gap-2 ${ligne ? 'lg:flex-row lg:items-stretch' : ''}`}>
      {ordre.map((cle, i) => {
        const ia = cle === 'action';
        return (
          <li key={cle} className={`flex flex-col ${ligne ? 'lg:flex-row lg:flex-1 lg:items-center' : ''} gap-2`}>
            <div className={`flex-1 rounded-xl border p-4 ${ia ? 'border-very-peri-300 bg-very-peri-50' : 'border-neutral-200 bg-white'}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${ia ? 'text-very-peri-700' : 'text-future-dusk-500'}`}>
                {libelles[cle]}
              </p>
              <p className="mt-1 text-future-dusk-800 leading-snug">{items[cle]}</p>
            </div>
            {i < ordre.length - 1 && (
              <span className="flex justify-center text-future-dusk-300" aria-hidden="true">
                <ArrowDown className={`h-4 w-4 ${ligne ? 'lg:hidden' : ''}`} />
                {ligne && <ArrowRight className="hidden h-4 w-4 lg:block" />}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Section({ id, fond, children }: { id?: string; fond: 'blanc' | 'gris'; children: ReactNode }) {
  return (
    <section id={id} className={`py-16 lg:py-24 ${fond === 'gris' ? 'bg-neutral-50' : 'bg-white'}`}>
      {children}
    </section>
  );
}

export default async function LandingIaOrbitvu({ lang }: { lang: string }) {
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'IA Photo Produit', 'AI Product Photography', 'KI-Produktfotografie'), url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  const libelles = {
    entree: t('deroule.entree'),
    action: t('deroule.action'),
    resultat: t('deroule.resultat'),
    utilite: t('deroule.utilite'),
  };
  const items = (ns: string) => ({
    entree: t(`${ns}.entree`),
    action: t(`${ns}.action`),
    resultat: t(`${ns}.resultat`),
    utilite: t(`${ns}.utilite`),
  });

  return (
    <>
      {/* 1. Hero : illustration du workflow (E1), puis les actions de l'IA et le résultat.
          Sous 1 024 px : titre, texte et CTA, puis illustration. */}
      <section className="bg-neutral-100">
        <div className={`${CONTENEUR} py-10 lg:py-20 grid lg:grid-cols-2 gap-x-14 gap-y-6 lg:items-center`}>
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-future-dusk-500 mb-4">{t('hero.surtitre')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.05] tracking-tight">
              {t('hero.title')}
            </h1>
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className={`${PARAGRAPHE} mb-6`}>{t('hero.p1')}</p>
            <Button asChild size="lg" className="w-full sm:w-auto h-auto min-h-14 py-3 whitespace-normal text-center bg-very-peri-600 hover:bg-very-peri-700 text-white px-8 text-base font-semibold rounded-xl">
              <Link href="/contact">{t('hero.cta')}</Link>
            </Button>
            <p className="mt-4 text-sm text-future-dusk-500">{t('hero.note')}</p>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full max-w-[600px] lg:justify-self-end">
            <div className="rounded-3xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-sm">
              <Figure visuel={VISUELS.hero} alt={t('hero.imageAlt')} legende={t('hero.legende')} priorite sizes="(max-width: 767px) 100vw, 600px" cadre={false} />
              <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-very-peri-700">{t('hero.etapeIa')}</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ACTIONS_HERO.map(({ cle, ancre, icone: Icone }) => (
                  <li key={cle}>
                    <a href={`#${ancre}`} className="flex h-full items-center gap-2 rounded-xl border border-very-peri-200 bg-very-peri-50 px-3 py-2 text-sm font-semibold text-very-peri-800 hover:border-very-peri-400">
                      <Icone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {t(`hero.actions.${cle}`)}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 flex items-start gap-2 rounded-xl bg-future-dusk-900 px-3 py-2.5 text-sm font-semibold text-white">
                <Images className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {t('hero.etapeResultat')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chaîne de production : capture, workflow, IA, diffusion. Les pastilles nomment l'outil IA, ou son absence. */}
      <Section id="workflow" fond="blanc">
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
          <div className="mt-10 max-w-3xl">
            <Figure visuel={VISUELS.capture} alt={t('workflow.captureAlt')} legende={t('workflow.captureLegende')} sizes="(max-width: 1024px) 100vw, 768px" />
          </div>
        </div>
      </Section>

      {/* Respiration : l'IA assiste, l'opérateur contrôle (illustration E2) */}
      <section className="py-14 lg:py-20 bg-neutral-100">
        <div className={`${CONTENEUR} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className="w-full max-w-[591px]">
            <Figure visuel={VISUELS.controle} alt={t('controle.imageAlt')} legende={t('controle.legende')} sizes="(max-width: 767px) 100vw, 591px" />
          </div>
          <div className="max-w-xl">
            <p className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 leading-snug">{t('controle.accroche')}</p>
            <p className={`${PARAGRAPHE} mt-4`}>{t('controle.texte')}</p>
          </div>
        </div>
      </section>

      {/* 2. AI Photo Assistant : avant le déclenchement */}
      <Section id="photo-assistant" fond="gris">
        <div className={CONTENEUR}>
          <div className="max-w-3xl mb-8">
            <h2 className={TITRE_2}>{t('photoAssistant.heading')}</h2>
            <p className={PARAGRAPHE}>{t('photoAssistant.lead')}</p>
          </div>
          <Deroule libelles={libelles} items={items('photoAssistant')} ligne />
          <div className="mt-8 max-w-2xl">
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
          <VisuelRequis texte="Capture réelle d'AI Photo Assistant proposant plusieurs configurations d'éclairage, de préférence sur le sachet de café. La capture « AI Templates » n'est plus utilisée : son rattachement à AI Photo Assistant n'est pas établi." />
        </div>
      </Section>

      {/* 3 et 4. Après la capture : détourage et retouche */}
      <Section fond="blanc">
        <div className={`${CONTENEUR} grid lg:grid-cols-2 gap-14 lg:gap-16`}>
          <div id="masking">
            <h2 className={TITRE_2}>{t('masking.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-6`}>{t('masking.lead')}</p>
            <Deroule libelles={libelles} items={items('masking')} />
            <AvantApres texte="Avant/après AI Masking du même produit (idéalement le sachet de café), même cadrage, images réelles issues d'Orbitvu Station. Un visuel IQ Mask ne convient pas." />
          </div>
          <div id="retoucher">
            <h2 className={TITRE_2}>{t('retoucher.heading')}</h2>
            <p className={`${PARAGRAPHE} mb-6`}>{t('retoucher.lead')}</p>
            <div className="mb-6 max-w-[693px]">
              <Figure visuel={VISUELS.retoucheContexte} alt={t('retoucher.contexteAlt')} legende={t('retoucher.contexteLegende')} sizes="(max-width: 1024px) 100vw, 600px" />
            </div>
            <Deroule libelles={libelles} items={items('retoucher')} />
            <AvantApres texte="Avant/après AI Retoucher du même produit, même cadrage, images réelles issues d'Orbitvu Station, avec la consigne utilisée." />
          </div>
        </div>
      </Section>

      {/* 5. AI OCR : le même produit, ses données. Preuve réelle : étiquette, puis champs lus. */}
      <Section id="ocr" fond="gris">
        <div className={CONTENEUR}>
          <div className="max-w-3xl mb-8">
            <h2 className={TITRE_2}>{t('ocr.heading')}</h2>
            <p className={PARAGRAPHE}>{t('ocr.lead')}</p>
          </div>
          <Deroule libelles={libelles} items={items('ocr')} ligne />
          <figure className="mt-10 max-w-5xl">
            <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-5">
              <Figure visuel={VISUELS.ocrEtiquette} alt={t('ocr.etiquetteAlt')} legende={t('ocr.etiquetteLegende')} sizes="(max-width: 767px) 100vw, 520px" />
              <span className="flex justify-center text-very-peri-600" aria-hidden="true">
                <ArrowDown className="h-6 w-6 md:hidden" />
                <ArrowRight className="hidden h-6 w-6 md:block" />
              </span>
              <Figure visuel={VISUELS.ocrChamps} alt={t('ocr.champsAlt')} legende={t('ocr.champsLegende')} sizes="(max-width: 767px) 100vw, 520px" />
            </div>
            <figcaption className="mt-4 text-sm text-future-dusk-500 leading-relaxed">
              {t('ocr.legende')}
              <a href={VISUELS.ocrEntier.src} className="md:hidden block mt-1 text-very-peri-700 underline underline-offset-2">
                {t('captureEntiere')}
              </a>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 6. Usages (illustration E3) et CTA final */}
      <section className="py-16 lg:py-24 bg-future-dusk-900 text-white">
        <div className={`${CONTENEUR} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className="max-w-xl">
            <p className="mb-5 flex items-start gap-2 text-base font-semibold text-future-dusk-100">
              <Images className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {t('demo.usages')}
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold leading-tight mb-6">{t('demo.heading')}</h2>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-3">{t('demo.p1')}</p>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8">{t('demo.p2')}</p>
            <Button asChild size="lg" className="w-full sm:w-auto h-auto min-h-14 py-3 whitespace-normal text-center bg-white text-future-dusk-900 hover:bg-neutral-100 px-8 text-base font-semibold rounded-xl">
              <Link href="/contact">{t('demo.cta')}</Link>
            </Button>
          </div>
          <figure className="w-full max-w-[693px] lg:justify-self-end">
            <Image src={VISUELS.usages.src} alt={t('demo.imageAlt')} width={VISUELS.usages.w} height={VISUELS.usages.h} sizes="(max-width: 767px) 100vw, 693px" loading="lazy" className="block w-full h-auto rounded-2xl" />
            <figcaption className="mt-2 text-sm text-future-dusk-300 leading-relaxed">{t('demo.legende')}</figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
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
