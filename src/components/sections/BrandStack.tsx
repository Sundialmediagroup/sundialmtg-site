import { useEffect, useRef, useState } from "react";
import type { Brand, Link as LinkT } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./BrandStack.module.scss";

type Props = { brands: Brand[]; cta?: LinkT };

/** Allow a line break at camel-case joins ("NaturallyCurly" → "Naturally|Curly") for the narrow mobile labels. */
function breakable(name: string) {
  return name.split(/(?<=[a-z])(?=[A-Z])/).flatMap((part, i) => (i ? [<wbr key={i} />, part] : [part]));
}

/**
 * Tall stack of brand tiles. The tile nearest the viewport centre swaps its logo for a photo,
 * and its name (left) and category (right) show in a sticky label row at mid-screen.
 */
export function BrandStack({ brands, cta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | undefined>(brands[0]?.id);
  const current = brands.find((b) => b.id === active);

  useEffect(() => {
    const tiles = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-brand]") ?? []);
    if (!tiles.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = tiles[0];
      let bestDist = Infinity;
      for (const t of tiles) {
        const r = t.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) [best, bestDist] = [t, d];
      }
      setActive(best.dataset.brand);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.body}>
        <div className={styles.labels} aria-hidden>
          <div>
            <span>{current && breakable(current.name)}</span>
            <span>{current?.category}</span>
          </div>
        </div>
        <div className={styles.col} ref={ref}>
          {brands.map((b) => (
            <a key={b.id} href={`/brands/#${b.slug}`} data-brand={b.id} className={[styles.tile, active === b.id && styles.on].filter(Boolean).join(" ")}>
              <span className={styles.logo}>
                <img src={b.logo.src} alt={b.name} />
              </span>
              <MediaFrame media={b.hero} ratio="fill" sizes="460px" className={styles.photo} />
            </a>
          ))}
        </div>
      </div>
      {cta && (
        <div className={styles.more}>
          <CtaLink {...cta} />
        </div>
      )}
    </section>
  );
}
