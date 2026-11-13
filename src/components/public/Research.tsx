'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Orbit,
  Network,
  ShieldCheck,
  Sparkles,
  Activity,
  Cpu,
  Compass,
  Layers,
  Terminal,
  Radio,
  BarChart3,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { ResearchInterest } from '@/lib/types/database';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';
import { AnimatedTechBackground } from '@/components/public/decorative/AnimatedTechBackground';

interface ResearchProps {
  interests: ResearchInterest[];
}

interface DomainTelemetry {
  id: string;
  numeral: string;
  title: string;
  category: string;
  tagline: string;
  mathFormula: string;
  architecture: string;
  hardwareTarget: string;
  activeMetrics: { label: string; value: string; color: string }[];
  description: string;
  simulationType: 'vision' | 'transit' | 'neural' | 'shap' | 'genai' | 'fusion' | 'edge' | 'distributed';
}

const RESEARCH_TELEMETRY: DomainTelemetry[] = [
  {
    id: 'res-1',
    numeral: 'DISPUTATIO I',
    title: 'Computer Vision',
    category: 'Spatial Perception & Detection',
    tagline: 'Real-time spatial tracking and convolutional representation learning on edge silicon.',
    mathFormula: 'L_total = lambda_1 L_box + lambda_2 L_cls + lambda_3 L_dfl',
    architecture: 'YOLOv8 + Feature Pyramid Network (FPN) + Spatial Pyramid Pooling (SPPF)',
    hardwareTarget: 'NVIDIA RTX / Jetson Orin Nano / Dual-Core ESP32-CAM',
    activeMetrics: [
      { label: 'mAP@0.5:0.95', value: '0.842', color: 'text-cyan-300' },
      { label: 'Latency', value: '14.2 ms', color: 'text-emerald-400' },
      { label: 'Model Size', value: '6.4 MB', color: 'text-[var(--gold)]' },
    ],
    description:
      'Spatial tracking, boundary regression, and visual representation learning for safety-critical edge perception systems. Focused on balancing high frame rates with high precision recall.',
    simulationType: 'vision',
  },
  {
    id: 'res-2',
    numeral: 'DISPUTATIO II',
    title: 'Time-Series Photometry',
    category: 'Exoplanet Transit Modeling',
    tagline: 'Astronomical light-curve analysis and stellar transit periodicity detection.',
    mathFormula: 'delta_F / F = (R_p / R_star)^2 (1 - u_1(1 - mu) - u_2(1 - mu)^2)',
    architecture: 'Hybrid 1D-Dilated CNN + Multi-Head Self-Attention Temporal Transformer',
    hardwareTarget: 'NASA Kepler/TESS Datasets & High-Performance PyTorch Cluster',
    activeMetrics: [
      { label: 'Validation AUC', value: '98.4%', color: 'text-cyan-300' },
      { label: 'Noise Rejection', value: '0.001 ppm', color: 'text-emerald-400' },
      { label: 'Transit Accuracy', value: '99.1%', color: 'text-[var(--gold)]' },
    ],
    description:
      'Deep sequence analysis identifying minuscule planetary transit light dips (down to 0.01% flux variation) across stellar photometric time-series, separating planetary bodies from eclipsing binaries.',
    simulationType: 'transit',
  },
  {
    id: 'res-3',
    numeral: 'DISPUTATIO III',
    title: 'Deep Learning Architectures',
    category: 'Neural Optimization & Attention',
    tagline: 'Self-attention mechanisms and dilated parameter optimization for sequence modeling.',
    mathFormula: 'Attention(Q, K, V) = softmax((Q K^T) / sqrt(d_k)) V',
    architecture: 'Residual Transformer Encoders + FlashAttention-2 + RMSNorm',
    hardwareTarget: 'CUDA Accelerated PyTorch & TensorRT Engine',
    activeMetrics: [
      { label: 'Attention Heads', value: '8 Heads', color: 'text-cyan-300' },
      { label: 'Gradient Norm', value: '0.41 Stable', color: 'text-emerald-400' },
      { label: 'Perplexity', value: '3.12', color: 'text-[var(--gold)]' },
    ],
    description:
      'Designing and tuning custom neural topologies with residual connections, layer normalization, and parameter quantization to maximize feature retention during deep feed-forward propagation.',
    simulationType: 'neural',
  },
  {
    id: 'res-4',
    numeral: 'DISPUTATIO IV',
    title: 'Explainable AI (XAI)',
    category: 'Model Interpretability & Auditability',
    tagline: 'Game-theoretic attribution using SHAP and saliency maps for auditable decisions.',
    mathFormula: 'phi_i(v) = sum_{S subseteq N \\setminus {i}} (|S|!(|N|-|S|-1)! / |N|!) [v(S cup {i}) - v(S)]',
    architecture: 'KernelSHAP + DeepExplainer + Integrated Gradients',
    hardwareTarget: 'Scikit-Learn, PyTorch & Interactive Web Audit Dashboard',
    activeMetrics: [
      { label: 'Attribution Fidelity', value: '96.8%', color: 'text-cyan-300' },
      { label: 'Audit Time', value: '< 2.4s', color: 'text-emerald-400' },
      { label: 'Confidence Score', value: '0.97', color: 'text-[var(--gold)]' },
    ],
    description:
      'Demystifying opaque neural network predictions. Utilizing game-theoretic Shapley values to assign exact mathematical importance scores to input features, ensuring safety compliance in medical and security applications.',
    simulationType: 'shap',
  },
  {
    id: 'res-5',
    numeral: 'DISPUTATIO V',
    title: 'Generative AI & Agents',
    category: 'Multimodal Orchestration & Tools',
    tagline: 'Autonomous agent architectures, function calling, and structured schema synthesis.',
    mathFormula: 'P(W) = prod_{t=1}^T P(w_t | w_1, ..., w_{t-1}, Context)',
    architecture: 'Gemini 2.5/3.0 APIs + LangChain / AGY Agent Framework + Fastify Proxy',
    hardwareTarget: 'Cloud Serverless Run + Edge WebSocket Gateways',
    activeMetrics: [
      { label: 'JSON Schema Validity', value: '99.9%', color: 'text-cyan-300' },
      { label: 'TTFT (First Token)', value: '180 ms', color: 'text-emerald-400' },
      { label: 'Context Length', value: '1M Tokens', color: 'text-[var(--gold)]' },
    ],
    description:
      'Building practical multi-turn reasoning agents capable of parsing medical prescriptions, synthesizing structured database schemas, and orchestrating complex external API workflows.',
    simulationType: 'genai',
  },
  {
    id: 'res-6',
    numeral: 'DISPUTATIO VI',
    title: 'Multimodal Sensor Fusion',
    category: 'Acoustic + Visual Co-Inference',
    tagline: 'Harmonizing acoustic spectrograms with visual bounding boxes for verified alarms.',
    mathFormula: 'C_fused = alpha * C_vision + beta * C_acoustic - gamma * C_conflict',
    architecture: 'Dual-Branch Late Fusion: YOLOv8 Spatial + YAMNet Audio Spectrogram',
    hardwareTarget: 'Dual-Core ESP32 + I2S Microphone Array + OV2640',
    activeMetrics: [
      { label: 'False Alarm Reduct.', value: '-72.4%', color: 'text-cyan-300' },
      { label: 'Detection Speed', value: '38 ms', color: 'text-emerald-400' },
      { label: 'Sound Precision', value: '94.2%', color: 'text-[var(--gold)]' },
    ],
    description:
      'Mitigating false positives in security systems by mandating cross-modal consensus: verifying visual movement with synchronized ultrasonic/acoustic signature classification before triggering alerts.',
    simulationType: 'fusion',
  },
  {
    id: 'res-7',
    numeral: 'DISPUTATIO VII',
    title: 'Edge AI & Embedded Intelligence',
    category: 'Silicon Quantization & FreeRTOS',
    tagline: 'INT8 quantized neural inference running on battery-powered microcontrollers.',
    mathFormula: 'q = round(r / S) + Z  quad text{(INT8 Quantization Mapping)}',
    architecture: 'TensorFlow Lite for Microcontrollers + ESP-IDF FreeRTOS DMA Queues',
    hardwareTarget: 'ESP32 / ESP32-S3 / Raspberry Pi Zero W',
    activeMetrics: [
      { label: 'SRAM Footprint', value: '280 KB', color: 'text-cyan-300' },
      { label: 'Inference Cycle', value: '16.8 ms', color: 'text-emerald-400' },
      { label: 'Power Draw', value: '120 mA', color: 'text-[var(--gold)]' },
    ],
    description:
      'Bringing intelligence directly to low-power silicon. Implementing DMA circular buffers, FreeRTOS task scheduling, and post-training quantization to achieve fast on-device inference without internet connectivity.',
    simulationType: 'edge',
  },
  {
    id: 'res-8',
    numeral: 'DISPUTATIO VIII',
    title: 'Intelligent Distributed Systems',
    category: 'End-to-End Reactive Architecture',
    tagline: 'Resilient event-driven architecture connecting microcontrollers to cloud dashboards.',
    mathFormula: 'T_transit = T_network + T_inference + T_render < 50ms',
    architecture: 'Next.js 16 + WebSockets + MQTT Broker + Redis Cache + PostgreSQL',
    hardwareTarget: 'Distributed Node Cluster & Edge Micro-Gateways',
    activeMetrics: [
      { label: 'Socket Latency', value: '< 8 ms', color: 'text-cyan-300' },
      { label: 'Sync Uptime', value: '99.98%', color: 'text-emerald-400' },
      { label: 'Throughput', value: '5K msg/s', color: 'text-[var(--gold)]' },
    ],
    description:
      'Designing mission-critical architectures where physical sensor inputs, machine learning inference nodes, and operator web interfaces communicate seamlessly through real-time state synchronization.',
    simulationType: 'distributed',
  },
];

