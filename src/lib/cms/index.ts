/**
 * The only module the app should import CMS data from.
 * Switch sources with CMS_SOURCE=fixtures|nova (later: e360).
 */
import type { CmsAdapter } from "./adapter";
import { fixtureAdapter } from "./fixtures";
import { novaAdapter } from "./nova";

function resolveAdapter(): CmsAdapter {
  switch (process.env.CMS_SOURCE ?? "fixtures") {
    case "fixtures":
      return fixtureAdapter;
    case "nova":
      return novaAdapter;
    default:
      throw new Error(`Unknown CMS_SOURCE "${process.env.CMS_SOURCE}"`);
  }
}

export const cms = resolveAdapter();
export type { CmsAdapter };
