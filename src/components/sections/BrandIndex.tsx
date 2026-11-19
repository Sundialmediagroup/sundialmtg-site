"use client";

import Link from "next/link";
import { useState } from "react";
import type { Media } from "@/types/content";
import styles from "./BrandIndex.module.scss";

type Entry = { id: string; name: string; href: string; logo: Media; external?: boolean };
type Props = { heading: string; entries: Entry[] };

/** Big name list; hovering a name swaps the sticky logo. Used for Brands and Partners. */
export function BrandIndex({ heading, entries }: Props) {
  const [active, setActive] = useState(entries[0]?.id);
  const current = entries.find((e) => e.id === active) ?? entries[0];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <div className={styles.wrap}>
        <ul className={styles.list}>
          {entries.map((e) => (
            <li key={e.id} className={e.id === active ? styles.on : undefined} onMouseEnter={() => setActive(e.id)} onFocus={() => setActive(e.id)}>
              {e.external ? (
                <a href={e.href} target="_blank" rel="noopener">
                  {e.name}
                </a>
              ) : (
                <Link href={e.href}>{e.name}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.logo} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {current && <img src={current.logo.src} alt="" />}
        </div>
      </div>
    </section>
  );
}
