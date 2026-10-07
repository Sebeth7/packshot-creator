import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { ContactForm } from '@/components/forms/ContactForm';
import { sectorResourceLinks } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/seo/SchemaOrg';
import type { Secteur } from '@/data/secteurs';
import type { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';

/**
 * Hub /fr/industrie/bijoux-joaillerie (PR #104) : page narrative dédiée, rendue à la
 * place du gabarit commun des hubs pour ce seul secteur (fr et en ; de-ch inchangé).
 *
 * Texte : entrée `bijoux-joaillerie` de `data/secteurs.ts` (hero, matière, studio,
 * retouche, appel final, FAQ) et constantes ci-dessous (cohérence, 360°, légendes).
 *
 * Visuels : uniquement des images réelles déjà publiées sur le site.
 * - /images/guides/* : guides PackshotCreator de focus stacking et de détourage
 *   (Alphashot Micro Pro v2 et Orbitvu Station, d'après les guides eux-mêmes).
 * - /images/secteurs/bijoux/* : recadrages, sans retouche, de captures de ces guides.
 * - /images/machines/alphashot-micro-v2.avif : visuel produit déjà utilisé sur la fiche.
 */

type Sector = (typeof DEFAULT_SECTORS)[number];

interface HubBijouxProps {
  secteur: Secteur;
  lang: string;
  slug: string;
  breadcrumbs: { name: string; url: string }[];
  autresSecteurs: Sector[];
}

/**
 * Vue 360° réelle d'une bague (Orbitvu SUN ou vidéo). Aucune n'est disponible au
 * 07/10/2026 : la vue du guide « animation 360° » renvoie 404 chez Orbitvu.
 * ASSET_REQUIRED — à renseigner avant tout affichage ; rien n'est rendu tant que vide.
 */
const BAGUE_360: { src: string; title: string } | null = null;

const COHERENCE = {
  titre: 'La vraie difficulté commence à la deuxième pièce',
  paragraphes: [
    'Une belle photo isolée ne fait pas encore un catalogue.',
    'Une nouvelle taille arrive. Puis une variante en or blanc. Une nouvelle pierre. Une référence est remise en production quelques semaines plus tard. Quelqu’un d’autre prend place devant le studio.',
    'Le cadrage, la lumière, le fond et la post-production doivent pourtant rester cohérents.',
  ],
  station: [
    'Un modèle enregistre dans un seul fichier les réglages de la lumière, de l’appareil photo et de la position du plateau tournant, ainsi que les paramètres d’édition.',
    'Pour la pièce suivante, on la positionne et on choisit le modèle : la prise de vue repart des mêmes réglages.',
    'Une correction faite en édition sur une image peut être appliquée aux autres images de la série.',
  ],
};

const ROTATION = {
  titre: 'Une photo montre une face. Le 360° montre la pièce.',
  paragraphes: [
    'Sur une bague, le profil du serti, la galerie, le corps de bague ou l’arrière de la pierre peuvent compter autant que la vue principale.',
    'Une rotation complète permet de regarder la pièce sous ses autres angles sans transformer la fiche produit en succession de vues fixes.',
  ],
  station:
    'Dans Orbitvu Station, on règle le plateau tournant et le nombre d’images de la rotation, de 6 à 180. Le studio enchaîne ensuite les prises de vue, et le Superfocus peut s’appliquer à chaque angle avant l’export pour la fiche produit.',
};

const PRO_G2 =
  'Pour des pièces plus grandes ou plus lourdes, l’Alphashot Pro G2 accepte des objets jusqu’à 10 kg.';

/** « Terme : texte » → { terme, Texte } (séparateur français, espace avant les deux-points). */
function scinder(item: string) {
  const i = item.indexOf(' : ');
  if (i === -1) return { terme: '', texte: item };
  const texte = item.slice(i + 3);
  return { terme: item.slice(0, i), texte: texte.charAt(0).toUpperCase() + texte.slice(1) };
}

const paragraphes = (texte: string) => texte.split('\n\n');

export default function HubBijoux({ secteur, lang, slug, breadcrumbs, autresSecteurs }: HubBijouxProps) {
  const [studio, retouche] = secteur.solutions.items;
  const ressources = sectorResourceLinks('bijoux-joaillerie', lang);
  const faq = secteur.faq ?? [];

  return (
    <>
      {/* ── A. Hero : texte et appel avant l'image sur mobile ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-orbitvu mb-6">
              {secteur.hero.sousTitre}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-bold text-heading-dark leading-[1.08] tracking-tight mb-8">
              {secteur.hero.titre}
            </h1>
            {paragraphes(secteur.hero.description).map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4 max-w-xl">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="#tester"
                className="inline-flex items-center justify-center rounded-lg bg-primary-orbitvu px-6 py-3.5 text-base font-semibold text-white hover:bg-very-peri-600 transition-colors"
              >
                Tester avec vos bijoux
              </a>
              <Link
                href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-micro-v2' } }}
                className="inline-flex items-center gap-2 text-base font-semibold text-heading-dark hover:text-primary-orbitvu transition-colors"
              >
                Voir le studio pour petites pièces <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <figure className="lg:col-span-6">
            <Image
              src="/images/guides/67d9917f5e0a0980101b8a65.avif"
              alt="Bague en or ajourée photographiée sur fond blanc"
              width={2000}
              height={2000}
              priority
              sizes="(min-width: 1024px) 600px, 92vw"
              className="w-full h-auto max-w-[600px] mx-auto"
            />
            <figcaption className="mt-3 text-sm text-neutral-medium text-center">
              Bague ajourée photographiée dans un Alphashot Micro Pro v2 pour nos guides de focus stacking.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── B. Matière ── */}
      <section aria-labelledby="matiere" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:order-2">
            <h2 id="matiere" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {secteur.problematiques.titre}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed mb-4">
              Le métal poli renvoie ce qui l’entoure. Une pierre multiplie les points lumineux. En macro, une poussière ou une micro-rayure devient immédiatement visible, tandis que la faible profondeur de champ peut laisser une partie du bijou hors de la zone de netteté.
            </p>
            <p className="text-lg text-neutral-medium leading-relaxed mb-10">
              C’est ici que se joue l’image : construire les reflets, garder le détail du serti et obtenir une pièce lisible dans son ensemble.
            </p>
            <dl className="divide-y divide-future-dusk-100 border-y border-future-dusk-100">
              {secteur.problematiques.items.map((item) => {
                const { terme, texte } = scinder(item);
                return (
                  <div key={item} className="py-5">
                    <dt className="font-semibold text-heading-dark mb-1">{terme}</dt>
                    <dd className="text-neutral-medium leading-relaxed">{texte}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
          <figure className="lg:col-span-7 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Image
                  src="/images/secteurs/bijoux/superfocus-mise-au-point-avant.avif"
                  alt="Bague en or vue en macro : la pierre est nette, le pavé de diamants à l’arrière est flou"
                  width={745}
                  height={695}
                  sizes="(min-width: 1024px) 340px, 46vw"
                  className="w-full h-auto rounded-md"
                />
                <p className="mt-2 text-sm text-neutral-medium">Mise au point sur la pierre.</p>
              </div>
              <div>
                <Image
                  src="/images/secteurs/bijoux/superfocus-mise-au-point-arriere.avif"
                  alt="Même bague : seul l’arrière de l’anneau est net, le premier plan est flou"
                  width={745}
                  height={695}
                  sizes="(min-width: 1024px) 340px, 46vw"
                  className="w-full h-auto rounded-md"
                />
                <p className="mt-2 text-sm text-neutral-medium">Mise au point sur l’arrière de l’anneau.</p>
              </div>
            </div>
            <figcaption className="mt-4 text-sm text-neutral-medium">
              La même bague dans Orbitvu Station, avec deux mises au point différentes. Le Superfocus fusionne ces plans en une seule image nette.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── C. Cohérence de collection ── */}
      <section aria-labelledby="collection" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h2 id="collection" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {COHERENCE.titre}
            </h2>
            {COHERENCE.paragraphes.map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-6">
            <figure className="mb-8">
              <Image
                src="/images/secteurs/bijoux/station-modeles.avif"
                alt="Bibliothèque de modèles dans Orbitvu Station, avec trois modèles enregistrés pour des bracelets"
                width={800}
                height={280}
                sizes="(min-width: 1024px) 580px, 92vw"
                className="w-full h-auto rounded-md"
              />
              <figcaption className="mt-2 text-sm text-neutral-medium">Modèles enregistrés dans Orbitvu Station, ici pour une série de bracelets.</figcaption>
            </figure>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-orbitvu mb-4">Dans Orbitvu Station</p>
            <ul className="space-y-4">
              {COHERENCE.station.map((ligne) => (
                <li key={ligne} className="pl-5 border-l-2 border-very-peri-100 text-heading-dark leading-relaxed">
                  {ligne}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── D. Studio ── */}
      <section aria-labelledby="studio" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 id="studio" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-12 max-w-3xl">
            {secteur.solutions.titre}
          </h2>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <figure className="lg:col-span-7">
              <Image
                src="/images/guides/67d991805e0a0980101b8a98.avif"
                alt="Main gantée posant une bague ajourée sur le plateau blanc du studio"
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 680px, 92vw"
                className="w-full h-auto rounded-md"
              />
              <figcaption className="mt-2 text-sm text-neutral-medium">Mise en place d’une bague avant la prise de vue.</figcaption>
            </figure>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-5 mb-6">
                <Image
                  src="/images/machines/alphashot-micro-v2.avif"
                  alt="Studio photo Orbitvu Alphashot Micro Pro v2"
                  width={1000}
                  height={1000}
                  sizes="112px"
                  className="w-28 h-28 object-contain rounded-md bg-white"
                />
                <h3 className="text-2xl font-heading font-bold text-heading-dark">{studio.titre}</h3>
              </div>
              <p className="text-lg text-neutral-medium leading-relaxed mb-6">{studio.description}</p>
              <ul className="space-y-3 mb-8">
                {studio.avantages.map((a) => (
                  <li key={a} className="pl-5 border-l-2 border-very-peri-100 text-heading-dark leading-relaxed">
                    {a}
                  </li>
                ))}
              </ul>
              <Link
                href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-micro-v2' } }}
                className="inline-flex items-center gap-2 font-semibold text-primary-orbitvu hover:text-very-peri-700 transition-colors"
              >
                Voir l’Alphashot Micro Pro v2 <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="mt-10 pt-6 border-t border-future-dusk-100 text-neutral-medium leading-relaxed">
                {PRO_G2}{' '}
                <Link
                  href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-pro-g2' } }}
                  className="font-semibold text-heading-dark underline underline-offset-4 decoration-very-peri-200 hover:text-primary-orbitvu"
                >
                  Voir l’Alphashot Pro G2
                </Link>
              </p>
              <Link
                href="/studio-photo/selecteur-machines"
                className="mt-4 inline-flex items-center gap-2 text-neutral-medium underline underline-offset-4 decoration-very-peri-200 hover:text-primary-orbitvu"
              >
                Comparer tous les modèles <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── E. 360° (séquence sombre 1/2) ── */}
      <section aria-labelledby="rotation" className="bg-future-dusk-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 id="rotation" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-8">
              {ROTATION.titre}
            </h2>
            {ROTATION.paragraphes.map((p) => (
              <p key={p} className="text-lg text-future-dusk-100 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <p className="mt-8 text-future-dusk-200 leading-relaxed">{ROTATION.station}</p>
          </div>
          <figure className="lg:col-span-7">
            {BAGUE_360 ? (
              <iframe
                src={BAGUE_360.src}
                title={BAGUE_360.title}
                loading="lazy"
                className="w-full aspect-square rounded-md bg-white"
              />
            ) : (
              <Image
                src="/images/secteurs/bijoux/station-plateau-360.avif"
                alt="Réglage du plateau tournant dans Orbitvu Station : choix du nombre d’images de la rotation, de 6 à 180"
                width={1000}
                height={850}
                sizes="(min-width: 1024px) 680px, 92vw"
                className="w-full h-auto rounded-md"
              />
            )}
            <figcaption className="mt-3 text-sm text-future-dusk-200">
              Réglage de la rotation dans Orbitvu Station, pendant une session sur une bague.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── F. Retouche ── */}
      <section aria-labelledby="retouche" className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h2 id="retouche" className="text-3xl lg:text-[2.2rem] font-heading font-bold text-heading-dark leading-[1.15] mb-6">
              {retouche.titre}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed mb-6">{retouche.description}</p>
            <ul className="space-y-3">
              {retouche.avantages.map((a) => (
                <li key={a} className="pl-5 border-l-2 border-very-peri-100 text-heading-dark leading-relaxed">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-6">
            <Image
              src="/images/guides/67d991839ee10799cae56458.avif"
              alt="Bague ajourée détourée, présentée sur un damier qui figure la transparence"
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="w-full h-auto max-w-[560px] mx-auto rounded-md"
            />
            <figcaption className="mt-2 text-sm text-neutral-medium text-center">La même bague, détourée sur fond transparent.</figcaption>
          </figure>
        </div>
      </section>

      {/* ── G. Appel final (séquence sombre 2/2) ── */}
      <section id="tester" aria-labelledby="tester-titre" className="bg-future-dusk-950 py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 id="tester-titre" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-8">
              {secteur.cta.titre}
            </h2>
            {paragraphes(secteur.cta.description).map((p) => (
              <p key={p} className="text-lg text-future-dusk-100 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <Link
              href="/calculateur-roi"
              className="mt-6 inline-flex items-center gap-2 text-future-dusk-100 underline underline-offset-4 decoration-future-dusk-500 hover:text-white"
            >
              Estimer le retour sur investissement <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-7 bg-white rounded-xl p-6 lg:p-10">
            <h3 className="text-2xl font-heading font-bold text-heading-dark mb-6">Tester avec mes bijoux</h3>
            <ContactForm
              locale={lang as 'fr' | 'en' | 'de-ch'}
              compact
              defaultRequestType="demo"
              defaultSector={lang === 'en' ? 'Watches, jewelry' : 'Horlogerie, bijouterie, joaillerie'}
            />
          </div>
        </div>
      </section>

      {/* ── H. Questions ── */}
      {faq.length > 0 && (
        <section aria-labelledby="questions" className="bg-bg-warm-white py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="questions" className="text-3xl font-heading font-bold text-heading-dark mb-8">
              Questions fréquentes
            </h2>
            <div className="divide-y divide-future-dusk-100 border-y border-future-dusk-100">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-semibold text-heading-dark">{item.question}</h3>
                    <span aria-hidden className="mt-1 text-primary-orbitvu text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-neutral-medium leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── I. Guides et autres secteurs, version compacte ── */}
      <section aria-labelledby="ressources" className="bg-white py-16 lg:py-20 border-t border-future-dusk-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          {ressources.length > 0 && (
            <div>
              <h2 id="ressources" className="text-xl font-heading font-bold text-heading-dark mb-5">
                Guides et articles sur la photo de bijoux
              </h2>
              <ul className="space-y-3">
                {ressources.map((r) => (
                  <li key={r.title}>
                    <Link href={r.href} className="text-heading-dark hover:text-primary-orbitvu underline-offset-4 hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="text-xl font-heading font-bold text-heading-dark mb-5">Autres secteurs</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {autresSecteurs.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={{ pathname: '/industrie/[slug]', params: { slug: s.slug } }}
                    className="text-heading-dark hover:text-primary-orbitvu underline-offset-4 hover:underline"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/industrie" className="font-semibold text-primary-orbitvu underline-offset-4 hover:underline">
                  Tous les secteurs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SchemaOrg
        schema={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            name: secteur.titre,
            description: secteur.description,
            serviceType: lang === 'en' ? 'Automated product photography' : 'Photographie produit automatisée',
            url: `https://www.packshot-creator.com/${lang}/industrie/${slug}`,
            category: secteur.titre.split(':')[0].trim(),
          }),
          ...(faq.length > 0 ? [faqSchema(faq)] : []),
        ]}
      />
    </>
  );
}
