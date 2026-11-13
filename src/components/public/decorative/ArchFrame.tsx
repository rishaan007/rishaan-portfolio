'use client';

import { cn } from '@/lib/utils';

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'portrait' | 'project' | 'decorative';
}

export function ArchFrame({ children, className, variant = 'portrait' }: ArchFrameProps) {
  if (variant === 'portrait') {
    return (
      <div className={cn('relative mx-auto', className)}>
        {/* Outer ornamental frame */}
        <div className="absolute -inset-4 rounded-t-[50%] border border-[var(--gold)]/20" />
        <div className="absolute -inset-2 rounded-t-[50%] border border-[var(--gold)]/10" />
        
        {/* Main arch container */}
        <div className="relative overflow-hidden rounded-t-[50%] border-2 border-[var(--gold)]/30 bg-[var(--cream)]">
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[var(--gold)]/40" />
          <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[var(--gold)]/40" />
          {children}
        </div>
        
        {/* Base decoration */}
        <div className="mx-auto mt-2 h-1 w-3/4 bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
      </div>
    );
  }

  if (variant === 'project') {
    return (
      <div className={cn('group relative overflow-hidden rounded-t-[40%]', className)}>
        {/* Ornamental border */}
        <div className="absolute inset-0 z-10 rounded-t-[40%] border border-[var(--gold)]/20 pointer-events-none" />
        <div className="absolute inset-1 z-10 rounded-t-[40%] border border-[var(--gold)]/10 pointer-events-none" />
        
        {/* Content */}
        <div className="relative overflow-hidden rounded-t-[40%] bg-[var(--cream)]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-t-[45%] border border-[var(--gold)]/20', className)}>
      {children}
    </div>
  );
}
