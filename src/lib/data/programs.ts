import { prisma } from "@/lib/prisma";
import { DEMO_ACTIONS, DEMO_TRAININGS } from "@/lib/content/demo-content";
import type { ActionVM, TrainingVM } from "./types";

// ── Axes d'intervention ─────────────────────────────────────
export async function getActions(): Promise<ActionVM[]> {
  try {
    const rows = await prisma.actionProgram.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (!rows.length) return DEMO_ACTIONS;
    return rows.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      shortDesc: a.shortDesc,
      description: a.description,
      targetAudience: a.targetAudience,
      objectives: a.objectives,
      image: a.image,
      icon: a.icon,
      order: a.order,
    }));
  } catch {
    return DEMO_ACTIONS;
  }
}

export async function getActionBySlug(slug: string): Promise<ActionVM | null> {
  try {
    const a = await prisma.actionProgram.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
    if (a) {
      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        shortDesc: a.shortDesc,
        description: a.description,
        targetAudience: a.targetAudience,
        objectives: a.objectives,
        image: a.image,
        icon: a.icon,
        order: a.order,
      };
    }
    return DEMO_ACTIONS.find((x) => x.slug === slug) ?? null;
  } catch {
    return DEMO_ACTIONS.find((x) => x.slug === slug) ?? null;
  }
}

// ── Formations ──────────────────────────────────────────────
type TrainingFilters = { theme?: string; audience?: string; format?: string; search?: string };

function matchTraining(t: TrainingVM, f: TrainingFilters): boolean {
  if (f.theme && t.theme !== f.theme) return false;
  if (f.format && t.format !== f.format) return false;
  if (f.audience && !(t.targetAudience ?? "").toLowerCase().includes(f.audience.toLowerCase()))
    return false;
  if (f.search) {
    const q = f.search.toLowerCase();
    const hay = `${t.title} ${t.summary ?? ""} ${t.theme ?? ""} ${t.targetAudience ?? ""}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export async function getTrainings(filters: TrainingFilters = {}): Promise<TrainingVM[]> {
  try {
    const rows = await prisma.training.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    });
    const source: TrainingVM[] = rows.length
      ? rows.map((t) => ({
          id: t.id,
          title: t.title,
          slug: t.slug,
          summary: t.summary,
          description: t.description,
          objectives: t.objectives,
          targetAudience: t.targetAudience,
          duration: t.duration,
          format: t.format,
          theme: t.theme,
          prerequisites: t.prerequisites,
          image: t.image,
        }))
      : DEMO_TRAININGS;
    return source.filter((t) => matchTraining(t, filters));
  } catch {
    return DEMO_TRAININGS.filter((t) => matchTraining(t, filters));
  }
}

export async function getTrainingBySlug(slug: string): Promise<TrainingVM | null> {
  try {
    const t = await prisma.training.findFirst({ where: { slug, status: "PUBLISHED" } });
    if (t) {
      return {
        id: t.id,
        title: t.title,
        slug: t.slug,
        summary: t.summary,
        description: t.description,
        objectives: t.objectives,
        targetAudience: t.targetAudience,
        duration: t.duration,
        format: t.format,
        theme: t.theme,
        prerequisites: t.prerequisites,
        image: t.image,
      };
    }
    return DEMO_TRAININGS.find((x) => x.slug === slug) ?? null;
  } catch {
    return DEMO_TRAININGS.find((x) => x.slug === slug) ?? null;
  }
}

/** Valeurs distinctes pour alimenter les filtres de la page Formations. */
export async function getTrainingFacets(): Promise<{ themes: string[]; audiences: string[]; formats: string[] }> {
  const all = await getTrainings();
  const uniq = (arr: (string | null)[]) =>
    Array.from(new Set(arr.filter((x): x is string => Boolean(x)))).sort((a, b) =>
      a.localeCompare(b, "fr"),
    );
  return {
    themes: uniq(all.map((t) => t.theme)),
    audiences: uniq(all.map((t) => t.targetAudience)),
    formats: uniq(all.map((t) => t.format)),
  };
}
