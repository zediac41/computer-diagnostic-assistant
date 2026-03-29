import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

  return {
    base: isGitHubActions && repositoryName ? `/${repositoryName}/` : "./",
    plugins: [react()]
  };
});
