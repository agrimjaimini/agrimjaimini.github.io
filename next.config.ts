import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
