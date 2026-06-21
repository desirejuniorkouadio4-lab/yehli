import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/config/site";
import { CookieBanner } from "@/components/shared/cookie-banner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YEHLI — L'éducation, une lumière pour changer des vies",
    template: "%s | YEHLI",
  },
  description:
    "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire : vulgarisation scientifique, formation des enseignants, inclusion et numérique éducatif.",
  keywords: [
    "éducation",
    "Côte d'Ivoire",
    "enfants",
    "science",
    "formation enseignants",
    "ONG",
    "association",
    "vulgarisation scientifique",
    "IA éducative",
    "éducation inclusive",
  ],
  authors: [{ name: "YEHLI" }],
  creator: "Digital Access — Département Digital Web Solution",
  publisher: "YEHLI",
  applicationName: "YEHLI",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "YEHLI" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: siteUrl,
    siteName: "YEHLI",
    title: "YEHLI — L'éducation, une lumière pour changer des vies",
    description:
      "ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YEHLI — L'éducation, une lumière pour changer des vies",
    description:
      "ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1A6B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
