/**
 * Landing /fr/catalogue-orbitvu-all-in-one — acquisition du catalogue Orbitvu
 * All-in-One (kit d'intégration du 02/10/2026, brief V2).
 *
 * Quatre sections, pas davantage : hero (catalogue + formulaire), aperçus,
 * contenu du catalogue, catalogue / consultant. Page française unique, commune
 * à la France et à la Suisse. Le Header et le Footer partagés du layout ne sont
 * pas modifiés (variante compacte de la maquette : arbitrage ouvert).
 *
 * Visuels : emplacements neutres tant que le PDF paysage autorisé et l'accord
 * d'Orbitvu manquent (visuels.ts). Aucun lien vers /fr/packshot-e-commerce (D37).
 */
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CatalogueForm } from './CatalogueForm';
import { EmplacementVisuel } from './EmplacementVisuel';
import { LienTelephone } from './LienTelephone';
import { CONTENU_CATALOGUE, FINAL, FORMULAIRE, HERO, INTERIEUR, TELEPHONES } from './contenu';
import { VISUELS } from './visuels';

const ANCRE_FORMULAIRE = 'catalogue';

const TRAME = {
  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
  backgroundSize: '24px 24px',
};

const surtitreClair = 'text-xs sm:text-sm font-semibold tracking-[0.12em] text-very-peri-600';
const surtitreSombre = 'text-xs sm:text-sm font-semibold tracking-[0.12em] text-very-peri-200';

/** Couverture au premier plan, deux pages en éventail derrière. */
function Eventail() {
  return (
    <div className="group relative mx-auto w-full max-w-[560px] lg:max-w-[600px] lg:mx-0" style={{ aspectRatio: '1.55' }}>
      <div
        className="absolute right-0 top-0 hidden w-[72%] origin-bottom-left rotate-[7deg] sm:block motion-safe:transition-transform motion-safe:duration-500 motion-safe:lg:group-hover:rotate-[10deg]"
      >
        <EmplacementVisuel visuel={VISUELS.K2} sizes="(min-width: 1024px) 420px, 60vw" className="rounded-[4px] shadow-xl ring-1 ring-black/10" />
      </div>
      <div
        className="absolute right-[6%] top-[5%] w-[74%] origin-bottom-left rotate-[3deg] motion-safe:transition-transform motion-safe:duration-500 motion-safe:lg:group-hover:rotate-[5deg]"
      >
        <EmplacementVisuel visuel={VISUELS.K3} sizes="(min-width: 1024px) 440px, 65vw" className="rounded-[4px] shadow-xl ring-1 ring-black/10" />
      </div>
      <div className="absolute bottom-0 left-0 w-[84%]">
        <EmplacementVisuel
          visuel={VISUELS.K1}
          ton="sombre"
          priority
          sizes="(min-width: 1024px) 500px, 84vw"
          className="rounded-[4px] shadow-2xl shadow-black/50 ring-1 ring-white/15"
        />
      </div>
    </div>
  );
}

// Le H1 est rendu en deux blocs (question, puis invitation) ; son texte reste celui du copydeck.
const [questionH1, suiteH1] = HERO.h1.split(/(?<=\?) /);

