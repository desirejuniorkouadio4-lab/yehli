import type { Metadata } from "next";
import { AdminProviders } from "./providers";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s · Admin YEHLI" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
