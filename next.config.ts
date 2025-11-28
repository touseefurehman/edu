import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' to enable SSR
  trailingSlash: true,
};

export default nextConfig;