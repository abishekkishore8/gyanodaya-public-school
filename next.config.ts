import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * The MongoDB and AWS SDK packages are CommonJS and must stay external to the
   * server bundle rather than being traced and inlined.
   */
  serverExternalPackages: ["mongodb", "@aws-sdk/client-s3"],

  /**
   * Photographs are served from Unsplash and the school's Cloudflare R2 bucket.
   * Listed here so they can be moved to `next/image` without further config.
   */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.r2.dev" },
    ],
  },
};

export default nextConfig;
