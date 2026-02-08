import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Lightbulb, Zap, Award, Camera, Sparkles, Users, Factory, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'A Propos | PackshotCreator - Depuis 2004'
      : 'About | PackshotCreator - Since 2004',
    description: isFr
      ? '20 ans d\'innovation en photographie produit. PackshotCreator révolutionne la photo e-commerce avec les studios connectés Orbitvu et l\'IA générative.'
      : '20 years of product photography innovation. PackshotCreator revolutionizes e-commerce photography with Orbitvu connected studios and generative AI.',
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/a-propos`,
      languages: { fr: '/fr/a-propos', en: '/en/a-propos' },
    },
  };
}

export default async function AProposPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: isFr ? 'A propos' : 'About', url: `https://packshot-creator.com/${lang}/a-propos` },
  ];

  const innovations = [
    { year: '2004', titleFr: 'Premier studio connecté', titleEn: 'First connected studio', descFr: 'Premier studio piloté par logiciel avec mode connecté', descEn: 'First software-controlled studio with connected mode' },
    { year: '2006', titleFr: 'Innovation 360° synchronisée', titleEn: 'Synchronized 360° innovation', descFr: 'Premier plateau tournant synchronisé au monde', descEn: 'World\'s first synchronized turntable' },
    { year: '2010', titleFr: 'Automatisation multi-angles', titleEn: 'Multi-angle automation', descFr: 'Gamme Packshot Spin', descEn: 'Packshot Spin range' },
    { year: '2012', titleFr: 'Précision pour le luxe', titleEn: 'Precision for luxury', descFr: 'Packshot Macro R avec sources lumineuses graduables', descEn: 'Packshot Macro R with dimmable light sources' },
    { year: '2013', titleFr: 'Innovation textile', titleEn: 'Textile innovation', descFr: 'Lumina Pad pour photographie à plat', descEn: 'Lumina Pad for flat-lay photography' },
    { year: '2014', titleFr: '3D accessible', titleEn: 'Accessible 3D', descFr: 'MaestroBot démocratisant la photogrammétrie', descEn: 'MaestroBot democratizing photogrammetry' },
    { year: '2018', titleFr: 'Lumière réinventée', titleEn: 'Reinvented lighting', descFr: 'Packshot Creator R3 Mark II', descEn: 'Packshot Creator R3 Mark II' },
    { year: '2023', titleFr: 'Alliance stratégique Orbitvu', titleEn: 'Orbitvu strategic alliance', descFr: '150 employés, 4000 m² de production', descEn: '150 employees, 4000 m² production' },
    { year: '2024', titleFr: 'Intelligence artificielle', titleEn: 'Artificial intelligence', descFr: 'Alphashot Pro G2 et innovations IA', descEn: 'Alphashot Pro G2 and AI innovations' },
  ];

  const values = [
    { icon: <Lightbulb className="h-7 w-7" />, titleFr: 'Innovation', titleEn: 'Innovation', descFr: '20 ans d\'innovations continues, du premier studio connecté à l\'IA photo produit', descEn: '20 years of continuous innovation, from the first connected studio to AI product photography', color: 'bg-amber-100 text-amber-700' },
    { icon: <Zap className="h-7 w-7" />, titleFr: 'Performance', titleEn: 'Performance', descFr: 'Solutions automatisées qui multiplient par 10 la productivité photo e-commerce', descEn: 'Automated solutions that multiply e-commerce photo productivity by 10', color: 'bg-very-peri-100 text-very-peri-700' },
    { icon: <Award className="h-7 w-7" />, titleFr: 'Excellence', titleEn: 'Excellence', descFr: 'Standard mondial de qualité, adopté par les plus grandes marques e-commerce', descEn: 'World quality standard, adopted by the largest e-commerce brands', color: 'bg-emerald-100 text-emerald-700' },
  ];

  const stats = [
    { value: '20+', labelFr: 'Années d\'innovation', labelEn: 'Years of innovation' },
    { value: '150', labelFr: 'Employés (Orbitvu Group)', labelEn: 'Employees (Orbitvu Group)' },
    { value: '4000m²', labelFr: 'Surface de production', labelEn: 'Production area' },
    { value: '16+', labelFr: 'Studios photo', labelEn: 'Photo studios' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <FadeInView className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              PackshotCreator
            </h1>
            <p className="text-xl sm:text-2xl text-very-peri-200 font-medium mb-4">
              {isFr
                ? '"Vos besoins sont spécifiques. Nos studios le sont aussi."'
                : '"Your needs are specific. Our studios are too."'}
            </p>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              {isFr
                ? 'Depuis 2004, nous révolutionnons la photographie de produits avec les premiers studios connectés au monde. Aujourd\'hui, nous intégrons l\'IA pour transformer l\'e-commerce.'
                : 'Since 2004, we have been revolutionizing product photography with the world\'s first connected studios. Today, we integrate AI to transform e-commerce.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                <Link href="/contact">
                  {isFr ? 'Contactez-nous' : 'Contact us'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                <Link href="/academy">
                  {isFr ? 'Nos formations' : 'Our training'}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
            {isFr ? 'Notre Histoire' : 'Our Story'}
          </h2>
          <div className="bg-gradient-to-r from-very-peri-50 to-very-peri-100/50 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-future-dusk-700 leading-relaxed mb-6">
              {isFr
                ? 'Conçues pour transformer la photographie de produits et optimiser les workflows e-commerce, les solutions PackshotCreator ont établi un standard mondial avec le lancement du premier studio connecté.'
                : 'Designed to transform product photography and optimize e-commerce workflows, PackshotCreator solutions set a global standard with the launch of the first connected studio.'}
            </p>
            <p className="text-lg text-future-dusk-700 leading-relaxed">
              {isFr
                ? 'Les équipes et technologies, enrichies par l\'intelligence artificielle, évoluent continuellement pour offrir des solutions adaptées aux professionnels et entreprises.'
                : 'Teams and technologies, enriched by artificial intelligence, continuously evolve to offer solutions adapted to professionals and businesses.'}
            </p>
          </div>
        </FadeInView>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
              {isFr ? 'Nos Valeurs' : 'Our Values'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <StaggerItem key={v.titleFr}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-neutral-100">
                  <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${v.color} mx-auto mb-4`}>
                    {v.icon}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {isFr ? v.titleFr : v.titleEn}
                  </h3>
                  <p className="text-sm text-future-dusk-500">{isFr ? v.descFr : v.descEn}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4 text-center">
              {isFr ? '20 Ans d\'Innovation (2004-2024)' : '20 Years of Innovation (2004-2024)'}
            </h2>
            <p className="text-lg text-future-dusk-500 text-center mb-16 max-w-2xl mx-auto">
              {isFr
                ? 'Une chronologie des innovations qui ont révolutionné la photo produit'
                : 'A timeline of innovations that revolutionized product photography'}
            </p>
          </FadeInView>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-very-peri-500 to-very-peri-300 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {innovations.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-8 flex h-8 w-8 items-center justify-center rounded-full bg-very-peri-600 shadow-lg md:left-1/2 md:-translate-x-1/2 z-10">
                    <span className="h-3 w-3 rounded-full bg-white" />
                  </div>

                  <div
                    className={`ml-20 w-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:border-very-peri-300 hover:shadow-md transition-all md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <span className="text-2xl font-heading font-bold text-very-peri-600">{item.year}</span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mt-1 mb-1">
                      {isFr ? item.titleFr : item.titleEn}
                    </h3>
                    <p className="text-sm text-future-dusk-500">{isFr ? item.descFr : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-12 text-center">
              {isFr ? 'PackshotCreator en Chiffres' : 'PackshotCreator in Numbers'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.value}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-heading font-bold text-very-peri-400 mb-2">{stat.value}</div>
                  <p className="text-future-dusk-200">{isFr ? stat.labelFr : stat.labelEn}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {isFr ? 'Travaillons Ensemble' : 'Let\'s Work Together'}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8">
            {isFr
              ? 'Découvrez comment nos solutions peuvent transformer votre production visuelle e-commerce'
              : 'Discover how our solutions can transform your e-commerce visual production'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {isFr ? 'Contactez-nous' : 'Contact us'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/academy">
                {isFr ? 'Nos formations' : 'Our training'}
              </Link>
            </Button>
          </div>
        </FadeInView>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
