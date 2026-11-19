import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { Highlights } from "@/components/sections/Highlights";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "Our Work" };

// NEW in the sitemap: campaign case studies. Index only for now.
export default async function OurWorkPage() {
  const caseStudies = await cms.getCaseStudies();
  return (
    <>
      <PageHead title="Our work" intro="Campaigns and partnerships from across the Sundial portfolio." />
      <Highlights eyebrow={["Case studies", `${caseStudies.length} stories`]} heading={["Moments that", "move culture."]} items={caseStudies} />
    </>
  );
}
