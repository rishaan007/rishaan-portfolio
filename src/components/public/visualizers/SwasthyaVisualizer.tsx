'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, CheckCircle2, ShieldCheck, Search, Bot } from 'lucide-react';

export function SwasthyaVisualizer() {
  const [scanProgress, setScanProgress] = useState(40);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-sm border border-[var(--gold)]/40 bg-gradient-to-b from-[#1b1510] via-[#241c14] to-[#120e0a] text-[#F5F0E6] p-5 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/25 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-bold">
            Document Intelligence &amp; Claim Parsing
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30">
          OCR + LLM Extraction Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left: Document Scanner Graphic */}
        <div className="relative h-48 w-full rounded border border-[var(--gold)]/30 bg-[#FAF6EE] text-[#29211D] p-3 shadow-inner overflow-hidden font-mono text-[9px]">
          {/* Laser Scan Beam */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.9)] z-20 pointer-events-none"
            style={{ top: `${scanProgress}%` }}
          />

          <div className="border-b border-black/10 pb-1 mb-2 flex justify-between items-center text-[10px]">
            <span className="font-serif font-bold text-[var(--burgundy)]">CITY GENERAL HOSPITAL</span>
            <span className="text-black/50">DISCHARGE #8841</span>
          </div>

          <div className="space-y-1.5 opacity-90">
            <div className="relative p-1 bg-emerald-50 border border-emerald-400/80 rounded">
              <span className="text-black/70">Patient: Admitted ICU (3 Days)</span>
              <span className="float-right font-bold text-emerald-800">₹45,000</span>
              <span className="absolute -top-1 -right-1 text-[7px] bg-emerald-600 text-white px-1 rounded">MATCHED</span>
            </div>

            <div className="relative p-1 bg-amber-50 border border-amber-400/80 rounded">
              <span className="text-black/70">Pharmacy &amp; Infusion Consumables</span>
              <span className="float-right font-bold text-amber-800">₹18,400</span>
              <span className="absolute -top-1 -right-1 text-[7px] bg-amber-600 text-white px-1 rounded">VERIFIED</span>
            </div>

            <div className="p-1 bg-black/5 rounded">
              <span className="text-black/60">Diagnostics (CT Scan, Blood Bio)</span>
              <span className="float-right text-black/70">₹12,200</span>
            </div>

            <div className="pt-2 border-t border-black/10 flex justify-between font-bold text-xs text-[var(--burgundy)]">
              <span>Total Invoiced Amount:</span>
              <span>₹75,600</span>
            </div>
          </div>
        </div>

        {/* Right: AI Synthesis & Letter Generation */}
        <div className="space-y-2.5">
          <div className="p-3 rounded bg-black/40 border border-[var(--gold)]/20">
            <div className="flex items-center gap-1.5 text-xs text-[var(--gold)] font-serif font-bold mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>Generative Policy Cross-Reference</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed font-sans">
              Analyzed clause 4.2 of HealthShield Policy: ICU day-cap ₹15,000 matched. Pharmacy covered at 90%.
            </p>
          </div>

          <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-emerald-400 block font-bold">Estimated Payout: ₹69,840</span>
              <span className="text-[9px] text-white/50">Deductible applied: ₹5,760</span>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-800/80 text-emerald-100 text-[10px] font-bold">
              92.3% Approved
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--gold)]/80">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Automated Claim Epistle Drafted with Citations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
