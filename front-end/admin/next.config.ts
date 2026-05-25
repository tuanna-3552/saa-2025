import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@saa/shared-ui"],
  // Both must point to monorepo root for pnpm hoisted node_modules
  outputFileTracingRoot: path.resolve(__dirname, "../.."),
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
