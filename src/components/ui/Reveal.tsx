import type { ElementType } from "react";
import styles from "./Reveal.module.scss";

type Props = { as?: ElementType; lines: string[]; className?: string; id?: string };

/**
 * Line-by-line masked reveal when scrolled into view.
 * Static markup: `src/scripts/reveal.ts` sets `data-in` once the element is visible,
 * so sections using it don't need to hydrate.
 */
export function Reveal({ as: Tag = "h2", lines, className, id }: Props) {
  return (
    <Tag id={id} className={className} data-reveal="">
      {lines.map((l, i) => (
        <span key={i} className={styles.line}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
