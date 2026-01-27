import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { secteurs } from '@/data/secteurs';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Package, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return secteurs.map((secteur) => ({
    slug: secteur.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);

  if (!secteur) {
    return {
      title: 'Secteur non trouvé',
    };
  }

  return {
    title: secteur.titre,
    description: secteur.description,
    openGraph: {
      title: secteur.titre,
      description: secteur.description,
      type: 'website',
    },
  };
}

export default async function SecteurPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);

  if (!secteur) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA45B] py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {secteur.hero.titre}
            </h1>
            <p className="mb-4 text-xl font-semibold md:text-2xl">
              {secteur.hero.sousTitre}
            </p>
            <p className="text-lg opacity-90 md:text-xl">{secteur.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Problématiques */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              {secteur.problematiques.titre}
            </h2>
            <div className="space-y-4">
              {secteur.problematiques.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:border-[#FF6B35] hover:shadow-md"
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B35] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              {secteur.solutions.titre}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {secteur.solutions.items.map((solution, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-3">
                    {index === 0 ? (
                      <Package className="h-8 w-8 text-[#FF6B35]" />
                    ) : (
                      <Sparkles className="h-8 w-8 text-[#FF6B35]" />
                    )}
                    <h3 className="text-2xl font-bold text-gray-900">{solution.titre}</h3>
                  </div>
                  <p className="mb-6 text-gray-600">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.avantages.map((avantage, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{avantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cas Clients (if exists) */}
      {secteur.casClients && secteur.casClients.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
                Cas Clients {secteur.titre.split(':')[0]}
              </h2>
              <div className="space-y-8">
                {secteur.casClients.map((cas, index) => (
                  <div
                    key={index}
                    className="rounded-xl border-l-4 border-[#FF6B35] bg-gradient-to-r from-orange-50 to-white p-8 shadow-md"
                  >
                    <h3 className="mb-4 text-xl font-bold text-gray-900">{cas.titre}</h3>
                    <p className="text-gray-700">{cas.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA45B] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">{secteur.cta.titre}</h2>
            <p className="mb-10 text-lg opacity-90 md:text-xl">{secteur.cta.description}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#FF6B35] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${lang}/academy`}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-[#FF6B35]"
              >
                Découvrir nos formations
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation vers autres secteurs */}
      <section className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Découvrez nos autres secteurs
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {secteurs
              .filter((s) => s.slug !== slug)
              .slice(0, 8)
              .map((autreSecteur) => (
                <Link
                  key={autreSecteur.slug}
                  href={`/${lang}/industrie/${autreSecteur.slug}`}
                  className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-[#FF6B35] hover:shadow-md"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#FF6B35]">
                    {autreSecteur.titre.split(':')[0]}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
