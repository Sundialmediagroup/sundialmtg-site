/**
 * SMG Website content model (SUN-1124).
 *
 * The contract between the Markdown/YAML content in `src/content/` and the
 * components. Shapes follow the proposed sitemap:
 *   Home · Products · Brands · Experiences · Our Work · Insights · About · Partner With Us · Footer
 *
 * The Zod schemas in `src/content.config.ts` validate the files at build time;
 * `src/lib/content.ts` maps entries to these types. Nothing else should read
 * collections directly.
 */

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export type ID = string;
export type Slug = string;
/** ISO-8601 date or datetime. */
export type ISODate = string;
/** Rich text: the Markdown body of an entry, rendered to HTML at build time. */
export type RichText = string;

export interface Media {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position, e.g. "50% 30%". */
  focalPoint?: string;
  kind?: "image" | "video";
  /** Poster frame for video. */
  poster?: string;
}

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface Stat {
  value: string; // "8.5M", "$316M+"
  label: string; // "Readership"
}

export interface Seo {
  title?: string;
  description?: string;
  image?: Media;
  noIndex?: boolean;
}

interface Document {
  id: ID;
  slug: Slug;
  seo?: Seo;
  updatedAt?: ISODate;
}

/* ------------------------------------------------------------------ */
/* Taxonomy                                                            */
/* ------------------------------------------------------------------ */

export type BrandCategory = "Media" | "Festival" | "Studios" | "Community" | "Beauty";

export type ExperienceFormat =
  | "Festival"
  | "Franchise"
  | "Live experience"
  | "Summit"
  | "Activation"
  | "Party series"
  | "Dinner & Awards"
  | "Print"
  | "Branded experience";

/* ------------------------------------------------------------------ */
/* Products (NEW) — Media & Advertising, Branded Content & Production,  */
/* Experiential, THEIA (Creator & Talent), Research & Cultural Insights */
/* ------------------------------------------------------------------ */

export interface Product extends Document {
  name: string;
  /** One-line promise, e.g. "Bring brands into culture." */
  tagline: string;
  summary: string;
  body?: RichText;
  hero?: Media;
  /** Named offerings shown as a ruled list, e.g. "Sundial One", "Programmatic". */
  offerings: string[];
  relatedBrands?: ID[];
  relatedCaseStudies?: ID[];
  order: number;
}

/* ------------------------------------------------------------------ */
/* Brands — overview page + consistent commercial template per brand   */
/* ------------------------------------------------------------------ */

export interface Brand extends Document {
  name: string;
  category: BrandCategory;
  /** Short brand line, e.g. "We Love Us". */
  tagline: string;
  /** Territory statement, e.g. "Culture, celebration, and collective experience." */
  territory: string;
  description: string;
  logo: Media;
  hero: Media;
  stats: Stat[];
  website: Link;
  socials?: Link[];
  /** Commercial template fields. */
  audience?: RichText;
  partnershipOpportunities?: string[];
  featuredCaseStudies?: ID[];
  order: number;
}

/* ------------------------------------------------------------------ */
/* Experiences (REFINE) — upcoming, detail/sponsorship, past & recaps  */
/* ------------------------------------------------------------------ */

export type ExperienceStatus = "upcoming" | "live" | "past";

export interface SponsorshipTier {
  name: string;
  description?: string;
  benefits: string[];
}

export interface Experience extends Document {
  name: string;
  format: ExperienceFormat;
  /** Presenting brand. */
  brand: ID;
  location: string;
  status: ExperienceStatus;
  startDate?: ISODate;
  endDate?: ISODate;
  summary: string;
  body?: RichText;
  hero: Media;
  gallery?: Media[];
  stats?: Stat[];
  /** Event detail / sponsorship pages. */
  sponsorship?: {
    overview?: RichText;
    tiers?: SponsorshipTier[];
    deckUrl?: string;
    contact?: Link;
  };
  /** Sort order on listings. */
  order: number;
  /** Past experiences & recaps. */
  recap?: {
    title: string;
    excerpt: string;
    body?: RichText;
    media?: Media[];
  };
}

/* ------------------------------------------------------------------ */
/* Our Work (NEW) — campaign case studies                              */
/* ------------------------------------------------------------------ */

