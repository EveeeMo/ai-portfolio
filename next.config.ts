import type { NextConfig } from "next";

const isDockerBuild = process.env.DOCKER_BUILD === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  ...(isDockerBuild
    ? { output: "standalone" }
    : {
        output: "export",
        trailingSlash: true,
      }),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
