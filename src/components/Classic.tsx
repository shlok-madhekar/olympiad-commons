"use client";

import { useRef, useState } from "react";
import Detail from "@/components/Detail";
import { DISCORD, OLYMPIADS, REPO, symbolOf } from "@/elements";

const GROUPS = ["1", "2", "13", "14", "15", "16", "17", "18"];
// short-form table: period 1 and 3 as faint real elements around our period 2
const P1: (number | null)[] = [1, null, null, null, null, null, null, 2];
const P3 = [11, 12, 13, 14, 15, 16, 17, 18];
// rest of period 2 after our guides
const P2_REST = [6, 7, 8, 9, 10].slice(OLYMPIADS.length - 3);

export default function Classic() {
  const [sel, setSel] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const o = OLYMPIADS[sel];

  const pick = (i: number) => {
    setSel(i);
    if (window.innerWidth < 760) detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const step = (d: number) => setSel((s) => (s + d + OLYMPIADS.length) % OLYMPIADS.length);

  return (
    <div className="cl">
      <header className="cl-bar">
        <a href="/" className="cl-brand">
          <span className="cl-mark" aria-hidden><i /><i /><i /><i /></span>
          Olympiad Commons
        </a>
        <nav>
          <a href={DISCORD} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <section className="cl-hero">
        <h1>Free olympiad guides,<br />written by students.</h1>
        <p>Physics is live. Chemistry, biology and astronomy are being written, then AI, economics and neuroscience.</p>
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
              {x.kind === "tbd" && <span className="e-tbd">TBD</span>}
              <span className="e-s">{x.symbol}</span>
              <span className="e-x">{x.exam}</span>
            </button>
          ))}

          {P2_REST.map((z) => (
            <div key={z} className="cl-ghost">
              <span className="g-z">{z}</span>
              <span className="g-s">{symbolOf(z)}</span>
            </div>
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
          <li><i className="tbd" />TBD</li>
        </ul>
      </section>

      <section className="cl-detail" ref={detailRef}>
        <div className="cl-big" style={{ "--c": o.color, "--t": o.tint } as React.CSSProperties} data-kind={o.kind}>
          <span className="e-z">{sel + 1}</span>
          {o.kind === "tbd" && <span className="e-tbd">TBD</span>}
          <span className="e-s">{o.symbol}</span>
          <span className="e-x">{o.exam}</span>
        </div>
        <Detail key={o.id} o={o} onPrev={() => step(-1)} onNext={() => step(1)} />
      </section>

      <section className="cl-help">
        <p>Seven guides on the table, one live. Help write the rest on Discord.</p>
        <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="cl-btn">Join the Discord</a>
      </section>

      <footer className="cl-foot">
        <span>Olympiad Commons · run by students</span>
        <span>
          <a href={REPO} target="_blank" rel="noopener noreferrer">Open source on GitHub</a> · Not affiliated with any olympiad organizer
        </span>
      </footer>
    </div>
  );
}
