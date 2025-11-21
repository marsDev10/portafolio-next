import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "portafolio-next";

const nextConfig: NextConfig = {
  output: "export",
  // When deploying to GitHub Pages we need to serve the app from /<repo-name>/
  basePath: isGitHubActions ? `/${repositoryName}` : undefined,
  assetPrefix: isGitHubActions ? `/${repositoryName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
