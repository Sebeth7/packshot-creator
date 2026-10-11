import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowUpRight, Lock, Scale, FileText } from 'lucide-react';
import { TableOfContents } from '@/components/blog';
import { CroquisZoom } from '@/components/revue/CroquisZoom';
import type { HeadingData } from '@/lib/blog-utils';
import interviewsData from '@/content/revue-entretiens-s3/interviews.json';

// Espace de revue éditoriale INTERNE (relecture par Laurent avant validation de la
// voix par Sébastien Jourdan). Il ne crée aucune URL publique indexable : rendu
// uniquement en Preview Vercel et en local, 404 en production.
//
// Garde-fous (défense en profondeur) :
//  - `dynamic = 'force-dynamic'` : rendu à chaque requête, la garde VERCEL_ENV s'applique.
//  - garde `process.env.VERCEL_ENV === 'production'` → notFound() (404 en prod).
//  - metadata `robots: { index: false, follow: false }`.
//  - route hors `app/sitemap.ts`, hors maillage interne entrant, hors alternates.
//  - une seule locale (fr) : /en et /de-ch renvoient 404.
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Revue éditoriale interne — Entretiens Sébastien Jourdan (Preview)',
    description:
      'Espace de relecture interne, non public. Textes éditoriaux proposés, en cours de validation.',
    robots: { index: false, follow: false },
  };
}

/* ------------------------------------------------------------------ types */

interface Bloc {
  t: 'p' | 'encadre';
  html?: string;
  titre?: string;
  paras?: string[];
}
interface Figure {
  name: string;
  src: string;
  alt: string;
  caption?: string;
}
interface Section {
  id: string;
  question: string;
  figures: Figure[];
  contenu: Bloc[];
}
interface Interview {
  num: string;
  slug: string;
  serie: string;
  entretien: string;
  sujet: string;
  url_existante: string;
  url_site: string;
  statut: string;
  questions_corpus: string;
  titre: string;
  sous_titre: string;
  intro: string[];
  a_retenir: string;
  sections: Section[];
  note_dossier: string;
}

const interviews = interviewsData as Interview[];

/* -------------------------------------------------------------- métadonnées */

// Libellés courts pour le sommaire latéral (fondés sur les titres/sujets).
const LABELS: Record<string, string> = {
  '01': 'Décider : internaliser ?',
  '02': 'Organiser le studio',
  '03': 'Une image fidèle',
  '04': 'Produits difficiles',
  '05': 'Couleur reproductible',
  '06': 'Images et données',
  '07': 'IA et photo réelle',
  '08': 'Transparence et droits',
  '09': 'Multicanal, 360, vidéo',
  '10': 'Piloter et transmettre',
};

// Promesse concrète de chaque conversation (description, sans claim de performance).
const PROMESSES: Record<string, string> = {
  '01': "Comparer prestataire, studio interne et modèle mixte sur vos vrais produits, avant d'investir.",
  '02': "Penser le studio comme un circuit, de l'arrivée d'une référence au fichier approuvé.",
  '03': "Distinguer une belle image d'une image fidèle, et ce que cela change pour l'acheteur.",
  '04': 'Aborder reflets, transparences et matières difficiles avec une méthode de lumière.',
  '05': "Obtenir une couleur qui ne dépend ni de l'opérateur, ni du jour, ni de l'écran.",
  '06': 'Relier chaque image à sa référence produit : identifiants, métadonnées, fichiers.',
  '07': "Situer l'IA dans la chaîne photo : ce qu'elle déplace, ce qu'un humain valide encore.",
  '08': "Documenter la provenance des visuels et savoir expliquer ce qui a été fait.",
  '09': 'Choisir le bon nombre de vues et de formats selon les canaux, le 360 et la vidéo.',
  '10': 'Piloter la production par indicateurs et la transmettre sans perdre le résultat.',
};

