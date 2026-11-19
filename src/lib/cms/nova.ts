/**
 * Nova adapter: reads the SMG CMS (Laravel Nova + Lighthouse GraphQL, ~/Sites/sundialmtg-cms).
 * The same queries will later run against e360-api.
 *
 * Env: NOVA_GRAPHQL_URL (e.g. http://127.0.0.1:8000/graphql)
 */
import { cacheLife, cacheTag } from "next/cache";
import type { Brand, CaseStudy, Experience, Media, Partner, Product, SiteSettings, Stat, Value } from "@/types/content";
import type { CmsAdapter } from "./adapter";

const PLACEHOLDER: Media = { src: "/placeholder.svg", alt: "" };

type GqlMedia = { src: string; alt: string; focalPoint: string | null; width: number | null; height: number | null } | null;

const MEDIA = "src alt focalPoint width height";
const LINK = "label href external";

const BRAND_FIELDS = `id slug name category tagline territory description audience partnershipOpportunities order seo
  logo { ${MEDIA} } hero { ${MEDIA} } stats { value label } website { ${LINK} }`;
const PRODUCT_FIELDS = `id slug name tagline summary body offerings order seo hero { ${MEDIA} }
  relatedBrands { slug } relatedCaseStudies { slug }`;
const EXPERIENCE_FIELDS = `id slug name format location status startDate endDate summary body seo
  brand { slug } hero { ${MEDIA} } gallery { ${MEDIA} } stats { value label }
  sponsorship { overview deckUrl tiers { name description benefits } }
  recap { title excerpt body media { ${MEDIA} } }`;
const CASE_STUDY_FIELDS = `id slug title client kicker excerpt challenge approach body publishedAt featured seo
  hero { ${MEDIA} } gallery { ${MEDIA} } results { value label }
  brands { slug } products { slug } experiences { slug }`;

async function query<T>(document: string, variables: Record<string, unknown> = {}): Promise<T> {
  "use cache";
  cacheLife("minutes");
  cacheTag("cms");

  const url = process.env.NOVA_GRAPHQL_URL;
  if (!url) throw new Error("NOVA_GRAPHQL_URL is not set (required when CMS_SOURCE=nova)");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: document, variables }),
  });
  if (!res.ok) throw new Error(`Nova GraphQL ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`Nova GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  return json.data as T;
}

/* ---------------- mappers: GraphQL → src/types/content.ts ---------------- */

const media = (m: GqlMedia): Media | undefined =>
  m ? { src: m.src, alt: m.alt, focalPoint: m.focalPoint ?? undefined, width: m.width ?? undefined, height: m.height ?? undefined } : undefined;

const slugs = (rows?: { slug: string }[] | null) => (rows ?? []).map((r) => r.slug);

/* eslint-disable @typescript-eslint/no-explicit-any -- raw GraphQL rows */
const toBrand = (b: any): Brand => ({
  id: b.slug,
  slug: b.slug,
  name: b.name,
  category: b.category,
  tagline: b.tagline,
  territory: b.territory,
  description: b.description,
  logo: media(b.logo) ?? { ...PLACEHOLDER, alt: b.name },
  hero: media(b.hero) ?? PLACEHOLDER,
  stats: b.stats as Stat[],
  website: b.website,
  audience: b.audience ?? undefined,
  partnershipOpportunities: b.partnershipOpportunities,
  order: b.order,
  seo: b.seo ?? undefined,
});

const toProduct = (p: any): Product => ({
  id: p.slug,
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  summary: p.summary,
  body: p.body ?? undefined,
  hero: media(p.hero),
  offerings: p.offerings,
  relatedBrands: slugs(p.relatedBrands),
  relatedCaseStudies: slugs(p.relatedCaseStudies),
  order: p.order,
  seo: p.seo ?? undefined,
});

