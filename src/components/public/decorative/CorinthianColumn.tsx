'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ColumnProps {
  side: 'left' | 'right';
  className?: string;
}

export function CorinthianColumn({ side, className }: ColumnProps) {
  const isLeft = side === 'left';

  return (
    <aside
      aria-hidden="true"
      className={`fixed top-0 bottom-0 ${
        isLeft ? 'left-0' : 'right-0'
      } w-8 sm:w-12 md:w-14 lg:w-16 xl:w-20 pointer-events-none z-30 flex flex-col items-center justify-between select-none ${
        className || ''
      }`}
    >
      {/* ================= Pylon Capital (Top Head) ================= */}
      <div className="w-full pt-2 flex flex-col items-center">
        {/* Micro Telemetry Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs bg-[#0E121B]/90 border border-[var(--gold)]/40 text-[8px] font-mono mb-1 text-[var(--gold)] ${
            isLeft ? 'self-start ml-2' : 'self-end mr-2'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="hidden xl:inline">{isLeft ? 'COL.ALPHA' : 'COL.OMEGA'}</span>
        </div>

        {/* Neoclassical Corinthian Capital SVG with Cyber HUD Notches */}
        <svg
          viewBox="0 0 100 85"
          className="w-full text-[var(--gold)] filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          fill="none"
          stroke="currentColor"
        >
          {/* Abacus & Entablature Moulding with Cyan Laser Accents */}
          <rect x="2" y="2" width="96" height="10" rx="1" fill="#141A28" stroke="#D4AF37" strokeWidth="1.4" />
          <line x1="6" y1="7" x2="94" y2="7" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 2" />
          <rect x="8" y="12" width="84" height="6" fill="#101422" stroke="#D4AF37" strokeWidth="1" />

          {/* Acanthus Volute Scrolls */}
          <path
            d="M10 22 C24 24, 30 32, 26 46 C22 40, 15 36, 10 32 Z"
            fill="#1E2538"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          <path
            d="M90 22 C76 24, 70 32, 74 46 C78 40, 85 36, 90 32 Z"
            fill="#1E2538"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />

          {/* Central Rotating HUD Rosette */}
          <circle cx="50" cy="28" r="7" fill="#0C1018" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="50" cy="28" r="4.5" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="2 1.5" />
          <circle cx="50" cy="28" r="2" fill="#E5C07B" />

          {/* Lower Foliage Arch */}
          <path
            d="M20 52 C35 46, 65 46, 80 52 C70 68, 30 68, 20 52 Z"
            fill="#141A26"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />

          {/* Astragal & Gold Necking Ring */}
          <ellipse cx="50" cy="76" rx="38" ry="4.5" fill="#1A2234" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="12" y1="84" x2="88" y2="84" stroke="#38BDF8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ================= Fluted Shaft & Laser Telemetry Gantry (Middle) ================= */}
      <div className="relative flex-1 w-full flex justify-center overflow-hidden py-1">
        {/* Animated Vertical Laser Pulse traveling continuously down the shaft */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/30 to-[var(--gold)]/40 pointer-events-none blur-xs"
        />

        {/* Fluted Column Shaft SVG with Precision Ticks */}
        <svg
          viewBox="0 0 70 800"
          preserveAspectRatio="none"
          className="w-full h-full text-[var(--gold)]"
          fill="none"
          stroke="currentColor"
        >
          {/* Outer Shaft Borders */}
          <line x1="8" y1="0" x2="8" y2="800" strokeWidth="1.8" stroke="#D4AF37" strokeOpacity="0.8" />
          <line x1="62" y1="0" x2="62" y2="800" strokeWidth="1.8" stroke="#D4AF37" strokeOpacity="0.8" />

          {/* Flute Grooves (Neoclassical Entasis) */}
          <line x1="16" y1="0" x2="16" y2="800" strokeWidth="0.8" stroke="#D4AF37" strokeOpacity="0.35" />
          <line x1="24" y1="0" x2="24" y2="800" strokeWidth="1.4" stroke="#D4AF37" strokeOpacity="0.6" />
          <line x1="32" y1="0" x2="32" y2="800" strokeWidth="0.8" stroke="#38BDF8" strokeOpacity="0.4" />
          <line x1="38" y1="0" x2="38" y2="800" strokeWidth="0.8" stroke="#38BDF8" strokeOpacity="0.4" />
          <line x1="46" y1="0" x2="46" y2="800" strokeWidth="1.4" stroke="#D4AF37" strokeOpacity="0.6" />
          <line x1="54" y1="0" x2="54" y2="800" strokeWidth="0.8" stroke="#D4AF37" strokeOpacity="0.35" />

          {/* Vertical Precision Measurement Ticks every 40px */}
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <line
                x1="8"
                y1={i * 40 + 20}
                x2="14"
                y2={i * 40 + 20}
                stroke="#38BDF8"
                strokeWidth="1.2"
              />
              <line
                x1="56"
                y1={i * 40 + 20}
                x2="62"
                y2={i * 40 + 20}
                stroke="#38BDF8"
                strokeWidth="1.2"
              />
              {/* Major Milestone Ticks */}
              {i % 4 === 0 && (
                <circle
                  cx="35"
                  cy={i * 40 + 20}
                  r="2"
                  fill="#E5C07B"
                  stroke="#101422"
                  strokeWidth="0.5"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Vertical Alphanumeric Telemetry Coordinates Running along the Gantry */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-mono text-[var(--gold)]/70 tracking-[0.3em] uppercase pointer-events-none hidden 2xl:block ${
            isLeft ? 'left-1' : 'right-1'
          }`}
          style={{ writingMode: 'vertical-rl' }}
        >
          {isLeft ? (
            <span>22.5726° N &bull; 88.3639° E // SYS.CALIBRATION // NEOCLASSICAL AI</span>
          ) : (
            <span>MAKAUT NSEC IT &apos;28 // BYTE BRIGADE GUILD // 0xRK ARCH</span>
          )}
        </div>
      </div>

      {/* ================= Classical Attic Base & Stepped Plinth (Bottom) ================= */}
      <div className="w-full pb-2 flex flex-col items-center">
        <svg
          viewBox="0 0 100 75"
          className="w-full text-[var(--gold)] filter drop-shadow-[0_-2px_8px_rgba(0,0,0,0.8)]"
          fill="none"
          stroke="currentColor"
        >
          <line x1="12" y1="4" x2="88" y2="4" stroke="#38BDF8" strokeWidth="1.5" />

          {/* Torus Mouldings with Dark Marble Fills */}
          <ellipse cx="50" cy="14" rx="38" ry="6" fill="#1A2234" stroke="#D4AF37" strokeWidth="1.2" />
          <ellipse cx="50" cy="28" rx="42" ry="7" fill="#141A28" stroke="#D4AF37" strokeWidth="1.4" />

          {/* Stepped Plinth Levels */}
          <rect x="4" y="38" width="92" height="14" fill="#0F131E" stroke="#D4AF37" strokeWidth="1.4" />
          <line x1="8" y1="45" x2="92" y2="45" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2" />

          <rect x="0" y="52" width="100" height="18" rx="1" fill="#0A0D14" stroke="#D4AF37" strokeWidth="1.6" />

          {/* Ground Sensor Diodes */}
          <circle cx="15" cy="61" r="2" fill="#10B981" />
          <circle cx="85" cy="61" r="2" fill="#10B981" />
        </svg>

        {/* Bottom Ground Status Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#0A0D14] border border-emerald-500/30 text-[8px] font-mono text-emerald-400 mt-1 ${
            isLeft ? 'self-start ml-2' : 'self-end mr-2'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden xl:inline">PLINTH_STABLE</span>
        </div>
      </div>
    </aside>
  );
}
