import type { ElementType, ReactNode } from "react";
import styles from "./Heading.module.scss";

export type HeadingSize =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "title"
  | "statement"
  | "lead";

type Props = { as?: ElementType; size: HeadingSize; className?: string; id?: string; children: ReactNode };

export function Heading({ as: Tag = "h2", size, className, id, children }: Props) {
  return (
    <Tag id={id} className={[styles[size], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
