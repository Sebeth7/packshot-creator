'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Award, Calculator, FileCheck, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OPCOSimulator } from '@/components/simulators/opco';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

export default function SimulateurOPCOPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'fr';
  const isFr = lang === 'fr';

  const handleComplete = (resultat: unknown, coordonnees: unknown) => {
    console.log('Simulation terminée:', { resultat, coordonnees });
  };

  const steps = [
    {
      icon: <Calculator className="h-5 w-5" />,
      title: isFr ? 'Identifiez votre OPCO' : 'Identify your OPCO',
      desc: isFr
        ? 'Chaque entreprise cotise à un OPCO selon son secteur d\'activité. Nous vous aidons à identifier le vôtre.'
        : 'Each company contributes to an OPCO based on its sector. We help you identify yours.',
      color: 'bg-very-peri-100 text-very-peri-700',
    },
    {
      icon: <FileCheck className="h-5 w-5" />,
      title: isFr ? 'Montez votre dossier' : 'Build your file',
      desc: isFr
        ? 'Nous fournissons tous les documents : devis, programme détaillé, attestation Qualiopi.'
        : 'We provide all documents: quote, detailed program, Qualiopi certificate.',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: isFr ? 'Obtenez l\'accord' : 'Get approval',
      desc: isFr
        ? 'Votre OPCO valide sous 2-4 semaines. Formation prise en charge jusqu\'à 100%.'
        : 'Your OPCO validates within 2-4 weeks. Training covered up to 100%.',
      color: 'bg-emerald-100 text-emerald-700',
    },
  ];

  const faqs = [
    {
      q: isFr ? 'Qu\'est-ce qu\'un OPCO ?' : 'What is an OPCO?',
      a: isFr
        ? 'Les OPCO (Opérateurs de Compétences) sont des organismes agréés par l\'État qui collectent les contributions des entreprises pour financer la formation professionnelle. Il existe 11 OPCO en France.'
        : 'OPCOs (Skills Operators) are state-approved bodies that collect company contributions to fund professional training. There are 11 OPCOs in France.',
    },
    {
      q: isFr ? 'Qui peut bénéficier du financement OPCO ?' : 'Who can benefit from OPCO funding?',
      a: isFr
        ? 'Les salariés d\'entreprises privées, les dirigeants non-salariés, et les travailleurs indépendants selon leur situation.'
        : 'Employees of private companies, non-salaried managers, and self-employed workers depending on their situation.',
    },
    {
      q: isFr ? 'Pourquoi Qualiopi est-il important ?' : 'Why is Qualiopi important?',
      a: isFr
        ? 'La certification Qualiopi est obligatoire pour qu\'une formation soit finançable par les OPCO. PackshotCreator Academy est certifié Qualiopi.'
        : 'Qualiopi certification is mandatory for training to be fundable by OPCOs. PackshotCreator Academy is Qualiopi certified.',
    },
    {
      q: isFr ? 'Combien de temps prend la validation ?' : 'How long does validation take?',
      a: isFr
        ? 'Généralement 2 à 4 semaines entre le dépôt du dossier et l\'accord de financement. Nous recommandons d\'anticiper.'
        : 'Generally 2-4 weeks between filing and funding approval. We recommend planning ahead.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-emerald-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <FadeInView className="max-w-4xl mx-auto text-center">
            <Link href="/academy" className="inline-flex items-center gap-1.5 text-emerald-300 text-sm font-medium mb-6 hover:text-white transition-colors">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Academy
            </Link>
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Award className="h-4 w-4" />
              {isFr ? 'Formations certifiées Qualiopi' : 'Qualiopi certified training'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
              {isFr ? 'Vérifiez votre éligibilité au financement OPCO' : 'Check your OPCO funding eligibility'}
            </h1>
            <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              {isFr
                ? 'En 2 minutes, découvrez si votre formation peut être prise en charge à 100% par votre OPCO.'
                : 'In 2 minutes, find out if your training can be 100% covered by your OPCO.'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-lg">100%</span>
                <span className="text-future-dusk-300">{isFr ? 'finançable' : 'fundable'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-very-peri-400 font-bold text-lg">11</span>
                <span className="text-future-dusk-300">{isFr ? 'OPCO partenaires' : 'partner OPCOs'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-lg">2-4</span>
                <span className="text-future-dusk-300">{isFr ? 'semaines de délai' : 'weeks processing'}</span>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-16 bg-neutral-50">
        <FadeInView className="max-w-3xl mx-auto px-4 sm:px-6">
          <OPCOSimulator locale={lang as 'fr' | 'en'} onComplete={handleComplete} />
        </FadeInView>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
              {isFr ? 'Comment fonctionne le financement OPCO ?' : 'How does OPCO funding work?'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="bg-neutral-50 rounded-2xl p-8">
                  <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${step.color} mb-4`}>
                    {step.icon}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-future-dusk-500">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
              {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
            </h2>
          </FadeInView>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm group">
                <summary className="font-heading font-bold text-future-dusk-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 text-future-dusk-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm text-future-dusk-500 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
