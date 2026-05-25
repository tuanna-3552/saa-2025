import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@saa/shared-ui"],
  // Point Turbopack to monorepo root so it can resolve hoisted node_modules
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
