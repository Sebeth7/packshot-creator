'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { validerDemande, type Erreurs, type SaisieDemande } from '@/lib/occasion/formulaires';
import { Annotation, AvisSimulation } from './Annotation';
import { EVENEMENT_MACHINE } from './BoutonMachine';
import { DEMANDE, SIMULATION } from './contenu';
import { boutonPrincipal, champ, etiquette, liste, mentionFine, messageErreur, saisie } from './styles';

export interface OptionMachine {
  ref: string;
  libelle: string;
}

const ORDRE: readonly (keyof SaisieDemande)[] = ['machine', 'prenom', 'nom', 'societe', 'email', 'telephone', 'rgpd'];

/**
 * Parcours A — demande sur une machine réellement disponible (la liste vient du
 * serveur). Le bouton d'une carte présélectionne sa référence.
 * SIMULATION : validation dans le navigateur, aucune requête réseau, aucun CRM,
 * aucun e-mail, aucun stockage (GO_FORMULAIRES_REELS = NO).
 */
export function FormulaireDemande({ machines, apercuInterne }: { machines: OptionMachine[]; apercuInterne: boolean }) {
  const [valeurs, setValeurs] = useState<SaisieDemande>({
    machine: '', prenom: '', nom: '', societe: '', email: '', telephone: '', rappel: true, rgpd: false,
  });
  const [erreurs, setErreurs] = useState<Erreurs<SaisieDemande>>({});
  const [envoye, setEnvoye] = useState(false);
  const champs = useRef<Partial<Record<keyof SaisieDemande, HTMLInputElement | HTMLSelectElement | null>>>({});

  const maj = <K extends keyof SaisieDemande>(cle: K, valeur: SaisieDemande[K]) => {
    setValeurs((v) => ({ ...v, [cle]: valeur }));
    setErreurs((e) => ({ ...e, [cle]: undefined }));
  };

  useEffect(() => {
    const choisir = (ev: Event) => {
      const ref = (ev as CustomEvent<string>).detail;
      if (!machines.some((m) => m.ref === ref)) return;
      setEnvoye(false);
      setValeurs((v) => ({ ...v, machine: ref }));
      setErreurs((e) => ({ ...e, machine: undefined }));
      document.getElementById('demande')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => champs.current.machine?.focus({ preventScroll: true }), 400);
    };
    window.addEventListener(EVENEMENT_MACHINE, choisir);
    return () => window.removeEventListener(EVENEMENT_MACHINE, choisir);
  }, [machines]);

  const soumettre = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // simulation : rien n'est envoyé ni stocké
    const e = validerDemande(valeurs, machines.map((m) => m.ref));
    setErreurs(e);
    const premier = ORDRE.find((k) => e[k]);
    if (premier) {
      champs.current[premier]?.focus();
      return;
    }
    setEnvoye(true);
  };

  const texte = (cle: 'prenom' | 'nom' | 'societe' | 'email' | 'telephone', type: string, autoComplete: string) => (
    <div className={champ}>
      <label htmlFor={`d-${cle}`} className={etiquette}>{DEMANDE.champs[cle]}</label>
      <input
        ref={(el) => { champs.current[cle] = el; }}
        id={`d-${cle}`}
        name={cle}
        type={type}
        autoComplete={autoComplete}
        value={valeurs[cle]}
        onChange={(e) => maj(cle, e.target.value)}
        aria-invalid={Boolean(erreurs[cle])}
        aria-describedby={erreurs[cle] ? `d-${cle}-err` : undefined}
        className={saisie(Boolean(erreurs[cle]))}
      />
      {erreurs[cle] && <span id={`d-${cle}-err`} className={messageErreur}>{erreurs[cle]}</span>}
    </div>
  );

  const choisie = machines.find((m) => m.ref === valeurs.machine);

  return (
    <form
      id="f-demande"
      noValidate
      onSubmit={soumettre}
      data-simulation="true"
      className="rounded-[18px] border border-future-dusk-50 bg-white p-5 shadow-[0_24px_50px_-36px_rgba(15,17,24,.4)] md:p-7"
    >
      {!envoye ? (
        <div>
          <AvisSimulation className="mb-3.5">{SIMULATION.avis}</AvisSimulation>
          <div className={champ}>
            <label htmlFor="d-machine" className={etiquette}>{DEMANDE.champs.machine}</label>
            <div className="relative">
              <select
                ref={(el) => { champs.current.machine = el; }}
                id="d-machine"
                name="machine"
                value={valeurs.machine}
                onChange={(e) => maj('machine', e.target.value)}
                aria-invalid={Boolean(erreurs.machine)}
                aria-describedby={erreurs.machine ? 'd-machine-err' : undefined}
                className={liste(Boolean(erreurs.machine))}
              >
                <option value="">{DEMANDE.champs.machineVide}</option>
                {machines.map((m) => (
                  <option key={m.ref} value={m.ref}>{m.libelle}</option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
            </div>
            {erreurs.machine && <span id="d-machine-err" className={messageErreur}>{erreurs.machine}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            {texte('prenom', 'text', 'given-name')}
            {texte('nom', 'text', 'family-name')}
          </div>
          {texte('societe', 'text', 'organization')}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            {texte('email', 'email', 'email')}
            {texte('telephone', 'tel', 'tel')}
          </div>
          <label className="mb-3 mt-0.5 flex cursor-pointer flex-wrap items-start gap-2.5 rounded-[10px] bg-very-peri-50 px-3.5 py-3 text-sm text-future-dusk-900">
            <input
              type="checkbox"
              name="rappel"
              checked={valeurs.rappel}
              onChange={(e) => maj('rappel', e.target.checked)}
              className="mt-px h-5 w-5 flex-[0_0_20px] accent-very-peri-500"
            />
            <span className="min-w-0 flex-1">{DEMANDE.rappel}</span>
          </label>
          <label className="mb-4 flex cursor-pointer flex-wrap gap-2.5 text-[12.5px] text-future-dusk-500">
            <input
              ref={(el) => { champs.current.rgpd = el; }}
              type="checkbox"
              name="rgpd"
              checked={valeurs.rgpd}
              onChange={(e) => maj('rgpd', e.target.checked)}
              aria-invalid={Boolean(erreurs.rgpd)}
              className="mt-0.5 h-4 w-4 flex-[0_0_16px] accent-very-peri-500"
            />
            <span className={`min-w-0 flex-1 ${erreurs.rgpd ? 'text-[#b42318]' : ''}`}>
              {DEMANDE.rgpdAvant}
              <Link href="/confidentialite" className="text-very-peri-600 underline">{DEMANDE.rgpdLien}</Link>
              {DEMANDE.rgpdApres}
            </span>
            {erreurs.rgpd && <span className={`basis-full ${messageErreur}`}>{erreurs.rgpd}</span>}
          </label>
          <button type="submit" className={`${boutonPrincipal} w-full`}>
            <Phone aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={1.7} />
            {DEMANDE.bouton}
          </button>
          <p className={`${mentionFine} text-center`}>
            <Annotation visible={apercuInterne}>{DEMANDE.mentionPrevue}</Annotation>
          </p>
        </div>
      ) : (
        <div role="status" className="px-1.5 py-[22px] text-center" data-test="demande-simulee">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ee] text-[#1f7a55]">
            <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <span className="mb-2 inline-block rounded-md bg-accent-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-future-dusk-800">
            {SIMULATION.badge}
          </span>
          <h4 className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900">{DEMANDE.fin.titre}</h4>
          <p className="text-sm text-[#46505c]">
            {DEMANDE.fin.machine} <b id="d-recap">{choisie?.libelle}</b>
          </p>
          <p className="text-sm text-[#46505c]">{DEMANDE.fin.texte}</p>
          <p className={mentionFine}>
            <Annotation visible={apercuInterne}>{DEMANDE.fin.textePrevu}</Annotation>
          </p>
        </div>
      )}
    </form>
  );
}
