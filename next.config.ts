import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow external avatar images served by Google
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
