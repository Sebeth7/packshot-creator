import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  Eye,
  BookOpen,
  UserX,
  LayoutTemplate,
  RotateCw,
  Focus,
  Scissors,
  Ghost,
  Lightbulb,
  Upload,
  Bot,
  Plane,
  Shield,
  Car,
  HeartPulse,
  Cpu,
  Package,
} from 'lucide-react';

// ==========================================
// Technologies Orbitvu applicables industrie
// ==========================================

export interface Technology {
  icon: LucideIcon;
  nameKey: string;
  descKey: string;
}

export const TECHNOLOGIES: Technology[] = [
  { icon: LayoutTemplate, nameKey: 'tech1.name', descKey: 'tech1.desc' },
  { icon: RotateCw, nameKey: 'tech2.name', descKey: 'tech2.desc' },
  { icon: Focus, nameKey: 'tech3.name', descKey: 'tech3.desc' },
  { icon: Scissors, nameKey: 'tech4.name', descKey: 'tech4.desc' },
  { icon: Ghost, nameKey: 'tech5.name', descKey: 'tech5.desc' },
  { icon: Lightbulb, nameKey: 'tech6.name', descKey: 'tech6.desc' },
  { icon: Upload, nameKey: 'tech7.name', descKey: 'tech7.desc' },
  { icon: Bot, nameKey: 'tech8.name', descKey: 'tech8.desc' },
];

// ==========================================
// Points de douleur
// ==========================================

export interface PainPoint {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export const PAIN_POINTS: PainPoint[] = [
  { icon: AlertTriangle, titleKey: 'pain1.title', descKey: 'pain1.desc' },
  { icon: Eye, titleKey: 'pain2.title', descKey: 'pain2.desc' },
  { icon: BookOpen, titleKey: 'pain3.title', descKey: 'pain3.desc' },
  { icon: UserX, titleKey: 'pain4.title', descKey: 'pain4.desc' },
];

// ==========================================
// Segments industriels
// ==========================================

export interface Segment {
  icon: LucideIcon;
  nameKey: string;
  normsKey: string;
  useCaseKey: string;
  argumentKey: string;
}

export const SEGMENTS: Segment[] = [
  { icon: Plane, nameKey: 'seg1.name', normsKey: 'seg1.norms', useCaseKey: 'seg1.useCase', argumentKey: 'seg1.argument' },
  { icon: Shield, nameKey: 'seg2.name', normsKey: 'seg2.norms', useCaseKey: 'seg2.useCase', argumentKey: 'seg2.argument' },
  { icon: Car, nameKey: 'seg3.name', normsKey: 'seg3.norms', useCaseKey: 'seg3.useCase', argumentKey: 'seg3.argument' },
  { icon: HeartPulse, nameKey: 'seg4.name', normsKey: 'seg4.norms', useCaseKey: 'seg4.useCase', argumentKey: 'seg4.argument' },
  { icon: Cpu, nameKey: 'seg5.name', normsKey: 'seg5.norms', useCaseKey: 'seg5.useCase', argumentKey: 'seg5.argument' },
  { icon: Package, nameKey: 'seg6.name', normsKey: 'seg6.norms', useCaseKey: 'seg6.useCase', argumentKey: 'seg6.argument' },
];

// ==========================================
// Cas d'usage phares
// ==========================================

export interface UseCase {
  titleKey: string;
  descKey: string;
  techsKey: string;
  resultKey: string;
}

export const USE_CASES: UseCase[] = [
  { titleKey: 'uc1.title', descKey: 'uc1.desc', techsKey: 'uc1.techs', resultKey: 'uc1.result' },
  { titleKey: 'uc2.title', descKey: 'uc2.desc', techsKey: 'uc2.techs', resultKey: 'uc2.result' },
  { titleKey: 'uc3.title', descKey: 'uc3.desc', techsKey: 'uc3.techs', resultKey: 'uc3.result' },
  { titleKey: 'uc4.title', descKey: 'uc4.desc', techsKey: 'uc4.techs', resultKey: 'uc4.result' },
];

// ==========================================
// Machines recommandées (IDs)
// ==========================================

export const RECOMMENDED_MACHINE_IDS = [
  'alphashot-xl-v2',
  'alphashot-pro-g2',
  'alphastudio-xxl-v2',
];

// ==========================================
// Normes couvertes
// ==========================================

export const NORMS = [
  'AS9100',
  'ISO 13485',
  'IATF 16949',
  'FDA / GMP',
  'MIL-STD',
  'ITAR / CMMC',
  'IPC / RoHS',
];
