import { Link } from 'react-router-dom';
import { useSectionNav, type SectionId } from '../lib/useSectionNav';

const linkBase =
  'link-hover-line w-fit transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-secondary]';

export default function SiteHeader() {
  const goToSection = useSectionNav();

  const onSectionClick =
    (section: SectionId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      goToSection(section);
    };

  return (
    <header className="sticky top-0 z-40 bg-[--color-header-bg] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="link-hover-line w-fit text-xl font-extrabold tracking-tight transition-colors hover:text-[--color-secondary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-secondary]"
        >
          Sri Harsha
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="/" onClick={onSectionClick('home')} className={linkBase}>
            Home
          </a>
          <a href="/#about" onClick={onSectionClick('about')} className={linkBase}>
            About
          </a>
          <a href="/#projects" onClick={onSectionClick('projects')} className={linkBase}>
            GitHub Projects
          </a>
          <Link to="/blog" className={linkBase}>
            Blog
          </Link>
          <a href="/#contact" onClick={onSectionClick('contact')} className={linkBase}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
