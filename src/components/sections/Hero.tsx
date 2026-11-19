import type { Media } from "@/types/content";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./Hero.module.scss";

type Props = { title: string[]; media: Media; hint?: string };

/** Full-viewport dark hero. Pass a video `Media` to swap in a highlight reel. */
export function Hero({ title, media, hint = "Scroll" }: Props) {
  return (
    <section className={styles.hero} data-tone="dark">
      <div className={styles.media}>
        {media.kind === "video" ? (
          <video src={media.src} poster={media.poster} autoPlay muted loop playsInline style={{ objectPosition: media.focalPoint }} />
        ) : (
          <MediaFrame media={media} ratio="fill" sizes="100vw" priority />
        )}
      </div>
      <h1 className={styles.title}>
        {title.map((l, i) => (
          <span key={i} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </h1>
      <span className={styles.hint}>{hint}</span>
    </section>
  );
}
