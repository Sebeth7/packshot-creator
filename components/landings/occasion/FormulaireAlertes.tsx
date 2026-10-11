'use client';

import { useRef, useState } from 'react';
import { Bell, ChevronDown, Info } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { FAMILLES, validerAlerte, type Erreurs, type SaisieAlerte } from '@/lib/occasion/formulaires';
import { Annotation, AvisSimulation } from './Annotation';
import { ALERTES } from './contenu';
import { boutonPrincipal, champ, etiquette, facultatif, liste, mentionFine, messageErreur, saisie } from './styles';

/**
 * Parcours B — inscription aux prochaines disponibilités : secondaire et NON
 * ACTIVÉE (mission S0 du 11/10/2026). Validation dans le navigateur, puis un
 * message « pas encore ouverte », jamais un succès. Aucune requête réseau,
 * aucun stockage, aucun journal.
 */
export function FormulaireAlertes({ apercuInterne }: { apercuInterne: boolean }) {
  const [valeurs, setValeurs] = useState<SaisieAlerte>({ email: '', prenom: '', famille: '', optin: false });
  const [erreurs, setErreurs] = useState<Erreurs<SaisieAlerte>>({});
  const [fermee, setFermee] = useState(false);
  const refEmail = useRef<HTMLInputElement>(null);
  const refFamille = useRef<HTMLSelectElement>(null);
  const refOptin = useRef<HTMLInputElement>(null);

  const maj = <K extends keyof SaisieAlerte>(cle: K, valeur: SaisieAlerte[K]) => {
    setValeurs((v) => ({ ...v, [cle]: valeur }));
    setErreurs((e) => ({ ...e, [cle]: undefined }));
  };

  const soumettre = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // liste non activée : rien n'est envoyé ni stocké
    const e = validerAlerte(valeurs);
    setErreurs(e);
    const premier = e.email ? refEmail : e.famille ? refFamille : e.optin ? refOptin : null;
    if (premier) {
      premier.current?.focus();
      return;
    }
    setFermee(true);
  };

  return (
    <form
      id="f-alertes"
      noValidate
      onSubmit={soumettre}
      data-liste-fermee="true"
      className="relative z-[1] self-start rounded-2xl bg-white p-[18px] text-text-dark md:col-start-2 md:row-span-2 md:row-start-1 md:p-6"
    >
      {!fermee ? (
        <div>
          <AvisSimulation className="mb-3.5">{ALERTES.avis}</AvisSimulation>
          <div className={champ}>
            <label htmlFor="a-email" className={etiquette}>{ALERTES.champs.email}</label>
            <input
              ref={refEmail}
              id="a-email"
              name="email"
              type="email"
              autoComplete="email"
              value={valeurs.email}
              onChange={(e) => maj('email', e.target.value)}
              aria-invalid={Boolean(erreurs.email)}
              aria-describedby={erreurs.email ? 'a-email-err' : undefined}
              className={saisie(Boolean(erreurs.email))}
            />
            {erreurs.email && <span id="a-email-err" className={messageErreur}>{erreurs.email}</span>}
          </div>
          <div className={champ}>
            <label htmlFor="a-prenom" className={etiquette}>
              {ALERTES.champs.prenom} <i className={facultatif}>{ALERTES.champs.facultatif}</i>
            </label>
            <input
              id="a-prenom"
              name="prenom"
              type="text"
              autoComplete="given-name"
              value={valeurs.prenom}
              onChange={(e) => maj('prenom', e.target.value)}
              className={saisie(false)}
            />
          </div>
          <div className={champ}>
            <label htmlFor="a-famille" className={etiquette}>
              {ALERTES.champs.famille} <i className={facultatif}>{ALERTES.champs.facultatif}</i>
            </label>
            <div className="relative">
              <select
                ref={refFamille}
                id="a-famille"
                name="famille"
                value={valeurs.famille}
                onChange={(e) => maj('famille', e.target.value)}
                className={liste(Boolean(erreurs.famille))}
              >
                <option value="">{ALERTES.champs.familleToutes}</option>
                {FAMILLES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
            </div>
          </div>
          <label
            className={`mb-3 mt-0.5 flex cursor-pointer flex-wrap items-start gap-2.5 rounded-[10px] bg-[#fff8e9] px-3.5 py-3 text-sm text-future-dusk-900 ${erreurs.optin ? 'shadow-[inset_0_0_0_1.5px_#b42318]' : ''}`}
          >
            <input
              ref={refOptin}
              type="checkbox"
              name="optin"
              id="a-optin"
              checked={valeurs.optin}
              onChange={(e) => maj('optin', e.target.checked)}
              aria-invalid={Boolean(erreurs.optin)}
              className="mt-px h-5 w-5 flex-[0_0_20px] accent-very-peri-500"
            />
            <span className="min-w-0 flex-1">{ALERTES.optin}</span>
            {erreurs.optin && <span className={`basis-full ${messageErreur}`}>{erreurs.optin}</span>}
          </label>
          <button type="submit" className={`${boutonPrincipal} w-full`}>
            <Bell aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={1.7} />
            {ALERTES.bouton}
          </button>
          <p className={mentionFine}>
            {ALERTES.mention}{' '}
            <Link href="/confidentialite" className="text-very-peri-600 underline">
              {ALERTES.lienConfidentialite}
            </Link>{' '}
            <Annotation visible={apercuInterne}>{ALERTES.annotationMention}</Annotation>
          </p>
        </div>
      ) : (
        <div role="status" className="px-1.5 py-[22px] text-center" data-test="alertes-fermee">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff8e9] text-[#7a5200]">
            <Info aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
          </div>
          <h4 className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900">{ALERTES.fermee.titre}</h4>
          <p className="text-sm text-[#46505c]">{ALERTES.fermee.texte}</p>
          <a href="#recherche" className="mt-3 inline-block text-sm font-semibold text-very-peri-600 underline">
            {ALERTES.fermee.lienRecherche}
          </a>
          <p className={mentionFine}>
            <Annotation visible={apercuInterne}>{ALERTES.fermee.textePrevu}</Annotation>
          </p>
        </div>
      )}
    </form>
  );
}
