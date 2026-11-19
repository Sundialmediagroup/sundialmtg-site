import Link from "next/link";
import type { Product } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import headingStyles from "@/components/ui/Heading.module.scss";
import styles from "./Capabilities.module.scss";

type Props = { eyebrow: [string, string]; heading: string[]; products: Product[] };

/** Ruled grid of products/capabilities with offering lists. */
export function Capabilities({ eyebrow, heading, products }: Props) {
  return (
    <section className={styles.section}>
      <Eyebrow label={eyebrow[0]} aside={eyebrow[1]} />
      <Reveal lines={heading} className={[headingStyles["heading-lg"], styles.heading].join(" ")} />
      <div className={styles.grid}>
        {products.map((p, i) => (
          <article key={p.id} className={styles.item}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.name}>
              <Link href={`/products#${p.slug}`}>{p.name}</Link>
            </h3>
            <p className={styles.tagline}>{p.tagline}</p>
            <p className={styles.summary}>{p.summary}</p>
            <ul className={styles.offerings}>
              {p.offerings.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
