const isProd = process.env.NODE_ENV === "production";
const repoName = "weather-app-main";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  basePath: isProd ? `/${repoName}` : undefined,
};

export default nextConfig;
