export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover?: string;
  tags?: string[];
  readingMinutes?: number;
  /**
   * When true, the post is hidden from the production build entirely.
   * In dev (`npm run dev`) drafts are visible and marked with a DRAFT badge
   * so you can keep iterating before publishing.
   */
  draft?: boolean;
  external?: {
    url: string;
    publisher: string;
  };
}
