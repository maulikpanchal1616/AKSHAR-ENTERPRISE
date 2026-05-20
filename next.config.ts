import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "axarenterprise.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
