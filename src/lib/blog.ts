import type { ComponentType } from 'react';
import type { BlogFrontmatter } from './blog-types';

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  Component: ComponentType;
  isExternal: boolean;
}

interface MdxModule {
  default: ComponentType;
  frontmatter: BlogFrontmatter;
}

// Eagerly import every post at build time. Vite handles the glob.
const modules = import.meta.glob<MdxModule>('../content/blog/*.mdx', {
  eager: true,
});

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
  }))
  .filter((p) => p.frontmatter && p.frontmatter.title)
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
