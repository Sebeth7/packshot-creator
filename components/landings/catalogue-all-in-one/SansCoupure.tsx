import { Fragment } from 'react';

/** Empêche « All-in-One » de se couper à un trait d'union en fin de ligne. */
export function SansCoupure({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/(All-in-One|ALL-IN-ONE)/).map((partie, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {partie}
          </span>
        ) : (
          <Fragment key={i}>{partie}</Fragment>
        ),
      )}
    </>
  );
}