// Entretiens proposant l'évolution d'une page publique existante (PR #130).
const PAGES_PUBLIQUES: Record<string, { label: string; slug: string }> = {
  '01': {
    label: 'Proposition d’évolution de la page A (décider)',
    slug: 'est-il-utile-dinternaliser-sa-production-de-photos-packshot',
  },
  '02': {
    label: 'Proposition d’évolution de la page B (produire)',
    slug: 'e-commerce-comment-mettre-en-place-votre-studio-photo',
  },
};

const RELECTURE_JURIDIQUE = new Set(['08']);

// « Pour aller plus loin » : liens vers des pages PackshotCreator existantes.
// Destinations vérifiées (content/blog/fr/*.json et routes app) ; texte d'ancre
// descriptif ; pas d'annuaire, pas de bourrage de mots-clés.
// `blog` = slug d'article (gabarit /blog/[slug]) ; `page` = route dédiée.
type Lien = { blog?: string; page?: '/calculateur-roi'; texte: string };
const LIENS: Record<string, Lien[]> = {
  '01': [
    { blog: 'quel-retour-sur-investissement-avec-un-studio-photo-en-interne', texte: 'Quel retour sur investissement avec un studio photo en interne' },
    { page: '/calculateur-roi', texte: 'Estimer le coût complet avec le calculateur de rentabilité' },
  ],
  '02': [
    { blog: 'votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser', texte: 'Trois bonnes pratiques pour organiser un studio photo interne' },
    { blog: 'quel-studio-photo-type-pour-vos-shootings-produits-en-interne', texte: 'Quel type de studio photo pour vos prises de vue en interne' },
  ],
  '03': [
    { blog: 'e-commerce-quel-est-le-reel-impact-des-visuels', texte: 'Le réel impact des visuels sur les ventes en e-commerce' },
    { blog: 'comment-avoir-meilleure-photo-produit-e-commerce', texte: 'Comment obtenir une meilleure photo produit en e-commerce' },
  ],
  '04': [
    { blog: 'comment-mettre-en-valeur-un-produit-guide-photographie-packshot', texte: 'Mettre en valeur un produit : guide de la photographie packshot' },
    { blog: 'materiel-photo-guide-photographie-packshot', texte: 'Le matériel photo pour le packshot produit' },
  ],
  '05': [
    { blog: 'comment-avoir-des-photos-professionnelles-guide-packshot-produit', texte: 'Comment obtenir des photos produit professionnelles' },
  ],
  '06': [
    { blog: 'images-ia-metadonnees-marketplaces', texte: 'Images, métadonnées et exigences des marketplaces' },
    { blog: 'alphashot-xl-g2-photo-mesures-donnees-produit', texte: 'Photo, mesures et données produit avec l’AlphaShot XL G2' },
  ],
  '07': [
    { blog: 'generer-images-produit-ia', texte: 'Générer des images produit avec l’IA' },
    { blog: 'retouche-ia-photo-produit', texte: 'La retouche IA appliquée à la photo produit' },
  ],
  '08': [
    { blog: 'ai-act-images-produit', texte: 'AI Act et images produit : le dossier dédié' },
    { blog: 'images-ia-ecommerce-suisse', texte: 'Images IA et e-commerce en Suisse' },
  ],
  '09': [
    { blog: 'eclairage-packshots-360-3d-produits', texte: 'Éclairage des packshots 360 et 3D' },
    { blog: 'photographie-360-amazon', texte: 'La photographie 360 pour Amazon' },
  ],
  '10': [
    { blog: 'quel-retour-sur-investissement-avec-un-studio-photo-en-interne', texte: 'Quel retour sur investissement avec un studio photo en interne' },
    { blog: 'votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser', texte: 'Trois bonnes pratiques pour organiser un studio photo interne' },
  ],
};

/* ----------------------------------------------------------------- styles */

// Prose de lecture (réponses rendues depuis le JSON, source contrôlée).
const prose = [
  'prose prose-lg max-w-none',
  'prose-p:text-future-dusk-700 prose-p:leading-[1.75]',
  'prose-strong:text-future-dusk-900 prose-strong:font-semibold',
  'prose-a:text-very-peri-600 prose-a:font-medium hover:prose-a:text-very-peri-700',
  'prose-em:text-future-dusk-600',
].join(' ');

