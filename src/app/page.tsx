import { cms } from "@/lib/cms";
import { formats, carouselBrandOrder } from "@/content/fixtures";
import { AccentBand } from "@/components/sections/AccentBand";
import { BrandIndex } from "@/components/sections/BrandIndex";
import { BrandStack } from "@/components/sections/BrandStack";
import { Capabilities } from "@/components/sections/Capabilities";
import { ExperienceCarousel } from "@/components/sections/ExperienceCarousel";
import { FormatList } from "@/components/sections/FormatList";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Invitation } from "@/components/sections/Invitation";
import { Statement } from "@/components/sections/Statement";

// The prototype's scroll-driven "universe" splash is intentionally out of scope.
export default async function Home() {
  const [brands, experiences, products, caseStudies, settings] = await Promise.all([
    cms.getBrands(),
    cms.getExperiences(),
    cms.getProducts(),
    cms.getCaseStudies(),
    cms.getSettings(),
  ]);
  const byId = new Map(brands.map((b) => [b.id, b]));

  return (
    <>
      <Hero title={["Sundial Media &", "Technology Group"]} media={{ src: "/media/p03.jpg", alt: "Two friends laughing over a tarot spread at home", focalPoint: "50% 38%" }} />
      <Statement
        text="Sundial is a human connections company, powered by brands and communities that create meaningful cultural connection."
        eyebrow={["The Sundial portfolio", "Media · Experiences · Studios · Community"]}
        stats={[
          { value: "15+", label: "Brands" },
          { value: "190M+", label: "People connected across Sundial" },
          { value: "200+", label: "Years of brand history" },
        ]}
      />
      <BrandStack brands={carouselBrandOrder.map((id) => byId.get(id)!).filter(Boolean)} cta={{ label: "View our brands", href: "/brands" }} />
      <ExperienceCarousel
        eyebrow={["01 — Our experiences", "Festivals, franchises & live experiences"]}
        heading={["We create the spaces", "people want to be part of."]}
        items={experiences.slice(0, 10).map((e) => ({ title: e.name, caption: `${e.format} · ${byId.get(e.brand)?.name ?? e.location}`, media: e.hero, href: `/experiences#${e.slug}` }))}
        statement={{
          heading: "We show up where culture lives.",
          text: "Through the stories people consume, the conversations they share, and the experiences they attend, Sundial creates opportunities for connection across the places culture happens.",
          cta: { label: "Explore experiences", href: "/experiences" },
        }}
      />
      <Highlights
        eyebrow={["02 — Highlights", "Stories from across the portfolio"]}
        heading={["Moments that", "move culture."]}
        intro="Stories, milestones and moments from the brands and experiences that bring our communities together."
        items={caseStudies.filter((c) => c.featured)}
      />
      <FormatList heading="Experiences" items={formats} cta={{ label: "Explore our brands", href: "/brands" }} />
      <AccentBand
        eyebrow="The brand opportunity"
        heading={["Reach gets you seen.", "Belonging gives you a place."]}
        versus={[
          { title: "Reach", caption: "Being seen" },
          { title: "Belonging", caption: "Being part of something" },
        ]}
        quote="Move beyond visibility and become a trusted participant in culture."
        text="Brands can buy attention. Earning a meaningful place in people’s lives requires understanding what matters to them and contributing to the communities and experiences they value."
      />
      <Capabilities
        eyebrow={["03 — What we bring", "Culture into infrastructure"]}
        heading={["Sundial turns the power of", "human connection into", "lasting business value."]}
        products={products.slice(0, 4)}
      />
      <BrandIndex heading="Brands" entries={brands.map((b) => ({ id: b.id, name: b.name, href: `/brands#${b.slug}`, logo: b.logo }))} />
      <Invitation
        heading={["Don’t just reach culture.", "Become part of what moves it."]}
        text="Let’s create the experiences people want to be part of and the relationships that make brands matter beyond the moment."
        cta={{ label: "Partner with Sundial", href: settings.primaryAction.href }}
      />
    </>
  );
}
