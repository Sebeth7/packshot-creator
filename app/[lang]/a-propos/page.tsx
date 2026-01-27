import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Camera, Lightbulb, Zap, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos - PackshotCreator | Créateur des Studios Photos Connectés',
  description:
    '20 ans d\'innovation en photographie produit. De 2004 à 2024, PackshotCreator révolutionne la photo e-commerce avec les studios connectés, l\'automatisation et l\'IA.',
};

export default function AProposPage() {
  const innovations = [
    {
      year: '2004',
      title: 'Révolution du studio connecté',
      description: 'Premier studio piloté par logiciel avec mode connecté',
      icon: '🚀',
    },
    {
      year: '2006',
      title: 'Innovation 360° synchronisée',
      description: 'Premier plateau tournant synchronisé au monde',
      icon: '🔄',
    },
    {
      year: '2010',
      title: 'Automatisation multi-angles',
      description: 'Gamme Packshot Spin',
      icon: '📐',
    },
    {
      year: '2012',
      title: 'Précision pour le luxe',
      description: 'Packshot Macro R avec sources lumineuses graduables',
      icon: '💎',
    },
    {
      year: '2013',
      title: 'Innovation textile',
      description: 'Lumina Pad pour photographie à plat',
      icon: '👔',
    },
    {
      year: '2014',
      title: '3D accessible',
      description: 'MaestroBot démocratisant la photogrammétrie',
      icon: '🎬',
    },
    {
      year: '2018',
      title: 'Lumière réinventée',
      description: 'Packshot Creator R3 Mark II',
      icon: '💡',
    },
    {
      year: '2023',
      title: 'Alliance stratégique Orbitvu',
      description: '150 employés, 4000 m² production',
      icon: '🤝',
    },
    {
      year: '2024',
      title: 'Intelligence artificielle',
      description: 'Alphashot Pro G2 et partenariat ShotFlow',
      icon: '🤖',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA45B] py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
              Packshot<span className="text-white/90">_</span>Creator
              <span className="text-white/90">_</span>
            </h1>
            <p className="mb-8 text-2xl font-semibold md:text-3xl">
              "Vos besoins sont spécifiques. Nos studios le sont aussi."
            </p>
            <p className="text-lg opacity-90 md:text-xl">
              Depuis 2004, nous révolutionnons la photographie de produits avec les premiers
              studios connectés au monde. Aujourd'hui, nous intégrons l'intelligence artificielle
              pour transformer l'e-commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Notre Histoire
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-[#FF6B35]"></div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg md:p-12">
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Conçues pour transformer la photographie de produits et optimiser les workflows
                e-commerce, les solutions <strong>Packshot_Creator_</strong> ont établi un standard
                mondial avec le lancement du premier studio connecté 'Packshot'.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Les équipes et technologies, enrichies par l'intelligence artificielle, évoluent
                continuellement pour offrir des solutions adaptées aux professionnels et
                entreprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nos Valeurs</h2>
              <div className="mx-auto h-1 w-24 rounded bg-[#FF6B35]"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <Lightbulb className="h-16 w-16 text-[#FF6B35]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  20 ans d'innovations continues, du premier studio connecté à l'IA photo produit
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <Zap className="h-16 w-16 text-[#FF6B35]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">Performance</h3>
                <p className="text-gray-600">
                  Solutions automatisées qui multiplient par 10 la productivité photo e-commerce
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <Award className="h-16 w-16 text-[#FF6B35]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">Excellence</h3>
                <p className="text-gray-600">
                  Standard mondial de qualité, adopté par les plus grandes marques e-commerce
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                20 Ans d'Innovation (2004-2024)
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-[#FF6B35]"></div>
              <p className="mt-6 text-lg text-gray-600">
                Une chronologie des innovations qui ont révolutionné la photo produit
              </p>
            </div>

            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B35] via-[#FF8C42] to-[#FFA45B] md:left-1/2"></div>

              {/* Items timeline */}
              <div className="space-y-12">
                {innovations.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white shadow-lg md:left-1/2 md:-translate-x-1/2">
                      <div className="text-xl">{item.icon}</div>
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-20 w-full rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all hover:border-[#FF6B35] hover:shadow-xl md:ml-0 md:w-5/12 ${
                        index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                      }`}
                    >
                      <div className="mb-2 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-[#FF6B35]">{item.year}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">PackshotCreator en Chiffres</h2>
              <div className="mx-auto h-1 w-24 rounded bg-[#FF6B35]"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-[#FF6B35]">20+</div>
                <p className="text-lg opacity-90">Années d'innovation</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-[#FF6B35]">150</div>
                <p className="text-lg opacity-90">Employés (Orbitvu Group)</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-[#FF6B35]">4000m²</div>
                <p className="text-lg opacity-90">Surface de production</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-[#FF6B35]">2024</div>
                <p className="text-lg opacity-90">IA photo produit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA45B] p-8 text-center text-white shadow-2xl md:p-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Travaillons Ensemble</h2>
              <p className="mb-8 text-lg opacity-90">
                Découvrez comment nos solutions peuvent transformer votre production visuelle
                e-commerce
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#FF6B35] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Contactez-nous
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/academy"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-[#FF6B35]"
                >
                  Nos formations
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="mt-8 border-t border-white/30 pt-6">
                <p className="mb-2 font-semibold">Packshot_Creator_</p>
                <p className="opacity-90">
                  6 rue Antonin Raynaud, 92300 Levallois-Perret, France
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
