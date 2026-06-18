import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Target, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import { getActions, getActionBySlug } from "@/lib/data/programs";

type Props = { params: { slug: string } };

export const revalidate = 3600;

export async function generateStaticParams() {
  const actions = await getActions();
  return actions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const action = await getActionBySlug(params.slug);
  if (!action) return { title: "Action introuvable" };
  return {
    title: action.title,
    description: action.shortDesc ?? undefined,
    alternates: { canonical: `/nos-actions/${action.slug}` },
  };
}

export default async function ActionDetailPage({ params }: Props) {
  const action = await getActionBySlug(params.slug);
  if (!action) notFound();

  const Icon = getIcon(action.icon);
  const paragraphs = action.description.split("\n\n").filter(Boolean);
  const objectives = (action.objectives ?? "").split("\n").map((o) => o.trim()).filter(Boolean);

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Nos actions", href: "/nos-actions" },
          { label: action.title, href: `/nos-actions/${action.slug}` },
        ]}
        badge="Domaine d'action"
        title={action.title}
        subtitle={action.shortDesc ?? undefined}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr,340px]">
          {/* Contenu principal */}
          <div>
            {action.image && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-pale">
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="prose-yehli">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {objectives.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold text-dark">Nos objectifs</h2>
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
          </div>

          {/* Encart latéral */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Icon className="h-6 w-6" />
              </span>
              {action.targetAudience && (
                <div className="mt-5">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                    <Users className="h-4 w-4 text-primary" /> Public concerné
                  </p>
                  <p className="mt-1.5 font-medium text-dark">{action.targetAudience}</p>
                </div>
              )}
              <div className="mt-5 border-t border-border pt-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                  <Target className="h-4 w-4 text-primary" /> Passer à l&apos;action
                </p>
                <p className="mt-2 text-sm text-muted">
                  Sollicitez une intervention de YEHLI sur ce thème pour votre structure.
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link
                    href={`/demander-une-intervention?theme=${encodeURIComponent(action.title)}`}
                  >
                    Demander une intervention
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
