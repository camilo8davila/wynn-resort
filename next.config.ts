import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.wynnresorts.com'
      }
    ]
  },
  output: 'standalone'
};

export default nextConfig;
