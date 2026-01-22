import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'formation.meta' });

  return {
    title: `Calendrier Formations 2026 - ${t('title')}`,
    description: 'Consultez le calendrier des formations Orbitvu Academy 2026. Réservez votre session de formation packshot ou IA en ligne.',
  };
}

export default async function CalendrierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  return (
    <>
      <Header />
      <main>
        {/* SECTION 1 : Hero Calendrier */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex gap-3 mb-4">
              <BadgeQualiopi>Certifié Qualiopi</BadgeQualiopi>
              <Badge variant="blue">Financement OPCO</Badge>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              📅 Calendrier Formations 2026
            </h1>

            <p className="text-xl text-neutral-medium mb-6 max-w-3xl">
              Réservez votre session de formation en ligne. Choisissez parmi nos formations packshot Orbitvu
              et IA générative BlendAI avec des sessions tout au long de l'année.
            </p>

            <div className="flex gap-4">
              <Link
                href="/academy/formations-packshot"
                className="inline-block bg-white border-2 border-neutral-light hover:border-[#cdcdfd] text-neutral-dark font-medium px-6 py-3 rounded-lg"
              >
                📸 Formations Packshot
              </Link>
              <Link
                href="/academy/formations-ia"
                className="inline-block bg-white border-2 border-neutral-light hover:border-[#cdcdfd] text-neutral-dark font-medium px-6 py-3 rounded-lg"
              >
                🤖 Formations IA
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2 : Google Calendar Embed */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                {t('calendrier.heading')}
              </h2>
              <p className="text-neutral-medium">
                {t('calendrier.subtitle')}
              </p>
            </div>

            {/* Google Calendar Appointment Scheduling */}
            {/* TODO: Remplacer par l'ID réel Google Calendar Appointments */}
            {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/VOTRE_ID?gv=true"
                style={{ border: 0, width: '100%', height: '600px' }}
                title="Calendrier des formations"
              />
            </div> */}

            {/* Message temporaire en attendant la configuration du calendrier */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3">
                Calendrier de réservation bientôt disponible
              </h3>
              <p className="text-neutral-medium mb-6">
                Notre système de prise de rendez-vous en ligne sera disponible prochainement. En attendant, contactez-nous directement pour réserver votre session de formation.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3 : Date personnalisée */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-[#cdcdfd]/20 to-white rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
                Besoin d'une date personnalisée ?
              </h2>
              <p className="text-neutral-medium mb-6">
                Vous souhaitez organiser une formation intra-entreprise ou à une date spécifique ?
                Nous pouvons adapter notre calendrier à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark font-medium px-8 py-3 rounded-lg"
                >
                  Demander un devis
                </Link>
                <a
                  href="tel:+33123456789"
                  className="inline-block bg-white border-2 border-neutral-light hover:border-[#cdcdfd] text-neutral-dark font-medium px-8 py-3 rounded-lg"
                >
                  📞 Nous appeler
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 : FAQ Inscription */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Questions fréquentes sur l'inscription
            </h2>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Comment réserver ma session de formation ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Sélectionnez la date qui vous convient dans le calendrier ci-dessus et suivez les étapes
                  de réservation. Vous recevrez une confirmation immédiate par email avec tous les détails
                  de votre session.
                </p>
              </details>

              {/* FAQ Item 2 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Puis-je annuler ou reporter ma formation ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Oui, vous pouvez annuler ou reporter votre formation jusqu'à 7 jours avant la date prévue
                  sans frais. Au-delà, des frais de gestion de 30% peuvent s'appliquer. Contactez-nous dès
                  que possible si vous avez un empêchement.
                </p>
              </details>

              {/* FAQ Item 3 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Comment fonctionne le financement OPCO ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Nos formations sont certifiées Qualiopi et éligibles au financement OPCO. Après votre
                  réservation, nous vous fournirons tous les documents nécessaires (convention de formation,
                  programme détaillé, devis) pour faire votre demande de prise en charge auprès de votre OPCO.
                  Délai moyen de réponse : 2-3 semaines.
                </p>
              </details>

              {/* FAQ Item 4 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Les formations sont-elles disponibles en distanciel ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Oui, nous proposons des formations en format blended learning (mix présentiel/distanciel)
                  et 100% distanciel selon les modules. Le format est indiqué sur chaque fiche formation.
                  Les sessions distancielles sont animées en direct avec des exercices pratiques et un suivi
                  personnalisé.
                </p>
              </details>

              {/* FAQ Item 5 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Quel est le nombre de participants par session ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Pour garantir une qualité d'apprentissage optimale, nos sessions sont limitées à 8 participants
                  maximum. Cela permet un accompagnement personnalisé et des échanges riches entre les participants
                  et le formateur.
                </p>
              </details>

              {/* FAQ Item 6 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  Vais-je recevoir une certification à l'issue de la formation ?
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  Oui, vous recevrez une attestation de formation certifiée Qualiopi à l'issue de votre parcours.
                  Cette attestation précise les compétences acquises et peut être valorisée auprès de votre employeur
                  ou dans votre parcours professionnel.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* SECTION 5 : CTA Retour catalogue */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
              Vous hésitez encore ?
            </h2>
            <p className="text-neutral-medium mb-8">
              Consultez notre catalogue complet de formations pour découvrir tous nos programmes
            </p>
            <Link
              href="/academy"
              className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark font-medium px-8 py-4 rounded-lg text-lg"
            >
              📚 Voir toutes les formations
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
