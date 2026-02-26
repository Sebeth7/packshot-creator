'use client';

import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import jsPDF from 'jspdf';

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

const IS_RATE = 0.25; // Taux d'impôt sur les sociétés

interface CalculResult {
  pv: number;
  n: number;
  pmt: number;
  tauxMensuel: number;
  tna: number;
  tae: number;
  totalPaye: number;
  coutCredit: number;
  // Banque
  banqueTaux: number;
  banqueApportPct: number;
  banqueApport: number;
  banqueMontantFinance: number;
  banqueMensualite: number;
  banqueTotalPaye: number;
  banqueCoutCredit: number;
  banqueCoutTotal: number;
  // Coûts réels après avantages fiscaux
  leasingCoutReel: number;
  achatCoutReel: number;
}

// ---- Génération PDF ----

function generateComparatifPDF(r: CalculResult) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 15;
  const contentW = W - margin * 2;

  // Couleurs
  const veryPeri = { r: 102, g: 103, b: 171 };   // #6667AB
  const futureDusk = { r: 76, g: 85, b: 120 };    // #4c5578
  const veryPeriLight = { r: 245, g: 245, b: 250 }; // #f5f5fa
  const borderGray = { r: 229, g: 231, b: 235 };  // #e5e7eb

  // ---- Header ----
  doc.setFillColor(veryPeri.r, veryPeri.g, veryPeri.b);
  doc.rect(0, 0, W, 32, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PackshotCreator', margin, 14);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Comparatif des solutions de financement', margin, 22);
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(dateStr, W - margin, 22, { align: 'right' });

  let y = 42;

  // ---- Sous-titre ----
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Équipement : ${fmt(r.pv)} € HT — Durée : ${r.n} mois`, margin, y);
  y += 10;

  // ---- Tableau comparatif ----
  const colW = [contentW * 0.31, contentW * 0.23, contentW * 0.23, contentW * 0.23];
  const colX = [margin, margin + colW[0], margin + colW[0] + colW[1], margin + colW[0] + colW[1] + colW[2]];
  const rowH = 9;

  // En-tête tableau
  doc.setFillColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.rect(margin, y, contentW, rowH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('', colX[0] + 2, y + 6);
  doc.text('Leasing', colX[1] + colW[1] / 2, y + 6, { align: 'center' });
  doc.text('Prêt bancaire', colX[2] + colW[2] / 2, y + 6, { align: 'center' });
  doc.text('Achat direct', colX[3] + colW[3] / 2, y + 6, { align: 'center' });
  y += rowH;

  // Données du tableau
  const rows: Array<{ label: string; leasing: string; banque: string; achat: string; highlight?: boolean }> = [
    {
      label: 'Dépense immédiate',
      leasing: '0 €',
      banque: `${fmt(r.banqueApport)} €`,
      achat: `${fmt(r.pv)} €`,
    },
    {
      label: 'Mensualité',
      leasing: `${fmt(r.pmt)} €/mois`,
      banque: `${fmt(r.banqueMensualite)} €/mois`,
      achat: 'Aucune',
    },
    {
      label: 'Total des paiements',
      leasing: `${fmt(r.totalPaye)} €`,
      banque: `${fmt(r.banqueCoutTotal)} €`,
      achat: `${fmt(r.pv)} €`,
    },
    {
      label: 'Coût du financement',
      leasing: `${fmt(r.coutCredit)} €`,
      banque: `${fmt(r.banqueCoutCredit)} €`,
      achat: '0 €',
    },
    {
      label: 'Déductible des impôts',
      leasing: '100% des loyers',
      banque: 'Non comptabilisé',
      achat: 'Amortissement 5 ans',
    },
    {
      label: 'Impact sur l\'endettement',
      leasing: 'Aucun (hors bilan)',
      banque: 'Augmente la dette',
      achat: 'Aucun',
    },
    {
      label: 'Trésorerie préservée',
      leasing: 'Oui',
      banque: 'Partiellement',
      achat: 'Non',
    },
    {
      label: 'Coût réel après impôts',
      leasing: `${fmt(r.leasingCoutReel)} €`,
      banque: `${fmt(r.banqueCoutTotal)} €`,
      achat: `${fmt(r.achatCoutReel)} €`,
      highlight: true,
    },
  ];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const isEven = i % 2 === 0;

    if (row.highlight) {
      // Dernière ligne — fond Very Peri, texte blanc
      doc.setFillColor(veryPeri.r, veryPeri.g, veryPeri.b);
      doc.rect(margin, y, contentW, rowH + 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
    } else {
      if (isEven) {
        doc.setFillColor(veryPeriLight.r, veryPeriLight.g, veryPeriLight.b);
        doc.rect(colX[1], y, colW[1], rowH, 'F');
      }
      // Bordure basse
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.line(margin, y + rowH, margin + contentW, y + rowH);
      doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
      doc.setFont('helvetica', 'normal');
    }

    doc.setFontSize(8);
    if (row.highlight) {
      doc.setFont('helvetica', 'bold');
    }

    // Label
    doc.text(row.label, colX[0] + 2, y + 6);
    // Valeurs — centrées dans chaque colonne
    doc.text(row.leasing, colX[1] + colW[1] / 2, y + 6, { align: 'center' });
    doc.text(row.banque, colX[2] + colW[2] / 2, y + 6, { align: 'center' });
    doc.text(row.achat, colX[3] + colW[3] / 2, y + 6, { align: 'center' });

    y += row.highlight ? rowH + 1 : rowH;
  }

  y += 8;

  // ---- Note explicative ----
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `Coût réel : montant effectivement supporté après déduction fiscale (IS à ${IS_RATE * 100}%).`,
    margin, y
  );
  y += 4;
  doc.text(
    `Leasing : ${fmt(r.totalPaye)} € × ${(1 - IS_RATE) * 100}% = ${fmt(r.leasingCoutReel)} € (100% déductible). Achat : ${fmt(r.pv)} € − ${fmt(r.pv * IS_RATE)} € d'économie d'IS via amortissement = ${fmt(r.achatCoutReel)} €.`,
    margin, y, { maxWidth: contentW }
  );
  y += 12;

  // ---- Section avantages ----
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.text('Synthèse par solution', margin, y);
  y += 7;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');

  const sections = [
    {
      title: 'Leasing',
      color: veryPeri,
      points: [
        'Aucun apport, trésorerie intacte',
        'Loyers 100% déductibles du résultat fiscal',
        'N\'apparaît pas dans l\'endettement bancaire',
        'Flexibilité en fin de contrat (restitution, rachat ou renouvellement)',
      ],
    },
    {
      title: 'Prêt bancaire',
      color: futureDusk,
      points: [
        'Vous devenez propriétaire du bien immédiatement',
        'Nécessite un apport et un dossier bancaire',
        'Augmente l\'endettement au bilan',
        'Avantages fiscaux limités (intérêts non comptabilisés ici)',
      ],
    },
    {
      title: 'Achat direct',
      color: { r: 100, g: 100, b: 100 },
      points: [
        'Aucun coût de financement supplémentaire',
        'Amortissement déductible sur 5 ans',
        'Sortie de trésorerie immédiate importante',
        'Propriété immédiate du bien',
      ],
    },
  ];

  for (const section of sections) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(section.color.r, section.color.g, section.color.b);
    doc.text(section.title, margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
    for (const point of section.points) {
      doc.text(`•  ${point}`, margin + 3, y);
      y += 4;
    }
    y += 3;
  }

  // ---- Footer ----
  const pageH = 297;
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('www.packshotcreator.com  |  contact@packshotcreator.com', W / 2, pageH - 8, { align: 'center' });
  doc.text('Ce document est fourni à titre indicatif et ne constitue pas un conseil financier.', W / 2, pageH - 4, { align: 'center' });

  doc.save(`Comparatif-Financement-${fmt(r.pv)}EUR.pdf`);
}

// ---- Composant principal ----

export default function CalculateurTauxPage() {
  const [prixVente, setPrixVente] = useState('');
  const [nbMensualites, setNbMensualites] = useState('');
  const [tarifMensuel, setTarifMensuel] = useState('');
  const [tauxBanque, setTauxBanque] = useState('5');
  const [apportBanque, setApportBanque] = useState('15');
  const [result, setResult] = useState<CalculResult | null>(null);
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

    // Coûts réels après avantages fiscaux
    const leasingCoutReel = totalPaye * (1 - IS_RATE);
    const achatCoutReel = pv * (1 - IS_RATE);

    setResult({
      pv, n, pmt,
      tauxMensuel: r * 100,
      tna, tae,
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
      leasingCoutReel,
      achatCoutReel,
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

  // ---- Classes CSS réutilisées ----
  const inputCls = "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-very-peri-500 focus:border-transparent";
  const thLeasing = "py-2 px-3 text-right text-very-peri-700 font-semibold bg-very-peri-50";
  const thOther = "py-2 px-3 text-right text-future-dusk-700 font-semibold";
  const tdLabel = "py-2.5 pr-3 text-future-dusk-600 text-xs";
  const tdLeasing = "py-2.5 px-3 text-right font-medium text-very-peri-700 bg-very-peri-50";
  const tdBanque = "py-2.5 px-3 text-right font-medium text-future-dusk-900";
  const tdAchat = "py-2.5 px-3 text-right font-medium text-future-dusk-900";

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-future-dusk-900 mb-2">
          Calculateur de taux leasing
        </h1>
        <p className="text-sm text-future-dusk-600 mb-8">
          Outil interne — Calcul du taux + comparatif financement + argumentaire commercial.
        </p>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          {/* --- Offre leasing --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide">Offre leasing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Prix de vente (€ HT)</label>
              <input type="text" inputMode="decimal" value={prixVente} onChange={(e) => setPrixVente(e.target.value)} placeholder="22900" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Nombre de mensualités</label>
              <input type="text" inputMode="numeric" value={nbMensualites} onChange={(e) => setNbMensualites(e.target.value)} placeholder="60" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Tarif mensuel (€ HT)</label>
              <input type="text" inputMode="decimal" value={tarifMensuel} onChange={(e) => setTarifMensuel(e.target.value)} placeholder="504" className={inputCls} />
            </div>
          </div>

          {/* --- Hypothèse prêt bancaire --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide mt-6">Hypothèse prêt bancaire</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Taux annuel estimé (%)</label>
              <input type="text" inputMode="decimal" value={tauxBanque} onChange={(e) => setTauxBanque(e.target.value)} placeholder="5" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Apport exigé (%)</label>
              <input type="text" inputMode="decimal" value={apportBanque} onChange={(e) => setApportBanque(e.target.value)} placeholder="15" className={inputCls} />
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

              {/* Taux leasing (usage interne) */}
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

              {/* Tableau comparatif 3 colonnes */}
              <div>
                <h2 className="text-sm font-semibold text-future-dusk-900 mb-3">Comparatif des solutions de financement</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-2 pr-4 text-future-dusk-600 font-medium"></th>
                        <th className={thLeasing}>Leasing</th>
                        <th className={thOther}>Prêt bancaire</th>
                        <th className={thOther}>Achat direct</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      <tr>
                        <td className={tdLabel}>Dépense immédiate</td>
                        <td className={tdLeasing}>0 €</td>
                        <td className={tdBanque}>{fmt(result.banqueApport)} €</td>
                        <td className={tdAchat}>{fmt(result.pv)} €</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Mensualité</td>
                        <td className={tdLeasing}>{fmt(result.pmt)} €/mois</td>
                        <td className={tdBanque}>{fmt(result.banqueMensualite)} €/mois</td>
                        <td className={tdAchat}>Aucune</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Total des paiements</td>
                        <td className={tdLeasing}>{fmt(result.totalPaye)} €</td>
                        <td className={tdBanque}>
                          {fmt(result.banqueCoutTotal)} €
                          <br /><span className="text-xs text-future-dusk-400">({fmt(result.banqueApport)} € apport + {fmt(result.banqueTotalPaye)} €)</span>
                        </td>
                        <td className={tdAchat}>{fmt(result.pv)} €</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Coût du financement</td>
                        <td className={tdLeasing}>{fmt(result.coutCredit)} €</td>
                        <td className={tdBanque}>{fmt(result.banqueCoutCredit)} €</td>
                        <td className={tdAchat}>0 €</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Déductible des impôts</td>
                        <td className={tdLeasing}>100% des loyers</td>
                        <td className={tdBanque}>Non comptabilisé</td>
                        <td className={tdAchat}>Amortissement 5 ans</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Impact sur l&apos;endettement</td>
                        <td className={tdLeasing}>Aucun (hors bilan)</td>
                        <td className={tdBanque}>Augmente la dette</td>
                        <td className={tdAchat}>Aucun</td>
                      </tr>
                      <tr>
                        <td className={tdLabel}>Trésorerie préservée</td>
                        <td className={tdLeasing}>Oui</td>
                        <td className={tdBanque}>Partiellement</td>
                        <td className={tdAchat}>Non</td>
                      </tr>
                      {/* Dernière ligne — coût réel */}
                      <tr className="bg-very-peri-500">
                        <td className="py-3 pr-3 text-white font-bold text-xs rounded-bl-lg">Coût réel après impôts</td>
                        <td className="py-3 px-3 text-right font-bold text-white text-sm">{fmt(result.leasingCoutReel)} €</td>
                        <td className="py-3 px-3 text-right font-bold text-white text-sm">{fmt(result.banqueCoutTotal)} €</td>
                        <td className="py-3 px-3 text-right font-bold text-white text-sm rounded-br-lg">{fmt(result.achatCoutReel)} €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-future-dusk-400 mt-2">
                  Coût réel = montant effectivement supporté après déduction fiscale (IS {IS_RATE * 100}%).
                  Leasing : 100% déductible → coût × {(1 - IS_RATE) * 100}%. Achat : amortissement sur 5 ans → prix × {(1 - IS_RATE) * 100}%.
                  Prêt bancaire : avantages fiscaux non comptabilisés.
                </p>
              </div>

              {/* Bouton PDF */}
              <button onClick={() => generateComparatifPDF(result)}
                className="w-full flex items-center justify-center gap-2 bg-future-dusk-500 hover:bg-future-dusk-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer">
                <Download className="w-4 h-4" />
                Télécharger le comparatif en PDF
              </button>

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
