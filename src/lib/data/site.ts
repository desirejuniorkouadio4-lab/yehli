import { prisma } from "@/lib/prisma";
import {
  DEMO_IMPACT_STATS,
  DEMO_PARTNERS,
  DEMO_SETTINGS,
  DEMO_TEAM,
  DEMO_TESTIMONIALS,
} from "@/lib/content/demo-content";
import type {
  ImpactStatVM,
  PartnerVM,
  SiteSettings,
  TeamMemberVM,
  TestimonialVM,
} from "./types";

/** Paramètres du site (clé/valeur), avec valeurs par défaut garanties. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany({ select: { key: true, value: true } });
    if (!rows.length) return DEMO_SETTINGS;
    const map: SiteSettings = { ...DEMO_SETTINGS };
    for (const r of rows) if (r.value) map[r.key] = r.value;
    return map;
  } catch {
    return DEMO_SETTINGS;
  }
}

export async function getImpactStats(): Promise<ImpactStatVM[]> {
  try {
    const rows = await prisma.impactStat.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      select: { label: true, value: true, icon: true, order: true },
    });
    return rows.length ? rows : DEMO_IMPACT_STATS;
  } catch {
    return DEMO_IMPACT_STATS;
  }
}

export async function getTeamMembers(): Promise<TeamMemberVM[]> {
  try {
    const rows = await prisma.teamMember.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (!rows.length) return DEMO_TEAM;
    return rows.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      photo: m.photo,
      email: m.email,
      linkedin: m.linkedin,
      order: m.order,
    }));
  } catch {
    return DEMO_TEAM;
  }
}

export async function getTestimonials(): Promise<TestimonialVM[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (!rows.length) return DEMO_TESTIMONIALS;
    return rows.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      content: t.content,
      photo: t.photo,
      order: t.order,
    }));
  } catch {
    return DEMO_TESTIMONIALS;
  }
}

export async function getPartners(): Promise<PartnerVM[]> {
  try {
    const rows = await prisma.partner.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (!rows.length) return DEMO_PARTNERS;
    return rows.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      description: p.description,
      logo: p.logo,
      website: p.website,
      order: p.order,
    }));
  } catch {
    return DEMO_PARTNERS;
  }
}
