import { EDITOR, READOUT, REPO, TABLE, type Olympiad } from "@/guides";

const host = (u?: string) => (u ? u.replace(/^https?:\/\/(www\.)?/, "") : "");

function Cell({ o }: { o: Olympiad }) {
  const style = { "--fill": o.kind === "ours-live" ? o.color : o.tint, "--accent": o.color } as React.CSSProperties;
  const tag = o.kind === "ours-live" ? "Ours" : o.kind === "ours-building" ? "Ours" : "Community";
  const foot = o.kind === "ours-building" ? "Being written" : `${host(o.url)} ↗`;

  const inner = (
    <>
      <span className="c-top">
        <span>{o.n}</span>
        <span className="c-tag">{tag}</span>
      </span>
      <span className="c-sym">{o.symbol}</span>
      <span className="c-exam">{o.exam}</span>
      <span className="c-sub">{o.subject}</span>
      <span className="c-foot">{foot}</span>
    </>
  );

  if (!o.url)
    return (
      <div className={`cell ${o.kind}`} style={style}>
        {inner}
      </div>
    );
  return (
    <a className={`cell ${o.kind}`} style={style} href={o.url} target="_blank" rel="noopener noreferrer" aria-label={`${o.exam}: ${o.guide}`}>
      {inner}
    </a>
  );
}

export default function Home() {
  const live = TABLE.filter((o) => o.kind !== "ours-building").length;

  return (
    <div className="sheet">
      <header className="strip top">
        <a href="/" className="brand">
          <span className="mark" aria-hidden><i /><i /><i /><i /></span>
          Olympiad Commons
        </a>
        <nav>
          <a href="#table">The table</a>
          <a href="#help">Help out</a>
          <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <section className="title">
        <h1>
          A free guide for<br />every US olympiad.
        </h1>
        <div className="title-row">
          <p className="sub">
            Five olympiads already have great student-run guides. Physics,
            chemistry and biology didn&apos;t, so we&apos;re building them.
            Below is where to study for all eight, free.
          </p>
          <div className="counter" aria-label={`${live} of ${TABLE.length} olympiads have a live free guide`}>
            <span className="cnt"><b>{live}</b>/{TABLE.length}</span>
            <span className="cnt-bar">
              {TABLE.map((o) => (
                <i key={o.n} className={o.kind} />
              ))}
            </span>
            <span className="cnt-l">have a live guide</span>
          </div>
        </div>
      </section>

      <section id="table" className="table-sec">
        <div className="table-head">
          <span className="fig">The table</span>
          <ul className="legend">
            <li><i className="lg ours-live" /> Our guide</li>
            <li><i className="lg ours-building" /> Ours, being written</li>
            <li><i className="lg community" /> Community guide</li>
          </ul>
        </div>
        <div className="cells">
          {TABLE.map((o) => (
            <Cell key={o.n} o={o} />
          ))}
        </div>
        <p className="credit">
          Community guides are run by their own teams. We&apos;re not affiliated
          with them, we just think you should use them.
        </p>
      </section>

      <section className="why">
        <p className="fig">Why this exists</p>
        <div className="why-grid">
          <h2>Free, student‑written guides work. USACO Guide proved it.</h2>
          <p>
            Math, informatics, astronomy, earth science and linguistics have
            one now. Physics, chemistry and biology didn&apos;t. Olympiad
            Commons builds guides for those three, all open source and all on
            the same engine: lessons, a problem bank that checks your answers,
            interactive sims and progress tracking.
          </p>
        </div>
      </section>

      <section className="readout">
        <div className="ro-label">
          <span className="fig">Our first guide</span>
          <b>USAPhO Guide</b>
          <a href="https://usapho.one" target="_blank" rel="noopener noreferrer">usapho.one ↗</a>
        </div>
        <dl>
          {READOUT.map(([v, l]) => (
            <div key={l}>
              <dt>{v}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="help" className="help">
        <div className="help-col">
          <span className="h-n">01</span>
          <h3>Write for our guides</h3>
          <p>Lessons and problems for physics, chemistry or biology. There&apos;s an in-browser editor, and every contributor is credited by name.</p>
          <a href={EDITOR} className="btn" target="_blank" rel="noopener noreferrer">Open the editor</a>
        </div>
        <div className="help-col">
          <span className="h-n">02</span>
          <h3>Know a guide we missed?</h3>
          <p>Run a free guide for an olympiad that isn&apos;t on the table, or think one should replace a listing? Tell us and we&apos;ll add it.</p>
          <a href={`${REPO}/issues/new`} className="btn ghost" target="_blank" rel="noopener noreferrer">Suggest a guide</a>
        </div>
      </section>

      <footer className="strip bottom">
        <span>Olympiad Commons. Run by students.</span>
        <span>Not affiliated with any olympiad organizer.</span>
        <span>
          Our guides are{" "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        </span>
      </footer>
    </div>
  );
}
