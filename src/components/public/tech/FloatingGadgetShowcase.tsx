'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';

type GadgetType = 'laptop' | 'tablet' | 'mobile';

interface FloatingGadgetShowcaseProps {
  className?: string;
}

export function FloatingGadgetShowcase({ className = '' }: FloatingGadgetShowcaseProps) {
  const [device, setDevice] = useState<GadgetType>('laptop');
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const togglePress = () => {
    setIsPressed((prev) => !prev);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Device Selector Controls */}
      <div className="flex items-center gap-1.5 p-1 rounded-xs bg-[#0F131C] border border-[var(--gold)]/30 mb-4 shadow-md z-20">
        <button
          type="button"
          onClick={() => setDevice('laptop')}
          className={`px-2.5 py-1 rounded-xs text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
            device === 'laptop'
              ? 'bg-[var(--gold)] text-[#0B0D12] font-bold shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--gold)]'
          }`}
          title="Switch to Laptop View"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => setDevice('tablet')}
          className={`px-2.5 py-1 rounded-xs text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
            device === 'tablet'
              ? 'bg-[var(--gold)] text-[#0B0D12] font-bold shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--gold)]'
          }`}
          title="Switch to Tablet View"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet</span>
        </button>

        <button
          type="button"
          onClick={() => setDevice('mobile')}
          className={`px-2.5 py-1 rounded-xs text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
            device === 'mobile'
              ? 'bg-[var(--gold)] text-[#0B0D12] font-bold shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--gold)]'
          }`}
          title="Switch to Mobile View"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mobile</span>
        </button>
      </div>

      {/* Main Hovering 3D Gadget Stage */}
      <div className="relative w-full flex flex-col items-center justify-center select-none py-2">
        {/* Floating Levitating Motion Container */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotateX: [2, -2, 2],
            rotateY: [-2, 2, -2],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={togglePress}
          className="relative cursor-pointer group focus:outline-hidden"
          role="button"
          tabIndex={0}
          aria-label="Interactive gadget: tap to reveal author"
          title="Click to interact and reveal system author"
        >
          {/* Subtle Ambient Hover Aura */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[var(--gold)]/10 via-cyan-500/10 to-[var(--gold)]/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* ========================================================
              DEVICE 1: LAPTOP (MacBook Pro Cyber Aesthetic)
             ======================================================== */}
          {device === 'laptop' && (
            <div className="relative flex flex-col items-center">
              {/* Laptop Screen Bezel */}
              <div
                className={`relative w-64 sm:w-72 md:w-80 h-40 sm:h-44 md:h-48 rounded-t-lg p-2 transition-all duration-300 ${
                  isPressed
                    ? 'bg-gradient-to-b from-[#1C2333] via-[#101422] to-[#0A0D14] border-2 border-[var(--gold)] shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    : 'bg-gradient-to-b from-[#161B26] via-[#0E121B] to-[#07090E] border-2 border-[var(--gold)]/40 group-hover:border-[var(--gold)]/70 shadow-2xl'
                }`}
              >
                {/* Camera Notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-b-sm bg-black/80 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-emerald-400/90 animate-pulse" />
                </div>

                {/* Display Screen Canvas */}
                <div className="w-full h-full rounded-sm bg-[#080B11] border border-[var(--gold)]/20 p-2.5 flex flex-col justify-between overflow-hidden relative font-mono">
                  {/* Subtle Grid Scanlines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                  {/* Top Bar of Screen */}
                  <div className="flex items-center justify-between text-[8px] text-[var(--gold)] border-b border-[var(--gold)]/20 pb-1 z-10">
                    <span className="flex items-center gap-1 text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      SILICON ARCH v2.8
                    </span>
                    <span className="text-[7px] text-[var(--muted)]">0xRK // SECURE</span>
                  </div>

                  {/* Center Content: State-Dependent */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-1 py-1">
                    {isPressed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="space-y-1"
                      >
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold)] text-[8px] font-bold">
                          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                          <span>AUTHENTIC SIGNATURE</span>
                        </div>
                        <h4 className="font-cinzel text-xs sm:text-sm font-extrabold text-gold-gradient tracking-wider uppercase">
                          Made by Rishaan Kumar
                        </h4>
                        <p className="text-[8px] text-cyan-300 tracking-tight">
                          AI/ML Architect &bull; NSEC MAKAUT &apos;28
                        </p>
                        <p className="text-[7px] text-[var(--muted)] italic">
                          &ldquo;Engineering Intelligence. Exploring Possibilities.&rdquo;
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 mx-auto flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                          <Cpu className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-[9px] font-bold text-[var(--walnut)] tracking-wide">
                          INTERACTIVE SYSTEM NODE
                        </p>
                        <p className="text-[8px] text-cyan-400 animate-pulse font-bold">
                          &gt; Click / Tap to reveal author &lt;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Telemetry Ticker on Screen */}
                  <div className="flex items-center justify-between text-[7px] text-[var(--muted)] pt-1 border-t border-[var(--gold)]/15 z-10">
                    <span className="text-emerald-400">LATENCY: &lt;18ms</span>
                    <span className="text-[var(--gold)]">KOLKATA, INDIA</span>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base & Hinge */}
              <div className="relative w-72 sm:w-80 md:w-92 h-3.5 rounded-b-md bg-gradient-to-b from-[#252E3E] via-[#1A202C] to-[#0E1218] border-t border-[var(--gold)]/40 shadow-xl flex items-center justify-center">
                <div className="w-16 h-1 rounded-xs bg-[#0F141E] border border-white/10" />
              </div>
            </div>
          )}

          {/* ========================================================
              DEVICE 2: TABLET (iPad Pro Neoclassical Tablet)
             ======================================================== */}
          {device === 'tablet' && (
            <div
              className={`relative w-48 sm:w-54 md:w-60 h-60 sm:h-64 md:h-70 rounded-xl p-2.5 transition-all duration-300 flex flex-col justify-between ${
                isPressed
                  ? 'bg-gradient-to-b from-[#1C2333] via-[#101422] to-[#0A0D14] border-2 border-[var(--gold)] shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                  : 'bg-gradient-to-b from-[#161B26] via-[#0E121B] to-[#07090E] border-2 border-[var(--gold)]/40 group-hover:border-[var(--gold)]/70 shadow-2xl'
              }`}
            >
              {/* Front Camera Point */}
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mx-auto mb-1 animate-pulse" />

              {/* Tablet Screen Canvas */}
              <div className="w-full flex-1 rounded-lg bg-[#080B11] border border-[var(--gold)]/20 p-3 flex flex-col justify-between overflow-hidden relative font-mono text-center">
                {/* Header */}
                <div className="flex items-center justify-between text-[8px] text-[var(--gold)] border-b border-[var(--gold)]/20 pb-1">
                  <span className="text-cyan-300 font-bold">TABLET NODE</span>
                  <span className="text-[7px] text-emerald-400">TOUCH READY</span>
                </div>

                {/* Center Content */}
                <div className="flex-1 flex flex-col items-center justify-center py-2">
                  {isPressed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="space-y-1.5"
                    >
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold)] text-[8px] font-bold">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                        <span>AUTHOR VERIFIED</span>
                      </span>
                      <h4 className="font-cinzel text-xs sm:text-sm font-extrabold text-gold-gradient tracking-wider uppercase">
                        Made by Rishaan Kumar
                      </h4>
                      <p className="text-[8px] text-cyan-300">
                        AI/ML &bull; B.Tech IT &bull; MAKAUT &apos;28
                      </p>
                      <p className="text-[7px] text-[var(--muted)] italic">
                        Kolkata, West Bengal, India
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 mx-auto flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                        <Tablet className="w-4 h-4" />
                      </div>
                      <p className="text-[9px] font-bold text-[var(--walnut)]">
                        DIGITAL SLATE MATRIX
                      </p>
                      <p className="text-[8px] text-cyan-400 animate-pulse font-bold">
                        &gt; Tap device to reveal &lt;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Bar */}
                <div className="text-[7px] text-[var(--muted)] border-t border-[var(--gold)]/15 pt-1">
                  <span>TAP AGAIN TO TOGGLE HUD</span>
                </div>
              </div>

              {/* Home Pill Indicator */}
              <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mt-1.5" />
            </div>
          )}

          {/* ========================================================
              DEVICE 3: MOBILE (iPhone Pro Cyber Phone)
             ======================================================== */}
          {device === 'mobile' && (
            <div
              className={`relative w-36 sm:w-40 md:w-44 h-64 sm:h-68 md:h-72 rounded-[22px] p-2 transition-all duration-300 flex flex-col justify-between ${
                isPressed
                  ? 'bg-gradient-to-b from-[#1C2333] via-[#101422] to-[#0A0D14] border-2 border-[var(--gold)] shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                  : 'bg-gradient-to-b from-[#161B26] via-[#0E121B] to-[#07090E] border-2 border-[var(--gold)]/40 group-hover:border-[var(--gold)]/70 shadow-2xl'
              }`}
            >
              {/* Dynamic Island Pill */}
              <div className="w-14 h-3 rounded-full bg-black mx-auto mb-1 flex items-center justify-between px-2">
                <span className="w-1 h-1 rounded-full bg-blue-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Mobile Screen Canvas */}
              <div className="w-full flex-1 rounded-[16px] bg-[#080B11] border border-[var(--gold)]/20 p-2.5 flex flex-col justify-between overflow-hidden relative font-mono text-center">
                <div className="flex items-center justify-between text-[7px] text-[var(--gold)]">
                  <span>9:41</span>
                  <span className="text-emerald-400">5G ● 100%</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center py-1">
                  {isPressed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="space-y-1"
                    >
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold)] text-[7px] font-bold">
                        <Sparkles className="w-2 h-2 text-amber-300" />
                        <span>VERIFIED</span>
                      </span>
                      <h4 className="font-cinzel text-[11px] sm:text-xs font-extrabold text-gold-gradient tracking-tight uppercase leading-tight">
                        Made by Rishaan Kumar
                      </h4>
                      <p className="text-[7px] text-cyan-300">
                        B.Tech IT &bull; MAKAUT &apos;28
                      </p>
                      <p className="text-[6.5px] text-[var(--muted)]">
                        Kolkata, India
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 mx-auto flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-[8px] font-bold text-[var(--walnut)]">
                        MOBILE NODE
                      </p>
                      <p className="text-[7.5px] text-cyan-400 animate-pulse font-bold">
                        &gt; Tap device &lt;
                      </p>
                    </div>
                  )}
                </div>

                {/* Home Indicator Bar */}
                <div className="w-10 h-0.5 rounded-full bg-white/30 mx-auto" />
              </div>

              {/* Bottom bezel bar */}
              <div className="h-1" />
            </div>
          )}
        </motion.div>

        {/* Ambient Ground Levitation Shadow */}
        <motion.div
          animate={{
            scale: [1, 0.85, 1],
            opacity: [0.45, 0.25, 0.45],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-48 sm:w-56 md:w-64 h-3 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent blur-md mt-3"
        />

        {/* Interaction Cue Status Pill */}
        <motion.button
          type="button"
          onClick={togglePress}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-2.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all flex items-center gap-1.5 border shadow-sm ${
            isPressed
              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
              : 'bg-[#101420] border-[var(--gold)]/30 text-[var(--muted)] hover:text-white hover:border-[var(--gold)]'
          }`}
        >
          {isPressed ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>SIGNATURE ACTIVE &bull; MADE BY RISHAAN KUMAR</span>
            </>
          ) : (
            <>
              <Zap className="w-3 h-3 text-[var(--gold)] animate-pulse" />
              <span>HOVER OR CLICK GADGET TO ACTIVATE</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
export default FloatingGadgetShowcase;
