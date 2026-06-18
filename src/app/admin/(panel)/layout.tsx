import { requireUser } from "@/lib/rbac";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <AdminShell user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </AdminShell>
  );
}
