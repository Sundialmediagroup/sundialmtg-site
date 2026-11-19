import type { Link, Media } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { MediaCard } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "./Carousel";
import headingStyles from "@/components/ui/Heading.module.scss";
import styles from "./Editorial.module.scss";

type Props = {
  eyebrow: [string, string];
  heading: string[];
  items: { title: string; caption: string; media: Media; href: string }[];
  statement?: { heading: string; text: string; cta?: Link };
};

export function ExperienceCarousel({ eyebrow, heading, items, statement }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow label={eyebrow[0]} aside={eyebrow[1]} />
        <Reveal lines={heading} className={headingStyles["heading-lg"]} />
      </div>
      <Carousel label={eyebrow[0]}>
        {items.map((x) => (
          <MediaCard key={x.title} {...x} />
        ))}
      </Carousel>
      {statement && (
        <div className={styles.indent}>
          <Heading size="heading-lg">{statement.heading}</Heading>
          <p className={styles.indentText}>{statement.text}</p>
          {statement.cta && (
            <div className={styles.indentCta}>
              <CtaLink {...statement.cta} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
