'use client';

import { useState } from 'react';

/**
 * Calcule le taux mensuel par méthode de Newton-Raphson.
 * PV = PMT × [(1 - (1+r)^(-n)) / r]
 */
function solveMonthlyRate(pv: number, pmt: number, n: number): number | null {
  // Estimation initiale
  let r = 0.01;

  for (let i = 0; i < 200; i++) {
    const pow = Math.pow(1 + r, -n);
    const f = pmt * (1 - pow) / r - pv;
    const df = pmt * (n * pow / (r * (1 + r)) - (1 - pow) / (r * r));

    if (Math.abs(df) < 1e-15) return null;

    const rNew = r - f / df;
    if (Math.abs(rNew - r) < 1e-10) return rNew;
    r = rNew;

    if (r <= 0 || !isFinite(r)) return null;
  }
  return null;
}

export default function CalculateurTauxPage() {
  const [prixVente, setPrixVente] = useState('');
  const [nbMensualites, setNbMensualites] = useState('');
  const [tarifMensuel, setTarifMensuel] = useState('');
  const [result, setResult] = useState<{
    tauxMensuel: number;
    tna: number;
    tae: number;
    totalPaye: number;
    coutCredit: number;
  } | null>(null);
  const [error, setError] = useState('');

  function handleCalcul() {
    setError('');
    setResult(null);

    const pv = parseFloat(prixVente.replace(/\s/g, '').replace(',', '.'));
    const n = parseInt(nbMensualites, 10);
    const pmt = parseFloat(tarifMensuel.replace(/\s/g, '').replace(',', '.'));

    if (!pv || pv <= 0 || !n || n <= 0 || !pmt || pmt <= 0) {
      setError('Veuillez remplir tous les champs avec des valeurs positives.');
      return;
    }

    const totalPaye = pmt * n;
    if (totalPaye <= pv) {
      setError('Le total des mensualités est inférieur ou égal au prix de vente. Pas de taux applicable.');
      return;
    }

    const r = solveMonthlyRate(pv, pmt, n);
    if (r === null || r <= 0) {
      setError('Impossible de calculer le taux. Vérifiez les valeurs saisies.');
      return;
    }

    const tna = r * 12 * 100;
    const tae = (Math.pow(1 + r, 12) - 1) * 100;

    setResult({
      tauxMensuel: r * 100,
      tna,
      tae,
      totalPaye,
      coutCredit: totalPaye - pv,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-future-dusk-900 mb-2">
          Calculateur de taux leasing
        </h1>
        <p className="text-sm text-future-dusk-600 mb-8">
          Outil interne — Retrouvez le taux bancaire à partir d&apos;une offre de leasing.
        </p>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          {/* Prix de vente */}
          <div>
            <label className="block text-sm font-medium text-future-dusk-900 mb-1">
              Prix de vente client (€ HT)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={prixVente}
              onChange={(e) => setPrixVente(e.target.value)}
              placeholder="ex: 15000"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent"
            />
          </div>

          {/* Nombre de mensualités */}
          <div>
            <label className="block text-sm font-medium text-future-dusk-900 mb-1">
              Nombre de mensualités
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={nbMensualites}
              onChange={(e) => setNbMensualites(e.target.value)}
              placeholder="ex: 36"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent"
            />
          </div>

          {/* Tarif mensuel */}
          <div>
            <label className="block text-sm font-medium text-future-dusk-900 mb-1">
              Tarif mensuel (€ HT)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={tarifMensuel}
              onChange={(e) => setTarifMensuel(e.target.value)}
              placeholder="ex: 480"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent"
            />
          </div>

          {/* Bouton */}
          <button
            onClick={handleCalcul}
            className="w-full bg-very-peri-500 hover:bg-very-peri-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
          >
            Calculer le taux
          </button>

          {/* Erreur */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* Résultats */}
          {result && (
            <div className="border-t border-neutral-200 pt-5 space-y-3">
              <h2 className="text-sm font-semibold text-future-dusk-900">Résultats</h2>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-very-peri-50 rounded-lg p-3">
                  <p className="text-xs text-future-dusk-600">Taux nominal annuel (TNA)</p>
                  <p className="text-xl font-bold text-very-peri-700">{result.tna.toFixed(2)}%</p>
                  <p className="text-xs text-future-dusk-500">= taux mensuel × 12</p>
                </div>
                <div className="bg-future-dusk-50 rounded-lg p-3">
                  <p className="text-xs text-future-dusk-600">Taux annuel effectif (TAE)</p>
                  <p className="text-xl font-bold text-future-dusk-700">{result.tae.toFixed(2)}%</p>
                  <p className="text-xs text-future-dusk-500">avec capitalisation</p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-future-dusk-600">Taux mensuel</span>
                  <span className="font-medium text-future-dusk-900">{result.tauxMensuel.toFixed(4)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-future-dusk-600">Total payé</span>
                  <span className="font-medium text-future-dusk-900">{result.totalPaye.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-future-dusk-600">Coût du crédit</span>
                  <span className="font-medium text-future-dusk-900">{result.coutCredit.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-neutral-400 mt-4 text-center">
          Usage interne PackshotCreator — Ne pas diffuser
        </p>
      </div>
    </div>
  );
}
