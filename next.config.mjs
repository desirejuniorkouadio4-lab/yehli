/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next.js 14 : externalise les paquets serveur qui ne se bundlent pas bien
  // (jsdom, tiré par isomorphic-dompurify, casse le bundle serverless Vercel).
  experimental: {
    serverComponentsExternalPackages: ["jsdom", "isomorphic-dompurify"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "*.ufs.sh" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  eslint: {
    // Le lint est exécuté séparément (npm run lint) ; on n'échoue pas le build sur des warnings.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
