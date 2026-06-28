import Link from "next/link";
import {
  FileText,
  GraduationCap,
  Send,
  HeartHandshake,
  UserPlus,
  Coins,
  CalendarDays,
  Mail,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe, monthlyCounts } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { InterventionsChart } from "@/components/admin/interventions-chart";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Tableau de bord" };

const EMPTY = {
  articles: 0,
  formations: 0,
  newInterventions: 0,
  volunteers: 0,
  memberships: 0,
  donations: 0,
  events: 0,
  subscribers: 0,
  donationTotal: 0,
  newMessages: 0,
  pendingComments: 0,
  monthly: monthlyCounts([]),
  recentMessages: [] as { id: string; name: string; subject: string | null; status: string; createdAt: Date }[],
  recentInterventions: [] as {
    id: string;
    structureName: string;
    city: string | null;
    status: string;
    createdAt: Date;
  }[],
};

async function getData() {
  return safe(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 5);
    since.setDate(1);

    const [
      articles,
      formations,
      newInterventions,
      volunteers,
      memberships,
      donations,
      events,
      subscribers,
      recentMessages,
      recentInterventions,
      interventionDates,
      donationAgg,
      newMessages,
      pendingComments,
    ] = await Promise.all([
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.training.count(),
      prisma.interventionRequest.count({ where: { status: "NEW" } }),
      prisma.volunteerApplication.count(),
      prisma.membershipApplication.count(),
      prisma.donation.count(),
      prisma.event.count(),
      prisma.newsletterSubscriber.count({ where: { active: true } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, subject: true, status: true, createdAt: true },
      }),
      prisma.interventionRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, structureName: true, city: true, status: true, createdAt: true },
      }),
      prisma.interventionRequest.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true },
      }),
      prisma.donation.aggregate({ where: { status: "CONFIRMED" }, _sum: { amount: true } }),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.articleComment.count({ where: { status: "PENDING" } }).catch(() => 0),
    ]);

    return {
      articles,
      formations,
      newInterventions,
      volunteers,
      memberships,
      donations,
      events,
      subscribers,
      donationTotal: Number(donationAgg._sum.amount ?? 0),
      newMessages,
      pendingComments,
      monthly: monthlyCounts(interventionDates.map((i) => i.createdAt)),
      recentMessages,
      recentInterventions,
    };
  }, EMPTY);
}

export default async function DashboardPage() {
  const data = await getData();

  const cards = [
    { icon: FileText, label: "Articles publiés", value: data.articles, href: "/admin/articles" },
    { icon: GraduationCap, label: "Formations", value: data.formations, href: "/admin/formations" },
    { icon: Send, label: "Demandes nouvelles", value: data.newInterventions, href: "/admin/demandes-intervention" },
    { icon: HeartHandshake, label: "Bénévoles", value: data.volunteers, href: "/admin/benevoles" },
    { icon: UserPlus, label: "Adhésions", value: data.memberships, href: "/admin/adhesions" },
    { icon: Coins, label: "Dons", value: data.donations, href: "/admin/dons" },
    { icon: CalendarDays, label: "Événements", value: data.events, href: "/admin/evenements" },
    { icon: Mail, label: "Abonnés newsletter", value: data.subscribers, href: "/admin/newsletter" },
  ];

  const highlights = [
    {
      label: "Total des dons confirmés",
      value: formatCurrency(data.donationTotal, "XOF"),
      href: "/admin/dons",
      tint: "from-primary to-primary-light",
    },
    {
      label: "Messages non lus",
      value: String(data.newMessages),
      href: "/admin/messages",
      tint: "from-info to-[#1d4ed8]",
    },
    {
      label: "Commentaires à modérer",
      value: String(data.pendingComments),
      href: "/admin/commentaires",
      tint: "from-warning to-[#b45309]",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de l'activité de YEHLI."
      />

      {/* Indicateurs mis en avant */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {highlights.map((h) => (
          <Link
            key={h.label}
            href={h.href}
            className={`rounded-2xl bg-gradient-to-br ${h.tint} p-5 text-white shadow-md transition-transform hover:-translate-y-0.5`}
          >
            <p className="text-sm font-medium text-white/80">{h.label}</p>
            <p className="mt-2 font-heading text-2xl font-black sm:text-3xl">{h.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <AdminStatCard key={c.label} icon={c.icon} label={c.label} value={c.value} href={c.href} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="font-bold text-dark">Demandes d&apos;intervention par mois</h2>
          <p className="mb-4 text-sm text-muted">6 derniers mois</p>
          <InterventionsChart data={data.monthly} />
        </div>

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-dark">Derniers messages</h2>
            <Link href="/admin/messages" className="text-sm font-semibold text-primary hover:underline">
              Tout voir
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {data.recentMessages.length === 0 && (
              <li className="py-6 text-center text-sm text-muted">Aucun message</li>
            )}
            {data.recentMessages.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-dark">{m.name}</p>
                  <p className="truncate text-xs text-muted">{m.subject}</p>
                </div>
                <StatusBadge status={m.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-dark">Dernières demandes d&apos;intervention</h2>
          <Link
            href="/admin/demandes-intervention"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Tout voir
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                <th className="pb-2 font-semibold">Structure</th>
                <th className="pb-2 font-semibold">Ville</th>
                <th className="pb-2 font-semibold">Date</th>
                <th className="pb-2 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.recentInterventions.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted">
                    Aucune demande
                  </td>
                </tr>
              )}
              {data.recentInterventions.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 font-medium text-dark">{r.structureName}</td>
                  <td className="py-3 text-muted">{r.city}</td>
                  <td className="py-3 text-muted">{formatDate(r.createdAt)}</td>
                  <td className="py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
