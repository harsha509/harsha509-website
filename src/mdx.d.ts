declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { BlogFrontmatter } from './lib/blog-types';

  export const frontmatter: BlogFrontmatter;
  const Component: ComponentType;
  export default Component;
}
