import Link from "next/link";
import type { Media } from "@/types/content";
import { MediaFrame } from "./MediaFrame";
import styles from "./MediaCard.module.scss";

type Props = { title: string; caption?: string; media: Media; href: string; sizes?: string };

export function MediaCard({ title, caption, media, href, sizes = "(max-width: 560px) 80vw, 33vw" }: Props) {
  return (
    <Link href={href} className={styles.card} draggable={false}>
      <MediaFrame media={{ ...media, alt: media.alt || title }} sizes={sizes} imgClassName={styles.img} />
      <span className={styles.caption}>
        <b>{title}</b>
        {caption && <span>{caption}</span>}
      </span>
    </Link>
  );
}
