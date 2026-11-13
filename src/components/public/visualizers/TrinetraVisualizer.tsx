'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Camera, Radio, CheckCircle, WifiOff } from 'lucide-react';

export function TrinetraVisualizer() {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(2);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Spectrogram bars for YAMNet
  const bars = [45, 78, 62, 90, 84, 55, 70, 95, 60, 40, 85, 75, 50, 65, 80, 48];

  return (
    <div className="relative w-full rounded-sm border border-[var(--gold)]/40 bg-gradient-to-b from-[#0e1612] via-[#14231b] to-[#0a100d] text-[#F5F0E6] p-5 shadow-2xl overflow-hidden font-sans">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/25 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-bold">
            Tri-Layer Multimodal Edge HUD
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
          <WifiOff className="w-3 h-3" />
          <span>Zero-Internet Local Mode</span>
        </div>
      </div>

      {/* Layer selector tabs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveLayer(1)}
          className={`py-2 px-2.5 rounded text-left transition-all border ${
            activeLayer === 1
              ? 'bg-[var(--forest)]/60 border-[var(--gold)] text-[var(--gold)] shadow-sm'
              : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <Radio className="w-3 h-3 text-[var(--gold)]" />
            <span className="text-[10px] font-mono font-bold">Layer 1: Sensor</span>
          </div>
          <span className="text-[9px] block text-white/50">ESP32 / FreeRTOS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLayer(2)}
          className={`py-2 px-2.5 rounded text-left transition-all border ${
            activeLayer === 2
              ? 'bg-[var(--forest)]/60 border-[var(--gold)] text-[var(--gold)] shadow-sm'
              : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <Camera className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold">Layer 2: Vision</span>
          </div>
          <span className="text-[9px] block text-white/50">RPi Zero W + YOLOv8</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLayer(3)}
          className={`py-2 px-2.5 rounded text-left transition-all border ${
            activeLayer === 3
              ? 'bg-[var(--forest)]/60 border-[var(--gold)] text-[var(--gold)] shadow-sm'
              : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold">Layer 3: Acoustic</span>
          </div>
          <span className="text-[9px] block text-white/50">YAMNet Classifier</span>
        </button>
      </div>

      {/* Main Interactive Screen */}
      <div className="relative h-44 w-full rounded border border-[var(--gold)]/30 bg-black/60 p-3 overflow-hidden flex flex-col justify-between">
        {/* Layer 2: Vision HUD active state */}
        {activeLayer === 2 && (
          <div className="relative w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span>CAMERA FEED: CAM_01_IR</span>
              <span className="animate-pulse">REC ● 24.2 FPS</span>
            </div>

            {/* Target Bounding Box Simulation */}
            <div className="relative flex-1 flex items-center justify-center">
              <motion.div
                animate={{
                  x: [0, 8, -6, 0],
                  scale: [1, 1.02, 0.99, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-40 h-28 border-2 border-emerald-400 rounded-sm bg-emerald-500/10 p-2 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                {/* Crosshairs */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-300" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-300" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-300" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-300" />

                <div className="bg-emerald-950/90 text-emerald-300 text-[9px] font-mono px-1.5 py-0.5 rounded inline-block">
                  PERSON: 96.4% CONF
                </div>

                <div className="text-[8px] font-mono text-white/70 mt-1">
                  X: 242 Y: 188 W: 94 H: 160
                </div>

                <div className="absolute bottom-1 right-1 text-[8px] font-mono text-emerald-400">
                  YOLOv8-Nano (Quantized)
                </div>
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
              <span>LATENCY: 42ms</span>
              <span className="text-emerald-400 font-bold">MULTIMODAL VERIFIED</span>
            </div>
          </div>
        )}

        {/* Layer 1: Sensor Telemetry */}
        {activeLayer === 1 && (
          <div className="relative w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--gold)]">
              <span>ESP32 SENSOR BUS (FreeRTOS TASK)</span>
              <span className="text-emerald-400 font-bold">TASK_STATE: RUNNING</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="p-2.5 rounded bg-black/40 border border-white/10 font-mono text-[10px]">
                <span className="text-white/50 block">PIR MOTION SENSOR:</span>
                <span className="text-amber-400 font-bold text-sm">STATE HIGH (INTERRUPT)</span>
                <span className="text-[9px] text-white/40 block mt-1">GPIO 14 &bull; IRQ Event #412</span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/10 font-mono text-[10px]">
                <span className="text-white/50 block">MICROWAVE RADAR:</span>
                <span className="text-cyan-400 font-bold text-sm">DOPPLER: 1.82 m/s</span>
                <span className="text-[9px] text-white/40 block mt-1">24.125 GHz &bull; Dist: 3.4m</span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-white/50">
              WAKE-TO-INFERENCE HANDOFF: &lt;18ms TO RASPBERRY PI ZERO W
            </div>
          </div>
        )}

        {/* Layer 3: Acoustic YAMNet */}
        {activeLayer === 3 && (
          <div className="relative w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
              <span>YAMNET ACOUSTIC SPECTROGRAM</span>
              <span className="text-cyan-400 font-bold">SAMPLE: 16 kHz PCM</span>
            </div>

            {/* Spectrogram Bar Visualizer */}
            <div className="flex items-end justify-between h-20 gap-1 px-2">
              {bars.map((h, i) => {
                const dynamicH = Math.min(100, Math.max(15, h + Math.sin(pulse * 0.2 + i) * 20));
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-600 via-emerald-400 to-amber-300 rounded-t-xs"
                    style={{ height: `${dynamicH}%` }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-white/60">
              <span>DETECTED: [FOOTSTEPS / SHUFFLE - 91.2%]</span>
              <span className="text-cyan-300">NOISE FILTERED: TRUE</span>
            </div>
          </div>
        )}
      </div>

      {/* Multimodal Consensus Footer */}
      <div className="mt-3 pt-3 border-t border-[var(--gold)]/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-white/60">FUSION LOGIC: SENSOR ∧ VISION ∧ AUDIO</span>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle className="w-3 h-3" /> FALSE ALARM REJECTION: ACTIVE
        </span>
      </div>
    </div>
  );
}
