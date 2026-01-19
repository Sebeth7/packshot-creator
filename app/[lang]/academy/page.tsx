import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { Link } from '@/i18n/routing';
import { Badge, BadgeQualiopi } from '@/components/shared/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Formation {
  _id: string;
  titre: string;
  slug: { current: string };
  categorie: 'packshot' | 'ia';
  niveau: 1 | 2 | 3;
  format: 'blended' | 'presentiel' | 'both';
  prix_blended?: number;
  prix_presentiel: number;
  duree_heures: number;
  description_courte: string;
  eligible_opco: boolean;
}

async function getFormations(): Promise<Formation[]> {
  return await client.fetch(
    `*[_type == "formation"] | order(categorie asc, niveau asc) {
      _id,
      titre,
      slug,
      categorie,
      niveau,
      format,
      prix_blended,
      prix_presentiel,
      duree_heures,
      description_courte,
      eligible_opco
    }`
  );
}

// Composant Card Formation
function FormationCard({ formation, lang }: { formation: Formation; lang: string }) {
  return (
    <Link
      href={`/academy/${formation.slug.current}`}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-2 mb-3">
        {formation.eligible_opco && <BadgeQualiopi>OPCO</BadgeQualiopi>}
        <Badge variant={formation.categorie === 'ia' ? 'purple' : 'default'}>
          Niveau {formation.niveau}
        </Badge>
      </div>

      <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
        {formation.titre}
      </h3>

      <p className="text-sm text-neutral-medium mb-4 line-clamp-3">
        {formation.description_courte}
      </p>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-neutral-medium">
          Durée : <strong>{formation.duree_heures}h</strong>
        </div>
        {formation.prix_blended && (
          <div className="text-sm text-neutral-medium">
            Blended : <strong className="text-secondary-orbitvu">{formation.prix_blended}€ HT</strong>
          </div>
        )}
        <div className="text-sm text-neutral-medium">
          Présentiel : <strong>{formation.prix_presentiel}€ HT</strong>
        </div>
      </div>

      <div className="text-secondary-orbitvu font-medium text-sm">
        En savoir plus →
      </div>
    </Link>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'formation.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AcademyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const formations = await getFormations();
  const t = await getTranslations({ locale: lang, namespace: 'formation' });

  const formationsPackshot = formations.filter((f) => f.categorie === 'packshot');
  const formationsIA = formations.filter((f) => f.categorie === 'ia');

  return (
    <>
      <Header />
      <main>
        {/* SECTION 1 : Hero Academy */}
        <section className="bg-gradient-to-br from-green-50 to-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex gap-3 mb-4">
              <BadgeQualiopi>Certifié Qualiopi</BadgeQualiopi>
              <Badge variant="green">Financement OPCO</Badge>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-neutral-medium mb-6 max-w-3xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex gap-4">
              <a
                href="#formations"
                className="inline-block bg-[#00C853] hover:bg-[#00A844] text-white font-medium px-8 py-3 rounded-lg"
              >
                {t('hero.cta_formations')}
              </a>
              <a
                href="#qualiopi"
                className="inline-block bg-white border-2 border-neutral-light hover:border-[#00C853] text-neutral-dark font-medium px-8 py-3 rounded-lg"
              >
                {t('hero.cta_opco')}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2 : Qualiopi/OPCO */}
        <section id="qualiopi" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Colonne Qualiopi */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
                  🏆 {t('qualiopi.heading')}
                </h2>
                <p className="text-neutral-medium mb-4">
                  {t('qualiopi.description')}
                </p>
                <ul className="space-y-2 text-sm text-neutral-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C853]">✓</span>
                    <span>{t('qualiopi.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C853]">✓</span>
                    <span>{t('qualiopi.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C853]">✓</span>
                    <span>{t('qualiopi.feature3')}</span>
                  </li>
                </ul>
              </div>

              {/* Colonne OPCO */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h2 className="font-heading text-2xl font-bold text-green-800 mb-4">
                  💶 {t('opco.heading')}
                </h2>
                <p className="text-green-700 mb-4">
                  <strong>{t('opco.description')}</strong>
                </p>
                <div className="space-y-3 text-sm text-green-700">
                  <div>
                    <strong>Pour les salariés :</strong> {t('opco.salaries')}
                  </div>
                  <div>
                    <strong>Pour les indépendants :</strong> {t('opco.independants')}
                  </div>
                </div>
                <Link
                  href="/blog/financement-formation-opco-guide"
                  className="inline-block mt-4 text-green-800 font-medium underline"
                >
                  {t('opco.cta')} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : Catalogue Formations */}
        <section id="formations" className="py-16 bg-neutral-lighter">
          <div className="max-w-6xl mx-auto px-4">
            {/* Formations Packshot */}
            <div className="mb-16" id="formations-packshot">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-2">
                📸 {t('catalogue.packshot_heading')}
              </h2>
              <p className="text-neutral-medium mb-8">
                {t('catalogue.packshot_subtitle')}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {formationsPackshot.map(formation => (
                  <FormationCard key={formation._id} formation={formation} lang={lang} />
                ))}
              </div>
            </div>

            {/* Formations IA */}
            <div id="formations-ia">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-2">
                🤖 {t('catalogue.ia_heading')}
              </h2>
              <p className="text-neutral-medium mb-8">
                {t('catalogue.ia_subtitle')}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {formationsIA.map(formation => (
                  <FormationCard key={formation._id} formation={formation} lang={lang} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 : Profil Formateurs */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              {t('formateur.heading')}
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Formateur 1 : Sébastien */}
              <div className="flex flex-col">
                {/* Photo - PLACEHOLDER TEMPORAIRE */}
                <div className="mb-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-secondary-orbitvu to-primary-orbitvu rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👨‍🏫</div>
                      <p className="text-sm opacity-80">Photo à venir</p>
                    </div>
                  </div>
                </div>

                {/* Bio Sébastien */}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                    {t('formateur.name')}
                  </h3>
                  <p className="text-secondary-orbitvu font-medium mb-4">
                    {t('formateur.title')}
                  </p>

                  <div className="space-y-3 text-neutral-medium text-sm">
                    <p>{t('formateur.bio1')}</p>
                    <p>{t('formateur.bio2')}</p>
                    <p>{t('formateur.bio3')}</p>
                  </div>

                  <div className="mt-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur.cert1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur.cert2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur.cert3')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formateur 2 : Stéphane */}
              <div className="flex flex-col">
                {/* Photo - PLACEHOLDER TEMPORAIRE */}
                <div className="mb-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-accent-gold to-accent-alert rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👨‍💼</div>
                      <p className="text-sm opacity-80">Photo à venir</p>
                    </div>
                  </div>
                </div>

                {/* Bio Stéphane */}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                    {t('formateur2.name')}
                  </h3>
                  <p className="text-accent-gold font-medium mb-4">
                    {t('formateur2.title')}
                  </p>

                  <div className="space-y-3 text-neutral-medium text-sm">
                    <p>{t('formateur2.bio1')}</p>
                    <p>{t('formateur2.bio2')}</p>
                    <p>{t('formateur2.bio3')}</p>
                  </div>

                  <div className="mt-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur2.cert1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur2.cert2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00C853]">✓</span>
                      <span>{t('formateur2.cert3')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 : Calendrier Google Calendar */}
        <section className="py-16 bg-neutral-lighter">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                📅 {t('calendrier.heading')}
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
                className="inline-block bg-secondary-orbitvu text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                Nous contacter
              </Link>
            </div>

            <p className="text-center text-sm text-neutral-medium mt-4">
              {t('calendrier.contact')} <Link href="/contact" className="text-secondary-orbitvu underline">Contactez-nous</Link>
            </p>
          </div>
        </section>

        {/* SECTION 6 : FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              {t('faq.heading')}
            </h2>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {t('faq.q1.question')}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {t('faq.q1.answer')}
                </p>
              </details>

              {/* FAQ Item 2 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {t('faq.q2.question')}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {t('faq.q2.answer')}
                </p>
              </details>

              {/* FAQ Item 3 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {t('faq.q3.question')}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {t('faq.q3.answer')}
                </p>
              </details>

              {/* FAQ Item 4 */}
              <details className="bg-neutral-lighter rounded-lg p-6">
                <summary className="font-bold text-neutral-dark cursor-pointer">
                  {t('faq.q4.question')}
                </summary>
                <p className="mt-3 text-neutral-medium text-sm">
                  {t('faq.q4.answer')}
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
