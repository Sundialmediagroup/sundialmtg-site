import type { Brand, CaseStudy, Experience, Media, Product } from "@/types/content";
import { TokenList } from "./TokenList";
import { Logo } from "@/components/brand/Logo";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { CtaLink } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading, type HeadingSize } from "@/components/ui/Heading";
import { MediaCard } from "@/components/ui/MediaCard";
import { StatList } from "@/components/ui/StatList";
import { AccentBand } from "@/components/sections/AccentBand";
import { BrandIndex } from "@/components/sections/BrandIndex";
import { Capabilities } from "@/components/sections/Capabilities";
import { EventAccordion } from "@/components/sections/EventAccordion";
import { FormatList } from "@/components/sections/FormatList";
import { Invitation } from "@/components/sections/Invitation";
import s from "./styleguide.module.scss";

const TYPE_SAMPLES: Record<string, string> = {
  "display-xl": "Brands",
  "display-lg": "Our cultural advantage",
  "display-md": "Sundial Media & Technology Group",
  "heading-lg": "We create the spaces people want to be part of.",
  statement: "Sundial is a human connections company.",
  lead: "Sundial has spent decades creating spaces where connections happen.",
  "heading-md": "Festivals & Mega Events",
  "heading-sm": "Culture, celebration, and collective experience.",
  title: "Experiential",
  subtitle: "Bring brands into culture.",
  body: "Our festivals, franchises, and cultural experiences invite brands to participate.",
  "body-sm": "From the main stage to Wellness House, a look at the moments that mattered.",
  nav: "Brands  Experiences  About",
  label: "01 — Our experiences",
  cta: "Partner with Sundial",
  "stat-xl": "190M",
  "stat-lg": "15+",
};

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className={s.block}>
      <div className={s.blockTitle}>
        <span>{title}</span>
        {note && <span className="u-mute">{note}</span>}
      </div>
      {children}
    </section>
  );
}

type Props = {
  brands: Brand[];
  experiences: Experience[];
  products: Product[];
  caseStudies: CaseStudy[];
  formats: { label: string; href: string; media?: Media }[];
};

/** Rendered by src/pages/styleguide.astro and hydrated as one island, so every demo is interactive. */
export function Styleguide({ brands, experiences, products, caseStudies, formats }: Props) {
  const name = new Map(brands.map((b) => [b.id, b.name]));

  return (
    <div className={s.page}>
      <Block title="Styleguide" note="SUN-1126 · tokens in src/styles/tokens">
        <Heading as="h1" size="display-xl">
          Styleguide
        </Heading>
      </Block>

      <Block title="Color" note="--color-*">
        <TokenList kind="color" />
      </Block>

      <Block title="Typography" note="Helvetica Neue Light · 300 · @include type(name)">
        <TokenList kind="type" samples={TYPE_SAMPLES} />
      </Block>

      <Block title="Spacing" note="space(n) · 16px grid gutter">
        <TokenList kind="space" />
      </Block>

      <Block title="Brand mark" note="Logo · wordmark / emblem">
        <div className={s.demoRow}>
          <Logo className={s.mark} />
          <Logo variant="emblem" className={s.emblem} />
        </div>
        <div className={s.dark} data-tone="dark" style={{ marginTop: 16 }}>
          <div className={s.demoRow}>
            <Logo className={s.mark} />
            <Logo variant="emblem" className={s.emblem} />
          </div>
        </div>
      </Block>

      <Block title="Actions" note="CtaLink · Button">
        <div className={s.demoRow}>
          <CtaLink label="Partner with Sundial" href="/partner/" />
          <Button href="/partner/">Partner with us ↗</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </Block>

      <Block title="Eyebrow · Headings">
        <Eyebrow label="01 — Our experiences" aside="Festivals, franchises & live experiences" />
        {(["heading-lg", "heading-md", "title"] as HeadingSize[]).map((size) => (
          <Heading key={size} size={size}>
            {size}: We show up where culture lives.
          </Heading>
        ))}
      </Block>

      <Block title="Stats" note="StatList · feature / inline">
        <StatList variant="feature" stats={[{ value: "15+", label: "Brands" }, { value: "190M+", label: "People connected across Sundial" }, { value: "200+", label: "Years of brand history" }]} />
        <div style={{ marginTop: 40 }}>
          <StatList stats={brands[0].stats} />
        </div>
      </Block>

      <Block title="Cards" note="MediaCard · ArticleCard">
        <div className={s.cards}>
          {experiences.slice(0, 3).map((e) => (
            <MediaCard key={e.id} title={e.name} caption={`${e.format} · ${e.location}`} media={e.hero} href={`/experiences/#${e.slug}`} />
          ))}
        </div>
        <div className={s.cards} style={{ marginTop: 16, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {caseStudies.map((c) => (
            <ArticleCard key={c.id} kicker={c.kicker} title={c.title} excerpt={c.excerpt} media={c.hero} href="#" />
          ))}
        </div>
      </Block>

      <Block title="Accordion" note="EventAccordion">
        <EventAccordion experiences={experiences.slice(0, 4).map((e) => ({ ...e, brandName: name.get(e.brand) ?? "" }))} />
      </Block>

      <Block title="Sections" note="Full-width page sections">
        <p className={s.note}>FormatList · AccentBand · Capabilities · BrandIndex · Invitation. Hero, Statement, BrandStack, ExperienceCarousel and BrandDirectory are shown on their pages.</p>
      </Block>
      <FormatList heading="Experiences" items={formats} />
      <AccentBand
        eyebrow="The brand opportunity"
        heading={["Reach gets you seen.", "Belonging gives you a place."]}
        versus={[{ title: "Reach", caption: "Being seen" }, { title: "Belonging", caption: "Being part of something" }]}
        quote="Move beyond visibility and become a trusted participant in culture."
        text="Brands can buy attention. Earning a meaningful place in people’s lives requires understanding what matters to them."
      />
      <Capabilities eyebrow={["03 — What we bring", "Products"]} heading={["Culture into infrastructure."]} products={products} />
      <BrandIndex heading="Brands" entries={brands.map((b) => ({ id: b.id, name: b.name, href: `/brands/#${b.slug}`, logo: b.logo }))} />
      <Invitation heading={["Don’t just reach culture.", "Become part of what moves it."]} text="Let’s create the experiences people want to be part of." cta={{ label: "Partner with Sundial", href: "/partner/" }} />
    </div>
  );
}
