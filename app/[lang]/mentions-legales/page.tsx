import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? 'Mentions Légales | PackshotCreator' : 'Legal Notice | PackshotCreator',
    description: isFr
      ? 'Mentions légales du site PackshotCreator : éditeur, hébergeur, conditions d\'utilisation.'
      : 'Legal notice for PackshotCreator website: publisher, host, terms of use.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/mentions-legales`,
      languages: { fr: '/fr/mentions-legales', en: '/en/mentions-legales' },
    },
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Mentions légales' : 'Legal notice', url: `https://www.packshot-creator.com/${lang}/mentions-legales` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            {isFr ? 'Mentions Légales' : 'Legal Notice'}
          </h1>
          <p className="text-future-dusk-200">
            {isFr
              ? 'Informations légales relatives au site www.packshot-creator.com'
              : 'Legal information about the website www.packshot-creator.com'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              {isFr
                ? 'Les présentes conditions générales d\'utilisation (dites "CGU") ont pour objet l\'encadrement juridique des modalités de mise à disposition du site et des services par SYSNEXT - PackshotCreator.'
                : 'These general terms of use are intended to provide the legal framework for the provision of the site and services by SYSNEXT - PackshotCreator.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 1 : Éditeur du site' : 'Article 1: Site Publisher'}</h2>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <p className="font-heading font-bold text-future-dusk-900 mb-3">Sysnext</p>
              <ul className="space-y-1.5 text-sm text-future-dusk-600">
                <li><strong>{isFr ? 'Forme juridique' : 'Legal form'}:</strong> SAS</li>
                <li><strong>{isFr ? 'Siège social' : 'Headquarters'}:</strong> 6 rue Antonin Raynaud, 92300 Levallois-Perret, France</li>
                <li><strong>{isFr ? 'Capital social' : 'Share capital'}:</strong> 500 000 EUR</li>
                <li><strong>{isFr ? 'Immatriculation' : 'Registration'}:</strong> RCS Nanterre 805 401 148</li>
                <li><strong>TVA:</strong> FR95805401148</li>
                <li><strong>{isFr ? 'Directeur de la publication' : 'Publication director'}:</strong> Laurent Wainberg, {isFr ? 'Président' : 'President'}</li>
                <li><strong>Contact:</strong> info[at]sysnext.com / +33 (0)1 47 42 66 66</li>
              </ul>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 2 : Développement et hébergement' : 'Article 2: Development and hosting'}</h2>
            <div className="space-y-4 not-prose">
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{isFr ? 'Développement' : 'Development'}: Afalence</p>
                <p className="text-sm text-future-dusk-600">Contact: alemeur[at]afalence.com</p>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{isFr ? 'Hébergement' : 'Hosting'}: Vercel, Inc.</p>
                <p className="text-sm text-future-dusk-600">340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 3 : Collecte des données' : 'Article 3: Data collection'}</h2>
            <p>
              {isFr
                ? 'Le site www.packshot-creator.com respecte votre vie privée et se conforme au RGPD.'
                : 'The website www.packshot-creator.com respects your privacy and complies with GDPR.'}
            </p>
            <ul>
              <li><strong>{isFr ? 'Collecte' : 'Collection'}:</strong> {isFr ? 'Les informations recueillies via les formulaires sont utilisées uniquement dans le cadre de votre demande.' : 'Information collected through forms is used solely for the purpose of your request.'}</li>
              <li><strong>Cookies:</strong> {isFr ? 'Ce site utilise des cookies pour améliorer votre expérience.' : 'This site uses cookies to improve your experience.'}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 4 : Propriété intellectuelle' : 'Article 4: Intellectual property'}</h2>
            <p>
              {isFr
                ? 'Tous les éléments présents sur ce site sont la propriété exclusive de Sysnext, sauf mention contraire explicite. Toute reproduction est interdite sans autorisation écrite préalable.'
                : 'All elements on this site are the exclusive property of Sysnext, unless explicitly stated otherwise. Any reproduction is prohibited without prior written authorization.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 5 : Responsabilité' : 'Article 5: Liability'}</h2>
            <p>
              {isFr
                ? 'Sysnext s\'efforce de fournir des informations précises et à jour. Toutefois, la société ne saurait être tenue responsable des erreurs ou omissions.'
                : 'Sysnext strives to provide accurate and up-to-date information. However, the company cannot be held responsible for errors or omissions.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 6 : Litiges' : 'Article 6: Disputes'}</h2>
            <p>
              {isFr
                ? 'Les présentes mentions légales sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Nanterre.'
                : 'These legal notices are governed by French law. Any dispute shall be submitted to the competent courts of Nanterre.'}
            </p>

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-center text-white not-prose">
              <h3 className="text-2xl font-heading font-bold mb-4">{isFr ? 'Des questions ?' : 'Questions?'}</h3>
              <p className="mb-6 text-very-peri-100">
                {isFr ? 'Pour toute question concernant ces mentions légales.' : 'For any questions about these legal notices.'}
              </p>
              <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
                <Link href="/contact">
                  {isFr ? 'Nous contacter' : 'Contact us'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
