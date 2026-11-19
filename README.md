# SMG Website

Sundial Media & Technology Group marketing site. Linear project: **SMG Website** (P-SUN-32).

Next.js (App Router) + TypeScript + **Sass** (CSS Modules). Content is served by NovaCMS through one adapter. For the MVP that's an independent Nova instance; it will move to e360-api later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run lint
```

Routes: `/`, `/products`, `/brands`, `/experiences`, `/our-work`, `/insights`, `/about`, `/partner`, `/styleguide`

## Structure

```
src/
  styles/
    tokens/        _colors _typography _spacing _layout _motion   ← design tokens (Sass maps)
    abstracts/     functions (color(), space(), section()) + mixins (type(), mq(), pad-x, grid, surface-dark…)
    base/          fonts, :root custom properties, reset, utilities (.t-*, .u-*)
    main.scss      global entry, imported once in app/layout.tsx
  components/
    brand/         Logo (wordmark / emblem)
    ui/            CtaLink, Button, Eyebrow, Heading, Reveal, MediaFrame, MediaCard, ArticleCard, StatList
    navigation/    SiteHeader (+ mobile menu), SiteFooter
    sections/      Hero, Statement, BrandStack, ExperienceCarousel, Highlights, FormatList, AccentBand,
                   Capabilities, BrandIndex, Invitation, PageHead, BrandDirectory, EventAccordion,
                   About (FullBleedImage, FounderSplit, Philosophy), ContactBlock
  types/content.ts ← content model (SUN-1124), built from the proposed sitemap
  lib/cms/         CmsAdapter interface + fixture adapter; the only place CMS data is read
  content/         seed data copied from the prototype
```

## Writing styles

Every component has a co-located `.module.scss` that starts with:

```scss
@use "abstracts" as *;   // resolved via sassOptions.loadPaths in next.config.ts

.title {
  @include type(display-xl);        // type styles from tokens/_typography.scss
  color: color(mute);               // semantic colors → var(--color-*)
  padding-top: section(xl);         // fluid section rhythm
  @include mq(md) { … }             // desktop-first: md = 820px, sm = 560px
}
```

- Add or change tokens only in `src/styles/tokens/`. They're emitted as CSS custom properties in `base/_root.scss`, and `/styleguide` reads them at runtime.
- Mark any dark section with `data-tone="dark"`. The fixed header switches to light text over it.
- The accent color (solar orange) is used rarely: the primary action, hover states and the one accent band.

## CMS

`src/lib/cms/index.ts` chooses the adapter from `CMS_SOURCE`:

- `fixtures` (default): prototype seed data in `src/content/fixtures.ts`. No CMS needed.
- `nova`: the SMG CMS (`~/Sites/sundialmtg-cms`, Laravel Nova + GraphQL). Set `NOVA_GRAPHQL_URL` (see `.env.example`). Responses are cached with `"use cache"` and tagged `cms`.

Pages and components only import `cms` and the types in `src/types/content.ts`. They never call Nova directly. Later, pointing `NOVA_GRAPHQL_URL` at e360-api will be the switch-over.
