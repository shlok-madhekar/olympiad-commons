import type { Olympiad } from "@/elements";

/** What an element "says" when you open it. Shared by both views. */
export default function Detail({
  o,
  onPrev,
  onNext,
  theme = "light",
}: {
  o: Olympiad;
  onPrev?: () => void;
  onNext?: () => void;
  theme?: "light" | "dark";
}) {
  const accent = theme === "dark" ? o.glow : o.color;
  return (
    <div className={`dt dt-${theme}`} style={{ "--a": accent } as React.CSSProperties}>
      <div className="dt-head">
        <span className="dt-kicker">
          {o.subject} · {o.kind === "ours" ? "Live" : o.kind === "building" ? "Being written" : "TBD"}
        </span>
        <h2 className="dt-name">{o.name}</h2>
        <p className="dt-line">{o.line}</p>
      </div>

      <ol className="dt-path" aria-label="How it works">
        {o.path.map((step, i) => (
          <li key={step}>
            <span>{step}</span>
            {i < o.path.length - 1 && <i aria-hidden>→</i>}
          </li>
        ))}
      </ol>

      <div className="dt-foot">
        <div>
          <p className="dt-status">{o.status}</p>
          {o.stats && (
            <dl className="dt-stats">
              {o.stats.map(([v, l]) => (
                <div key={l}>
                  <dt>{v}</dt>
                  <dd>{l}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="dt-actions">
          {o.action && (
            <a className="dt-btn" href={o.action.href} target="_blank" rel="noopener noreferrer">
              {o.action.label} ↗
            </a>
          )}
          {onPrev && <button className="dt-nav" onClick={onPrev} aria-label="Previous element">←</button>}
          {onNext && <button className="dt-nav" onClick={onNext} aria-label="Next element">→</button>}
        </div>
      </div>
    </div>
  );
}
