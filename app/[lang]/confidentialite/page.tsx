import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Users, FileText, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - PackshotCreator',
  description:
    'Politique de confidentialité et protection des données personnelles de PackshotCreator. Conformité RGPD.',
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                Politique de Confidentialité
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              La société Sysnext accorde une grande importance à la protection de vos données
              personnelles et s'engage à respecter la législation en vigueur, notamment le RGPD et
              la loi française relative à l'informatique, aux fichiers et aux libertés.
            </p>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Article 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Article 1 : Responsable du traitement des données
                </h2>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2">
                  <strong>Le responsable du traitement est : Sysnext</strong>
                </p>
                <ul className="space-y-1 text-gray-700">
                  <li>
                    <strong>Adresse :</strong> 6 rue Antonin Raynaud, 92300 Levallois-Perret,
                    France
                  </li>
                  <li>
                    <strong>Contact :</strong> info[at]sysnext.com
                  </li>
                  <li>
                    <strong>Téléphone :</strong> +33 (0)1 47 42 66 66
                  </li>
                </ul>
              </div>
            </div>

            {/* Article 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Article 2 : Données collectées</h2>
              </div>
              <p className="mb-4 text-gray-700">
                Lors de votre navigation ou de l'utilisation de nos services, nous collectons les
                données suivantes :
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Données transmises directement :
                  </h3>
                  <p className="text-gray-700">
                    Nom, prénom, adresse e-mail, numéro de téléphone, entreprise, et toute autre
                    information saisie dans les formulaires de contact ou de demande.
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Données collectées automatiquement :
                  </h3>
                  <p className="text-gray-700">
                    Adresse IP, données de connexion, navigation sur le site (cookies, pages
                    visitées, temps passé, etc.).
                  </p>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Article 3 : Finalité du traitement des données
                </h2>
              </div>
              <p className="mb-4 text-gray-700">
                Vos données personnelles sont collectées pour les finalités suivantes :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Répondre à vos demandes via le formulaire de contact ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    Gérer vos inscriptions à nos newsletters et communications marketing ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    Améliorer l'expérience utilisateur sur le site (via les cookies et outils
                    d'analyse) ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Respecter nos obligations légales et réglementaires.</span>
                </li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Article 4 : Base légale</h2>
              <p className="text-gray-700">Le traitement de vos données repose sur :</p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    Votre consentement (pour les formulaires, newsletters, et cookies) ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    L'exécution d'un contrat (fourniture de services ou d'informations demandées) ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Nos obligations légales.</span>
                </li>
              </ul>
            </div>

            {/* Article 5 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Article 5 : Partage des données
              </h2>
              <p className="mb-4 text-gray-700">
                Vos données personnelles ne sont jamais vendues ou louées. Elles peuvent être
                partagées avec :
              </p>
              <div className="space-y-3">
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Prestataires de services :</h3>
                  <p className="text-gray-700">
                    Hébergeur Webflow, partenaires marketing ou techniques, pour la bonne exécution
                    des services.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Autorités compétentes :</h3>
                  <p className="text-gray-700">
                    Dans le cadre d'une obligation légale ou d'un contentieux.
                  </p>
                </div>
              </div>
            </div>

            {/* Article 6 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Article 6 : Durée de conservation des données
                </h2>
              </div>
              <p className="text-gray-700">Les données sont conservées :</p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    Pour une durée maximale de <strong>3 ans</strong> après le dernier contact pour
                    les données marketing ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>
                    Pour la durée nécessaire à l'exécution du contrat ou au respect d'une
                    obligation légale.
                  </span>
                </li>
              </ul>
            </div>

            {/* Article 7 : Vos droits */}
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Article 7 : Vos droits</h2>
              </div>
              <p className="mb-4 text-gray-700">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">Accès</h3>
                  <p className="text-sm text-gray-600">
                    Demander quelles données personnelles sont détenues
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">Rectification</h3>
                  <p className="text-sm text-gray-600">
                    Corriger vos données si elles sont inexactes
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">Effacement</h3>
                  <p className="text-sm text-gray-600">Supprimer vos données dans certains cas</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">Opposition</h3>
                  <p className="text-sm text-gray-600">
                    Vous opposer au traitement pour des motifs légitimes
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">Portabilité</h3>
                  <p className="text-sm text-gray-600">
                    Obtenir vos données dans un format structuré
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-700">
                Pour exercer vos droits, contactez-nous à{' '}
                <strong>info[at]sysnext.com</strong> en précisant l'objet de votre demande et en
                justifiant de votre identité.
              </p>
            </div>

            {/* Articles restants */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Article 8 : Cookies</h2>
              <p className="mb-3 text-gray-700">Le site utilise des cookies pour :</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Mesurer l'audience et analyser le trafic (Google Analytics ou équivalent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Améliorer l'expérience utilisateur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Proposer des contenus personnalisés</span>
                </li>
              </ul>
              <p className="mt-4 text-gray-700">
                Vous pouvez configurer votre navigateur pour bloquer les cookies ou modifier vos
                préférences.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Lock className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Article 9 : Sécurité</h2>
              </div>
              <p className="text-gray-700">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles
                nécessaires pour protéger vos données contre les accès non autorisés, la perte, ou
                la modification.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Article 10 : Modification de la politique de confidentialité
              </h2>
              <p className="text-gray-700">
                Cette politique peut être mise à jour à tout moment pour refléter les changements
                législatifs ou nos pratiques. Nous vous invitons à la consulter régulièrement.
              </p>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Article 11 : Contact</h2>
              </div>
              <p className="mb-6 opacity-90">
                Pour toute question ou réclamation relative à la gestion de vos données
                personnelles, vous pouvez nous écrire à :
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email :</strong> info[at]sysnext.com
                </p>
                <p>
                  <strong>Adresse :</strong> Sysnext, 6 rue Antonin Raynaud, 92300
                  Levallois-Perret, France
                </p>
              </div>
              <a
                href="mailto:info@sysnext.com"
                className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:scale-105"
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
