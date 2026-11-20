---
name: edit-content
description: Change the SMG Website's content or content model. Use when editing copy, adding or reordering a brand, experience, product, case study, person or page, adding a page section, or adding a new section type or collection field. Covers where each piece of content lives, the three files a new section type touches, the YAML and dev-server traps that have bitten us, and how to verify the build.
---

# Edit content

All site content lives in `src/content/` as Markdown frontmatter and YAML. There is no CMS. A change goes live on the next `npm run build` and deploy. README.md ("Editing content") has the full folder map; this skill is the working procedure.

## Where things live

| To change | Edit |
| --- | --- |
| Copy on a page (headings, intros, stats, CTAs) | `src/content/pages/<page>.md`, in its `sections:` list |
| A brand, experience, product or case study | `src/content/{brands,experiences,products,work}/<id>.md` (filename = id) |
| Nav, primary action, socials, footer links | `src/content/settings.yaml` (top-level `site:` key) |
| Partners, About values | `src/content/partners.yaml`, `src/content/values.yaml` |
| Images | `public/media/`, `public/logos/`, referenced as `/media/p01.jpg` |

Never put copy in a component. If a component needs new text, add a field to the section or collection and pass it through.

## Common edits

- **Reorder** brands, experiences, products, people, partners or values with their `order:` field. YAML-file collections don't keep array order, so `order` is required.
- **Feature a case study on the home page** with `featured: true`.
- **Reference other entries by id**, e.g. `brand: essence` or `brands: [essence, r29]`. An unknown id fails the build, which is intended.
- **Add a page**: create `src/content/pages/<slug>.md` with `title:` and `sections:`. `src/pages/[...page].astro` serves it at `/<slug>/`. Add it to `nav` in `settings.yaml` if it belongs there.
- **Internal links end in `/`**: `/brands/`, `/brands/#essence`. The site uses `trailingSlash: "always"` and S3 would otherwise redirect.

## Adding a section type or field

A new section type touches three places, which must stay in step:

1. `src/types/content.ts`: add the variant to the `Section` union.
2. `src/content.config.ts`: add the matching `z.object({ type: z.literal("…"), … })` to the `section` discriminated union.
3. `src/components/sections/Sections.astro`: add a `case`. Hydrate with `client:visible` only if the component has real interactivity. A React component nested in a non-hydrated one never hydrates.

A new collection field goes in the Zod schema, the type in `src/types/content.ts`, and the mapping in `src/lib/content.ts` if it needs converting (references → ids, dates → ISO strings, Markdown body → HTML).

Pages and components read data only through `@/lib/content`, never `astro:content` directly.

## Traps

- **Quote YAML values containing ` #`.** Unquoted, everything after ` #` is a comment and is silently dropped. This truncated the About page footnote ("the #1 source…"). Also quote values starting with `#`, `:`, `[`, `{`, `@` or a quote character.
- **Restart the dev server after changing `src/content.config.ts`.** It keeps serving stale data (e.g. "settings.yaml needs a top-level site: key") until restarted. Astro 7 runs `astro dev` detached, so Ctrl-C and `pkill` don't stop it. Use `npx astro dev stop`, then `npm run dev`. `npx astro dev status` and `npx astro dev logs` show its state.
- **The empty `insights` collection warns** ("No files found … src/content/insights") on every build. That's expected until the first report exists.

## Verify

1. `npm run build`. It runs `astro check` and then `astro build`. Read the actual result: `- 0 errors` and `N page(s) built`. Don't trust the exit message alone, and don't filter the output so hard that an error line can't show.
2. `npm run lint`.
3. For copy changes, check the page in `npm run dev`. For a section type, check it renders on every page that uses it, and if it's interactive, that it hydrates (no `ssr` attribute left on its `astro-island`).
