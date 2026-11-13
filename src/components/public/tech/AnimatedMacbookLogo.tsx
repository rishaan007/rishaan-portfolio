'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedMacbookLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
}

export function AnimatedMacbookLogo({
  size = 'md',
  className = '',
  showAura = true,
}: AnimatedMacbookLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Dimension scaling
  const dimensions = {
    xs: { width: 34, height: 24 },
    sm: { width: 44, height: 32 },
    md: { width: 72, height: 50 },
    lg: { width: 124, height: 86 },
    xl: { width: 180, height: 126 },
  }[size];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Ambient Pulsing Aura behind MacBook */}
      {showAura && (
        <motion.div
          animate={{
            scale: isHovered ? [1.1, 1.4, 1.1] : [1, 1.18, 1],
            opacity: isHovered ? [0.7, 1, 0.7] : [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--gold)]/35 via-cyan-400/25 to-emerald-400/15 blur-md pointer-events-none"
        />
      )}

      {/* MacBook SVG Structure */}
      <motion.svg
        animate={{
          y: isHovered ? -3 : 0,
          rotateX: isHovered ? 6 : 0,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        viewBox="0 0 100 70"
        className="w-full h-full overflow-visible filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
        fill="none"
      >
        {/* ================= Display Lid ================= */}
        <g className="transition-transform duration-300">
          {/* Display Outer Bezel (Aluminum & Gold Trim) */}
          <rect
            x="14"
            y="6"
            width="72"
            height="46"
            rx="3.5"
            fill="#121622"
            stroke="#D4AF37"
            strokeWidth={isHovered ? '1.6' : '1.2'}
            className="transition-all duration-300"
          />

          {/* Liquid Retina Screen Surface */}
          <rect
            x="17"
            y="9"
            width="66"
            height="40"
            rx="2"
            fill="#080A0E"
          />

          {/* Screen Display Content: Animated Tech Hologram */}
          <g opacity="0.95">
            {/* Ambient Screen Grid Lines */}
            <line x1="20" y1="18" x2="80" y2="18" stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="0.5" />
            <line x1="20" y1="28" x2="80" y2="28" stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="0.5" />
            <line x1="20" y1="38" x2="80" y2="38" stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="0.5" />

            {/* Simulated Code Lines */}
            <motion.line
              x1="22"
              y1="15"
              x2="48"
              y2="15"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.line
              x1="22"
              y1="21"
              x2="60"
              y2="21"
              stroke="#E5C07B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <motion.line
              x1="26"
              y1="27"
              x2="70"
              y2="27"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.5, 0.95, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.line
              x1="26"
              y1="33"
              x2="52"
              y2="33"
              stroke="#F43F5E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Glowing Command Prompt Cursor */}
            <motion.rect
              x="22"
              y="38"
              width="4"
              height="6"
              fill="#38BDF8"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <line x1="28" y1="41" x2="42" y2="41" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />

            {/* Glowing Authentic Apple Icon Silhouette */}
            <g className="transition-opacity duration-300" opacity={isHovered ? 0.95 : 0.65}>
              {/* Apple Leaf */}
              <path
                d="M50.8 24.2 c-0.5 -0.6 -0.8 -1.4 -0.6 -2.2 c0.7 0 1.5 0.5 1.9 1.1 c0.4 0.5 0.7 1.3 0.6 2.1 c-0.7 0.1 -1.4 -0.4 -1.9 -1.0 z"
                fill="#D4AF37"
              />
              {/* Apple Body with Bite */}
              <path
                d="M53.6 27.6 c-0.4 0.7 -0.9 1.3 -1.5 1.3 c-0.6 0 -0.9 -0.4 -1.7 -0.4 c-0.8 0 -1 0.4 -1.7 0.4 c-0.6 0 -1.2 -0.6 -1.6 -1.4 c-0.9 -1.5 -1 -3 -0.4 -3.9 c0.6 -0.9 1.5 -1.5 2.5 -1.5 c0.6 0 1.2 0.4 1.6 0.4 c0.4 0 1.1 -0.4 1.8 -0.4 c0.4 0 1.4 0.1 2.2 1 c-0.1 0.1 -1.3 0.7 -1.3 2.2 c0 1.8 1.5 2.3 1.6 2.3 c0 0.1 -0.3 1 -1.2 1.8 z"
                fill="#D4AF37"
              />
              {/* Apple Halo Orbit Ring */}
              <motion.circle
                cx="50.5"
                cy="26"
                r="6.5"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="0.6"
                strokeDasharray="2 3"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          </g>

          {/* Web Camera Dot & Center Notch */}
          <circle cx="50" cy="7.5" r="0.8" fill="#10B981" />
        </g>

        {/* ================= Display Hinge ================= */}
        <rect
          x="38"
          y="50.5"
          width="24"
          height="3"
          rx="1"
          fill="#1C2333"
          stroke="#D4AF37"
          strokeWidth="0.5"
        />

        {/* ================= Keyboard Base / Deck ================= */}
        {/* Base Unibody Chassis with Neoclassical Auric Edge */}
        <path
          d="M6 53.5 L94 53.5 L88 64 C87 65.5 85 66 83 66 L17 66 C15 66 13 65.5 12 64 Z"
          fill="#161C28"
          stroke="#D4AF37"
          strokeWidth="1.2"
        />

        {/* Top Deck Keyboard Recess */}
        <polygon
          points="20,55 80,55 77,59 23,59"
          fill="#0B0D12"
          stroke="#D4AF37"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />

        {/* Keyboard Key Strips Glowing with Cyan Backlight */}
        <line
          x1="25"
          y1="57"
          x2="75"
          y2="57"
          stroke={isHovered ? '#38BDF8' : '#D4AF37'}
          strokeOpacity={isHovered ? '0.85' : '0.4'}
          strokeWidth="0.9"
          strokeDasharray="3 1.5"
          className="transition-colors duration-300"
        />

        {/* Force Touch Trackpad with Gold Border */}
        <rect
          x="41"
          y="60.5"
          width="18"
          height="4"
          rx="0.8"
          fill="#0F131D"
          stroke="#D4AF37"
          strokeOpacity={isHovered ? '0.9' : '0.6'}
          strokeWidth="0.6"
          className="transition-all duration-300"
        />

        {/* Display Opening Thumb Notch */}
        <path
          d="M45 53.5 Q50 55.5 55 53.5"
          stroke="#E5C07B"
          strokeWidth="1"
          fill="none"
        />

        {/* Bottom Chassis Glow Reflection */}
        <line
          x1="18"
          y1="66.5"
          x2="82"
          y2="66.5"
          stroke="#38BDF8"
          strokeOpacity={isHovered ? '0.8' : '0.25'}
          strokeWidth="1"
          className="transition-all duration-300"
        />
      </motion.svg>
    </div>
  );
}
