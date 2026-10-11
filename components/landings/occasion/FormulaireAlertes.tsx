'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, Bell, Check, ChevronDown, Info, Loader2, MailCheck } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { resolveNavHref } from '@/i18n/deChCoverage';
import { FAMILLES, LIBELLES_FAMILLES, OPTIN } from '@/lib/occasion/formulaires';
import type { LangueOccasion } from '@/lib/occasion/langues';
import { creerChampsAlerteSchema, type ReponseAlertes } from '@/lib/occasion/alertes/schema';
import { AvisSimulation } from './Annotation';
import { contenuOccasion, type CollecteAffichee, type ContenuOccasion } from './contenu';
import { boutonPrincipal, champ, etiquette, facultatif, liste, mentionFine, messageErreur, saisie } from './styles';
import { useCollecteCourante } from './useCollecteCourante';

/**
 * Parcours B — liste d'alerte « prochaines occasions Orbitvu » (sprint final du
 * 11/10/2026) : secondaire, sous la recherche. Double opt-in :
 * 1. le formulaire (e-mail, famille facultative, case d'accord) demande un
 *    e-mail de confirmation à `POST /api/occasion/alertes` ; rien n'est
 *    enregistré à ce stade ;
 * 2. le lien de cet e-mail ramène ici (`#confirmer-alerte=…`) ; seul le clic sur
 *    « Confirmer mon inscription » enregistre l'inscription ;
 * 3. un lien `#desinscrire-alerte=…` permet de se désinscrire.
 * Aucun message de succès sans réponse positive du serveur ; aucune donnée
 * personnelle dans le navigateur au-delà de la saisie ; aucune clé côté client.
 */

type TextesAlertes = ContenuOccasion['ALERTES'];
type EtatSaisie = 'saisie' | 'envoi' | 'attente' | 'indisponible' | 'erreur' | 'limitation';
type Erreurs = Partial<Record<'email' | 'famille' | 'consentement', string>>;

type EtatLien =
  | 'pret'
  | 'envoi'
  | 'inscrit'
  | 'deja_inscrit'
  | 'desinscrit'
  | 'desinscription_faite'
  | 'expire'
  | 'invalide'
  | 'indisponible'
  | 'erreur'
  | 'limitation';

interface Lien {
  mode: 'confirmer' | 'desinscrire';
  jeton: string;
  etat: EtatLien;
}

const RE_LIEN = /^#(confirmer|desinscrire)-alerte=([A-Za-z0-9_-]{16,2048})$/;

/** Jeton présent dans le fragment de l'URL (jamais transmis au serveur qui sert la page). */
function lireLien(hash: string): Pick<Lien, 'mode' | 'jeton'> | null {
  const m = RE_LIEN.exec(hash);
  if (!m) return null;
  return { mode: m[1] === 'confirmer' ? 'confirmer' : 'desinscrire', jeton: m[2] };
}

async function appeler(url: string, corps: unknown): Promise<{ status: number; body: ReponseAlertes | null }> {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corps) });
  let body: ReponseAlertes | null = null;
  try {
    body = (await res.json()) as ReponseAlertes;
  } catch {
    body = null;
  }
  return { status: res.status, body };
}

function etatDepuisReponse(mode: Lien['mode'], status: number, body: ReponseAlertes | null): EtatLien {
  if (status === 200 && body?.ok) {
    if (mode === 'desinscrire') return 'desinscription_faite';
    if (body.etat === 'inscrit' || body.etat === 'deja_inscrit' || body.etat === 'desinscrit') return body.etat;
    return 'erreur';
  }
  if (status === 503) return 'indisponible';
  if (status === 429) return 'limitation';
  if (status === 410) return 'expire';
  if (status === 400 && body && !body.ok && body.error === 'jeton_invalide') return 'invalide';
  return 'erreur';
}

