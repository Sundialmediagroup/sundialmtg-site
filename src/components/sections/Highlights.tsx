import type { CaseStudy } from "@/types/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import headingStyles from "@/components/ui/Heading.module.scss";
import styles from "./Editorial.module.scss";

type Props = { eyebrow: [string, string]; heading: string[]; intro?: string; items: CaseStudy[] };

/** Two-up featured stories (Our Work case studies). */
export function Highlights({ eyebrow, heading, intro, items }: Props) {
  return (
    <section className={styles.highlights}>
      <Eyebrow label={eyebrow[0]} aside={eyebrow[1]} />
      <div className={styles.top}>
        <Reveal lines={heading} className={headingStyles["heading-lg"]} />
        {intro && <p>{intro}</p>}
      </div>
      <div className={styles.pair}>
        {items.map((c) => (
          <ArticleCard key={c.id} kicker={c.kicker} title={c.title} excerpt={c.excerpt} media={c.hero} href={`/our-work/#${c.slug}`} />
        ))}
      </div>
    </section>
  );
}
