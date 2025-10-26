import { useState } from "react";
import NeuralBackground from "./components/NeuralBackground";

type PortfolioItem = { title: string; image?: string; link?: string; };
type BlogItem = { category: string; date: string; title: string; };

const portfolio: PortfolioItem[] = [
  { title: "Selenium", image: "https://picsum.photos/seed/selenium/800/600", link: "https://github.com/SeleniumHQ/selenium" },
  { title: "Appium", image: "https://picsum.photos/seed/appium/800/600", link: "https://github.com/appium/appium" },
  { title: "WebdriverIO", image: "https://picsum.photos/seed/webdriverio/800/600", link: "https://github.com/webdriverio/webdriverio" },
];

const blogs: BlogItem[] = [
  { category: "Graphic Design", date: "July 1, 2021", title: "Graphic Designing Useful Tips & Best Practices" },
  { category: "Graphic Design", date: "July 1, 2021", title: "basic typography rules for ui designing" },
  { category: "Graphic Design", date: "July 1, 2021", title: "top 10 graphic designs review in 2021" },
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
  const [email, setEmail] = useState("");

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
        <section className="bg-white/95 bg-grid">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-xs uppercase tracking-widest text-[--color-muted] animate-in">
                  Hi, I'm
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-[var(--font-heading)] uppercase animate-in">SRI HARSHA</h1>
                <div className="mt-3 h-1 w-24 rounded-full bg-[--color-secondary]/80 animate-in"></div>
                <p className="mt-4 text-xl text-[--color-secondary] font-semibold animate-in">Engineering Manager - OSPO</p>
                <div className="mt-2 flex items-center gap-2 animate-in">
                  <span className="text-xs uppercase tracking-widest text-[--color-muted]">at</span>
                  <img
                    src="/lt/25px.svg"
                    alt="LambdaTest logo"
                    className="h-6 border-0 ring-0 outline-none shadow-none"
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
        <section id="about" className="bg-white/95 border-t border-black/5">
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
        <section id="projects" className="bg-white/95 border-t border-black/5">
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
                  <div className="aspect-[16/10] overflow-hidden bg-black/5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
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
        <section className="bg-white/95">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
            <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">quote of the day</div>
            <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed">
              "Success is not final; failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="mt-4 text-[--color-muted]">-Winston Churchill</p>
          </div>
        </section>


        {/* Blogs */}
        <section id="blogs" className="bg-white/95 border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="blogs" title="latest news" />
              <a href="#blogs" className="inline-flex items-center gap-2 text-[--color-secondary] hover:underline">
                view all blogs <span className="text-lg">&#10148;</span>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {blogs.map((b) => (
                <article key={b.title} className="rounded-lg border border-black/5 bg-white p-5 shadow-sm hover:shadow-md transition">
                  <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                    {b.category} &nbsp;/&nbsp; {b.date}
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{b.title}</h3>
                </article>
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
              <a
                className="mt-2 inline-flex items-center gap-2 text-[--color-secondary]"
                href="https://www.linkedin.com/in/sriharsha509/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
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
            <div className="flex items-center gap-3">
              <a
                className="hover:text-[--color-secondary]"
                href="https://www.linkedin.com/in/sriharsha509/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
