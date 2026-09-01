# Go Florida Guide

A responsive editorial travel website for UK families planning Florida holidays. It includes Home, About and Contact pages, custom photography, responsive layouts, accessible navigation, smooth page motion and an Apple-style contact experience.

## Requirements

- Node.js `22.13` or newer
- pnpm `11` (recommended through Corepack)

## Run locally

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4317` or the URL printed by the development server.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

The production output is written to `dist/`. This is a Vinext application targeting the Cloudflare Workers runtime; it is not a plain static HTML export. See [DEPLOYMENT.md](DEPLOYMENT.md) for server requirements and publishing steps.

## Main folders

- `app/` — pages, components and styles
- `public/` — images, videos, icons and social preview assets
- `worker/` — Cloudflare Worker entry point
- `dist/` — generated production output, included in the release build archive

## Commands

- `pnpm dev` — local development server
- `pnpm build` — production build
- `pnpm start` — local production preview
- `pnpm deploy:cloudflare` — deploy the built output using Wrangler
- `pnpm test` — build and rendered HTML checks

The Contact form currently runs in preview mode and does not send messages. Replace the demo contact details and connect a delivery endpoint before accepting production enquiries.
