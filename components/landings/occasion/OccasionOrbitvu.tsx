/**
 * Landing « Studios Orbitvu d'occasion » — /fr/studios-photo-automatises/opportunites.
 * Intégration de la maquette V4.1 du 10/10/2026 (référence graphique et éditoriale).
 *
 * Deux états, calculés côté serveur depuis la source de stock (jamais depuis
 * l'adresse ni un fragment) :
 * - avec machines : hero, machines, liste d'attente, fiche, garantie, demande ;
 * - sans machine : hero, liste d'attente juste après, fiche, garantie, contact général.
 * Deux parcours séparés : demande sur une machine (A), alertes de disponibilité (B),
 * tous deux en simulation (aucune donnée envoyée).
 *
 * Header et Footer partagés : seul le lien texte « Offres d'occasion » y est ajouté
 * (lib/occasion/navigation.ts). Aucun CTA de démonstration ni lien vers le neuf ajouté.
 */
import Image from 'next/image';
import {
  ArrowLeftRight, Award, Bell, CalendarDays, Check, Flag, History, ImageIcon, KeyRound, Mail, MapPin,
  MessageSquare, MonitorCheck, MonitorPlay, Phone, RefreshCw, SearchCheck, ShieldCheck, SlidersHorizontal, Store, Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { OrigineOccasion, PhotoOccasion } from '@/data/occasion/machines';
import { ORIGINES } from '@/lib/occasion/stock';
import { Annotation } from './Annotation';
import { BandeauApercu } from './BandeauApercu';
import { BoutonMachine } from './BoutonMachine';
import { FormulaireAlertes } from './FormulaireAlertes';
import { FormulaireDemande } from './FormulaireDemande';
import { ALERTES, CONTACT_GENERAL, DEMANDE, FICHE, GARANTIE, HERO, MACHINES } from './contenu';
import { boutonPrincipal, boutonSecondaire, chapo, enveloppe, section, surtitre, titre2 } from './styles';

export interface CarteMachine {
  ref: string;
  nom: string;
  origine: OrigineOccasion;
  origineDetail: string;
  usage: string;
  photo: PhotoOccasion;
  fictif: boolean;
}

const ICONES_ORIGINE: Record<OrigineOccasion, LucideIcon> = {
  showroom: Store,
  demonstration: MonitorPlay,
  salon: Flag,
  location: CalendarDays,
  reprise: ArrowLeftRight,
  renouvellement: RefreshCw,
};
const ICONES_FICHE: LucideIcon[] = [History, SearchCheck, MonitorCheck, ImageIcon, ShieldCheck];
const ICONES_GARANTIE: LucideIcon[] = [ShieldCheck, KeyRound, Wrench, Award];
const TRAIT = 1.7;

export default function OccasionOrbitvu({
  machines,
  apercuInterne,
  vue,
  nombreReel,
}: {
  machines: CarteMachine[];
  apercuInterne: boolean;
  vue: 'reel' | 'exemples';
  nombreReel: number;
}) {
  const stock = machines.length > 0;

  return (
    <div id="occasion" data-annot="on" data-etat={stock ? 'stock' : 'vide'} className="group/occasion">
      {apercuInterne && <BandeauApercu vue={vue} nombreReel={nombreReel} />}

      {/* ━━ HERO ━━ */}
      <section aria-labelledby="occasion-titre" className="border-b border-future-dusk-50 bg-bg-warm-white">
        <div className={enveloppe}>
          <div className="grid grid-cols-1 items-center gap-[22px] pb-[26px] pt-5 md:grid-cols-[1.08fr_.92fr] md:gap-12 md:pb-9 md:pt-14">
            <div>
              <p className={surtitre}>{HERO.surtitre}</p>
              <h1
                id="occasion-titre"
                className="mb-4 mt-3.5 font-heading text-[clamp(32px,4vw,48px)] font-bold leading-[1.07] tracking-[-0.015em] text-future-dusk-900"
              >
                {HERO.titre}
              </h1>
              <p className="max-w-[560px] text-[16.5px] text-[#3a4450] md:text-lg">{HERO.texte}</p>
              <ul className="mt-[18px] flex flex-col gap-2 md:mt-[22px] md:flex-row md:flex-wrap md:gap-x-[22px] md:gap-y-2.5">
                {HERO.reperes.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-[14.5px] font-semibold text-future-dusk-700">
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-[#1f7a55]" strokeWidth={2} />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-[22px] flex flex-col gap-3 md:mt-7 md:flex-row md:flex-wrap">
                {stock ? (
                  <>
                    <a href="#machines" className={`${boutonPrincipal} w-full md:w-auto`} data-test="hero-voir">
                      {HERO.ctaVoir}
                    </a>
                    <a href="#alertes" className={`${boutonSecondaire} w-full md:w-auto`} data-test="hero-alerte">
                      <Bell aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={TRAIT} />
                      {HERO.ctaAlerteStock}
                    </a>
                  </>
                ) : (
                  <a href="#alertes" className={`${boutonPrincipal} w-full md:w-auto`} data-test="hero-alerte-vide">
                    <Bell aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={TRAIT} />
                    {HERO.ctaAlerteVide}
                  </a>
                )}
              </div>
            </div>
            <div className="relative order-first aspect-[16/10] overflow-hidden rounded-[18px] bg-[#ddd] shadow-[0_30px_60px_-30px_rgba(15,17,24,.45)] md:order-none md:aspect-[4/3]">
              <Image
                src={HERO.photo.src}
                alt={HERO.photo.alt}
                fill
                priority
                sizes="(min-width: 1120px) 490px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-[68%_50%]"
              />
              <span className="absolute bottom-2.5 left-2.5 right-2.5 w-fit rounded-[5px] bg-[rgba(15,17,24,.6)] px-2 py-[3px] text-[11px] leading-[1.4] text-white">
                {HERO.photo.credit} <Annotation visible={apercuInterne}>{HERO.photo.annotation}</Annotation>
              </span>
            </div>
          </div>
          <div
            className={`flex-wrap items-center gap-2 border-t border-future-dusk-50 pb-5 pt-4 md:gap-x-4 md:gap-y-2.5 md:pb-[22px] md:pt-[18px] ${stock ? 'flex' : 'hidden md:flex'}`}
          >
            <span className="mr-1 basis-full text-xs font-semibold uppercase tracking-[0.14em] text-future-dusk-400 md:basis-auto">
              {HERO.originesTitre}
            </span>
            {(Object.keys(ORIGINES) as OrigineOccasion[]).map((o) => {
              const Icone = ICONES_ORIGINE[o];
              return (
                <span
                  key={o}
                  className="inline-flex items-center gap-[7px] rounded-full border border-future-dusk-50 bg-white py-[5px] pl-2 pr-2.5 text-[12.5px] font-semibold text-future-dusk-700 md:py-1.5 md:pl-[9px] md:pr-3 md:text-[13.5px]"
                >
                  <Icone aria-hidden="true" className="h-[17px] w-[17px] text-very-peri-500" strokeWidth={TRAIT} />
                  {ORIGINES[o].libelle}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━ MACHINES (état avec stock) ━━ */}
      {stock && (
        <section id="machines" aria-labelledby="machines-titre" className={`${section} scroll-mt-20 bg-future-dusk-0`}>
          <div className={enveloppe}>
            <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-6">
              <div>
                <p className={surtitre}>{MACHINES.surtitre}</p>
                <h2 id="machines-titre" className={titre2}>{MACHINES.titre}</h2>
                <p className={chapo}>{MACHINES.texte}</p>
              </div>
              <a
                href="#alertes"
                data-test="jump-alerte"
                className="inline-flex items-center gap-2 rounded-full border border-very-peri-100 bg-white px-3.5 py-2 text-[14.5px] font-semibold text-very-peri-600 no-underline"
              >
                <Bell aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={TRAIT} />
                {MACHINES.lienAlerte}
              </a>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 md:mt-7 md:grid-cols-3 md:gap-[18px]">
              {machines.map((m) => {
                const Icone = ICONES_ORIGINE[m.origine];
                return (
                  <article
                    key={m.ref}
                    data-ref={m.ref}
                    className="relative grid grid-cols-[40%_1fr] overflow-hidden rounded-2xl border border-future-dusk-50 bg-white transition-shadow hover:shadow-[0_22px_44px_-30px_rgba(15,17,24,.5)] md:flex md:flex-col"
                  >
                    {m.fictif && (
                      <span className="absolute left-2.5 top-2.5 z-[2] rounded-[5px] bg-accent-gold px-[7px] py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-future-dusk-800">
                        {MACHINES.etiquetteFictif}
                      </span>
                    )}
                    <div className="relative min-h-full bg-[#e9eaee] md:aspect-[4/3] md:min-h-0">
                      <Image
                        src={m.photo.src}
                        alt={m.photo.alt}
                        fill
                        sizes="(min-width: 1120px) 360px, (min-width: 768px) 32vw, 40vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 hidden rounded bg-[rgba(15,17,24,.62)] px-[7px] py-0.5 text-[10.5px] text-white md:inline">
                        {m.photo.credit}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 px-3.5 py-3 md:gap-2.5 md:px-5 md:pb-5 md:pt-4">
                      <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-very-peri-50 py-1 pl-2 pr-2.5 text-[12.5px] font-semibold text-very-peri-600">
                        <Icone aria-hidden="true" className="h-[15px] w-[15px]" strokeWidth={TRAIT} />
                        {ORIGINES[m.origine].carte}
                      </span>
                      <h3 className="font-heading text-base font-bold leading-[1.2] tracking-[-0.015em] text-future-dusk-900 md:text-[18.5px]">
                        {m.nom}
                      </h3>
                      <div className="-mt-1.5 text-xs font-semibold tracking-[0.04em] text-future-dusk-400">Réf. {m.ref}</div>
                      <dl className="hidden grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-future-dusk-50 pt-2.5 text-[13.5px] md:grid">
                        <dt className="text-future-dusk-400">{MACHINES.libelles.origine}</dt>
                        <dd className="font-semibold text-future-dusk-700">{m.origineDetail}</dd>
                        <dt className="text-future-dusk-400">{MACHINES.libelles.usage}</dt>
                        <dd className="font-semibold text-future-dusk-700">{m.usage}</dd>
                        <dt className="text-future-dusk-400">{MACHINES.libelles.garantie}</dt>
                        <dd className="font-semibold text-future-dusk-700">{MACHINES.garantieCarte}</dd>
                      </dl>
                      <BoutonMachine
                        reference={m.ref}
                        className={`${boutonSecondaire} mt-auto min-h-10 px-2.5 py-2 text-[13.5px] md:min-h-11 md:px-[22px] md:text-sm`}
                      >
                        {MACHINES.bouton}
                      </BoutonMachine>
                    </div>
                  </article>
                );
              })}
            </div>
            {apercuInterne && (
              <p className="mt-3.5 text-[13px] text-future-dusk-400">
                <Annotation visible={apercuInterne}>{MACHINES.annotation}</Annotation>
              </p>
            )}
          </div>
        </section>
      )}

      {/* ━━ LISTE D'ATTENTE (parcours B) ━━ */}
      <section
        id="alertes"
        aria-labelledby="alertes-titre"
        className={`scroll-mt-20 bg-future-dusk-0 pb-[52px] md:pb-[76px] ${stock ? '' : 'pt-6 md:pt-14'}`}
      >
        <div className={enveloppe}>
          <div className="relative grid grid-cols-1 gap-y-5 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#2b2c6e_0%,#4a4ba3_55%,#6667AB_100%)] px-4 py-6 text-[#e9e9fb] shadow-[0_40px_70px_-40px_rgba(43,44,110,.8)] md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-11 md:gap-y-0 md:rounded-[22px] md:p-11">
            <div aria-hidden="true" className="pointer-events-none absolute -right-[120px] -top-[120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(205,205,253,.22),transparent_70%)]" />
            <div className="relative z-[1] md:col-start-1 md:row-start-1">
              {stock ? (
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#CDCDFD]">
                  <Bell aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={TRAIT} />
                  {ALERTES.surtitre}
                </p>
              ) : (
                <p className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-[rgba(205,205,253,.3)] bg-white/[.12] px-3 py-[5px] text-[13.5px] font-semibold text-white">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-gold" />
                  {ALERTES.statutVide}
                </p>
              )}
              <h2 id="alertes-titre" className={`${titre2} mt-3 text-white`}>{ALERTES.titre}</h2>
              <p className="text-[16.5px] text-[#d9daf5]">{ALERTES.texte}</p>
            </div>
            <FormulaireAlertes apercuInterne={apercuInterne} />
            <ul className="relative z-[1] grid content-start gap-2.5 md:col-start-1 md:row-start-2 md:mt-5">
              {ALERTES.points.map((p, i) => {
                const Icone = [Mail, Bell, SlidersHorizontal][i];
                return (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-[#eceeff]">
                    <Icone aria-hidden="true" className="mt-px h-5 w-5 flex-[0_0_20px] text-[#CDCDFD]" strokeWidth={TRAIT} />
                    {p}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ━━ CE QUE VOUS SAUREZ ━━ */}
      <section id="fiche" aria-labelledby="fiche-titre" className={section}>
        <div className={enveloppe}>
          <p className={surtitre}>{FICHE.surtitre}</p>
          <h2 id="fiche-titre" className={titre2}>{FICHE.titre}</h2>
          <p className={chapo}>
            {FICHE.texte} <Annotation visible={apercuInterne}>{FICHE.annotation}</Annotation>
          </p>
          <div className="mt-8 grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {FICHE.themes.map((t, i) => {
              const Icone = ICONES_FICHE[i];
              return (
                <div key={t.titre} className="grid grid-cols-[44px_1fr] gap-3.5 rounded-2xl border border-future-dusk-50 bg-white p-3.5 md:block md:p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-very-peri-50 text-very-peri-600 md:mb-3.5 md:h-12 md:w-12">
                    <Icone aria-hidden="true" className="h-[26px] w-[26px]" strokeWidth={TRAIT} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-bold leading-[1.25] tracking-[-0.015em] text-future-dusk-900">{t.titre}</h3>
                    <p className="text-[13.8px] text-[#4a5462]">{t.texte}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━ GARANTIE ET ACCOMPAGNEMENT ━━ */}
      <section aria-labelledby="garantie-titre" className={`${section} bg-future-dusk-900 text-[#e7e9f0]`}>
        <div className={enveloppe}>
          <p className={`${surtitre} text-[#CDCDFD]`}>{GARANTIE.surtitre}</p>
          <h2 id="garantie-titre" className={`${titre2} text-white`}>{GARANTIE.titre}</h2>
          <p className={`${chapo} text-[#c3c8d4]`}>{GARANTIE.texte}</p>
          <div className="mt-[30px] grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3.5 lg:grid-cols-4">
            {GARANTIE.blocs.map((b, i) => {
              const Icone = ICONES_GARANTIE[i];
              return (
                <div
                  key={b.titre}
                  className="grid grid-cols-[46px_1fr] gap-3.5 rounded-2xl border border-[rgba(205,205,253,.16)] bg-white/5 p-4 md:block md:p-[22px]"
                >
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[rgba(205,205,253,.12)] text-[#CDCDFD] md:mb-3.5 md:h-[50px] md:w-[50px]">
                    <Icone aria-hidden="true" className="h-[27px] w-[27px]" strokeWidth={TRAIT} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-[16.5px] font-bold tracking-[-0.015em] text-white">{b.titre}</h3>
                    <p className="text-[13.8px] text-[#c3c8d4]">{b.texte}</p>
                    {'annotation' in b && b.annotation && (
                      <Annotation visible={apercuInterne} className="mt-2.5">{b.annotation}</Annotation>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-[22px] flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-[rgba(205,205,253,.14)] pt-[18px] text-sm text-[#c3c8d4]">
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-[18px] w-[18px] flex-[0_0_18px] text-[#CDCDFD]" strokeWidth={TRAIT} />
              {GARANTIE.showroom}
            </span>
            <Annotation visible={apercuInterne}>{GARANTIE.annotationShowroom}</Annotation>
          </div>
        </div>
      </section>

      {/* ━━ DEMANDE SUR UNE MACHINE (parcours A, état avec stock) ━━ */}
      {stock && (
        <section id="demande" aria-labelledby="demande-titre" className={`${section} scroll-mt-20`}>
          <div className={`${enveloppe} grid grid-cols-1 items-start gap-6 md:grid-cols-[.9fr_1.1fr] md:gap-14`}>
            <div>
              <p className={surtitre}>{DEMANDE.surtitre}</p>
              <h2 id="demande-titre" className={titre2}>{DEMANDE.titre}</h2>
              <p className={chapo}>{DEMANDE.texte}</p>
              <ul>
                <li className="mt-3 flex items-start gap-2.5 text-[15px] text-[#3a4450]">
                  <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 flex-[0_0_20px] text-very-peri-500" strokeWidth={TRAIT} />
                  {DEMANDE.point}
                </li>
              </ul>
              <div className="mt-[26px] rounded-[14px] border border-very-peri-100 bg-very-peri-50 px-[18px] py-4 text-[14.5px] text-future-dusk-700">
                {DEMANDE.alternative}
                <br />
                <a href="#alertes" data-test="alt-alerte" className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-very-peri-600 no-underline">
                  <Bell aria-hidden="true" className="h-[17px] w-[17px]" strokeWidth={TRAIT} />
                  {DEMANDE.lienAlerte}
                </a>
              </div>
            </div>
            <FormulaireDemande
              apercuInterne={apercuInterne}
              machines={machines.map((m) => ({ ref: m.ref, libelle: `${m.nom} — ${ORIGINES[m.origine].option} (${m.ref})` }))}
            />
          </div>
        </section>
      )}

      {/* ━━ CONTACT GÉNÉRAL (état sans machine) ━━ */}
      {!stock && (
        <section id="contact-general" aria-labelledby="contact-general-titre" className={section}>
          <div className={enveloppe}>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-[18px] rounded-[18px] border border-future-dusk-50 bg-white p-5 md:px-[30px] md:py-[26px]">
              <div>
                <p className={surtitre}>{CONTACT_GENERAL.surtitre}</p>
                <h2 id="contact-general-titre" className="mb-1.5 mt-2 font-heading text-2xl font-bold tracking-[-0.015em] text-future-dusk-900">
                  {CONTACT_GENERAL.titre}
                </h2>
                <p className="max-w-[640px] text-[#46505c]">{CONTACT_GENERAL.texte}</p>
              </div>
              <Link href="/contact" data-test="contact-general" className={`${boutonSecondaire} w-full md:w-auto`}>
                <MessageSquare aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={TRAIT} />
                {CONTACT_GENERAL.bouton}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
