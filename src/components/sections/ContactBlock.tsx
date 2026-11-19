import type { ReactNode } from "react";
import type { Link } from "@/types/content";
import styles from "./ContactBlock.module.scss";

type Props = { heading: string[]; text: string; cta: Link; meta?: string[]; children?: ReactNode };

/** Partner With Us. `children` is a slot for the enquiry form. */
export function ContactBlock({ heading, text, cta, meta = [], children }: Props) {
  return (
    <section className={styles.section}>
      <div>
        <h1 className={styles.title}>
          {heading.map((l, i) => (
            <span key={i} style={{ display: "block" }}>
              {l}
            </span>
          ))}
        </h1>
        <p className={styles.text}>{text}</p>
        <a className={styles.mail} href={cta.href} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noopener" : undefined}>
          {cta.label} ↗
        </a>
        {meta.map((m, i) => (
          <p key={i} className={styles.meta}>
            {m}
          </p>
        ))}
        {children && <div className={styles.slot}>{children}</div>}
      </div>
    </section>
  );
}
