import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/api/images/**',
        search: '',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1year
  },
};

export default nextConfig;
