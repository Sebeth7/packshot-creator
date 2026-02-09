import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Euro, ChevronRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, courseSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

interface Formation {
  titre: string;
  slug: { current: string };
  categorie: 'packshot' | 'ia';
  niveau: 1 | 2 | 3;
  format: 'blended' | 'presentiel' | 'both';
  prix_blended?: number;
  prix_presentiel: number;
  duree_heures: number;
  description_courte: string;
  programme: any[];
  objectifs: string[];
  public_cible: string;
  prerequis?: string;
  eligible_opco: boolean;
  thumbnail?: any;
  livrables?: string[];
}

async function getFormation(slug: string): Promise<Formation | null> {
  return await client.fetch(
    `*[_type == "formation" && slug.current == $slug][0]{
      titre,
      slug,
      categorie,
      niveau,
      format,
      prix_blended,
      prix_presentiel,
      duree_heures,
      description_courte,
      programme,
      objectifs,
      public_cible,
      prerequis,
      eligible_opco,
      thumbnail,
      livrables
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const formation = await getFormation(slug);

  if (!formation) return { title: 'Formation introuvable' };

  const isFr = lang === 'fr';

  return {
    title: `${formation.titre} | PackshotCreator Academy`,
    description: formation.description_courte,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/academy/${slug}`,
      languages: { fr: `/fr/academy/${slug}`, en: `/en/academy/${slug}` },
    },
    openGraph: {
      title: `${formation.titre} | PackshotCreator Academy`,
      images: [{ url: `/api/og?title=${encodeURIComponent(formation.titre)}&type=formation&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function FormationPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const formation = await getFormation(slug);
  const isFr = lang === 'fr';

  if (!formation) notFound();

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Academy', url: `https://www.packshot-creator.com/${lang}/academy` },
    { name: formation.titre, url: `https://www.packshot-creator.com/${lang}/academy/${slug}` },
  ];

  return (
    <>
      {/* Hero Formation */}
      <HeroSection
        compact
        align="left"
        title={
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-sans font-normal text-future-dusk-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {isFr ? 'Accueil' : 'Home'}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/academy" className="hover:text-white transition-colors">
                {isFr ? 'Formation' : 'Training'}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">{formation.titre}</span>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4 font-sans font-normal">
              {formation.eligible_opco && <BadgeQualiopi>Financement OPCO</BadgeQualiopi>}
              <Badge variant="turquoise">Niveau {formation.niveau}</Badge>
              <Badge variant={formation.categorie === 'ia' ? 'purple' : 'default'}>
                {formation.categorie === 'ia' ? 'IA Photo Produit' : 'Packshot'}
              </Badge>
            </div>
            {formation.titre}
          </>
        }
        subtitle={formation.description_courte}
      >
        {/* Infos clés */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8" delay={0.2}>
          <StaggerItem>
            <div className="text-sm text-future-dusk-300">{isFr ? 'Durée' : 'Duration'}</div>
            <div className="text-2xl font-bold">{formation.duree_heures}h</div>
          </StaggerItem>
          {formation.prix_blended && (
            <StaggerItem>
              <div className="text-sm text-future-dusk-300">Blended</div>
              <div className="text-2xl font-bold text-very-peri-300">{formation.prix_blended}€ HT</div>
            </StaggerItem>
          )}
          <StaggerItem>
            <div className="text-sm text-future-dusk-300">{isFr ? 'Présentiel' : 'In-person'}</div>
            <div className="text-2xl font-bold">{formation.prix_presentiel}€ HT</div>
          </StaggerItem>
          <StaggerItem>
            <div className="text-sm text-future-dusk-300">Format</div>
            <div className="text-base font-medium">
              {formation.format === 'both'
                ? (isFr ? 'Blended ou Présentiel' : 'Blended or In-person')
                : formation.format === 'blended'
                  ? 'Blended Learning'
                  : (isFr ? 'Présentiel' : 'In-person')}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl">
            <Link href="/contact">
              {isFr ? 'S\'inscrire à cette formation' : 'Register for this training'}
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
            <Link href="/academy">
              {isFr ? 'Voir toutes les formations' : 'View all trainings'}
            </Link>
          </Button>
        </div>
      </HeroSection>

      {/* Contenu Formation */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            {/* Objectifs */}
            <FadeInView>
              <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                <h2 className="font-heading text-2xl font-bold text-future-dusk-900 mb-6">
                  {isFr ? 'Objectifs pédagogiques' : 'Learning objectives'}
                </h2>
                <ul className="space-y-3">
                  {formation.objectifs.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-very-peri-500 mt-0.5 shrink-0" />
                      <span className="text-future-dusk-600">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>

            {/* Livrables */}
            {formation.livrables && formation.livrables.length > 0 && (
              <FadeInView delay={0.1}>
                <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <h2 className="font-heading text-2xl font-bold text-future-dusk-900 mb-6">
                    {isFr ? 'Livrables garantis' : 'Guaranteed deliverables'}
                  </h2>
                  <ul className="space-y-3">
                    {formation.livrables.map((livrable, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-future-dusk-600">{livrable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Public cible */}
            <FadeInView direction="right">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h3 className="font-bold text-future-dusk-900 mb-3">
                  {isFr ? 'Public cible' : 'Target audience'}
                </h3>
                <p className="text-sm text-future-dusk-500">{formation.public_cible}</p>
              </div>
            </FadeInView>

            {/* Prérequis */}
            {formation.prerequis && (
              <FadeInView direction="right" delay={0.1}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h3 className="font-bold text-future-dusk-900 mb-3">
                    {isFr ? 'Prérequis' : 'Prerequisites'}
                  </h3>
                  <p className="text-sm text-future-dusk-500">{formation.prerequis}</p>
                </div>
              </FadeInView>
            )}

            {/* OPCO */}
            {formation.eligible_opco && (
              <FadeInView direction="right" delay={0.2}>
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-bold text-emerald-800">Financement OPCO</h3>
                  </div>
                  <p className="text-sm text-emerald-700 mb-3">
                    {isFr
                      ? 'Cette formation est éligible au financement OPCO (prise en charge 100% possible).'
                      : 'This training is eligible for OPCO funding (100% coverage possible).'}
                  </p>
                  <Link
                    href="/academy#qualiopi"
                    className="text-sm text-emerald-800 font-medium underline inline-block hover:no-underline"
                  >
                    {isFr ? 'En savoir plus' : 'Learn more'} →
                  </Link>
                </div>
              </FadeInView>
            )}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        courseSchema({
          name: formation.titre,
          description: formation.description_courte,
          provider: 'PackshotCreator Academy',
          url: `https://www.packshot-creator.com/${lang}/academy/${slug}`,
        }),
      ]} />
    </>
  );
}
