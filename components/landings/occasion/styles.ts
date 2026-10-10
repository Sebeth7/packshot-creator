/** Classes partagées de la landing occasion, transcrites des styles de la maquette V4.1. */

export const bouton =
  'inline-flex min-h-12 items-center justify-center gap-[9px] rounded-[10px] border px-[22px] py-2.5 text-center text-[15px] font-semibold leading-[1.25] no-underline transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-very-peri-300 cursor-pointer';
export const boutonPrincipal = `${bouton} border-transparent bg-very-peri-500 text-white shadow-[0_10px_24px_-12px_rgba(102,103,171,.8)] hover:bg-very-peri-600`;
export const boutonSecondaire = `${bouton} border-future-dusk-100 bg-white text-future-dusk-700 hover:border-very-peri-500 hover:text-very-peri-600`;

export const surtitre = 'text-xs font-semibold uppercase tracking-[0.16em] text-very-peri-500';
export const titre2 =
  'mt-2.5 mb-3 max-w-[780px] font-heading text-[clamp(26px,3vw,38px)] font-bold leading-[1.12] tracking-[-0.015em] text-future-dusk-900';
export const chapo = 'max-w-[660px] text-[17px] text-[#3a4450]';
export const enveloppe = 'mx-auto max-w-[1120px] px-4 md:px-6';
export const section = 'py-[52px] md:py-[76px]';

export const champ = 'mb-3 flex flex-col gap-1.5';
export const etiquette = 'text-[13px] font-semibold text-future-dusk-700';
export const facultatif = 'font-normal text-future-dusk-400';
export const saisieBase =
  'h-[46px] w-full min-w-0 rounded-[10px] border bg-white px-3 text-[15px] text-future-dusk-900 focus:border-very-peri-500 focus:outline-none focus:ring-[3px] focus:ring-very-peri-50';
export const saisie = (erreur: boolean) => `${saisieBase} ${erreur ? 'border-[#b42318]' : 'border-future-dusk-100'}`;
/** Liste déroulante : chevron posé par `Liste` (composant), à droite. */
export const liste = (erreur: boolean) => `${saisie(erreur)} appearance-none truncate pr-[38px]`;
export const messageErreur = 'text-[12.5px] font-semibold text-[#b42318]';
export const mentionFine = 'mt-2.5 text-xs leading-normal text-future-dusk-400';
