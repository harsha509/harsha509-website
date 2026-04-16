interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="uppercase tracking-widest text-sm text-[--color-muted] mb-2">{eyebrow}</div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-[--color-muted] mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
