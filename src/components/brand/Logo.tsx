import { SUNDIAL_PATHS } from "./sundialPaths";

type Props = { variant?: "wordmark" | "emblem"; className?: string; title?: string };

/** Sundial mark. Color follows `--mark` (falls back to currentColor). */
export function Logo({ variant = "wordmark", className, title }: Props) {
  const viewBox = variant === "emblem" ? "0 0 108 88" : "0 0 358 86";
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{ color: "var(--mark, currentColor)" }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: SUNDIAL_PATHS }}
    />
  );
}
