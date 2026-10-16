/**
 * Annotation de l'aperçu interne (V4.1) : point à établir avant publication.
 * Rendue seulement dans l'aperçu ; masquable par le bouton « Annotations » du
 * bandeau (attribut `data-annot` du conteneur `group/occasion`).
 */
export function Annotation({ visible, children, className = '' }: { visible: boolean; children: React.ReactNode; className?: string }) {
  if (!visible) return null;
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-md border border-dashed border-[#c98a00] bg-[#fff6dc] px-[7px] py-px align-[2px] font-body text-[11px] font-bold leading-[1.5] tracking-[0.02em] text-[#7a5200] group-data-[annot=off]/occasion:hidden ${className}`}
    >
      {children}
    </span>
  );
}

/** Avis de simulation des formulaires : toujours visible, indépendant des annotations. */
export function AvisSimulation({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      role="note"
      className={`flex items-start gap-2 rounded-[10px] border border-[#e8c66a] bg-[#fff8e9] px-3 py-2 text-[12.5px] font-semibold leading-snug text-[#7a5200] ${className}`}
    >
      <span aria-hidden="true" className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-accent-gold" />
      <span>{children}</span>
    </p>
  );
}
