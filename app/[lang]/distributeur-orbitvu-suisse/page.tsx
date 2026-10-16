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
import { distributeurSuisseEn } from '@/data/distributeur-suisse-en';

export const revalidate = 86400;

const SLUG = 'distributeur-orbitvu-suisse';

interface PageProps {
  params: Promise<{ lang: string }>;
}

const FAQ = [
  {
    question: 'Qui est le distributeur officiel des studios photo Orbitvu en Suisse ?',
    answer:
      'PackshotCreator, marque de la société française Sysnext, est le distributeur officiel des studios photo automatisés Orbitvu pour la Suisse et la France. L\'ancien revendeur suisse Light + Byte AG a cessé ses activités en 2025 : les entreprises suisses s\'adressent aujourd\'hui directement à PackshotCreator pour le conseil, la démonstration, la livraison, l\'installation, la formation et le SAV, en français, avec un accompagnement commercial possible en allemand. Contact Suisse : +41 44 580 43 84.',
  },
  {
    question: 'Où acheter un studio Orbitvu en Suisse ?',
    answer:
      'PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse. Les entreprises suisses commandent directement auprès de PackshotCreator : conseil, démonstration, livraison et installation (facturées en supplément) et formation (facturée séparément). Contact Suisse : +41 44 580 43 84.',
  },
  {
    question: 'Livrez-vous et installez-vous en Suisse ?',
    answer:
      'Oui. La livraison et l\'installation sur site de votre studio Orbitvu sont proposées en Suisse et facturées en supplément. La formation est facturée séparément : Essential Training (4 h, à distance) ou Master Training (7 h, en présentiel).',
  },
  {
    question: 'Comment demander une offre depuis la Suisse ?',
    answer:
      'Vous pouvez demander un devis via le formulaire de contact du site ou par téléphone au +41 44 580 43 84. Un conseiller analyse vos besoins (volumes, types de produits, intégration e-commerce) et vous adresse une offre personnalisée. Un financement par leasing auprès d\'établissements suisses est possible.',
  },
  {
    question: 'Proposez-vous des démonstrations pour la Suisse ?',
    answer:
      'Oui. Notre showroom de Beynost (Ain), près de Lyon, vous accueille sur rendez-vous pour une démonstration avec vos propres produits. D\'autres modalités sont à convenir avec nous.',
  },
];

/* Organization étendue pour cette page : areaServed FR+CH et double contactPoint,
   sans modifier le schema global partagé (SchemaOrg.tsx). */
