interface YouTubeProps {
  id: string;
  title?: string;
  caption?: string;
}

export default function YouTube({ id, title = 'YouTube video', caption }: YouTubeProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[--color-muted]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
