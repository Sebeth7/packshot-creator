import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ChevronRight, Clock, User } from 'lucide-react';
import { TableOfContents } from '@/components/blog';
import { HeroSection } from '@/components/hero';
import { processHtmlContent, calculateReadingTime } from '@/lib/blog-utils';
import { sanitizeHtml } from '@/lib/sanitize';
import { revueInterneAutorisee } from '@/lib/revue-interne/acces';
import {
  PREVIEWS,
  lireArticleRevue,
  insererEmplacements,
  decouperAuxModules,
  type ArticleRevue,
} from '../donnees';
import { lireModules } from '../modules';
import ModuleRevue from '../ModuleRevue';
import styles from '../revue.module.css';

/**
 * Previews internes du dossier AI Act (B, C, D), pour relecture seulement.
 * FR seul ; noindex, nofollow, noarchive ; absentes du sitemap, de la
 * navigation et du maillage public. D41 reste en vigueur : rien ici ne vaut
 * création, validation ni publication.
 *
 * Garde d'environnement (`revueInterneAutorisee`) : pages construites sur une
 * Preview Vercel ou en développement local seulement ; 404 en production, en CI
 * et hors Vercel. La protection SSO des Preview reste requise.
 */

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  if (!revueInterneAutorisee('fr', process.env)) return [];
  return PREVIEWS.map((p) => ({ lang: 'fr', slug: p.slug }));
}

// Toute autre langue ou tout autre slug → 404.
export const dynamicParams = false;

const ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  noarchive: true,
  nocache: true,
  googleBot: { index: false, follow: false, noarchive: true },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = revueInterneAutorisee(lang, process.env) ? lireArticleRevue(slug) : null;
  if (!article) return { title: 'Preview introuvable', robots: ROBOTS };
  return {
    title: article.metaTitle || article.title,
    description: article.description,
    robots: ROBOTS,
    // Aucune canonique ni alternate : ces pages n'ont pas d'URL publique.
    // Open Graph et Twitter remplacent ceux du layout, qui pointeraient
    // og:url et l'image de partage vers la page d'accueil publique.
    openGraph: { title: 'Revue interne — non publiée', description: 'Preview interne, accès réservé.' },
    twitter: { card: 'summary', title: 'Revue interne — non publiée', description: 'Preview interne, accès réservé.' },
  };
}

// Classes de prose reprises de app/[lang]/blog/[slug]/page.tsx, pour un rendu
// identique à celui d'un article publié. Gabarit du blog non modifié.
const articleProseClasses = [
  'blog-article prose prose-lg max-w-none',
  'prose-headings:font-heading prose-headings:text-future-dusk-900',
  'prose-p:text-future-dusk-600 prose-p:leading-relaxed',
  'prose-li:text-future-dusk-600',
  'prose-strong:text-future-dusk-900',
  'prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700',
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24',
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-future-dusk-800 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-very-peri-500 [&_blockquote]:italic [&_blockquote]:pl-4 [&_blockquote]:text-future-dusk-500',
  '[&_:not(pre)>code]:bg-neutral-100 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm',
  '[&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-8',
].join(' ');

