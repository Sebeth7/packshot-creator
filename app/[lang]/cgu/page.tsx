import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation (CGU) - PackshotCreator',
  description:
    'Conditions générales d\'utilisation du site PackshotCreator : accès au site, propriété intellectuelle, responsabilités et obligations des utilisateurs.',
};

export default function CGUPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-lg text-gray-600">
                Conditions régissant l'utilisation du site www.packshot-creator.com
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Dernière mise à jour : Janvier 2026
              </p>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="prose prose-lg mx-auto max-w-4xl">
              <p className="lead text-xl text-gray-700">
                Les présentes conditions générales d'utilisation (ci-après « CGU ») ont pour objet de
                définir les modalités et conditions dans lesquelles SYSNEXT SAS, exploitant la marque
                PackshotCreator, met à disposition son site internet et ses services, ainsi que les
                droits et obligations des utilisateurs.
              </p>

              <div className="my-8 rounded-lg bg-blue-50 p-6 border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium">
                  En accédant et en utilisant ce site, vous acceptez sans réserve les présentes CGU.
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
                </p>
              </div>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 1 : Objet
              </h2>
              <p>
                Les présentes CGU régissent l'utilisation du site www.packshot-creator.com et de
                l'ensemble des services proposés par PackshotCreator, notamment :
              </p>
              <ul className="space-y-2">
                <li>La consultation des informations sur les produits et services</li>
                <li>L'utilisation des outils interactifs (calculateur ROI, simulateur OPCO, sélecteur de machines)</li>
                <li>L'inscription aux formations via PackshotCreator Academy</li>
                <li>Les demandes de contact et de devis</li>
                <li>L'accès au blog et aux ressources documentaires</li>
              </ul>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 2 : Accès au site
              </h2>
              <p>
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès internet.
                Tous les coûts liés à l'accès au site (matériel informatique, connexion internet, etc.)
                sont à la charge de l'utilisateur.
              </p>
              <p>
                SYSNEXT met en œuvre tous les moyens raisonnables pour assurer un accès continu au site.
                Toutefois, l'accès peut être interrompu notamment pour des raisons de maintenance,
                de mise à jour ou pour toute autre raison technique.
              </p>
              <p>
                SYSNEXT ne saurait être tenu responsable des dommages résultant de l'indisponibilité
                du site ou de dysfonctionnements techniques.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 3 : Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des éléments figurant sur le site PackshotCreator (textes, graphismes,
                images, photographies, vidéos, logos, icônes, sons, logiciels, bases de données, etc.)
                sont protégés par les dispositions du Code de la propriété intellectuelle et sont la
                propriété exclusive de SYSNEXT ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, transmission ou
                dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé
                que ce soit et sur quelque support que ce soit, est interdite sans l'autorisation
                écrite préalable de SYSNEXT.
              </p>
              <p>
                Les marques PackshotCreator, Orbitvu, BlendAI et les logos associés sont des marques
                déposées. Leur utilisation sans autorisation est strictement interdite.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 4 : Utilisation des outils interactifs
              </h2>
              <p>
                Le site propose plusieurs outils interactifs à titre informatif :
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Calculateur de ROI</h3>
                  <p className="text-gray-700">
                    Les estimations fournies par le calculateur de retour sur investissement sont
                    données à titre indicatif et ne constituent en aucun cas un engagement contractuel
                    de la part de SYSNEXT.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Simulateur d'éligibilité OPCO</h3>
                  <p className="text-gray-700">
                    Le simulateur fournit une estimation de l'éligibilité au financement OPCO basée
                    sur les informations déclarées. L'éligibilité définitive reste soumise à la
                    validation de l'OPCO concerné.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Sélecteur de machines</h3>
                  <p className="text-gray-700">
                    Les recommandations de machines sont basées sur les critères renseignés et
                    constituent des suggestions. Un conseiller PackshotCreator pourra affiner ces
                    recommandations lors d'un échange personnalisé.
                  </p>
                </div>
              </div>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 5 : Formations PackshotCreator Academy
              </h2>
              <p>
                Les formations proposées par PackshotCreator Academy sont soumises à des conditions
                générales de vente (CGV) spécifiques communiquées lors de l'inscription.
              </p>
              <p>
                PackshotCreator Academy est un organisme de formation certifié Qualiopi, garantissant
                la qualité des processus de formation et l'éligibilité au financement par les OPCO.
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Certification Qualiopi :</strong> Numéro de certification disponible sur demande
                </li>
                <li>
                  <strong>Numéro de déclaration d'activité :</strong> Enregistré auprès de la DREETS
                </li>
              </ul>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 6 : Responsabilités de l'utilisateur
              </h2>
              <p>L'utilisateur s'engage à :</p>
              <ul className="space-y-2">
                <li>Utiliser le site conformément à sa destination et aux présentes CGU</li>
                <li>Ne pas tenter de porter atteinte au bon fonctionnement du site</li>
                <li>Fournir des informations exactes lors de l'utilisation des formulaires</li>
                <li>Ne pas utiliser le site à des fins illicites ou contraires à l'ordre public</li>
                <li>Respecter les droits de propriété intellectuelle de SYSNEXT et de ses partenaires</li>
              </ul>
              <p>
                Tout comportement contraire aux présentes CGU pourra entraîner le refus d'accès au
                site et aux services, sans préjudice des dommages et intérêts que SYSNEXT pourrait
                réclamer.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 7 : Liens hypertextes
              </h2>
              <p>
                Le site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre
                informatif et SYSNEXT n'exerce aucun contrôle sur ces sites externes.
              </p>
              <p>
                SYSNEXT décline toute responsabilité quant au contenu, aux produits, aux services ou
                à tout autre élément disponible sur ou à partir de ces sites tiers.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 8 : Protection des données personnelles
              </h2>
              <p>
                Le traitement des données personnelles collectées sur le site est régi par notre
                Politique de Confidentialité, accessible à l'adresse{' '}
                <a href="/confidentialite" className="text-secondary-orbitvu hover:underline">
                  /confidentialite
                </a>
                .
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
                de droits sur vos données personnelles (accès, rectification, suppression, etc.).
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 9 : Cookies
              </h2>
              <p>
                Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des
                statistiques de fréquentation. L'utilisateur peut paramétrer son navigateur pour
                refuser les cookies, ce qui peut toutefois limiter certaines fonctionnalités du site.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 10 : Modification des CGU
              </h2>
              <p>
                SYSNEXT se réserve le droit de modifier les présentes CGU à tout moment. Les
                modifications entrent en vigueur dès leur publication sur le site. L'utilisateur
                est invité à consulter régulièrement cette page.
              </p>
              <p>
                L'utilisation continue du site après publication de modifications vaut acceptation
                des nouvelles CGU.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 11 : Droit applicable et juridiction
              </h2>
              <p>
                Les présentes CGU sont régies par le droit français. Tout litige relatif à
                l'interprétation ou à l'exécution des présentes sera soumis à la compétence
                exclusive des tribunaux de Nanterre, sauf disposition légale impérative contraire.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900">
                Article 12 : Contact
              </h2>
              <p>
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
              </p>
              <div className="rounded-lg bg-gray-50 p-6">
                <ul className="space-y-1 text-gray-700">
                  <li>
                    <strong>Email :</strong> info@sysnext.com
                  </li>
                  <li>
                    <strong>Téléphone :</strong> +33 (0)1 47 42 66 66
                  </li>
                  <li>
                    <strong>Adresse :</strong> SYSNEXT - PackshotCreator, 6 rue Antonin Raynaud,
                    92300 Levallois-Perret, France
                  </li>
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="mt-16 rounded-xl bg-gradient-to-r from-secondary-orbitvu to-primary-orbitvu p-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-bold">Des questions sur nos conditions ?</h3>
                <p className="mb-6 opacity-90">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions.
                </p>
                <a
                  href="/contact"
                  className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-secondary-orbitvu transition-all hover:scale-105"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
