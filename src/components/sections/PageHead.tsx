import type { ReactNode } from "react";
import styles from "./PageHead.module.scss";

type Props = { title: string; intro?: string; children?: ReactNode };

/** Oversized page title used at the top of every inner page. */
export function PageHead({ title, intro, children }: Props) {
  return (
    <section className={styles.head}>
      <h1 className={styles.title}>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
      {children}
    </section>
  );
}
