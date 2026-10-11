import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import interviews from '@/content/revue-entretiens-s3/interviews.json';

// Espace de revue éditoriale INTERNE, destiné à la relecture par Laurent avant
// la validation de la voix par Sébastien Jourdan. Il ne crée aucune URL publique
// indexable : rendu uniquement en Preview Vercel et en local, 404 en production.
//
// Garde-fous (défense en profondeur) :
//  - `dynamic = 'force-dynamic'` : la page est rendue à chaque requête, donc la
//    garde ci-dessous sur `VERCEL_ENV` s'applique réellement.
//  - garde `process.env.VERCEL_ENV === 'production'` → notFound() (404 en prod).
//  - metadata `robots: { index: false, follow: false }`.
//  - route hors `app/sitemap.ts`, hors maillage interne, hors alternates hreflang.
//  - une seule locale (fr) : /en/... et /de-ch/... renvoient 404 (dynamicParams=false).
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
      "Espace de relecture interne, non public. Textes éditoriaux proposés en cours de validation.",
    robots: { index: false, follow: false },
  };
}

// Entretiens dont le texte propose une évolution d'une page publique existante
// (articles de la PR #130). Les autres n'ont AUCUNE URL décidée (D16 ouvert).
const PAGES_PUBLIQUES: Record<string, { label: string; url: string }> = {
  '01': {
    label: 'Proposition d’évolution de la page A (décider)',
    url: '/fr/blog/est-il-utile-dinternaliser-sa-production-de-photos-packshot',
  },
  '02': {
    label: 'Proposition d’évolution de la page B (produire)',
    url: '/fr/blog/e-commerce-comment-mettre-en-place-votre-studio-photo',
  },
};

// Entretien nécessitant une relecture juridique avant toute publication.
const RELECTURE_JURIDIQUE = new Set(['08']);

const prose = [
  'prose prose-lg max-w-none',
  'prose-headings:font-heading prose-headings:text-future-dusk-900',
  'prose-p:text-future-dusk-700 prose-p:leading-relaxed',
  'prose-strong:text-future-dusk-900',
  'prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700',
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-future-dusk-800 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24',
  '[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-future-dusk-800 [&_h4]:mt-6 [&_h4]:mb-2',
  '[&_figure]:my-8 [&_figure]:rounded-lg [&_figure]:border [&_figure]:border-future-dusk-100 [&_figure]:bg-future-dusk-50/40 [&_figure]:p-3',
  '[&_figure_img]:rounded-md [&_figure_img]:w-full [&_figure_img]:h-auto',
  '[&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-future-dusk-500 [&_figcaption]:italic [&_figcaption]:text-center',
].join(' ');

export default async function RevueEntretiensPage({ params }: PageProps) {
  // 404 en PRODUCTION : jamais exposé sur www. Rendu seulement en Preview / local.
  if (process.env.VERCEL_ENV === 'production') {
    notFound();
  }

  const { lang } = await params;
  // Espace de revue uniquement en français : /en et /de-ch renvoient 404.
  if (lang !== 'fr') {
    notFound();
  }
  setRequestLocale(lang);

  return (
    <main className="bg-white">
      {/* Bandeau d'avertissement — toujours visible en tête */}
      <section className="bg-future-dusk-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-very-peri-200">
            Espace de revue interne · Preview uniquement
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-heading font-bold">
            Entretiens éditoriaux — en cours de validation par Sébastien Jourdan
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-future-dusk-100">
            Cette page sert à relire les dix entretiens montés avec leurs visuels.
            Elle n’est pas publique : elle renvoie 404 en production, porte
            <span className="whitespace-nowrap"> noindex/nofollow</span>, et
            n’apparaît ni dans le plan de site, ni dans le maillage interne, ni
            dans les alternates.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-future-dusk-100 list-disc pl-5">
            <li>
              Les phrases à la première personne sont des <strong>propositions
              rédactionnelles</strong>, pas la transcription d’une interview
              réellement enregistrée.
            </li>
            <li>
              Auteur public inchangé : <strong>PackshotCreator</strong>. Aucune
              signature ni donnée structurée « Person » de Sébastien avant son
              approbation.
            </li>
            <li>
              Aucune fusion des entretiens 01 et 02 dans les pages A/B publiques
              n’est effectuée dans cette PR ; les textes sont présentés ici comme
              propositions à valider.
            </li>
            <li>
              Statut : <strong>écrit = oui ; relu par Sébastien = non ;
              publication = non ; nouvelle URL publique = non</strong>.
            </li>
          </ul>
        </div>
      </section>

      {/* Sommaire des dix entretiens */}
      <section className="border-b border-future-dusk-100 bg-future-dusk-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-future-dusk-500">
            Les dix entretiens
          </h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {interviews.map((it) => (
              <li key={it.num}>
                <a
                  href={`#${it.slug}`}
                  className="text-future-dusk-700 hover:text-very-peri-600"
                >
                  <span className="font-mono text-future-dusk-400">{it.num}.</span>{' '}
                  {it.titre}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Les dix entretiens */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {interviews.map((it) => {
          const pagePublique = PAGES_PUBLIQUES[it.num];
          const juridique = RELECTURE_JURIDIQUE.has(it.num);
          return (
            <article key={it.num} id={it.slug} className="scroll-mt-24">
              <header className="mb-6 border-b border-future-dusk-100 pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-very-peri-600">
                  {it.serie} · Entretien {it.entretien}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900">
                  {it.titre}
                </h2>
                {it.sous_titre && (
                  <p className="mt-3 text-lg text-future-dusk-600 italic">
                    {it.sous_titre}
                  </p>
                )}
                <dl className="mt-4 grid gap-1 text-sm text-future-dusk-500">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Sujet :</dt>
                    <dd>{it.sujet}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Statut :</dt>
                    <dd>{it.statut}</dd>
                  </div>
                  {it.questions_corpus && (
                    <div className="flex gap-2">
                      <dt className="font-semibold">Questions du corpus :</dt>
                      <dd>{it.questions_corpus}</dd>
                    </div>
                  )}
                </dl>

                {pagePublique && (
                  <p className="mt-4 rounded-md border border-very-peri-200 bg-very-peri-50 px-4 py-3 text-sm text-future-dusk-700">
                    {pagePublique.label}. Page publique existante :{' '}
                    <a
                      href={pagePublique.url}
                      className="font-medium text-very-peri-700 underline"
                    >
                      {pagePublique.url}
                    </a>
                    . La fusion sur place n’est pas réalisée dans cette PR.
                  </p>
                )}

                {juridique && (
                  <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <strong>Relecture juridique requise avant toute
                    publication.</strong> Conversation de méthode, pas un avis
                    juridique (AI Act, droit de la consommation, règles des
                    plateformes). À revérifier à la date de publication.
                  </p>
                )}
              </header>

              <div
                className={prose}
                dangerouslySetInnerHTML={{ __html: it.html }}
              />

              {it.note_dossier && (
                <details className="mt-6 rounded-md border border-future-dusk-100 bg-future-dusk-50/50 px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-future-dusk-600">
                    Note de dossier (provenance, à usage interne)
                  </summary>
                  <p className="mt-2 text-sm text-future-dusk-500">
                    {it.note_dossier}
                  </p>
                </details>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
