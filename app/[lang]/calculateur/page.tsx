'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
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

/** Formatage nombre avec espace normal (pas insécable) pour compatibilité PDF */
function fmt(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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
  // Surcoût annualisé après impôts (vs achat direct)
  leasingSurcoutAnnuel: number;
  banqueSurcoutAnnuel: number;
}

// ---- Génération PDF ----

async function generateComparatifPDF(r: CalculResult, clientName: string, systemName: string) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 15;
  const contentW = W - margin * 2;
  // Image hero : 2860×980 → ratio 2.918:1
  const imgRatio = 2860 / 980;
  const headerH = Math.round(W / imgRatio); // ~72mm, proportions respectées

  // Couleurs
  const veryPeri = { r: 102, g: 103, b: 171 };
  const futureDusk = { r: 76, g: 85, b: 120 };
  const veryPeriLight = { r: 245, g: 245, b: 250 };
  const borderGray = { r: 229, g: 231, b: 235 };

  // ---- Header avec image de fond (proportions respectées) ----
  try {
    const res = await fetch('/images/hero/hero-studios-wide.jpg');
    const blob = await res.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    doc.addImage(base64, 'JPEG', 0, 0, W, headerH);
  } catch {
    doc.setFillColor(veryPeri.r, veryPeri.g, veryPeri.b);
    doc.rect(0, 0, W, headerH, 'F');
  }

  // Overlay sombre pour lisibilité du texte blanc
  doc.setFillColor(0, 0, 0);
  doc.setGState(new (doc as any).GState({ opacity: 0.45 }));
  doc.rect(0, 0, W, headerH, 'F');
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // Texte centré verticalement dans le header
  const textY = headerH / 2;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('PackshotCreator', margin, textY - 6);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Comparatif des solutions de financement', margin, textY + 4);
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(dateStr, W - margin, textY + 4, { align: 'right' });

  let y = headerH + 8;

  // ---- Infos client & système ----
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (clientName.trim()) {
    doc.text(`Client : ${clientName.trim()}`, margin, y);
    y += 6;
  }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const systemLabel = systemName.trim() || 'Equipement';
  doc.text(`${systemLabel} : ${fmt(r.pv)} € HT — Durée : ${r.n} mois`, margin, y);
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
  doc.text('Pret bancaire *', colX[2] + colW[2] / 2, y + 6, { align: 'center' });
  doc.text('Achat direct', colX[3] + colW[3] / 2, y + 6, { align: 'center' });
  y += rowH;

  const rows: Array<{ label: string; leasing: string; banque: string; achat: string; highlight?: boolean }> = [
    { label: 'Depense immediate', leasing: '0 €', banque: `${fmt(r.banqueApport)} €`, achat: `${fmt(r.pv)} €` },
    { label: 'Mensualite', leasing: `${fmt(r.pmt)} €/mois`, banque: `${fmt(r.banqueMensualite)} €/mois`, achat: 'Aucune' },
    { label: 'Total des paiements', leasing: `${fmt(r.totalPaye)} €`, banque: `${fmt(r.banqueCoutTotal)} €`, achat: `${fmt(r.pv)} €` },
    { label: 'Cout du financement', leasing: `${fmt(r.coutCredit)} €`, banque: `${fmt(r.banqueCoutCredit)} €`, achat: '0 €' },
    { label: 'Deductible des impots', leasing: '100% des loyers', banque: 'Non comptabilise', achat: 'Amortissement 5 ans' },
    { label: 'Impact sur l\'endettement', leasing: 'Aucun (hors bilan)', banque: 'Augmente la dette', achat: 'Aucun' },
    { label: 'Tresorerie preservee', leasing: 'Oui', banque: 'Partiellement', achat: 'Non' },
    {
      label: 'Cout reel apres impots',
      leasing: `${fmt(r.leasingCoutReel)} €\n* surcout reel : ${r.leasingSurcoutAnnuel >= 0 ? '+' : ''}${r.leasingSurcoutAnnuel.toFixed(1)}%/an`,
      banque: `${fmt(r.banqueCoutTotal)} €\n* surcout reel : +${r.banqueSurcoutAnnuel.toFixed(1)}%/an`,
      achat: `${fmt(r.achatCoutReel)} €`,
      highlight: true,
    },
  ];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const isEven = i % 2 === 0;

    if (row.highlight) {
      const highlightH = rowH + 6;
      doc.setFillColor(veryPeri.r, veryPeri.g, veryPeri.b);
      doc.rect(margin, y, contentW, highlightH, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
    } else {
      if (isEven) {
        doc.setFillColor(veryPeriLight.r, veryPeriLight.g, veryPeriLight.b);
        doc.rect(colX[1], y, colW[1], rowH, 'F');
      }
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.line(margin, y + rowH, margin + contentW, y + rowH);
      doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
      doc.setFont('helvetica', 'normal');
    }

    doc.setFontSize(8);
    if (row.highlight) doc.setFont('helvetica', 'bold');

    doc.text(row.label, colX[0] + 2, y + 6);
    doc.text(row.leasing, colX[1] + colW[1] / 2, y + 6, { align: 'center' });
    doc.text(row.banque, colX[2] + colW[2] / 2, y + 6, { align: 'center' });
    doc.text(row.achat, colX[3] + colW[3] / 2, y + 6, { align: 'center' });

    y += row.highlight ? rowH + 6 : rowH;
  }

  y += 8;

  // ---- Note explicative ----
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `* Pret bancaire : estimations basees sur des conditions moyennes constatees (taux et apport variables selon les etablissements).`,
    margin, y, { maxWidth: contentW }
  );
  y += 5;
  doc.text(
    `Cout reel : montant effectivement supporte apres deduction fiscale (IS a ${IS_RATE * 100}%).`,
    margin, y
  );
  y += 4;
  doc.text(
    `Leasing : ${fmt(r.totalPaye)} € x ${(1 - IS_RATE) * 100}% = ${fmt(r.leasingCoutReel)} € (100% deductible). Achat : ${fmt(r.pv)} € - ${fmt(r.pv * IS_RATE)} € d'economie d'IS via amortissement = ${fmt(r.achatCoutReel)} €.`,
    margin, y, { maxWidth: contentW }
  );
  y += 12;

  // ---- Section avantages ----
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(futureDusk.r, futureDusk.g, futureDusk.b);
  doc.text('Synthese par solution', margin, y);
  y += 7;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');

  const sections = [
    {
      title: 'Leasing',
      color: veryPeri,
      points: [
        'Aucun apport, tresorerie intacte',
        'Loyers 100% deductibles du resultat fiscal',
        'N\'apparait pas dans l\'endettement bancaire',
        'Flexibilite en fin de contrat (restitution, rachat ou renouvellement)',
      ],
    },
    {
      title: 'Pret bancaire',
      color: futureDusk,
      points: [
        'Vous devenez proprietaire du bien immediatement',
        'Necessite un apport et un dossier bancaire',
        'Augmente l\'endettement au bilan',
        'Avantages fiscaux limites (interets non comptabilises ici)',
      ],
    },
    {
      title: 'Achat direct',
      color: { r: 100, g: 100, b: 100 },
      points: [
        'Aucun cout de financement supplementaire',
        'Amortissement deductible sur 5 ans',
        'Sortie de tresorerie immediate importante',
        'Propriete immediate du bien',
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
      doc.text(`-  ${point}`, margin + 3, y);
      y += 4;
    }
    y += 3;
  }

  // ---- Footer ----
  const pageH = 297;
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('www.packshotcreator.com  |  contact@sysnext.com', W / 2, pageH - 8, { align: 'center' });
  doc.text('Ce document est fourni a titre indicatif et ne constitue pas un conseil financier.', W / 2, pageH - 4, { align: 'center' });

  const safeName = clientName.trim().replace(/\s+/g, '-') || 'Client';
  doc.save(`Comparatif-Financement-${safeName}-${fmt(r.pv)}EUR.pdf`);
}

