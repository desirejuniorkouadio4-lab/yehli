import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tag,
  GraduationCap,
  Sparkles,
  CalendarDays,
  Image,
  Send,
  HeartHandshake,
  UserPlus,
  Coins,
  MessageSquare,
  Mail,
  Handshake,
  Quote,
  Users,
  BarChart3,
  Settings,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@prisma/client";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  minRole?: UserRole;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    title: "Pilotage",
    items: [{ label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Contenu",
    items: [
      { label: "Articles", href: "/admin/articles", icon: FileText },
      { label: "Catégories", href: "/admin/categories", icon: FolderTree },
      { label: "Tags", href: "/admin/tags", icon: Tag },
      { label: "Formations", href: "/admin/formations", icon: GraduationCap },
      { label: "Actions", href: "/admin/actions", icon: Sparkles },
      { label: "Événements", href: "/admin/evenements", icon: CalendarDays },
      { label: "Galerie", href: "/admin/galerie", icon: Image },
    ],
  },
  {
    title: "Demandes & contacts",
    items: [
      { label: "Demandes d'intervention", href: "/admin/demandes-intervention", icon: Send },
      { label: "Bénévoles", href: "/admin/benevoles", icon: HeartHandshake },
      { label: "Adhésions", href: "/admin/adhesions", icon: UserPlus },
      { label: "Dons", href: "/admin/dons", icon: Coins },
      { label: "Messages", href: "/admin/messages", icon: MessageSquare },
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    ],
  },
  {
    title: "Site & association",
    items: [
      { label: "Partenaires", href: "/admin/partenaires", icon: Handshake },
      { label: "Témoignages", href: "/admin/temoignages", icon: Quote },
      { label: "Équipe", href: "/admin/equipe", icon: Users },
      { label: "Statistiques d'impact", href: "/admin/stats-impact", icon: BarChart3 },
      { label: "Paramètres", href: "/admin/parametres", icon: Settings, minRole: "ADMIN" },
    ],
  },
  {
    title: "Système",
    items: [{ label: "Utilisateurs", href: "/admin/utilisateurs", icon: Shield, minRole: "SUPER_ADMIN" }],
  },
];
