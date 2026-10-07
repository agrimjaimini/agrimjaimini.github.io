import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
