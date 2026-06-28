import Link from "next/link";
import { MessageSquare, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CommentActions } from "@/components/admin/comment-actions";
import { approveComment, rejectComment, deleteComment } from "@/app/actions/admin-comments";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Commentaires" };

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning",
  APPROVED: "bg-success/10 text-success",
  REJECTED: "bg-muted/10 text-muted",
};
const STATUS_LABEL: Record<string, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
};

export default async function Page({ searchParams }: { searchParams: { filter?: string } }) {
  const filter = searchParams.filter === "approved" || searchParams.filter === "rejected"
    ? searchParams.filter.toUpperCase()
    : searchParams.filter === "all"
      ? null
      : "PENDING";

  const items = await safe(
    () =>
      prisma.articleComment.findMany({
        where: filter ? { status: filter as "PENDING" | "APPROVED" | "REJECTED" } : {},
        orderBy: { createdAt: "desc" },
        take: 200,
        include: { article: { select: { title: true, slug: true } } },
      }),
    [],
  );

  const pendingCount = await safe(
    () => prisma.articleComment.count({ where: { status: "PENDING" } }),
    0,
  );

  const tabs = [
    { key: "pending", label: `En attente${pendingCount ? ` (${pendingCount})` : ""}`, active: filter === "PENDING" },
    { key: "approved", label: "Approuvés", active: filter === "APPROVED" },
    { key: "rejected", label: "Rejetés", active: filter === "REJECTED" },
    { key: "all", label: "Tous", active: filter === null },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Commentaires"
        description="Modérez les commentaires des articles avant publication."
      />

      {/* Filtres */}
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/admin/commentaires?filter=${t.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              t.active ? "bg-primary text-white" : "bg-surface text-body hover:bg-primary-pale hover:text-primary"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <MessageSquare className="h-10 w-10 text-muted" />
          <p className="font-semibold text-dark">Aucun commentaire</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <li key={c.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-dark">{c.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                    <span className="text-xs text-muted">{formatDate(c.createdAt)}</span>
                  </div>
                  {c.email && <p className="mt-0.5 text-xs text-muted">{c.email}</p>}
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-body">{c.content}</p>
                  <Link
                    href={`/blog/${c.article.slug}`}
                    target="_blank"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {c.article.title}
                  </Link>
                </div>
                <CommentActions
                  status={c.status}
                  approve={approveComment.bind(null, c.id)}
                  reject={rejectComment.bind(null, c.id)}
                  remove={deleteComment.bind(null, c.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
