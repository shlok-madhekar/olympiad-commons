import { EDITOR, GUIDES, REPO, STATS, type Guide } from "@/guides";

const accentVars = (g: Guide) =>
  ({ "--c": g.accent, "--c-dark": g.accentDark }) as React.CSSProperties;

function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="logo">
      <rect x="0" y="0" width="11" height="11" rx="1.5" fill="#2f56c9" />
      <rect x="13" y="0" width="11" height="11" rx="1.5" fill="#0d7f76" />
      <rect x="0" y="13" width="11" height="11" rx="1.5" fill="#3d7d36" />
      <rect x="13.5" y="13.5" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeDasharray="2 2" />
    </svg>
  );
}

function Cell({ g }: { g: Guide }) {
  const live = g.status === "live";
  return (
    <a
      href={live ? g.url : "#guides"}
      className="cell"
      style={accentVars(g)}
      {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="cell-no">{g.no}</span>
      {live && <span className="cell-live" aria-label="Live" />}
      <span className="cell-sym">{g.symbol}</span>
      <span className="cell-name">{g.subject}</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="/" className="brand">
            <Logo />
            <span>Olympiad Commons</span>
          </a>
          <nav className="nav-links">
            <a href="#guides">Guides</a>
            <a href="#contribute">Contribute</a>
            <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="wrap hero">
          <div className="hero-copy">
            <h1>
              Free study guides <br className="br" />
              for the science <br className="br" />
              olympiads.
            </h1>
            <p className="lede">
              Open-source courses for physics, chemistry and biology, written
              and maintained by students.
            </p>
            <div className="ctas">
              <a href="#guides" className="btn">Browse guides</a>
              <a href="#contribute" className="link-arrow">
                Start a guide <span>→</span>
              </a>
            </div>
          </div>

          <div className="table" aria-label="Guides">
            {GUIDES.map((g) => (
              <Cell key={g.no} g={g} />
            ))}
            <a href="#contribute" className="cell cell-empty">
              <span className="cell-no">04</span>
              <span className="cell-sym">?</span>
              <span className="cell-name">Next</span>
            </a>
          </div>
        </section>

        <section id="guides" className="wrap section">
          <h2 className="label">Guides</h2>
          <ul className="rows">
            {GUIDES.map((g) => {
              const live = g.status === "live";
              const inner = (
                <>
                  <span className="row-sym">{g.symbol}</span>
                  <span className="row-main">
                    <span className="row-name">{g.name}</span>
                    <span className="row-line">{g.line}</span>
                  </span>
                  <span className="row-exam">{g.exams}</span>
                  <span className={`row-status ${live ? "is-live" : ""}`}>
                    {live ? `${g.url.replace("https://", "")} ↗` : "In progress"}
                  </span>
                </>
              );
              return (
                <li key={g.no} style={accentVars(g)}>
                  {live ? (
                    <a className="row row-link" href={g.url} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <div className="row">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="wrap section">
          <p className="label">The USAPhO Guide so far</p>
          <dl className="stats">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <dt>{n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap section">
          <div className="ideas">
            <div>
              <h3>Free</h3>
              <p>No paywall and no account needed to read. Good prep shouldn&apos;t depend on your school.</p>
            </div>
            <div>
              <h3>Open</h3>
              <p>Every lesson and problem is on GitHub. Spot a mistake and you can fix it.</p>
            </div>
            <div>
              <h3>Shared</h3>
              <p>Every guide runs on the same engine, so a new subject starts with working tools.</p>
            </div>
          </div>
        </section>

        <section id="contribute" className="wrap section">
          <div className="cta-band">
            <div>
            <h2>Know an olympiad well? Help build its guide.</h2>
            <p>
              Write lessons and problems for an existing guide, or lead a new
              one. You get the full site, hosting and help finding writers.
            </p>
            <div className="ctas">
              <a href={`${REPO}/issues/new`} className="btn btn-invert" target="_blank" rel="noopener noreferrer">
                Propose a guide
              </a>
              <a href={EDITOR} className="link-arrow on-dark" target="_blank" rel="noopener noreferrer">
                Write for one <span>→</span>
              </a>
            </div>
            </div>
            <div className="band-mark" aria-hidden>
              <span /><span /><span /><span />
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <div className="brand brand-sm">
          <Logo size={16} />
          <span>Olympiad Commons</span>
        </div>
        <p>
          Run by students. Not affiliated with AAPT, ACS, CEE or any olympiad
          organizer. Content under{" "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY-NC-SA 4.0
          </a>
          .
        </p>
      </footer>
    </>
  );
}
