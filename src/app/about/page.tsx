import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { FounderSplit, FullBleedImage, Philosophy } from "@/components/sections/About";
import { BrandIndex } from "@/components/sections/BrandIndex";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [partners, brands, values] = await Promise.all([cms.getPartners(), cms.getBrands(), cms.getValues()]);
  return (
    <>
      <PageHead
        title="Our story"
        intro="As technology makes content easier to create, genuine human connection becomes more valuable. People build their identities through the relationships, communities, and passions that shape their lives."
      />
      <FullBleedImage media={{ src: "/media/p12.jpg", alt: "", focalPoint: "50% 30%" }} />
      <FounderSplit
        lead="Sundial has spent decades creating spaces where those connections happen and culture takes shape. Sundial turns the power of human connection into lasting business value."
        person={{
          name: "Richelieu Dennis",
          role: "Founder",
          quote: "Our forward track must focus on including everyone, embracing everyone, and celebrating the beauty, and normalcy, of everyone’s differences.",
          portrait: { src: "/media/p08.jpg", alt: "", focalPoint: "50% 30%" },
        }}
        body={[
          "Sundial is, at its heart, a sacred space. Our collective offers a gathering point where culture thrives and people grow. We shape the conversations that create communities and a sense of belonging for everyone.",
          "We point the way. We adapt to the moment. We convene community.",
        ]}
      />
      <Philosophy
        title="Our cultural advantage"
        lead="Cultural relevance can’t be manufactured through reach alone."
        body={[
          "Our credibility comes from decades of showing up, telling stories, creating experiences, and building relationships with the communities we serve. That sustained presence gives us the cultural understanding and trust that cannot be replicated through media investment alone.",
          "Our advantage isn’t simply the audiences we reach. It’s the cultural trust we’ve earned, the communities we’ve built relationships with, and the experiences we create that give brands a meaningful place in people’s lives.",
        ]}
        footnote="Family and friends are the #1 source of optimism in young women’s personal lives. 7 in 10 Sundial audience members are focusing on their relationships to live happier, healthier lives. — Sundial Intelligence, Audience Census 2025"
        values={values}
      />
      <BrandIndex
        heading="Ecosystem"
        entries={[
          ...partners.map((p) => ({ id: p.id, name: p.name, href: p.url, logo: p.logo, external: true })),
          ...brands.map((b) => ({ id: b.id, name: b.name, href: `/brands#${b.slug}`, logo: b.logo })),
        ]}
      />
    </>
  );
}