/* ------------------------------------------------------------------- page */

export default async function RevueEntretiensPage({ params }: PageProps) {
  if (process.env.VERCEL_ENV === 'production') {
    notFound();
  }
  const { lang } = await params;
  if (lang !== 'fr') {
    notFound();
  }
  setRequestLocale(lang);

  const headings: HeadingData[] = interviews.map((it) => ({
    id: it.slug,
    text: `${it.num} · ${LABELS[it.num] ?? it.titre}`,
    level: 2,
  }));

  // Numérotation globale des croquis, dans l'ordre du récit (calculée avant rendu).
  const croquisNumero = new Map<string, number>();
  let n = 0;
  for (const it of interviews) {
    for (const s of it.sections) {
      for (const f of s.figures) {
        n += 1;
        croquisNumero.set(f.name, n);
      }
    }
  }

  return (
    <main className="bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden bg-future-dusk-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-very-peri-200">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Revue interne · Preview
          </div>
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.3em] text-very-peri-200">
            Conversations sur la photo produit
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Dix conversations avec Sébastien Jourdan
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-future-dusk-100">
            Une collection d’entretiens de méthode sur la production d’images produit :
            décider, organiser, photographier des objets difficiles, maîtriser la couleur,
            relier l’image à la donnée, situer l’IA, et transmettre un studio qui tient.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-future-dusk-200">
            Photographe de produits, puis créateur d’Everleet et de BlendAI.Studio,
            aujourd’hui à la tête de PackshotCreator : un parcours documenté, du déclenchement
            à la conception de chaînes de prise de vue complètes. Ces conversations prolongent
            ses prises de position publiques.
          </p>

          {/* Statut de relecture, discret mais explicite */}
          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm sm:grid-cols-4">
            {[
              ['Écrit', 'oui'],
              ['Relu par Sébastien', 'non'],
              ['Publication', 'non'],
              ['Nouvelle URL publique', 'non'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-future-dusk-300">{k}</dt>
                <dd className="font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-future-dusk-300">
            Page non publique (404 en production, <span className="whitespace-nowrap">noindex</span>,
            hors plan de site). Les phrases à la première personne sont des propositions
            rédactionnelles, pas la transcription d’une interview enregistrée ; elles attendent
            l’approbation de Sébastien. Auteur public inchangé : PackshotCreator.
          </p>
        </div>
      </section>

      {/* ------------------------------------------ Corps : sommaire + contenu */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="lg:flex lg:gap-14">
          <div className="min-w-0 flex-1">
            {/* Sommaire mobile repliable (une seule navigation persistante) */}
            <div className="mb-10 lg:hidden">
              <TableOfContents headings={headings} title="Les entretiens" collapsible />
            </div>

            {/* Vue d'ensemble des dix conversations */}
            <section aria-labelledby="sommaire-collection" className="mb-16">
              <h2
                id="sommaire-collection"
                className="font-heading text-2xl font-bold text-future-dusk-900 sm:text-3xl"
              >
                Les dix conversations
              </h2>
              <p className="mt-2 max-w-2xl text-future-dusk-500">
                Chaque entretien part d’une question concrète et propose une méthode. À lire
                dans l’ordre, ou par sujet.
              </p>
              <ol className="mt-8 divide-y divide-future-dusk-100 border-y border-future-dusk-100">
                {interviews.map((it) => (
                  <li key={it.num}>
                    <a
                      href={`#${it.slug}`}
                      className="group flex items-start gap-5 py-5 transition-colors hover:bg-future-dusk-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-500"
                    >
                      <span className="font-heading text-2xl font-bold tabular-nums text-future-dusk-200 transition-colors group-hover:text-very-peri-500">
                        {it.num}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-lg font-semibold leading-snug text-future-dusk-900 group-hover:text-very-peri-700">
                          {it.titre}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-future-dusk-500">
                          {PROMESSES[it.num]}
                        </span>
                      </span>
                      <ArrowRight
                        className="mt-1.5 h-4 w-4 shrink-0 text-future-dusk-300 transition-transform group-hover:translate-x-0.5 group-hover:text-very-peri-600 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            {/* Les dix entretiens */}
            <div className="space-y-20">
              {interviews.map((it, idx) => {
                const pagePublique = PAGES_PUBLIQUES[it.num];
                const juridique = RELECTURE_JURIDIQUE.has(it.num);
                const liens = LIENS[it.num] ?? [];
                const suivant = interviews[idx + 1];
                return (
                  <article key={it.num} id={it.slug} className="scroll-mt-24">
                    {/* Ouverture éditoriale */}
                    <header className="border-b border-future-dusk-100 pb-8">
                      <div className="flex items-center gap-4">
                        <span className="font-heading text-5xl font-bold leading-none text-future-dusk-150 sm:text-6xl">
                          {it.num}
                        </span>
                        <div className="h-px flex-1 bg-future-dusk-100" />
                        <span className="font-mono text-xs uppercase tracking-widest text-very-peri-600">
                          Entretien {it.entretien}
                        </span>
                      </div>
                      <h2 className="mt-6 max-w-3xl font-heading text-3xl font-bold leading-tight text-future-dusk-900 sm:text-4xl">
                        {it.titre}
                      </h2>
                      {it.sous_titre && (
                        <p className="mt-4 max-w-2xl border-l-2 border-very-peri-300 pl-4 text-lg italic leading-relaxed text-future-dusk-600">
                          {it.sous_titre}
                        </p>
                      )}

                      {/* Questions abordées */}
                      {it.sections.length > 0 && (
                        <div className="mt-6">
                          <p className="text-xs font-semibold uppercase tracking-wide text-future-dusk-400">
                            Questions abordées
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {it.sections.map((s) => (
                              <li key={s.id}>
                                <a
                                  href={`#${s.id}`}
                                  className="inline-block rounded-full border border-future-dusk-150 px-3 py-1 text-xs text-future-dusk-600 transition-colors hover:border-very-peri-400 hover:text-very-peri-600"
                                >
                                  {s.question.replace(/[«»"]/g, '').trim().replace(/\s+/g, ' ').slice(0, 52)}
                                  {s.question.replace(/[«»"]/g, '').trim().length > 52 ? '…' : ''}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Badges statut / page publique / juridique */}
                      <div className="mt-6 flex flex-col gap-3">
                        <p className="inline-flex w-fit items-center gap-2 rounded-md bg-future-dusk-50 px-3 py-1.5 text-xs text-future-dusk-500">
                          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                          {it.statut}
                        </p>
                        {pagePublique && (
                          <p className="text-sm text-future-dusk-600">
                            {pagePublique.label} — page publique existante :{' '}
                            <Link
                              href={{ pathname: '/blog/[slug]', params: { slug: pagePublique.slug } }}
                              className="font-medium text-very-peri-700 underline underline-offset-2"
                            >
                              /fr/blog/{pagePublique.slug}
                            </Link>
                            . La fusion sur place n’est pas réalisée dans cette PR.
                          </p>
                        )}
                        {juridique && (
                          <p className="inline-flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                            <Scale className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>
                              <strong>Relecture juridique requise avant toute publication.</strong>{' '}
                              Conversation de méthode, pas un avis juridique (AI Act, droit de la
                              consommation, règles des plateformes), à revérifier à la date de
                              publication.
                            </span>
                          </p>
                        )}
                      </div>
                    </header>

                    {/* Chapô de lecture + à retenir */}
                    <div className="mt-8">
                      {it.intro.map((p, i) => (
                        <p
                          key={i}
                          className={
                            i === 0
                              ? 'text-xl leading-relaxed text-future-dusk-800 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-very-peri-500'
                              : 'mt-4 text-lg leading-relaxed text-future-dusk-700'
                          }
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      ))}
                      {it.a_retenir && (
                        <aside className="mt-8 rounded-xl border border-very-peri-200 bg-very-peri-50/60 p-5">
                          <div
                            className="text-future-dusk-700 [&_strong]:text-very-peri-800"
                            dangerouslySetInnerHTML={{ __html: it.a_retenir }}
                          />
                        </aside>
                      )}
                    </div>

                    {/* Sections question / réponse */}
                    <div className="mt-10 space-y-12">
                      {it.sections.map((s) => {
                        const encadres = s.contenu.filter((b) => b.t === 'encadre');
                        const paras = s.contenu.filter((b) => b.t === 'p');
                        return (
                          <section key={s.id} id={s.id} className="scroll-mt-24">
                            {/* Croquis en tête de section (au meilleur endroit du récit) */}
                            {s.figures.map((f) => (
                              <CroquisZoom
                                key={f.name}
                                src={f.src}
                                alt={f.alt}
                                caption={f.caption}
                                index={croquisNumero.get(f.name)}
                              />
                            ))}
                            {s.question && (
                              <h3 className="font-heading text-xl font-semibold leading-snug text-future-dusk-900 sm:text-2xl">
                                {s.question}
                              </h3>
                            )}
                            {paras.length > 0 && (
                              <div
                                className={`mt-4 ${prose}`}
                                dangerouslySetInnerHTML={{
                                  __html: paras.map((b) => b.html).join('\n'),
                                }}
                              />
                            )}
                            {encadres.map((e, ei) => (
                              <aside
                                key={ei}
                                className="mt-6 rounded-xl border border-future-dusk-150 bg-future-dusk-50/60 p-5"
                              >
                                <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-very-peri-700">
                                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-very-peri-500" />
                                  {e.titre}
                                </p>
                                <div
                                  className={`mt-3 ${prose} prose-base`}
                                  dangerouslySetInnerHTML={{
                                    __html: (e.paras ?? []).map((p) => `<p>${p}</p>`).join('\n'),
                                  }}
                                />
                              </aside>
                            ))}
                          </section>
                        );
                      })}
                    </div>

                    {/* Pour aller plus loin */}
                    {liens.length > 0 && (
                      <div className="mt-10 rounded-xl bg-future-dusk-50/70 p-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-future-dusk-500">
                          Pour aller plus loin
                        </p>
                        <ul className="mt-3 space-y-2">
                          {liens.map((l) => (
                            <li key={l.texte}>
                              <Link
                                href={
                                  l.blog
                                    ? { pathname: '/blog/[slug]', params: { slug: l.blog } }
                                    : l.page!
                                }
                                className="group inline-flex items-start gap-2 text-future-dusk-700 hover:text-very-peri-700"
                              >
                                <ArrowUpRight
                                  className="mt-1 h-4 w-4 shrink-0 text-very-peri-500"
                                  aria-hidden="true"
                                />
                                <span className="underline-offset-2 group-hover:underline">
                                  {l.texte}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Note de dossier (provenance, interne) */}
                    {it.note_dossier && (
                      <details className="mt-6 rounded-md border border-future-dusk-100 bg-white px-4 py-3">
                        <summary className="cursor-pointer text-sm font-semibold text-future-dusk-600">
                          Note de dossier (provenance, à usage interne)
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-future-dusk-500">
                          {it.note_dossier}
                        </p>
                      </details>
                    )}

                    {/* Navigation vers l'entretien suivant */}
                    {suivant && (
                      <a
                        href={`#${suivant.slug}`}
                        className="group mt-10 flex items-center justify-between gap-4 rounded-xl border border-future-dusk-150 p-5 transition-colors hover:border-very-peri-400 hover:bg-future-dusk-50/50"
                      >
                        <span>
                          <span className="block text-xs uppercase tracking-wide text-future-dusk-400">
                            Entretien suivant
                          </span>
                          <span className="mt-1 block font-heading font-semibold text-future-dusk-900 group-hover:text-very-peri-700">
                            {suivant.num} · {suivant.titre}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-5 w-5 shrink-0 text-very-peri-500 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Sommaire latéral collant (desktop ≥ 1024 px) — D44 */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} title="Les entretiens" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
