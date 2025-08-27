import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow any image source (disable domain restrictions)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Optionally, you can remove the 'domains' array entirely
    // domains: [],
  },
};

export default nextConfig;
