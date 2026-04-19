import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Lock, Clock, Ruler, FileSignature } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';

/**
 * Landing vertical Sysnext — Documentation forensique civile.
 *
 * Segment P3 : cabinets d'expertise, assurances, laboratoires police scientifique, experts judiciaires.
 * Draft — matière brute à enrichir par Seb (règle d'or 2).
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Documentation forensique à valeur probatoire'
      : 'Forensic documentation with evidentiary value',
    description: isFr
      ? 'Paramètres verrouillés, horodatage cryptographique, signature numérique. Mesure dimensionnelle intégrée. Conforme aux standards probatoires civils.'
      : 'Locked parameters, cryptographic timestamping, digital signature. Integrated dimensional measurement. Compliant with civil evidentiary standards.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/documentation-forensique`,
      languages: {
        fr: '/fr/industrie-solutions/documentation-forensique',
        en: '/en/industrie-solutions/documentation-forensique',
      },
    },
  };
}

export default async function ForensiquePage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'Documentation forensique' : 'Forensic documentation', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/documentation-forensique` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Documentation forensique' : 'Forensic documentation'}</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
            {isFr ? 'ISO/IEC 17025 · EN ISO 17020' : 'ISO/IEC 17025 · EN ISO 17020'}
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6 max-w-3xl">
            {isFr
              ? 'Inattaquable au tribunal. Productif × 5.'
              : 'Unchallengeable in court. 5× more productive.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
            {isFr
              ? 'Mode forensique Orbitvu : paramètres de prise de vue verrouillés, horodatage cryptographique, signature numérique, mesure dimensionnelle intégrée. Chaîne de preuve inattaquable.'
              : 'Orbitvu forensic mode: locked shooting parameters, cryptographic timestamping, digital signature, integrated dimensional measurement. Unbreakable chain of evidence.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Démo forensique' : 'Forensic demo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight mb-10 max-w-2xl">
            {isFr ? 'Quatre garanties probatoires.' : 'Four evidentiary guarantees.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, titleFr: 'Paramètres verrouillés', titleEn: 'Locked parameters', textFr: 'Impossible de modifier le cadrage, l\'éclairage, la focale a posteriori sans trace.', textEn: 'Impossible to modify framing, lighting, focal length after the fact without trace.' },
              { icon: Clock, titleFr: 'Horodatage cryptographique', titleEn: 'Cryptographic timestamping', textFr: 'Source de temps certifiée, hash immuable de chaque fichier.', textEn: 'Certified time source, immutable hash of each file.' },
              { icon: FileSignature, titleFr: 'Signature numérique', titleEn: 'Digital signature', textFr: 'Chaque capture est signée. Chaîne de preuve documentée et auditable.', textEn: 'Each capture is signed. Documented and auditable chain of evidence.' },
              { icon: Ruler, titleFr: 'Mesure dimensionnelle', titleEn: 'Dimensional measurement', textFr: 'Règle / échelle intégrée dans la capture. Archivage multi-angles haute résolution.', textEn: 'Integrated ruler / scale in the capture. High-resolution multi-angle archiving.' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-graphite-50 rounded-xl border border-graphite-200 p-6">
                  <Icon className="h-8 w-8 text-sysnext-700 mb-4" aria-hidden="true" />
                  <h3 className="font-sysnext-sans font-semibold text-base text-sysnext-900 mb-2">
                    {isFr ? card.titleFr : card.titleEn}
                  </h3>
                  <p className="text-sm text-graphite-700 leading-relaxed">
                    {isFr ? card.textFr : card.textEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sysnext-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
            {isFr ? 'Audiences cibles' : 'Target audiences'}
          </p>
          <h2 className="font-sysnext-sans font-bold text-2xl text-white mb-6 max-w-2xl mx-auto">
            {isFr
              ? 'Experts judiciaires · Cabinets d\'expertise · Assurances · Laboratoires police scientifique'
              : 'Court experts · Expertise firms · Insurance · Forensic laboratories'}
          </h2>
          <p className="text-sysnext-200 leading-relaxed mb-8">
            {isFr
              ? 'Associations : CNCEJ, CNEJITA. Salons : Milipol civil, Forensic Europe Expo. Cycle de décision 4-8 semaines, ticket 15-60 k€.'
              : 'Associations: CNCEJ, CNEJITA. Trade shows: Milipol civil, Forensic Europe Expo. Decision cycle 4-8 weeks, ticket €15-60K.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors"
          >
            {isFr ? 'Parler avec Seb Ducros' : 'Talk to Seb Ducros'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
