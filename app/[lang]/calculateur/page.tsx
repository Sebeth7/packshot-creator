'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * Calcule le taux mensuel par méthode de Newton-Raphson.
 * PV = PMT × [(1 - (1+r)^(-n)) / r]
 */
function solveMonthlyRate(pv: number, pmt: number, n: number): number | null {
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

/** Calcule la mensualité d'un prêt classique */
function computePmt(pv: number, annualRate: number, n: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return pv / n;
  return pv * r / (1 - Math.pow(1 + r, -n));
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
}

export default function CalculateurTauxPage() {
  const [prixVente, setPrixVente] = useState('');
  const [nbMensualites, setNbMensualites] = useState('');
  const [tarifMensuel, setTarifMensuel] = useState('');
  const [tauxBanque, setTauxBanque] = useState('5');
  const [apportBanque, setApportBanque] = useState('15');
  const [result, setResult] = useState<{
    pv: number;
    n: number;
    pmt: number;
    tauxMensuel: number;
    tna: number;
    tae: number;
    totalPaye: number;
    coutCredit: number;
    // Comparatif banque
    banqueTaux: number;
    banqueApportPct: number;
    banqueApport: number;
    banqueMontantFinance: number;
    banqueMensualite: number;
    banqueTotalPaye: number;
    banqueCoutCredit: number;
    banqueCoutTotal: number; // apport + total payé
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleCalcul() {
    setError('');
    setResult(null);

    const pv = parseFloat(prixVente.replace(/\s/g, '').replace(',', '.'));
    const n = parseInt(nbMensualites, 10);
    const pmt = parseFloat(tarifMensuel.replace(/\s/g, '').replace(',', '.'));
    const txBanque = parseFloat(tauxBanque.replace(',', '.'));
    const apportPct = parseFloat(apportBanque.replace(',', '.'));

    if (!pv || pv <= 0 || !n || n <= 0 || !pmt || pmt <= 0) {
      setError('Veuillez remplir tous les champs avec des valeurs positives.');
      return;
    }
    if (isNaN(txBanque) || txBanque < 0) {
      setError('Taux bancaire invalide.');
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

    // Comparatif banque
    const apport = pv * (apportPct / 100);
    const montantFinance = pv - apport;
    const mensualiteBanque = computePmt(montantFinance, txBanque, n);
    const totalPayeBanque = mensualiteBanque * n;
    const coutCreditBanque = totalPayeBanque - montantFinance;

    setResult({
      pv, n, pmt,
      tauxMensuel: r * 100,
      tna,
      tae,
      totalPaye,
      coutCredit: totalPaye - pv,
      banqueTaux: txBanque,
      banqueApportPct: apportPct,
      banqueApport: apport,
      banqueMontantFinance: montantFinance,
      banqueMensualite: mensualiteBanque,
      banqueTotalPaye: totalPayeBanque,
      banqueCoutCredit: coutCreditBanque,
      banqueCoutTotal: apport + totalPayeBanque,
    });
  }

  function buildArgumentaire(): string {
    if (!result) return '';
    const dureeAnnees = result.n / 12;
    const economieMensuelle = result.banqueMensualite - result.pmt;
    const lines = [
      `Bonjour,`,
      ``,
      `Suite à notre échange, voici le détail de notre offre de leasing sur ${result.n} mois (${dureeAnnees % 1 === 0 ? dureeAnnees.toFixed(0) : dureeAnnees.toFixed(1)} ans) pour un montant de ${fmt(result.pv)} € HT :`,
      ``,
      `--- VOTRE OFFRE LEASING PACKSHOTCREATOR ---`,
      `- Mensualité : ${fmt(result.pmt)} € HT/mois`,
      `- Aucun apport initial`,
      `- ${result.n} mensualités tout compris`,
      ``,
    ];

    if (economieMensuelle < 0) {
      // Leasing moins cher en mensualité
      lines.push(
        `--- POURQUOI LE LEASING EST AVANTAGEUX ---`,
        ``,
        `1. Mensualité plus faible : ${fmt(result.pmt)} €/mois vs ${fmt(result.banqueMensualite)} €/mois pour un prêt bancaire à ${result.banqueTaux}% (soit ${fmt(Math.abs(economieMensuelle))} €/mois d'économie)`,
      );
    } else {
      lines.push(`--- POURQUOI LE LEASING EST AVANTAGEUX ---`, ``);
    }

    lines.push(
      `${economieMensuelle < 0 ? '2' : '1'}. Zéro apport : pas de sortie de trésorerie initiale (un prêt bancaire nécessite ~${result.banqueApportPct}% d'apport, soit ${fmt(result.banqueApport)} €)`,
      `${economieMensuelle < 0 ? '3' : '2'}. 100% déductible : les mensualités de leasing sont intégralement déductibles de votre résultat fiscal (un prêt ne permet de déduire que les intérêts)`,
      `${economieMensuelle < 0 ? '4' : '3'}. Hors bilan : le leasing n'apparaît pas dans votre endettement bancaire, votre capacité d'emprunt reste intacte pour d'autres projets`,
      `${economieMensuelle < 0 ? '5' : '4'}. Flexibilité : en fin de contrat, vous pouvez restituer, racheter ou renouveler votre équipement`,
      `${economieMensuelle < 0 ? '6' : '5'}. Budget maîtrisé : une mensualité fixe et prévisible, sans surprise`,
      ``,
      `Je reste à votre disposition pour en discuter.`,
      ``,
      `Cordialement,`,
    );

    return lines.join('\n');
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildArgumentaire());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-future-dusk-900 mb-2">
          Calculateur de taux leasing
        </h1>
        <p className="text-sm text-future-dusk-600 mb-8">
          Outil interne — Calcul du taux + comparatif prêt bancaire + argumentaire commercial.
        </p>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          {/* --- Offre leasing --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide">Offre leasing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Prix de vente (€ HT)</label>
              <input type="text" inputMode="decimal" value={prixVente} onChange={(e) => setPrixVente(e.target.value)} placeholder="22900"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Nombre de mensualités</label>
              <input type="text" inputMode="numeric" value={nbMensualites} onChange={(e) => setNbMensualites(e.target.value)} placeholder="60"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Tarif mensuel (€ HT)</label>
              <input type="text" inputMode="decimal" value={tarifMensuel} onChange={(e) => setTarifMensuel(e.target.value)} placeholder="504"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent" />
            </div>
          </div>

          {/* --- Hypothèse prêt bancaire --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide mt-6">Hypothèse prêt bancaire</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Taux annuel estimé (%)</label>
              <input type="text" inputMode="decimal" value={tauxBanque} onChange={(e) => setTauxBanque(e.target.value)} placeholder="5"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Apport exigé (%)</label>
              <input type="text" inputMode="decimal" value={apportBanque} onChange={(e) => setApportBanque(e.target.value)} placeholder="15"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent" />
            </div>
          </div>

          {/* Bouton */}
          <button onClick={handleCalcul}
            className="w-full bg-very-peri-500 hover:bg-very-peri-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer">
            Calculer
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* --- Résultats --- */}
          {result && (
            <div className="border-t border-neutral-200 pt-5 space-y-5">

              {/* Taux leasing */}
              <div>
                <h2 className="text-sm font-semibold text-future-dusk-900 mb-3">Taux de votre offre leasing</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-very-peri-50 rounded-lg p-3">
                    <p className="text-xs text-future-dusk-600">TNA</p>
                    <p className="text-xl font-bold text-very-peri-700">{result.tna.toFixed(2)}%</p>
                  </div>
                  <div className="bg-future-dusk-50 rounded-lg p-3">
                    <p className="text-xs text-future-dusk-600">TAE</p>
                    <p className="text-xl font-bold text-future-dusk-700">{result.tae.toFixed(2)}%</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-3">
                    <p className="text-xs text-future-dusk-600">Taux mensuel</p>
                    <p className="text-xl font-bold text-future-dusk-700">{result.tauxMensuel.toFixed(3)}%</p>
                  </div>
                </div>
              </div>

              {/* Tableau comparatif */}
              <div>
                <h2 className="text-sm font-semibold text-future-dusk-900 mb-3">Comparatif leasing vs prêt bancaire</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-2 pr-4 text-future-dusk-600 font-medium"></th>
                        <th className="text-right py-2 px-3 text-very-peri-700 font-semibold bg-very-peri-50 rounded-t-lg">Leasing</th>
                        <th className="text-right py-2 pl-3 text-future-dusk-700 font-semibold">Prêt bancaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Apport initial</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">0 €</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">{fmt(result.banqueApport)} €</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Mensualité</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">{fmt(result.pmt)} €</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">{fmt(result.banqueMensualite)} €</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Total payé</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">{fmt(result.totalPaye)} €</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">{fmt(result.banqueCoutTotal)} €<br /><span className="text-xs text-future-dusk-500">({fmt(result.banqueApport)} € apport + {fmt(result.banqueTotalPaye)} €)</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Coût du financement</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">{fmt(result.coutCredit)} €</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">{fmt(result.banqueCoutCredit)} €</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Déductibilité fiscale</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">100% mensualités</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">Intérêts uniquement</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-future-dusk-600">Impact bilan</td>
                        <td className="py-2 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50">Hors bilan</td>
                        <td className="py-2 pl-3 text-right font-medium text-future-dusk-900">Endettement</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Argumentaire copiable */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-future-dusk-900">Argumentaire commercial</h2>
                  <button onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-very-peri-600 hover:text-very-peri-700 transition-colors cursor-pointer">
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copié</> : <><Copy className="w-3.5 h-3.5" /> Copier</>}
                  </button>
                </div>
                <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-xs text-future-dusk-800 whitespace-pre-wrap font-sans leading-relaxed max-h-80 overflow-y-auto">
                  {buildArgumentaire()}
                </pre>
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
