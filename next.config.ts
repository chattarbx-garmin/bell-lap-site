import type { NextConfig } from "next";

// Built to plain files in out/ and served by Netlify; there is no server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
