import type { Link } from "@/types/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import headingStyles from "@/components/ui/Heading.module.scss";
import styles from "./Invitation.module.scss";

type Props = { heading: string[]; text: string; cta: Link };

/** Closing call-to-action block (leads to Partner With Us). */
export function Invitation({ heading, text, cta }: Props) {
  return (
    <section className={styles.section}>
      <Reveal lines={heading} className={headingStyles["heading-lg"]} />
      <p>{text}</p>
      <CtaLink {...cta} />
    </section>
  );
}
