import path from "node:path";
import type { NextConfig } from "next";

// Allow next/image to load media from the CMS host (Nova adapter).
const cmsOrigin = process.env.NOVA_GRAPHQL_URL ? new URL(process.env.NOVA_GRAPHQL_URL) : null;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: cmsOrigin
      ? [{ protocol: cmsOrigin.protocol.replace(":", "") as "http" | "https", hostname: cmsOrigin.hostname, port: cmsOrigin.port, pathname: "/storage/**" }]
      : [],
    // next/image blocks local IPs by default; allow it only when the CMS itself is local.
    dangerouslyAllowLocalIP: ["127.0.0.1", "localhost"].includes(cmsOrigin?.hostname ?? ""),
  },
  sassOptions: {
    // Lets every .module.scss do `@use "abstracts" as *;`
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
