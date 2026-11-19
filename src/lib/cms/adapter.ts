import type { Brand, CaseStudy, Experience, Partner, Product, SiteSettings, Value } from "@/types/content";

/**
 * Everything the site reads from a CMS. Implementations:
 * - `fixtureAdapter`: seed data from the prototype (current default)
 * - Nova adapter (SUN-1125): independent Nova instance for the MVP
 * - e360 adapter (post-MVP): e360-api
 */
export interface CmsAdapter {
  getSettings(): Promise<SiteSettings>;
  getBrands(): Promise<Brand[]>;
  getBrand(slug: string): Promise<Brand | undefined>;
  getExperiences(): Promise<Experience[]>;
  getProducts(): Promise<Product[]>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getPartners(): Promise<Partner[]>;
  getValues(): Promise<Value[]>;
}
