'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-8xl font-heading font-bold text-white/20">500</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
          {error.message || "Quelque chose s\u2019est mal pass\u00e9. Veuillez r\u00e9essayer."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-very-peri-500 hover:bg-very-peri-600 text-white font-medium rounded-xl transition-colors"
          >
            R&#233;essayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
          >
            Retour &#224; l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
