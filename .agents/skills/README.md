# Agent skills

Skills for Claude Code and other agents that read `SKILL.md`. The files live here, and `.claude/skills/` symlinks to them, the same layout as partner-portal.

| Skill | Source | What it's for |
| --- | --- | --- |
| `edit-content` | This repo | Changing copy, entries, pages and section types in `src/content/` |
| `match-prototype` | This repo | Comparing with or porting from the design prototype |
| `frontend-design` | `anthropics/skills` (via partner-portal) | Design quality for new UI. The prototype overrides its "generic traits" list (see CLAUDE.md) |
| `vercel-composition-patterns` | `vercel-labs/agent-skills` (via partner-portal) | React component structure |
| `review-animations` | `emilkowalski/skills` (via partner-portal) | Reviewing motion code. Invoke it explicitly: `/review-animations` |
| `improve-animations` | `emilkowalski/skills` (via partner-portal) | Auditing all motion and writing fix plans (read-only, writes to `plans/`) |
| `docs-lookup` | `incluud/astro-agent-skills` @ `4b4355e` (MIT) | Version-accurate Astro answers. Uses the `astro-docs` MCP server in `.mcp.json` |
| `content-collection` | `incluud/astro-agent-skills` @ `4b4355e` (MIT) | Astro content collection schemas and queries |

`skills-lock.json` tracks the four copied from partner-portal (same files, same hashes), so `npx skills update` works for them. The two incluud skills were copied by hand at the commit above, so update them by re-copying.

Every third-party skill here was read before it was added. Read any update before committing it.

Considered and left out: `infer-conventions` (Laravel Boost only, writes through a Boost MCP tool), `astro-best-practices` (says to prefer `.astro` components, which conflicts with this repo's React islands), and partner-portal's Laravel, Inertia, Tailwind and shadcn skills (not this stack).
