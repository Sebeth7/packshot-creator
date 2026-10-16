/**
 * Présentation de trois modèles Orbitvu, affichée à la place des cartes de stock quand
 * aucune machine réelle n'est établie (décision de Laurent, 16/10/2026).
 *
 * C'est une présentation de MODÈLES, pas un stock : aucun prix, aucune référence
 * d'unité, aucune garantie, aucun état, aucune disponibilité annoncée, aucun balisage
 * `Offer`. Les visuels illustrent le modèle. Les données sont dans
 * `data/occasion/modeles.ts` ; le registre réel `machines.ts` reste séparé.
 */
import Image from 'next/image';
import { Flag, MonitorPlay, Store, type LucideIcon } from 'lucide-react';
import type { OrigineOccasion } from '@/data/occasion/machines';
import { MODELES_PRESENTES } from '@/data/occasion/modeles';
import type { LangueOccasion } from '@/lib/occasion/langues';
import { BoutonModele } from './BoutonMachine';
import { contenuOccasion } from './contenu';
import { boutonSecondaire, chapo, enveloppe, section, surtitre, titre2 } from './styles';

const ICONES_ORIGINE: Partial<Record<OrigineOccasion, LucideIcon>> = {
  showroom: Store,
  demonstration: MonitorPlay,
  salon: Flag,
};
const TRAIT = 1.7;

export function ModelesOccasion({ langue }: { langue: LangueOccasion }) {
  const { MODELES, ORIGINES } = contenuOccasion(langue);

  return (
    <section id="modeles" aria-labelledby="modeles-titre" className={`${section} scroll-mt-20 bg-future-dusk-0`}>
      <div className={enveloppe}>
        <p className={surtitre}>{MODELES.surtitre}</p>
        <h2 id="modeles-titre" className={titre2}>{MODELES.titre}</h2>
        <p className={chapo}>{MODELES.texte}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-7 md:grid-cols-3 md:gap-[18px]">
          {MODELES_PRESENTES.map((m) => {
            const Icone = ICONES_ORIGINE[m.origine] ?? Store;
            const contexte = m.contextes[langue];
            return (
              <article
                key={m.id}
                data-modele-id={m.id}
                className="relative grid grid-cols-[40%_1fr] overflow-hidden rounded-2xl border border-future-dusk-50 bg-white transition-shadow hover:shadow-[0_22px_44px_-30px_rgba(15,17,24,.5)] md:flex md:flex-col"
              >
                <div className="relative min-h-full bg-[#f1f2f6] md:aspect-[4/3] md:min-h-0">
                  <Image
                    src={m.visuel.src}
                    alt={m.visuel.alt[langue]}
                    fill
                    sizes="(min-width: 1120px) 360px, (min-width: 768px) 32vw, 40vw"
                    className="object-contain p-3 md:p-5"
                  />
                  <span className="absolute bottom-2 left-2 hidden rounded bg-[rgba(15,17,24,.62)] px-[7px] py-0.5 text-[10.5px] text-white md:inline">
                    {MODELES.credit}
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
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-future-dusk-50 pt-2.5 text-[13px] md:text-[13.5px]">
                    <dt className="text-future-dusk-400">{MODELES.libelles.origine}</dt>
                    <dd className="font-semibold text-future-dusk-700">{contexte.origineDetail}</dd>
                    <dt className="text-future-dusk-400">{MODELES.libelles.usage}</dt>
                    <dd className="font-semibold text-future-dusk-700">{contexte.usage}</dd>
                    <dt className="text-future-dusk-400">{MODELES.libelles.objet}</dt>
                    <dd className="font-semibold text-future-dusk-700">{contexte.objet}</dd>
                    <dt className="text-future-dusk-400">{MODELES.libelles.charge}</dt>
                    <dd className="font-semibold text-future-dusk-700">{contexte.charge}</dd>
                  </dl>
                  <BoutonModele
                    famille={m.famille}
                    besoin={MODELES.besoin.replace('{nom}', m.nom)}
                    className={`${boutonSecondaire} mt-auto min-h-10 px-2.5 py-2 text-[13.5px] md:min-h-11 md:px-[22px] md:text-sm`}
                  >
                    {MODELES.bouton}
                  </BoutonModele>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
