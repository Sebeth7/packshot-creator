'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OPCOSimulator } from '@/components/simulators/opco';

export default function SimulateurOPCOPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'fr';

  const handleComplete = (resultat: unknown, coordonnees: unknown) => {
    // TODO: Intégrer avec Pipedrive ou autre CRM
    console.log('Simulation terminée:', { resultat, coordonnees });
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {lang === 'fr' ? 'Formations certifiées Qualiopi' : 'Qualiopi certified training'}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
              {lang === 'fr'
                ? 'Vérifiez votre éligibilité au financement OPCO'
                : 'Check your OPCO funding eligibility'}
            </h1>

            <p className="text-lg md:text-xl text-neutral-medium max-w-2xl mx-auto mb-8">
              {lang === 'fr'
                ? 'En 2 minutes, découvrez si votre formation peut être prise en charge à 100% par votre OPCO.'
                : 'In 2 minutes, find out if your training can be 100% covered by your OPCO.'}
            </p>

            {/* Stats rapides */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">100%</span>
                <span className="text-neutral-medium">
                  {lang === 'fr' ? 'finançable' : 'fundable'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">11</span>
                <span className="text-neutral-medium">
                  {lang === 'fr' ? 'OPCO partenaires' : 'partner OPCOs'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">2-4</span>
                <span className="text-neutral-medium">
                  {lang === 'fr' ? 'semaines de délai' : 'weeks processing'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Simulateur */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <OPCOSimulator
              locale={lang as 'fr' | 'en'}
              onComplete={handleComplete}
            />
          </div>
        </section>

        {/* Section d'information */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-dark mb-8 text-center">
              {lang === 'fr' ? 'Comment fonctionne le financement OPCO ?' : 'How does OPCO funding work?'}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Étape 1 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  {lang === 'fr' ? 'Identifiez votre OPCO' : 'Identify your OPCO'}
                </h3>
                <p className="text-sm text-neutral-medium">
                  {lang === 'fr'
                    ? 'Chaque entreprise cotise à un OPCO selon son secteur d\'activité. Nous vous aidons à identifier le vôtre.'
                    : 'Each company contributes to an OPCO based on its sector. We help you identify yours.'}
                </p>
              </div>

              {/* Étape 2 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  {lang === 'fr' ? 'Montez votre dossier' : 'Build your file'}
                </h3>
                <p className="text-sm text-neutral-medium">
                  {lang === 'fr'
                    ? 'Nous vous fournissons tous les documents nécessaires : devis, programme détaillé, attestation Qualiopi.'
                    : 'We provide all necessary documents: quote, detailed program, Qualiopi certificate.'}
                </p>
              </div>

              {/* Étape 3 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  {lang === 'fr' ? 'Obtenez l\'accord' : 'Get approval'}
                </h3>
                <p className="text-sm text-neutral-medium">
                  {lang === 'fr'
                    ? 'Votre OPCO valide la demande sous 2 à 4 semaines. La formation est prise en charge jusqu\'à 100%.'
                    : 'Your OPCO validates the request within 2-4 weeks. Training is covered up to 100%.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-8 text-center">
              {lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
            </h2>

            <div className="space-y-4">
              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {lang === 'fr'
                    ? 'Qu\'est-ce qu\'un OPCO ?'
                    : 'What is an OPCO?'}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {lang === 'fr'
                    ? 'Les OPCO (Opérateurs de Compétences) sont des organismes agréés par l\'État qui collectent les contributions des entreprises pour financer la formation professionnelle. Il existe 11 OPCO en France, chacun couvrant des branches professionnelles spécifiques.'
                    : 'OPCOs (Skills Operators) are state-approved bodies that collect company contributions to fund professional training. There are 11 OPCOs in France, each covering specific professional sectors.'}
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {lang === 'fr'
                    ? 'Qui peut bénéficier du financement OPCO ?'
                    : 'Who can benefit from OPCO funding?'}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {lang === 'fr'
                    ? 'Les salariés d\'entreprises privées, les dirigeants non-salariés, et les travailleurs indépendants peuvent bénéficier du financement OPCO selon leur situation. Les demandeurs d\'emploi peuvent utiliser leur CPF ou solliciter France Travail.'
                    : 'Employees of private companies, non-salaried managers, and self-employed workers can benefit from OPCO funding depending on their situation. Job seekers can use their CPF or contact France Travail.'}
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {lang === 'fr'
                    ? 'Pourquoi Qualiopi est-il important ?'
                    : 'Why is Qualiopi important?'}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {lang === 'fr'
                    ? 'La certification Qualiopi est obligatoire pour qu\'une formation soit finançable par les OPCO. PackshotCreator Academy est certifié Qualiopi, ce qui garantit l\'éligibilité de toutes nos formations au financement OPCO.'
                    : 'Qualiopi certification is mandatory for training to be fundable by OPCOs. PackshotCreator Academy is Qualiopi certified, which guarantees the eligibility of all our training for OPCO funding.'}
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {lang === 'fr'
                    ? 'Combien de temps prend la validation ?'
                    : 'How long does validation take?'}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {lang === 'fr'
                    ? 'Le délai de validation varie selon l\'OPCO, mais il faut généralement compter 2 à 4 semaines entre le dépôt du dossier et l\'accord de financement. Nous vous recommandons d\'anticiper votre demande.'
                    : 'Validation time varies by OPCO, but you should generally expect 2-4 weeks between filing and funding approval. We recommend planning ahead.'}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