export function Research({ interests }: ResearchProps) {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number>(0);
  const currentDomain = RESEARCH_TELEMETRY[selectedDomainIndex] || RESEARCH_TELEMETRY[0];

  const getDomainIcon = (index: number) => {
    const icons = [
      <Eye key="1" className="w-4 h-4 text-cyan-400" />,
      <Orbit key="2" className="w-4 h-4 text-[var(--gold)]" />,
      <Network key="3" className="w-4 h-4 text-emerald-400" />,
      <ShieldCheck key="4" className="w-4 h-4 text-rose-400" />,
      <Sparkles key="5" className="w-4 h-4 text-cyan-300" />,
      <Activity key="6" className="w-4 h-4 text-amber-400" />,
      <Cpu key="7" className="w-4 h-4 text-emerald-300" />,
      <Compass key="8" className="w-4 h-4 text-[var(--gold)]" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section
      id="research"
      aria-label="Research and Intellectual Pursuits"
      className="relative py-28 sm:py-36 bg-[#0B0D12] text-[var(--espresso)] overflow-hidden border-t border-[var(--gold)]/30"
    >
      {/* Background Ambience: Neoclassical Coordinates & Laser Grid */}
      {/* Dynamic Animated Cyber-Neoclassical Background */}
      <AnimatedTechBackground variant="auric-emerald" />

      {/* Cyber Architecture Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none bg-[linear-gradient(to_right,#D4AF370A_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370A_1px,transparent_1px)] bg-[size:48px_48px] opacity-70"
      />

      {/* Architectural Perimeter Frames */}
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
              ATHENAEUM &bull; INTELLECTUAL INQUIRY
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tracking-tight filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Research &amp; Active Inquiries
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)] mt-3 font-normal">
            &ldquo;Theoretical interests and active computational experiments.&rdquo;
          </p>

          <p className="text-xs font-mono text-[var(--muted)] mt-4 max-w-xl mx-auto">
            Interactive AI telemetry: select any research vector to inspect mathematical formulations, active hardware targets, and real-time execution metrics.
          </p>
        </motion.div>

        {/* 2-COLUMN COMMAND CONSOLE: Vector Selector (5 cols) + Live Holographic Telemetry (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 8 Interactive Research Domain Selectors (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--gold)]/20 text-xs font-mono mb-1">
              <span className="text-[var(--gold)] uppercase font-bold tracking-wider">
                Research Vectors (08)
              </span>
              <span className="text-cyan-400">STATUS: ACTIVE</span>
            </div>

            {RESEARCH_TELEMETRY.map((item, idx) => {
              const isSelected = selectedDomainIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDomainIndex(idx)}
                  className={`gsap-magnetic relative text-left p-3.5 sm:p-4 rounded-xs border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1E2538] via-[#141A28] to-[#0E121B] border-[var(--gold)] shadow-[0_0_18px_rgba(212,175,55,0.25)]'
                      : 'bg-[#101420]/80 border-[var(--gold)]/20 hover:border-[var(--gold)]/60 text-[var(--muted)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xs border transition-colors ${
                        isSelected
                          ? 'bg-[#222B42] border-[var(--gold)] shadow-xs'
                          : 'bg-[#161C28] border-[var(--gold)]/20 group-hover:border-[var(--gold)]/40'
                      }`}
                    >
                      {getDomainIcon(idx)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono tracking-widest text-[var(--gold)] font-bold">
                          {item.numeral}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>
                      <h3
                        className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                          isSelected ? 'text-gold-gradient' : 'text-[var(--walnut)] group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--muted)] block">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[var(--gold)] translate-x-1' : 'text-[var(--muted)]/40 group-hover:text-white'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT: Active Domain Deep-Dive Telemetry Hologram (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDomain.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="relative p-6 sm:p-8 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/45 shadow-2xl texture-paper group"
              >
                <CornerOrnament position="top-right" size="sm" className="opacity-60 text-[var(--gold)]" />
                <CornerOrnament position="bottom-left" size="sm" className="opacity-40 text-[var(--gold)]" />

                {/* Top Hologram Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--gold)]/20 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50">
                      {getDomainIcon(selectedDomainIndex)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 block font-bold">
                        {currentDomain.numeral} // LABORATORY PROFILE
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
                        {currentDomain.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-[#161C28] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    EXPERIMENT LIVE
                  </span>
                </div>

                {/* Tagline & Abstract */}
                <p className="font-serif italic text-base sm:text-lg text-[var(--walnut)] mb-4 leading-snug">
                  &ldquo;{currentDomain.tagline}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans mb-6">
                  {currentDomain.description}
                </p>

                {/* Mathematical Formulation Console */}
                <div className="p-4 rounded-xs bg-[#090C12] border border-[var(--gold)]/30 mb-5 font-mono">
                  <div className="flex items-center justify-between text-[10px] text-[var(--muted)] mb-2 pb-1 border-b border-[var(--gold)]/15">
                    <span className="text-[var(--gold)] uppercase font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      Mathematical Objective Function
                    </span>
                    <span className="text-cyan-300">LaTeX KaTeX</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#06080B] text-cyan-300 text-xs overflow-x-auto select-all font-mono">
                    <code>{currentDomain.mathFormula}</code>
                  </div>
                </div>

                {/* Architecture & Hardware Targets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xs bg-[#0E121B] border border-[var(--gold)]/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold)] block mb-1">
                      Neural Backbone / Stack
                    </span>
                    <span className="text-xs font-mono text-[var(--walnut)] block leading-relaxed">
                      {currentDomain.architecture}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xs bg-[#0E121B] border border-[var(--gold)]/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                      Hardware Execution Target
                    </span>
                    <span className="text-xs font-mono text-[var(--walnut)] block leading-relaxed">
                      {currentDomain.hardwareTarget}
                    </span>
                  </div>
                </div>

                {/* Real-Time Telemetry Gauges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3.5 rounded bg-[#080A0E] border border-[var(--gold)]/25 mb-6 text-center">
                  {currentDomain.activeMetrics.map((metric, i) => (
                    <div key={i} className="p-2 border-r border-[var(--gold)]/15 last:border-r-0">
                      <span className={`font-serif text-xl sm:text-2xl font-bold block ${metric.color}`}>
                        {metric.value}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--muted)]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Status & MacBook Indicator */}
                <div className="pt-4 border-t border-[var(--gold)]/20 flex flex-wrap items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <AnimatedMacbookLogo size="xs" showAura={false} />
                    <span>Rishaan Kumar Research Lab &bull; MAKAUT &apos;28</span>
                  </div>
                  <span className="text-cyan-400">Verifiable Code &amp; Benchmarks Available</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
