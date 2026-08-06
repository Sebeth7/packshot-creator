import RoiPublicChat from '@/components/roiChat/public/RoiPublicChat';

// Remplacement direct du wizard par le conseiller ROI conversationnel
// (CDC_CALCULATEUR_ROI_IA.md §2, GO Seb 06/08/2026 — lot 7).
// Le wizard reste en service sur les pages localisées /[lang]/calculateur-roi
// (fr/en/de-ch, indexées) jusqu'à l'extension EN/DE-CH du chat.
export default function CalculateurROIPage() {
  return <RoiPublicChat />;
}
