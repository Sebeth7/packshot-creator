import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Info, FileText, ChevronDown, ArrowRight } from 'lucide-react';
import { TableOfContents } from '@/components/blog';
import SommaireCollant from '@/components/navigation/SommaireCollant';
import { CroquisZoom } from '@/components/revue/CroquisZoom';
import type { HeadingData } from '@/lib/blog-utils';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { buildLanguages } from '@/lib/hreflang';
import { tx } from '@/lib/locale-text';
import collectionFr from '@/content/conversations-sebastien-jourdan/fr.json';
import collectionEn from '@/content/conversations-sebastien-jourdan/en.json';
import collectionDeCh from '@/content/conversations-sebastien-jourdan/de-ch.json';

// Hub éditorial public « Conversations avec Sébastien Jourdan » (hors blog).
// Collection éditoriale d'autorité construite par PackshotCreator à partir du
// parcours et des publications de Sébastien Jourdan — PAS une interview enregistrée.
// Voix : éditoriale attribuée (arbitrage Laurent 13/10/2026, VOICE=EDITORIAL_ATTRIBUTED).
// Publication coordonnée FR/EN/de-ch (D38) : les langues réellement traduites sont
// listées dans PUBLISHED_LANGS ; les autres renvoient 404 tant que la traduction
// n'est pas prête (jamais de contenu FR servi sous /en ou /de-ch).

const SITE_URL = 'https://www.packshot-creator.com';
const SLUG = 'conversations-sebastien-jourdan';

// datePublished/dateModified : date réelle de publication, à confirmer au merge (D46).
const DATE_PUBLISHED = '2026-10-13';
const DATE_MODIFIED = '2026-10-13';

// Langues réellement publiées (traduction en ligne). FR seul tant que EN/de-ch
// ne sont pas finalisées et validées ; ajouter 'en' / 'de-ch' à la bascule.
const PUBLISHED_LANGS = ['fr', 'en', 'de-ch'] as const;
type PublishedLang = (typeof PUBLISHED_LANGS)[number];

/* ------------------------------------------------------------------ types */

interface Figure { name: string; src: string; alt: string; caption?: string }
interface Photo { src: string; alt: string; caption?: string; credit?: string; width: number; height: number; constrain?: boolean }
interface Bloc { t: 'p' | 'encadre'; html?: string; titre?: string; paras?: string[] }
interface Section { id: string; question: string; figures: Figure[]; contenu: Bloc[] }
interface Entretien {
  num: string; slug: string; serie: string; entretien: string; sujet: string;
  titre: string; sous_titre: string; intro: string[]; ouverture: string;
  sections: Section[]; aRetenir: string; recitPhotos: Photo[]; recitPhotosSequence: boolean;
}
interface Bio {
  titre: string; html: string;
  timeline: { periode: string; label: string }[];
  portrait: { src: string; alt: string; legende: string; width: number; height: number };
}
interface Collection { transparence: string; bio: Bio; entretiens: Entretien[] }

const COLLECTIONS: Record<string, Collection> = {
  fr: collectionFr as Collection,
  en: collectionEn as Collection,
  'de-ch': collectionDeCh as Collection,
};

/* ------------------------------------------------------------- métadonnées */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = tx(
    lang,
    'Conversations avec Sébastien Jourdan — méthode de la photo produit | PackshotCreator',
    'Conversations with Sébastien Jourdan — product photography method | PackshotCreator',
    'Gespräche mit Sébastien Jourdan — Methode der Produktfotografie | PackshotCreator',
  );
  const description = tx(
    lang,
    'Dix conversations de méthode sur la production d’images produit — décider, organiser, photographier les objets difficiles, maîtriser la couleur, relier image et données, situer l’IA, transmettre. Une collection éditoriale PackshotCreator construite à partir du parcours et des prises de position de Sébastien Jourdan.',
    'Ten method conversations on product image production — deciding, organising, shooting difficult objects, controlling colour, linking image and data, placing AI, handing over. A PackshotCreator editorial collection built from the career and public positions of Sébastien Jourdan.',
    'Zehn Methodengespräche zur Produktbild-Produktion — entscheiden, organisieren, schwierige Objekte fotografieren, Farbe beherrschen, Bild und Daten verbinden, KI einordnen, übergeben. Eine redaktionelle PackshotCreator-Sammlung auf Basis des Werdegangs und der öffentlichen Positionen von Sébastien Jourdan.',
  );
  const languages = buildLanguages(
    `/fr/${SLUG}`,
    {
      ...(PUBLISHED_LANGS.includes('en' as PublishedLang) ? { en: `/en/${SLUG}` } : {}),
      ...(PUBLISHED_LANGS.includes('de-ch' as PublishedLang) ? { deCh: `/de-ch/${SLUG}` } : {}),
    },
  );
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${SLUG}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/${lang}/${SLUG}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : lang === 'de-ch' ? 'de_CH' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(title)}&type=product&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function generateStaticParams() {
  return PUBLISHED_LANGS.map((lang) => ({ lang }));
}

