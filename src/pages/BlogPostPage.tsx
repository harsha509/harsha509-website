import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import GridBackground from '../components/GridBackground';
import MdxProvider from '../components/mdx/MdxProvider';
import Pill from '../components/Pill';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { formatBlogDate, getAdjacentPosts, getPostBySlug } from '../lib/blog';

const BackArrow = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.frontmatter.title} | Sri Harsha`;
      const desc = post.frontmatter.excerpt;
      if (desc) {
        let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = desc;
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  if (post.isExternal && post.frontmatter.external) {
    // Shouldn't usually hit this (external cards open in new tab), but if someone lands on
    // /#/blog/:slug for an external post, redirect them to the canonical URL.
    window.location.replace(post.frontmatter.external.url);
    return null;
  }

  const { frontmatter, Component } = post;
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <>
      <GridBackground />
      <SiteHeader />

      <main className="relative z-10">
        <article className="bg-[--color-surface]">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <Link
              to="/blog"
              className="link-hover-line inline-flex items-center gap-2 text-sm text-[--color-muted] transition-colors hover:text-[--color-secondary]"
            >
              <BackArrow />
              Back to blog
            </Link>

            <header className="mt-8">
              <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                {[
                  frontmatter.category,
                  formatBlogDate(frontmatter.date),
                  frontmatter.readingMinutes ? `${frontmatter.readingMinutes} min read` : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </div>
              <h1 className="mt-4 font-[var(--font-heading)] text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                {frontmatter.title}
              </h1>
              {frontmatter.excerpt && (
                <p className="mt-5 text-lg text-[--color-accent]">{frontmatter.excerpt}</p>
              )}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {frontmatter.tags.map((t) => (
                    <Pill key={t} className="!px-3 !py-1 text-xs">
                      {t}
                    </Pill>
                  ))}
                </div>
              )}
            </header>

            {frontmatter.cover && (
              <img
                src={frontmatter.cover}
                alt=""
                loading="eager"
                decoding="async"
                className="mt-10 w-full rounded-2xl border border-white/10 bg-black/20"
              />
            )}

            <div className="prose prose-invert mt-10 max-w-none prose-headings:font-[var(--font-heading)] prose-headings:tracking-tight prose-a:text-[--color-secondary] prose-a:no-underline hover:prose-a:underline prose-code:text-[--color-secondary] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-blockquote:border-l-[--color-secondary] prose-blockquote:text-[--color-accent] prose-img:rounded-xl prose-hr:border-white/10">
              <MdxProvider>
                <Component />
              </MdxProvider>
            </div>

            {(previous || next) && (
              <nav
                aria-label="Post navigation"
                className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    to={`/blog/${previous.slug}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
                  >
                    <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                      ← Previous
                    </div>
                    <div className="mt-2 text-base font-semibold group-hover:text-[--color-secondary]">
                      {previous.frontmatter.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={`/blog/${next.slug}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 text-right transition hover:border-white/20"
                  >
                    <div className="text-xs uppercase tracking-widest text-[--color-muted]">
                      Next →
                    </div>
                    <div className="mt-2 text-base font-semibold group-hover:text-[--color-secondary]">
                      {next.frontmatter.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