const toExperience = (e: any): Experience => ({
  id: e.slug,
  slug: e.slug,
  name: e.name,
  format: e.format,
  brand: e.brand?.slug ?? "",
  location: e.location,
  status: String(e.status).toLowerCase() as Experience["status"],
  startDate: e.startDate ?? undefined,
  endDate: e.endDate ?? undefined,
  summary: e.summary,
  body: e.body ?? undefined,
  hero: media(e.hero) ?? { ...PLACEHOLDER, alt: e.name },
  gallery: (e.gallery as GqlMedia[]).map(media).filter((m): m is Media => !!m),
  stats: e.stats,
  sponsorship: e.sponsorship
    ? { overview: e.sponsorship.overview ?? undefined, tiers: e.sponsorship.tiers, deckUrl: e.sponsorship.deckUrl ?? undefined }
    : undefined,
  recap: e.recap
    ? { title: e.recap.title, excerpt: e.recap.excerpt, body: e.recap.body ?? undefined, media: (e.recap.media as GqlMedia[]).map(media).filter((m): m is Media => !!m) }
    : undefined,
  seo: e.seo ?? undefined,
});

const toCaseStudy = (c: any): CaseStudy => ({
  id: c.slug,
  slug: c.slug,
  title: c.title,
  client: c.client,
  kicker: c.kicker,
  excerpt: c.excerpt,
  hero: media(c.hero) ?? PLACEHOLDER,
  challenge: c.challenge ?? undefined,
  approach: c.approach ?? undefined,
  results: c.results,
  body: c.body ?? undefined,
  gallery: (c.gallery as GqlMedia[]).map(media).filter((m): m is Media => !!m),
  brands: slugs(c.brands),
  products: slugs(c.products),
  experiences: slugs(c.experiences),
  publishedAt: c.publishedAt ?? "",
  featured: c.featured,
  seo: c.seo ?? undefined,
});

const toPartner = (p: any): Partner => ({
  id: p.slug,
  name: p.name,
  url: p.url,
  kind: String(p.kind).toLowerCase() as Partner["kind"],
  logo: media(p.logo) ?? { ...PLACEHOLDER, alt: p.name },
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export const novaAdapter: CmsAdapter = {
  async getSettings() {
    const { siteSettings } = await query<{ siteSettings: SiteSettings }>(`{
      siteSettings { name tagline contactEmail nav { ${LINK} } primaryAction { ${LINK} } socials { ${LINK} }
        footer { copyright company { ${LINK} } brandSites { ${LINK} } legal { ${LINK} } } }
    }`);
    return { ...siteSettings, contactEmail: siteSettings.contactEmail ?? undefined };
  },
  async getBrands() {
    const { brands } = await query<{ brands: unknown[] }>(`{ brands { ${BRAND_FIELDS} } }`);
    return brands.map(toBrand);
  },
  async getBrand(slug) {
    const { brand } = await query<{ brand: unknown | null }>(`query ($slug: String!) { brand(slug: $slug) { ${BRAND_FIELDS} } }`, { slug });
    return brand ? toBrand(brand) : undefined;
  },
  async getExperiences() {
    const { experiences } = await query<{ experiences: unknown[] }>(`{ experiences { ${EXPERIENCE_FIELDS} } }`);
    return experiences.map(toExperience);
  },
  async getProducts() {
    const { products } = await query<{ products: unknown[] }>(`{ products { ${PRODUCT_FIELDS} } }`);
    return products.map(toProduct);
  },
  async getCaseStudies() {
    const { caseStudies } = await query<{ caseStudies: unknown[] }>(`{ caseStudies { ${CASE_STUDY_FIELDS} } }`);
    return caseStudies.map(toCaseStudy);
  },
  async getPartners() {
    const { partners } = await query<{ partners: unknown[] }>(`{ partners { slug name url kind logo { ${MEDIA} } } }`);
    return partners.map(toPartner);
  },
  async getValues() {
    const { values } = await query<{ values: Value[] }>(`{ values { title description } }`);
    return values;
  },
};
