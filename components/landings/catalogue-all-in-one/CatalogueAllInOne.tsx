/**
 * Landing /fr/catalogue-orbitvu-all-in-one — acquisition du catalogue Orbitvu
 * All-in-One. Version V3 du 02/10/2026 (retour de Laurent) : ce qui donne envie,
 * ce sont les possibilités des studios Orbitvu ; le catalogue est la première étape
 * concrète pour choisir.
 *
 * Quatre sections : hero (vidéo de la home, promesse, formulaire), possibilités,
 * choix du studio avec le catalogue, catalogue / consultant. Page française unique,
 * commune à la France et à la Suisse. Header et Footer partagés non modifiés
 * (variante compacte de la maquette : arbitrage ouvert).
 *
 * Vidéo : fichiers de la home (public/images/hero/), lus par VideoStudio, variante
 * locale de HeroVideo (non modifié). Pages du catalogue : emplacements neutres tant
 * que l'export paysage correct manque (visuels.ts). Aucun lien vers F5 (D37).
 */
import Image from 'next/image';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CatalogueForm } from './CatalogueForm';
import { EmplacementVisuel } from './EmplacementVisuel';
import { LienTelephone } from './LienTelephone';
import { SansCoupure } from './SansCoupure';
import { VideoStudio } from './VideoStudio';
import { FINAL, FORMULAIRE, HERO, POSSIBILITES, STUDIO, TELEPHONES } from './contenu';
import { VISUELS, VISUELS_GAMME } from './visuels';

const ANCRE_FORMULAIRE = 'catalogue';

// Vidéo de la page d'accueil, réutilisée telle quelle (aucune copie du fichier).
const VIDEO_GAMME = {
  src: '/images/hero/hero-range-2025.mp4',
  poster: '/images/hero/hero-range-2025-poster.avif',
  // Studio et écran occupent 27 % à 80 % de la largeur : centre décalé vers la droite.
  cadrage: '55% 50%',
};

const TRAME = {
  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
  backgroundSize: '24px 24px',
};

const surtitreClair = 'text-xs sm:text-sm font-semibold tracking-[0.12em] text-very-peri-600';
const surtitreSombre = 'text-xs sm:text-sm font-semibold tracking-[0.12em] text-very-peri-200';
const boutonPrincipal =
  'inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-very-peri-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-very-peri-500/25 transition-colors hover:bg-very-peri-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-very-peri-300';

