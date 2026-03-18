import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Setiap kali kamu panggil /api-backend/...,
        // Next.js akan meneruskannya ke server NestJS kamu secara internal.
        source: "/api-backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_ENDPOINT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
