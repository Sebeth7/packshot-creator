/**
 * Chips de réponse rapide (UX_PROPOSITION_ROI_PUBLIC.md §4).
 *
 * Convention de prompt : le modèle termine son message par une ligne
 * `[[choix: option 1 | option 2 | option 3]]`. Le client la retire du texte
 * affiché et rend les options en boutons. Pendant le streaming, un marqueur
 * incomplet en fin de texte est masqué pour éviter le flash.
 */

const CHIPS_RE = /\[\[choix:([^\]]*)\]\]/gi;
/** Début de marqueur potentiellement incomplet en fin de flux. */
const PARTIAL_RE = /\[\[(?:c(?:h(?:o(?:i(?:x(?::[^\]]*)?)?)?)?)?)?$/i;

export interface ParsedAssistantText {
  /** Texte à afficher, marqueurs retirés (y compris marqueur partiel en streaming) */
  text: string;
  /** Options du dernier marqueur complet rencontré */
  chips: string[];
}

export function parseAssistantText(raw: string): ParsedAssistantText {
  let chips: string[] = [];
  const withoutMarkers = raw.replace(CHIPS_RE, (_m, inner: string) => {
    chips = inner
      .split('|')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 4);
    return '';
  });
  const text = withoutMarkers.replace(PARTIAL_RE, '').trimEnd();
  return { text, chips };
}
