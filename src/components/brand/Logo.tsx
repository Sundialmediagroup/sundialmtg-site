import { EMBLEM_PATH, SUNDIAL_PATHS, WORD_PATHS } from "./sundialPaths";

type Variant = "wordmark" | "emblem" | "word";
type Props = { variant?: Variant; className?: string; title?: string };

/**
 * `wordmark` = emblem + letters, `emblem` = the mark alone, `word` = the letters alone (footer).
 * Each viewBox is the measured bounding box of its paths (getBBox), so nothing is clipped
 * and the art sits flush with its box: re-measure if the paths change.
 */
const VARIANTS: Record<Variant, { viewBox: string; paths: string }> = {
  wordmark: { viewBox: "0 0 357.5 86.1", paths: SUNDIAL_PATHS },
  emblem: { viewBox: "0 0 108.7 86.1", paths: EMBLEM_PATH },
  word: { viewBox: "104 29 253.5 44.6", paths: WORD_PATHS },
};

/** Sundial mark. Color follows `--mark` (falls back to currentColor). */
export function Logo({ variant = "wordmark", className, title }: Props) {
  const { viewBox, paths } = VARIANTS[variant];
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{ color: "var(--mark, currentColor)" }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
