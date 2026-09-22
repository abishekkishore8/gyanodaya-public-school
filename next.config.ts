import type { NextConfig } from "next";

// Gives `next dev` the same Cloudflare bindings (D1, R2) the deployed Worker
// has, reading them from wrangler.jsonc.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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

void initOpenNextCloudflareForDev();

export default nextConfig;
