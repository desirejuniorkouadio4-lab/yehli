import {
  GraduationCap,
  FlaskConical,
  Brain,
  Leaf,
  Heart,
  Monitor,
  Users,
  Globe,
  BookOpen,
  Calendar,
  School,
  Star,
  Sparkles,
  HandHeart,
  Handshake,
  Lightbulb,
  Target,
  Award,
  Microscope,
  Compass,
  Palette,
  Music,
  Atom,
  TreePine,
  Recycle,
  Cpu,
  Code,
  FileText,
  Image,
  Sun,
  Rocket,
  Telescope,
  type LucideIcon,
} from "lucide-react";

/**
 * Registre d'icônes piloté par les données (champ `icon` en base / seed).
 * Permet de stocker un nom d'icône en base et de le résoudre côté rendu.
 */
export const ICONS = {
  GraduationCap,
  FlaskConical,
  Brain,
  Leaf,
  Heart,
  Monitor,
  Users,
  Globe,
  BookOpen,
  Calendar,
  School,
  Star,
  Sparkles,
  HandHeart,
  Handshake,
  Lightbulb,
  Target,
  Award,
  Microscope,
  Compass,
  Palette,
  Music,
  Atom,
  TreePine,
  Recycle,
  Cpu,
  Code,
  FileText,
  Image,
  Sun,
  Rocket,
  Telescope,
} as const;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

/** Résout un nom d'icône en composant Lucide (avec repli sur Sparkles). */
export function getIcon(name?: string | null): LucideIcon {
  if (name && name in ICONS) return ICONS[name as IconName];
  return Sparkles;
}
