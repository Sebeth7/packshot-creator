// Sections de maillage interne éditorial — vertical bijoux/horlogerie (P1).
// Rendues côté template, sans modifier la prose des articles/guides.
// Les ancres des liens reprennent le TITRE réel des contenus (descriptif,
// porteur du mot-clé cible), conformément au plan de maillage chirurgical.

import { NavLink as Link } from '@/components/layout/NavLink';
import { ArrowRight, BookOpen, Camera, Compass } from 'lucide-react';
import {
  getGuide,
  getArticle,
  getGuideAlternates,
  getBlogAlternates,
  type Lang,
} from '@/lib/content';
import { NOINDEX_EN_BLOG_SLUGS } from '@/lib/seo-config';
import { tx } from '@/lib/locale-text';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import {
  SECTOR_RESOURCES_MAP,
  MONEY_PAGE_RESOURCES_MAP,
  CONTENT_PRODUCT_MAP,
  GUIDE_RELATED_MAP,
} from '@/data/content-maillage';

type ResourceHref =
  | { pathname: '/guide/[slug]'; params: { slug: string } }
  | { pathname: '/blog/[slug]'; params: { slug: string } };

interface ResourceLink {
  href: ResourceHref;
  title: string;
  description: string;
}

/**
 * URL a ne jamais emettre : GSC les liste en 404 au 17/09 et aucune n'a de
 * version dans la locale /en. La resolution par alternates.json ne devrait
 * jamais les produire — cette liste est la ceinture, pas les bretelles.
 */
const URLS_INTERDITES: ReadonlySet<string> = new Set([
  '/en/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
  '/en/blog/financement-formation-opco-guide-complet-pour-studios-photo-2026',
  '/en/blog/formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
  '/en/blog/orbitvu-vs-concurrents',
  '/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026',
  '/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie',
  '/en/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques',
  '/en/blog/ecommerce-jewelry-photography-tutorial',
  '/en/blog/homemade-photo-studio-product-photography',
  '/en/blog/e-commerce-8-elements-indispensables-pour-reussir',
  '/en/blog/lancement-dune-serie-debooks-dediee-au-ecommerce',
]);

/**
 * Les tables de maillage sont ecrites en slugs FR. Les slugs EN et de-ch sont
 * differents : on les resout par `alternates.json`, la meme source que le
 * selecteur de langue. Sans correspondance traduite, le lien est omis — c'est
 * ce qui fait qu'un bloc se masque tout seul dans une locale non couverte.
 */
