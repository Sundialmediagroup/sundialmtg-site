# SMG Website

Sundial Media & Technology Group marketing site. Linear project: **SMG Website** (P-SUN-32).

A static site built with **Astro** from Markdown/YAML files, with React components and **Sass** (CSS Modules). `npm run build` produces plain HTML/CSS/JS in `dist/`, which is hosted on S3 behind Cloudflare. There is no CMS or server.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + astro build → dist/
npm run preview    # serve dist/ locally
npm run lint
```

Routes: `/`, `/products/`, `/brands/`, `/experiences/`, `/our-work/`, `/insights/`, `/about/`, `/partner/`, `/styleguide/` (noindex)

## Editing content

All copy lives in `src/content/`. Edit a file, then build and deploy.

```
src/content/
  pages/         one file per route: index.md → /, about.md → /about/ …  (a list of `sections:`)
  brands/        one .md per brand        (filename = id, e.g. essence)
  experiences/   one .md per experience   (`brand:` is a brand id; `order:` sets the list order)
  products/      one .md per product
  work/          Our Work case studies    (`featured: true` puts one on the home page)
  insights/      Insight reports          (empty for now)
  people/        leadership               (founderSplit on About uses `person: richelieu-dennis`)
  partners.yaml  ecosystem partners
  values.yaml    About page values
  settings.yaml  nav, primary action, socials, footer
```

- Frontmatter is checked against the schemas in `src/content.config.ts`. A missing field, an unknown brand id or a misspelt section `type` fails the build and names the file.
- **YAML gotcha:** a value containing ` #` or starting with a special character (`#`, `:`, `[`, `{`, `"`, `@`) must be quoted. Otherwise everything after ` #` is silently dropped as a comment.
- Images go in `public/` (`public/media/`, `public/logos/`) and are referenced as `/media/p01.jpg`.
- To add a page, add `src/content/pages/<slug>.md` with `title:` and `sections:`. It's served at `/<slug>/`.
- Internal links end in `/` (`/brands/`, `/brands/#essence`), so S3 serves them without a redirect.

### Section types

`Section` in `src/types/content.ts` lists every type and its fields. `src/components/sections/Sections.astro` renders them.
`pageHead` · `hero` · `statement` · `brandStack` · `experienceCarousel` · `highlights` · `formatList` · `accentBand` · `capabilities` · `brandIndex` · `invitation` · `experienceList` · `brandDirectory` · `fullBleedImage` · `founderSplit` · `philosophy` · `contact`

In `highlights` and `capabilities` eyebrows, `{count}` is replaced with the number of items shown.

## Deploying

```bash
S3_BUCKET=<bucket> npm run deploy
```

`scripts/deploy.sh` builds, then syncs `dist/` to the bucket. Hashed `_astro/` assets get a one-year immutable cache, and everything else is set to revalidate. If `CF_ZONE_ID` and `CF_API_TOKEN` are set, it then purges Cloudflare. It needs the AWS CLI with credentials for the bucket. See `.env.example`.

The bucket needs S3 static website hosting with index document `index.html` and error document `404.html`. Cloudflare proxies the website endpoint.

## Structure

```
src/
  content.config.ts  collection schemas (Zod)
  content/           the Markdown/YAML content (see above)
  lib/content.ts     the only module that reads collections; returns the types below
  types/content.ts   content model (SUN-1124)
  pages/             [...page].astro (one route per pages/*.md), styleguide.astro, 404.astro
  layouts/           BaseLayout.astro: <head>/SEO, header, footer
  scripts/reveal.ts  sets data-in on [data-reveal] headings as they scroll into view
  styles/
    tokens/          _colors _typography _spacing _layout _motion   ← design tokens (Sass maps)
    abstracts/       functions (color(), space(), section()) + mixins (type(), mq(), pad-x, grid, surface-dark…)
    base/            fonts, :root custom properties, reset, utilities (.t-*, .u-*)
    main.scss        global entry, imported once in BaseLayout.astro
  components/
    brand/           Logo (wordmark / emblem)
    ui/              CtaLink, Button, Eyebrow, Heading, Reveal, MediaFrame, MediaCard, ArticleCard, StatList
    navigation/      SiteHeader (+ mobile menu), SiteFooter
    sections/        one component per section type, plus Sections.astro
    styleguide/      Styleguide + TokenList (/styleguide)
```

### React islands

Components are React (`.tsx`). They render to static HTML at build time and ship no JS unless an `.astro` file gives them a `client:*` directive. The hydrated ones are SiteHeader (`client:load`) and, via `client:visible`, Statement, BrandStack, ExperienceCarousel, FormatList, BrandIndex, BrandDirectory and EventAccordion.

A component nested inside another React component only hydrates if its parent does. To make something interactive, either hydrate the section that contains it (in `Sections.astro`) or use a small script like `scripts/reveal.ts`. Use plain `<a>` and `<img>`; there is no framework Link/Image.

## Writing styles

Every component has a co-located `.module.scss` that starts with:

```scss
@use "abstracts" as *;   // resolved via vite.css.preprocessorOptions.scss.loadPaths in astro.config.mjs

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
