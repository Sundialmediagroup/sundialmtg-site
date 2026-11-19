import { useRef, useState } from "react";
import type { Link as LinkT, Media } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./FormatList.module.scss";

type Props = { heading: string; items: { label: string; href: string; media?: Media }[]; cta?: LinkT };

/** Oversized title + ruled list of links, with a cursor-following image peek. */
export function FormatList({ heading, items, cta }: Props) {
  const peek = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Media | null>(null);

  const move = (e: React.MouseEvent) => {
    if (peek.current) peek.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <ul className={styles.list} onMouseMove={move} onMouseLeave={() => setCurrent(null)}>
        {items.map((f) => (
          <li key={f.label}>
            <a href={f.href} className={styles.row} onMouseEnter={() => setCurrent(f.media ?? null)}>
              <span>{f.label}</span>
              <small aria-hidden>↗</small>
            </a>
          </li>
        ))}
      </ul>
      {cta && (
        <div className={styles.more}>
          <CtaLink {...cta} />
        </div>
      )}
      <div ref={peek} className={[styles.peek, current && styles.peekOn].filter(Boolean).join(" ")} aria-hidden>
        {current && <MediaFrame media={current} sizes="300px" />}
      </div>
    </section>
  );
}
