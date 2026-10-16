'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, ChevronDown, Info, Loader2, Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { resolveNavHref } from '@/i18n/deChCoverage';
import { getAttribution } from '@/lib/attribution';
import { FAMILLES, LIBELLES_FAMILLES } from '@/lib/occasion/formulaires';
import type { LangueOccasion } from '@/lib/occasion/langues';
import {
  HORIZONS,
  LIBELLES_HORIZONS,
  creerChampsRechercheSchema,
  type ChampsRecherche,
  type ReponseRecherche,
  type SaisieRecherche,
} from '@/lib/occasion/schema';
import { Annotation, AvisSimulation } from './Annotation';
import { EVENEMENT_MACHINE } from './BoutonMachine';
import { avisTestReel, contenuOccasion, type CollecteAffichee, type ContenuOccasion } from './contenu';
import { mesurerReponseOccasion } from './mesure';
import { useCollecteCourante } from './useCollecteCourante';
import { boutonPrincipal, champ, etiquette, facultatif, liste, mentionFine, messageErreur, saisie, zone } from './styles';

export interface OptionMachine {
  ref: string;
  libelle: string;
}

/**
 * Parcours A — demande de recherche d'un studio d'occasion (mission S0 du
 * 11/10/2026), affichée avec ou sans machine. Le bouton d'une carte présélectionne
 * sa référence. Envoi à `POST /api/occasion` ; aucun message n'affirme une
 * transmission que la réponse du serveur ne confirme pas. Tant que la collecte
 * n'est pas autorisée, la route répond 503 sans lire la demande : état
 * « pas encore en service », jamais un succès.
 */

type Etat =
  | { type: 'saisie' }
  | { type: 'envoi' }
  | { type: 'recue'; ackSent: boolean }
  | { type: 'indisponible' }
  | { type: 'erreur' }
  | { type: 'limitation' };

