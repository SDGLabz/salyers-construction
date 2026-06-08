import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (≈30% smaller than WebP), then WebP, then the original.
    // Pure byte savings on every optimized image — improves LCP/total weight
    // with no visual change.
    formats: ["image/avif", "image/webp"],
    qualities: [40, 75],
    // All CMS imagery is localized into our public Vercel Blob store
    // (scripts/localize-assets.mjs). Allow next/Image to optimize from there.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "91mfpzriwcjl52m0.public.blob.vercel-storage.com",
      },
      // YouTube video thumbnails for the product Videos section
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
    // Benefit icons are trusted first-party Belzona SVGs; allow them, sandboxed.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
