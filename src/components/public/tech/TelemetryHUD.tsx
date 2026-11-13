'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Zap, Layers, Server, ShieldCheck } from 'lucide-react';

export function TelemetryHUD() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const dynamicLatency = (23.8 + Math.sin(ticker * 0.1) * 1.8).toFixed(1);
  const dynamicConfidence = (96.2 + Math.cos(ticker * 0.15) * 0.5).toFixed(1);

  return (
    <div className="w-full rounded-sm border border-[var(--gold)]/40 bg-[#080A0F] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden font-mono flex flex-col h-[340px] sm:h-[380px] p-4 text-[#F8FAFC]">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/25 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-serif text-xs font-bold text-[var(--gold)] tracking-wider uppercase">
            Perseus System Telemetry HUD
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
          ALL CLUSTERS NOMINAL
        </span>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div className="p-2 rounded bg-[#101420] border border-[var(--gold)]/20">
          <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
            <span>INFERENCE</span>
            <Activity className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400 block mt-0.5">{dynamicLatency} ms</span>
          <span className="text-[8px] text-[var(--muted)]">TensorRT Edge Engine</span>
        </div>

        <div className="p-2 rounded bg-[#101420] border border-[var(--gold)]/20">
          <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
            <span>ACCURACY</span>
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-cyan-300 block mt-0.5">{dynamicConfidence}%</span>
          <span className="text-[8px] text-[var(--muted)]">Validation Set (F1)</span>
        </div>

        <div className="p-2 rounded bg-[#101420] border border-[var(--gold)]/20">
          <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
            <span>WEIGHTS</span>
            <Cpu className="w-3 h-3 text-amber-400" />
          </div>
          <span className="text-sm font-bold text-amber-300 block mt-0.5">14.2M</span>
          <span className="text-[8px] text-[var(--muted)]">INT8 Quantized Nodes</span>
        </div>

        <div className="p-2 rounded bg-[#101420] border border-[var(--gold)]/20">
          <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
            <span>KEPLER STARS</span>
            <Database className="w-3 h-3 text-purple-400" />
          </div>
          <span className="text-sm font-bold text-purple-300 block mt-0.5">4,821</span>
          <span className="text-[8px] text-[var(--muted)]">NASA Light Curves</span>
        </div>
      </div>

      {/* Real-time Loss Convergence Simulation Wave */}
      <div className="flex-1 p-2.5 rounded bg-[#0A0D16] border border-white/10 flex flex-col justify-between mb-2">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
          <span>HYBRID LOSS CONVERGENCE (EPOCH 1 &rarr; 60)</span>
          <span className="text-emerald-400 font-bold">LOSS: 0.0418</span>
        </div>

        {/* SVG Mini Chart */}
        <div className="relative h-20 w-full">
          <svg viewBox="0 0 320 80" className="w-full h-full overflow-visible">
            <line x1="0" y1="20" x2="320" y2="20" stroke="#334155" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="320" y2="50" stroke="#334155" strokeDasharray="2 2" strokeWidth="0.5" />
            {/* Loss curve */}
            <path
              d="M 10 15 Q 60 50, 120 62 T 220 68 T 310 72"
              fill="none"
              stroke="#E5C07B"
              strokeWidth="2.5"
            />
            {/* Target dip point */}
            <circle cx="310" cy="72" r="3.5" fill="#10B981" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
          <span>Binary Cross Entropy + Contrastive Focal Loss</span>
          <span className="text-cyan-300">AdamW &bull; lr: 1e-4</span>
        </div>
      </div>

      {/* Hardware Node Status */}
      <div className="pt-2 border-t border-[var(--gold)]/20 flex items-center justify-between text-[10px] text-[var(--muted)]">
        <span className="flex items-center gap-1.5 text-[var(--gold)]">
          <Server className="w-3 h-3" />
          <span>NODES: [ESP32-S3: ACTIVE] &bull; [RPI ZERO W: PAIRED]</span>
        </span>
        <span className="text-emerald-400 font-bold">STABLE 60.0 FPS</span>
      </div>
    </div>
  );
}
