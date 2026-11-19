import Image from "next/image";
import type { Media } from "@/types/content";
import styles from "./MediaFrame.module.scss";

type Props = {
  media: Media;
  ratio?: "portrait" | "landscape" | "photo" | "fill";
  sizes?: string;
  priority?: boolean;
  grayscale?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Fixed-ratio, cover-fit image frame with a neutral placeholder ground. */
export function MediaFrame({ media, ratio = "portrait", sizes = "50vw", priority, grayscale, className, imgClassName }: Props) {
  return (
    <span className={[styles.frame, styles[ratio], grayscale && styles.grayscale, className].filter(Boolean).join(" ")}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={[styles.img, imgClassName].filter(Boolean).join(" ")}
        style={{ objectPosition: media.focalPoint }}
      />
    </span>
  );
}
