# BidCraft Project and Vercel Runtime Error Handoff

## Project Overview

BidCraft is a React 19 + TypeScript frontend using TanStack Start, Vite 8, and Nitro 3. The app calls a separate FastAPI backend. Vercel deployment is configured through the Nitro Vercel preset in `vite.config.ts`; `vercel.json` currently contains security headers and no build command override.

Main app areas:

- `src/routes/index.tsx`: Google sign-in and the main authenticated bid/conversation UI.
- `src/components/new-bid-form.tsx`: shared job input form. Supports normal bid creation and similarity-test mode, including `top_n`.
- `src/routes/similarity-test.tsx`: standalone `/similarity-test` route.
- `src/lib/api.ts`: FastAPI base URL, auth header, request types, and API helpers.
- `src/components/projects-modal.tsx`: reference-project management.
- `vite.config.ts`: TanStack Start server entry and Nitro Vercel configuration.

The similarity route calls `POST /api/v1/projects/similarity-test` using the same JSON/SSE pattern as bid generation (`POST /api/v1/jobs/generate-bid`), with `top_n` added to the JSON payload. The SSE reader handles `chunk` and `done` events. API requests use `X-User-Id` from `google_auth_user` in local storage.

Environment variable names used by the frontend are `GOOGLE_CLIENT_ID`, `VITE_API_BASE`, and optionally `VITE_API_URL`. The API helper prefers `VITE_API_URL` over `VITE_API_BASE`; Google sign-in currently reads `VITE_API_BASE`. Do not put `.env` values in this handoff or public logs.

## Reported Production Error

Opening the deployed site produces a server-side runtime error:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'tslib'
imported from /var/task/_libs/@radix-ui/react-alert-dialog+[...].mjs
```

This is a Node ESM package-resolution failure while loading a Vercel server function. It is not an HTTP error from FastAPI, and it is not a Node engine/version error. The path shows that the failure occurs in the generated SSR function while loading a Radix alert-dialog chunk.

## Findings So Far

- Latest checked-out and pushed commit at time of investigation: `ac5f7b3` (`fix`), on `main` / `origin/main`.
- `tslib` is declared directly in `package.json` (`^2.8.1`) and in both npm and Bun lockfiles.
- `vite.config.ts` currently has `nitro: { preset: "vercel", noExternals: ["tslib"] }`.
- A local production build with this config completed successfully.
- After that build, the generated alert-dialog chunk no longer had a bare `from "tslib"` import. This was checked with `grep`.
- The repository tracks `.vercel/output`. At commit `ac5f7b3`, the checked-in `.vercel/output/functions/__server.func/_libs/@radix-ui/react-alert-dialog+[...].mjs` still contains `import { __assign, __rest, __spreadArray } from "tslib";`.
- The checked-in function package manifest lists `tslib`, but that does not remove the bare import from the checked-in chunk.
- Therefore, if Vercel deploys prebuilt output (for example, `vercel deploy --prebuilt`) or otherwise skips/reuses the generated output, the latest source config alone will not fix the deployed function. A fresh build from the source is expected to produce a different chunk. This is a strong hypothesis, not yet confirmed: Vercel's actual build settings and deployment logs are not available here.
- The checked-in `.vc-config.json` says `nodejs24.x`, but this is generated metadata in the repository and may not represent the actual deployed function runtime. In any case, the observed error is `ERR_MODULE_NOT_FOUND`, so changing Node version alone is unlikely to fix it.

## What Remains Unknown on Vercel

Confirm these from the failing Production deployment, not just project defaults:

1. Deployment commit SHA. It should be `ac5f7b3` or a later commit.
2. Whether Vercel uses Git integration or a CLI/prebuilt deployment.
3. The actual install command/package manager, build command, root directory, and output-directory override.
4. Whether the build log runs the Vite/Nitro production build with the current `vite.config.ts`, or deploys an existing `.vercel/output` directory.
5. The actual Node runtime shown in function/deployment settings and logs.
6. If the latest source build did run, inspect the deployed function's alert-dialog chunk or Vercel artifact to see whether it still has a bare `from "tslib"` import.

For a prebuilt deployment, build fresh output from the latest source before deploying it. For Git integration, verify the build is not skipped and that Vercel uses the default Nitro/Vercel output rather than a stale custom output directory. Avoid assuming a Node-version change is relevant unless Vercel logs show an engine/runtime incompatibility.

## Useful Reproduction Check

A local production build was run with Node 22.13 using:

```sh
npx --yes --package=node@22.13.0 -c 'node node_modules/vite/bin/vite.js build'
```

Then check the generated file under `.vercel/output/functions/__server.func/_libs/` for `from "tslib"`. With the current `noExternals` config, that import was absent in the locally generated alert-dialog chunk. Build output is generated and `.vercel/output` is tracked in this repository; do not assume local generated artifacts and Vercel's deployed artifact are synchronized.

## Other Deployment Context

`vercel.json` has a Content Security Policy whose `connect-src` currently allows same-origin plus AWS domains. If the production FastAPI API is on another origin, that origin must be allowed by CSP, and FastAPI CORS must allow the deployed frontend origin and `X-User-Id`/`Content-Type` headers. This is separate from the `tslib` crash and should only be investigated after the SSR function loads.
