'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AstrolabeMedallion({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center pointer-events-none select-none ${className || ''}`}
    >
      {/* Outer slow-spinning zodiac / coordinate ring */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        viewBox="0 0 400 400"
        className="absolute w-full h-full text-[var(--gold)]/25"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="200" cy="200" r="190" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="200" cy="200" r="182" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="168" strokeWidth="0.75" />

        {/* 12 Celestial Coordinate Spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 200 + Math.cos(angle) * 168;
          const y1 = 200 + Math.sin(angle) * 168;
          const x2 = 200 + Math.cos(angle) * 190;
          const y2 = 200 + Math.sin(angle) * 190;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          );
        })}
      </motion.svg>

      {/* Middle counter-rotating armillary ring with degree ticks */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        viewBox="0 0 320 320"
        className="absolute w-[80%] h-[80%] text-[var(--gold)]/30"
        fill="none"
        stroke="currentColor"
      >
        <ellipse cx="160" cy="160" rx="145" ry="50" strokeWidth="1" strokeDasharray="6 3" />
        <ellipse cx="160" cy="160" rx="50" ry="145" strokeWidth="1" strokeDasharray="6 3" />
        <circle cx="160" cy="160" r="130" strokeWidth="1.2" />

        {/* Fleur-de-lis / Star points */}
        <polygon points="160,10 164,28 175,28 166,35 170,48 160,40 150,48 154,35 145,28 156,28" fill="currentColor" fillOpacity="0.4" />
        <polygon points="160,310 164,292 175,292 166,285 170,272 160,280 150,272 154,285 145,292 156,292" fill="currentColor" fillOpacity="0.4" />
      </motion.svg>

      {/* Inner glowing celestial meridian */}
      <div className="absolute w-[60%] h-[60%] rounded-full border border-[var(--gold)]/30 bg-radial from-[var(--gold)]/10 via-transparent to-transparent animate-pulse" />
    </div>
  );
}