/* ----------------------------------------------------------------- styles */

const prose = [
  'prose prose-lg max-w-none',
  'prose-p:text-future-dusk-700 prose-p:leading-[1.75]',
  'prose-strong:text-future-dusk-900 prose-strong:font-semibold',
  'prose-a:text-very-peri-600 prose-a:font-medium hover:prose-a:text-very-peri-700',
  'prose-em:text-future-dusk-600',
  '[&_code]:rounded [&_code]:bg-future-dusk-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm',
].join(' ');

function PhotoFigure({ p }: { p: Photo }) {
  if (p.constrain) {
    return (
      <figure className="revue-figure not-prose my-10">
        <div className="group relative mx-auto flex max-h-[460px] justify-center overflow-hidden rounded-xl border border-future-dusk-150 bg-future-dusk-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" className="max-h-[460px] w-auto object-contain" />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm text-future-dusk-500">
          <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-very-peri-600">Photo</span>
          {p.caption && <span className="italic">{p.caption}</span>}
          {p.credit && <span className="ml-auto shrink-0 text-xs text-future-dusk-400">{p.credit}</span>}
        </figcaption>
      </figure>
    );
  }
  return <CroquisZoom kind="photo" src={p.src} alt={p.alt} caption={p.caption} credit={p.credit} width={p.width} height={p.height} variant="inset" />;
}

/* ------------------------------------------------------------------- page */

interface PageProps { params: Promise<{ lang: string }> }

