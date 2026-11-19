import type { Link as LinkT } from "@/types/content";
import styles from "./CtaLink.module.scss";

type Props = LinkT & { className?: string; as?: "a" | "span" };

/** Underlined uppercase CTA with ↗ arrow ("Partner with Sundial ↗"). */
export function CtaLink({ label, href, external, className, as = "a" }: Props) {
  const inner = (
    <>
      <span className={styles.label}>{label}</span>
      <span aria-hidden>↗</span>
    </>
  );
  const cls = [styles.link, className].filter(Boolean).join(" ");
  if (as === "span") return <span className={cls}>{inner}</span>;
  if (external)
    return (
      <a className={cls} href={href} target="_blank" rel="noopener">
        {inner}
      </a>
    );
  return (
    <a className={cls} href={href}>
      {inner}
    </a>
  );
}
