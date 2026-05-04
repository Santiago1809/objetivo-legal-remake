# AGENTS.md — objetivo-legal-remake

## Tech Stack
- **Framework**: Astro 6.2.x (starter kit)
- **Runtime**: Bun (not npm/yarn/pnpm)
- **Node**: >= 22.12.0 (required, not just recommended)
- **TypeScript**: Strict mode via `astro/tsconfigs/strict`

## Commands
```bash
bun install      # Install dependencies
bun dev          # Dev server at localhost:4321
bun build        # Production build to ./dist
bun preview      # Preview build locally
bun astro check  # Type-check
```

## Project Structure
```
src/
├── pages/        # Route entrypoints (.astro files)
├── components/   # Reusable Astro components
├── layouts/      # Page layouts
└── assets/       # Static assets (svg, images)
```

## Notes for Agents
- **Tailwind CSS 4** configured via `@tailwindcss/vite` plugin in astro.config.mjs
- **No tests configured** — add testing framework if needed (Vitest recommended for Astro)
- **No linting** — consider adding ESLint + Prettier if the team uses them
- **.astro types** — first build generates `.astro/types.d.ts`; ignore in version control if desired
- **Public folder** — static assets served from `/public` mount at root

## Development Flow
1. Run `bun dev` to start
2. Edit `.astro` files in `src/`
3. Changes hot-reload automatically
4. Build with `bun build` before deploying