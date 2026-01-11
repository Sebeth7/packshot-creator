import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThreePillarsSection from '@/components/sections/ThreePillarsSection';
import ClientLogos from '@/components/sections/ClientLogos';
import { getAllArticles } from '@/lib/blog';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Fetch 8 derniers articles (MDX + Webflow)
  const articles = await getAllArticles(8);

  return (
    <>
      <Header />
      <main>
        {/* SECTION 1 : Hero 3 Piliers */}
        <ThreePillarsSection variant="homepage" />

        {/* SECTION 2 : Approche Hybride */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                L'Approche Hybride PackshotCreator
              </h2>
              <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
                Ni tout hardware, ni tout IA. La combinaison intelligente des deux avec l'expertise humaine.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📸</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Base Parfaite</h3>
                <p className="text-neutral-medium text-sm">
                  Studios automatisés Orbitvu pour des packshots d'une qualité irréprochable
                </p>
              </div>

              {/* Card 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Multiplication IA</h3>
                <p className="text-neutral-medium text-sm">
                  BlendAI transforme vos packshots en centaines de visuels lifestyle, vidéos, 3D
                </p>
              </div>

              {/* Card 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Autonomie Totale</h3>
                <p className="text-neutral-medium text-sm">
                  Formations certifiées pour maîtriser hardware + IA. Financement OPCO possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : Références Clients */}
        <ClientLogos />

        {/* SECTION 4 : Blog Grid */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                Derniers Articles
              </h2>
              <p className="text-neutral-medium">
                Guides, comparatifs et actualités photo produit
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    {/* Badge source (optionnel, pour debug) */}
                    {article.source === 'webflow' && (
                      <span className="text-xs text-neutral-medium mb-2 block">
                        Archive Webflow
                      </span>
                    )}

                    <h3 className="font-heading text-lg font-bold text-neutral-dark mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-neutral-medium line-clamp-3">
                      {article.description}
                    </p>
                    <div className="mt-4 text-sm text-primary-turquoise font-medium">
                      Lire l'article →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-block text-primary-turquoise font-medium hover:underline"
              >
                Voir tous les articles →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 : CTA Final */}
        <section className="py-16 bg-primary-turquoise text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Prêt à transformer votre production visuelle ?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Découvrez nos solutions lors d'une démo personnalisée
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-turquoise font-medium px-8 py-4 rounded-lg hover:bg-neutral-lighter transition-colors"
            >
              Demander une démo gratuite
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
