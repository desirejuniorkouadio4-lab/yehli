"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2, MessageCircle, Send, CheckCircle2, UserCircle2 } from "lucide-react";
import { submitComment } from "@/app/actions/comments";
import { HONEYPOT_FIELD, type ActionResult } from "@/lib/forms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { CommentVM } from "@/lib/data/comments";

function timeAgo(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date),
  );
}

export function ArticleComments({
  articleId,
  articleSlug,
  comments,
}: {
  articleId: string;
  articleSlug: string;
  comments: CommentVM[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await submitComment(articleId, articleSlug, fd);
      setResult(res);
      if (res.ok) formRef.current?.reset();
    });
  }

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-dark">
        <MessageCircle className="h-6 w-6 text-primary" />
        Commentaires
        {comments.length > 0 && (
          <span className="rounded-full bg-primary-pale px-2.5 py-0.5 text-sm font-semibold text-primary">
            {comments.length}
          </span>
        )}
      </h2>

      {/* Liste des commentaires approuvés */}
      {comments.length > 0 ? (
        <ul className="mt-6 space-y-5">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserCircle2 className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface p-4">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="font-semibold text-dark">{c.name}</p>
                  <p className="text-xs text-muted">{timeAgo(c.createdAt)}</p>
                </div>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-body">{c.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">
          Soyez le premier à réagir à cet article.
        </p>
      )}

      {/* Formulaire */}
      <div className="mt-8 rounded-2xl border border-border bg-white p-6">
        <h3 className="font-heading text-lg font-bold text-dark">Laisser un commentaire</h3>
        <p className="mt-1 text-sm text-muted">
          Votre commentaire sera publié après validation par notre équipe.
        </p>

        {result?.ok ? (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p className="text-sm font-medium text-success">{result.message}</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name={HONEYPOT_FIELD}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-dark">
                  Nom <span className="text-error">*</span>
                </label>
                <Input id="c-name" name="name" required aria-invalid={!!result?.fieldErrors?.name} />
                {result?.fieldErrors?.name && (
                  <p className="mt-1 text-xs text-error">{result.fieldErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-dark">
                  Email <span className="text-muted">(facultatif, non publié)</span>
                </label>
                <Input id="c-email" name="email" type="email" aria-invalid={!!result?.fieldErrors?.email} />
                {result?.fieldErrors?.email && (
                  <p className="mt-1 text-xs text-error">{result.fieldErrors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="c-content" className="mb-1.5 block text-sm font-medium text-dark">
                Commentaire <span className="text-error">*</span>
              </label>
              <Textarea id="c-content" name="content" rows={4} required aria-invalid={!!result?.fieldErrors?.content} />
              {result?.fieldErrors?.content && (
                <p className="mt-1 text-xs text-error">{result.fieldErrors.content}</p>
              )}
            </div>

            {result && !result.ok && !result.fieldErrors && (
              <p className="text-sm font-medium text-error">{result.message}</p>
            )}

            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  Publier le commentaire
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
