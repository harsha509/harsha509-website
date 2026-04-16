import { useEffect, useMemo, useState } from 'react';
import BlogCard from '../components/BlogCard';
import GridBackground from '../components/GridBackground';
import SectionHeading from '../components/SectionHeading';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { blogPosts } from '../lib/blog';

const ALL_TAG = 'All';

export default function BlogIndexPage() {
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);

  useEffect(() => {
    document.title = 'Blog | Sri Harsha';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of blogPosts) {
      p.frontmatter.tags?.forEach((t) => set.add(t));
    }
    return [ALL_TAG, ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return blogPosts;
    return blogPosts.filter((p) => p.frontmatter.tags?.includes(activeTag));
  }, [activeTag]);

  return (
    <>
      <GridBackground />
      <SiteHeader />

      <main className="relative z-10">
        <section className="bg-[--color-surface]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <SectionHeading
              eyebrow="blog"
              title="Notes from the AI space"
              subtitle="Essays, experiments, and field notes on building with LLMs, agents, and modern AI infra — plus selected posts I've written for other publications."
            />

            {tags.length > 1 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = tag === activeTag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                        active
                          ? 'border-[--color-secondary] bg-[--color-secondary]/10 text-[--color-secondary]'
                          : 'border-white/10 bg-white/5 text-[--color-muted] hover:border-white/20 hover:text-[--color-accent]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-12 text-[--color-muted]">
                No posts match this filter yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
