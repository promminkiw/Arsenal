import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // API-Football player photos
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        pathname: "/football/**",
      },

      // เผื่อบาง endpoint คืนรูป CDN อื่น (กันไว้)
      {
        protocol: "https",
        hostname: "cdn.api-sports.io",
        pathname: "/**",
      },
    ],
    // dev: มักอยากให้ next/image ทำงานแบบไม่ optimize (เร็วขึ้น)
    // prod: ให้ optimize ปกติ
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],

  // Redirects
  redirects: async () => [],

  // Rewrites
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [],
    fallback: [],
  }),

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: "Arsenal",
    NEXT_PUBLIC_APP_VERSION: process.env.APP_VERSION || "0.1.0",
  },

  // PoweredByHeader
  poweredByHeader: false,

  // Generate ETags
  generateEtags: true,

  // Trailing slash
  trailingSlash: false,

  // TypeScript strict mode
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
};

export default nextConfig;
