"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/types/content";
import { Logo } from "@/components/brand/Logo";
import { CtaLink } from "@/components/ui/CtaLink";
import styles from "./SiteHeader.module.scss";

type Props = Pick<SiteSettings, "nav" | "primaryAction" | "socials">;

/**
 * Fixed header. Turns light over any section marked `data-tone="dark"`,
 * gets a solid ground once scrolled, and hides while scrolling down.
 */
export function SiteHeader({ nav, primaryAction, socials }: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [light, setLight] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const h = ref.current?.offsetHeight ?? 60;
      const under = document.elementsFromPoint(window.innerWidth / 2, h / 2).find((el) => !ref.current?.contains(el));
      const dark = !!under?.closest('[data-tone="dark"]');
      setLight(dark);
      setSolid(!dark && y > 40);
      setHidden(y > 400 && y > lastY);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const setMenu = useCallback((on: boolean) => {
    setOpen(on);
    document.documentElement.classList.toggle("is-locked", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setMenu]);

  const cls = [styles.header, light && styles.light, solid && styles.solid, hidden && !open && styles.hidden]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header ref={ref} className={cls}>
        <Link href="/" aria-label="Sundial home" className={styles.home}>
          <Logo />
        </Link>
        <nav className={styles.links} aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link href={primaryAction.href} className={styles.primary}>
            {primaryAction.label}
            <span aria-hidden>↗</span>
          </Link>
          <button type="button" className={styles.menuButton} aria-expanded={open} aria-controls="site-menu" onClick={() => setMenu(true)}>
            Menu
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={[styles.menu, open && styles.menuOpen].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className={styles.menuTop}>
          <Link href="/" aria-label="Sundial home" className={styles.home}>
            <Logo />
          </Link>
          <button type="button" onClick={() => setMenu(false)}>
            Close
          </button>
        </div>
        <nav className={styles.menuNav} aria-label="Mobile" onClick={(e) => (e.target as HTMLElement).closest("a") && setMenu(false)}>
          {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
              {item.label} <small>{String(i + 1).padStart(2, "0")}</small>
            </Link>
          ))}
        </nav>
        <div className={styles.menuBottom}>
          <CtaLink {...primaryAction} />
          <div className={styles.socials}>
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
