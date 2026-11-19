import type { Media } from "@/types/content";
import { CtaLink } from "./CtaLink";
import { MediaFrame } from "./MediaFrame";
import styles from "./ArticleCard.module.scss";

type Props = { kicker: string; title: string; excerpt: string; media: Media; href: string; cta?: string };

export function ArticleCard({ kicker, title, excerpt, media, href, cta = "Read the story" }: Props) {
  return (
    <a href={href} className={styles.card}>
      <MediaFrame media={media} ratio="fill" sizes="(max-width: 560px) 100vw, 50vw" imgClassName={styles.img} />
      <div className={styles.content}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <CtaLink as="span" label={cta} href={href} className={styles.cta} />
      </div>
    </a>
  );
}
