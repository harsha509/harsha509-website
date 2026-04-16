import type { ReactNode } from 'react';

type Variant = 'info' | 'tip' | 'warn' | 'danger';

interface CalloutProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}

const variantStyles: Record<Variant, { border: string; bg: string; label: string }> = {
  info: {
    border: 'border-sky-400/30',
    bg: 'bg-sky-400/5',
    label: 'text-sky-300',
  },
  tip: {
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/5',
    label: 'text-emerald-300',
  },
  warn: {
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/5',
    label: 'text-amber-300',
  },
  danger: {
    border: 'border-rose-400/30',
    bg: 'bg-rose-400/5',
    label: 'text-rose-300',
  },
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
  const style = variantStyles[variant];
  return (
    <aside
      className={`my-6 rounded-xl border ${style.border} ${style.bg} px-5 py-4 text-[--color-body]`}
    >
      {title && (
        <div
          className={`mb-1 text-xs font-semibold uppercase tracking-widest ${style.label}`}
        >
          {title}
        </div>
      )}
      <div className="[&>p]:m-0 [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}