function NavigationDossier({ courant }: { courant: string }) {
  return (
    <nav aria-label="Dossier AI Act — previews internes" className={styles.dossier}>
      <p>Dossier AI Act — previews internes</p>
      <ul>
        {PREVIEWS.map((p) => (
          <li key={p.slug}>
            {p.slug === courant ? (
              <span aria-current="page">
                {p.code} — {p.libelle}
              </span>
            ) : (
              <Link href={`/fr/revue-interne/ai-act/${p.slug}`} rel="nofollow">
                {p.code} — {p.libelle}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BandeauRelecture({ article }: { article: ArticleRevue }) {
  const metaTitle = article.metaTitle || article.title;
  return (
    <div className={styles.bandeau} role="note">
      <strong>Preview interne de relecture — article {article.code}.</strong> Non publiée, non indexée,
      non validée éditorialement ni juridiquement ; D41 reste en vigueur. {article.statut} Source :{' '}
      {article.source}.
      <details className={styles.seo}>
        <summary>SEO de preview (proposition)</summary>
        <dl>
          <dt>URL envisagée</dt>
          <dd>/fr/blog/{article.slugPropose} (non réservée)</dd>
          <dt>Balise title</dt>
          <dd>
            {metaTitle} ({metaTitle.length} caractères)
          </dd>
          <dt>Meta description</dt>
          <dd>
            {article.description} ({article.description.length} caractères)
          </dd>
          <dt>H1</dt>
          <dd>{article.h1 || article.title}</dd>
          <dt>Robots</dt>
          <dd>noindex, nofollow, noarchive</dd>
        </dl>
      </details>
    </div>
  );
}

export default async function PreviewRevuePage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!revueInterneAutorisee(lang, process.env)) notFound();
  const article = lireArticleRevue(slug);
  if (!article) notFound();

  const modules = lireModules(slug);
  const processed = processHtmlContent(
    insererEmplacements(article.content, article.visuels, new Set(modules.keys())),
  );
  const segments = decouperAuxModules(
    sanitizeHtml(processed.processedHtml),
    new Map([...modules.values()].map((m) => [m.id, m.section])),
  );
  const fiches = new Map(article.visuels.map((v) => [v.id, v]));
  const title = article.h1 || article.title;
  const readingTime = article.readingTime ?? calculateReadingTime(processed.wordCount);
  const headings = processed.headings;
  const ouverture = article.visuels.find((v) => v.emplacement === 'ouverture');
  const courante = PREVIEWS.find((p) => p.slug === slug);

  return (
    <div className={styles.revue}>
      <HeroSection
        compact
        align="left"
        breadcrumb={
          <p className="flex items-center gap-2 text-sm font-heading font-normal text-future-dusk-300 mb-6">
            <span>Revue interne</span>
            <span aria-hidden="true">/</span>
            <span>Dossier AI Act</span>
            <span aria-hidden="true">/</span>
            <span className="text-very-peri-300">Article {courante?.code}</span>
          </p>
        }
        title={title}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime} min de lecture
          </span>
          {article.author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
          )}
        </div>
      </HeroSection>

      {ouverture && (
        // Emplacement de l'image d'en-tête : même conteneur que l'image d'un article publié.
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
          <div className={styles.cadre} style={{ aspectRatio: ouverture.ratio.replace(':', ' / ') }}>
            <p className={styles.id}>Visuel {ouverture.id} à intégrer — image d’en-tête</p>
            <p className={styles.message}>{ouverture.message}</p>
            <p className={styles.format}>{ouverture.ratio} · largeur du conteneur d’en-tête</p>
          </div>
        </div>
      )}

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:flex lg:justify-center lg:gap-12">
            <div className="min-w-0 flex-1 max-w-prose mx-auto lg:mx-0">
              <BandeauRelecture article={article} />
              <div className="mb-8">
                <NavigationDossier courant={slug} />
              </div>
              {headings.length > 0 && (
                <div className="lg:hidden mb-8">
                  <TableOfContents headings={headings} title="Sommaire" collapsible />
                </div>
              )}
              <article className={articleProseClasses}>
                {segments.map((s, i) =>
                  s.type === 'html' ? (
                    <div key={i} dangerouslySetInnerHTML={{ __html: s.html }} />
                  ) : (
                    <ModuleRevue
                      key={s.id}
                      module={modules.get(s.id)!}
                      visuelAttendu={fiches.get(s.id)?.message}
                      legendeAttendue={fiches.get(s.id)?.legende}
                    />
                  ),
                )}
              </article>
              {article.notesRelecture && article.notesRelecture.length > 0 && (
                <aside className={styles.notes} aria-label="Notes de la réécriture, hors texte de l'article">
                  <p className={styles.notesTitre}>Notes de la réécriture — hors texte de l’article</p>
                  {article.notesRelecture.map((note, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: sanitizeHtml(note) }} />
                  ))}
                </aside>
              )}
            </div>
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} title="Sommaire" />
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {article.faqs.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-future-dusk-900 mb-10">
              Questions fréquentes
            </h2>
            {article.sourceFaq && <p className={styles.sourceFaq}>{article.sourceFaq}</p>}
            <div className="space-y-4">
              {article.faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-neutral-100 bg-white">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-future-dusk-900 hover:text-very-peri-600 transition-colors">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 text-future-dusk-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-future-dusk-600 whitespace-pre-line">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <NavigationDossier courant={slug} />
        </div>
      </section>
    </div>
  );
}