function resolveGuides(slugs: string[], lang: Lang): ResourceLink[] {
  return slugs
    .map((slugFr) => {
      const fr = getGuide(slugFr, 'fr');
      if (!fr) return null;
      const slug = lang === 'fr' ? slugFr : getGuideAlternates(fr.webflowItemId)[lang];
      if (!slug) return null;
      const g = getGuide(slug, lang);
      if (!g) return null;
      if (URLS_INTERDITES.has(`/${lang}/guide/${slug}`)) return null;
      return {
        href: { pathname: '/guide/[slug]' as const, params: { slug } },
        title: g.title,
        description: g.description,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

function resolveArticles(slugs: string[], lang: Lang): ResourceLink[] {
  return slugs
    .map((slugFr) => {
      const fr = getArticle(slugFr, 'fr');
      if (!fr) return null;
      const slug = lang === 'fr' ? slugFr : getBlogAlternates(fr.webflowItemId)[lang];
      if (!slug) return null;
      const a = getArticle(slug, lang);
      if (!a) return null;
      // Jamais de lien vers une URL noindex : l'autorite s'y deverserait en pure perte.
      if (lang === 'en' && NOINDEX_EN_BLOG_SLUGS.has(slug)) return null;
      if (URLS_INTERDITES.has(`/${lang}/blog/${slug}`)) return null;
      return {
        href: { pathname: '/blog/[slug]' as const, params: { slug } },
        title: a.title,
        description: a.description,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

/* ─────────────────────────────────────────────────────────────
   Bloc de ressources contextuelles — rendu partagé
   Utilisé par les 17 hubs secteurs et par les 6 money pages.
   Se masque entièrement si aucun contenu n'est disponible dans la locale.
   ───────────────────────────────────────────────────────────── */
function ResourcesSection({
  items,
  surtitre,
  titre,
}: {
  items: ResourceLink[];
  surtitre: string;
  titre: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-future-dusk-0 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
            {surtitre}
          </span>
          <h3 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
            {titre}
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={`${item.href.pathname}:${item.href.params.slug}`}
              className="group relative rounded-2xl border border-neutral-100 bg-white p-6 hover:shadow-lg hover:border-very-peri-200 transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-very-peri-50 text-very-peri-600 mb-4">
                <BookOpen className="h-4 w-4" />
              </span>
              <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-2 line-clamp-2">
                <Link
                  href={item.href}
                  className="after:absolute after:inset-0 group-hover:text-very-peri-600 transition-colors"
                >
                  {item.title}
                </Link>
              </h4>
              <p className="text-future-dusk-500 text-sm line-clamp-2">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   P1.A — Ressources sur la page hub /industrie/[slug]
   Le hub irrigue ses guides et articles (anti cul-de-sac).
   ───────────────────────────────────────────────────────────── */
export function SectorResources({ slug, lang }: { slug: string; lang: string }) {
  const map = SECTOR_RESOURCES_MAP[slug];
  if (!map) return null;

  const items = [
    ...resolveGuides(map.guides, lang as Lang),
    ...resolveArticles(map.articles, lang as Lang),
  ];

  return (
    <ResourcesSection
      items={items}
      surtitre={tx(lang, 'GUIDES & RESSOURCES', 'GUIDES & RESOURCES', 'RATGEBER & RESSOURCEN')}
      titre={tx(lang, 'Pour réussir vos visuels', 'To master your visuals', 'Für überzeugende Produktbilder')}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   2026-09 — Ressources sur les money pages
   Les 4 landings packshot-*, /studios-photo-automatises et
   /ia-photo-produit irriguent le blog et les guides de leur univers.
   Constat du crawl du 17/09 : Link Score blog et guides = 1, contre
   84 pour les money pages, qui ne leur renvoyaient rien.
   ───────────────────────────────────────────────────────────── */
export function MoneyPageResources({ slug, lang }: { slug: string; lang: string }) {
  const map = MONEY_PAGE_RESOURCES_MAP[slug];
  if (!map) return null;

  const items = [
    ...resolveGuides(map.guides, lang as Lang),
    ...resolveArticles(map.articles, lang as Lang),
  ];

  return (
    <ResourcesSection
      items={items}
      surtitre={tx(lang, 'GUIDES & RESSOURCES', 'GUIDES & RESOURCES', 'RATGEBER & RESSOURCEN')}
      titre={tx(lang, 'Pour aller plus loin', 'Go further', 'Mehr erfahren')}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   P1.B / P1.D — Studio recommandé (tunnel de conversion)
   Sur les guides/articles bijoux/montre -> page produit.
   ───────────────────────────────────────────────────────────── */
export function RecommendedStudio({ contentSlug, lang }: { contentSlug: string; lang: string }) {
  const rec = CONTENT_PRODUCT_MAP[contentSlug];
  if (!rec) return null;
  const machine = MACHINES.find((m) => m.id === rec.machineId);
  if (!machine) return null;

  const explicit = lang === 'fr' ? rec.anchorFr : lang === 'en' ? rec.anchorEn : lang === 'de-ch' ? rec.anchorDe : undefined;
  let anchor = explicit;
  if (!anchor) {
    const usages = (machine.useCases ?? []).slice(0, 2).join(' & ').toLowerCase();
    anchor = usages
      ? `${machine.nom} — ${tx(lang, 'studio photo', 'photo studio', 'Fotostudio')} ${usages}`
      : machine.nom;
  }

  return (
    <section className="py-12 bg-very-peri-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-very-peri-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-600 shrink-0">
            <Camera className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="text-sm text-future-dusk-500 mb-1">
              {tx(lang, 'Studio recommandé pour ce sujet', 'Recommended studio for this topic', 'Empfohlenes Fotostudio für dieses Thema')}
            </p>
            <Link
              href={{ pathname: '/studio-photo/[slug]', params: { slug: machine.id } }}
              className="text-lg font-heading font-bold text-very-peri-700 hover:text-very-peri-800 inline-flex items-center gap-2 transition-colors"
            >
              {anchor}
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   P1.C — « Pour aller plus loin » sur les guides
   Reconnecte notamment l'article orphelin « photographier-une-bague ».
   ───────────────────────────────────────────────────────────── */
export function GuideRelated({ guideSlug, lang }: { guideSlug: string; lang: string }) {
  const map = GUIDE_RELATED_MAP[guideSlug];
  if (!map) return null;

  const items = [
    ...resolveGuides(map.guides, lang as Lang),
    ...resolveArticles(map.articles, lang as Lang),
  ];
  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-future-dusk-900 mb-6 flex items-center gap-2">
          <Compass className="h-5 w-5 text-very-peri-600" />
          {tx(lang, 'Pour aller plus loin', 'Go further', 'Mehr erfahren')}
        </h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`${item.href.pathname}:${item.href.params.slug}`}>
              <Link
                href={item.href}
                className="group inline-flex items-center gap-2 text-future-dusk-700 hover:text-very-peri-600 font-medium transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-very-peri-500 shrink-0" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
