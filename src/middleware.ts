import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized: ({ token, req }) => {
      // La page de connexion est toujours accessible.
      if (req.nextUrl.pathname === "/admin/login") return true;
      // Toutes les autres routes /admin nécessitent une session.
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
