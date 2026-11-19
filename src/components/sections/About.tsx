import type { Media, Person, Value } from "@/types/content";
import { MediaFrame } from "@/components/ui/MediaFrame";
import styles from "./About.module.scss";

export function FullBleedImage({ media }: { media: Media }) {
  return (
    <div className={styles.full}>
      <MediaFrame media={media} ratio="fill" sizes="100vw" />
    </div>
  );
}

type FounderProps = { lead: string; person: Pick<Person, "name" | "role" | "quote" | "portrait">; body: string[] };

/** Lead paragraph + portrait/quote split ("Our Story"). */
export function FounderSplit({ lead, person, body }: FounderProps) {
  return (
    <section className={styles.story}>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.split}>
        {person.portrait && <MediaFrame media={person.portrait} grayscale sizes="(max-width: 820px) 100vw, 50vw" />}
        <div className={styles.splitText}>
          <p className={styles.person}>
            {person.name}
            <br />
            <span className="u-mute">{person.role}</span>
          </p>
          {person.quote && <p className={styles.quote}>“{person.quote}”</p>}
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

type PhilosophyProps = { title: string; lead: string; body: string[]; footnote?: string; values: Value[] };

export function Philosophy({ title, lead, body, footnote, values }: PhilosophyProps) {
  return (
    <section className={styles.philosophy}>
      <h2 className={styles.philTitle}>{title}</h2>
      <div className={styles.col}>
        <p className={styles.colLead}>{lead}</p>
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {footnote && <p className={styles.footnote}>{footnote}</p>}
      </div>
      <div className={styles.col}>
        {values.map((v) => (
          <div key={v.title} className={styles.value}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
