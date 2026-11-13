'use client';

import React, { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#0E121B] z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--gold)] via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-all duration-75 relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading Laser Flare */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#38BDF8] blur-[1px]" />
      </div>
    </div>
  );
}
