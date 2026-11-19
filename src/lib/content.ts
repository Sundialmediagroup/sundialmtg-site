/**
 * The only module that reads content collections. Pages and components get
 * typed data from here (`src/types/content.ts`), never from `astro:content`.
 * Runs at build time only.
 */
import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import type {
  Brand,
  CaseStudy,
  Experience,
  InsightReport,
  Page,
  Partner,
  Person,
  Product,
  Section,
  SiteSettings,
  Value,
} from "@/types/content";

type Ref = { id: string };
const ids = (refs?: Ref[]) => refs?.map((r) => r.id);
const iso = (d?: Date) => d?.toISOString().slice(0, 10);
/** Markdown body rendered to HTML, or undefined when the body is empty. */
const html = (e: { rendered?: { html: string } }) => e.rendered?.html.trim() || undefined;
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getSettings(): Promise<SiteSettings> {
  const entry = await getEntry("settings", "site");
  if (!entry) throw new Error('src/content/settings.yaml needs a top-level "site:" key');
  return entry.data;
}

export async function getBrands(): Promise<Brand[]> {
  const entries = await getCollection("brands");
  return entries
    .map(({ id, data, ...e }) => ({ ...data, id, slug: id, audience: html(e), featuredCaseStudies: ids(data.featuredCaseStudies) }))
    .sort(byOrder);
}

export async function getExperiences(): Promise<Experience[]> {
  const entries = await getCollection("experiences");
  return entries
    .map(({ id, data, ...e }) => ({
      ...data,
      id,
      slug: id,
      brand: data.brand.id,
      startDate: iso(data.startDate),
      endDate: iso(data.endDate),
      body: html(e),
    }))
    .sort(byOrder);
}

export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection("products");
  return entries
    .map(({ id, data, ...e }) => ({
      ...data,
      id,
      slug: id,
      body: html(e),
      relatedBrands: ids(data.relatedBrands),
      relatedCaseStudies: ids(data.relatedCaseStudies),
    }))
    .sort(byOrder);
}

/** Our Work, newest first. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await getCollection("work");
  return entries
    .map(({ id, data, ...e }) => ({
      ...data,
      id,
      slug: id,
      body: html(e),
      brands: data.brands.map((r) => r.id),
      products: data.products.map((r) => r.id),
      experiences: ids(data.experiences),
      publishedAt: iso(data.publishedAt)!,
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Insights, newest first. */
export async function getInsights(): Promise<InsightReport[]> {
  const entries = await getCollection("insights");
  return entries
    .map(({ id, data, ...e }) => ({ ...data, id, slug: id, body: html(e), publishedAt: iso(data.publishedAt)! }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPeople(): Promise<Person[]> {
  const entries = await getCollection("people");
  return entries.map(({ id, data, ...e }) => ({ ...data, id, slug: id, bio: html(e) })).sort(byOrder);
}

export async function getPartners(): Promise<Partner[]> {
  const entries = await getCollection("partners");
  return entries
    .map(({ id, data }) => ({ ...data, id }))
    .sort(byOrder)
    .map(({ order: _order, ...p }) => p);
}

export async function getValues(): Promise<Value[]> {
  const entries = await getCollection("values");
  return entries
    .map(({ data }) => data)
    .sort(byOrder)
    .map(({ order: _order, ...v }) => v);
}

type PageSection = CollectionEntry<"pages">["data"]["sections"][number];

function toSection(s: PageSection): Section {
  switch (s.type) {
    case "brandStack":
      return { ...s, brands: s.brands.map((r) => r.id) };
    case "founderSplit":
      return { ...s, person: s.person.id };
    default:
      return s;
  }
}

/** `id` is the file name in src/content/pages: "index", "about", … */
export async function getPage(id: string): Promise<Page> {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`Missing page content: src/content/pages/${id}.md`);
  return { ...entry.data, id, slug: id, sections: entry.data.sections.map(toSection) };
}

export async function getPages(): Promise<Page[]> {
  const entries = await getCollection("pages");
  return Promise.all(entries.map((e) => getPage(e.id)));
}
