"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Detail from "@/components/Detail";
import { OLYMPIADS, TABLE } from "@/elements";

const CELL = 58;
const GAP = 6;
const STEP = CELL + GAP;
const W = 18 * STEP - GAP;
const H = 10 * STEP - GAP;

// deterministic scatter so server and client agree
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export default function Explore() {
  const [sel, setSel] = useState<number | null>(null);
  const [phase, setPhase] = useState<"scatter" | "assemble" | "ready">("scatter");
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("assemble")));
    const t = setTimeout(() => setPhase("ready"), 2600);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(a);
      clearTimeout(t);
    };
  }, []);

  const step = useCallback(
    (d: number) => setSel((s) => (s === null ? 0 : (s + d + OLYMPIADS.length) % OLYMPIADS.length)),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (sel !== null && e.key === "ArrowRight") step(1);
      if (sel !== null && e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel, step]);

  const fit = Math.min(1, (vp.w * 0.92) / W, (vp.h * 0.62) / H);

  const camera = useMemo(() => {
    if (sel === null)
      return `translateY(${vp.h * 0.03}px) scale(${fit}) rotateX(28deg) rotateZ(-6deg) translate(0px, 0px)`;
    const cell = TABLE[sel + 2]; // z = sel + 3
    const cx = (cell.col - 1) * STEP + CELL / 2 - W / 2;
    const cy = (cell.row - 1) * STEP + CELL / 2 - H / 2;
    const zoom = Math.min(3.2, vp.w / (CELL * 4.2), (vp.h * 0.36) / CELL);
    return `translateY(${-vp.h * 0.2}px) scale(${zoom}) rotateX(0deg) rotateZ(0deg) translate(${-cx}px, ${-cy}px)`;
  }, [sel, fit, vp]);

  const o = sel === null ? null : OLYMPIADS[sel];

  return (
    <div className={`ex ${sel !== null ? "zoomed" : ""} ${phase}`}>
      <div className="ex-bg" aria-hidden />

      <header className="ex-top">
        <h1>Olympiad Commons</h1>
        <p>Free guides for every olympiad</p>
      </header>

      <div className="ex-scene" onClick={() => setSel(null)}>
        <div className="ex-cam" style={{ transform: camera }}>
          <div className="ex-drift">
            <div className="ex-table" style={{ width: W, height: H, left: -W / 2, top: -H / 2 }}>
              {TABLE.map((c, i) => {
                const x = (c.col - 1) * STEP;
                const y = (c.row - 1) * STEP;
                const r = (k: number) => rand(c.z * 7 + k);
                const scatter = `translate3d(${(r(1) - 0.5) * 2400}px, ${(r(2) - 0.5) * 1600}px, ${(r(3) - 0.2) * 1800}px) rotateX(${(r(4) - 0.5) * 540}deg) rotateY(${(r(5) - 0.5) * 540}deg)`;
                const delay = phase === "assemble" ? `${Math.round(r(6) * 900 + (c.olympiad ? 600 : 0))}ms` : "0ms";
                const style = {
                  left: x,
                  top: y,
                  width: CELL,
                  height: CELL,
                  transform: phase === "scatter" ? scatter : undefined,
                  opacity: phase === "scatter" ? 0 : undefined,
                  transitionDelay: delay,
                } as React.CSSProperties;

                if (!c.olympiad)
                  return (
                    <div key={c.z} className="ex-ghost" style={style}>
                      <span className="g-z">{c.z}</span>
                      <span className="g-s">{c.symbol}</span>
                    </div>
                  );

                const idx = c.z - 3;
                const ol = c.olympiad;
                return (
                  <button
                    key={c.z}
                    className={`ex-el ${ol.kind} ${sel === idx ? "sel" : ""}`}
                    style={{ ...style, "--c": ol.color, "--g": ol.glow } as React.CSSProperties}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSel(sel === idx ? null : idx);
                    }}
                    aria-label={`${ol.exam}, ${ol.subject}`}
                  >
                    <span className="e-z">{idx + 1}</span>
                    <span className="e-s">{ol.symbol}</span>
                    <span className="e-x">{ol.exam}</span>
                  </button>
                );
              })}
              <span className="ex-label" style={{ left: -54, top: STEP + CELL / 2 - 8 }}>Period 2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ex-hint">
        <span>Click a glowing element</span>
        <a href="/">Classic view</a>
      </div>

      <aside className={`ex-sheet ${o ? "open" : ""}`} aria-hidden={!o}>
        {o && (
          <>
            <button className="ex-close" onClick={() => setSel(null)} aria-label="Close">
              Esc
            </button>
            <Detail key={o.id} o={o} theme="dark" onPrev={() => step(-1)} onNext={() => step(1)} />
          </>
        )}
      </aside>
    </div>
  );
}
