"use client";

import { useRef, useState } from "react";
import Detail from "@/components/Detail";
import { OLYMPIADS, REPO, symbolOf } from "@/elements";

const GROUPS = ["1", "2", "13", "14", "15", "16", "17", "18"];
// short-form table: period 1 and 3 as faint real elements around our period 2
const P1: (number | null)[] = [1, null, null, null, null, null, null, 2];
const P3 = [11, 12, 13, 14, 15, 16, 17, 18];

export default function Classic() {
  const [sel, setSel] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const o = OLYMPIADS[sel];

  const pick = (i: number) => {
    setSel(i);
    if (window.innerWidth < 760) detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // the arrows only walk through our guides
  const OURS = [0, 1, 2];
  const step = (d: number) =>
    setSel((s) => {
      const i = OURS.indexOf(s);
      return i === -1 ? 0 : OURS[(i + d + OURS.length) % OURS.length];
    });

  return (
    <div className="cl">
      <header className="cl-bar">
        <a href="/" className="cl-brand">
          <span className="cl-mark" aria-hidden><i /><i /><i /><i /></span>
          Olympiad Commons
        </a>
        <nav>
          <a href="/explore">Explore in 3D</a>
          <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <section className="cl-hero">
        <h1>Free guides for<br />every olympiad.</h1>
        <p>Physics is live. Chemistry and biology are next. Pick an element.</p>
      </section>

      <section className="cl-table" aria-label="The table">
        <div className="cl-grid">
          <span className="cl-corner" />
          {GROUPS.map((g) => (
            <span key={g} className="cl-group">{g}</span>
          ))}

          <span className="cl-period">1</span>
          {P1.map((z, i) =>
            z ? (
              <div key={i} className="cl-ghost">
                <span className="g-z">{z}</span>
                <span className="g-s">{symbolOf(z)}</span>
              </div>
            ) : (
              <span key={i} className="cl-gap" />
            )
          )}

          <span className="cl-period on">2</span>
          {OLYMPIADS.map((x, i) => (
            <button
              key={x.id}
              className={`cl-el ${x.kind} ${i === sel ? "sel" : ""}`}
              style={{ "--c": x.color, "--t": x.tint } as React.CSSProperties}
              onClick={() => pick(i)}
              aria-pressed={i === sel}
              aria-label={`${x.exam}, ${x.subject}`}
            >
              <span className="e-z">{i + 1}</span>
              <span className="e-s">{x.symbol}</span>
              <span className="e-x">{x.exam}</span>
            </button>
          ))}

          <span className="cl-period">3</span>
          {P3.map((z) => (
            <div key={z} className="cl-ghost fade">
              <span className="g-z">{z}</span>
              <span className="g-s">{symbolOf(z)}</span>
            </div>
          ))}
        </div>

        <ul className="cl-legend">
          <li><i className="ours" />Live</li>
          <li><i className="building" />Being written</li>
          <li className="muted"><i className="community" />Covered by others</li>
        </ul>
      </section>

      <section className="cl-detail" ref={detailRef}>
        <div className="cl-big" style={{ "--c": o.color, "--t": o.tint } as React.CSSProperties} data-kind={o.kind}>
          <span className="e-z">{sel + 1}</span>
          <span className="e-s">{o.symbol}</span>
          <span className="e-x">{o.exam}</span>
        </div>
        <Detail key={o.id} o={o} onPrev={() => step(-1)} onNext={() => step(1)} />
      </section>

      <section className="cl-help">
        <p>Chemistry and biology are being written now. Want to help?</p>
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="cl-btn">Get involved</a>
      </section>

      <footer className="cl-foot">
        <span>Olympiad Commons · run by students</span>
        <span>Not affiliated with any olympiad organizer</span>
      </footer>
    </div>
  );
}
