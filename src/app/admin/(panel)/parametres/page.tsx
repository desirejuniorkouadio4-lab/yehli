import { CheckCircle2 } from "lucide-react";
import { requireRole } from "@/lib/rbac";
import { getSiteSettings } from "@/lib/data/site";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea } from "@/components/admin/form-controls";
import { Button } from "@/components/ui/button";
import { saveSettings } from "@/app/actions/admin-site";

export const metadata = { title: "Paramètres" };

export default async function Page({ searchParams }: { searchParams: { saved?: string } }) {
  await requireRole("ADMIN");
  const s = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Paramètres du site"
        description="Informations générales, contact et réseaux sociaux."
      />

      {searchParams.saved && (
        <p className="mb-5 flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm font-medium text-success">
          <CheckCircle2 className="h-4 w-4" />
          Paramètres enregistrés avec succès.
        </p>
      )}

      <form action={saveSettings} className="space-y-5">
        <AdminFormCard>
          <h2 className="mb-4 font-bold text-dark">Identité</h2>
          <div className="space-y-5">
            <AdminField label="Nom du site" htmlFor="site_name">
              <Input id="site_name" name="site_name" defaultValue={s.site_name ?? ""} />
            </AdminField>
            <AdminField label="Slogan" htmlFor="site_tagline">
              <Input id="site_tagline" name="site_tagline" defaultValue={s.site_tagline ?? ""} />
            </AdminField>
            <AdminField label="Description (SEO globale)" htmlFor="site_description">
              <Textarea id="site_description" name="site_description" rows={2} defaultValue={s.site_description ?? ""} />
            </AdminField>
            <AdminField label="Créateur du site (footer)" htmlFor="site_creator">
              <Input id="site_creator" name="site_creator" defaultValue={s.site_creator ?? ""} />
            </AdminField>
          </div>
        </AdminFormCard>

        <AdminFormCard>
          <h2 className="mb-4 font-bold text-dark">Contact</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Email" htmlFor="contact_email">
              <Input id="contact_email" name="contact_email" type="email" defaultValue={s.contact_email ?? ""} />
            </AdminField>
            <AdminField label="Téléphone" htmlFor="contact_phone">
              <Input id="contact_phone" name="contact_phone" defaultValue={s.contact_phone ?? ""} />
            </AdminField>
            <AdminField label="WhatsApp" htmlFor="contact_whatsapp">
              <Input id="contact_whatsapp" name="contact_whatsapp" defaultValue={s.contact_whatsapp ?? ""} />
            </AdminField>
            <AdminField label="Adresse" htmlFor="contact_address">
              <Input id="contact_address" name="contact_address" defaultValue={s.contact_address ?? ""} />
            </AdminField>
          </div>
        </AdminFormCard>

        <AdminFormCard>
          <h2 className="mb-4 font-bold text-dark">Réseaux sociaux</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Facebook" htmlFor="social_facebook">
              <Input id="social_facebook" name="social_facebook" defaultValue={s.social_facebook ?? ""} placeholder="https://" />
            </AdminField>
            <AdminField label="Instagram" htmlFor="social_instagram">
              <Input id="social_instagram" name="social_instagram" defaultValue={s.social_instagram ?? ""} placeholder="https://" />
            </AdminField>
            <AdminField label="LinkedIn" htmlFor="social_linkedin">
              <Input id="social_linkedin" name="social_linkedin" defaultValue={s.social_linkedin ?? ""} placeholder="https://" />
            </AdminField>
            <AdminField label="YouTube" htmlFor="social_youtube">
              <Input id="social_youtube" name="social_youtube" defaultValue={s.social_youtube ?? ""} placeholder="https://" />
            </AdminField>
          </div>
        </AdminFormCard>

        <AdminFormCard>
          <h2 className="mb-1 font-bold text-dark">Objectif (barre de progression)</h2>
          <p className="mb-4 text-sm text-muted">Affiché sur la page d&apos;accueil pour motiver dons et interventions.</p>
          <div className="space-y-5">
            <AdminField label="Afficher l'objectif" htmlFor="goal_enabled" hint="« true » pour afficher, « false » pour masquer">
              <Input id="goal_enabled" name="goal_enabled" defaultValue={s.goal_enabled ?? "true"} placeholder="true" />
            </AdminField>
            <AdminField label="Titre de l'objectif" htmlFor="goal_label">
              <Input id="goal_label" name="goal_label" defaultValue={s.goal_label ?? ""} placeholder="Objectif 2025 : toucher 500 élèves" />
            </AdminField>
            <AdminField label="Description" htmlFor="goal_description">
              <Textarea id="goal_description" name="goal_description" rows={2} defaultValue={s.goal_description ?? ""} />
            </AdminField>
            <div className="grid gap-5 sm:grid-cols-3">
              <AdminField label="Valeur actuelle" htmlFor="goal_current">
                <Input id="goal_current" name="goal_current" type="number" defaultValue={s.goal_current ?? "0"} />
              </AdminField>
              <AdminField label="Objectif cible" htmlFor="goal_target">
                <Input id="goal_target" name="goal_target" type="number" defaultValue={s.goal_target ?? "0"} />
              </AdminField>
              <AdminField label="Unité" htmlFor="goal_unit">
                <Input id="goal_unit" name="goal_unit" defaultValue={s.goal_unit ?? ""} placeholder="élèves" />
              </AdminField>
            </div>
          </div>
        </AdminFormCard>

        <div className="flex border-t border-border pt-5">
          <Button type="submit">Enregistrer les paramètres</Button>
        </div>
      </form>
    </div>
  );
}
