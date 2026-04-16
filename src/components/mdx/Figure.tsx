interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full rounded-xl border border-white/10 bg-black/20"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[--color-muted]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
