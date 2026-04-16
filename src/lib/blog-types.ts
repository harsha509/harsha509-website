export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover?: string;
  tags?: string[];
  readingMinutes?: number;
  external?: {
    url: string;
    publisher: string;
  };
}
