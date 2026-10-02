'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight, CheckCircle2, FileText, Loader2, Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getAttribution } from '@/lib/attribution';
import {
  champsCatalogueSchema,
  type ChampsCatalogue,
  type ReponseCatalogue,
  type SaisieCatalogue,
} from '@/lib/catalogue/schema';
import { ETATS, FORMULAIRE, TELEPHONES } from './contenu';
import { EmplacementVisuel } from './EmplacementVisuel';
import { SansCoupure } from './SansCoupure';
import { VISUELS } from './visuels';
import { LienTelephone } from './LienTelephone';
import {
  mesurerDemandeAcceptee,
  mesurerDemandeConsultantAcceptee,
  mesurerEchec,
  mesurerOuverturePdf,
} from './mesure';

/**
 * Formulaire de la landing catalogue, propre à cette page : il n'utilise ni
 * ContactForm ni /api/contact. États : saisie → envoi → succès (avec ou sans
 * e-mail confirmé) | erreur technique | limitation | catalogue indisponible.
 * Aucun message n'affirme un envoi, un enregistrement ou une transmission que la
 * réponse du serveur ne confirme pas.
 */

type Succes = Extract<ReponseCatalogue, { ok: true }>;
type Etat =
  | { type: 'saisie' }
  | { type: 'envoi' }
  | { type: 'succes'; reponse: Succes }
  | { type: 'erreur' }
  | { type: 'limitation' }
  | { type: 'indisponible' };

