import type { Media } from "@/types/content";
import styles from "./MediaFrame.module.scss";

type Props = {
  media: Media;
  ratio?: "portrait" | "landscape" | "photo" | "fill";
  sizes?: string;
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean;
  grayscale?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Fixed-ratio, cover-fit image frame with a neutral placeholder ground. */
export function MediaFrame({ media, ratio = "portrait", sizes = "50vw", priority, grayscale, className, imgClassName }: Props) {
  return (
    <span className={[styles.frame, styles[ratio], grayscale && styles.grayscale, className].filter(Boolean).join(" ")}>
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
        className={[styles.img, imgClassName].filter(Boolean).join(" ")}
        style={{ objectPosition: media.focalPoint }}
      />
    </span>
  );
}
