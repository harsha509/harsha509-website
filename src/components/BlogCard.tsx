import { Link } from 'react-router-dom';
import type { BlogPost } from '../lib/blog';
import { formatBlogDate, getPublisherHost } from '../lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

const ExternalArrow = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7" />
  </svg>
);

function PublisherBadge({ url, publisher }: { url: string; publisher: string }) {
  const host = getPublisherHost(url);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[--color-muted]">
      <img
        src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
        alt=""
        width={14}
        height={14}
        className="rounded-sm"
        aria-hidden="true"
      />
      {publisher}
      <ExternalArrow />
    </span>
  );
}

function CardInner({ post }: BlogCardProps) {
  const { frontmatter, isExternal } = post;
  const metaLine = [
    frontmatter.category,
    formatBlogDate(frontmatter.date),
    frontmatter.readingMinutes ? `${frontmatter.readingMinutes} min read` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-card-bg] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {frontmatter.cover && (
        <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
          <img
            src={frontmatter.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {isExternal && frontmatter.external && (
            <div className="absolute right-3 top-3">
              <PublisherBadge
                url={frontmatter.external.url}
                publisher={frontmatter.external.publisher}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {!frontmatter.cover && isExternal && frontmatter.external && (
          <div className="mb-3">
            <PublisherBadge
              url={frontmatter.external.url}
              publisher={frontmatter.external.publisher}
            />
          </div>
        )}

        <div className="text-xs uppercase tracking-widest text-[--color-muted]">{metaLine}</div>
        <h3 className="mt-3 text-lg font-semibold leading-snug transition group-hover:text-[--color-secondary]">
          {frontmatter.title}
        </h3>
        {frontmatter.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-[--color-accent]">{frontmatter.excerpt}</p>
        )}

        <div className="mt-auto pt-5 text-sm text-[--color-secondary]">
          {isExternal && frontmatter.external ? (
            <span className="inline-flex items-center gap-1.5">
              Read on {getPublisherHost(frontmatter.external.url)}
              <ExternalArrow />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              Read more <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BlogCard({ post }: BlogCardProps) {
  if (post.isExternal && post.frontmatter.external) {
    return (
      <a
        href={post.frontmatter.external.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-secondary] rounded-xl"
      >
        <CardInner post={post} />
      </a>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-secondary] rounded-xl"
    >
      <CardInner post={post} />
    </Link>
  );
}
