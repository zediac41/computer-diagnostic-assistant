# Computer Diagnostic Assistant

GitHub-ready React + TypeScript prototype for customer-service computer diagnostics.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

This repo now includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that builds and deploys `dist/` to GitHub Pages on pushes to `main`.

### One-time setup

1. In GitHub: **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` (or run the workflow manually from **Actions**)

The Vite base path is auto-set during GitHub Actions builds using `GITHUB_REPOSITORY`, so project-page URLs (e.g. `https://<user>.github.io/<repo>/`) work without local changes.

For stable CI installs, commit a `package-lock.json`. The workflow prefers `npm ci` when the lockfile exists, and falls back to `npm install` only when no lockfile is present.

If your organization blocks public npm access, set a repository/org variable named `NPM_REGISTRY_URL` (for example your internal registry). The workflow will use that registry during install.

## Current state

This version is intentionally focused on UI and project structure:
- multi-file React app
- customer information
- system profile
- searchable symptoms with custom per-case symptoms
- placeholder results
- resolution workflow
- case history with load-case support

The "Possible Fixes" area is currently placeholder-only so logic can be added later cleanly.

## Suggested next logic files

- `src/logic.ts` for rules / scoring
- `src/data.ts` for symptom groups and option lists
- `src/types.ts` for stable data contracts
