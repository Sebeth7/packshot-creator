import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';
import Link from 'next/link';

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

  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  return {
    title: `${formation.titre} | ${t('meta.suffix')}`,
    description: formation.description_courte,
  };
}

export default async function FormationPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const formation = await getFormation(slug);

  if (!formation) notFound();

  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  return (
    <div className="min-h-screen bg-neutral-lighter">
      {/* Hero Formation */}
      <section className="bg-white border-b border-neutral-light">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-medium mb-6">
            <Link href={`/${lang}`} className="hover:text-secondary-orbitvu transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href={`/${lang}/academy`} className="hover:text-secondary-orbitvu transition-colors">
              Formation
            </Link>
            <span>/</span>
            <span className="text-neutral-dark">{formation.titre}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-4">
            {formation.eligible_opco && <BadgeQualiopi>Financement OPCO</BadgeQualiopi>}
            <Badge variant="turquoise">Niveau {formation.niveau}</Badge>
            <Badge variant={formation.categorie === 'ia' ? 'purple' : 'default'}>
              {formation.categorie === 'ia' ? 'IA Photo Produit' : 'Packshot'}
            </Badge>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">{formation.titre}</h1>

          <p className="text-lg text-neutral-medium mb-6">{formation.description_courte}</p>

          {/* Infos clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-neutral-medium">Durée</div>
              <div className="text-xl font-bold text-neutral-dark">{formation.duree_heures}h</div>
            </div>
            {formation.prix_blended && (
              <div>
                <div className="text-sm text-neutral-medium">Blended</div>
                <div className="text-xl font-bold text-secondary-orbitvu">{formation.prix_blended}€ HT</div>
              </div>
            )}
            <div>
              <div className="text-sm text-neutral-medium">Présentiel</div>
              <div className="text-xl font-bold text-neutral-dark">{formation.prix_presentiel}€ HT</div>
            </div>
            <div>
              <div className="text-sm text-neutral-medium">Format</div>
              <div className="text-base font-medium text-neutral-dark">
                {formation.format === 'both'
                  ? 'Blended ou Présentiel'
                  : formation.format === 'blended'
                    ? 'Blended Learning'
                    : 'Présentiel'}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${lang}/contact`}
              className="inline-block bg-secondary-orbitvu hover:bg-primary-orbitvu text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              S'inscrire à cette formation
            </Link>
            <Link
              href={`/${lang}/academy`}
              className="inline-block bg-white border-2 border-neutral-light hover:border-secondary-orbitvu text-neutral-dark font-medium px-8 py-3 rounded-lg transition-colors"
            >
              ← Voir toutes les formations
            </Link>
          </div>
        </div>
      </section>

      {/* Contenu Formation */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="md:col-span-2 space-y-8">
          {/* Objectifs */}
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">Objectifs pédagogiques</h2>
            <ul className="space-y-3">
              {formation.objectifs.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-secondary-orbitvu mt-1 text-xl">✓</span>
                  <span className="text-neutral-dark">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Livrables */}
          {formation.livrables && formation.livrables.length > 0 && (
            <section className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">Livrables garantis</h2>
              <ul className="space-y-3">
                {formation.livrables.map((livrable, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-secondary-orbitvu text-xl">📦</span>
                    <span className="text-neutral-dark">{livrable}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Public cible */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-neutral-dark mb-3">Public cible</h3>
            <p className="text-sm text-neutral-medium">{formation.public_cible}</p>
          </div>

          {/* Prérequis */}
          {formation.prerequis && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-neutral-dark mb-3">Prérequis</h3>
              <p className="text-sm text-neutral-medium">{formation.prerequis}</p>
            </div>
          )}

          {/* OPCO */}
          {formation.eligible_opco && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-800 mb-2">💶 Financement OPCO</h3>
              <p className="text-sm text-green-700 mb-3">
                Cette formation est éligible au financement OPCO (prise en charge 100% possible).
              </p>
              <Link
                href={`/${lang}/academy#qualiopi`}
                className="text-sm text-green-800 font-medium underline inline-block hover:no-underline"
              >
                En savoir plus →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
