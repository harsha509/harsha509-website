interface VideoProps {
  src: string;
  poster?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function Video({
  src,
  poster,
  caption,
  autoPlay = false,
  loop = false,
  muted = false,
}: VideoProps) {
  return (
    <figure className="my-8">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted || autoPlay}
        className="w-full rounded-xl border border-white/10 bg-black"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[--color-muted]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
