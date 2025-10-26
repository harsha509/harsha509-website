import NeuralBackground from "./components/NeuralBackground";

type PortfolioItem = { title: string; image?: string; link?: string; };
type BlogItem = { category: string; date: string; title: string; link: string; };

const portfolio: PortfolioItem[] = [
  { title: "Selenium", image: "https://www.selenium.dev/images/selenium_logo_square_green.png", link: "https://github.com/SeleniumHQ/selenium" },
  { title: "Appium", image: "https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png", link: "https://github.com/appium/appium" },
  { title: "WebdriverIO", image: "https://webdriver.io/img/webdriverio.png", link: "https://github.com/webdriverio/webdriverio" },
];

const blogs: BlogItem[] = [
  { category: "Browser Automation", date: "2024", title: "WebDriver BiDi: The Future of Browser Automation", link: "https://www.lambdatest.com/blog/webdriver-bidi-future-of-browser-automation/" },
  { category: "Browser Automation", date: "2024", title: "Revolutionizing Cross Browser Automation with WebDriver BiDi", link: "https://www.lambdatest.com/blog/revolutionizing-cross-browser-automation-with-webdriver-bidi/" },
];

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">{eyebrow}</div>}
      <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] tracking-tight">{title}</h2>
      {subtitle && <p className="text-[--color-muted] mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[--color-accent] shadow-sm">
      {children}
    </span>
  );
}

export default function App() {
  return (
    <>
      <NeuralBackground />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="text-xl font-extrabold tracking-tight">Sri Harsha</a>
          <nav className="hidden gap-6 md:flex">
            <a href="#home" className="hover:text-[--color-secondary]">Home</a>
            <a href="#about" className="hover:text-[--color-secondary]">About</a>
            <a href="#projects" className="hover:text-[--color-secondary]">GitHub Projects</a>
            <a href="#blogs" className="hover:text-[--color-secondary]">Blogs</a>
            <a href="#contact" className="hover:text-[--color-secondary]">Contact</a>
          </nav>
        </div>
      </header>

      <main id="home">
        {/* Hero */}
        <section className="bg-white/70 bg-grid">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white px-5 py-2 text-sm uppercase tracking-widest text-[--color-muted] animate-in">
                  Hi, I'm
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-[var(--font-heading)] uppercase animate-in whitespace-nowrap">SRI HARSHA</h1>
                <div className="mt-4 h-1.5 w-32 rounded-full bg-[--color-secondary]/80 animate-in"></div>
                <p className="mt-6 text-2xl md:text-3xl text-[--color-secondary] font-semibold animate-in">Engineering Manager - OSPO</p>
                <div className="mt-3 flex items-center gap-3 animate-in">
                  <span className="text-sm uppercase tracking-widest text-[--color-muted]">at</span>
                  <img
                    src="/lt/25px.svg"
                    alt="LambdaTest logo"
                    className="h-8 border-0 ring-0 outline-none shadow-none"
                    style={{ clipPath: 'inset(2px)' }}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="neural-bg rounded-2xl"></div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in-delayed">
                  <img
                    src="/sri.jpg"
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
        <section id="about" className="bg-white/70 border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <SectionHeading eyebrow="about" title="About me" />
            <p className="max-w-3xl text-[--color-accent] text-justify">
              Over the years, I've worked on making test suites trustworthy and fast — from browser to mobile — with a strong focus on JavaScript tooling. I actively contribute to opensource projects as a committer to Selenium and WebdriverIO, and participate in SeleniumHQ's Technical Leadership Committee.
            </p>
            <p className="mt-4 max-w-3xl text-[--color-accent] text-justify">
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
        <section id="projects" className="bg-white/70 border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="projects" title="GitHub projects I contribute to" />
              <a href="#projects" className="inline-flex items-center gap-2 text-[--color-secondary] hover:underline">
                view all projects <span className="text-lg">&#10148;</span>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
                  <div className="aspect-[16/10] overflow-hidden bg-white flex items-center justify-center p-8">
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
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[--color-secondary] hover:underline text-sm">
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
        <section className="bg-white/70">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
            <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">quote of the day</div>
            <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed">
              "Success is not final; failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="mt-4 text-[--color-muted]">-Winston Churchill</p>
          </div>
        </section>


        {/* Blogs */}
        <section id="blogs" className="bg-white/70 border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="blogs" title="blogs" />
              <a href="#blogs" className="inline-flex items-center gap-2 text-[--color-secondary] hover:underline">
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
                  className="group rounded-lg border border-black/5 bg-white p-5 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                >
                  <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                    {b.category} &nbsp;/&nbsp; {b.date}
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug group-hover:text-[--color-secondary] transition">{b.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>


      </main>

      <footer id="contact" className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="text-xl font-extrabold tracking-tight">Sri Harsha</div>
              <p className="mt-3 text-[--color-accent]">
                Just feel free to contact if you wanna collaborate with me, or simply have a conversation.
              </p>
            </div>
            <div>
              <div className="font-semibold">Connect</div>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  className="inline-flex items-center gap-2 text-[--color-secondary] hover:underline"
                  href="https://github.com/harsha509"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="inline-flex items-center gap-2 text-[--color-secondary] hover:underline"
                  href="https://www.linkedin.com/in/sriharsha509/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <div className="font-semibold">Menu</div>
              <nav className="mt-2 grid grid-cols-2 gap-y-1 text-[--color-accent]">
                <a href="#home" className="hover:text-[--color-secondary]">Home</a>
                <a href="#about" className="hover:text-[--color-secondary]">About</a>
                <a href="#projects" className="hover:text-[--color-secondary]">GitHub Projects</a>
                <a href="#blogs" className="hover:text-[--color-secondary]">Blogs</a>
                <a href="#contact" className="hover:text-[--color-secondary]">Contact</a>
              </nav>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6 text-sm text-[--color-muted]">
            <div>&copy; {new Date().getFullYear()} Sri Harsha</div>
            <div className="flex items-center gap-4">
              <a
                className="hover:text-[--color-secondary] transition"
                href="https://github.com/harsha509"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                className="hover:text-[--color-secondary] transition"
                href="https://www.linkedin.com/in/sriharsha509/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
