// Modèles de vue (view models) consommés par l'interface publique.
// Découplent les pages de Prisma et permettent un repli de contenu sans base.

export type SiteSettings = Record<string, string>;

export type ImpactStatVM = {
  label: string;
  value: string;
  icon: string | null;
  order: number;
};

export type TeamMemberVM = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo: string | null;
  email: string | null;
  linkedin: string | null;
  order: number;
};

export type CategoryVM = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count: number;
};

export type TagVM = {
  id: string;
  name: string;
  slug: string;
};

export type ActionVM = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string | null;
  description: string;
  targetAudience: string | null;
  objectives: string | null;
  image: string | null;
  icon: string | null;
  order: number;
};

export type TrainingVM = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string;
  objectives: string | null;
  targetAudience: string | null;
  duration: string | null;
  format: string | null;
  theme: string | null;
  prerequisites: string | null;
  image: string | null;
};

export type ArticleVM = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  publishedAt: Date | null;
  author: string | null;
  category: { name: string; slug: string } | null;
  tags: { name: string; slug: string }[];
};

export type EventVM = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  location: string | null;
  city: string | null;
  country: string | null;
  coverImage: string | null;
  capacity: number | null;
  registrationOpen: boolean;
};

export type GalleryItemVM = {
  id: string;
  title: string;
  description: string | null;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnail: string | null;
  date: Date | null;
  location: string | null;
  albumSlug: string | null;
  albumTitle: string | null;
};

export type GalleryAlbumVM = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  itemCount: number;
};

export type PartnerVM = {
  id: string;
  name: string;
  type: string | null;
  description: string | null;
  logo: string | null;
  website: string | null;
  order: number;
};

export type TestimonialVM = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  photo: string | null;
  order: number;
};
