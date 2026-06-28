import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CampaignForm } from "@/components/admin/campaign-form";

export const metadata = { title: "Nouvelle campagne" };

export default async function Page() {
  const count = await safe(
    () => prisma.newsletterSubscriber.count({ where: { active: true } }),
    0,
  );

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Nouvelle campagne newsletter"
        description="Rédigez et envoyez un email à tous vos abonnés actifs."
      />
      <CampaignForm subscriberCount={count} />
    </div>
  );
}
