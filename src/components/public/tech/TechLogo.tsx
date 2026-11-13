'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedMacbookLogo } from './AnimatedMacbookLogo';

export function TechLogo() {
  return (
    <div className="relative flex items-center justify-center select-none group py-0.5">
      {/* Outer slow-spinning HUD ring with coordinate notches */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-2 w-14 h-14 pointer-events-none"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[var(--gold)]/35 group-hover:text-[var(--gold)]/80 transition-colors"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="50" cy="50" r="41" strokeWidth="0.6" strokeOpacity="0.4" />
          {/* Cardinal North/South/East/West ticks */}
          <line x1="50" y1="2" x2="50" y2="7" strokeWidth="1.5" stroke="#38BDF8" />
          <line x1="50" y1="93" x2="50" y2="98" strokeWidth="1.5" stroke="#38BDF8" />
          <line x1="2" y1="50" x2="7" y2="50" strokeWidth="1.5" stroke="#38BDF8" />
          <line x1="93" y1="50" x2="98" y2="50" strokeWidth="1.5" stroke="#38BDF8" />
        </svg>
      </motion.div>

      {/* Orbiting Cyan Telemetry Satellite Dot */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-2 w-14 h-14 pointer-events-none"
      >
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
      </motion.div>

      {/* Central Animated MacBook Unit */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
        <AnimatedMacbookLogo size="sm" showAura={true} />
      </div>

      {/* Micro Status Diode */}
      <span className="absolute -bottom-0.5 -right-0.5 z-20 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
    </div>
  );
}
