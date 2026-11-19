import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { CtaLink } from "@/components/ui/CtaLink";
import { EventAccordion } from "@/components/sections/EventAccordion";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "Experiences" };

export default async function ExperiencesPage() {
  const [experiences, brands] = await Promise.all([cms.getExperiences(), cms.getBrands()]);
  const name = new Map(brands.map((b) => [b.id, b.name]));
  return (
    <PageHead title="Experiences">
      <EventAccordion experiences={experiences.map((e) => ({ ...e, brandName: name.get(e.brand) ?? "" }))} />
      <div style={{ display: "flex", justifyContent: "center", padding: "clamp(50px, 6vw, 100px) 0" }}>
        <CtaLink label="Create a branded experience" href="/partner" />
      </div>
    </PageHead>
  );
}
