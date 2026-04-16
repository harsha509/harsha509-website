import { type ReactNode } from 'react';
import NeuralBackground from './components/NeuralBackground';

type PortfolioItem = { title: string; image?: string; link?: string };
type BlogItem = { category: string; date: string; title: string; link: string };

const portfolio: PortfolioItem[] = [
  { title: "Selenium", image: "https://www.selenium.dev/images/selenium_logo_square_green.png", link: "https://github.com/SeleniumHQ/selenium" },
  { title: "Appium", image: "https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png", link: "https://github.com/appium/appium" },
  { title: "WebdriverIO", image: "https://webdriver.io/img/webdriverio.png", link: "https://github.com/webdriverio/webdriverio" },
];

const blogs: BlogItem[] = [
  { category: "Browser Automation", date: "2024", title: "WebDriver BiDi: The Future of Browser Automation", link: "https://www.lambdatest.com/blog/webdriver-bidi-future-of-browser-automation/" },
  { category: "Browser Automation", date: "2024", title: "Revolutionizing Cross Browser Automation with WebDriver BiDi", link: "https://www.lambdatest.com/blog/revolutionizing-cross-browser-automation-with-webdriver-bidi/" },
];

const footerSiteLinkClass =
  'link-hover-line w-fit rounded-sm transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-secondary]';

const navLinkClass =
  'link-hover-line w-fit transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-secondary]';

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">{eyebrow}</div>}
      <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] tracking-tight">{title}</h2>
      {subtitle && <p className="text-[--color-muted] mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[--color-pill-border] bg-[--color-pill-bg] px-4 py-2 text-sm text-[--color-accent] shadow-sm">
      {children}
    </span>
  );
}

export default function App() {
  return (
    <>
      <NeuralBackground />

      <header className="sticky top-0 z-40 bg-[--color-header-bg] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="link-hover-line w-fit text-xl font-extrabold tracking-tight transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-secondary]">Sri Harsha</a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#home" className={navLinkClass}>Home</a>
            <a href="#about" className={navLinkClass}>About</a>
            <a href="#projects" className={navLinkClass}>GitHub Projects</a>
            <a href="#blogs" className={navLinkClass}>Blogs</a>
            <a href="#contact" className={navLinkClass}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="home">
        {/* Hero */}
        <section className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-[--color-border] bg-[--color-pill-bg] px-5 py-2 text-sm uppercase tracking-widest text-[--color-muted] animate-in">
                  Hi, I'm
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-[var(--font-heading)] uppercase animate-in whitespace-nowrap">SRI HARSHA</h1>
                <div className="mt-4 h-1.5 w-32 rounded-full bg-[--color-secondary]/80 animate-in"></div>
                <p className="mt-6 text-xl md:text-2xl text-[--color-secondary] font-medium animate-in">Engineering Manager - OSPO</p>
                <div className="mt-4 flex items-center gap-4 animate-in">
                  <span className="text-sm uppercase tracking-widest text-[--color-muted] md:text-base">at</span>
                  <span className="hero-employer-logo">
                    <img
                      src={`${import.meta.env.BASE_URL}testmu-logo-white.png`}
                      alt="TestMu AI logo"
                      className="h-10 w-auto border-0 ring-0 outline-none shadow-none sm:h-12 md:h-14"
                    />
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="neural-bg rounded-2xl"></div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[--color-surface-solid] shadow-2xl animate-in-delayed ring-1 ring-[--color-border]">
                  <img
                    src={`${import.meta.env.BASE_URL}sri.jpg`}
                    alt="Sri Harsha portrait"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <SectionHeading eyebrow="about" title="About me" />
            <p className="max-w-3xl text-base leading-relaxed text-[--color-accent] text-justify">
              Over the years, I've worked on making test suites trustworthy and fast — from browser to mobile — with a strong focus on JavaScript tooling. I actively contribute to opensource projects as a committer to Selenium and WebdriverIO, and participate in SeleniumHQ's Technical Leadership Committee.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[--color-accent] text-justify">
              Currently serving as an Engineering Manager (OSPO) at LambdaTest, I continue to explore better ways to build, test, and collaborate in the opensource ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>Selenium</Pill>
              <Pill>Appium</Pill>
              <Pill>WebDriverIO</Pill>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="projects" className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="projects" title="GitHub projects I contribute to" />
              <a href="#projects" className="link-hover-line inline-flex w-fit items-center gap-2 text-[--color-secondary] transition-colors">
                view all projects <span className="text-lg">&#10148;</span>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-lg border border-[--color-border] bg-[--color-card-bg] shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
                  <div className="aspect-[16/10] overflow-hidden bg-[--color-img-bg] flex items-center justify-center p-8">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-hover-line w-fit text-sm text-[--color-secondary] transition-colors">
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="bg-[--color-surface]">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
            <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">quote of the day</div>
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed">
              "Success is not final; failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="mt-4 text-[--color-muted]">-Winston Churchill</p>
          </div>
        </section>

        {/* Blogs */}
        <section id="blogs" className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="blogs" title="blogs" />
              <a href="#blogs" className="link-hover-line inline-flex w-fit items-center gap-2 text-[--color-secondary] transition-colors">
                view all blogs <span className="text-lg">&#10148;</span>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {blogs.map((b) => (
                <a
                  key={b.title}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-[--color-border] bg-[--color-card-bg] p-5 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                >
                  <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                    {b.category} &nbsp;/&nbsp; {b.date}
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug group-hover:text-[--color-secondary] transition">{b.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[--color-surface-solid]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[--color-muted]">On this site</p>
              <nav aria-label="Footer site links" className="mt-5 flex max-w-md flex-col gap-3 text-sm text-[--color-accent]">
                <a href="#home" className={footerSiteLinkClass}>Home</a>
                <a href="#about" className={footerSiteLinkClass}>About</a>
                <a href="#projects" className={footerSiteLinkClass}>GitHub Projects</a>
                <a href="#blogs" className={footerSiteLinkClass}>Blogs</a>
                <a href="#contact" className={footerSiteLinkClass}>Contact</a>
              </nav>
            </div>
            <div>
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[--color-muted]">Connect</p>
              <ul className="mt-5 flex flex-col gap-4 p-0 list-none">
                <li>
                  <a
                    className="link-hover-line group inline-flex w-fit items-center gap-3 text-sm text-[--color-accent] transition-colors hover:text-[--color-secondary]"
                    href="https://github.com/harsha509"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[--color-muted] ring-1 ring-white/10 transition-colors group-hover:bg-white/10 group-hover:text-[--color-secondary]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </span>
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="link-hover-line group inline-flex w-fit items-center gap-3 text-sm text-[--color-accent] transition-colors hover:text-[--color-secondary]"
                    href="https://www.linkedin.com/in/sriharsha509/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[--color-muted] ring-1 ring-white/10 transition-colors group-hover:bg-white/10 group-hover:text-[--color-secondary]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-sm text-[--color-muted]">
            <p className="m-0">&copy; {new Date().getFullYear()} Sri Harsha</p>
          </div>
        </div>
      </footer>
    </>
  );
}