export default async function ConversationsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!(PUBLISHED_LANGS as readonly string[]).includes(lang)) notFound();
  setRequestLocale(lang);

  const data = COLLECTIONS[lang];
  const { transparence, bio, entretiens } = data;

  const headings: HeadingData[] = entretiens.map((it) => ({ id: it.slug, text: `${it.num} · ${it.titre}`, level: 2 }));
  const entrees = entretiens.map((it) => ({ id: it.slug, libelle: it.titre.length > 42 ? `${it.titre.slice(0, 42)}…` : it.titre }));

  // Numérotation continue des croquis (figures de méthode).
  const croquisNumero = new Map<string, number>();
  let nc = 0;
  for (const it of entretiens) for (const s of it.sections) for (const f of s.figures) { nc += 1; croquisNumero.set(f.name, nc); }

  const url = `${SITE_URL}/${lang}/${SLUG}`;
  const labelPointDeVue = tx(lang, 'Le point de vue de Sébastien Jourdan', 'Sébastien Jourdan’s perspective', 'Die Sicht von Sébastien Jourdan');
  const labelQuestions = (n: number) => tx(lang, `Les ${n} questions de cet entretien`, `The ${n} questions in this conversation`, `Die ${n} Fragen dieses Gesprächs`);

  // JSON-LD sincère : collection éditoriale PackshotCreator À PROPOS de Sébastien
  // Jourdan (sujet/expert), jamais une interview enregistrée. Auteur = PackshotCreator.
  const personSeb = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person-sebastien-jourdan`,
    name: 'Sébastien Jourdan',
    jobTitle: tx(lang, 'Dirigeant & expert photo produit', 'Managing director & product photography expert', 'Geschäftsführer & Experte für Produktfotografie'),
    url: `${SITE_URL}/${lang}/a-propos`,
    sameAs: ['https://www.linkedin.com/in/sebastienjourdan/'],
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
  const collectionArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tx(lang, 'Conversations avec Sébastien Jourdan', 'Conversations with Sébastien Jourdan', 'Gespräche mit Sébastien Jourdan'),
    description: tx(
      lang,
      'Collection éditoriale de dix conversations de méthode sur la production d’images produit, construite par PackshotCreator à partir du parcours et des publications de Sébastien Jourdan.',
      'An editorial collection of ten method conversations on product image production, built by PackshotCreator from the career and publications of Sébastien Jourdan.',
      'Eine redaktionelle Sammlung von zehn Methodengesprächen zur Produktbild-Produktion, erstellt von PackshotCreator auf Basis des Werdegangs und der Publikationen von Sébastien Jourdan.',
    ),
    url,
    inLanguage: lang === 'fr' ? 'fr-FR' : lang === 'de-ch' ? 'de-CH' : 'en-US',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: { '@id': `${SITE_URL}/#person-sebastien-jourdan` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tx(lang, 'Les dix conversations', 'The ten conversations', 'Die zehn Gespräche'),
    itemListElement: entretiens.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.titre,
      url: `${url}#${it.slug}`,
    })),
  };
  const breadcrumbs = breadcrumbSchema([
    { name: tx(lang, 'Accueil', 'Home', 'Startseite'), url: `${SITE_URL}/${lang}` },
    { name: tx(lang, 'Conversations avec Sébastien Jourdan', 'Conversations with Sébastien Jourdan', 'Gespräche mit Sébastien Jourdan'), url },
  ]);

  return (
    <main className="bg-white">
      <SchemaOrg schema={[organizationSchema(), breadcrumbs, personSeb, collectionArticle, itemList]} />

      {/* Barre de sommaire horizontale collante (D44 forme A), desktop ≥ 1024 px. */}
      <SommaireCollant titre={tx(lang, 'Sommaire', 'Contents', 'Inhalt')} libelle={tx(lang, 'Accès rapide aux sections', 'Quick access to sections', 'Schnellzugriff auf die Abschnitte')} entrees={entrees} ancreSommaire="sommaire-collection" />

      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden bg-future-dusk-900 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-very-peri-200">{tx(lang, 'Conversations sur la photo produit', 'Conversations on product photography', 'Gespräche über Produktfotografie')}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">{tx(lang, 'Conversations avec Sébastien Jourdan', 'Conversations with Sébastien Jourdan', 'Gespräche mit Sébastien Jourdan')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-future-dusk-100">
            {tx(lang,
              'Dix conversations de méthode sur la production d’images produit : décider, organiser, photographier des objets difficiles, maîtriser la couleur, relier l’image à la donnée, situer l’IA et transmettre un studio qui tient.',
              'Ten method conversations on product image production: deciding, organising, shooting difficult objects, controlling colour, linking image to data, placing AI and handing over a studio that lasts.',
              'Zehn Methodengespräche zur Produktbild-Produktion: entscheiden, organisieren, schwierige Objekte fotografieren, Farbe beherrschen, Bild und Daten verbinden, KI einordnen und ein Studio übergeben, das Bestand hat.',
            )}
          </p>
        </div>
      </section>

      {/* -------------------------------------------- Corps (colonne unique) */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">

        {/* ----- Transparence éditoriale (visible en tête de collection) ----- */}
        <aside className="mb-14 flex gap-4 rounded-xl border border-future-dusk-150 bg-future-dusk-50/70 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-very-peri-600" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-future-dusk-600" dangerouslySetInnerHTML={{ __html: transparence }} />
        </aside>

        {/* ----- Qui est Sébastien Jourdan (bio + portrait réel) ----- */}
        <section aria-labelledby="bio-sebastien" className="mb-14 scroll-mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-very-peri-600">{tx(lang, 'Avant de commencer', 'Before we start', 'Bevor wir beginnen')}</p>
          <h2 id="bio-sebastien" className="mt-3 font-heading text-3xl font-bold leading-tight text-future-dusk-900 sm:text-4xl">{bio.titre}</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
            <figure className="mx-auto w-44 shrink-0 text-center sm:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bio.portrait.src} alt={bio.portrait.alt} width={bio.portrait.width} height={bio.portrait.height}
                className="mx-auto h-44 w-44 rounded-full object-cover shadow-md ring-1 ring-future-dusk-200/70" decoding="async" />
              <figcaption className="mt-3 text-left text-xs leading-snug text-future-dusk-500">{bio.portrait.legende}</figcaption>
            </figure>
            <div className={`${prose} [&>p]:mb-4`} dangerouslySetInnerHTML={{ __html: bio.html }} />
          </div>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-future-dusk-150 bg-future-dusk-150 sm:grid-cols-2 lg:grid-cols-4">
            {bio.timeline.map((t) => (
              <li key={t.periode} className="bg-white p-4">
                <p className="font-heading text-sm font-bold text-very-peri-700">{t.periode}</p>
                <p className="mt-1 text-sm leading-snug text-future-dusk-600">{t.label}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----- Vue d'ensemble (ancre du sommaire collant) ----- */}
        <section aria-labelledby="sommaire-collection-titre" id="sommaire-collection" className="mb-14 scroll-mt-32">
          <h2 id="sommaire-collection-titre" className="font-heading text-2xl font-bold text-future-dusk-900 sm:text-3xl">{tx(lang, 'Les dix conversations', 'The ten conversations', 'Die zehn Gespräche')}</h2>
          <p className="mt-2 max-w-2xl text-future-dusk-500">{tx(lang, 'Chaque conversation part d’une question concrète et propose une méthode. À lire dans l’ordre, ou par sujet.', 'Each conversation starts from a concrete question and offers a method. Read in order, or by topic.', 'Jedes Gespräch geht von einer konkreten Frage aus und schlägt eine Methode vor. Der Reihe nach oder nach Thema zu lesen.')}</p>
          <div className="mt-6 lg:hidden">
            <TableOfContents headings={headings} title={tx(lang, 'Les conversations', 'The conversations', 'Die Gespräche')} collapsible />
          </div>
          <ol className="mt-8 divide-y divide-future-dusk-100 border-y border-future-dusk-100">
            {entretiens.map((it) => (
              <li key={it.num}>
                <a href={`#${it.slug}`} className="group flex items-start gap-5 py-4 transition-colors hover:bg-future-dusk-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-500">
                  <span className="font-heading text-2xl font-bold tabular-nums text-future-dusk-200 transition-colors group-hover:text-very-peri-500">{it.num}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-semibold leading-snug text-future-dusk-900 group-hover:text-very-peri-700">{it.titre}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-future-dusk-500">{it.sujet}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-future-dusk-300 transition-colors group-hover:text-very-peri-500" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ----- Les dix conversations ----- */}
        <div className="space-y-20">
          {entretiens.map((it) => {
            const recitPhoto = !it.recitPhotosSequence && it.recitPhotos.length > 0 ? it.recitPhotos[0] : null;
            return (
              <article key={it.num} id={it.slug} className="scroll-mt-32">
                <header className="border-b border-future-dusk-100 pb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-5xl font-bold leading-none text-future-dusk-150 sm:text-6xl">{it.num}</span>
                    <div className="h-px flex-1 bg-future-dusk-100" />
                    <span className="font-mono text-xs uppercase tracking-widest text-very-peri-600">{tx(lang, 'Conversation', 'Conversation', 'Gespräch')} {it.entretien}</span>
                  </div>
                  <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight text-future-dusk-900 sm:text-4xl">{it.titre}</h2>
                  {it.sous_titre && <p className="mt-3 max-w-2xl text-lg italic leading-relaxed text-future-dusk-600">{it.sous_titre}</p>}
                  {it.sections.length > 0 && (
                    <details className="mt-4 text-sm">
                      <summary className="inline-flex cursor-pointer items-center gap-1.5 text-future-dusk-500 hover:text-very-peri-600">
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        {labelQuestions(it.sections.length)}
                      </summary>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {it.sections.map((s) => {
                          const court = s.question.replace(/[«»"]/g, '').trim().replace(/\s+/g, ' ');
                          return (
                            <li key={s.id}>
                              <a href={`#${s.id}`} className="inline-block rounded-full border border-future-dusk-150 px-3 py-1 text-xs text-future-dusk-600 transition-colors hover:border-very-peri-400 hover:text-very-peri-600">
                                {court.slice(0, 52)}{court.length > 52 ? '…' : ''}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  )}
                </header>

                {it.intro && it.intro.length > 0 && (
                  <div className={`mt-7 ${prose}`} dangerouslySetInnerHTML={{ __html: it.intro.map((p) => `<p>${p}</p>`).join('\n') }} />
                )}

                {it.ouverture && (
                  <section className="mt-7 border-l-2 border-very-peri-300 pl-5">
                    <p className="font-heading text-sm font-bold uppercase tracking-wide text-future-dusk-700">{labelPointDeVue}</p>
                    <div className={`mt-3 ${prose}`} dangerouslySetInnerHTML={{ __html: it.ouverture }} />
                    {it.recitPhotosSequence && it.recitPhotos.length > 0 && (
                      <figure className="not-prose mt-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {it.recitPhotos.map((ph) => (
                            <CroquisZoom key={ph.src} kind="photo" src={ph.src} alt={ph.alt} caption={ph.caption} credit={ph.credit} width={ph.width} height={ph.height} />
                          ))}
                        </div>
                      </figure>
                    )}
                  </section>
                )}

                <div className="mt-10 space-y-12">
                  {it.sections.map((s, si) => {
                    const encadres = s.contenu.filter((b) => b.t === 'encadre');
                    const paras = s.contenu.filter((b) => b.t === 'p');
                    return (
                      <section key={s.id} id={s.id} className="scroll-mt-32">
                        {s.figures.map((f) => (
                          <CroquisZoom key={f.name} src={f.src} alt={f.alt} caption={f.caption} index={croquisNumero.get(f.name)} />
                        ))}
                        {s.question && <h3 className="font-heading text-xl font-semibold leading-snug text-future-dusk-900 sm:text-2xl">{s.question}</h3>}
                        {paras.length > 0 && (
                          <div className={`mt-4 ${prose}`} dangerouslySetInnerHTML={{ __html: paras.map((b) => b.html).join('\n') }} />
                        )}
                        {encadres.map((e, ei) => (
                          <aside key={ei} className="mt-6 rounded-xl border border-future-dusk-150 bg-future-dusk-50/60 p-5">
                            <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-very-peri-700">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-very-peri-500" />{e.titre}
                            </p>
                            <div className={`mt-3 ${prose} prose-base`} dangerouslySetInnerHTML={{ __html: (e.paras ?? []).map((p) => `<p>${p}</p>`).join('\n') }} />
                          </aside>
                        ))}
                        {si === 0 && recitPhoto && <PhotoFigure p={recitPhoto} />}
                      </section>
                    );
                  })}
                </div>

                {it.aRetenir && (
                  <aside className="mt-10 rounded-xl border border-very-peri-200 bg-very-peri-50/60 p-5">
                    <div className="text-future-dusk-700 [&_strong]:text-very-peri-800" dangerouslySetInnerHTML={{ __html: it.aRetenir }} />
                  </aside>
                )}
              </article>
            );
          })}
        </div>

        {/* ----- Pour aller plus loin ----- */}
        <section className="mt-20 rounded-2xl border border-future-dusk-150 bg-future-dusk-50/60 p-6 sm:p-8">
          <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-very-peri-700">
            <FileText className="h-4 w-4" aria-hidden="true" />{tx(lang, 'Pour aller plus loin', 'Going further', 'Weiterführend')}
          </p>
          <p className="mt-3 text-future-dusk-600">
            {tx(lang,
              'Ces conversations renvoient, au fil du texte, vers les guides, dossiers et pages de référence de PackshotCreator — rentabilité d’un studio, organisation de la production, secteurs, IA et photographie produit.',
              'Throughout, these conversations link to PackshotCreator’s reference guides, dossiers and pages — studio profitability, production organisation, industries, AI and product photography.',
              'Diese Gespräche verweisen fortlaufend auf die Referenzguides, Dossiers und Seiten von PackshotCreator — Wirtschaftlichkeit eines Studios, Produktionsorganisation, Branchen, KI und Produktfotografie.',
            )}
          </p>
        </section>
      </div>
    </main>
  );
}