// ---- Composant principal ----

export default function CalculateurTauxPage() {
  const [prixVente, setPrixVente] = useState('');
  const [nbMensualites, setNbMensualites] = useState('');
  const [tarifMensuel, setTarifMensuel] = useState('');
  const [tauxBanque, setTauxBanque] = useState('5');
  const [apportBanque, setApportBanque] = useState('20');
  const [clientName, setClientName] = useState('');
  const [systemName, setSystemName] = useState('');
  const [result, setResult] = useState<CalculResult | null>(null);
  const [error, setError] = useState('');

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

    const apport = pv * (apportPct / 100);
    const montantFinance = pv - apport;
    const mensualiteBanque = computePmt(montantFinance, txBanque, n);
    const totalPayeBanque = mensualiteBanque * n;
    const coutCreditBanque = totalPayeBanque - montantFinance;

    const leasingCoutReel = totalPaye * (1 - IS_RATE);
    const achatCoutReel = pv * (1 - IS_RATE);

    // Surcoût annualisé après impôts vs achat direct
    // = (coût réel - prix équipement) / prix / durée en années × 100
    const dureeAnnees = n / 12;
    const leasingSurcoutAnnuel = ((leasingCoutReel - pv) / pv / dureeAnnees) * 100;
    const banqueSurcoutAnnuel = ((apport + totalPayeBanque - pv) / pv / dureeAnnees) * 100;

    setResult({
      pv, n, pmt,
      tauxMensuel: r * 100, tna, tae,
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
      leasingSurcoutAnnuel,
      banqueSurcoutAnnuel,
    });
  }

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
          Outil interne — Calcul du taux + comparatif financement.
        </p>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          {/* --- Infos client --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide">Informations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Nom du client</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Entreprise XYZ" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-future-dusk-900 mb-1">Système devisé</label>
              <input type="text" value={systemName} onChange={(e) => setSystemName(e.target.value)} placeholder="Orbitvu Alphashot XL" className={inputCls} />
            </div>
          </div>

          {/* --- Offre leasing --- */}
          <h2 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wide mt-6">Offre leasing</h2>

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
              <input type="text" inputMode="decimal" value={apportBanque} onChange={(e) => setApportBanque(e.target.value)} placeholder="20" className={inputCls} />
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
                        <th className={thOther}>Prêt bancaire *</th>
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
                        <td className="py-3 px-3 text-right font-bold text-white text-sm">
                          {fmt(result.leasingCoutReel)} €
                          <div className="text-xs font-normal text-white/80 mt-0.5">
                            * surcoût réel : {result.leasingSurcoutAnnuel >= 0 ? '+' : ''}{result.leasingSurcoutAnnuel.toFixed(1)}%/an
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-white text-sm">
                          {fmt(result.banqueCoutTotal)} €
                          <div className="text-xs font-normal text-white/80 mt-0.5">
                            * surcoût réel : +{result.banqueSurcoutAnnuel.toFixed(1)}%/an
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-white text-sm rounded-br-lg">{fmt(result.achatCoutReel)} €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-future-dusk-400 mt-2">
                  * Prêt bancaire : estimations basées sur des conditions moyennes constatées (taux et apport variables selon les établissements).
                </p>
                <p className="text-xs text-future-dusk-400 mt-1">
                  Coût réel = montant effectivement supporté après déduction fiscale (IS {IS_RATE * 100}%).
                  Leasing : 100% déductible → coût × {(1 - IS_RATE) * 100}%. Achat : amortissement sur 5 ans → prix × {(1 - IS_RATE) * 100}%.
                  Prêt bancaire : avantages fiscaux non comptabilisés car négligeables.
                </p>
                <p className="text-xs text-future-dusk-400 mt-1">
                  * Surcoût réel : écart annualisé entre le coût réel après impôts et le prix de l&apos;équipement. Un surcoût négatif signifie que la solution coûte moins cher que le prix d&apos;achat grâce aux déductions fiscales.
                </p>
              </div>

              {/* Bouton PDF */}
              <button onClick={() => generateComparatifPDF(result, clientName, systemName)}
                className="w-full flex items-center justify-center gap-2 bg-future-dusk-500 hover:bg-future-dusk-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer">
                <Download className="w-4 h-4" />
                Télécharger le comparatif en PDF
              </button>

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
