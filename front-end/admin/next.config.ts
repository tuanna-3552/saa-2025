import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to compile TypeScript packages from the monorepo
  transpilePackages: ["@saa/shared-ui"],
  // Cloudflare Pages deployment via @cloudflare/next-on-pages
  // Individual routes add `export const runtime = 'edge'` for CF bindings
};

export default nextConfig;
