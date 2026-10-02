'use client';

/**
 * Module pédagogique interactif des previews AI Act (B1-B3, C1-C2, D1-D3).
 * Reprise du `ReviewModule` du ZIP du 02/10, adaptée au gabarit des previews :
 * - étapes au choix (boutons, Précédent / Suivant), aucune lecture automatique,
 *   aucune animation ; description annoncée par une région `aria-live` ;
 * - sans JavaScript : état 1 affiché, boutons inactifs, liste de toutes les
 *   étapes dans `<noscript>` ;
 * - titre du module en paragraphe, pas en intertitre : il ne s'insère pas dans
 *   la hiérarchie H2/H3 de l'article ni dans son sommaire.
 * Les schémas sont conceptuels : ni photographie de référence, ni mesure.
 */
import { useState, useSyncExternalStore } from 'react';
import type { ModuleRevue as DonneesModule } from './modules';
import styles from './ModuleRevue.module.css';

interface Props {
  module: DonneesModule;
  /** Ce que le visuel définitif devra montrer (fiche de l'emplacement). */
  visuelAttendu?: string;
  /** Consigne de légende du visuel définitif (fiche de l'emplacement). */
  legendeAttendue?: string | null;
}

const sansAbonnement = () => () => {};

export default function ModuleRevue({ module, visuelAttendu, legendeAttendue }: Props) {
  const [courante, setCourante] = useState(0);
  // Faux au rendu serveur et pendant l'hydratation, vrai ensuite : sans
  // JavaScript, les commandes restent inactives.
  const actif = useSyncExternalStore(sansAbonnement, () => true, () => false);

  const total = module.etapes.length;
  const etape = module.etapes[courante];
  const photoAttendue = module.statut === 'SOURCE GRAPHIQUE ATTENDUE';

  return (
    <figure className={`not-prose ${styles.module}`} id={`module-${module.id.toLowerCase()}`}>
      <p className={styles.surtitre}>{module.id} · Module pédagogique interactif · maquette privée</p>
      <p className={styles.titre}>{module.titre}</p>

      <div className={styles.visuel}>
        {/* Schéma SVG incorporé (URI data:), non optimisable par next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={etape.image}
          width={960}
          height={480}
          alt={`${module.alt} Étape ${courante + 1} sur ${total} : ${etape.nom}.`}
        />
      </div>

      <div className={styles.etapes} role="group" aria-label={`Étapes du module ${module.id}`}>
        {module.etapes.map((e, i) => (
          <button
            key={e.nom}
            type="button"
            className={styles.etape}
            aria-pressed={i === courante}
            disabled={!actif}
            onClick={() => setCourante(i)}
          >
            {i + 1}. {e.nom}
          </button>
        ))}
      </div>

      <div className={styles.commandes}>
        <button
          type="button"
          className={styles.fleche}
          disabled={!actif || courante === 0}
          onClick={() => setCourante((n) => Math.max(n - 1, 0))}
        >
          <span aria-hidden="true">← </span>Précédent
        </button>
        <p className={styles.description} aria-live="polite">
          <span className={styles.compteur}>
            Étape {courante + 1} sur {total} :
          </span>{' '}
          {etape.description}
        </p>
        <button
          type="button"
          className={styles.fleche}
          disabled={!actif || courante === total - 1}
          onClick={() => setCourante((n) => Math.min(n + 1, total - 1))}
        >
          Suivant<span aria-hidden="true"> →</span>
        </button>
      </div>

      <noscript>
        <ol className={styles.statique} aria-label={`Étapes du module ${module.id} (version statique)`}>
          {module.etapes.map((e) => (
            <li key={e.nom}>
              <strong>{e.nom}</strong> — {e.description}
            </li>
          ))}
        </ol>
      </noscript>

      <figcaption className={styles.legende}>
        {module.provenance.ia === true && 'Illustration générée par IA. '}
        {module.legende}
      </figcaption>
      <div className={styles.reserves}>
        <span className={styles.statut}>{module.statut}</span>
        <p>
          {photoAttendue
            ? 'Schéma conceptuel, pas une photographie de référence ni une démonstration de fidélité au produit : photographies définitives non fournies.'
            : 'Schéma conceptuel : aucun fichier réel inspecté, aucun résultat de mesure représenté.'}
        </p>
        {visuelAttendu && (
          <p>
            <span className={styles.libelle}>Visuel définitif attendu :</span> {visuelAttendu}
          </p>
        )}
        <p>
          <span className={styles.libelle}>Provenance :</span> {module.provenance.origine}
          {module.provenance.ia === null &&
            ' Mention « Illustration générée par IA. » (arbitrage Q1) : à arbitrer selon cette provenance.'}
        </p>
        {legendeAttendue && (
          <p>
            <span className={styles.libelle}>Légende définitive :</span> {legendeAttendue}
          </p>
        )}
      </div>
    </figure>
  );
}
