/**
 * Articles de blog Sysnext Industrial Solutions.
 *
 * Règle R7 cohabitation : blog segmenté sous /[lang]/industrie-solutions/blog/*.
 * Pas dans le blog PackshotCreator existant. Auteur : Seb Ducros, signature Sysnext.
 *
 * Drafts matière brute — structure, plan, bullets et chiffres factuels produits par Claude.
 * Le copy narratif final est rédigé par Seb (règle d'or 2).
 */

export interface BlogArticle {
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  category: 'normes' | 'aftermarket' | 'mro' | 'qc' | 'forensique' | 'general';
  tags: string[];
  datePublished: string;
  dateModified?: string;
  readingTimeMin: number;
  contentFr: string; // markdown-light, sections ## et ###, paragraphes séparés par \n\n
  contentEn: string;
  relatedSlugs?: string[];
  isDraft?: boolean; // flag "draft à retravailler par Seb"
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: 'documentation-visuelle-as9100-first-article-inspection-as9102',
    titleFr: 'Documentation visuelle conforme AS9100 : guide First Article Inspection (AS9102)',
    titleEn: 'AS9100-compliant visual documentation: First Article Inspection (AS9102) guide',
    excerptFr:
      "La documentation visuelle des FAI reste l'un des points les plus chronophages des dossiers qualité aéronautique. Comment industrialiser ce livrable sans sacrifier la conformité à l'AS9100 rev D ? Guide structuré pour directeurs qualité et SQE.",
    excerptEn:
      'Visual documentation of FAI records remains one of the most time-consuming steps in aerospace quality dossiers. How to industrialise this deliverable without sacrificing AS9100 rev D compliance? Structured guide for quality directors and SQEs.',
    category: 'normes',
    tags: ['AS9100', 'AS9102', 'FAI', 'aéronautique', 'qualité', 'documentation'],
    datePublished: '2026-04-22',
    readingTimeMin: 12,
    isDraft: true,
    contentFr: `## Ce que dit la norme AS9100 sur la preuve visuelle

AS9100 rev D (2016) impose aux fournisseurs aéronautiques une traçabilité complète des pièces critiques : lot, série, date, opérateur, gestion de configuration, non-conformités documentées. La preuve visuelle n'est pas formellement exigée par le texte, mais elle est en pratique systématiquement demandée par les auditeurs EASA, les OEM Airbus/Boeing/Dassault, et les panels qualité des équipementiers Tier 1.

Le protocole complémentaire AS9102 (First Article Inspection) impose lui des preuves visuelles explicites : Form 1 (product accountability), Form 2 (product accountability for assemblies), Form 3 (characteristic accountability). Chaque caractéristique du plan doit être prouvée. Zéro tolérance aux écarts.

## Les quatre douleurs terrain du FAI

La constitution d'un dossier FAI dans un atelier aéronautique mobilise aujourd'hui un opérateur pendant 2 à 5 jours par pièce complexe. Les principales douleurs observées en entretien avec des SQE équipementiers Tier 1 :

### 1. Photos smartphone non standardisées
L'opérateur prend ses photos avec son smartphone personnel ou un appareil partagé. Cadrage variable, éclairage dépendant de l'heure, pas de référence dimensionnelle, angles incohérents d'une pièce à l'autre.

### 2. Absence de répétabilité
Deux FAI successifs sur la même famille de pièces donnent des dossiers photos visuellement différents. Impossible de comparer. Les auditeurs s'en agacent.

### 3. Temps de constitution
Retouches manuelles, renommage de fichiers par SKU, export dans le PLM, ajout au dossier qualité : la partie photo représente couramment 40 à 60 % du temps total de constitution d'un FAI.

### 4. Risque de rejet
Les rejets auditeurs EASA sur manque de qualité documentaire sont fréquents. Chaque NCR (rapport de non-conformité) audit documentaire coûte en moyenne 3 à 8 k€ en remédiation interne.

## Ce qu'apporte une station de documentation visuelle standardisée

Une station de prise de vue standardisée type Orbitvu apporte quatre bénéfices mesurables sur la constitution des FAI.

### Templates AS9102 pré-configurés
Un set de Templates par type de pièce (aubes, carters, brides, arbres, instrumentation). Les paramètres sont figés : éclairage (74 LED individuellement pilotables), angle, focale, post-production, format d'export. Impossible à dérive dans le temps.

### Horodatage cryptographique
Chaque capture est horodatée via une source de temps certifiée et signée numériquement. Le hash du fichier est immuable. En cas de litige, la chaîne de preuve est inattaquable.

### Multi-angles systématique
La station capture en rotation 360° motorisée 12, 24 ou 36 vues selon le Template. Pas d'oubli d'angle. Comparabilité garantie entre pièces et entre FAI.

### Export automatisé vers PLM
Nommage SKU automatique, format multiple (JPG, PNG transparent, TIFF haute résolution), intégration directe dans le dossier FAI numérique via API REST. Connecteurs natifs pour SAP, Oracle, Infor.

## Gains mesurés sur cas industriels

Les gains observés sur premiers déploiements aéronautique civile :

| Indicateur | Avant | Après |
|---|---|---|
| Temps photo par pièce FAI | 2–5 jours | 20–45 min |
| Temps total dossier FAI | 5–10 jours | 2–3 jours |
| Taux rejet auditeur sur doc photo | 8–15 % | < 1 % |
| Coût total FAI | 3–8 k€ | 0,8–1,5 k€ |

ROI constaté : amortissement 12 à 18 mois sur un volume de 150+ FAI / an par site.

## Étapes de déploiement

Pour un équipementier Tier 1/2 démarrant un projet de documentation visuelle industrialisée, la trajectoire classique est la suivante.

### 1. Audit catalogue FAI existant (1 semaine)
Identification des familles de pièces à documenter, analyse des exigences auditeurs actuels, cadrage des Templates AS9102 à créer.

### 2. Installation station & Templates (1-2 jours)
Installation de la station sur site ou en showroom, création des Templates par famille de pièces, validation avec le responsable SQE.

### 3. Formation opérateur (2 jours, finançable OPCO)
Formation Qualiopi de 2 jours pour 1 à 3 opérateurs non-photographes. L'IA Photo Assistant guide les réglages. À l'issue, l'opérateur est autonome.

### 4. Pilote sur 20 FAI réels (1-2 semaines)
Mise en production sur un lot pilote. Ajustements Templates si nécessaire. Chiffrage ROI consolidé.

### 5. Montée en charge & intégration PLM (1-2 semaines)
Intégration au SI qualité (QMS, PLM, ERP). Production industrielle pleine.

## Limites et périmètre

Une station de documentation visuelle standardisée **ne remplace pas** :

- Un système de métrologie dimensionnelle (Mitutoyo, Zeiss, Hexagon) — la photo prouve l'aspect visuel, pas la cote au micron
- Un système de vision industrielle en ligne (Keyence, Cognex) — l'inspection temps réel sur chaîne de production reste l'apanage de la vision ligne
- Un QMS (Greenlight Guru, ETQ Reliance, MasterControl) — la station alimente le QMS mais ne le remplace pas

Elle complète ces outils en industrialisant **la preuve visuelle standardisée**.

## Pour aller plus loin

- Consulter les [pages dédiées Sysnext Industrial Solutions sur le contrôle qualité & inspection industrielle](/fr/industrie-solutions/controle-qualite-inspection)
- Estimer le ROI d'un projet dans votre contexte : [calculateur ROI industrie](/fr/industrie-solutions/calculateur-roi)
- Parler du projet 30 minutes avec Seb Ducros, fondateur et ingénieur d'affaires composants électroniques de formation : [réserver un créneau](#contact)

_[Draft matière brute — le copy narratif final sera retravaillé par Seb Ducros avec sa voix éditoriale signature. Chiffres et faits techniques à valider au moment de la publication.]_`,
    contentEn: `_Translation pending. Draft FR version above — Seb will translate after FR validation._`,
    relatedSlugs: [],
  },
];

export function getAllArticles(): BlogArticle[] {
  return [...ARTICLES].sort((a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const related = current.relatedSlugs
    ? (current.relatedSlugs.map(getArticleBySlug).filter(Boolean) as BlogArticle[])
    : [];
  if (related.length >= limit) return related.slice(0, limit);
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category && !related.some((r) => r.slug === a.slug),
  );
  return [...related, ...sameCategory].slice(0, limit);
}
