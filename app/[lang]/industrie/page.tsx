import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SectorGrid, { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import CTABox from '@/components/sections/CTABox';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: 'Solutions Photo Produit par Industrie | Studios Automatisés & IA',
    description:
      'Solutions packshot et IA photo produit adaptées à votre industrie : chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique et plus. Studios Orbitvu + BlendAI.',
    keywords: 'photo produit industrie, packshot secteur, studio photo automatisé, IA lifestyle, chaussures, bijoux, mobilier, food, cosmétiques',
    openGraph: {
      title: 'Solutions Photo Produit par Industrie',
      description:
        'Solutions packshot et IA adaptées à chaque industrie : studios automatisés Orbitvu + BlendAI lifestyle.',
      images: ['/og-image-industries.jpg'],
    },
  };
}

export default async function IndustriesPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary-orbitvu via-primary-orbitvu to-primary-turquoise text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                Solutions Photo Produit par Industrie
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8">
                Studios photo automatisés Orbitvu et IA BlendAI adaptés aux spécificités de votre secteur
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Chaque industrie a ses défis photo produit : reflets, matières, volumes, lifestyle. Découvrez nos solutions packshot et IA personnalisées pour 12 secteurs clés.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12 Industries */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
                12 Secteurs d'Activité Couverts
              </h2>
              <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
                De la chaussure à la joaillerie, du mobilier à l'électronique : solutions photo produit professionnelles pour tous les secteurs e-commerce.
              </p>
            </div>

            <SectorGrid sectors={DEFAULT_SECTORS} columns={4} />
          </div>
        </section>

        {/* Section Bénéfices Communs */}
        <section className="py-20 bg-neutral-lighter">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12 text-neutral-dark">
              Avantages pour Toutes les Industries
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Avantage 1 */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-heading font-bold text-neutral-dark mb-3">
                  Production Accélérée
                </h3>
                <p className="text-neutral-medium">
                  Studios automatisés : 50-300 produits/jour. IA lifestyle : 100-500 visuels/jour. Délais réduits de 70-90% vs shootings manuels.
                </p>
              </div>

              {/* Avantage 2 */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-heading font-bold text-neutral-dark mb-3">
                  ROI Rapide
                </h3>
                <p className="text-neutral-medium">
                  Retour sur investissement 12-18 mois. Réduction coûts photo 60-85%. Idéal pour catalogues 100-5000+ références.
                </p>
              </div>

              {/* Avantage 3 */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-heading font-bold text-neutral-dark mb-3">
                  Cohérence Absolue
                </h3>
                <p className="text-neutral-medium">
                  Même qualité d'image sur tout le catalogue. Éclairage, angles, ambiances identiques. Renforce identité de marque.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Workflow Type */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-4 text-neutral-dark">
              Workflow Type : Packshot + IA Lifestyle
            </h2>
            <p className="text-lg text-neutral-medium text-center mb-12 max-w-3xl mx-auto">
              Le processus standard pour tous les secteurs : capture packshot haute qualité, puis génération lifestyle IA.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Étape 1 */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-orbitvu text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                      Capture Packshot Automatisée
                    </h3>
                    <p className="text-neutral-medium">
                      Studios Orbitvu : packshot fond blanc haute résolution, 360° optionnel, détourage automatique. Cohérence absolue sur tout le catalogue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-turquoise text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                      Génération Lifestyle IA
                    </h3>
                    <p className="text-neutral-medium">
                      BlendAI : transformez packshots en visuels lifestyle (portés, ambiances, contextes). Personnalisation ADN marque. Production série rapide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-orbitvu text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                      Diffusion Multi-Canal
                    </h3>
                    <p className="text-neutral-medium">
                      Export formats optimisés e-commerce, marketplaces, réseaux sociaux, print. Catalogues complets en quelques jours vs semaines/mois.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visuel Placeholder */}
              <div className="bg-gradient-to-br from-neutral-lighter to-neutral-light rounded-xl p-12 flex items-center justify-center aspect-square">
                <div className="text-center">
                  <div className="text-6xl mb-4">📸 ➡️ 🤖 ➡️ 🌐</div>
                  <p className="text-neutral-medium font-semibold">
                    Packshot → IA → Diffusion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA Finale */}
        <section className="py-20 bg-neutral-lighter">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CTA Contact */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                  Votre Secteur Nécessite une Solution Spécifique ?
                </h3>
                <p className="text-neutral-medium mb-6">
                  Contactez-nous pour une analyse personnalisée de vos besoins photo produit. Devis studios Orbitvu + formation BlendAI gratuite.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-secondary-orbitvu hover:bg-primary-orbitvu text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Demander un Devis Personnalisé
                </a>
              </div>

              {/* CTA Démo */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                  Voir les Solutions en Action
                </h3>
                <p className="text-neutral-medium mb-6">
                  Réservez une démo personnalisée : tests packshot avec vos produits + exemples IA lifestyle adaptés à votre secteur.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-primary-turquoise hover:bg-secondary-orbitvu text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Réserver une Démo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