function nouvelIdentifiant(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const o = crypto.getRandomValues(new Uint8Array(16));
  o[6] = (o[6] & 0x0f) | 0x40;
  o[8] = (o[8] & 0x3f) | 0x80;
  const h = Array.from(o, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const champ =
  'block w-full min-h-12 rounded-xl border bg-future-dusk-0 px-4 py-3 text-base text-future-dusk-900 placeholder:text-future-dusk-400 transition-colors focus:outline-none focus:ring-2 focus:ring-very-peri-400 focus:border-very-peri-400 focus:bg-white';
const libelle = 'block text-sm font-semibold text-future-dusk-800 mb-1.5';
const erreurChamp = 'mt-1.5 text-sm text-red-700';

function Telephones({ lieu }: { lieu: 'formulaire' }) {
  return (
    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {(['FR', 'CH'] as const).map((pays) => (
        <LienTelephone
          key={pays}
          pays={pays}
          lieu={lieu}
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-2"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {TELEPHONES[pays].pays}&nbsp;: {TELEPHONES[pays].affiche}
        </LienTelephone>
      ))}
    </span>
  );
}

export function CatalogueForm() {
  const [etat, setEtat] = useState<Etat>({ type: 'saisie' });
  const requestId = useRef<string | null>(null);
  const piege = useRef<HTMLInputElement>(null);
  const titreSucces = useRef<HTMLHeadingElement>(null);
  const alerte = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SaisieCatalogue, unknown, ChampsCatalogue>({
    resolver: zodResolver(champsCatalogueSchema),
    defaultValues: { firstName: '', email: '', company: '', products: '', consultantOptIn: false },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (etat.type === 'succes') titreSucces.current?.focus();
    if (etat.type === 'erreur' || etat.type === 'limitation' || etat.type === 'indisponible') alerte.current?.focus();
  }, [etat.type]);

  async function envoyer(valeurs: ChampsCatalogue) {
    if (etat.type === 'envoi') return;
    requestId.current ??= nouvelIdentifiant();
    setEtat({ type: 'envoi' });

    let reponse: ReponseCatalogue | null = null;
    try {
      const res = await fetch('/api/catalogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...valeurs,
          requestId: requestId.current,
          attribution: getAttribution() ?? undefined,
          siteWeb: piege.current?.value || undefined,
        }),
      });
      reponse = (await res.json()) as ReponseCatalogue;
    } catch {
      reponse = null;
    }

    if (reponse?.ok === true && typeof reponse.pdfUrl === 'string') {
      // En simulation locale, rien n'a été accepté : aucun événement de succès.
      if (!reponse.simulated) {
        mesurerDemandeAcceptee(valeurs.country);
        if (reponse.contactRequestAccepted) mesurerDemandeConsultantAcceptee(valeurs.country);
      }
      setEtat({ type: 'succes', reponse });
      return;
    }

    if (reponse?.ok === false && reponse.error === 'invalid' && reponse.fieldErrors) {
      for (const [nom, message] of Object.entries(reponse.fieldErrors)) {
        if (message) setError(nom as keyof ChampsCatalogue, { type: 'server', message }, { shouldFocus: true });
      }
      mesurerEchec('invalid');
      setEtat({ type: 'saisie' });
      return;
    }

    if (reponse?.ok === false && reponse.error === 'rate_limited') {
      mesurerEchec('rate_limited');
      setEtat({ type: 'limitation' });
    } else if (reponse?.ok === false && reponse.error === 'catalogue_unavailable') {
      mesurerEchec('catalogue_unavailable');
      setEtat({ type: 'indisponible' });
    } else {
      mesurerEchec('technical');
      setEtat({ type: 'erreur' });
    }
  }

  if (etat.type === 'succes') {
    const { pdfUrl, emailSent, contactRequestAccepted, simulated } = etat.reponse;
    return (
      <div aria-live="polite" className="flex flex-col">
        {simulated && (
          <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            Simulation locale&nbsp;: rien n’a été enregistré ni envoyé, aucun PDF réel n’est servi.
          </p>
        )}
        <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h2
          ref={titreSucces}
          tabIndex={-1}
          className="mt-4 text-2xl font-heading font-bold text-future-dusk-900 focus:outline-none"
        >
          {ETATS.succesTitre}
        </h2>
        <p className="mt-2 text-base text-future-dusk-600">{emailSent ? ETATS.succesTexte : ETATS.emailNonConfirme}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (!simulated) mesurerOuverturePdf();
          }}
          className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-very-peri-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-very-peri-500/25 transition-colors hover:bg-very-peri-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-very-peri-300"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          {ETATS.ouvrir}
        </a>
        {emailSent && <p className="mt-4 text-sm text-future-dusk-600">{ETATS.emailConfirme}</p>}
        <div className="mt-6 border-t border-future-dusk-100 pt-5 text-sm text-future-dusk-700">
          {contactRequestAccepted ? (
            <p className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {ETATS.consultantAccepte}
            </p>
          ) : (
            <p>
              {ETATS.consultantInvitation}
              <Telephones lieu="formulaire" />
            </p>
          )}
        </div>
      </div>
    );
  }

  const envoiEnCours = etat.type === 'envoi';
  const messageAlerte =
    etat.type === 'erreur'
      ? ETATS.erreur
      : etat.type === 'limitation'
        ? ETATS.limitation
        : etat.type === 'indisponible'
          ? ETATS.indisponible
          : null;

  return (
    <>
    <div className="mb-5 flex items-start gap-4">
      {/* Couverture du catalogue, en vignette : le document est la récompense du formulaire. */}
      <EmplacementVisuel
        visuel={VISUELS.K1}
        ton="sombre"
        compact
        sizes="72px"
        className="mt-1 w-14 shrink-0 -rotate-3 rounded-[3px] shadow-md shadow-future-dusk-900/30 ring-1 ring-future-dusk-900/10 sm:w-[72px]"
      />
      <div>
        <h2 className="text-[1.375rem] leading-tight font-heading font-bold tracking-tight text-future-dusk-900 sm:text-2xl">
          <SansCoupure texte={FORMULAIRE.titre} />
        </h2>
        <p className="mt-1.5 text-sm text-future-dusk-600 sm:text-base">{FORMULAIRE.promesse}</p>
      </div>
    </div>
    <form onSubmit={handleSubmit(envoyer)} noValidate aria-busy={envoiEnCours} className="relative">
      {/* Champ piège : invisible et hors du parcours clavier ; rempli = automate. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="cat-site-web">Site web</label>
        <input ref={piege} id="cat-site-web" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="space-y-3.5">
        <div>
          <label htmlFor="cat-prenom" className={libelle}>
            {FORMULAIRE.prenom.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cat-prenom"
            type="text"
            autoComplete="given-name"
            placeholder={FORMULAIRE.prenom.placeholder}
            aria-required="true"
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? 'cat-prenom-erreur' : undefined}
            className={`${champ} ${errors.firstName ? 'border-red-500' : 'border-future-dusk-100'}`}
            {...register('firstName')}
          />
          {errors.firstName && <p id="cat-prenom-erreur" className={erreurChamp}>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="cat-email" className={libelle}>
            {FORMULAIRE.email.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cat-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={FORMULAIRE.email.placeholder}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'cat-email-erreur' : undefined}
            className={`${champ} ${errors.email ? 'border-red-500' : 'border-future-dusk-100'}`}
            {...register('email')}
          />
          {errors.email && <p id="cat-email-erreur" className={erreurChamp}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="cat-entreprise" className={libelle}>
            {FORMULAIRE.entreprise.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cat-entreprise"
            type="text"
            autoComplete="organization"
            placeholder={FORMULAIRE.entreprise.placeholder}
            aria-required="true"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? 'cat-entreprise-erreur' : undefined}
            className={`${champ} ${errors.company ? 'border-red-500' : 'border-future-dusk-100'}`}
            {...register('company')}
          />
          {errors.company && <p id="cat-entreprise-erreur" className={erreurChamp}>{errors.company.message}</p>}
        </div>

        <fieldset
          role="radiogroup"
          aria-labelledby="cat-pays-legende"
          aria-required="true"
          aria-invalid={errors.country ? true : undefined}
          aria-describedby={errors.country ? 'cat-pays-erreur' : undefined}
        >
          <legend id="cat-pays-legende" className={libelle}>
            {FORMULAIRE.pays.label} <span aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {FORMULAIRE.pays.options.map(({ valeur, libelle: nom }) => (
              <label key={valeur} className="relative block cursor-pointer">
                <input
                  type="radio"
                  value={valeur}
                  className="peer sr-only"
                  {...register('country')}
                />
                <span
                  className={`flex min-h-12 items-center justify-center rounded-xl border px-3 text-base font-medium text-future-dusk-700 transition-colors peer-checked:border-very-peri-500 peer-checked:bg-very-peri-50 peer-checked:text-very-peri-700 peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-very-peri-400 ${
                    errors.country ? 'border-red-500' : 'border-future-dusk-100 bg-future-dusk-0 hover:border-very-peri-300'
                  }`}
                >
                  {nom}
                </span>
              </label>
            ))}
          </div>
          {errors.country && <p id="cat-pays-erreur" className={erreurChamp}>{errors.country.message}</p>}
        </fieldset>

        <div>
          <label htmlFor="cat-produits" className={libelle}>
            {FORMULAIRE.produits.label}{' '}
            <span className="font-normal text-future-dusk-500">{FORMULAIRE.facultatif}</span>
          </label>
          <input
            id="cat-produits"
            type="text"
            autoComplete="off"
            maxLength={120}
            placeholder={FORMULAIRE.produits.placeholder}
            aria-invalid={errors.products ? true : undefined}
            aria-describedby={errors.products ? 'cat-produits-erreur' : undefined}
            className={`${champ} ${errors.products ? 'border-red-500' : 'border-future-dusk-100'}`}
            {...register('products')}
          />
          {errors.products && <p id="cat-produits-erreur" className={erreurChamp}>{errors.products.message}</p>}
        </div>

        <label htmlFor="cat-consultant" className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm text-future-dusk-700">
          <input
            id="cat-consultant"
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-future-dusk-300 accent-very-peri-500"
            {...register('consultantOptIn')}
          />
          <span>
            {FORMULAIRE.consultant} <span className="text-future-dusk-500">{FORMULAIRE.facultatif}</span>
          </span>
        </label>
      </div>

      <div aria-live="polite">
        {messageAlerte && (
          <div
            ref={alerte}
            tabIndex={-1}
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 focus:outline-none"
          >
            <p className="flex gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{messageAlerte}</span>
            </p>
            <span className="text-red-900">
              <Telephones lieu="formulaire" />
            </span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={envoiEnCours}
        className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-very-peri-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-very-peri-500/25 transition-colors hover:bg-very-peri-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-very-peri-300 disabled:cursor-wait disabled:opacity-80"
      >
        {envoiEnCours ? (
          <>
            <Loader2 className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
            {ETATS.envoi}
          </>
        ) : (
          <>
            {etat.type === 'erreur' ? ETATS.reessayer : FORMULAIRE.cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-3 text-sm text-future-dusk-600">{FORMULAIRE.reassurance}</p>
      <p className="mt-3 text-xs leading-relaxed text-future-dusk-500">
        {FORMULAIRE.donnees.avant}
        <Link href="/confidentialite" className="underline underline-offset-2 hover:text-very-peri-600">
          {FORMULAIRE.donnees.lien}
        </Link>
        {FORMULAIRE.donnees.apres}
      </p>
    </form>
    </>
  );
}
