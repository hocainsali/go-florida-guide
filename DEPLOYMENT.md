# Deployment guide

Go Florida Guide is built with Vinext and runs as a Cloudflare Worker with static assets. It cannot be hosted by copying files into a traditional PHP or Apache `public_html` folder.

## Recommended: Cloudflare Workers

1. Install Node.js 22.13 or newer and enable Corepack.
2. Download or clone the repository.
3. From the project directory, run:

   ```bash
   corepack enable
   pnpm install --frozen-lockfile
   pnpm build
   pnpm exec wrangler login
   pnpm deploy:cloudflare
   ```

Wrangler uploads the Worker bundle from `dist/server/` and the website assets from `dist/client/`.

## Downloadable release files

- `go-florida-guide-source.zip` — complete source code, media and setup files
- `go-florida-guide-cloudflare-build.zip` — validated `dist/` output for a Cloudflare-compatible deployment pipeline

For a fresh or long-lived deployment, rebuilding from the source archive is recommended so the server package matches the installed Node.js and dependency versions.

## Other hosting providers

Use a provider that supports Node.js 22 and Cloudflare Worker-compatible applications. Upload the source archive, install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm build`. A static-only hosting account is not compatible with this build.

## Before launch

- Replace `hello@goflorida.example` and the demo phone number.
- Connect the Contact form to an email or form-delivery service.
- Update canonical URLs if the final domain differs from the configured domain.
- Run `pnpm build` after content or domain changes.
