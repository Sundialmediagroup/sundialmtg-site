# SMG Website

## Linear

- Workspace: Sundialmtg — team `Sundialmtg` (key `SUN`)
- Project: **SMG Website** (`P-SUN-32`) — https://linear.app/sundialmtg/project/smg-website-a9622c503622
- Plan doc: https://linear.app/sundialmtg/document/smg-website-mvp-architecture-and-plan-feb5aa0318ab
- File new issues for this codebase under the SMG Website project. Assign them to Dave Pullen unless told otherwise.

### Tickets

| Ticket | Work | Depends on |
| --- | --- | --- |
| SUN-1124 | Design the data model and content types | — |
| SUN-1125 | Stand up NovaCMS foundations (superseded: the site is now static Markdown) | SUN-1124 |
| SUN-1126 | Build the styleguide and component library | — |
| SUN-1127 | Scaffold the frontend | SUN-1124 |

Use the Linear branch names, e.g. `davepullen/sun-1127-scaffold-the-smg-website-frontend`.

## Architecture

- **Static site: Astro (`output: "static"`), content in Markdown/YAML.** There's no CMS. Nova and e360-api were dropped, so don't reintroduce a CMS adapter or align types with e360.
- Hosted on **AWS S3 behind Cloudflare**. `npm run deploy` (`scripts/deploy.sh`) builds and syncs `dist/` to S3, then purges Cloudflare.
- Read README.md for the content layout, section types and folder structure.

## Stack & conventions

- Astro + React islands + TypeScript + Sass CSS Modules. Components are `.tsx`. Hydrate them only from `.astro` files with `client:*`, and only when they need interactivity. A React component nested inside a non-hydrated one never hydrates.
- No framework Link/Image: use `<a>` and `<img>`. Internal hrefs end with `/` (`trailingSlash: "always"`).
- Content: pages and components get data only from `@/lib/content`, typed by `src/types/content.ts`. Collection schemas live in `src/content.config.ts`, so keep the three in step. Copy belongs in `src/content/`, not in components.
- Page copy is a `sections:` list in `src/content/pages/*.md`, rendered by `components/sections/Sections.astro`. To add a section type, update the `Section` type, the Zod `section` union and `Sections.astro`.
- Quote YAML values that contain ` #`; otherwise the rest is dropped as a comment.
- Styles: every `.module.scss` begins `@use "abstracts" as *;`. Use `type()`, `color()`, `space()`, `section()` and `mq()`, and never hard-code a token value. Tokens live only in `src/styles/tokens/`, and TS reads them through the CSS custom properties in `base/_root.scss`.
- `npm run build` runs `astro check` first. Run it and `npm run lint` before calling work done.
- Prototype source: https://claude.ai/artifact/5YL12k9uoVSRzKLKeGyeMG. The scroll-driven "universe" splash intro is intentionally out of scope.

## Agent skills

Skills live in `.agents/skills/` (symlinked into `.claude/skills/`). `.agents/skills/README.md` lists their sources.

- `edit-content`: any change under `src/content/`, or a new section type or field.
- `match-prototype`: comparing with or porting from the prototype.
- `docs-lookup`: Astro APIs. This is Astro 7, so don't trust memory; use the `astro-docs` MCP server (`.mcp.json`).
- `content-collection`: collection schemas and queries.
- `frontend-design`: new UI the prototype doesn't cover. **The prototype is the brief and wins.** Its uppercase labels, `A · B` meta strings, `01 —` eyebrows and near-black surfaces are deliberate, so don't "fix" them as generic traits.
- `vercel-composition-patterns`: React component structure.
- `review-animations` / `improve-animations`: motion review and audits. The reveals and crossfades are marketing motion, which their own standards allow to run longer than the 300ms UI budget.
