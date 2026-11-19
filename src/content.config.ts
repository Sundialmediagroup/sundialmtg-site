/**
 * Content collections. Each file in `src/content/` is validated against these
 * schemas at build time, so a typo in frontmatter fails `npm run build`.
 * Shapes mirror `src/types/content.ts`.
 *
 * Markdown collections use the filename as the id and slug
 * (`brands/essence.md` → id "essence").
 */
import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

/* Primitives ------------------------------------------------------- */

const media = z.object({
  src: z.string(),
  alt: z.string().default(""),
  width: z.number().optional(),
  height: z.number().optional(),
  focalPoint: z.string().optional(),
  kind: z.enum(["image", "video"]).optional(),
  poster: z.string().optional(),
});

const link = z.object({ label: z.string(), href: z.string(), external: z.boolean().optional() });
const stat = z.object({ value: z.string(), label: z.string() });
const seo = z
  .object({ title: z.string().optional(), description: z.string().optional(), image: media.optional(), noIndex: z.boolean().optional() })
  .optional();
const lines = z.array(z.string()).min(1);
const eyebrow = z.tuple([z.string(), z.string()]);
const md = (dir: string) => glob({ pattern: "**/*.md", base: `./src/content/${dir}` });

/* Entities --------------------------------------------------------- */

const brands = defineCollection({
  loader: md("brands"),
  schema: z.object({
    name: z.string(),
    category: z.enum(["Media", "Festival", "Studios", "Community", "Beauty"]),
    tagline: z.string(),
    territory: z.string(),
    description: z.string(),
    logo: media,
    hero: media,
    stats: z.array(stat),
    website: link,
    socials: z.array(link).optional(),
    partnershipOpportunities: z.array(z.string()).optional(),
    featuredCaseStudies: z.array(reference("work")).optional(),
    order: z.number(),
    seo,
  }),
});

const experiences = defineCollection({
  loader: md("experiences"),
  schema: z.object({
    name: z.string(),
    format: z.enum([
      "Festival",
      "Franchise",
      "Live experience",
      "Summit",
      "Activation",
      "Party series",
      "Dinner & Awards",
      "Print",
      "Branded experience",
    ]),
    brand: reference("brands"),
    location: z.string(),
    status: z.enum(["upcoming", "live", "past"]),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    summary: z.string(),
    hero: media,
    gallery: z.array(media).optional(),
    stats: z.array(stat).optional(),
    sponsorship: z
      .object({
        overview: z.string().optional(),
        tiers: z.array(z.object({ name: z.string(), description: z.string().optional(), benefits: z.array(z.string()) })).optional(),
        deckUrl: z.string().optional(),
        contact: link.optional(),
      })
      .optional(),
    recap: z.object({ title: z.string(), excerpt: z.string(), body: z.string().optional(), media: z.array(media).optional() }).optional(),
    order: z.number(),
    seo,
  }),
});

const products = defineCollection({
  loader: md("products"),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    summary: z.string(),
    hero: media.optional(),
    offerings: z.array(z.string()),
    relatedBrands: z.array(reference("brands")).optional(),
    relatedCaseStudies: z.array(reference("work")).optional(),
    order: z.number(),
    seo,
  }),
});

/** Our Work: campaign case studies. */
const work = defineCollection({
  loader: md("work"),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    kicker: z.string(),
    excerpt: z.string(),
    hero: media,
    challenge: z.string().optional(),
    approach: z.string().optional(),
    results: z.array(stat).optional(),
    gallery: z.array(media).optional(),
    brands: z.array(reference("brands")),
    products: z.array(reference("products")),
    experiences: z.array(reference("experiences")).optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    seo,
  }),
});

const insights = defineCollection({
  loader: md("insights"),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    cover: media,
    keyFindings: z.array(stat),
    // Plain link for now; gating would need a form service.
    download: z.object({ url: z.string(), gated: z.boolean().default(false) }).optional(),
    publishedAt: z.coerce.date(),
    seo,
  }),
});

const people = defineCollection({
  loader: md("people"),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    portrait: media.optional(),
    quote: z.string().optional(),
    order: z.number(),
    seo,
  }),
});

const partners = defineCollection({
  loader: file("./src/content/partners.yaml"),
  schema: z.object({
    name: z.string(),
    logo: media,
    url: z.string(),
    kind: z.enum(["foundation", "fund", "marketplace", "forum", "other"]),
    order: z.number(),
  }),
});

const values = defineCollection({
  loader: file("./src/content/values.yaml"),
  schema: z.object({ title: z.string(), description: z.string(), order: z.number() }),
});

/* Settings --------------------------------------------------------- */

const settings = defineCollection({
  loader: file("./src/content/settings.yaml"),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    nav: z.array(link.extend({ children: z.array(link).optional() })),
    primaryAction: link,
    socials: z.array(link),
    footer: z.object({
      company: z.array(link),
      legal: z.array(link),
      copyright: z.string(),
    }),
    contactEmail: z.string().optional(),
  }),
});

/* Pages ------------------------------------------------------------ */

const section = z.discriminatedUnion("type", [
  z.object({ type: z.literal("pageHead"), title: z.string(), intro: z.string().optional() }),
  z.object({ type: z.literal("hero"), title: lines, hint: z.string().optional(), media }),
  z.object({ type: z.literal("statement"), text: z.string(), eyebrow: eyebrow.optional(), stats: z.array(stat).optional() }),
  z.object({ type: z.literal("brandStack"), brands: z.array(reference("brands")), cta: link.optional() }),
  z.object({
    type: z.literal("experienceCarousel"),
    eyebrow,
    heading: lines,
    limit: z.number().int().positive().optional(),
    statement: z.object({ heading: z.string(), text: z.string(), cta: link.optional() }).optional(),
  }),
  z.object({ type: z.literal("highlights"), eyebrow, heading: lines, intro: z.string().optional(), featuredOnly: z.boolean().optional() }),
  z.object({
    type: z.literal("formatList"),
    heading: z.string(),
    items: z.array(z.object({ label: z.string(), href: z.string(), media: media.optional() })),
    cta: link.optional(),
  }),
  z.object({
    type: z.literal("accentBand"),
    eyebrow: z.string(),
    heading: lines,
    versus: z.array(z.object({ title: z.string(), caption: z.string() })),
    quote: z.string(),
    text: z.string(),
  }),
  z.object({ type: z.literal("capabilities"), eyebrow, heading: lines, limit: z.number().int().positive().optional() }),
  z.object({ type: z.literal("brandIndex"), heading: z.string(), show: z.array(z.enum(["partners", "brands"])).min(1) }),
  z.object({ type: z.literal("invitation"), heading: lines, text: z.string(), cta: link }),
  z.object({ type: z.literal("experienceList"), cta: link.optional() }),
  z.object({ type: z.literal("brandDirectory"), cta: link.optional() }),
  z.object({ type: z.literal("fullBleedImage"), media }),
  z.object({ type: z.literal("founderSplit"), lead: z.string(), person: reference("people"), body: z.array(z.string()) }),
  z.object({ type: z.literal("philosophy"), title: z.string(), lead: z.string(), body: z.array(z.string()), footnote: z.string().optional() }),
  z.object({ type: z.literal("contact"), heading: lines, text: z.string(), cta: link, meta: z.array(z.string()).optional() }),
]);

/** One file per route: `index.md` → `/`, `about.md` → `/about`. */
const pages = defineCollection({
  loader: md("pages"),
  schema: z.object({ title: z.string(), seo, sections: z.array(section) }),
});

export const collections = { brands, experiences, products, work, insights, people, partners, values, settings, pages };
