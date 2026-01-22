import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { Link } from '@/i18n/routing';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

async function getFormationsPackshot(): Promise<Formation[]> {
  return await client.fetch(
    `*[_type == "formation" && categorie == "packshot"] | order(niveau asc) {
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

// Composant Card Formation
function FormationCard({ formation, lang }: { formation: Formation; lang: string }) {
  return (
    <Link
      href={`/academy/${formation.slug.current}`}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-2 mb-3">
        {formation.eligible_opco && <BadgeQualiopi>OPCO</BadgeQualiopi>}
        <Badge variant="default">Niveau {formation.niveau}</Badge>
      </div>

      <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
        {formation.titre}
      </h3>

      <p className="text-sm text-neutral-medium mb-4 line-clamp-3">
        {formation.description_courte}
      </p>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-neutral-medium">
          Durée : <strong>{formation.duree_heures}h</strong>
        </div>
        {formation.prix_blended && (
          <div className="text-sm text-neutral-medium">
            Blended : <strong className="text-secondary-orbitvu">{formation.prix_blended}€ HT</strong>
          </div>
        )}
        <div className="text-sm text-neutral-medium">
          Présentiel : <strong>{formation.prix_presentiel}€ HT</strong>
        </div>
      </div>

      <div className="text-secondary-orbitvu font-medium text-sm">
        En savoir plus →
      </div>
    </Link>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'formation.meta' });

  return {
    title: `Formations Studios Photo Orbitvu - ${t('title')}`,
    description: 'Formations certifiées Qualiopi sur les studios photo automatisés Orbitvu. Maîtrisez la photographie packshot professionnelle et les solutions Orbitvu.',
  };
}

export default async function FormationsPackshotPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const formations = await getFormationsPackshot();
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  return (
    <>
      <Header />
      <main>
        {/* SECTION 1 : Hero Packshot */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex gap-3 mb-4">
              <BadgeQualiopi>Certifié Qualiopi</BadgeQualiopi>
              <Badge variant="blue">Financement OPCO</Badge>
              <Badge variant="default">Studios Orbitvu</Badge>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              📸 Formations Studios Photo Orbitvu
            </h1>

            <p className="text-xl text-neutral-medium mb-6 max-w-3xl">
              Maîtrisez les studios photo automatisés Orbitvu pour produire des packshots e-commerce professionnels.
              Formations certifiées avec financement OPCO disponible.
            </p>

            <div className="flex gap-4">
              <a
                href="#formations"
                className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark font-medium px-8 py-3 rounded-lg"
              >
                Voir les formations
              </a>
              <Link
                href="/academy/calendrier"
                className="inline-block bg-white border-2 border-neutral-light hover:border-[#cdcdfd] text-neutral-dark font-medium px-8 py-3 rounded-lg"
              >
                📅 Calendrier
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2 : Pourquoi se former Orbitvu */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Pourquoi se former aux studios Orbitvu ?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-bold text-lg mb-2">Productivité x10</h3>
                <p className="text-sm text-neutral-medium">
                  Automatisez vos prises de vue et réduisez le temps de production de 90%
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2">Qualité professionnelle</h3>
                <p className="text-sm text-neutral-medium">
                  Des images parfaitement calibrées selon les standards e-commerce
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="font-bold text-lg mb-2">ROI rapide</h3>
                <p className="text-sm text-neutral-medium">
                  Rentabilisez votre investissement en moins de 6 mois
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : Catalogue Formations Packshot */}
        <section id="formations" className="py-16 bg-neutral-lighter">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-2 text-center">
              {t('catalogue.packshot_heading')}
            </h2>
            <p className="text-neutral-medium mb-8 text-center max-w-3xl mx-auto">
              {t('catalogue.packshot_subtitle')}
            </p>

            {formations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {formations.map(formation => (
                  <FormationCard key={formation._id} formation={formation} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-neutral-medium">
                  Aucune formation disponible pour le moment. Contactez-nous pour en savoir plus.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4 : Qualiopi/OPCO */}
        <section id="qualiopi" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Colonne Qualiopi */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
                  🏆 {t('qualiopi.heading')}
                </h2>
                <p className="text-neutral-medium mb-4">
                  {t('qualiopi.description')}
                </p>
                <ul className="space-y-2 text-sm text-neutral-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd]">✓</span>
                    <span>{t('qualiopi.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd]">✓</span>
                    <span>{t('qualiopi.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd]">✓</span>
                    <span>{t('qualiopi.feature3')}</span>
                  </li>
                </ul>
              </div>

              {/* Colonne OPCO */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h2 className="font-heading text-2xl font-bold text-blue-800 mb-4">
                  💶 {t('opco.heading')}
                </h2>
                <p className="text-blue-700 mb-4">
                  <strong>{t('opco.description')}</strong>
                </p>
                <div className="space-y-3 text-sm text-blue-700">
                  <div>
                    <strong>Pour les salariés :</strong> {t('opco.salaries')}
                  </div>
                  <div>
                    <strong>Pour les indépendants :</strong> {t('opco.independants')}
                  </div>
                </div>
                <Link
                  href="/blog/financement-formation-opco-guide"
                  className="inline-block mt-4 text-blue-800 font-medium underline"
                >
                  {t('opco.cta')} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 : CTA Calendrier */}
        <section className="py-16 bg-gradient-to-br from-[#cdcdfd]/20 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
              Prêt à vous former ?
            </h2>
            <p className="text-neutral-medium mb-8">
              Consultez notre calendrier pour choisir votre session de formation
            </p>
            <Link
              href="/academy/calendrier"
              className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark font-medium px-8 py-4 rounded-lg text-lg"
            >
              📅 Voir le calendrier des sessions
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
