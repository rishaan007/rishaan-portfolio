'use client';

import { cn } from '@/lib/utils';

interface CornerOrnamentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CornerOrnament({ position, size = 'md', className }: CornerOrnamentProps) {
  const sizeMap = { sm: 24, md: 40, lg: 56 };
  const s = sizeMap[size];

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  const rotationMap = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270,
  };

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 40 40"
      fill="none"
      className={cn(
        'absolute text-[var(--gold)] opacity-30 pointer-events-none',
        positionClasses[position],
        className
      )}
      style={{ transform: `rotate(${rotationMap[position]}deg)` }}
    >
      <path d="M0 0 L0 15 Q0 5, 5 2 L0 0Z" fill="currentColor" opacity="0.3" />
      <path d="M0 0 L15 0 Q5 0, 2 5 L0 0Z" fill="currentColor" opacity="0.3" />
      <path d="M0 0 L12 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M0 0 L0 12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M2 2 Q2 8, 8 8" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.4" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

interface SectionFrameProps {
  children: React.ReactNode;
  className?: string;
  showCorners?: boolean;
}

export function SectionFrame({ children, className, showCorners = true }: SectionFrameProps) {
  return (
    <div className={cn('relative', className)}>
      {showCorners && (
        <>
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
