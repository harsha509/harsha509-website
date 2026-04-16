import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  className?: string;
}

export default function Pill({ children, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[--color-pill-border] bg-[--color-pill-bg] px-4 py-2 text-sm text-[--color-accent] shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}
