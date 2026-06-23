import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Award,
  Truck,
  Wrench,
  GraduationCap,
  Headset,
  MapPin,
  Phone,
  Landmark,
  Watch,
  Camera,
  ListChecks,
} from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildLanguages } from '@/lib/hreflang';

export const revalidate = 86400;

const SLUG = 'distributeur-orbitvu-suisse';

interface PageProps {
  params: Promise<{ lang: string }>;
}

const FAQ = [
  {
    question: 'Où acheter un studio Orbitvu en Suisse ?',
    answer:
      'PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse. Les entreprises suisses commandent directement auprès de PackshotCreator : conseil, démonstration, livraison, installation et formation sont assurés sur l\'ensemble du territoire suisse. Contact Suisse : +41 44 580 43 84.',
  },
  {
    question: 'Livrez-vous et installez-vous en Suisse ?',
    answer:
      'Oui. La livraison, l\'installation sur site et la mise en service de votre studio Orbitvu sont assurées partout en Suisse, en Suisse romande comme en Suisse alémanique. La formation de vos équipes est réalisée sur site, sur votre propre matériel.',
  },
  {
    question: 'Comment demander une offre depuis la Suisse ?',
    answer:
      'Vous pouvez demander un devis via le formulaire de contact du site ou par téléphone au +41 44 580 43 84. Un conseiller analyse vos besoins (volumes, types de produits, intégration e-commerce) et vous adresse une offre personnalisée. Un financement par leasing auprès d\'établissements suisses est possible.',
  },
  {
    question: 'Proposez-vous des démonstrations pour la Suisse ?',
    answer:
      'Oui. Notre showroom, situé à moins de 2 heures de Genève, vous accueille sur rendez-vous pour une démonstration avec vos propres produits. Des démonstrations à distance (visioconférence avec prises de vue en direct) sont également proposées.',
  },
];

/* Organization étendue pour cette page : areaServed FR+CH et double contactPoint,
   sans modifier le schema global partagé (SchemaOrg.tsx). */
