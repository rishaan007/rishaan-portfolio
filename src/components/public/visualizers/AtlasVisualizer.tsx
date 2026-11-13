'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Eye, Compass } from 'lucide-react';

export function AtlasVisualizer() {
  const [phase, setPhase] = useState(0.5);
  const [isAutomated, setIsAutomated] = useState(true);

  useEffect(() => {
    if (!isAutomated) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev >= 1 ? 0 : prev + 0.008));
    }, 40);
    return () => clearInterval(interval);
  }, [isAutomated]);

  // Calculate transit depth dip based on phase distance from 0.5 (transit center)
  const distFromCenter = Math.abs(phase - 0.5);
  const transitActive = distFromCenter < 0.16;
  const transitDip = transitActive
    ? (1 - Math.cos(((0.16 - distFromCenter) / 0.16) * Math.PI)) * 0.45
    : 0;
  const normalizedFlux = (1 - transitDip * 0.045).toFixed(4);

  // Generate 28 points for the light curve
  const points = Array.from({ length: 28 }, (_, i) => {
    const p = i / 27;
    const d = Math.abs(p - 0.5);
    const dip = d < 0.16 ? (1 - Math.cos(((0.16 - d) / 0.16) * Math.PI)) * 0.45 : 0;
    const noise = (Math.sin(i * 9.2) + Math.cos(i * 4.7)) * 0.04;
    const yVal = 40 + dip * 50 + noise * 10;
    return { x: 20 + i * 12.5, y: yVal };
  });

  const pathD = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  return (
    <div className="relative w-full rounded-sm border border-[var(--gold)]/40 bg-gradient-to-b from-[#1a0f14] via-[#24131b] to-[#120a0e] text-[#F5F0E6] p-5 shadow-2xl overflow-hidden font-sans">
      {/* Subtle starfield background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-8 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 bg-[var(--gold)] rounded-full top-12 right-14 animate-ping" />
        <div className="absolute w-1 h-1 bg-white rounded-full bottom-8 left-1/3" />
        <div className="absolute w-1 h-1 bg-[var(--gold)] rounded-full top-1/2 right-1/4" />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/25 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-bold">
            NASA Kepler / TESS Transit Photometry
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--burgundy)]/80 text-[var(--gold)] border border-[var(--gold)]/30">
          Target: K2-138 &bull; Transit Depth: 1.42%
        </span>
      </div>

      {/* Top Graphic: Star and Orbiting Exoplanet Simulation */}
      <div className="relative h-28 w-full flex items-center justify-center overflow-hidden rounded bg-black/40 border border-[var(--gold)]/20 mb-4">
        {/* Stellar Glow */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-600 blur-md opacity-70" />
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center border border-amber-200">
          <span className="text-[9px] font-mono text-amber-950 font-bold opacity-75">Host Star</span>
        </div>

        {/* Orbit Path & Planet */}
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-[var(--gold)]/40 pointer-events-none" />
        <motion.div
          className="absolute z-20 flex flex-col items-center pointer-events-none"
          style={{ left: `${phase * 88 + 6}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div
            className={`w-5 h-5 rounded-full border border-white/60 shadow-lg ${
              transitActive
                ? 'bg-black shadow-[0_0_12px_rgba(0,0,0,0.9)]'
                : 'bg-slate-900 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
            }`}
          />
          <span className="text-[9px] font-mono text-[var(--gold)] mt-1 whitespace-nowrap bg-black/80 px-1 rounded">
            Exoplanet b
          </span>
        </motion.div>
      </div>

      {/* Bottom Graphic: Synthetic Light-Curve Transit Waveform */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--cream)]/80">
          <span>Normalized Flux: <strong className="text-emerald-400">{normalizedFlux}</strong></span>
          <span>Phase: {(phase * 360).toFixed(0)}° ({transitActive ? 'IN TRANSIT' : 'BASELINE'})</span>
        </div>

        <div className="relative h-24 w-full bg-black/50 rounded border border-[var(--gold)]/25 p-2">
          {/* Phase tracker line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 z-10 pointer-events-none"
            style={{ left: `${phase * 88 + 6}%` }}
          />

          <svg viewBox="0 0 380 110" className="w-full h-full overflow-visible">
            {/* Grid lines */}
            <line x1="20" y1="20" x2="365" y2="20" stroke="#B08D57" strokeOpacity="0.15" strokeDasharray="3 3" />
            <line x1="20" y1="65" x2="365" y2="65" stroke="#B08D57" strokeOpacity="0.15" strokeDasharray="3 3" />
            <line x1="20" y1="95" x2="365" y2="95" stroke="#B08D57" strokeOpacity="0.15" strokeDasharray="3 3" />

            {/* Ingress / Egress marker band */}
            <rect x="155" y="10" width="75" height="90" fill="#B08D57" fillOpacity="0.08" />

            {/* Light Curve Path */}
            <path d={pathD} fill="none" stroke="#B08D57" strokeWidth="2.5" />

            {/* Transit dip focus dot */}
            {points.map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={idx === 14 ? 3.5 : 2}
                fill={idx === 14 ? '#34D399' : '#DFCA8D'}
                opacity={0.8}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* SHAP & Hybrid Model Diagnostics */}
      <div className="mt-3 pt-3 border-t border-[var(--gold)]/20 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
        <div className="p-1.5 rounded bg-[var(--burgundy)]/40 border border-[var(--gold)]/20">
          <span className="text-[var(--gold)] block font-bold">1D-CNN</span>
          <span className="text-emerald-300">Transit Dip Extractor</span>
        </div>
        <div className="p-1.5 rounded bg-[var(--burgundy)]/40 border border-[var(--gold)]/20">
          <span className="text-[var(--gold)] block font-bold">Transformer</span>
          <span className="text-amber-300">Periodicity Attention</span>
        </div>
        <div className="p-1.5 rounded bg-[var(--burgundy)]/40 border border-[var(--gold)]/20">
          <span className="text-[var(--gold)] block font-bold">SHAP Value</span>
          <span className="text-cyan-300">Flux Gradient &Phi;=0.91</span>
        </div>
      </div>
    </div>
  );
}
