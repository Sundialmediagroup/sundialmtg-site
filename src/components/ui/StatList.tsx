import type { Stat } from "@/types/content";
import styles from "./StatList.module.scss";

type Props = { stats: Stat[]; variant?: "inline" | "feature"; className?: string };

/** `feature` renders a trailing "+" in the accent color, as in the prototype. */
export function StatList({ stats, variant = "inline", className }: Props) {
  return (
    <div className={[styles[variant], className].filter(Boolean).join(" ")}>
      {stats.map((s) => {
        const plus = variant === "feature" && s.value.endsWith("+");
        return (
          <div key={s.label}>
            <b className={styles.value}>
              {plus ? s.value.slice(0, -1) : s.value}
              {plus && <i>+</i>}
            </b>
            <span className={styles.label}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
