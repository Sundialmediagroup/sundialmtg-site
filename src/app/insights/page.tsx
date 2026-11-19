import type { Metadata } from "next";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "Insights" };

// REFINE in the sitemap. Waiting on report designs and the InsightReport content.
export default function InsightsPage() {
  return <PageHead title="Insights" intro="Research and cultural intelligence from Sundial Intelligence. Reports coming soon." />;
}
