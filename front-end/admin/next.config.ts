import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@saa/shared-ui"],
  // Both must match for Turbopack to resolve hoisted pnpm packages from monorepo root
  outputFileTracingRoot: path.resolve(__dirname, "../.."),
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
