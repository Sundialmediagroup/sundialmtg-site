import { useEffect, useState } from "react";
import s from "./styleguide.module.scss";

type Kind = "color" | "space" | "type";

/** Reads the token custom properties emitted by base/_root.scss, so Sass stays the single source of truth. */
function readTokens(prefix: string): [string, string][] {
  const out: [string, string][] = [];
  const style = getComputedStyle(document.documentElement);
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ":root") continue;
      for (const prop of Array.from(rule.style)) {
        if (prop.startsWith(prefix) && !out.some(([k]) => k === prop)) out.push([prop, style.getPropertyValue(prop).trim()]);
      }
    }
  }
  return out.map(([k, v]) => [k.slice(prefix.length), v]);
}

export function TokenList({ kind, samples = {} }: { kind: Kind; samples?: Record<string, string> }) {
  const [tokens, setTokens] = useState<[string, string][]>([]);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reading from the DOM after mount
  useEffect(() => setTokens(readTokens(`--${kind}-`)), [kind]);

  if (kind === "color")
    return (
      <div className={s.swatches}>
        {tokens.map(([k, v]) => (
          <div key={k} className={s.swatch}>
            <i style={{ background: `var(--color-${k})` }} />
            <span>{k}</span>
            <code>{v}</code>
          </div>
        ))}
      </div>
    );

  if (kind === "space")
    return (
      <>
        {tokens.map(([k, v]) => (
          <div key={k} className={s.spaceRow}>
            <code>
              space({k}) · {v}
            </code>
            <i style={{ width: `var(--space-${k})` }} />
          </div>
        ))}
      </>
    );

  return (
    <>
      {tokens.map(([k, v]) => (
        <div key={k} className={s.typeRow}>
          <code>
            {k}
            <br />
            {v}
          </code>
          <span className={`t-${k}`}>{samples[k] ?? k}</span>
        </div>
      ))}
    </>
  );
}
