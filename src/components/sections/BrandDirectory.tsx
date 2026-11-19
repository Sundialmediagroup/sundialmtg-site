"use client";

import { useEffect, useRef, useState } from "react";
import type { Brand, Link } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatList } from "@/components/ui/StatList";
import styles from "./BrandDirectory.module.scss";

type Props = { brands: Brand[]; cta?: Link };

export function BrandDirectory({ brands, cta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-i]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sticky} aria-hidden>
        {brands.map((b, i) => (
          <MediaFrame key={b.id} media={b.hero} ratio="fill" sizes="420px" className={i === active ? styles.on : undefined} />
        ))}
      </div>
      <div className={styles.items} ref={ref}>
        {brands.map((b, i) => (
          <article key={b.id} id={b.slug} data-i={i} className={styles.item}>
            <MediaFrame media={b.hero} ratio="photo" sizes="100vw" className={styles.inlineMedia} />
            <p className={styles.meta}>
              {b.category} · {b.tagline}
            </p>
            <h2 className={styles.name}>{b.name}</h2>
            <p className={styles.territory}>{b.territory}</p>
            <p>{b.description}</p>
            <StatList stats={b.stats} />
            <CtaLink {...b.website} />
          </article>
        ))}
        {cta && (
          <div>
            <CtaLink {...cta} />
          </div>
        )}
      </div>
    </section>
  );
}
