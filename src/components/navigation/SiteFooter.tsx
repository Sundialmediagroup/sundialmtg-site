import type { Link as LinkT, SiteSettings } from "@/types/content";
import { Logo } from "@/components/brand/Logo";
import styles from "./SiteFooter.module.scss";

function A({ link }: { link: LinkT }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener">
      {link.label}
    </a>
  ) : (
    <a href={link.href}>{link.label}</a>
  );
}

function List({ links, className }: { links: LinkT[]; className?: string }) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(" ")}>
      {links.map((l) => (
        <li key={`${l.label}${l.href}`}>
          <A link={l} />
        </li>
      ))}
    </ul>
  );
}

type Props = Pick<SiteSettings, "nav" | "socials" | "footer" | "tagline">;

/**
 * Dark footer, as in the prototype: site links · emblem · socials & legal,
 * then the full-width SUNDIAL letters and a © / tagline row.
 */
export function SiteFooter({ nav, socials, footer, tagline }: Props) {
  return (
    <footer className={styles.footer} data-tone="dark">
      <div className={styles.top}>
        <List links={[...nav, ...footer.company]} />
        <Logo variant="emblem" className={styles.emblem} />
        <List links={[...socials, ...footer.legal]} className={styles.end} />
      </div>
      <Logo variant="word" className={styles.wordmark} title="Sundial" />
      <div className={styles.bottom}>
        <span>{footer.copyright}</span>
        <span>{tagline}</span>
      </div>
    </footer>
  );
}
