import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, Layers, Users, Tag, GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/shared/social-share";
import { SITE } from "@/config/site";
import { getTrainings, getTrainingBySlug } from "@/lib/data/programs";

type Props = { params: { slug: string } };

export const revalidate = 3600;

export async function generateStaticParams() {
  const trainings = await getTrainings();
  return trainings.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const training = await getTrainingBySlug(params.slug);
  if (!training) return { title: "Formation introuvable" };
  return {
    title: training.title,
    description: training.summary ?? undefined,
    alternates: { canonical: `/formations/${training.slug}` },
  };
}

export default async function TrainingDetailPage({ params }: Props) {
  const training = await getTrainingBySlug(params.slug);
  if (!training) notFound();

  const paragraphs = training.description.split("\n\n").filter(Boolean);
  const objectives = (training.objectives ?? "").split("\n").map((o) => o.trim()).filter(Boolean);

  const meta = [
    { icon: Clock, label: "Durée", value: training.duration },
    { icon: Layers, label: "Format", value: training.format },
    { icon: Users, label: "Public", value: training.targetAudience },
    { icon: Tag, label: "Thématique", value: training.theme },
    { icon: GraduationCap, label: "Prérequis", value: training.prerequisites },
  ].filter((m) => Boolean(m.value));

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Formations", href: "/formations" },
          { label: training.title, href: `/formations/${training.slug}` },
        ]}
        badge={training.theme ?? "Formation"}
        title={training.title}
        subtitle={training.summary ?? undefined}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr,340px]">
          <div>
            {training.image && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-pale">
                <Image
                  src={training.image}
                  alt={training.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="prose-yehli">
              <h2>Présentation</h2>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {objectives.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold text-dark">Objectifs pédagogiques</h2>
                <ul className="mt-5 space-y-3">
                  {objectives.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                      <span className="text-pretty text-body">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-10 border-t border-border pt-6">
              <SocialShare url={`${SITE.url}/formations/${training.slug}`} title={training.title} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-base font-bold text-dark">En bref</h2>
              <dl className="mt-4 space-y-4">
                {meta.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                        {label}
                      </dt>
                      <dd className="font-medium text-dark">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-border pt-5">
                <Badge variant="green" className="mb-3">
                  Intervention gratuite
                </Badge>
                <Button asChild className="w-full">
                  <Link
                    href={`/demander-une-intervention?theme=${encodeURIComponent(training.title)}`}
                  >
                    Demander cette formation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
