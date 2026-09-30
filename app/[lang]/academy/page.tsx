import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { buildLanguages } from '@/lib/hreflang';

// Page servie en français uniquement : /en/academy et /de-ch/academy redirigent en
// 301 vers /fr/academy (next.config.ts). Les informations réglementaires (programmes,
// prérequis, durées, tarifs, accessibilité) vivent dans le catalogue de formation :
// la page n'en recopie rien, elle y renvoie. Décision du 25/09/2026, en vue de
// l'audit de surveillance Qualiopi du 16/10/2026.

const URL_PAGE = 'https://www.packshot-creator.com/fr/academy';
const CATALOGUE = 'https://packshotcreator.catalogueformpro.com/';

const FORMATIONS = [
  {
    label: 'Essential Training, distanciel, 4\u00a0h',
    href: 'https://packshotcreator.catalogueformpro.com/0/packshot/3057264/essential-training-distanciel-version-2026',
  },
  {
    label: 'Master Training, présentiel, 7\u00a0h',
    href: 'https://packshotcreator.catalogueformpro.com/0/packshot/3162813/master-training-presentiel-version-2026',
  },
] as const;

const TITRE = 'Formations aux studios photo Orbitvu';
const META_TITRE = 'Formations aux studios photo Orbitvu | PackshotCreator';
const META_DESCRIPTION =
  'Prise en main et maîtrise des studios photo Orbitvu : Essential Training (distanciel, 4 h) et Master Training (présentiel, 7 h). Tout le détail dans notre catalogue.';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = `/api/og?title=${encodeURIComponent(TITRE)}&type=formation&lang=fr`;
  return {
    title: META_TITRE,
    description: META_DESCRIPTION,
    alternates: {
      canonical: URL_PAGE,
      languages: buildLanguages('/fr/academy'),
    },
    openGraph: {
      title: META_TITRE,
      description: META_DESCRIPTION,
      type: 'website',
      url: URL_PAGE,
      siteName: 'PackshotCreator',
      locale: 'fr_FR',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: META_TITRE,
      description: META_DESCRIPTION,
      images: [ogImage],
    },
  };
}

export default async function AcademyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Filet de sécurité : les redirections de next.config.ts passent avant.
  if (lang !== 'fr') permanentRedirect('/fr/academy');

  const breadcrumbs = [
    { name: 'PackshotCreator', url: 'https://www.packshot-creator.com/fr' },
    { name: 'Formations', url: URL_PAGE },
  ];

  return (
    <>
      <HeroSection
        title={TITRE}
        subtitle={
          <>
            <p>
              PackshotCreator forme les équipes de ses clients à la prise en main et à la
              maîtrise des studios photo automatisés Orbitvu. Nos formations s&apos;adressent
              à tout utilisateur des solutions Orbitvu.
            </p>
            <p className="mt-4">
              Programmes, prérequis, tarifs, modalités et accessibilité sont détaillés dans
              notre catalogue de formation.
            </p>
          </>
        }
      >
        <div className="grid gap-4 max-w-xl lg:max-w-4xl lg:grid-cols-2 mx-auto">
          {FORMATIONS.map((formation) => (
            <a
              key={formation.href}
              href={formation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center justify-between gap-3 rounded-xl bg-very-peri-500 px-6 py-4 text-left text-base sm:text-lg font-semibold text-white shadow-lg shadow-very-peri-500/25 transition-colors hover:bg-very-peri-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-future-dusk-900"
            >
              <span>{formation.label}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only"> (ouvre la fiche du catalogue dans un nouvel onglet)</span>
            </a>
          ))}
        </div>
        <p className="mt-8">
          <a
            href={CATALOGUE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-medium text-very-peri-200 underline underline-offset-4 hover:text-white transition-colors"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            Consulter notre catalogue de formation
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </p>
      </HeroSection>

      <section className="bg-white py-10">
        <p className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-sm text-future-dusk-600 leading-relaxed">
          Sysnext est un organisme de formation certifié Qualiopi. La certification qualité a
          été délivrée au titre de la catégorie d&apos;action suivante : ACTIONS DE FORMATION.
        </p>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
