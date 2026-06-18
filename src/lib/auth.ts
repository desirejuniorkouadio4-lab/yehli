import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (
            user?.passwordHash &&
            (await bcrypt.compare(password, user.passwordHash))
          ) {
            return { id: user.id, email: user.email, name: user.name ?? "Admin", role: user.role };
          }
          return null;
        } catch {
          // Base indisponible : repli sur l'administrateur par défaut (variables
          // d'environnement) pour permettre la prévisualisation de l'espace admin.
          const envEmail = (process.env.ADMIN_EMAIL || "admin@yehli.org").toLowerCase();
          const envPassword = process.env.ADMIN_PASSWORD || "YehliAdmin2024!";
          if (email === envEmail && password === envPassword) {
            return {
              id: "preview-admin",
              email: envEmail,
              name: "Administrateur YEHLI",
              role: "SUPER_ADMIN",
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