export function FormulaireAlertes({
  apercuInterne,
  alertes: alertesServeur,
  langue,
}: {
  apercuInterne: boolean;
  alertes: CollecteAffichee;
  /** Langue de la page ; les textes sont lus ici (une fonction ne se transmet pas à un composant client). */
  langue: LangueOccasion;
}) {
  const ALERTES = contenuOccasion(langue).ALERTES;
  const alertes = useCollecteCourante(alertesServeur);
  const schema = useMemo(() => creerChampsAlerteSchema(ALERTES.messages), [ALERTES.messages]);
  const confidentialite = resolveNavHref(langue, '/confidentialite');
  const [valeurs, setValeurs] = useState({ email: '', famille: '', consentement: false });
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [etat, setEtat] = useState<EtatSaisie>('saisie');
  const [lien, setLien] = useState<Lien | null>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refFamille = useRef<HTMLSelectElement>(null);
  const refConsentement = useRef<HTMLInputElement>(null);
  const piege = useRef<HTMLInputElement>(null);
  const refResultat = useRef<HTMLHeadingElement>(null);

  // Lien reçu par e-mail : lu après le montage (le HTML prérendu n'en sait rien),
  // puis retiré de la barre d'adresse.
  useEffect(() => {
    const minuteur = setTimeout(() => {
      const lu = lireLien(window.location.hash);
      if (!lu) return;
      setLien({ ...lu, etat: 'pret' });
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#alertes`);
      document.getElementById('alertes')?.scrollIntoView();
    }, 0);
    return () => clearTimeout(minuteur);
  }, []);

  useEffect(() => {
    if (etat !== 'saisie' && etat !== 'envoi') refResultat.current?.focus();
  }, [etat]);

  const maj = <K extends keyof typeof valeurs>(cle: K, valeur: (typeof valeurs)[K]) => {
    setValeurs((v) => ({ ...v, [cle]: valeur }));
    setErreurs((e) => ({ ...e, [cle]: undefined }));
    if (etat === 'erreur' || etat === 'limitation') setEtat('saisie');
  };

  const focaliser = (e: Erreurs) => {
    const premier = e.email ? refEmail : e.famille ? refFamille : e.consentement ? refConsentement : null;
    premier?.current?.focus();
  };

  const soumettre = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (etat === 'envoi') return; // double clic
    const analyse = schema.safeParse({ email: valeurs.email, famille: valeurs.famille, consentement: valeurs.consentement });
    if (!analyse.success) {
      const e: Erreurs = {};
      for (const i of analyse.error.issues) {
        const c = i.path[0];
        if ((c === 'email' || c === 'famille' || c === 'consentement') && !e[c]) e[c] = i.message;
      }
      setErreurs(e);
      focaliser(e);
      return;
    }
    setEtat('envoi');
    try {
      const { status, body } = await appeler('/api/occasion/alertes', {
        ...analyse.data,
        langue,
        versionConsentement: OPTIN[langue].version,
        siteWeb: piege.current?.value ?? '',
      });
      if (status === 200 && body?.ok && body.etat === 'confirmation_envoyee') return setEtat('attente');
      if (status === 503) return setEtat('indisponible');
      if (status === 429) return setEtat('limitation');
      if (status === 400 && body && !body.ok && body.fieldErrors) {
        // Le serveur répond en français : messages de la langue de la page, par champ.
        const e: Erreurs = {};
        for (const c of Object.keys(body.fieldErrors) as (keyof Erreurs)[]) e[c] = ALERTES.messages[c];
        setErreurs(e);
        setEtat('saisie');
        return focaliser(e);
      }
      setEtat('erreur');
    } catch {
      setEtat('erreur');
    }
  };

  const traiterLien = async () => {
    if (!lien || lien.etat === 'envoi') return;
    const { mode, jeton } = lien;
    setLien({ mode, jeton, etat: 'envoi' });
    try {
      const url = mode === 'confirmer' ? '/api/occasion/alertes/confirmation' : '/api/occasion/alertes/desinscription';
      const { status, body } = await appeler(url, { jeton });
      setLien({ mode, jeton, etat: etatDepuisReponse(mode, status, body) });
    } catch {
      setLien({ mode, jeton, etat: 'erreur' });
    }
  };

  const cadre = 'relative z-[1] self-start rounded-2xl bg-white p-[18px] text-text-dark md:col-start-2 md:row-span-2 md:row-start-1 md:p-6';

  if (lien) return <PanneauLien lien={lien} onValider={traiterLien} onFermer={() => setLien(null)} className={cadre} textes={ALERTES} />;

  if (etat === 'attente' || etat === 'indisponible') {
    const attente = etat === 'attente';
    return (
      <div role="status" className={`${cadre} text-center`} data-test={attente ? 'alertes-attente' : 'alertes-fermee'}>
        <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${attente ? 'bg-[#e7f6ec] text-[#1f7a3d]' : 'bg-[#fff8e9] text-[#7a5200]'}`}>
          {attente ? <MailCheck aria-hidden="true" className="h-7 w-7" strokeWidth={2} /> : <Info aria-hidden="true" className="h-7 w-7" strokeWidth={2} />}
        </div>
        <h3 ref={refResultat} tabIndex={-1} className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900 focus:outline-none">
          {attente ? ALERTES.etats.attenteTitre : ALERTES.etats.indisponibleTitre}
        </h3>
        <p className="text-sm text-[#46505c]">{attente ? ALERTES.etats.attente : ALERTES.etats.indisponible}</p>
        {!attente && (
          <a href="#recherche" className="mt-3 inline-block text-sm font-semibold text-very-peri-600 underline">
            {ALERTES.etats.lienRecherche}
          </a>
        )}
      </div>
    );
  }

  const envoi = etat === 'envoi';
  const alerte = etat === 'erreur' ? ALERTES.etats.erreur : etat === 'limitation' ? ALERTES.etats.limitation : null;

  return (
    <form id="f-alertes" noValidate onSubmit={soumettre} aria-busy={envoi} className={cadre}>
      {/* Champ piège : invisible et hors du parcours clavier ; rempli = automate. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="a-site-web">Site web</label>
        <input ref={piege} id="a-site-web" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {alertes.active ? (
        apercuInterne && (
          <p role="note" data-test="alertes-test-reel" className="mb-3.5 rounded-[10px] border border-[#f3c4be] bg-[#fdf1ef] px-3 py-2 text-[12.5px] font-semibold leading-snug text-[#b42318]">
            {ALERTES.avisTestReel}
          </p>
        )
      ) : (
        <AvisSimulation className="mb-3.5">{ALERTES.fermee}</AvisSimulation>
      )}

      {alerte && (
        <div role="alert" className="mb-3.5 flex items-start gap-2 rounded-[10px] border border-[#f3c4be] bg-[#fdf1ef] px-3 py-2 text-[13px] font-semibold text-[#b42318]">
          <AlertCircle aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
          <span>{alerte}</span>
        </div>
      )}

      <div className={champ}>
        <label htmlFor="a-email" className={etiquette}>{ALERTES.champs.email}</label>
        <input
          ref={refEmail}
          id="a-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={valeurs.email}
          onChange={(e) => maj('email', e.target.value)}
          aria-invalid={Boolean(erreurs.email)}
          aria-describedby={erreurs.email ? 'a-email-err' : undefined}
          className={saisie(Boolean(erreurs.email))}
        />
        {erreurs.email && <span id="a-email-err" className={messageErreur}>{erreurs.email}</span>}
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
            aria-invalid={Boolean(erreurs.famille)}
            aria-describedby={erreurs.famille ? 'a-famille-err' : undefined}
            className={liste(Boolean(erreurs.famille))}
          >
            <option value="">{ALERTES.champs.familleToutes}</option>
            {FAMILLES.map((f) => (
              <option key={f} value={f}>{LIBELLES_FAMILLES[langue][f]}</option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-future-dusk-400" />
        </div>
        {erreurs.famille && <span id="a-famille-err" className={messageErreur}>{erreurs.famille}</span>}
      </div>
      <div
        className={`mb-3 mt-0.5 flex flex-wrap items-start gap-2.5 rounded-[10px] bg-[#fff8e9] px-3.5 py-3 text-sm text-future-dusk-900 ${erreurs.consentement ? 'shadow-[inset_0_0_0_1.5px_#b42318]' : ''}`}
      >
        <input
          ref={refConsentement}
          type="checkbox"
          name="consentement"
          id="a-optin"
          checked={valeurs.consentement}
          onChange={(e) => maj('consentement', e.target.checked)}
          aria-invalid={Boolean(erreurs.consentement)}
          aria-describedby={erreurs.consentement ? 'a-optin-err' : undefined}
          className="mt-px h-5 w-5 flex-[0_0_20px] cursor-pointer accent-very-peri-500"
        />
        <label htmlFor="a-optin" className="min-w-0 flex-1 cursor-pointer">{ALERTES.optin}</label>
        {erreurs.consentement && <span id="a-optin-err" className={`basis-full ${messageErreur}`}>{erreurs.consentement}</span>}
      </div>
      <button type="submit" disabled={envoi} className={`${boutonPrincipal} w-full disabled:cursor-wait disabled:opacity-80`}>
        {envoi ? (
          <Loader2 aria-hidden="true" className="h-[19px] w-[19px] shrink-0 animate-spin" />
        ) : (
          <Bell aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={1.7} />
        )}
        {envoi ? ALERTES.envoi : ALERTES.bouton}
      </button>
      <p className={mentionFine}>
        {ALERTES.mention}{' '}
        <Link href={confidentialite.href} locale={confidentialite.locale} className="text-very-peri-600 underline">
          {ALERTES.lienConfidentialite}
        </Link>
      </p>
    </form>
  );
}

function textesLien(ALERTES: TextesAlertes): Record<Exclude<EtatLien, 'pret' | 'envoi'>, { titre: string; texte: string; succes: boolean }> {
  return {
    inscrit: { titre: ALERTES.confirmation.inscritTitre, texte: ALERTES.confirmation.inscrit, succes: true },
    deja_inscrit: { titre: ALERTES.confirmation.dejaInscritTitre, texte: ALERTES.confirmation.dejaInscrit, succes: true },
    desinscrit: { titre: ALERTES.confirmation.desinscritTitre, texte: ALERTES.confirmation.desinscrit, succes: false },
    desinscription_faite: { titre: ALERTES.desinscription.faitTitre, texte: ALERTES.desinscription.fait, succes: true },
    expire: { titre: ALERTES.confirmation.titre, texte: ALERTES.confirmation.expire, succes: false },
    invalide: { titre: ALERTES.confirmation.titre, texte: ALERTES.confirmation.invalide, succes: false },
    indisponible: { titre: ALERTES.etats.indisponibleTitre, texte: ALERTES.etats.indisponible, succes: false },
    erreur: { titre: ALERTES.confirmation.titre, texte: ALERTES.confirmation.erreur, succes: false },
    limitation: { titre: ALERTES.confirmation.titre, texte: ALERTES.etats.limitation, succes: false },
  };
}

function PanneauLien({
  lien,
  onValider,
  onFermer,
  className,
  textes: ALERTES,
}: {
  lien: Lien;
  onValider: () => void;
  onFermer: () => void;
  className: string;
  textes: TextesAlertes;
}) {
  const refTitre = useRef<HTMLHeadingElement>(null);
  const confirmer = lien.mode === 'confirmer';

  useEffect(() => {
    refTitre.current?.focus();
  }, [lien.etat]);

  if (lien.etat === 'pret' || lien.etat === 'envoi') {
    const envoi = lien.etat === 'envoi';
    return (
      <div className={className} data-test={confirmer ? 'alertes-confirmer' : 'alertes-desinscrire'} aria-busy={envoi}>
        <h3 ref={refTitre} tabIndex={-1} className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900 focus:outline-none">
          {confirmer ? ALERTES.confirmation.titre : ALERTES.desinscription.titre}
        </h3>
        <p className="mb-4 text-sm text-[#46505c]">{confirmer ? ALERTES.confirmation.texte : ALERTES.desinscription.texte}</p>
        <button type="button" onClick={onValider} disabled={envoi} className={`${boutonPrincipal} w-full disabled:cursor-wait disabled:opacity-80`}>
          {envoi && <Loader2 aria-hidden="true" className="h-[19px] w-[19px] shrink-0 animate-spin" />}
          {envoi ? ALERTES.envoiJeton : confirmer ? ALERTES.confirmation.bouton : ALERTES.desinscription.bouton}
        </button>
      </div>
    );
  }

  const t = textesLien(ALERTES)[lien.etat];
  const relancer = lien.etat === 'erreur' || lien.etat === 'limitation';
  return (
    <div role="status" className={`${className} text-center`} data-test={`alertes-lien-${lien.etat}`}>
      <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${t.succes ? 'bg-[#e7f6ec] text-[#1f7a3d]' : 'bg-[#fff8e9] text-[#7a5200]'}`}>
        {t.succes ? <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.4} /> : <Info aria-hidden="true" className="h-7 w-7" strokeWidth={2} />}
      </div>
      <h3 ref={refTitre} tabIndex={-1} className="mb-1.5 font-heading text-[19px] font-bold text-future-dusk-900 focus:outline-none">
        {t.titre}
      </h3>
      <p className="text-sm text-[#46505c]">{t.texte}</p>
      {relancer ? (
        <button type="button" onClick={onValider} className="mt-3 text-sm font-semibold text-very-peri-600 underline">
          {ALERTES.reessayer}
        </button>
      ) : (
        (lien.etat === 'expire' || lien.etat === 'invalide') && (
          <button type="button" onClick={onFermer} className="mt-3 text-sm font-semibold text-very-peri-600 underline">
            {ALERTES.revenirFormulaire}
          </button>
        )
      )}
    </div>
  );
}
