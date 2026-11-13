'use client';

import { cn } from '@/lib/utils';

interface OrnamentalDividerProps {
  variant?: 'simple' | 'ornate' | 'gold' | 'section';
  className?: string;
}

export function OrnamentalDivider({ variant = 'simple', className }: OrnamentalDividerProps) {
  if (variant === 'ornate') {
    return (
      <div className={cn('flex items-center justify-center gap-4 py-6', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--cream)] to-[var(--gold)]" />
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[var(--gold)]">
          <path d="M20 0 L25 8 L40 10 L25 12 L20 20 L15 12 L0 10 L15 8 Z" fill="currentColor" opacity="0.6" />
          <circle cx="20" cy="10" r="3" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--cream)] to-[var(--gold)]" />
      </div>
    );
  }

  if (variant === 'gold') {
    return (
      <div className={cn('flex items-center justify-center gap-3 py-8', className)}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold)]" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--gold)]">
          <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" opacity="0.5" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold)]" />
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className={cn('flex items-center justify-center py-10', className)}>
        <div className="flex items-center gap-2">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--cream)]" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-40" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-60" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-80" />
            <div className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-80" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-60" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-40" />
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--cream)]" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center py-4', className)}>
      <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[var(--cream)] to-transparent" />
    </div>
  );
}
