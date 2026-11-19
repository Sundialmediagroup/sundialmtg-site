import * as data from "@/content/fixtures";
import type { CmsAdapter } from "./adapter";

export const fixtureAdapter: CmsAdapter = {
  getSettings: async () => data.settings,
  getBrands: async () => [...data.brands].sort((a, b) => a.order - b.order),
  getBrand: async (slug) => data.brands.find((b) => b.slug === slug),
  getExperiences: async () => data.experiences,
  getProducts: async () => [...data.products].sort((a, b) => a.order - b.order),
  getCaseStudies: async () => data.caseStudies,
  getPartners: async () => data.partners,
  getValues: async () => data.values,
};
