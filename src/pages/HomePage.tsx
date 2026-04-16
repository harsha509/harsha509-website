import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import NeuralBackground from '../components/NeuralBackground';
import Pill from '../components/Pill';
import SectionHeading from '../components/SectionHeading';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { blogPosts } from '../lib/blog';

type PortfolioItem = { title: string; image?: string; link?: string };

const portfolio: PortfolioItem[] = [
  {
    title: 'Selenium',
    image: 'https://www.selenium.dev/images/selenium_logo_square_green.png',
    link: 'https://github.com/SeleniumHQ/selenium',
  },
  {
    title: 'Appium',
    image: 'https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png',
    link: 'https://github.com/appium/appium',
  },
  {
    title: 'WebdriverIO',
    image: 'https://webdriver.io/img/webdriverio.png',
    link: 'https://github.com/webdriverio/webdriverio',
  },
];

interface ScrollState {
  scrollTo?: string;
}

export default function HomePage() {
  const location = useLocation();
  const state = location.state as ScrollState | null;

  useEffect(() => {
    document.title = 'Sri Harsha – Engineering Manager | Portfolio & Blog';

    // If we navigated here from another page with a section target, scroll after mount
    const target = state?.scrollTo;
    if (target) {
      const tryScroll = () => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      requestAnimationFrame(tryScroll);
    }
  }, [state?.scrollTo]);

  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <>
      <NeuralBackground />
      <SiteHeader />

      <main id="home" className="relative z-10">
        {/* Hero */}
        <section className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-[--color-border] bg-[--color-pill-bg] px-5 py-2 text-sm uppercase tracking-widest text-[--color-muted] animate-in">
                  Hi, I'm
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-[var(--font-heading)] uppercase animate-in whitespace-nowrap">
                  SRI HARSHA
                </h1>
                <div className="mt-4 h-1.5 w-32 rounded-full bg-[--color-secondary]/80 animate-in"></div>
                <p className="mt-6 text-xl md:text-2xl text-[--color-secondary] font-medium animate-in">
                  Engineering Manager - OSPO
                </p>
                <div className="mt-4 flex items-center gap-4 animate-in">
                  <span className="text-sm uppercase tracking-widest text-[--color-muted] md:text-base">
                    at
                  </span>
                  <span className="hero-employer-logo">
                    <img
                      src={`${import.meta.env.BASE_URL}testmu-logo-white.png`}
                      alt="TestMu AI logo"
                      className="h-10 w-auto border-0 ring-0 outline-none shadow-none sm:h-12 md:h-14"
                      width={160}
                      height={56}
                      decoding="async"
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
                    fetchPriority="high"
                    decoding="async"
                    width={800}
                    height={1000}
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
              Over the years, I've worked on making test suites trustworthy and fast — from browser
              to mobile — with a strong focus on JavaScript tooling. I actively contribute to
              opensource projects as a committer to Selenium and WebdriverIO, and participate in
              SeleniumHQ's Technical Leadership Committee.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[--color-accent] text-justify">
              Currently serving as an Engineering Manager (OSPO) at LambdaTest, I continue to
              explore better ways to build, test, and collaborate in the opensource ecosystem.
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
              <a
                href="#projects"
                className="link-hover-line inline-flex w-fit items-center gap-2 text-[--color-secondary] transition-colors"
              >
                view all projects <span className="text-lg">&#10148;</span>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-lg border border-[--color-border] bg-[--color-card-bg] shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                >
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
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover-line w-fit text-sm text-[--color-secondary] transition-colors"
                      >
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
            <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">
              quote of the day
            </div>
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed">
              "Success is not final; failure is not fatal: it is the courage to continue that
              counts."
            </blockquote>
            <p className="mt-4 text-[--color-muted]">-Winston Churchill</p>
          </div>
        </section>

        {/* Blogs */}
        <section id="blogs" className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="blogs" title="Latest from the blog" />
              <Link
                to="/blog"
                className="link-hover-line inline-flex w-fit items-center gap-2 text-[--color-secondary] transition-colors"
              >
                view all blogs <span className="text-lg">&#10148;</span>
              </Link>
            </div>
            {latestBlogs.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {latestBlogs.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-[--color-muted]">New posts coming soon.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
