import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import Figure from './Figure';
import Video from './Video';
import YouTube from './YouTube';
import Callout from './Callout';

const components: MDXComponents = {
  Figure: Figure as unknown as MDXComponents['img'],
  Video: Video as unknown as MDXComponents['video'],
  YouTube: YouTube as unknown as MDXComponents['iframe'],
  Callout: Callout as unknown as MDXComponents['aside'],
  img: (props) => (
    <img
      {...props}
      loading="lazy"
      decoding="async"
      className="my-8 w-full rounded-xl border border-white/10 bg-black/20"
    />
  ),
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
};

export default function MdxProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
