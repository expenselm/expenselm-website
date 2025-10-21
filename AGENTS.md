# Repository Guidelines

## Project Structure & Module Organization

This Next.js application keeps routable UI code inside `src/app`, with feature-specific segments such as `src/app/docs` and `src/app/help`. Shared React components live in `src/components`, grouped by feature folders (`Benefits/`, `Pricing/`) for discoverability. Static content and copy live in `src/data`, while Contentful integration helpers reside in `src/lib/contentful.ts`. Cross-cutting utilities sit in `src/utils.tsx`. Public assets, including logos and testimonial imagery, are served from `public/`. Framework and tooling settings are maintained in `next.config.mjs`, `tailwind.config.ts`, and `tsconfig.json`.

## Build, Test, and Development Commands

- `npm install` installs dependencies pinned in `package-lock.json`.
- `npm run dev` launches the local Next.js dev server at `http://localhost:3000`.
- `npm run build` compiles a production build; run before deployment to validate bundle health.
- `npm run start` serves the production build locally.
- `npm run lint` executes the Next.js ESLint suite (TypeScript, React, Tailwind rules).

## Coding Style & Naming Conventions

TypeScript + React files use 2-space indentation and JSX with trailing commas where possible. Components and hooks follow PascalCase filenames (`Hero.tsx`, `useContentful.ts`), while utility modules stay camelCase. Keep imports path-alias aware (`@/components/...`). Favor Tailwind utility classes over ad-hoc CSS; extend tokens via `tailwind.config.ts` rather than introducing inline hex values.

## Testing Guidelines

Automated tests are not yet established; prioritize adding component or integration coverage alongside new features. Pair functional testing with `npm run lint` before every pull request. When introducing tests, name files `<Component>.test.tsx` and co-locate them near the implementation for easier maintenance.

## Commit & Pull Request Guidelines

Commits in history are concise, imperative statements (“Add help page for AI”). Follow that style, keep subjects under ~72 characters, and scope work per commit. Reference issue or ticket numbers in the body when relevant. Pull requests should include a short summary of changes, screenshots or recordings for UI updates, a checklist of manual/automated verification (dev server, lint, Contentful checks), and any environment considerations for reviewers.

## Environment & Contentful Setup

Copy `.env.example` to `.env.local` before running the dev server. Coordinate Contentful credentials using the steps in `CONTENTFUL_SETUP.md`; confirm preview tokens for draft content. Treat Contentful IDs and API keys as secrets—never commit `.env*` files. After updating models in Contentful, sync corresponding TypeScript types in `src/types.ts`.
