import { Link } from 'react-router-dom';
import { useSectionNav } from '../lib/useSectionNav';

const footerLinkClass =
  'link-hover-line w-fit rounded-sm transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-secondary]';

export default function SiteFooter() {
  const goToSection = useSectionNav();

  const onSectionClick =
    (section: 'home' | 'about' | 'projects' | 'contact') =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      goToSection(section);
    };

  return (
    <footer id="contact" className="bg-[--color-surface-solid]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[--color-muted]">
              On this site
            </p>
            <nav aria-label="Footer site links" className="mt-5 flex max-w-md flex-col gap-3 text-sm text-[--color-accent]">
              <a href="/" onClick={onSectionClick('home')} className={footerLinkClass}>
                Home
              </a>
              <a href="/#about" onClick={onSectionClick('about')} className={footerLinkClass}>
                About
              </a>
              <a href="/#projects" onClick={onSectionClick('projects')} className={footerLinkClass}>
                GitHub Projects
              </a>
              <Link to="/blog" className={footerLinkClass}>
                Blog
              </Link>
              <a href="/#contact" onClick={onSectionClick('contact')} className={footerLinkClass}>
                Contact
              </a>
            </nav>
          </div>
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[--color-muted]">
              Connect
            </p>
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
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
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
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
  );
}
