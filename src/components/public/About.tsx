'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Cpu,
  Layers,
  Activity,
  Code2,
  Terminal,
  Compass,
  CheckCircle2,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Brain,
  Microchip,
  Network,
} from 'lucide-react';
import { Profile } from '@/lib/types/database';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';
import { AnimatedTechBackground } from '@/components/public/decorative/AnimatedTechBackground';

interface AboutProps {
  profile: Profile | null;
  interests: string[];
}

const DEFAULT_INTERESTS = [
  'Artificial Intelligence',
  'Deep Learning (CNNs, Transformers)',
  'Computer Vision (YOLOv8)',
  'Time-Series Photometry',
  'Explainable AI (SHAP)',
  'Edge AI & TinyML (ESP32)',
  'Multimodal Sensor Fusion',
  'Distributed Full-Stack (Next.js/FastAPI)',
];

type DossierTab = 'architect' | 'atelier' | 'credentials';

export function About({ profile, interests }: AboutProps) {
  const [activeTab, setActiveTab] = useState<DossierTab>('architect');
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0);

  const activeInterests =
    interests && interests.length > 0 ? interests : DEFAULT_INTERESTS;

  const professionalSummary =
    profile?.professional_summary ||
    'Information Technology undergraduate with hands-on project experience across artificial intelligence, deep learning, edge computing and full-stack development. Interested in building practical intelligent systems using computer vision, time-series analysis and generative AI. Experienced in collaborative hackathon development and student technology community leadership.';

  const pipelineStages = [
    {
      id: 0,
      name: '01 // Ingestion & Signals',
      label: 'Telemetry & Signal Conditioning',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      detail:
        'Raw photon flux time-series, audio acoustic spectrograms, and dual-camera edge feeds conditioned with outlier rejection and Butterworth filters.',
      metric: '0.001 ppm noise ceiling',
      code: 'flux_norm = (raw_flux - med) / std',
    },
    {
      id: 1,
      name: '02 // Edge Inference',
      label: 'Embedded TinyML & FreeRTOS',
      icon: <Microchip className="w-4 h-4 text-emerald-400" />,
      detail:
        'INT8 quantized neural networks deployed on dual-core ESP32 microcontrollers with DMA buffer queues for sub-20ms edge latency without cloud dependency.',
      metric: '< 18ms on-device latency',
      code: 'tflite::MicroInterpreter::Invoke()',
    },
    {
      id: 2,
      name: '03 // Neural Backbones',
      label: 'Vision & Attention Transformers',
      icon: <Brain className="w-4 h-4 text-[var(--gold)]" />,
      detail:
        'Hybrid architectures marrying 1D dilated convolutions for local transit signatures with multi-head self-attention encoders for global periodicity modeling.',
      metric: '98.4% validation AUC',
      code: 'attn = softmax(QK^T / sqrt(d_k)) * V',
    },
    {
      id: 3,
      name: '04 // Attribution & XAI',
      label: 'SHAP Feature Interpretability',
      icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
      detail:
        'Explaining deep model predictions using game-theoretic Shapley values, highlighting exact pixel clusters and light-curve dip dips that triggered positive classifications.',
      metric: 'Verifiable audit trail',
      code: 'explainer = shap.DeepExplainer(model)',
    },
  ];

  return (
    <section
      id="about"
      aria-label="Beyond the Code"
      className="relative py-28 sm:py-36 bg-[#080A0E] text-[var(--espresso)] overflow-hidden border-t border-b border-[var(--gold)]/30"
    >
      {/* Dynamic Animated Cyber-Neoclassical Background */}
      <AnimatedTechBackground variant="cyan-gold" />

      {/* Blueprint Coordinate Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none bg-[linear-gradient(to_right,#D4AF370A_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370A_1px,transparent_1px)] bg-[size:44px_44px] opacity-70"
      />

      {/* Neoclassical Outer Filigree Borders */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-[var(--gold)]/20 pointer-events-none hidden md:block" />
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-cyan-400/10 pointer-events-none hidden md:block" />

      {/* Classical Corner Accents */}
      <div className="hidden lg:block">
        <CornerOrnament position="top-left" size="lg" className="top-8 left-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="top-right" size="lg" className="top-8 right-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="bottom-left" size="lg" className="bottom-8 left-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="bottom-right" size="lg" className="bottom-8 right-8 opacity-60 text-[var(--gold)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-bold">
              EPISTLE &bull; ARCHITECTURAL DOSSIER
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tracking-tight filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Beyond the Code
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)] mt-3 font-normal">
            &ldquo;A Mind Curious About What Comes Next.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-[11px] font-mono text-[var(--muted)]">
            <span className="px-2.5 py-0.5 rounded-xs bg-[#121622] text-cyan-300 border border-cyan-500/30">
              MAKAUT &bull; NSEC IT &apos;28
            </span>
            <span className="text-[var(--gold)]/40">&bull;</span>
            <span className="px-2.5 py-0.5 rounded-xs bg-[#121622] text-emerald-300 border border-emerald-500/30">
              BYTE BRIGADE GUILD LEAD
            </span>
            <span className="text-[var(--gold)]/40">&bull;</span>
            <span className="px-2.5 py-0.5 rounded-xs bg-[#121622] text-[var(--gold)] border border-[var(--gold)]/30">
              NASA SPACE APPS &apos;25
            </span>
          </div>
        </motion.div>

        {/* Interactive Dossier Nav Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-sm bg-[#101420] border border-[var(--gold)]/40 shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('architect')}
              className={`gsap-magnetic px-4 sm:px-6 py-2 rounded-xs text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeTab === 'architect'
                  ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[#0B0D12] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-[var(--walnut)] hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>System Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('atelier')}
              className={`gsap-magnetic px-4 sm:px-6 py-2 rounded-xs text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeTab === 'atelier'
                  ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[#0B0D12] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-[var(--walnut)] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Philosophy &amp; Atelier</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('credentials')}
              className={`gsap-magnetic px-4 sm:px-6 py-2 rounded-xs text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeTab === 'credentials'
                  ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[#0B0D12] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-[var(--walnut)] hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education &amp; Guilds</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display with Framer Motion Transition */}
        <AnimatePresence mode="wait">
          {activeTab === 'architect' && (
            <motion.div
              key="architect"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Interactive Neural Pipeline Explorer (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="relative p-6 sm:p-8 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-2xl texture-paper group">
                  <CornerOrnament position="top-left" size="sm" className="opacity-50 text-[var(--gold)]" />
                  <CornerOrnament position="bottom-right" size="sm" className="opacity-50 text-[var(--gold)]" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[var(--gold)]/20 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50 text-[var(--gold)]">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-400 block font-bold">
                          BLUEPRINT // PIPELINE DECONSTRUCTION
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient">
                          Practical AI Engineering Cycle
                        </h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      SYS.VERIFIED
                    </span>
                  </div>

                  {/* Pipeline Step Interactive Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {pipelineStages.map((stage) => (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActivePipelineStage(stage.id)}
                        className={`p-3 rounded-xs text-left transition-all border ${
                          activePipelineStage === stage.id
                            ? 'bg-[#1C2438] border-[var(--gold)] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                            : 'bg-[#0E121B] border-[var(--gold)]/20 hover:border-[var(--gold)]/60 text-[var(--muted)]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          {stage.icon}
                          <span className="text-[9px] font-mono text-[var(--gold)]">0{stage.id + 1}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[var(--walnut)] block leading-snug">
                          {stage.name.split('//')[1]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Pipeline Stage Hologram Detail Card */}
                  <div className="p-5 rounded-xs bg-[#0B0E15] border border-[var(--gold)]/35 shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--gold)]/15">
                      <div className="flex items-center gap-2">
                        {pipelineStages[activePipelineStage].icon}
                        <h4 className="font-serif text-lg font-bold text-gold-gradient">
                          {pipelineStages[activePipelineStage].label}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161C28] text-cyan-300 border border-cyan-500/30">
                        {pipelineStages[activePipelineStage].metric}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans mb-4">
                      {pipelineStages[activePipelineStage].detail}
                    </p>

                    {/* Simulated Code Execution Terminal */}
                    <div className="p-3 rounded bg-[#07090D] border border-cyan-500/20 font-mono text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">$</span>
                        <span className="text-emerald-400">
                          {pipelineStages[activePipelineStage].code}
                        </span>
                      </div>
                      <span className="text-[9px] text-[var(--muted)] uppercase">EXEC_STATUS: 0</span>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="mt-6 pt-4 border-t border-[var(--gold)]/20 flex flex-wrap items-center justify-between text-xs font-mono text-[var(--muted)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>Kolkata, West Bengal, India</span>
                    </div>
                    <span className="text-cyan-400">Target: Low-Latency Explainable Systems</span>
                  </div>
                </div>

                {/* Vitals Telemetry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
                    <span className="font-serif text-2xl font-bold text-gold-gradient block">98.4%</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      Model AUC Peak
                    </span>
                  </div>
                  <div className="p-4 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
                    <span className="font-serif text-2xl font-bold text-cyan-300 block">&lt; 18ms</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      Edge Latency Target
                    </span>
                  </div>
                  <div className="p-4 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
                    <span className="font-serif text-2xl font-bold text-emerald-400 block">4+ Projects</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      Production Architectures
                    </span>
                  </div>
                  <div className="p-4 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
                    <span className="font-serif text-2xl font-bold text-[var(--gold)] block">2028</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      B.Tech IT MAKAUT
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Tech Neoclassical Mission Card (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="relative p-6 sm:p-7 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-xl texture-paper">
                  <CornerOrnament position="top-right" size="sm" className="opacity-50 text-[var(--gold)]" />

                  {/* Title */}
                  <div className="flex items-center gap-3 mb-5 border-b border-[var(--gold)]/20 pb-3">
                    <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50 text-[var(--gold)]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--gold)] font-bold block">
                        CODEX &bull; CORE METHODOLOGY
                      </span>
                      <h3 className="font-serif text-xl font-bold text-gold-gradient">
                        Engineering Philosophy
                      </h3>
                    </div>
                  </div>

                  {/* Philosophy Editorial */}
                  <div className="space-y-4 text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                    <p className="first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:text-[var(--gold)] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                      {professionalSummary}
                    </p>
                    <p>
                      I operate under the conviction that Artificial Intelligence should never remain an abstract research exercise. True engineering rigor is proven when neural networks execute reliably within resource constraints — whether running on an ESP32 microcontroller or orchestrating exoplanet candidate discovery pipelines across millions of astronomical data points.
                    </p>
                  </div>

                  {/* Active Exploratory Domains Chips */}
                  <div className="mt-6 pt-5 border-t border-[var(--gold)]/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-3">
                      Active Investigation Domains
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-[#161C28] text-[var(--walnut)] border border-[var(--gold)]/30 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          ✦ {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Signature Plinth with Animated MacBook Mini Node */}
                  <div className="mt-6 pt-4 border-t border-[var(--gold)]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AnimatedMacbookLogo size="xs" showAura={false} />
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-bold text-gold-gradient">Rishaan Kumar</span>
                        <span className="text-[9px] font-mono text-[var(--muted)]">AI/ML Architect &bull; Researcher</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/60">
                      ACTIVE &bull; 2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'atelier' && (
            <motion.div
              key="atelier"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Pillar 1 */}
              <div className="relative p-6 sm:p-7 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/35 shadow-lg texture-paper">
                <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />
                <div className="p-3 rounded-xs bg-[#1A2234] border border-[var(--gold)]/40 text-[var(--gold)] inline-block mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold block mb-1">
                  PILLAR I // NEOCLASSICAL RIGOR
                </span>
                <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
                  Theoretical Foundations
                </h3>
                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                  Treating algorithms like neoclassical architectural monuments: structured with geometric precision, symmetry, and unshakeable foundations. Deep learning architectures must stand on mathematical sound principles, not mere intuition.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="relative p-6 sm:p-7 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/35 shadow-lg texture-paper">
                <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />
                <div className="p-3 rounded-xs bg-[#1A2234] border border-[var(--gold)]/40 text-emerald-400 inline-block mb-4">
                  <Microchip className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold block mb-1">
                  PILLAR II // EDGE TACTICS
                </span>
                <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
                  Practical Silicon Constraints
                </h3>
                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                  The real world runs on microcontrollers with 520KB of SRAM, variable voltages, and offline environments. Quantizing weights into INT8 representations and optimizing pipeline caches unlocks practical intelligence where it matters most.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="relative p-6 sm:p-7 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/35 shadow-lg texture-paper">
                <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />
                <div className="p-3 rounded-xs bg-[#1A2234] border border-[var(--gold)]/40 text-[var(--gold)] inline-block mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--gold)] font-bold block mb-1">
                  PILLAR III // HUMAN TRANSPARENCY
                </span>
                <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
                  Explainable Outcomes
                </h3>
                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                  Black-box neural networks create unearned trust. Incorporating Shapley attribution and feature saliency guarantees that doctors, astronomers, and emergency responders understand why a decision was reached.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Undergraduate Degree Plaque (7 Cols) */}
              <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-xl texture-paper">
                <CornerOrnament position="top-left" size="sm" className="opacity-50 text-[var(--gold)]" />

                <div className="flex items-center gap-3 mb-6 border-b border-[var(--gold)]/20 pb-4">
                  <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50 text-[var(--gold)]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold block">
                      UNDERGRADUATE EDUCATION &bull; 2024 - 2028
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient">
                      B.Tech in Information Technology
                    </h3>
                  </div>
                </div>

                <div className="p-5 rounded-xs bg-[#0B0E15] border border-[var(--gold)]/30 mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-[var(--walnut)]">
                      Netaji Subhash Engineering College (NSEC)
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      CURRENTLY ENROLLED
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] font-mono mb-4">
                    Maulana Abul Kalam Azad University of Technology (MAKAUT) &bull; Kolkata, India
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--gold)]/15 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <Calendar className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>Graduation: <strong className="text-[var(--walnut)]">2028</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <Award className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>CGPA: <strong className="text-gold-gradient text-sm">7.7 / 10</strong></span>
                    </div>
                  </div>
                </div>

                {/* Technical Focus Highlights */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--gold)] font-bold block">
                    Curricular Mastery:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--espresso)]/90">
                    <div className="p-2.5 rounded bg-[#161C28] border border-[var(--gold)]/20 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>AI, Deep Learning &amp; Computer Vision</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#161C28] border border-[var(--gold)]/20 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Embedded Systems &amp; TinyML (ESP32)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#161C28] border border-[var(--gold)]/20 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                      <span>Full-Stack &amp; Fast APIs (Next.js/FastAPI)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#161C28] border border-[var(--gold)]/20 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Data Structures &amp; Distributed Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guild Leadership & Hackathons (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="relative p-6 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-xl texture-paper">
                  <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />

                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold block mb-2">
                    COMMUNITY LEADERSHIP
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
                    Byte Brigade &bull; Lead Coordinator
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans mb-4">
                    Founded and leading an active student technology guild orchestrating 6 specialized wings: AI/ML, Web Development, Cybersecurity, Cloud, Android, and IoT.
                  </p>
                  <div className="p-3 rounded bg-[#0B0E15] border border-[var(--gold)]/25 text-xs font-mono flex items-center justify-between">
                    <span className="text-[var(--muted)]">Guild Governance</span>
                    <span className="text-emerald-400 font-bold">6 Wings &bull; 100+ Members</span>
                  </div>
                </div>

                <div className="relative p-6 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-xl texture-paper">
                  <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />

                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold block mb-2">
                    GLOBAL HACKATHON RESEARCH
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
                    NASA Space Apps Challenge &apos;25
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans mb-3">
                    Engineered ATLAS (Astronomical Transit Light-curve Analysis System), analyzing NASA Kepler/TESS planetary transit signals with hybrid 1D-CNN Transformer models.
                  </p>
                  <div className="p-3 rounded bg-[#0B0E15] border border-cyan-500/25 text-xs font-mono flex items-center justify-between">
                    <span className="text-[var(--muted)]">Exoplanet Photometry</span>
                    <span className="text-cyan-300 font-bold">98.4% Validation AUC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