export interface CaseStudy extends Document {
  title: string;
  client: string;
  /** Kicker, e.g. "Festival · Recap". */
  kicker: string;
  excerpt: string;
  hero: Media;
  challenge?: RichText;
  approach?: RichText;
  results?: Stat[];
  body?: RichText;
  gallery?: Media[];
  brands: ID[];
  products: ID[];
  experiences?: ID[];
  publishedAt: ISODate;
  featured?: boolean;
}

/* ------------------------------------------------------------------ */
/* Insights (REFINE) — individual report pages                         */
/* ------------------------------------------------------------------ */

export interface InsightReport extends Document {
  title: string;
  kicker: string; // e.g. "Sundial Intelligence"
  summary: string;
  cover: Media;
  keyFindings: Stat[];
  body?: RichText;
  /** Gated or downloadable PDF. */
  download?: { url: string; gated: boolean };
  publishedAt: ISODate;
}

/* ------------------------------------------------------------------ */
/* About (REFINE) — Our Story, Leadership, Ecosystem & Impact          */
/* ------------------------------------------------------------------ */

export interface Person extends Document {
  name: string;
  role: string;
  bio?: RichText;
  portrait?: Media;
  quote?: string;
  order: number;
}

export interface Value {
  title: string;
  description: string;
}

export interface Partner {
  id: ID;
  name: string;
  logo: Media;
  url: string;
  /** Ecosystem & Impact grouping. */
  kind: "foundation" | "fund" | "marketplace" | "forum" | "other";
}

/* ------------------------------------------------------------------ */
/* Pages & modular sections                                            */
/* ------------------------------------------------------------------ */

/** Heading split into lines; each line is revealed/broken separately. */
export type Lines = string[];
/** [label, aside], e.g. ["01 — Our experiences", "Festivals & live"]. `{count}` in the aside is replaced with the item count. */
export type EyebrowText = [string, string];

/**
 * Each page is an ordered list of sections, written as `sections:` in the
 * page's frontmatter (`src/content/pages/*.md`). Every section maps 1:1 to a
 * component, rendered by `src/components/sections/Sections.astro`.
 * Sections that list brands, experiences, etc. pull them from their collections.
 */
export type Section =
  | { type: "pageHead"; title: string; intro?: string }
  | { type: "hero"; title: Lines; hint?: string; media: Media }
  | { type: "statement"; text: string; eyebrow?: EyebrowText; stats?: Stat[] }
  | { type: "brandStack"; brands: ID[]; cta?: Link }
  | {
      type: "experienceCarousel";
      eyebrow: EyebrowText;
      heading: Lines;
      /** How many experiences to show (in `order`). Default: all. */
      limit?: number;
      statement?: { heading: string; text: string; cta?: Link };
    }
  | { type: "highlights"; eyebrow: EyebrowText; heading: Lines; intro?: string; featuredOnly?: boolean }
  | { type: "formatList"; heading: string; items: { label: string; href: string; media?: Media }[]; cta?: Link }
  | { type: "accentBand"; eyebrow: string; heading: Lines; versus: { title: string; caption: string }[]; quote: string; text: string }
  | { type: "capabilities"; eyebrow: EyebrowText; heading: Lines; limit?: number }
  | { type: "brandIndex"; heading: string; show: ("partners" | "brands")[] }
  | { type: "invitation"; heading: Lines; text: string; cta: Link }
  | { type: "experienceList"; cta?: Link }
  | { type: "brandDirectory"; cta?: Link }
  | { type: "fullBleedImage"; media: Media }
  | { type: "founderSplit"; lead: string; person: ID; body: string[] }
  | { type: "philosophy"; title: string; lead: string; body: string[]; footnote?: string }
  | { type: "contact"; heading: Lines; text: string; cta: Link; meta?: string[] };

export type SectionType = Section["type"];

export interface Page extends Document {
  title: string;
  sections: Section[];
}

/* ------------------------------------------------------------------ */
/* Global settings — navigation + footer                               */
/* ------------------------------------------------------------------ */

export interface NavItem extends Link {
  children?: Link[];
}

export interface SiteSettings {
  name: string;
  tagline: string;
  /** Primary navigation (Products → About). */
  nav: NavItem[];
  /** "Partner With Us": the prominent primary action. */
  primaryAction: Link;
  socials: Link[];
  footer: {
    /** Careers, General / Press Contact. */
    company: Link[];
    /** Legal, Privacy & Accessibility. */
    legal: Link[];
    copyright: string;
  };
  contactEmail?: string;
}
