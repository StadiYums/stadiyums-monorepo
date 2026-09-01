import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@stadiyums/ui",
    "@stadiyums/types",
    "@stadiyums/db",
    "@stadiyums/core",
  ],
  serverExternalPackages: ["@neondatabase/serverless"],
};

export default nextConfig;
