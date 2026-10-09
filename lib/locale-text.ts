/**
 * Sélecteur de chaîne inline 3-langues (fr / en / de-ch).
 *
 * Pour les libellés de « chrome » codés en dur dans les templates (breadcrumbs,
 * CTA, libellés de section) qui étaient écrits en binaire `lang === 'fr' ? fr : en`.
 * Étend proprement à la Suisse alémanique sans passer par un namespace de messages.
 *
 *   tx(lang, 'Accueil', 'Home', 'Startseite')
 *
 * Helvétismes : ne jamais utiliser « ß » (toujours « ss ») dans le 3e argument.
 */
export function tx(lang: string, fr: string, en: string, deCh: string): string {
  if (lang === 'de-ch') return deCh;
  if (lang === 'en') return en;
  return fr;
}

/**
 * Sélecteur pour un objet de données localisé `{ fr, en, 'de-ch'? }`.
 * Pour les champs de données (machines, secteurs) historiquement bilingues.
 * Fallback de-ch → en si la traduction allemande n'est pas (encore) fournie,
 * pour ne jamais rendre `undefined`.
 */
export function pickL(
  lang: string,
  obj: { fr: string; en: string; 'de-ch'?: string },
): string {
  if (lang === 'de-ch') return obj['de-ch'] ?? obj.en;
  if (lang === 'en') return obj.en;
  return obj.fr;
}

/**
 * Sélecteur pour une liste FR accompagnée de traductions parallèles optionnelles
 * (ex. `useCases` + `useCasesI18n` des catalogues machines).
 * Sans traduction pour la langue demandée, ou si la longueur diffère de la liste
 * FR, renvoie la liste FR d'origine : jamais de liste vide ni tronquée.
 */
export function pickListL(
  lang: string,
  fr: string[],
  i18n?: { en: string[]; 'de-ch': string[] },
): string[] {
  if (!i18n || lang === 'fr') return fr;
  const list = lang === 'de-ch' ? i18n['de-ch'] : lang === 'en' ? i18n.en : undefined;
  return list && list.length === fr.length ? list : fr;
}
