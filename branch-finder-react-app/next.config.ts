import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
