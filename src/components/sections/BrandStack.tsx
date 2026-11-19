"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Brand, Link as LinkT } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./BrandStack.module.scss";

type Props = { brands: Brand[]; cta?: LinkT };

export function BrandStack({ brands, cta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const tiles = ref.current?.querySelectorAll<HTMLElement>("[data-brand]");
    if (!tiles) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute("data-brand"))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.col} ref={ref}>
        {brands.map((b) => (
          <Link key={b.id} href={`/brands#${b.slug}`} data-brand={b.id} className={[styles.tile, active === b.id && styles.on].filter(Boolean).join(" ")}>
            <span className={styles.logo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.logo.src} alt={b.name} />
            </span>
            <MediaFrame media={b.hero} ratio="fill" sizes="460px" className={styles.photo} />
          </Link>
        ))}
      </div>
      {cta && (
        <div className={styles.more}>
          <CtaLink {...cta} />
        </div>
      )}
    </section>
  );
}
