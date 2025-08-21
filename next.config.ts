// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS hosts
      },
      {
        protocol: "http",
        hostname: "**", // (optional) allow all HTTP hosts too
      },
    ],
  },
};

export default nextConfig;
