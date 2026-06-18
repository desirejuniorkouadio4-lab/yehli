// YEHLI — Seed Prisma (données réalistes, aucun lorem ipsum).
// Exécuter : npx prisma db seed   (ou)   npm run db:seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  DEMO_ACTIONS,
  DEMO_ARTICLES,
  DEMO_CATEGORIES,
  DEMO_EVENTS,
  DEMO_GALLERY_ALBUMS,
  DEMO_GALLERY_ITEMS,
  DEMO_IMPACT_STATS,
  DEMO_PARTNERS,
  DEMO_SETTINGS,
  DEMO_TAGS,
  DEMO_TEAM,
  DEMO_TESTIMONIALS,
  DEMO_TRAININGS,
} from "../src/lib/content/demo-content";

// Charge .env si lancé directement via tsx (Node ≥ 20.12).
const loadEnv = (process as unknown as { loadEnvFile?: () => void }).loadEnvFile;
if (typeof loadEnv === "function") {
  try {
    loadEnv.call(process);
  } catch {
    // .env absent : on continue (variables déjà fournies par l'environnement)
  }
}

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed YEHLI — démarrage…");

  // 1) Administrateur + auteurs
  const adminEmail = process.env.ADMIN_EMAIL || "admin@yehli.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "YehliAdmin2024!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: "Administrateur YEHLI", role: "SUPER_ADMIN", passwordHash },
    create: { email: adminEmail, name: "Administrateur YEHLI", role: "SUPER_ADMIN", passwordHash },
  });
  console.log(`   ✓ Administrateur : ${adminEmail}`);

  const authorDefs = [
    { email: "mariame.coulibaly@yehli.org", name: "Dr Mariame Coulibaly" },
    { email: "equipe@yehli.org", name: "L'équipe YEHLI" },
  ];
  const authorMap = new Map<string, string>();
  for (const a of authorDefs) {
    const u = await prisma.user.upsert({
      where: { email: a.email },
      update: { name: a.name, role: "EDITOR" },
      create: { email: a.email, name: a.name, role: "EDITOR" },
    });
    authorMap.set(a.name, u.id);
  }

  // 2) Paramètres du site
  for (const [key, value] of Object.entries(DEMO_SETTINGS)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log("   ✓ Paramètres du site");

  // 3) Statistiques d'impact
  for (const s of DEMO_IMPACT_STATS) {
    const id = `impact-${s.order}`;
    await prisma.impactStat.upsert({
      where: { id },
      update: { label: s.label, value: s.value, icon: s.icon, order: s.order, active: true },
      create: { id, label: s.label, value: s.value, icon: s.icon, order: s.order, active: true },
    });
  }

  // 4) Équipe
  for (const m of DEMO_TEAM) {
    await prisma.teamMember.upsert({
      where: { id: m.id },
      update: { name: m.name, role: m.role, bio: m.bio, order: m.order, status: "PUBLISHED" },
      create: { id: m.id, name: m.name, role: m.role, bio: m.bio, order: m.order, status: "PUBLISHED" },
    });
  }
  console.log("   ✓ Équipe");

  // 5) Témoignages
  for (const t of DEMO_TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: { name: t.name, role: t.role, content: t.content, order: t.order, status: "PUBLISHED" },
      create: { id: t.id, name: t.name, role: t.role, content: t.content, order: t.order, status: "PUBLISHED" },
    });
  }

  // 6) Partenaires
  for (const p of DEMO_PARTNERS) {
    await prisma.partner.upsert({
      where: { id: p.id },
      update: { name: p.name, type: p.type, description: p.description, order: p.order, status: "PUBLISHED" },
      create: { id: p.id, name: p.name, type: p.type, description: p.description, order: p.order, status: "PUBLISHED" },
    });
  }
  console.log("   ✓ Partenaires");

  // 7) Catégories
  const categoryIdBySlug = new Map<string, string>();
  for (const c of DEMO_CATEGORIES) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: { id: c.id, name: c.name, slug: c.slug, description: c.description },
    });
    categoryIdBySlug.set(c.slug, cat.id);
  }

  // 8) Tags
  const tagIdBySlug = new Map<string, string>();
  for (const t of DEMO_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { slug: t.slug },
      update: { name: t.name },
      create: { id: t.id, name: t.name, slug: t.slug },
    });
    tagIdBySlug.set(t.slug, tag.id);
  }
  console.log("   ✓ Catégories & tags");

  // 9) Axes d'intervention
  for (const a of DEMO_ACTIONS) {
    await prisma.actionProgram.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        shortDesc: a.shortDesc,
        description: a.description,
        targetAudience: a.targetAudience,
        objectives: a.objectives,
        image: a.image,
        icon: a.icon,
        order: a.order,
        status: "PUBLISHED",
      },
      create: {
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
        status: "PUBLISHED",
      },
    });
  }
  console.log(`   ✓ ${DEMO_ACTIONS.length} axes d'intervention`);

  // 10) Formations
  for (const t of DEMO_TRAININGS) {
    await prisma.training.upsert({
      where: { slug: t.slug },
      update: {
        title: t.title,
        summary: t.summary,
        description: t.description,
        objectives: t.objectives,
        targetAudience: t.targetAudience,
        duration: t.duration,
        format: t.format,
        theme: t.theme,
        prerequisites: t.prerequisites,
        image: t.image,
        status: "PUBLISHED",
      },
      create: {
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
        status: "PUBLISHED",
      },
    });
  }
  console.log(`   ✓ ${DEMO_TRAININGS.length} formations`);

  // 11) Articles (+ relations catégorie / auteur / tags)
  for (const a of DEMO_ARTICLES) {
    const article = await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        coverImage: a.coverImage,
        status: "PUBLISHED",
        publishedAt: a.publishedAt,
        authorId: a.author ? authorMap.get(a.author) ?? null : null,
        categoryId: a.category ? categoryIdBySlug.get(a.category.slug) ?? null : null,
      },
      create: {
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        coverImage: a.coverImage,
        status: "PUBLISHED",
        publishedAt: a.publishedAt,
        authorId: a.author ? authorMap.get(a.author) ?? null : null,
        categoryId: a.category ? categoryIdBySlug.get(a.category.slug) ?? null : null,
      },
    });

    await prisma.articleTag.deleteMany({ where: { articleId: article.id } });
    const tagLinks = a.tags
      .map((t) => tagIdBySlug.get(t.slug))
      .filter((id): id is string => Boolean(id))
      .map((tagId) => ({ articleId: article.id, tagId }));
    if (tagLinks.length) {
      await prisma.articleTag.createMany({ data: tagLinks, skipDuplicates: true });
    }
  }
  console.log(`   ✓ ${DEMO_ARTICLES.length} articles`);

  // 12) Événements
  for (const e of DEMO_EVENTS) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {
        title: e.title,
        description: e.description,
        startDate: e.startDate,
        endDate: e.endDate,
        location: e.location,
        city: e.city,
        country: e.country,
        coverImage: e.coverImage,
        capacity: e.capacity,
        registrationOpen: e.registrationOpen,
        status: "PUBLISHED",
      },
      create: {
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        startDate: e.startDate,
        endDate: e.endDate,
        location: e.location,
        city: e.city,
        country: e.country,
        coverImage: e.coverImage,
        capacity: e.capacity,
        registrationOpen: e.registrationOpen,
        status: "PUBLISHED",
      },
    });
  }
  console.log(`   ✓ ${DEMO_EVENTS.length} événements`);

  // 13) Galerie (albums + médias)
  for (const al of DEMO_GALLERY_ALBUMS) {
    await prisma.galleryAlbum.upsert({
      where: { slug: al.slug },
      update: { title: al.title, description: al.description, coverImage: al.coverImage, status: "PUBLISHED" },
      create: { id: al.id, title: al.title, slug: al.slug, description: al.description, coverImage: al.coverImage, status: "PUBLISHED" },
    });
  }
  const albumIdBySlug = new Map(
    (await prisma.galleryAlbum.findMany({ select: { id: true, slug: true } })).map((a) => [a.slug, a.id]),
  );
  for (const it of DEMO_GALLERY_ITEMS) {
    const albumId = it.albumSlug ? albumIdBySlug.get(it.albumSlug) ?? null : null;
    await prisma.galleryItem.upsert({
      where: { id: it.id },
      update: {
        title: it.title,
        description: it.description,
        type: it.type,
        url: it.url,
        thumbnail: it.thumbnail,
        date: it.date,
        location: it.location,
        albumId,
        status: "PUBLISHED",
      },
      create: {
        id: it.id,
        title: it.title,
        description: it.description,
        type: it.type,
        url: it.url,
        thumbnail: it.thumbnail,
        date: it.date,
        location: it.location,
        albumId,
        status: "PUBLISHED",
      },
    });
  }
  console.log("   ✓ Galerie");

  console.log("✅ Seed terminé avec succès.");
}

main()
  .catch((e) => {
    console.error("❌ Échec du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
