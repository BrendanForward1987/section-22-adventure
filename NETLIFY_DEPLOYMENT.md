# Deploying Section 22 to Netlify

This repository is configured for Netlify's native Next.js support. Netlify
uses its maintained OpenNext adapter automatically, so no framework plugin is
pinned in the repository.

## One-time setup

1. Sign in to Netlify and choose **Add new project**.
2. Select **Import an existing project**, then choose GitHub.
3. Authorize and select `BrendanForward1987/section-22-adventure`.
4. Use `main` as the production branch after the Netlify preparation pull
   request has been merged.
5. Leave the base directory and publish directory empty. Netlify reads the
   build command and Node version from `netlify.toml`.
6. Select **Deploy**.

No environment variables are required for the current public experience.

## Expected build settings

- Build command: `npm run build`
- Node.js: version 22
- Framework: Next.js
- Publish directory: automatically managed by Netlify

## Verification checklist

After the first deployment, verify:

- `/` loads the scenario experience.
- `/section-22-flow` loads the visual Section 22 pathway.
- Illustration assets load without distortion.
- Stage and information modals open and close.
- The header and flowchart collapse correctly on a narrow mobile viewport.

## Continuous deployment

Once the GitHub repository is connected, pushes to `main` trigger production
deployments. Pull requests can use Netlify Deploy Previews before they are
merged.

## Platform-specific code

The repository retains the original Vinext, Cloudflare Worker, D1, and ChatGPT
Sites helpers for the existing deployment. They are excluded from the standard
Next.js type-check because the current public experience does not import them.

If Cloudflare D1 or dispatch-owned ChatGPT authentication is enabled later,
those features will need Netlify-compatible storage and authentication before
they can run on Netlify.
