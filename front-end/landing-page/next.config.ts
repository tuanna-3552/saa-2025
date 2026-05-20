import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to compile TypeScript packages from the monorepo
  transpilePackages: ["@saa/shared-ui"],
  // Cloudflare Pages deployment via @cloudflare/next-on-pages
  // Routes use `export const runtime = 'edge'` for CF edge rendering
};

export default nextConfig;
