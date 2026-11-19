"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import styles from "./Reveal.module.scss";

type Props = { as?: ElementType; lines: string[]; className?: string; id?: string };

/** Line-by-line masked reveal when scrolled into view. */
export function Reveal({ as: Tag = "h2", lines, className, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={[className, inView && styles.in].filter(Boolean).join(" ")}>
      {lines.map((l, i) => (
        <span key={i} className={styles.line}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
