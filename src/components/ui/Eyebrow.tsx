import styles from "./Eyebrow.module.scss";

type Props = { label: string; aside?: string; className?: string; tone?: "light" | "dark" };

/** Split label row above a section: "01 — Our experiences ... Festivals & live". */
export function Eyebrow({ label, aside, className, tone = "light" }: Props) {
  return (
    <div className={[styles.eyebrow, tone === "dark" && styles.onDark, className].filter(Boolean).join(" ")}>
      <span>{label}</span>
      {aside && <span className={styles.aside}>{aside}</span>}
    </div>
  );
}
