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

## GitHub Pages

This project now includes `.github/workflows/deploy.yml` for GitHub Pages deployment.

Important: `vite.config.ts` is currently set to `base: "/computer-diagnostic-assistant/"`.
If your GitHub repository name is different, change that base path to match your repo name.
