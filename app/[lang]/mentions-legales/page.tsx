import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - PackshotCreator',
  description:
    'Mentions légales du site PackshotCreator : informations sur l\'éditeur, développeur, hébergeur et conditions d\'utilisation.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Mentions Légales
            </h1>
            <p className="text-lg text-gray-600">
              Informations légales relatives au site www.packshot-creator.com
            </p>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <p className="lead">
              Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet
              l'encadrement juridique des modalités de mise à disposition du site et des services
              par SYSNEXT - PackshotCreator et de définir les conditions d'accès et d'utilisation
              des services par « l'Utilisateur ».
            </p>
            <p>Les présentes CGU sont accessibles sur le site à la rubrique « CGU ».</p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">Article 1 : Éditeur du site</h2>
            <p>Le site www.packshot-creator.com est édité par :</p>
            <div className="rounded-lg bg-gray-50 p-6">
              <p className="mb-2">
                <strong>Sysnext</strong>
              </p>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)
                </li>
                <li>
                  <strong>Siège social :</strong> 6 rue Antonin Raynaud, 92300 Levallois-Perret,
                  France
                </li>
                <li>
                  <strong>Capital social :</strong> 500 000 €
                </li>
                <li>
                  <strong>Immatriculation :</strong> RCS Nanterre 805 401 148
                </li>
                <li>
                  <strong>Numéro de TVA intracommunautaire :</strong> FR95805401148
                </li>
                <li>
                  <strong>Directeur de la publication :</strong> Laurent Wainberg, Président
                </li>
                <li>
                  <strong>Contact :</strong> info[at]sysnext.com / +33 (0)1 47 42 66 66
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">
              Article 2 : Développement et hébergement
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2">
                  <strong>Développement du site :</strong> Afalence
                </p>
                <p className="text-gray-700">
                  <strong>Contact :</strong> alemeur[at]afalence.com
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2">
                  <strong>Hébergement du site :</strong> Webflow, Inc.
                </p>
                <p className="text-gray-700">
                  <strong>Adresse :</strong> 398 11th Street, 2nd Floor, San Francisco, CA 94103,
                  États-Unis
                </p>
                <p className="text-gray-700">
                  <strong>Contact :</strong> support[at]webflow.com
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">
              Article 3 : Collecte des données
            </h2>
            <p>
              Le site www.packshot-creator.com respecte votre vie privée et se conforme au
              Règlement Général sur la Protection des Données (RGPD).
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Collecte des données :</strong> Les informations recueillies via les
                formulaires de contact sont utilisées uniquement dans le cadre de votre demande.
                Elles ne seront pas partagées avec des tiers sans votre consentement.
              </li>
              <li>
                <strong>Cookies :</strong> Ce site utilise des cookies pour améliorer votre
                expérience utilisateur. Vous pouvez configurer vos préférences dans votre
                navigateur.
              </li>
            </ul>
            <p>
              Pour toute demande relative à vos données personnelles, vous pouvez nous écrire à :
              info[at]sysnext.com.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">
              Article 4 : Propriété intellectuelle
            </h2>
            <p>
              Tous les éléments présents sur ce site (textes, images, graphismes, logos, vidéos,
              icônes, logiciels, etc.) sont la propriété exclusive de Sysnext, sauf mention
              contraire explicite. Toute reproduction, représentation, modification, publication ou
              adaptation des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sans autorisation écrite préalable de Sysnext.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">Article 5 : Responsabilité</h2>
            <p>
              Sysnext s'efforce de fournir des informations précises et à jour sur son site.
              Toutefois, la société ne saurait être tenue responsable des erreurs, omissions ou
              d'une interruption de service. Les liens hypertextes présents sur le site peuvent
              rediriger vers des sites externes.
            </p>
            <p>Sysnext décline toute responsabilité quant au contenu de ces sites tiers.</p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">
              Article 6 : Conditions générales d'utilisation
            </h2>
            <p>
              Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé
              qu'en cliquant sur ces liens, il sortira du site. Ce dernier n'a pas de contrôle sur
              les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être
              responsable de leur contenu.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900">Article 7 : Litiges</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. Tout litige relatif
              à l'utilisation du site www.packshot-creator.com sera soumis aux tribunaux compétents
              de Nanterre.
            </p>

            {/* Footer CTA */}
            <div className="mt-16 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FFA45B] p-8 text-center text-white">
              <h3 className="mb-4 text-2xl font-bold">Des questions ?</h3>
              <p className="mb-6 opacity-90">
                Pour toute question concernant ces mentions légales, n'hésitez pas à nous
                contacter.
              </p>
              <a
                href="mailto:info@sysnext.com"
                className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#FF6B35] transition-all hover:scale-105"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
