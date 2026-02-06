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
    title: isFr
      ? 'Conditions Générales d\'Utilisation (CGU) | PackshotCreator'
      : 'Terms of Use | PackshotCreator',
    description: isFr
      ? 'Conditions générales d\'utilisation du site PackshotCreator : accès, propriété intellectuelle, responsabilités.'
      : 'Terms of use for the PackshotCreator website: access, intellectual property, responsibilities.',
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/cgu`,
      languages: { fr: '/fr/cgu', en: '/en/cgu' },
    },
  };
}

export default async function CGUPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: isFr ? 'CGU' : 'Terms', url: `https://packshot-creator.com/${lang}/cgu` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            {isFr ? 'Conditions Générales d\'Utilisation' : 'Terms of Use'}
          </h1>
          <p className="text-future-dusk-200">
            {isFr
              ? 'Conditions régissant l\'utilisation du site www.packshot-creator.com'
              : 'Terms governing the use of the website www.packshot-creator.com'}
          </p>
          <p className="mt-2 text-sm text-future-dusk-300">
            {isFr ? 'Dernière mise à jour : Janvier 2026' : 'Last updated: January 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              {isFr
                ? 'Les présentes conditions générales d\'utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions dans lesquelles SYSNEXT SAS, exploitant la marque PackshotCreator, met à disposition son site internet et ses services.'
                : 'These general terms of use (hereinafter "Terms") define the terms and conditions under which SYSNEXT SAS, operating the PackshotCreator brand, makes its website and services available.'}
            </p>

            <div className="my-8 rounded-2xl bg-very-peri-50 p-6 border-l-4 border-very-peri-500 not-prose">
              <p className="text-very-peri-800 font-medium text-sm">
                {isFr
                  ? 'En accédant et en utilisant ce site, vous acceptez sans réserve les présentes CGU. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser ce site.'
                  : 'By accessing and using this site, you accept these Terms without reservation. If you do not accept these conditions, please do not use this site.'}
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 1 : Objet' : 'Article 1: Purpose'}</h2>
            <p>
              {isFr
                ? 'Les présentes CGU régissent l\'utilisation du site www.packshot-creator.com et de l\'ensemble des services proposés par PackshotCreator, notamment :'
                : 'These Terms govern the use of the website www.packshot-creator.com and all services offered by PackshotCreator, including:'}
            </p>
            <ul>
              <li>{isFr ? 'La consultation des informations sur les produits et services' : 'Viewing product and service information'}</li>
              <li>{isFr ? 'L\'utilisation des outils interactifs (calculateur ROI, simulateur OPCO, sélecteur de machines)' : 'Using interactive tools (ROI calculator, OPCO simulator, machine selector)'}</li>
              <li>{isFr ? 'L\'inscription aux formations via PackshotCreator Academy' : 'Enrollment in training via PackshotCreator Academy'}</li>
              <li>{isFr ? 'Les demandes de contact et de devis' : 'Contact and quote requests'}</li>
              <li>{isFr ? 'L\'accès au blog et aux ressources documentaires' : 'Access to the blog and documentation resources'}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 2 : Accès au site' : 'Article 2: Site access'}</h2>
            <p>
              {isFr
                ? 'Le site est accessible gratuitement à tout utilisateur disposant d\'un accès internet. Tous les coûts liés à l\'accès sont à la charge de l\'utilisateur.'
                : 'The site is freely accessible to any user with internet access. All costs related to access are the user\'s responsibility.'}
            </p>
            <p>
              {isFr
                ? 'SYSNEXT met en oeuvre tous les moyens raisonnables pour assurer un accès continu au site, mais ne saurait être tenu responsable des interruptions.'
                : 'SYSNEXT uses all reasonable means to ensure continuous access to the site, but cannot be held responsible for interruptions.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 3 : Propriété intellectuelle' : 'Article 3: Intellectual property'}</h2>
            <p>
              {isFr
                ? 'L\'ensemble des éléments figurant sur le site sont protégés par le Code de la propriété intellectuelle et sont la propriété exclusive de SYSNEXT ou de ses partenaires.'
                : 'All elements on the site are protected by intellectual property law and are the exclusive property of SYSNEXT or its partners.'}
            </p>
            <p>
              {isFr
                ? 'Les marques PackshotCreator, Orbitvu, BlendAI et les logos associés sont des marques déposées.'
                : 'The brands PackshotCreator, Orbitvu, BlendAI and associated logos are registered trademarks.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 4 : Outils interactifs' : 'Article 4: Interactive tools'}</h2>
            <div className="space-y-4 not-prose">
              {[
                { titleFr: 'Calculateur de ROI', titleEn: 'ROI Calculator', descFr: 'Les estimations sont données à titre indicatif et ne constituent pas un engagement contractuel.', descEn: 'Estimates are provided for informational purposes and do not constitute a contractual commitment.' },
                { titleFr: 'Simulateur d\'éligibilité OPCO', titleEn: 'OPCO Eligibility Simulator', descFr: 'L\'éligibilité définitive reste soumise à la validation de l\'OPCO concerné.', descEn: 'Final eligibility is subject to validation by the relevant OPCO.' },
                { titleFr: 'Sélecteur de machines', titleEn: 'Machine Selector', descFr: 'Les recommandations sont basées sur les critères renseignés et constituent des suggestions.', descEn: 'Recommendations are based on the criteria provided and constitute suggestions.' },
              ].map((tool) => (
                <div key={tool.titleFr} className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                  <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{isFr ? tool.titleFr : tool.titleEn}</h3>
                  <p className="text-sm text-future-dusk-600">{isFr ? tool.descFr : tool.descEn}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 5 : Formations PackshotCreator Academy' : 'Article 5: PackshotCreator Academy Training'}</h2>
            <p>
              {isFr
                ? 'Les formations proposées par PackshotCreator Academy sont soumises à des CGV spécifiques communiquées lors de l\'inscription. PackshotCreator Academy est certifié Qualiopi.'
                : 'Training offered by PackshotCreator Academy is subject to specific terms communicated upon enrollment. PackshotCreator Academy is Qualiopi certified.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 6 : Responsabilités de l\'utilisateur' : 'Article 6: User responsibilities'}</h2>
            <p>{isFr ? 'L\'utilisateur s\'engage à :' : 'The user agrees to:'}</p>
            <ul>
              <li>{isFr ? 'Utiliser le site conformément à sa destination et aux présentes CGU' : 'Use the site in accordance with its purpose and these Terms'}</li>
              <li>{isFr ? 'Ne pas tenter de porter atteinte au bon fonctionnement du site' : 'Not attempt to interfere with the proper functioning of the site'}</li>
              <li>{isFr ? 'Fournir des informations exactes lors de l\'utilisation des formulaires' : 'Provide accurate information when using forms'}</li>
              <li>{isFr ? 'Respecter les droits de propriété intellectuelle' : 'Respect intellectual property rights'}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 7 : Protection des données' : 'Article 7: Data protection'}</h2>
            <p>
              {isFr
                ? 'Le traitement des données personnelles est régi par notre '
                : 'The processing of personal data is governed by our '}
              <Link href="/confidentialite" className="text-very-peri-600 hover:underline">
                {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </Link>.
            </p>

            <h2 className="mt-12 text-2xl font-bold">{isFr ? 'Article 8 : Droit applicable' : 'Article 8: Applicable law'}</h2>
            <p>
              {isFr
                ? 'Les présentes CGU sont régies par le droit français. Tout litige sera soumis aux tribunaux de Nanterre.'
                : 'These Terms are governed by French law. Any dispute shall be submitted to the courts of Nanterre.'}
            </p>

            <h2 className="mt-12 text-2xl font-bold">Contact</h2>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <ul className="space-y-1.5 text-sm text-future-dusk-600">
                <li><strong>Email:</strong> info@sysnext.com</li>
                <li><strong>{isFr ? 'Téléphone' : 'Phone'}:</strong> +33 (0)1 47 42 66 66</li>
                <li><strong>{isFr ? 'Adresse' : 'Address'}:</strong> SYSNEXT - PackshotCreator, 6 rue Antonin Raynaud, 92300 Levallois-Perret, France</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-center text-white not-prose">
              <h3 className="text-2xl font-heading font-bold mb-4">{isFr ? 'Des questions sur nos conditions ?' : 'Questions about our terms?'}</h3>
              <p className="mb-6 text-very-peri-100">
                {isFr ? 'Notre équipe est à votre disposition.' : 'Our team is at your disposal.'}
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
