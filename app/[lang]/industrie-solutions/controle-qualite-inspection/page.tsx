import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Check, ClipboardCheck, FileCheck, Layers, Database } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';

/**
 * Landing vertical Sysnext — Contrôle qualité & inspection industrielle.
 *
 * Segment P2 : QC inspection aéronautique, électronique, automobile.
 * Normes : AS9100, IATF 16949, ISO 13485, AS9102 FAI, IPC-A-610.
 *
 * Squelette — matière brute à enrichir et traduire par Seb (règle d'or 2).
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Contrôle qualité & inspection visuelle — AS9100 / IATF / ISO 13485'
      : 'Quality control & visual inspection — AS9100 / IATF / ISO 13485',
    description: isFr
      ? 'Rapports NCR auto-générés, golden sample visuel, dossier audit AS9100/IATF/ISO 13485 prêt sur demande. First Article Inspection (AS9102) avec Templates.'
      : 'Auto-generated NCR reports, visual golden sample, AS9100/IATF/ISO 13485 audit folder ready on demand. First Article Inspection (AS9102) with Templates.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/controle-qualite-inspection`,
      languages: {
        fr: '/fr/industrie-solutions/controle-qualite-inspection',
        en: '/en/industrie-solutions/controle-qualite-inspection',
      },
    },
  };
}

export default async function ControleQualitePage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'Contrôle qualité & inspection' : 'Quality control & inspection', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/controle-qualite-inspection` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Contrôle qualité & inspection' : 'Quality control & inspection'}</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
            AS9100 · IATF 16949 · ISO 13485 · IPC-A-610
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6 max-w-3xl">
            {isFr
              ? 'Zéro défaut documentaire. Audit-ready en permanence.'
              : 'Zero documentary defect. Permanently audit-ready.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
            {isFr
              ? 'Rapports de non-conformité auto-générés avec photos multi-angles horodatées et signées. Golden sample visuel versionné. First Article Inspection (AS9102) avec Templates pré-configurés. Dossier audit prêt sur demande.'
              : 'Auto-generated non-conformity reports with timestamped, signed multi-angle photos. Versioned visual golden sample. First Article Inspection (AS9102) with pre-configured Templates. Audit folder ready on demand.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Réserver une démo QC' : 'Book a QC demo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight mb-3">
              {isFr ? 'Quatre bénéfices mesurables.' : 'Four measurable benefits.'}
            </h2>
            <p className="text-graphite-700 text-sm">
              {isFr ? 'Matière brute — copy final à retravailler par Seb.' : 'Draft — final copy to refine by Seb.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: ClipboardCheck,
                titleFr: 'Rapports NCR standardisés',
                titleEn: 'Standardised NCR reports',
                textFr: 'Photos multi-angles horodatées, signatures numériques, export direct vers QMS (Greenlight Guru, MasterControl, ETQ Reliance, SAP QM).',
                textEn: 'Timestamped multi-angle photos, digital signatures, direct export to QMS (Greenlight Guru, MasterControl, ETQ Reliance, SAP QM).',
              },
              {
                icon: Layers,
                titleFr: 'Golden sample visuel',
                titleEn: 'Visual golden sample',
                textFr: 'Référence visuelle par SKU / FAI, versionnée. Comparaison Ghost Image avec capture courante. Détection immédiate de dérive.',
                textEn: 'Visual reference per SKU / FAI, versioned. Ghost Image comparison with current capture. Immediate drift detection.',
              },
              {
                icon: FileCheck,
                titleFr: 'First Article Inspection (AS9102)',
                titleEn: 'First Article Inspection (AS9102)',
                textFr: 'Templates AS9102 pré-configurés. Gain de temps 5× sur constitution de dossier FAI. Horodatage cryptographique.',
                textEn: 'Pre-configured AS9102 Templates. 5× time savings on FAI dossier. Cryptographic timestamping.',
              },
              {
                icon: Database,
                titleFr: 'Audit-ready',
                titleEn: 'Audit-ready',
                textFr: 'Dossier photo traçable à la pièce, à l\'opérateur, à la date. Export conforme aux exigences auditeurs EASA, FDA, TÜV, SGS, Bureau Veritas.',
                textEn: 'Photo folder traceable to part, operator, date. Export compliant with EASA, FDA, TÜV, SGS, Bureau Veritas auditor requirements.',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-graphite-50 rounded-xl border border-graphite-200 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sysnext-50 text-sysnext-700 mb-4">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-sysnext-sans font-semibold text-lg text-sysnext-900 mb-2">
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
            {isFr ? 'Personas cibles' : 'Target personas'}
          </p>
          <h2 className="font-sysnext-sans font-bold text-2xl text-white mb-6">
            {isFr
              ? 'Directeur Qualité · SQE / AQF · Responsable Méthodes'
              : 'Quality Director · SQE / SQM · Methods Manager'}
          </h2>
          <p className="text-sysnext-200 leading-relaxed mb-8">
            {isFr
              ? 'Cycle de décision 8 à 16 semaines. Ticket 50–250 k€. Normes AS9100 rev D, IATF 16949, ISO 13485:2016, AS9102, IPC-A-610H, EN 9110.'
              : 'Decision cycle 8 to 16 weeks. Ticket €50-250K. Standards AS9100 rev D, IATF 16949, ISO 13485:2016, AS9102, IPC-A-610H, EN 9110.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors"
          >
            {isFr ? 'Parler à Seb Ducros' : 'Talk to Seb Ducros'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-graphite-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-proof-200 text-proof-500 text-xs font-semibold tracking-wider uppercase mb-4">
            {isFr ? 'Contenu complet à venir' : 'Full content coming soon'}
          </div>
          <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-4">
            {isFr
              ? 'Étude de cas, comparatif, FAQ technique, wireframe ROI — S3 à S5'
              : 'Case study, comparison, technical FAQ, ROI wireframe — S3 to S5'}
          </h2>
          <p className="text-graphite-700 leading-relaxed mb-6">
            {isFr
              ? 'Cette landing sera enrichie avec les mêmes sections que la page vaisseau amiral : étude de cas, comparatif vs vision ligne Keyence/Cognex, FAQ technique, calculateur ROI dédié QC, méthodologie de déploiement.'
              : 'This landing will be enriched with the same sections as the flagship page: case study, comparison vs Keyence/Cognex line vision, technical FAQ, dedicated QC ROI calculator, deployment methodology.'}
          </p>
          <Link
            href="/industrie-solutions/catalogue-pieces-detachees"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sysnext-700 hover:text-sysnext-900"
          >
            {isFr ? 'Voir la landing vaisseau amiral' : 'See flagship landing'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
