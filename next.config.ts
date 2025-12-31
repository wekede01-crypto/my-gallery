import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oxtapaubyuidullapjds.supabase.co', // 这是你专属的 Supabase 域名
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;