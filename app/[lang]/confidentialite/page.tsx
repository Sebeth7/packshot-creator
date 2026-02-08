import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'Politique de Confidentialité | PackshotCreator'
      : 'Privacy Policy | PackshotCreator',
    description: isFr
      ? 'Politique de confidentialité et protection des données personnelles de PackshotCreator. Conformité RGPD.'
      : 'PackshotCreator privacy policy and personal data protection. GDPR compliance.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/confidentialite`,
      languages: { fr: '/fr/confidentialite', en: '/en/confidentialite' },
    },
  };
}

export default async function ConfidentialitePage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Confidentialité' : 'Privacy', url: `https://www.packshot-creator.com/${lang}/confidentialite` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-very-peri-500/20 text-very-peri-300">
              <Shield className="h-6 w-6" />
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold">
              {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </h1>
          </div>
          <p className="text-future-dusk-200">
            {isFr
              ? 'La société Sysnext accorde une grande importance à la protection de vos données personnelles et se conforme au RGPD.'
              : 'Sysnext places great importance on the protection of your personal data and complies with GDPR.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">

            {/* Article 1 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 1 : Responsable du traitement' : 'Article 1: Data controller'}
              </h2>
              <div className="rounded-xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-3">Sysnext</p>
                <ul className="space-y-1.5 text-sm text-future-dusk-600">
                  <li><strong>SAS</strong> {isFr ? 'au capital de' : 'with capital of'} 500 000 EUR</li>
                  <li>6 rue Antonin Raynaud, 92300 Levallois-Perret, France</li>
                  <li>RCS Nanterre 805 401 148</li>
                  <li>Contact DPO: info@sysnext.com</li>
                </ul>
              </div>
            </div>

            {/* Article 2 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 2 : Données collectées' : 'Article 2: Data collected'}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {isFr
                  ? 'Les données personnelles collectées sur le site sont :'
                  : 'Personal data collected on the site includes:'}
              </p>
              <div className="space-y-3">
                {[
                  { titleFr: 'Formulaires de contact', titleEn: 'Contact forms', descFr: 'Nom, email, téléphone, entreprise, message', descEn: 'Name, email, phone, company, message' },
                  { titleFr: 'Outils interactifs', titleEn: 'Interactive tools', descFr: 'Données saisies dans le calculateur ROI, simulateur OPCO, sélecteur machines', descEn: 'Data entered in ROI calculator, OPCO simulator, machine selector' },
                  { titleFr: 'Navigation', titleEn: 'Navigation', descFr: 'Cookies analytiques, adresse IP (anonymisée)', descEn: 'Analytics cookies, IP address (anonymized)' },
                ].map((item) => (
                  <div key={item.titleFr} className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <p className="font-heading font-bold text-future-dusk-900 text-sm mb-1">{isFr ? item.titleFr : item.titleEn}</p>
                    <p className="text-sm text-future-dusk-500">{isFr ? item.descFr : item.descEn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Article 3 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 3 : Finalités du traitement' : 'Article 3: Processing purposes'}
              </h2>
              <ul className="space-y-2 text-future-dusk-600">
                <li className="flex items-start gap-2">
                  <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                  {isFr ? 'Répondre à vos demandes de contact et de devis' : 'Responding to your contact and quote requests'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                  {isFr ? 'Fournir les résultats des outils interactifs' : 'Providing interactive tool results'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                  {isFr ? 'Gérer les inscriptions aux formations' : 'Managing training enrollments'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                  {isFr ? 'Améliorer notre site et nos services' : 'Improving our website and services'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                  {isFr ? 'Respecter nos obligations légales' : 'Complying with our legal obligations'}
                </li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 4 : Durée de conservation' : 'Article 4: Retention period'}
              </h2>
              <p className="text-future-dusk-600">
                {isFr
                  ? 'Les données personnelles sont conservées pendant une durée proportionnée à leur finalité : 3 ans pour les données prospects, durée de la relation contractuelle + 5 ans pour les clients, 13 mois pour les cookies.'
                  : 'Personal data is retained for a period proportionate to its purpose: 3 years for prospect data, duration of the contractual relationship + 5 years for customers, 13 months for cookies.'}
              </p>
            </div>

            {/* Article 5 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 5 : Vos droits' : 'Article 5: Your rights'}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {isFr
                  ? 'Conformément au RGPD, vous disposez des droits suivants :'
                  : 'In accordance with GDPR, you have the following rights:'}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { fr: 'Droit d\'accès', en: 'Right of access' },
                  { fr: 'Droit de rectification', en: 'Right to rectification' },
                  { fr: 'Droit à l\'effacement', en: 'Right to erasure' },
                  { fr: 'Droit à la portabilité', en: 'Right to data portability' },
                  { fr: 'Droit d\'opposition', en: 'Right to object' },
                  { fr: 'Droit à la limitation du traitement', en: 'Right to restriction of processing' },
                ].map((right) => (
                  <div key={right.fr} className="rounded-xl bg-very-peri-50 p-3 text-sm font-medium text-very-peri-700">
                    {isFr ? right.fr : right.en}
                  </div>
                ))}
              </div>
              <p className="text-future-dusk-600 mt-4 text-sm">
                {isFr
                  ? 'Pour exercer vos droits : info@sysnext.com. Vous pouvez également adresser une réclamation à la CNIL.'
                  : 'To exercise your rights: info@sysnext.com. You may also file a complaint with the CNIL.'}
              </p>
            </div>

            {/* Article 6 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 6 : Cookies' : 'Article 6: Cookies'}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {isFr
                  ? 'Le site utilise des cookies pour améliorer votre expérience :'
                  : 'The site uses cookies to improve your experience:'}
              </p>
              <div className="space-y-3">
                {[
                  { titleFr: 'Cookies essentiels', titleEn: 'Essential cookies', descFr: 'Nécessaires au fonctionnement du site (session, langue)', descEn: 'Required for site functionality (session, language)' },
                  { titleFr: 'Cookies analytiques', titleEn: 'Analytics cookies', descFr: 'Mesure d\'audience anonymisée (avec consentement)', descEn: 'Anonymous audience measurement (with consent)' },
                ].map((cookie) => (
                  <div key={cookie.titleFr} className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <p className="font-heading font-bold text-future-dusk-900 text-sm mb-1">{isFr ? cookie.titleFr : cookie.titleEn}</p>
                    <p className="text-sm text-future-dusk-500">{isFr ? cookie.descFr : cookie.descEn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Article 7 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {isFr ? 'Article 7 : Sécurité' : 'Article 7: Security'}
              </h2>
              <p className="text-future-dusk-600">
                {isFr
                  ? 'Sysnext met en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.'
                  : 'Sysnext implements appropriate technical and organizational measures to protect your personal data against unauthorized access, modification, disclosure or destruction.'}
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-center text-white">
              <h3 className="text-2xl font-heading font-bold mb-4">
                {isFr ? 'Questions sur vos données ?' : 'Questions about your data?'}
              </h3>
              <p className="mb-6 text-very-peri-100">
                {isFr
                  ? 'Contactez notre équipe pour toute demande relative à vos données personnelles.'
                  : 'Contact our team for any request regarding your personal data.'}
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
