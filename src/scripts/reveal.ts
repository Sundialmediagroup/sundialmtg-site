/** Marks every `[data-reveal]` element with `data-in` the first time it scrolls into view (see ui/Reveal). */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.setAttribute("data-in", "");
      io.unobserve(e.target);
    }
  },
  { threshold: 0.3 },
);

document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
