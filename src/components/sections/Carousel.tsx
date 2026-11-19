import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Carousel.module.scss";

type Props = { children: ReactNode; label: string };

/** Horizontal snap carousel with drag-to-scroll and a progress hairline. */
export function Carousel({ children, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ left: 0, width: 30 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = (el.clientWidth / el.scrollWidth) * 100;
      const max = el.scrollWidth - el.clientWidth;
      setProgress({ width: w, left: max > 0 ? (el.scrollLeft / max) * (100 - w) : 0 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let startX = 0, startLeft = 0, down = false, moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; setDragging(true); }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => { down = false; if (moved) requestAnimationFrame(() => setDragging(false)); };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ref} className={[styles.track, dragging && styles.dragging].filter(Boolean).join(" ")} role="region" aria-label={label} tabIndex={0}>
        <div className={styles.row}>
          {Children.map(children, (c) => (
            <div className={styles.slide}>{c}</div>
          ))}
        </div>
      </div>
      <div className={styles.progress} aria-hidden>
        <i style={{ left: `${progress.left}%`, width: `${progress.width}%` }} />
      </div>
    </>
  );
}