function distributorOrganizationSchema() {
  return {
    ...organizationSchema(),
    description:
      'Distributeur officiel Orbitvu pour la France et la Suisse. Studios photo automatisés, IA BlendAI et formations certifiées Qualiopi.',
    areaServed: ['FR', 'CH'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+33-1-47-42-66-66',
        contactType: 'sales',
        areaServed: 'FR',
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+41-44-580-43-84',
        contactType: 'sales',
        areaServed: 'CH',
        availableLanguage: ['French', 'English'],
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = 'Distributeur Officiel Orbitvu Suisse & France | PackshotCreator';
  const description =
    'PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse : démonstration, livraison, installation et formation. Contact Suisse : +41 44 580 43 84.';

  return {
    title,
    description,
    // Contenu FR servi sur /en/ : noindex tant qu'aucune version EN n'existe
    ...(lang === 'en' && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/${SLUG}`,
      languages: buildLanguages(`/fr/${SLUG}`),
    },
    openGraph: {
      title,
      description,
      images: [{ url: `/api/og?title=${encodeURIComponent(title)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function DistributeurOrbitvuSuissePage({ params }: PageProps) {
  const { lang } = await params;
  setRequestLocale(lang);

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Distributeur Orbitvu Suisse', url: `https://www.packshot-creator.com/${lang}/${SLUG}` },
  ];

  const services = [
    {
      Icon: Truck,
      title: 'Livraison en Suisse',
      description: 'Livraison de votre studio Orbitvu sur l\'ensemble du territoire suisse, en Suisse romande comme en Suisse alémanique.',
    },
    {
      Icon: Wrench,
      title: 'Installation sur site',
      description: 'Installation, calibrage et mise en service par nos techniciens, directement dans vos locaux.',
    },
    {
      Icon: GraduationCap,
      title: 'Formation de vos équipes',
      description: 'Formation sur site, sur votre propre matériel et vos propres produits, jusqu\'à l\'autonomie complète.',
    },
    {
      Icon: Headset,
      title: 'Support et SAV',
      description: 'Assistance technique, pièces détachées et suivi assurés par le distributeur officiel du fabricant.',
    },
  ];

  const nextLinks = [
    {
      Icon: ListChecks,
      title: 'Sélecteur de machines',
      description: 'Identifiez en quelques questions le studio Orbitvu adapté à vos produits et à vos volumes.',
      href: '/studio-photo/selecteur-machines',
    },
    {
      Icon: Camera,
      title: 'Alphashot 360',
      description: 'Le studio photo automatisé de référence pour le packshot et les animations 360°.',
      href: '/studio-photo/alphashot-360',
    },
    {
      Icon: Watch,
      title: 'Solutions horlogerie',
      description: 'Packshot, macro et 360° pour marques, manufactures et sous-traitants horlogers.',
      href: '/industrie/horlogerie',
    },
  ];

  return (
    <>
      <HeroSection
        align="left"
        badge={{ icon: <Award className="h-4 w-4" />, label: 'Distributeur officiel Orbitvu' }}
        title="Distributeur Orbitvu pour la Suisse et la France"
        subtitle="PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse : conseil, démonstration, livraison, installation et formation assurés sur l'ensemble des deux territoires."
        ctas={[
          { label: 'Demander un devis', href: '/contact', variant: 'primary' },
          { label: 'Voir les studios Orbitvu', href: '/studio-photo/selecteur-machines', variant: 'secondary' },
        ]}
      />

      {/* Réponse déclarative + faits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              PackshotCreator (société Sysnext) distribue les solutions du fabricant européen Orbitvu
              depuis 2018 et en est le distributeur officiel pour la France et la Suisse. Les
              entreprises suisses bénéficient d&apos;un interlocuteur unique pour le conseil, la
              démonstration, la livraison, l&apos;installation, la formation et le support de leur
              studio photo automatisé.
            </p>

            <h2 className="mt-12 text-2xl font-bold">Un accompagnement complet en Suisse</h2>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {services.map(({ Icon, title, description }) => (
              <div key={title} className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{title}</p>
                <p className="text-sm text-future-dusk-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coordonnées Suisse + showroom + leasing */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-8">
            Vos contacts pour la Suisse
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <Phone className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">Téléphone Suisse</p>
              <p className="text-sm text-future-dusk-600">
                <a href="tel:+41445804384" className="hover:text-very-peri-700">+41 44 580 43 84</a>
                <br />
                France : +33 (0)1 47 42 66 66
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <MapPin className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">Showroom à moins de 2 h de Genève</p>
              <p className="text-sm text-future-dusk-600">
                Démonstration sur rendez-vous avec vos propres produits, accompagné par nos experts.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <Landmark className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">Financement en Suisse</p>
              <p className="text-sm text-future-dusk-600">
                Financement par leasing possible auprès d&apos;établissements suisses, sur demande d&apos;offre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens vers les étapes suivantes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-8">
            Choisir votre studio Orbitvu
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nextLinks.map(({ Icon, title, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl bg-neutral-50 p-6 border border-neutral-100 hover:border-very-peri-300 hover:bg-very-peri-50/40 transition-colors"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{title}</p>
                <p className="text-sm text-future-dusk-600 mb-3">{description}</p>
                <span className="inline-flex items-center text-sm font-medium text-very-peri-700">
                  Découvrir <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-8">
            Questions fréquentes — Orbitvu en Suisse
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl bg-white p-6 border border-neutral-100">
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{question}</h3>
                <p className="text-sm text-future-dusk-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demande de devis */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-white mb-10 text-center">
            <h2 className="text-2xl font-heading font-bold mb-3">
              Demandez une offre depuis la Suisse
            </h2>
            <p className="text-very-peri-100 mb-6">
              Décrivez vos produits et vos volumes : un conseiller vous répond avec une
              recommandation de studio et une offre personnalisée.
            </p>
            <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
              <Link href="/contact">
                Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ContactForm locale={lang === 'fr' ? 'fr' : 'en'} compact defaultRequestType="quote" />
        </div>
      </section>

      <SchemaOrg
        schema={[
          distributorOrganizationSchema(),
          breadcrumbSchema(breadcrumbs),
          faqSchema(FAQ),
        ]}
      />
    </>
  );
}
