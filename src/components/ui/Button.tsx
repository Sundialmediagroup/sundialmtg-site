import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "outline";
type Common = { variant?: Variant; className?: string; children: React.ReactNode };
type AsLink = Common & { href: string };
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  if (props.href !== undefined)
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  const rest: Partial<AsButton> = { ...(props as AsButton) };
  delete rest.variant;
  delete rest.className;
  delete rest.children;
  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
