import type { ComponentType } from 'react';
import type { BlogFrontmatter } from './blog-types';

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  Component: ComponentType;
  isExternal: boolean;
  isDraft: boolean;
}

/**
 * Drafts are hidden from the production bundle so the site never leaks
 * unfinished posts. In dev (`npm run dev`) they remain visible with a
 * DRAFT badge so you can keep editing them.
 */
const hideDrafts = import.meta.env.PROD;

interface MdxModule {
  default: ComponentType;
  frontmatter: BlogFrontmatter;
}

// Published posts: always bundled.
const publishedModules = import.meta.glob<MdxModule>('../content/blog/*.mdx', {
  eager: true,
});

/**
 * Draft-folder posts: only bundled in dev. Any file placed under
 * `src/content/blog/_drafts/` is completely excluded from the
 * production build (Vite tree-shakes the `false` branch at build time).
 */
const draftFolderModules: Record<string, MdxModule> = import.meta.env.DEV
  ? import.meta.glob<MdxModule>('../content/blog/_drafts/*.mdx', { eager: true })
  : {};

const modules: Record<string, MdxModule> = {
  ...publishedModules,
  ...draftFolderModules,
};

const draftPaths = new Set(Object.keys(draftFolderModules));

const derivingSlug = (path: string): string => {
  const file = path.split('/').pop() ?? '';
  return file
    .replace(/\.mdx$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');
};

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: derivingSlug(path),
    frontmatter: mod.frontmatter,
    Component: mod.default,
    isExternal: Boolean(mod.frontmatter?.external?.url),
    isDraft: Boolean(mod.frontmatter?.draft) || draftPaths.has(path),
  }))
  .filter((p) => p.frontmatter && p.frontmatter.title)
  .filter((p) => !hideDrafts || !p.isDraft)
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const internal = blogPosts.filter((p) => !p.isExternal);
  const idx = internal.findIndex((p) => p.slug === slug);
  return {
    previous: idx >= 0 ? internal[idx + 1] : undefined,
    next: idx > 0 ? internal[idx - 1] : undefined,
  };
}

export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getPublisherHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
