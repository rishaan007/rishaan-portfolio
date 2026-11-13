'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Compass,
  FileDown,
  Terminal as TerminalIcon,
  Code2,
  Activity,
  Layers,
  Cpu,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { Profile } from '@/lib/types/database';
import { ArchFrame } from '@/components/public/decorative/ArchFrame';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { AstrolabeMedallion } from '@/components/public/decorative/AstrolabeMedallion';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';
import { InteractiveTerminal } from '@/components/public/tech/InteractiveTerminal';
import { LiveCodeDeck } from '@/components/public/tech/LiveCodeDeck';
import { TelemetryHUD } from '@/components/public/tech/TelemetryHUD';

interface HeroProps {
  profile: Profile | null;
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero({ profile }: HeroProps) {
  const [activeDeckTab, setActiveDeckTab] = useState<'terminal' | 'code' | 'hud'>('terminal');

  const fullName = profile?.full_name || 'Rishaan Kumar';
  const subheadline =
    profile?.hero_subheadline || 'Engineering Intelligence.\nExploring Possibilities.';
  const description =
    profile?.hero_description ||
    'I build intelligent systems, experiment with emerging technologies, and turn complex ideas into practical digital experiences.';
  const location = profile?.location || 'Kolkata, West Bengal, India';
  const professionalTitle =
    profile?.professional_title || 'AI/ML & Data Science Enthusiast';
  const githubUrl = profile?.github_url || 'https://github.com/rishaan007';
  const resumeUrl = profile?.resume_url;
  const portraitUrl = profile?.portrait_url;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Neoclassical Tech Command Center"
      className="relative min-h-screen pt-28 pb-12 md:pt-32 md:pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Holographic Neoclassical Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-radial from-[var(--gold)]/10 via-[#00F2FE]/5 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-[var(--gold)]/15 hidden md:block" />
        <div className="absolute top-10 left-10 right-10 bottom-10 border border-[#00F2FE]/10 hidden md:block" />
      </div>

      {/* Classical Corner Accents */}
      <div className="hidden lg:block">
        <CornerOrnament position="top-left" size="lg" className="top-8 left-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="top-right" size="lg" className="top-8 right-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="bottom-left" size="lg" className="bottom-8 left-8 opacity-60 text-[var(--gold)]" />
        <CornerOrnament position="bottom-right" size="lg" className="bottom-8 right-8 opacity-60 text-[var(--gold)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Maximalist Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-3 border-b border-[var(--gold)]/25">
          <div className="flex items-center gap-3 text-xs font-mono">
            <AnimatedMacbookLogo size="xs" showAura={false} />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[var(--gold)] font-bold tracking-wider uppercase">
              NODE ACTIVE &bull; KOLKATA, INDIA
            </span>
            <span className="text-[var(--muted)] hidden sm:inline">
              &bull; 22.5726° N, 88.3639° E
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-0.5 rounded bg-[#161C28] text-cyan-300 border border-cyan-500/30">
              MAKAUT &bull; NSEC IT &apos;28
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#161C28] text-[var(--gold)] border border-[var(--gold)]/30">
              NASA SPACE APPS &apos;25
            </span>
          </div>
        </div>

        {/* 2-COLUMN MAXIMALIST TECH BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Neoclassical Identity & Human Core (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-5"
          >
            {/* Top Identity Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="h-px w-6 bg-[var(--gold)]" />
              <span className="font-serif text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-bold">
                SYSTEM ARCHITECT &bull; RESEARCHER
              </span>
              <span className="h-px w-6 bg-[var(--gold)]" />
            </motion.div>

            {/* Grand Serif Name with Gold Sheen */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gold-gradient leading-[1.05] filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
            >
              {fullName}
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              variants={itemVariants}
              className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)] font-normal leading-snug whitespace-pre-line"
            >
              {subheadline}
            </motion.div>

            {/* Portrait & Credentials Horizontal Lockup */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded bg-[#121622]/90 border border-[var(--gold)]/35 shadow-lg">
              {/* Arch Portrait */}
              <div className="relative shrink-0">
                <ArchFrame variant="portrait" className="w-28 h-36 border border-[var(--gold)]/50 bg-[#0E121A]">
                  {portraitUrl ? (
                    <Image
                      src={portraitUrl}
                      alt={fullName}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#1A2234] via-[#101422] to-[#0A0D14] text-center group">
                      <AnimatedMacbookLogo size="md" showAura={true} />
                      <span className="text-[9px] font-mono tracking-widest text-[var(--gold)] mt-2">
                        AI &bull; RESEARCH ARCHITECTURE
                      </span>
                      <span className="text-[8px] font-mono text-cyan-400">
                        KOLKATA &bull; MAKAUT &apos;28
                      </span>
                    </div>
                  )}
                </ArchFrame>
              </div>

              {/* Bio & Academic Highlights */}
              <div className="space-y-2 text-left">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    B.Tech IT &bull; CGPA 7.7
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    AI/ML Enthusiast
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                  {description}
                </p>
                <div className="text-[11px] font-mono text-[var(--muted)] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>Netaji Subhash Engineering College, MAKAUT &bull; Graduating 2028</span>
                </div>
              </div>
            </motion.div>

            {/* Impact Metric Strip */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded bg-[#121622]/95 border border-[var(--gold)]/35 shadow-md"
            >
              <div className="p-2 border-r border-[var(--gold)]/20 last:border-r-0">
                <span className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient block">
                  4 Flagship
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  Architectures
                </span>
              </div>
              <div className="p-2 border-r border-[var(--gold)]/20 last:border-r-0">
                <span className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient block">
                  12+ Events
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  Byte Brigade Lead
                </span>
              </div>
              <div className="p-2 border-r border-[var(--gold)]/20 last:border-r-0">
                <span className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient block">
                  6 Wings
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  Tech Guilds
                </span>
              </div>
              <div className="p-2">
                <span className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient block">
                  NASA Space
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  Apps &apos;25
                </span>
              </div>
            </motion.div>

            {/* GSAP Magnetic Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="gsap-magnetic btn-classical-primary"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 text-[#0B0D12]" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('journey')}
                className="gsap-magnetic btn-classical-secondary"
              >
                <Compass className="w-4 h-4 text-[var(--gold)]" />
                <span>Explore Journey</span>
              </button>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  download
                  className="gsap-magnetic inline-flex items-center gap-2 px-4 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[#161C28] text-[var(--walnut)] font-serif text-xs tracking-wider uppercase hover:border-[var(--gold)] transition-all"
                >
                  <FileDown className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>CV</span>
                </a>
              )}

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="gsap-magnetic p-2.5 rounded-xs border border-[var(--gold)]/40 bg-[#121622] text-[var(--gold)] hover:text-white hover:border-[var(--gold)] transition-all"
              >
                <GithubIcon />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: The Interactive Tech Command Deck (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col space-y-3"
          >
            {/* Command Deck Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded bg-[#101420] border border-[var(--gold)]/30">
              <button
                type="button"
                onClick={() => setActiveDeckTab('terminal')}
                className={`flex-1 py-1.5 px-2 rounded-xs text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                  activeDeckTab === 'terminal'
                    ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/50 font-bold shadow-xs'
                    : 'text-[var(--muted)] hover:text-white'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bash Deck</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDeckTab('code')}
                className={`flex-1 py-1.5 px-2 rounded-xs text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                  activeDeckTab === 'code'
                    ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/50 font-bold shadow-xs'
                    : 'text-[var(--muted)] hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Code Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDeckTab('hud')}
                className={`flex-1 py-1.5 px-2 rounded-xs text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                  activeDeckTab === 'hud'
                    ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/50 font-bold shadow-xs'
                    : 'text-[var(--muted)] hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Telemetry HUD</span>
              </button>
            </div>

            {/* Active Deck Viewer */}
            <div className="relative">
              {activeDeckTab === 'terminal' && <InteractiveTerminal />}
              {activeDeckTab === 'code' && <LiveCodeDeck />}
              {activeDeckTab === 'hud' && <TelemetryHUD />}
            </div>

            {/* Tech Specs Micro-Footer */}
            <div className="p-2.5 rounded bg-[#101420]/80 border border-[var(--gold)]/20 grid grid-cols-2 gap-2 text-[10px] font-mono text-[var(--muted)]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Cpu className="w-3 h-3" />
                <span>CUDA &bull; FreeRTOS &bull; TensorRT</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300 justify-end">
                <Server className="w-3 h-3" />
                <span>FastAPI &bull; Next.js 16</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