function distributorOrganizationSchema(lang: string) {
  return {
    ...organizationSchema(),
    description: lang === 'en'
      ? distributeurSuisseEn.organizationDescription
      : 'Distributeur officiel Orbitvu pour la France et la Suisse. Studios photo automatisés, IA BlendAI et formations. Sysnext est certifiée Qualiopi.',
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

  const title = lang === 'en'
    ? distributeurSuisseEn.metadata.title
    : 'Distributeur Officiel Orbitvu Suisse & France | PackshotCreator';
  const description = lang === 'en'
    ? distributeurSuisseEn.metadata.description
    : 'PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse : démonstration, livraison, installation et formation. Contact Suisse : +41 44 580 43 84.';

  return {
    title,
    description,
    // D9: keep EN noindex until an independently authorized publication
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
  const en = lang === 'en' ? distributeurSuisseEn : null;
  const pageFaq = en?.faq ?? FAQ;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: en?.breadcrumb ?? 'Distributeur Orbitvu Suisse', url: `https://www.packshot-creator.com/${lang}/${SLUG}` },
  ];

  const services = [
    {
      Icon: Truck,
      title: en?.services[0].title ?? 'Livraison en Suisse',
      description: en?.services[0].description ?? 'Livraison de votre studio Orbitvu en Suisse, facturée en supplément, sur devis.',
    },
    {
      Icon: Wrench,
      title: en?.services[1].title ?? 'Installation sur site',
      description: en?.services[1].description ?? 'Installation de votre studio dans vos locaux, facturée en supplément, sur devis.',
    },
    {
      Icon: GraduationCap,
      title: en?.services[2].title ?? 'Formation de vos équipes',
      description: en?.services[2].description ?? 'Essential Training (4 h, à distance) ou Master Training (7 h, en présentiel), facturées séparément.',
    },
    {
      Icon: Headset,
      title: en?.services[3].title ?? 'Support et SAV',
      description: en?.services[3].description ?? 'Assistance technique et SAV assurés par PackshotCreator, distributeur officiel du fabricant.',
    },
  ];

  const nextLinks = [
    {
      Icon: ListChecks,
      title: en?.links[0].title ?? 'Sélecteur de machines',
      description: en?.links[0].description ?? 'Identifiez en quelques questions le studio Orbitvu adapté à vos produits et à vos volumes.',
      href: '/studio-photo/selecteur-machines' as const,
    },
    {
      Icon: Camera,
      title: en?.links[1].title ?? 'Alphashot 360',
      description: en?.links[1].description ?? 'Studio photo automatisé pour le packshot et les animations 360°.',
      href: { pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-360' } } as const,
    },
    {
      Icon: Watch,
      title: en?.links[2].title ?? 'Solutions horlogerie',
      description: en?.links[2].description ?? 'Packshot, macro et 360° pour marques, manufactures et sous-traitants horlogers.',
      href: { pathname: '/industrie/[slug]', params: { slug: 'horlogerie' } } as const,
    },
  ];

  return (
    <>
      <HeroSection
        align="left"
        badge={{ icon: <Award className="h-4 w-4" />, label: en?.badge ?? 'Distributeur officiel Orbitvu' }}
        title={en?.heroTitle ?? 'Distributeur Orbitvu pour la Suisse et la France'}
        subtitle={en?.heroSubtitle ?? 'PackshotCreator est le distributeur officiel des studios photo automatisés Orbitvu pour la France et la Suisse : conseil, démonstration, livraison, installation et formation.'}
        ctas={[
          { label: en?.heroQuote ?? 'Demander un devis', href: '/contact', variant: 'primary' },
          { label: en?.heroStudios ?? 'Voir les studios Orbitvu', href: '/studio-photo/selecteur-machines', variant: 'secondary' },
        ]}
      />

      {/* Réponse déclarative + faits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              {en ? en.intro : (<>
              PackshotCreator (société Sysnext) distribue les solutions du fabricant européen Orbitvu
              depuis 2023 et en est le distributeur officiel pour la France et la Suisse. Les
              entreprises suisses bénéficient d&apos;un interlocuteur unique pour le conseil, la
              démonstration, la livraison, l&apos;installation, la formation et le support de leur
              studio photo automatisé.
              </>)}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{en?.supportHeading ?? 'Un accompagnement complet en Suisse'}</h2>
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
            {en?.swissContactsHeading ?? 'Vos contacts pour la Suisse'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <Phone className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">{en?.swissPhone ?? 'Téléphone Suisse'}</p>
              <p className="text-sm text-future-dusk-600">
                <a href="tel:+41445804384" className="hover:text-very-peri-700">+41 44 580 43 84</a>
                <br />
                {(en?.franceLabel ?? 'France :') + ' +33 (0)1 47 42 66 66'}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <MapPin className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">{en?.showroomTitle ?? 'Showroom à Beynost (Ain), près de Lyon'}</p>
              <p className="text-sm text-future-dusk-600">
                {en?.showroomDescription ?? 'Démonstration sur rendez-vous avec vos propres produits, accompagné par nos experts.'}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-neutral-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                <Landmark className="h-5 w-5" />
              </span>
              <p className="font-heading font-bold text-future-dusk-900 mb-1">{en?.financingTitle ?? 'Financement en Suisse'}</p>
              <p className="text-sm text-future-dusk-600">
                {en?.financingDescription ?? 'Financement par leasing possible auprès d\'établissements suisses, sur demande d\'offre.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens vers les étapes suivantes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-8">
            {en?.chooseTitle ?? 'Choisir votre studio Orbitvu'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nextLinks.map(({ Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl bg-neutral-50 p-6 border border-neutral-100 hover:border-very-peri-300 hover:bg-very-peri-50/40 transition-colors"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-3">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{title}</p>
                <p className="text-sm text-future-dusk-600 mb-3">{description}</p>
                <span className="inline-flex items-center text-sm font-medium text-very-peri-700">
                  {`${en?.discover ?? 'Découvrir'} `}<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
            {en?.faqHeading ?? 'Questions fréquentes — Orbitvu en Suisse'}
          </h2>
          <div className="space-y-4">
            {pageFaq.map(({ question, answer }) => (
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
              {en?.quoteHeading ?? 'Demandez une offre depuis la Suisse'}
            </h2>
            <p className="text-very-peri-100 mb-6">
              {en ? en.quoteDescription : (<>
              Décrivez vos produits et vos volumes : un conseiller vous répond avec une
              recommandation de studio et une offre personnalisée.
              </>)}
            </p>
            <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
              <Link href="/contact">
                {`${en?.contact ?? 'Nous contacter'} `}<ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ContactForm locale={lang === 'fr' ? 'fr' : 'en'} compact defaultRequestType="quote" />
        </div>
      </section>

      <SchemaOrg
        schema={[
          distributorOrganizationSchema(lang),
          breadcrumbSchema(breadcrumbs),
          faqSchema(pageFaq),
        ]}
      />
    </>
  );
}
