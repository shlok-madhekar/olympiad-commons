import { GUIDES, REPO } from "@/guides";

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <rect x="1" y="1" width="11" height="11" fill="#2f5bd3" />
      <rect x="14" y="1" width="11" height="11" fill="#0f8a80" />
      <rect x="1" y="14" width="11" height="11" fill="#3b8a3f" />
      <rect x="14.5" y="14.5" width="10" height="10" fill="none" stroke="currentColor" strokeDasharray="2 2" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="/" className="brand">
            <Logo />
            Olympiad Commons
          </a>
          <nav>
            <a href="#guides">Guides</a>
            <a href="#contribute">Contribute</a>
            <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <p className="eyebrow">Free and open source, by students</p>
          <h1>
            Study guides for the science olympiads, <em>free for everyone.</em>
          </h1>
          <p className="lede">
            Each guide takes you from the first-round exam to the national one,
            with lessons, a problem bank that checks your answers, and a
            community to ask when you&apos;re stuck. All of it is on GitHub, so
            anyone can fix a mistake or add a problem.
          </p>
          <div className="ctas">
            <a href="#guides" className="btn">Browse the guides</a>
            <a href="#contribute" className="btn ghost">Start a guide</a>
          </div>
        </section>

        <section id="guides" className="shelf-sec">
          <div className="sec-head">
            <h2>The guides</h2>
            <span className="mono soft">{GUIDES.length} subjects</span>
          </div>
          <div className="shelf">
            {GUIDES.map((g) => (
              <article key={g.no} className="tile" style={{ ["--c" as string]: g.accent }}>
                <div className="tile-top mono">
                  <span>{g.no}</span>
                  <span className={g.status === "live" ? "live" : "building"}>
                    {g.status === "live" ? "Live" : "In progress"}
                  </span>
                </div>
                <div className="symbol">{g.symbol}</div>
                <div className="subject">{g.subject}</div>
                <h3>{g.name}</h3>
                <p className="exam mono">
                  {g.exam} <span className="soft">→ {g.international}</span>
                </p>
                <p className="blurb">{g.blurb}</p>
                <dl className="facts">
                  {g.facts.map(([n, l]) => (
                    <div key={l}>
                      <dt>{n}</dt>
                      <dd>{l}</dd>
                    </div>
                  ))}
                </dl>
                {g.status === "live" ? (
                  <a href={g.url} className="tile-link" target="_blank" rel="noopener noreferrer">
                    {g.url.replace("https://", "")} ↗
                  </a>
                ) : (
                  <a href="#contribute" className="tile-link">Help write it →</a>
                )}
              </article>
            ))}
            <a href="#contribute" className="tile tile-empty">
              <div className="tile-top mono">
                <span>04</span>
                <span />
              </div>
              <div className="symbol">?</div>
              <div className="subject">Your olympiad</div>
              <p className="blurb">
                Know an exam well enough to teach it? Lead the next guide.
              </p>
              <span className="tile-link">Propose one →</span>
            </a>
          </div>
        </section>

        <section className="proof">
          <p className="mono soft small">The first guide so far (USAPhO, Nov 2026)</p>
          <dl>
            <div><dt>54</dt><dd>countries</dd></div>
            <div><dt>931</dt><dd>visitors since tracking started Oct 11</dd></div>
            <div><dt>77</dt><dd>Discord members</dd></div>
            <div><dt>18</dt><dd>pull requests from outside contributors</dd></div>
          </dl>
        </section>

        <section className="principles">
          <div>
            <span className="num mono">1</span>
            <h3>Free, all of it</h3>
            <p>No paywall and no account needed to read. Olympiad prep shouldn&apos;t depend on which school you go to.</p>
          </div>
          <div>
            <span className="num mono">2</span>
            <h3>Open source</h3>
            <p>Every lesson and problem is on GitHub under CC BY-NC-SA 4.0. If you spot a mistake, you can fix it.</p>
          </div>
          <div>
            <span className="num mono">3</span>
            <h3>One engine</h3>
            <p>Every guide runs on the same lessons, problem bank, sims and progress tracking, so a new subject has working tools from day one.</p>
          </div>
        </section>

        <section id="contribute" className="contribute">
          <div>
            <h2>Write for a guide</h2>
            <p>
              Write a lesson, add problems, or review what&apos;s there. Each
              guide has an in-browser editor, so you don&apos;t need to know
              git. Contributors are credited by name on every guide.
            </p>
            <a href="https://usapho.one/edit" className="btn ghost" target="_blank" rel="noopener noreferrer">
              Open the editor
            </a>
          </div>
          <div>
            <h2>Start a new guide</h2>
            <p>
              If you&apos;ve placed well in an olympiad and want to lead its
              guide, you get:
            </p>
            <ul>
              <li>The full site, ready to fill in</li>
              <li>Hosting and a domain</li>
              <li>Help finding writers</li>
            </ul>
            <a href={`${REPO}/issues/new`} className="btn" target="_blank" rel="noopener noreferrer">
              Propose a guide
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>
            Olympiad Commons is run by students. Not affiliated with AAPT, ACS,
            CEE or any olympiad organizer. Content is licensed{" "}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY-NC-SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
