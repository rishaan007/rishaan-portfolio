'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTechBackgroundProps {
  variant?: 'cyan-gold' | 'auric-emerald';
  className?: string;
  density?: 'normal' | 'dense';
}

export function AnimatedTechBackground({
  variant = 'cyan-gold',
  className = '',
  density = 'normal',
}: AnimatedTechBackgroundProps) {
  const isCyan = variant === 'cyan-gold';

  // Mathematical & Algorithmic Glyphs floating in the ethereal background
  const mathematicalGlyphs = [
    { text: '∇_θ L(θ)', x: '12%', y: '18%', delay: 0, duration: 8 },
    { text: 'Softmax(QKᵀ / √d)', x: '82%', y: '22%', delay: 1.5, duration: 9 },
    { text: 'ΔF / F = (R_p / R_★)²', x: '25%', y: '75%', delay: 2.2, duration: 7.5 },
    { text: 'φ_i(v) ∈ H', x: '78%', y: '68%', delay: 0.8, duration: 8.5 },
    { text: 'INT8 ↦ ℝ^d', x: '48%', y: '88%', delay: 3, duration: 7 },
    { text: 'y = σ(W · x + b)', x: '8%', y: '60%', delay: 1.2, duration: 9.5 },
    { text: '∑_{t=1}^T log P(w_t)', x: '68%', y: '42%', delay: 2.7, duration: 8 },
    { text: 'λ_box + λ_cls + λ_dfl', x: '35%', y: '15%', delay: 0.5, duration: 10 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* 1. Large Ambient Breathing Radial Halos */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-1/4 -left-36 w-[650px] h-[650px] rounded-full bg-radial ${
          isCyan
            ? 'from-[var(--gold)]/15 via-cyan-500/10 to-transparent'
            : 'from-emerald-500/15 via-[var(--gold)]/10 to-transparent'
        } blur-3xl`}
      />

      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`absolute bottom-1/4 -right-36 w-[650px] h-[650px] rounded-full bg-radial ${
          isCyan
            ? 'from-cyan-500/15 via-[var(--gold)]/10 to-transparent'
            : 'from-[var(--gold)]/15 via-emerald-500/10 to-transparent'
        } blur-3xl`}
      />

      {/* 2. Slow Orbiting Neoclassical Astrolabe & Armillary Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none opacity-[0.06]">
        {/* Outer Revolving Degree Ring */}
        <motion.svg
          viewBox="0 0 500 500"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full text-[var(--gold)]"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="250" cy="250" r="240" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="225" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="190" strokeWidth="0.75" strokeDasharray="12 4" />
          {/* Cardinal Axis Markers */}
          <line x1="250" y1="5" x2="250" y2="495" strokeWidth="0.5" />
          <line x1="5" y1="250" x2="495" y2="250" strokeWidth="0.5" />
          {/* Diagonal Ticks */}
          <line x1="77" y1="77" x2="423" y2="423" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="423" y1="77" x2="77" y2="423" strokeWidth="0.5" strokeDasharray="3 3" />
        </motion.svg>

        {/* Counter-Revolving Inner Celestial Sphere */}
        <motion.svg
          viewBox="0 0 500 500"
          animate={{ rotate: -360 }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-16 text-cyan-400"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="250" cy="250" r="160" strokeWidth="0.8" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="120" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="80" strokeWidth="0.75" strokeDasharray="2 4" />
          {/* Inner Hexagram Astrolabe Web */}
          <polygon
            points="250,90 388,330 112,330"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />
          <polygon
            points="250,410 112,170 388,170"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />
        </motion.svg>
      </div>

      {/* 3. Sweeping Holographic Laser Scanline */}
      <motion.div
        animate={{ y: ['-10%', '650%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 h-44 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent" />
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent shadow-[0_0_12px_#38BDF8]" />
      </motion.div>

      {/* 4. Secondary Auric Laser Beam Sweeping in Counter-Cycle */}
      <motion.div
        animate={{ y: ['650%', '-10%'] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute inset-x-0 h-36 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[var(--gold)]/[0.03] to-transparent" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent shadow-[0_0_10px_#D4AF37]" />
      </motion.div>

      {/* 5. Floating Mathematical Formulations & Tensor Ticks */}
      {mathematicalGlyphs.map((glyph, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -18, 0],
            rotate: [-1.5, 1.5, -1.5],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: glyph.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: glyph.delay,
          }}
          style={{ left: glyph.x, top: glyph.y }}
          className="absolute font-mono text-[11px] sm:text-xs text-[var(--gold)] tracking-widest pointer-events-none select-none blur-[0.3px]"
        >
          {glyph.text}
        </motion.div>
      ))}

      {/* 6. Pulsing Neural Nodes at Coordinates */}
      <div className="absolute inset-0">
        {[
          { x: '18%', y: '28%', delay: 0 },
          { x: '32%', y: '62%', delay: 1.5 },
          { x: '64%', y: '18%', delay: 0.8 },
          { x: '82%', y: '52%', delay: 2.1 },
          { x: '45%', y: '40%', delay: 1.2 },
          { x: '72%', y: '80%', delay: 2.8 },
          { x: '22%', y: '85%', delay: 0.4 },
        ].map((node, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            }}
            style={{ left: node.x, top: node.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38BDF8]"
          >
            <div className="absolute -inset-1 rounded-full border border-[var(--gold)]/40" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
