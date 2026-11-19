import Link from "next/link";
import type { Link as LinkT, SiteSettings } from "@/types/content";
import { Logo } from "@/components/brand/Logo";
import styles from "./SiteFooter.module.scss";

function A({ link }: { link: LinkT }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener">
      {link.label}
    </a>
  ) : (
    <Link href={link.href}>{link.label}</Link>
  );
}

function List({ heading, links }: { heading?: string; links: LinkT[] }) {
  return (
    <ul className={styles.list}>
      {heading && <li className={styles.heading}>{heading}</li>}
      {links.map((l) => (
        <li key={l.label}>
          <A link={l} />
        </li>
      ))}
    </ul>
  );
}

type Props = Pick<SiteSettings, "nav" | "socials" | "footer" | "tagline">;

/** Dark footer: nav · emblem · company/brand sites, full-width wordmark, legal row. */
export function SiteFooter({ nav, socials, footer, tagline }: Props) {
  return (
    <footer className={styles.footer} data-tone="dark">
      <div className={styles.top}>
        <div className={styles.cols}>
          <List links={nav} />
          <List links={[...footer.company, ...socials]} />
        </div>
        <Logo variant="emblem" className={styles.emblem} />
        <div className={styles.cols}>
          <List heading="Our brands" links={footer.brandSites} />
        </div>
      </div>
      <Logo className={styles.wordmark} title="Sundial" />
      <div className={styles.bottom}>
        <span>{footer.copyright}</span>
        <ul className={styles.legal}>
          {footer.legal.map((l) => (
            <li key={l.label}>
              <A link={l} />
            </li>
          ))}
        </ul>
        <span>{tagline}</span>
      </div>
    </footer>
  );
}
