import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // === Vert — couleur dominante du logo YEHLI ===
        primary: {
          DEFAULT: "#1A6B2A",
          light: "#2E8B42",
          pale: "#EAF4EC",
          mid: "#C5E0C9",
        },
        // === Jaune soleil — accent chaleureux ===
        accent: {
          DEFAULT: "#F5C518",
          light: "#FFF8D6",
          dark: "#D4A017",
        },
        // === Neutres ===
        dark: "#1C1C2E",
        body: "#374151",
        muted: "#6B7280",
        border: "#E5E7EB",
        surface: "#F9FAFB",
        // === États fonctionnels ===
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",
        info: "#2563EB",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Nunito Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": "0.6875rem",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        xl: "32px",
        "2xl": "40px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.05)",
        card: "0 2px 10px rgba(0,0,0,0.05)",
        "card-hover": "0 10px 28px rgba(26, 107, 42, 0.10)",
        cta: "0 6px 16px rgba(26, 107, 42, 0.28)",
        header: "0 4px 20px rgba(16, 40, 24, 0.06)",
      },
      maxWidth: {
        container: "1280px",
        prose: "70ch",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 32s linear infinite",
        "scale-in": "scale-in 0.25s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