export default function CatalogueAllInOne({ apercuInterne }: { apercuInterne: boolean }) {
  return (
    <>
      {/* ━━ 1. HERO : catalogue + formulaire ━━ */}
      <section
        aria-labelledby="catalogue-titre"
        className="relative overflow-hidden bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]" style={TRAME} />
        {apercuInterne && (
          <p className="relative border-b border-amber-300/30 bg-amber-400/10 px-4 py-2 text-center text-xs text-amber-100">
            Aperçu de travail, parcours non activé&nbsp;: visuels du catalogue en attente d’autorisation, aucune
            demande enregistrée ni envoyée.
          </p>
        )}
        <div className="relative mx-auto max-w-xl px-4 pb-10 pt-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 lg:pb-14 lg:pt-10">
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-16">
            <p className={`${surtitreSombre} lg:col-span-7 lg:row-start-1`}>{HERO.surtitre}</p>

            <div className="lg:col-span-7 lg:row-start-3 lg:mt-9">
              <Eventail />
              <p className="mt-6 hidden text-sm text-future-dusk-200 lg:block">{HERO.signature}</p>
            </div>

            <div className="lg:col-span-7 lg:row-start-2 lg:mt-5">
              <h1
                id="catalogue-titre"
                className="text-[1.85rem] leading-[1.12] sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem] font-heading font-bold tracking-tight text-balance"
              >
                <span className="block">{questionH1}</span> <span className="block">{suiteH1}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-future-dusk-100 sm:text-lg">{HERO.valeur}</p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-future-dusk-100 sm:text-base">
                {HERO.reperes.map((repere, i) => (
                  <li key={repere} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="text-very-peri-300">·</span>}
                    {repere}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-future-dusk-200 lg:hidden">{HERO.signature}</p>
            </div>

            <div className="mt-1 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div
                id={ANCRE_FORMULAIRE}
                tabIndex={-1}
                className="scroll-mt-24 rounded-2xl bg-white p-5 text-future-dusk-900 shadow-2xl shadow-black/30 focus:outline-none sm:p-8 lg:p-7 xl:p-8"
              >
                <CatalogueForm />
              </div>
              <div className="mt-3 text-sm text-future-dusk-100">
                <p>{FORMULAIRE.question}</p>
                <p className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                  <LienTelephone pays="FR" lieu="hero" className="inline-flex min-h-11 items-center underline-offset-2 hover:text-white hover:underline">
                    {TELEPHONES.FR.pays}&nbsp;: <strong className="ml-1 font-semibold whitespace-nowrap">{TELEPHONES.FR.affiche}</strong>
                  </LienTelephone>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <LienTelephone pays="CH" lieu="hero" className="inline-flex min-h-11 items-center underline-offset-2 hover:text-white hover:underline">
                    {TELEPHONES.CH.pays}&nbsp;: <strong className="ml-1 font-semibold whitespace-nowrap">{TELEPHONES.CH.affiche}</strong>
                  </LienTelephone>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 2. À L'INTÉRIEUR : trois extraits ━━ */}
      <section aria-labelledby="interieur-titre" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className={surtitreClair}>{INTERIEUR.surtitre}</p>
            <h2 id="interieur-titre" className="mt-3 text-3xl font-heading font-bold tracking-tight text-future-dusk-900 sm:text-4xl">
              {INTERIEUR.h2}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-future-dusk-600">{INTERIEUR.intro}</p>
          </div>

          <ul
            aria-label="Extraits du catalogue"
            tabIndex={0}
            data-lenis-prevent
            className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {(['K4', 'K5', 'K6'] as const).map((id, i) => (
              <li
                key={id}
                className={`w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-auto ${
                  i === 0 ? 'lg:col-span-7 lg:row-span-2 lg:self-center' : 'lg:col-span-5'
                }`}
              >
                <figure>
                  <EmplacementVisuel
                    visuel={VISUELS[id]}
                    sizes={i === 0 ? '(min-width: 1024px) 720px, 86vw' : '(min-width: 1024px) 500px, 86vw'}
                    className="rounded-lg shadow-lg shadow-future-dusk-900/10 ring-1 ring-future-dusk-100"
                  />
                  <figcaption className="mt-3 text-sm text-future-dusk-600">{VISUELS[id].texte}</figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <a
            href={`#${ANCRE_FORMULAIRE}`}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl border border-very-peri-200 px-5 text-base font-semibold text-very-peri-700 transition-colors hover:bg-very-peri-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400"
          >
            {INTERIEUR.microCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ━━ 3. CE QUE VOUS Y TROUVEREZ ━━ */}
      <section aria-labelledby="contenu-titre" className="bg-future-dusk-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className={surtitreClair}>{CONTENU_CATALOGUE.surtitre}</p>
          <h2 id="contenu-titre" className="mt-3 max-w-2xl text-3xl font-heading font-bold tracking-tight text-future-dusk-900 sm:text-4xl">
            {CONTENU_CATALOGUE.h2}
          </h2>
          <ol className="mt-10 border-t border-future-dusk-100">
            {CONTENU_CATALOGUE.lignes.map((ligne, i) => (
              <li key={ligne.titre} className="grid gap-2 border-b border-future-dusk-100 py-6 lg:grid-cols-12 lg:gap-8 lg:py-8">
                <h3 className="flex items-baseline gap-4 text-xl font-heading font-bold text-future-dusk-900 lg:col-span-4">
                  <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-very-peri-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {ligne.titre}
                </h3>
                <p className="text-base leading-relaxed text-future-dusk-700 lg:col-span-6">{ligne.texte}</p>
                <p className="text-sm italic text-future-dusk-500 lg:col-span-2 lg:text-right">{ligne.pages}</p>
              </li>
            ))}
          </ol>
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
              <p className={surtitreClair}>{FINAL.catalogue.surtitre}</p>
              <h2 className="mt-3 text-2xl font-heading font-bold tracking-tight sm:text-3xl">{FINAL.catalogue.titre}</h2>
              <p className="mt-3 text-base leading-relaxed text-future-dusk-600">{FINAL.catalogue.texte}</p>
              <a
                href={`#${ANCRE_FORMULAIRE}`}
                className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-very-peri-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-very-peri-500/25 transition-colors hover:bg-very-peri-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-very-peri-300 sm:w-auto"
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
