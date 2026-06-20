"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2, Lock } from "lucide-react";
import { changePassword } from "@/app/actions/admin-password";
import { AdminField, AdminFormCard, Input } from "@/components/admin/form-controls";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message?: string; error?: string } | null>(null);
  const [show, setShow] = useState({ current: false, next: false, confirm: false });

  function toggle(field: "current" | "next" | "confirm") {
    setShow((s) => ({ ...s, [field]: !s[field] }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await changePassword(fd);
      setResult(res);
      if (res.ok) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminFormCard>
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted" />
          <h2 className="font-bold text-dark">Changer le mot de passe</h2>
        </div>

        {result && (
          <p className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
            result.ok
              ? "border-success/30 bg-success/5 text-success"
              : "border-error/30 bg-error/5 text-error"
          }`}>
            {result.ok ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Lock className="h-4 w-4 shrink-0" />}
            {result.ok ? result.message : result.error}
          </p>
        )}

        <div className="space-y-5">
          <AdminField label="Mot de passe actuel" htmlFor="currentPassword" required>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={show.current ? "text" : "password"}
                autoComplete="current-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => toggle("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                aria-label={show.current ? "Masquer" : "Afficher"}
              >
                {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </AdminField>

          <AdminField label="Nouveau mot de passe" htmlFor="newPassword" required hint="8 caractères minimum">
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={show.next ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => toggle("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                aria-label={show.next ? "Masquer" : "Afficher"}
              >
                {show.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </AdminField>

          <AdminField label="Confirmer le nouveau mot de passe" htmlFor="confirmPassword" required>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={show.confirm ? "text" : "password"}
                autoComplete="new-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => toggle("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                aria-label={show.confirm ? "Masquer" : "Afficher"}
              >
                {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </AdminField>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <Button type="submit" disabled={pending}>
            {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Mise à jour…</> : "Mettre à jour le mot de passe"}
          </Button>
        </div>
      </AdminFormCard>
    </form>
  );
}
