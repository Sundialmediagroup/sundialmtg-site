/**
 * SMG Website content model (SUN-1124).
 *
 * The contract between NovaCMS and the frontend. Shapes follow the proposed
 * sitemap:
 *   Home · Products · Brands · Experiences · Our Work · Insights · About · Partner With Us · Footer
 *
 * Keep these aligned with e360-api (Nova) types. The MVP reads from an
 * independent Nova instance via `src/lib/cms`; nothing else should import
 * raw CMS payloads.
 */

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export type ID = string;
export type Slug = string;
/** ISO-8601 date or datetime. */
export type ISODate = string;
/** Rich text from the CMS, already rendered to sanitised HTML. */
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

/**
 * Each page is an ordered list of sections. Every section maps 1:1 to a
 * component in `src/components/sections`.
 */
export type Section =
  | { type: "hero"; title: string; scrollHint?: string; media: Media }
  | { type: "statement"; text: string; eyebrow?: [string, string]; stats?: Stat[] }
  | { type: "brandStack"; brands: ID[]; cta?: Link }
  | {
      type: "experienceCarousel";
      eyebrow: [string, string];
      heading: string;
      items: { title: string; caption: string; media: Media; href: string }[];
      statement?: { heading: string; text: string; cta?: Link };
    }
  | {
      type: "highlights";
      eyebrow: [string, string];
      heading: string;
      intro?: string;
      items: { kicker: string; title: string; excerpt: string; media: Media; href: string }[];
    }
  | { type: "formatList"; heading: string; items: { label: string; href: string; media?: Media }[]; cta?: Link }
  | {
      type: "accentBand";
      eyebrow: string;
      heading: string;
      versus: { title: string; caption: string }[];
      quote: string;
      text: string;
    }
  | { type: "capabilities"; eyebrow: [string, string]; heading: string; products: ID[] }
  | { type: "brandIndex"; heading: string; brands: ID[]; partners?: ID[] }
  | { type: "invitation"; heading: string; text: string; cta: Link };

export interface Page extends Document {
  title: string;
  intro?: string;
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
    /** External Brand Sites. */
    brandSites: Link[];
    /** Legal, Privacy & Accessibility. */
    legal: Link[];
    copyright: string;
  };
  contactEmail?: string;
}
