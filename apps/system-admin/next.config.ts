import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@stadiyums/ui", "@stadiyums/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mlbstatic.com",
        pathname: "/team-logos/**",
      },
    ],
  },
};

export default nextConfig;
