# SmartTask

SmartTask is a small, polished task dashboard built with React, Vite and Material UI. It showcases a premium 'Frosted Pearl' theme with smooth micro-interactions and accessibility improvements.

## Quick start

Requirements: Node 18+, npm

1. Install dependencies

```powershell
npm ci
```

2. Run the dev server

```powershell
npm run dev
```

3. Run tests

```powershell
npm test
```

## Deployment

This project is ready to deploy to Vercel or Netlify. For Vercel, connect the repository and set the build command to `npm run build` and the output folder to `dist`.

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs unit tests and builds on push and PR.

## End-to-end (E2E) tests

Playwright tests are scaffolded under `tests/e2e`. To run them locally:

```powershell
npm i -D @playwright/test playwright
npm run test:e2e
```

To run E2E tests in CI set the environment variable `RUN_E2E=true` in the workflow or repository secrets.

## Contributing

Create a branch, open a PR and the CI will run. For big UI changes, add a visual snapshot test or update the demo screenshots.
