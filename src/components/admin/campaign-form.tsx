"use client";

import { useState, useTransition } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { sendCampaign } from "@/app/actions/admin-newsletter";
import { AdminField, AdminFormCard, Input, Textarea } from "@/components/admin/form-controls";
import { Button } from "@/components/ui/button";

export function CampaignForm({ subscriberCount }: { subscriberCount: number }) {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!window.confirm(`Envoyer cette campagne à ${subscriberCount} abonné(s) ?`)) return;
    start(async () => {
      const res = await sendCampaign(fd);
      setResult(res);
      if (res.ok) form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminFormCard>
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary-pale px-4 py-2.5 text-sm font-medium text-primary">
          <Users className="h-4 w-4" />
          {subscriberCount} abonné{subscriberCount > 1 ? "s" : ""} actif{subscriberCount > 1 ? "s" : ""} recevront cette campagne
        </div>

        {result && (
          <p
            className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
              result.ok
                ? "border-success/30 bg-success/5 text-success"
                : "border-error/30 bg-error/5 text-error"
            }`}
          >
            {result.ok ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            {result.message}
          </p>
        )}

        <div className="space-y-5">
          <AdminField label="Sujet de l'email" htmlFor="subject" required>
            <Input id="subject" name="subject" required placeholder="Ex. Les nouveautés de YEHLI ce mois-ci" />
          </AdminField>
          <AdminField
            label="Contenu du message"
            htmlFor="body"
            required
            hint="Texte simple. Séparez les paragraphes par une ligne vide. Le gabarit YEHLI (logo, pied de page) est ajouté automatiquement."
          >
            <Textarea id="body" name="body" rows={12} required placeholder={"Bonjour,\n\nNous avons le plaisir de vous partager…\n\nÀ très bientôt,\nL'équipe YEHLI"} />
          </AdminField>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <Button type="submit" disabled={pending || subscriberCount === 0}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Envoi en cours…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Envoyer la campagne
              </>
            )}
          </Button>
        </div>
      </AdminFormCard>
    </form>
  );
}