export default function CatalogueAllInOne({ apercuInterne }: { apercuInterne: boolean }) {
  return (
    <>
      {/* ━━ 1. HERO : vidéo, promesse, formulaire ━━
          Mobile et tablette : vidéo (image fixe sous 768 px) en bandeau → titre → formulaire → transition.
          Desktop : texte, vidéo puis transition à gauche ; formulaire à droite. */}
      <section
        aria-labelledby="catalogue-titre"
        className="relative overflow-hidden bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]" style={TRAME} />
        <div className="relative mx-auto max-w-xl px-4 pb-10 sm:px-6 sm:pt-8 lg:max-w-7xl lg:px-8 lg:pb-14 lg:pt-8">
          {/* 4e ligne en 1fr : la hauteur du formulaire n'écarte pas le texte de la vidéo. */}
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-10 lg:gap-y-0 xl:gap-x-14">
            <div className="-mx-4 sm:mx-0 lg:col-span-7 lg:row-start-2 lg:mt-7">
              <VideoStudio
                src={VIDEO_GAMME.src}
                poster={VIDEO_GAMME.poster}
                cadrage={VIDEO_GAMME.cadrage}
                className="aspect-[2.4/1] bg-future-dusk-800 sm:aspect-[2.2/1] sm:rounded-2xl sm:shadow-2xl sm:shadow-black/40 sm:ring-1 sm:ring-white/10 lg:aspect-[2/1]"
              />
            </div>

            <div className="lg:col-span-7 lg:row-start-1">
              <p className="text-[11px] font-semibold tracking-[0.04em] text-very-peri-200 sm:text-sm sm:tracking-[0.12em]">
                {HERO.surtitre}
              </p>
              <h1
                id="catalogue-titre"
                className="mt-3 text-[2rem] font-heading font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:mt-4 lg:text-[3.1rem] xl:text-[3.4rem]"
              >
                {HERO.h1}
              </h1>
              <div className="mt-4 max-w-2xl space-y-2 text-base leading-relaxed text-future-dusk-100 sm:text-lg">
                {/* Sous 640 px, le second paragraphe est masqué : le formulaire arrive plus tôt. */}
                {HERO.valeur.map((paragraphe, i) => (
                  <p key={paragraphe} className={i > 0 ? 'hidden sm:block' : undefined}>
                    {paragraphe}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-1 lg:col-span-5 lg:col-start-8 lg:row-span-4 lg:row-start-1 lg:mt-0">
              <div
                id={ANCRE_FORMULAIRE}
                tabIndex={-1}
                className="scroll-mt-24 rounded-2xl bg-white p-5 text-future-dusk-900 shadow-2xl shadow-black/30 focus:outline-none sm:p-8 lg:p-7"
              >
                <CatalogueForm />
              </div>
              <div className="mt-3 text-sm text-future-dusk-100">
                <p>{FORMULAIRE.question}</p>
                <p className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                  <LienTelephone pays="FR" lieu="hero" className="inline-flex min-h-11 items-center underline-offset-2 hover:text-white hover:underline">
                    {TELEPHONES.FR.pays}&nbsp;: <strong className="ml-1 whitespace-nowrap font-semibold">{TELEPHONES.FR.affiche}</strong>
                  </LienTelephone>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <LienTelephone pays="CH" lieu="hero" className="inline-flex min-h-11 items-center underline-offset-2 hover:text-white hover:underline">
                    {TELEPHONES.CH.pays}&nbsp;: <strong className="ml-1 whitespace-nowrap font-semibold">{TELEPHONES.CH.affiche}</strong>
                  </LienTelephone>
                </p>
              </div>
            </div>
            <div className="mt-3 lg:col-span-7 lg:row-start-3 lg:mt-7">
              <p className="font-heading text-lg font-semibold sm:text-xl">{HERO.transition.titre}</p>
              <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-future-dusk-100">
                <SansCoupure texte={HERO.transition.texte} />
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-future-dusk-200">
                {HERO.reperes.map((repere, i) => (
                  <li key={repere} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="text-very-peri-300">·</span>}
                    {repere}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-future-dusk-200">{HERO.signature}</p>
            </div>

          </div>
        </div>
        {apercuInterne && (
          <p className="relative border-t border-amber-300/30 bg-amber-400/10 px-4 py-2 text-center text-xs text-amber-100">
            Aperçu de travail, parcours non activé&nbsp;: pages du catalogue en attente du PDF définitif, aucune demande
            enregistrée ni envoyée.
          </p>
        )}
      </section>

      {/* ━━ 2. IMAGINEZ LES POSSIBILITÉS ━━ Visuels Orbitvu déjà publiés sur les fiches du site. */}
      <section aria-labelledby="possibilites-titre" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="possibilites-titre" className="text-3xl font-heading font-bold tracking-tight text-future-dusk-900 sm:text-4xl">
            {POSSIBILITES.h2}
          </h2>
          <ul
            aria-label={POSSIBILITES.h2}
            tabIndex={0}
            data-lenis-prevent
            className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
            {VISUELS_GAMME.map((visuel) => (
              <li key={visuel.cle} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white ring-1 ring-future-dusk-100">
                    <Image
                      src={visuel.src}
                      alt={visuel.alt}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 78vw"
                      className={visuel.ajustement === 'contain' ? 'object-contain p-3' : 'object-cover'}
                      style={visuel.cadrage ? { objectPosition: visuel.cadrage } : undefined}
                    />
                  </div>
                  <figcaption className="mt-3">
                    <span className="block font-heading text-lg font-semibold text-future-dusk-900">{visuel.titre}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-future-dusk-600">{visuel.legende}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex max-w-3xl gap-2.5 text-sm leading-relaxed text-future-dusk-600">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-very-peri-500" aria-hidden="true" />
            {POSSIBILITES.ia}
          </p>
        </div>
      </section>

      {/* ━━ 3. TROUVEZ LE STUDIO ADAPTÉ : le catalogue comme aide au choix ━━ */}
      <section aria-labelledby="studio-titre" className="bg-future-dusk-0 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 id="studio-titre" className="text-3xl font-heading font-bold tracking-tight text-future-dusk-900 sm:text-4xl">
              {STUDIO.h2}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-future-dusk-600">{STUDIO.intro}</p>
            <ol className="mt-6 space-y-5">
              {STUDIO.lignes.map((ligne, i) => (
                <li key={ligne.titre} className="flex gap-4">
                  <span aria-hidden="true" className="mt-0.5 text-sm font-semibold tabular-nums text-very-peri-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-future-dusk-900">{ligne.titre}</h3>
                    <p className="mt-1 text-base leading-relaxed text-future-dusk-700">
                      {ligne.texte} <span className="italic text-future-dusk-500">{ligne.pages}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <a href={`#${ANCRE_FORMULAIRE}`} className={`${boutonPrincipal} mt-8 w-full sm:w-auto`}>
              {STUDIO.cta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <figure>
              <EmplacementVisuel
                visuel={VISUELS.K6}
                sizes="(min-width: 1024px) 700px, 92vw"
                className="rounded-lg bg-white shadow-lg shadow-future-dusk-900/10 ring-1 ring-future-dusk-100"
              />
              <figcaption className="mt-3 text-sm text-future-dusk-600">{VISUELS.K6.texte}</figcaption>
            </figure>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {(['K5', 'K4'] as const).map((id) => (
                <figure key={id}>
                  <EmplacementVisuel
                    visuel={VISUELS[id]}
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
                    className="rounded-lg bg-white shadow-lg shadow-future-dusk-900/10 ring-1 ring-future-dusk-100"
                  />
                  <figcaption className="mt-3 text-sm text-future-dusk-600">{VISUELS[id].texte}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 4. CATALOGUE / CONSULTANT ━━ */}
      <section
        aria-label="Recevoir le catalogue ou parler à un consultant"
        className="relative overflow-hidden bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 py-16 text-white sm:py-20"
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]" style={TRAME} />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:px-8">
          <div className="flex flex-col gap-8 rounded-2xl bg-white p-6 text-future-dusk-900 shadow-2xl shadow-black/30 sm:flex-row sm:items-center sm:p-10 lg:col-span-3">
            <div className="flex-1">
              <p className={surtitreClair}>
                <SansCoupure texte={FINAL.catalogue.surtitre} />
              </p>
              <h2 className="mt-3 text-2xl font-heading font-bold tracking-tight sm:text-3xl">{FINAL.catalogue.titre}</h2>
              <p className="mt-3 text-base leading-relaxed text-future-dusk-600">{FINAL.catalogue.texte}</p>
              <a
                href={`#${ANCRE_FORMULAIRE}`}
                className={`${boutonPrincipal} mt-6 w-full sm:w-auto`}
              >
                {FINAL.catalogue.bouton}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div className="hidden w-44 shrink-0 -rotate-2 sm:block lg:w-52">
              <EmplacementVisuel
                visuel={VISUELS.K1}
                ton="sombre"
                sizes="208px"
                className="rounded-[4px] shadow-xl shadow-future-dusk-900/30 ring-1 ring-future-dusk-900/10"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/15 sm:p-8 lg:col-span-2">
            <p className={surtitreSombre}>{FINAL.consultant.surtitre}</p>
            <h2 className="mt-3 text-2xl font-heading font-bold tracking-tight">{FINAL.consultant.titre}</h2>
            <p className="mt-3 text-base leading-relaxed text-future-dusk-100">{FINAL.consultant.texte}</p>
            <ul className="mt-6 space-y-2">
              {(['FR', 'CH'] as const).map((pays) => (
                <li key={pays}>
                  <LienTelephone
                    pays={pays}
                    lieu="consultant"
                    className="flex min-h-12 items-center gap-3 rounded-xl bg-white/[0.08] px-4 py-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-300"
                  >
                    <Phone className="h-4 w-4 text-very-peri-200" aria-hidden="true" />
                    <span className="text-sm text-future-dusk-100">{TELEPHONES[pays].pays}</span>
                    <span className="ml-auto font-semibold tabular-nums">{TELEPHONES[pays].affiche}</span>
                  </LienTelephone>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-future-dusk-200">{FINAL.consultant.zones}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-11 items-center self-start text-sm text-future-dusk-200 underline underline-offset-4 transition-colors hover:text-white"
            >
              {FINAL.consultant.demo}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