function nouvelIdentifiant(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const o = crypto.getRandomValues(new Uint8Array(16));
  o[6] = (o[6] & 0x0f) | 0x40;
  o[8] = (o[8] & 0x3f) | 0x80;
  const h = Array.from(o, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

type TextesRecherche = ContenuOccasion['RECHERCHE'];

function Libelle({ pour, texte, optionnel, mention }: { pour: string; texte: string; optionnel?: boolean; mention: string }) {
  return (
    <label htmlFor={pour} className={etiquette}>
      {texte} {optionnel && <i className={facultatif}>{mention}</i>}
    </label>
  );
}

/** Message d'un champ refusé par le serveur, dans la langue de la page (le serveur répond en français). */
function messageServeur(textes: TextesRecherche, champ: keyof ChampsRecherche): string {
  const m = textes.messages;
  if (champ === 'firstName' || champ === 'email' || champ === 'company' || champ === 'besoin') return m[champ];
  if (champ === 'famille' || champ === 'horizon') return m.choix;
  if (champ === 'reference') return textes.etats.reference;
  return textes.invalide;
}

export function FormulaireRecherche({
  machines,
  apercuInterne,
  collecte: collecteServeur,
  langue,
}: {
  machines: OptionMachine[];
  apercuInterne: boolean;
  /** État réel de la collecte, calculé au rendu serveur ; refermé à l'heure de fin d'une fenêtre de test. */
  collecte: CollecteAffichee;
  /** Langue de la page ; les textes sont lus ici (une fonction ne se transmet pas à un composant client). */
  langue: LangueOccasion;
}) {
  const RECHERCHE = contenuOccasion(langue).RECHERCHE;
  const schema = useMemo(() => creerChampsRechercheSchema(RECHERCHE.messages), [RECHERCHE.messages]);
  const confidentialite = resolveNavHref(langue, '/confidentialite');
  const collecte = useCollecteCourante(collecteServeur);
  const [etat, setEtat] = useState<Etat>({ type: 'saisie' });
  const requestId = useRef<string | null>(null);
  const piege = useRef<HTMLInputElement>(null);
  const titreFin = useRef<HTMLHeadingElement>(null);
  const alerte = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<SaisieRecherche, unknown, ChampsRecherche>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '', email: '', company: '', besoin: '', famille: '',
      telephone: '', budget: '', horizon: '', commentaire: '', reference: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Clic sur « Cette machine m'intéresse » : présélection de la référence.
  useEffect(() => {
    const choisir = (ev: Event) => {
      const ref = (ev as CustomEvent<string>).detail;
      if (!machines.some((m) => m.ref === ref)) return;
      setEtat({ type: 'saisie' });
      setValue('reference', ref);
      clearErrors('reference');
      document.getElementById('recherche')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => setFocus('reference'), 400);
    };
    window.addEventListener(EVENEMENT_MACHINE, choisir);
    return () => window.removeEventListener(EVENEMENT_MACHINE, choisir);
  }, [machines, setValue, setFocus, clearErrors]);

  useEffect(() => {
    if (etat.type === 'recue') titreFin.current?.focus();
    if (etat.type === 'erreur' || etat.type === 'limitation' || etat.type === 'indisponible') alerte.current?.focus();
  }, [etat.type]);

  async function envoyer(valeurs: ChampsRecherche) {
    if (etat.type === 'envoi') return;
    requestId.current ??= nouvelIdentifiant();
    setEtat({ type: 'envoi' });

    let reponse: ReponseRecherche | null = null;
    try {
      const res = await fetch('/api/occasion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...valeurs,
          langue,
          requestId: requestId.current,
          attribution: getAttribution() ?? undefined,
          siteWeb: piege.current?.value || undefined,
        }),
      });
      reponse = (await res.json()) as ReponseRecherche;
    } catch {
      reponse = null;
    }

    // GA4 : succès seulement sur notification interne confirmée par le serveur.
    mesurerReponseOccasion(reponse, Boolean(valeurs.reference), langue);

    if (reponse?.ok === true) {
      setEtat({ type: 'recue', ackSent: reponse.ackSent });
      return;
    }
    if (reponse?.ok === false && reponse.error === 'invalid' && reponse.fieldErrors) {
      for (const [nom, message] of Object.entries(reponse.fieldErrors)) {
        const champ = nom as keyof ChampsRecherche;
        if (message) setError(champ, { type: 'server', message: messageServeur(RECHERCHE, champ) }, { shouldFocus: true });
      }
      setEtat({ type: 'saisie' });
      return;
    }
    if (reponse?.ok === false && reponse.error === 'reference_unavailable') {
      setValue('reference', '');
      setError('reference', { type: 'server', message: RECHERCHE.etats.reference }, { shouldFocus: true });
      setEtat({ type: 'saisie' });
      return;
    }
    if (reponse?.ok === false && reponse.error === 'rate_limited') setEtat({ type: 'limitation' });
    else if (reponse?.ok === false && reponse.error === 'occasion_unavailable') setEtat({ type: 'indisponible' });
    else setEtat({ type: 'erreur' });
  }

  const cadre =
    'rounded-[18px] border border-future-dusk-50 bg-white p-5 shadow-[0_24px_50px_-36px_rgba(15,17,24,.4)] md:p-7';

  if (etat.type === 'recue') {
    return (
      <div className={cadre} role="status" data-test="recherche-recue">
        <div className="px-1.5 py-[22px] text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ee] text-[#1f7a55]">
            <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <h4 ref={titreFin} tabIndex={-1} className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900 focus:outline-none">
            {RECHERCHE.etats.recue}
          </h4>
          <p className="text-sm text-[#46505c]">{etat.ackSent ? RECHERCHE.etats.recueAccuse : RECHERCHE.etats.recueSansAccuse}</p>
        </div>
      </div>
    );
  }

  if (etat.type === 'indisponible') {
    return (
      <div className={cadre} data-test="recherche-indisponible">
        <div ref={alerte} tabIndex={-1} role="alert" className="px-1.5 py-[22px] text-center focus:outline-none">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff8e9] text-[#7a5200]">
            <Info aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
          </div>
          <h4 className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900">{RECHERCHE.etats.indisponibleTitre}</h4>
          <p className="text-sm text-[#46505c]">{RECHERCHE.etats.indisponible}</p>
          <p className={mentionFine}>
            <Annotation visible={apercuInterne}>{RECHERCHE.etats.indisponiblePrevu}</Annotation>
          </p>
        </div>
      </div>
    );
  }

  const envoiEnCours = etat.type === 'envoi';
  const messageAlerte = etat.type === 'erreur' ? RECHERCHE.etats.erreur : etat.type === 'limitation' ? RECHERCHE.etats.limitation : null;
  const choix = machines.length > 0;

  const texte = (
    cle: 'firstName' | 'email' | 'company' | 'telephone' | 'budget',
    libelleTexte: string,
    type: string,
    autoComplete: string,
    optionnel = false,
  ) => (
    <div className={champ}>
      <Libelle pour={`r-${cle}`} texte={libelleTexte} optionnel={optionnel} mention={RECHERCHE.champs.facultatif} />
      <input
        id={`r-${cle}`}
        type={type}
        autoComplete={autoComplete}
        aria-required={optionnel ? undefined : true}
        aria-invalid={errors[cle] ? true : undefined}
        aria-describedby={errors[cle] ? `r-${cle}-err` : undefined}
        className={saisie(Boolean(errors[cle]))}
        {...register(cle)}
      />
      {errors[cle] && <span id={`r-${cle}-err`} className={messageErreur}>{errors[cle]?.message}</span>}
    </div>
  );

  return (
    <form id="f-recherche" noValidate onSubmit={handleSubmit(envoyer)} aria-busy={envoiEnCours} className={`relative ${cadre}`}>
      {/* Champ piège : invisible et hors du parcours clavier ; rempli = automate. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="r-site-web">Site web</label>
        <input ref={piege} id="r-site-web" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {collecte.active ? (
        apercuInterne && (
          <p role="note" data-test="avis-test-reel" className="mb-3.5 rounded-[10px] border border-[#f3c4be] bg-[#fdf1ef] px-3 py-2 text-[12.5px] font-semibold leading-snug text-[#b42318]">
            {avisTestReel(collecte)}
          </p>
        )
      ) : (
        <AvisSimulation className="mb-3.5">{RECHERCHE.avisApercu}</AvisSimulation>
      )}

      {messageAlerte && (
        <div ref={alerte} tabIndex={-1} role="alert" className="mb-3.5 flex items-start gap-2 rounded-[10px] border border-[#f3c4be] bg-[#fdf1ef] px-3 py-2 text-[13px] font-semibold text-[#b42318] focus:outline-none">
          <AlertCircle aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
          <span>{messageAlerte}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        {texte('firstName', RECHERCHE.champs.firstName, 'text', 'given-name')}
        {texte('company', RECHERCHE.champs.company, 'text', 'organization')}
      </div>
      {texte('email', RECHERCHE.champs.email, 'email', 'email')}

      <div className={champ}>
        <Libelle pour="r-besoin" texte={RECHERCHE.champs.besoin} mention={RECHERCHE.champs.facultatif} />
        <span id="r-besoin-aide" className="-mt-1 text-[12.5px] text-future-dusk-400">{RECHERCHE.champs.besoinAide}</span>
        <textarea
          id="r-besoin"
          rows={3}
          aria-required="true"
          aria-invalid={errors.besoin ? true : undefined}
          aria-describedby={errors.besoin ? 'r-besoin-aide r-besoin-err' : 'r-besoin-aide'}
          className={zone(Boolean(errors.besoin))}
          {...register('besoin')}
        />
        {errors.besoin && <span id="r-besoin-err" className={messageErreur}>{errors.besoin.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <div className={champ}>
          <Libelle pour="r-famille" texte={RECHERCHE.champs.famille} optionnel mention={RECHERCHE.champs.facultatif} />
          <div className="relative">
            <select id="r-famille" className={liste(Boolean(errors.famille))} {...register('famille')}>
              <option value="">{RECHERCHE.champs.familleToutes}</option>
              {FAMILLES.map((f) => (
                <option key={f} value={f}>{LIBELLES_FAMILLES[langue][f]}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
          </div>
        </div>
        <div className={champ}>
          <Libelle pour="r-horizon" texte={RECHERCHE.champs.horizon} optionnel mention={RECHERCHE.champs.facultatif} />
          <div className="relative">
            <select id="r-horizon" className={liste(Boolean(errors.horizon))} {...register('horizon')}>
              <option value="">{RECHERCHE.champs.horizonVide}</option>
              {HORIZONS.map((h) => (
                <option key={h} value={h}>{LIBELLES_HORIZONS[langue][h]}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        {texte('telephone', RECHERCHE.champs.telephone, 'tel', 'tel', true)}
        {texte('budget', RECHERCHE.champs.budget, 'text', 'off', true)}
      </div>

      {choix ? (
        <div className={champ}>
          <Libelle pour="r-reference" texte={RECHERCHE.champs.reference} optionnel mention={RECHERCHE.champs.facultatif} />
          <div className="relative">
            <select
              id="r-reference"
              aria-invalid={errors.reference ? true : undefined}
              aria-describedby={errors.reference ? 'r-reference-err' : undefined}
              className={liste(Boolean(errors.reference))}
              {...register('reference')}
            >
              <option value="">{RECHERCHE.champs.referenceAucune}</option>
              {machines.map((m) => (
                <option key={m.ref} value={m.ref}>{m.libelle}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
          </div>
          {errors.reference && <span id="r-reference-err" className={messageErreur}>{errors.reference.message}</span>}
        </div>
      ) : (
        <input type="hidden" {...register('reference')} />
      )}

      <div className={champ}>
        <Libelle pour="r-commentaire" texte={RECHERCHE.champs.commentaire} optionnel mention={RECHERCHE.champs.facultatif} />
        <textarea id="r-commentaire" rows={2} className={zone(Boolean(errors.commentaire))} {...register('commentaire')} />
        {errors.commentaire && <span className={messageErreur}>{errors.commentaire.message}</span>}
      </div>

      <button type="submit" disabled={envoiEnCours} className={`${boutonPrincipal} w-full disabled:cursor-wait disabled:opacity-80`}>
        {envoiEnCours ? (
          <Loader2 aria-hidden="true" className="h-[19px] w-[19px] shrink-0 animate-spin" />
        ) : (
          <Search aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={1.7} />
        )}
        {envoiEnCours ? RECHERCHE.envoi : RECHERCHE.bouton}
      </button>
      <p className={mentionFine}>
        {RECHERCHE.mention}{' '}
        <Link href={confidentialite.href} locale={confidentialite.locale} className="text-very-peri-600 underline">
          {RECHERCHE.lienConfidentialite}
        </Link>{' '}
        <Annotation visible={apercuInterne}>{RECHERCHE.annotationMention}</Annotation>
      </p>
    </form>
  );
}
