import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';

interface Formation {
  _id: string;
  titre: string;
  slug: { current: string };
  categorie: 'packshot' | 'ia';
  niveau: 1 | 2 | 3;
  format: 'blended' | 'presentiel' | 'both';
  prix_blended?: number;
  prix_presentiel: number;
  duree_heures: number;
  description_courte: string;
  eligible_opco: boolean;
}

async function getFormations(): Promise<Formation[]> {
  return await client.fetch(
    `*[_type == "formation"] | order(categorie asc, niveau asc) {
      _id,
      titre,
      slug,
      categorie,
      niveau,
      format,
      prix_blended,
      prix_presentiel,
      duree_heures,
      description_courte,
      eligible_opco
    }`
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  return {
    title: `Formation Photo Produit & IA | ${t('meta.suffix')}`,
    description: t('meta.description'),
  };
}

export default async function AcademyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const formations = await getFormations();
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const formationsIA = formations.filter((f) => f.categorie === 'ia');
  const formationsPackshot = formations.filter((f) => f.categorie === 'packshot');

  return (
    <div className="min-h-screen bg-neutral-lighter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-turquoise to-primary-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <BadgeQualiopi className="text-white border-white">Certifié Qualiopi</BadgeQualiopi>
            <Badge variant="default" className="bg-white/20 text-white border-white/40">
              Financement OPCO 100%
            </Badge>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Packshot-Creator Academy
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8">
            Formations certifiées pour maîtriser la photo packshot professionnelle et l'IA générative appliquée au
            visuel produit
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">3 Niveaux</div>
              <div className="text-sm text-white/80">Fondation → Maîtrise → Expert</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">2 Formats</div>
              <div className="text-sm text-white/80">Blended Learning ou Présentiel</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">100% OPCO</div>
              <div className="text-sm text-white/80">Prise en charge complète possible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations IA Photo Produit */}
      {formationsIA.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-heading text-4xl font-bold text-neutral-dark">IA Photo Produit</h2>
              <Badge variant="purple">BlendAI</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationsIA.map((formation) => (
                <Link
                  key={formation._id}
                  href={`/${lang}/academy/${formation.slug.current}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-light hover:border-primary-turquoise"
                >
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      <Badge variant="purple" className="text-xs">
                        Niveau {formation.niveau}
                      </Badge>
                      {formation.eligible_opco && (
                        <Badge variant="green" className="text-xs">
                          OPCO
                        </Badge>
                      )}
                    </div>

                    {/* Titre */}
                    <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary-turquoise transition-colors">
                      {formation.titre}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-medium mb-4 line-clamp-3">{formation.description_courte}</p>

                    {/* Infos */}
                    <div className="flex items-center justify-between text-sm border-t border-neutral-light pt-4">
                      <div>
                        <div className="text-neutral-medium">Durée</div>
                        <div className="font-bold text-neutral-dark">{formation.duree_heures}h</div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-medium">À partir de</div>
                        <div className="font-bold text-primary-turquoise">
                          {formation.prix_blended || formation.prix_presentiel}€ HT
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formations Packshot */}
      {formationsPackshot.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-heading text-4xl font-bold text-neutral-dark">Packshot Photo Produit</h2>
              <Badge variant="default">Orbitvu</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationsPackshot.map((formation) => (
                <Link
                  key={formation._id}
                  href={`/${lang}/academy/${formation.slug.current}`}
                  className="group bg-neutral-lighter rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-light hover:border-primary-turquoise"
                >
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      <Badge variant="default" className="text-xs">
                        Niveau {formation.niveau}
                      </Badge>
                      {formation.eligible_opco && (
                        <Badge variant="green" className="text-xs">
                          OPCO
                        </Badge>
                      )}
                    </div>

                    {/* Titre */}
                    <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary-turquoise transition-colors">
                      {formation.titre}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-medium mb-4 line-clamp-3">{formation.description_courte}</p>

                    {/* Infos */}
                    <div className="flex items-center justify-between text-sm border-t border-neutral-light pt-4">
                      <div>
                        <div className="text-neutral-medium">Durée</div>
                        <div className="font-bold text-neutral-dark">{formation.duree_heures}h</div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-medium">Prix</div>
                        <div className="font-bold text-primary-turquoise">{formation.prix_presentiel}€ HT</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Qualiopi */}
      <section id="qualiopi" className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BadgeQualiopi className="mx-auto mb-6 text-lg">Organisme de Formation Certifié Qualiopi</BadgeQualiopi>

          <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
            Financement OPCO à 100% possible
          </h2>

          <p className="text-lg text-neutral-medium mb-8">
            Toutes nos formations sont certifiées Qualiopi et éligibles au financement par votre OPCO. Contactez-nous
            pour étudier votre prise en charge.
          </p>

          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-primary-turquoise hover:bg-primary-dark text-white font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Demander une prise en charge OPCO
          </Link>
        </div>
      </section>
    </div>
  );
}
