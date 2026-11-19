import styles from "./AccentBand.module.scss";

type Props = {
  eyebrow: string;
  heading: string[];
  versus: { title: string; caption: string }[];
  quote: string;
  text: string;
};

export function AccentBand({ eyebrow, heading, versus, quote, text }: Props) {
  return (
    <section className={styles.band} data-tone="dark">
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>
        {heading.map((l, i) => (
          <span key={i} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </h2>
      <div className={styles.versus}>
        {versus.map((v) => (
          <div key={v.title}>
            <b>{v.title}</b>
            <span>→ {v.caption}</span>
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <q>{quote}</q>
        <p>{text}</p>
      </div>
    </section>
  );
}
