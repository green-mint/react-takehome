import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://assets.flybasis.com/**")],
    qualities: [60, 75, 100],
  },
};

export default nextConfig;
