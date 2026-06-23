// Sections de maillage interne éditorial — vertical bijoux/horlogerie (P1).
// Rendues côté template, sans modifier la prose des articles/guides.
// Les ancres des liens reprennent le TITRE réel des contenus (descriptif,
// porteur du mot-clé cible), conformément au plan de maillage chirurgical.

import { Link } from '@/i18n/routing';
import { ArrowRight, BookOpen, Camera, Compass } from 'lucide-react';
import { getGuide, getArticle, type Lang } from '@/lib/content';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import {
  SECTOR_RESOURCES_MAP,
  CONTENT_PRODUCT_MAP,
  GUIDE_RELATED_MAP,
} from '@/data/content-maillage';

interface ResourceLink {
  href: string;
  title: string;
  description: string;
}

function resolveGuides(slugs: string[], lang: Lang): ResourceLink[] {
  return slugs
    .map((s) => {
      const g = getGuide(s, lang);
      return g ? { href: `/guide/${s}`, title: g.title, description: g.description } : null;
    })
    .filter((x): x is ResourceLink => Boolean(x));
}

function resolveArticles(slugs: string[], lang: Lang): ResourceLink[] {
  return slugs
    .map((s) => {
      const a = getArticle(s, lang);
      return a ? { href: `/blog/${s}`, title: a.title, description: a.description } : null;
    })
    .filter((x): x is ResourceLink => Boolean(x));
}

/* ─────────────────────────────────────────────────────────────
   P1.A — Ressources sur la page hub /industrie/[slug]
   Le hub irrigue ses guides et articles (anti cul-de-sac).
   ───────────────────────────────────────────────────────────── */
export function SectorResources({ slug, lang }: { slug: string; lang: string }) {
  const map = SECTOR_RESOURCES_MAP[slug];
  if (!map) return null;

  const isFr = lang === 'fr';
  const items = [
    ...resolveGuides(map.guides, lang as Lang),
    ...resolveArticles(map.articles, lang as Lang),
  ];
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-future-dusk-0 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
            {isFr ? 'GUIDES & RESSOURCES' : 'GUIDES & RESOURCES'}
          </span>
          <h3 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
            {isFr ? 'Pour réussir vos visuels' : 'To master your visuals'}
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.href}
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
   P1.B / P1.D — Studio recommandé (tunnel de conversion)
   Sur les guides/articles bijoux/montre -> page produit.
   ───────────────────────────────────────────────────────────── */
export function RecommendedStudio({ contentSlug, lang }: { contentSlug: string; lang: string }) {
  const rec = CONTENT_PRODUCT_MAP[contentSlug];
  if (!rec) return null;
  const machine = MACHINES.find((m) => m.id === rec.machineId);
  if (!machine) return null;

  const isFr = lang === 'fr';
  const explicit = isFr ? rec.anchorFr : rec.anchorEn;
  let anchor = explicit;
  if (!anchor) {
    const usages = (machine.useCases ?? []).slice(0, 2).join(' & ').toLowerCase();
    anchor = usages
      ? `${machine.nom} — ${isFr ? 'studio photo' : 'photo studio'} ${usages}`
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
              {isFr ? 'Studio recommandé pour ce sujet' : 'Recommended studio for this topic'}
            </p>
            <Link
              href={`/studio-photo/${machine.id}`}
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

  const isFr = lang === 'fr';
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
          {isFr ? 'Pour aller plus loin' : 'Go further'}
        </h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.href}>
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
