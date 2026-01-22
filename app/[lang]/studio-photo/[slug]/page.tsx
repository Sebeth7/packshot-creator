import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BadgeIAReady, BadgeDistributor } from '@/components/shared/Badge';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { MACHINES, getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import type { Machine } from '@/components/calculators/ROICalculator/lib/types';
import Image from 'next/image';

// Générer les routes statiques pour tous les produits
export function generateStaticParams() {
  return MACHINES.map((machine) => ({
    slug: machine.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);

  if (!machine) {
    return {
      title: 'Produit non trouvé',
    };
  }

  return {
    title: `${machine.nom} - Studio Photo Automatisé Orbitvu`,
    description: `${machine.nom} : ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].fr}`,
    keywords: `${machine.nom}, studio photo automatisé, packshot, Orbitvu, ${machine.useCases.join(', ')}`,
  };
}

// Mapping formation par catégorie de machine
function getFormationSlug(machine: Machine): string {
  // Pour les machines IA-ready, on suggère la formation Packshot niveau adapté
  if (machine.tailleCategories.includes('petit')) {
    return 'packshot-niveau-1-debutant';
  } else if (machine.tailleCategories.includes('grand') || machine.tailleCategories.includes('tres-grand')) {
    return 'packshot-niveau-3-expert';
  } else {
    return 'packshot-niveau-2-intermediaire';
  }
}

export default async function StudioPhotoProductPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);

  if (!machine) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: 'studioProduct' });
  const formationSlug = getFormationSlug(machine);
  const isIAReady = ['alphashot-g2', 'alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'].includes(machine.id);

  return (
    <>
      <Header />
      <main>
        {/* SECTION 1 : Hero Produit */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Colonne Gauche : Image */}
              <div className="relative h-96 bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif"
                  alt={`Studio photo ${machine.nom}`}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              {/* Colonne Droite : Infos */}
              <div>
                <div className="flex gap-3 mb-4">
                  <BadgeDistributor>Orbitvu</BadgeDistributor>
                  {isIAReady && <BadgeIAReady>IA Ready</BadgeIAReady>}
                </div>

                <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                  {machine.nom}
                </h1>

                <p className="text-xl text-neutral-medium mb-6">
                  {machine.useCases.join(' • ')}
                </p>

                {/* Specs rapides */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-neutral-lighter rounded-lg p-6">
                  <div>
                    <div className="text-sm text-neutral-medium mb-1">Taille max</div>
                    <div className="font-bold text-neutral-dark">{machine.tailleMax}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-medium mb-1">Poids max</div>
                    <div className="font-bold text-neutral-dark">{machine.poidsMax}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-medium mb-1">Capacité/jour</div>
                    <div className="font-bold text-neutral-dark">{machine.capaciteJour} produits</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-medium mb-1">Prix</div>
                    <div className="font-bold text-secondary-orbitvu">
                      {machine.prix.toLocaleString('fr-FR')}€ HT
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark"
                  >
                    <Link href="/contact/demande-demo">
                      Demander une démo
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white"
                  >
                    <Link href="/contact/demande-devis">
                      Demander un devis
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : Badge IA Ready (si applicable) */}
        {isIAReady && (
          <section className="py-12 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-6">
                <div className="text-6xl">🤖</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeIAReady>IA Ready</BadgeIAReady>
                    <span className="text-sm text-neutral-medium">Compatible BlendAI</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                    Studio compatible avec l'IA générative BlendAI
                  </h2>
                  <p className="text-neutral-medium">
                    Augmentez vos packshots avec des backgrounds générés par IA. Créez des mises en scène illimitées
                    en quelques secondes avec notre solution BlendAI.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-purple-500 text-purple-700 hover:bg-purple-500 hover:text-white"
                >
                  <Link href="/ia-generative">
                    Découvrir BlendAI →
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3 : Avantages clés */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Avantages clés
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {machine.keyAdvantages.map((advantage, index) => (
                <div key={index} className="bg-neutral-lighter rounded-lg p-6">
                  <div className="text-3xl mb-3">✓</div>
                  <p className="font-medium text-neutral-dark">{advantage.fr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 : Caractéristiques techniques */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Caractéristiques techniques
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-neutral-dark">Dimensions & Capacités</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-neutral-light">
                      <span className="text-neutral-medium">Taille produit max</span>
                      <span className="font-medium text-neutral-dark">{machine.tailleMax}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-light">
                      <span className="text-neutral-medium">Poids max</span>
                      <span className="font-medium text-neutral-dark">{machine.poidsMax}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-light">
                      <span className="text-neutral-medium">Capacité journalière</span>
                      <span className="font-medium text-neutral-dark">{machine.capaciteJour} produits</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-light">
                      <span className="text-neutral-medium">Espace requis</span>
                      <span className="font-medium text-neutral-dark">{machine.spaceRequired}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 text-neutral-dark">Fonctionnalités</h3>
                  <div className="space-y-3">
                    {machine.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-[#cdcdfd] text-xl">✓</span>
                        <span className="text-neutral-dark capitalize">{feature.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-bold text-lg mb-4 mt-8 text-neutral-dark">Secteurs idéaux</h3>
                  <div className="flex flex-wrap gap-2">
                    {machine.idealSectors.map((sector, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 : CTA Calculateur ROI */}
        <section className="py-16 bg-[#cdcdfd]/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
              Calculez votre retour sur investissement
            </h2>
            <p className="text-lg text-neutral-medium mb-8 max-w-2xl mx-auto">
              Découvrez en quelques secondes combien vous pourriez économiser en automatisant votre production
              de packshots avec le {machine.nom}.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark text-lg px-8 py-6"
            >
              <Link href="/studios-photo-automatises#calculateur-roi">
                Calculer mon ROI →
              </Link>
            </Button>
            <p className="text-sm text-neutral-medium mt-4">
              Rentabilisez votre investissement en moins de 6 mois
            </p>
          </div>
        </section>

        {/* SECTION 6 : Formation associée */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Formation recommandée
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg">
              {/* Colonne Image */}
              <div className="relative h-64 bg-gradient-to-br from-[#cdcdfd] to-blue-400 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-lg font-bold">Formation Orbitvu Academy</p>
                </div>
              </div>

              {/* Colonne Texte */}
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    Certifié Qualiopi
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    Financement OPCO
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-3">
                  Maîtrisez votre {machine.nom}
                </h3>

                <p className="text-neutral-medium mb-6">
                  Formez-vous aux studios photo automatisés Orbitvu et maximisez votre productivité.
                  Formation certifiée avec financement OPCO disponible.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd] text-xl">✓</span>
                    <span className="text-neutral-dark">
                      Prise en main complète de votre studio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd] text-xl">✓</span>
                    <span className="text-neutral-dark">
                      Optimisation des workflows de production
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#cdcdfd] text-xl">✓</span>
                    <span className="text-neutral-dark">
                      Best practices e-commerce et marketplaces
                    </span>
                  </li>
                </ul>

                <div className="flex gap-4">
                  <Button
                    asChild
                    className="bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark"
                  >
                    <Link href={`/academy/${formationSlug}`}>
                      Voir la formation
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-neutral-light hover:border-[#cdcdfd]"
                  >
                    <Link href="/academy/calendrier">
                      📅 Calendrier
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 : Limitations & Use Cases */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Use Cases */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-6">
                  Cas d'usage idéaux
                </h3>
                <ul className="space-y-3">
                  {machine.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-neutral-dark">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-6">
                  Points d'attention
                </h3>
                <ul className="space-y-3">
                  {machine.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-500 text-xl">⚠</span>
                      <span className="text-neutral-dark">{limitation.fr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 : CTA Final */}
        <section className="py-16 bg-gradient-to-br from-[#cdcdfd]/20 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
              Prêt à transformer votre production ?
            </h2>
            <p className="text-lg text-neutral-medium mb-8">
              Testez le {machine.nom} lors d'une démo personnalisée dans nos showrooms
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark"
              >
                <Link href="/contact/demande-demo">
                  Réserver une démo
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white"
              >
                <Link href="/studios-photo-automatises">
                  Voir tous les studios
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
