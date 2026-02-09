import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
