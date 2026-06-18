import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getArticles } from "@/lib/data/blog";
import { getTrainings, getActions } from "@/lib/data/programs";
import { getEvents } from "@/lib/data/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  const staticPaths = [
    "",
    "/qui-sommes-nous",
    "/nos-actions",
    "/formations",
    "/blog",
    "/evenements",
    "/galerie",
    "/partenaires",
    "/nous-soutenir",
    "/faire-un-don",
    "/adherer",
    "/devenir-benevole",
    "/demander-une-intervention",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/conditions-utilisation",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const [articlesResult, trainings, actions, events] = await Promise.all([
    getArticles({ pageSize: 1000 }),
    getTrainings(),
    getActions(),
    getEvents(),
  ]);

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...articlesResult.items.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.publishedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...trainings.map((t) => ({
      url: `${base}/formations/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...actions.map((a) => ({
      url: `${base}/nos-actions/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...events.map((e) => ({
      url: `${base}/evenements/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
