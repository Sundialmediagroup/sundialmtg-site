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
| SUN-1125 | Stand up NovaCMS foundations | SUN-1124 |
| SUN-1126 | Build the styleguide and component library | — |
| SUN-1127 | Scaffold the frontend | SUN-1124 |

Use the Linear branch names, e.g. `davepullen/sun-1127-scaffold-the-smg-website-frontend`.

## Architecture

- CMS is **NovaCMS**. The MVP uses an **independent Nova instance**.
- The long-term target is **e360-api** (Nova). Keep content types aligned with e360 types.
- All CMS access goes through one frontend adapter module. Switching from the independent Nova instance to e360-api should only need env/adapter changes.

## Stack & conventions

- Next.js App Router + TypeScript + Sass CSS Modules. Read README.md for the folder layout.
- Styles: every `.module.scss` begins `@use "abstracts" as *;`. Use `type()`, `color()`, `space()`, `section()` and `mq()`, and never hard-code a token value. Tokens live only in `src/styles/tokens/`.
- Turbopack doesn't support Sass `:export`. Expose tokens to TS through the CSS custom properties in `base/_root.scss`.
- Content: import data only from `@/lib/cms`. Types live in `src/types/content.ts` (SUN-1124). The CMS lives in `~/Sites/sundialmtg-cms` (Laravel Nova + Lighthouse GraphQL, SUN-1125). Set `CMS_SOURCE=nova` in `.env.local` to read from it.
- Prototype source: https://claude.ai/artifact/5YL12k9uoVSRzKLKeGyeMG. The scroll-driven "universe" splash intro is intentionally out of scope.

@AGENTS.md
