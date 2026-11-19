"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatList } from "@/components/ui/StatList";
import styles from "./Statement.module.scss";

type Props = { text: string; eyebrow?: [string, string]; stats?: Stat[] };

/** Statement paragraph whose words fill in as you scroll, plus portfolio stats. */
export function Statement({ text, eyebrow, stats }: Props) {
  const words = text.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [words.length]);

  return (
    <section className={styles.section}>
      <p ref={ref} className={styles.text} aria-label={text}>
        {words.map((w, i) => (
          <span key={i} aria-hidden className={i < lit ? styles.on : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
      {stats && (
        <div className={styles.stats}>
          {eyebrow && <Eyebrow label={eyebrow[0]} aside={eyebrow[1]} />}
          <StatList stats={stats} variant="feature" />
        </div>
      )}
    </section>
  );
}
