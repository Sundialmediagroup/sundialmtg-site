"use client";

import { useId, useState } from "react";
import type { Experience } from "@/types/content";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./Accordion.module.scss";

type Props = { experiences: (Experience & { brandName: string })[]; columns?: [string, string] };

/** Ruled list of experiences; each row expands to a summary + gallery. */
export function EventAccordion({ experiences, columns = ["Event", "Presented by / location"] }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <div>
      <div className={styles.header}>
        <span>{columns[0]}</span>
        <span>{columns[1]}</span>
      </div>
      {experiences.map((e) => {
        const isOpen = open === e.id;
        const panelId = `${base}-${e.id}`;
        return (
          <div key={e.id} id={e.slug} className={[styles.row, isOpen && styles.open].filter(Boolean).join(" ")}>
            <button type="button" className={styles.trigger} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : e.id)}>
              <span className={styles.name}>{e.name}</span>
              <span className={styles.where}>{e.location}</span>
            </button>
            <div className={styles.panel} id={panelId} role="region" aria-hidden={!isOpen}>
              <div>
                <p className={styles.body}>
                  <b>
                    {e.format} · {e.brandName}.
                  </b>{" "}
                  {e.summary}
                </p>
                {e.gallery && (
                  <div className={styles.thumbs}>
                    {e.gallery.map((m, i) => (
                      <MediaFrame key={i} media={m} ratio="photo" sizes="(max-width: 820px) 33vw, 16vw" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
