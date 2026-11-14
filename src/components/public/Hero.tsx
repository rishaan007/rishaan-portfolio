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
import { FloatingGadgetShowcase } from '@/components/public/tech/FloatingGadgetShowcase';
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  InstagramIcon,
  MailIcon,
} from '@/components/public/icons/SocialIcons';

interface HeroProps {
  profile: Profile | null;
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
  const linkedinUrl = profile?.linkedin_url || 'https://www.linkedin.com/in/rishaankumar';
  const twitterUrl = 'https://x.com/therishaankumar';
  const instagramUrl = 'https://instagram.com/therishaankumar';
  const emailUrl = 'mailto:ashim3006@gmail.com';
  const resumeUrl = '/Rishaan_Kumar_CV.pdf';
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

            {/* Grand Imperial Monument Name with Gold Sheen */}
            <motion.h1
              variants={itemVariants}
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] uppercase text-gold-gradient leading-[1.08] filter drop-shadow-[0_4px_25px_rgba(212,175,55,0.3)]"
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

            {/* Interactive Floating Gadget (Laptop / Tablet / Mobile) */}
            <motion.div variants={itemVariants} className="relative p-5 rounded-sm bg-[#121622]/95 border-2 border-[var(--gold)]/40 shadow-2xl texture-paper overflow-hidden">
              <CornerOrnament position="top-right" size="sm" className="opacity-40 text-[var(--gold)]" />
              <CornerOrnament position="bottom-left" size="sm" className="opacity-40 text-[var(--gold)]" />

              <div className="flex flex-col items-center text-center mb-2">
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[var(--gold)]" />
                  INTERACTIVE HARDWARE NODE // TAP GADGET
                </span>
              </div>

              {/* The Hovering Floating Gadget (Laptop / Tablet / Mobile) */}
              <FloatingGadgetShowcase className="my-1" />

              {/* Bio & Academic Highlights */}
              <div className="mt-4 pt-3 border-t border-[var(--gold)]/20 space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    B.Tech IT &bull; CGPA 7.7 / 10
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    AI/ML &amp; Systems
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1A2234] text-[var(--gold)] border border-[var(--gold)]/30">
                    Netaji Subhash Engineering College (NSEC)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--espresso)]/90 leading-relaxed font-sans">
                  {description}
                </p>
                <div className="text-[11px] font-mono text-[var(--muted)] flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>Kolkata, West Bengal, India &bull; Class of 2028 (MAKAUT)</span>
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

              <a
                href={resumeUrl}
                download="Rishaan_Kumar_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-magnetic inline-flex items-center gap-2 px-4 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[#161C28] text-[var(--walnut)] font-serif text-xs tracking-wider uppercase hover:border-[var(--gold)] hover:text-white transition-all shadow-md group"
                title="Download Rishaan Kumar's CV (PDF)"
              >
                <FileDown className="w-3.5 h-3.5 text-[var(--gold)] group-hover:translate-y-0.5 transition-transform" />
                <span>CV (PDF)</span>
              </a>

              {/* Social Channels Pill Cluster */}
              <div className="flex items-center gap-1.5 p-1 rounded-xs border border-[var(--gold)]/30 bg-[#101420]/80">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (github.com/rishaan007)"
                  title="GitHub: rishaan007"
                  className="gsap-magnetic p-2 rounded-xs text-[var(--gold)] hover:text-white hover:bg-[var(--gold)]/20 transition-all"
                >
                  <GithubIcon size={16} />
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (linkedin.com/in/rishaankumar)"
                  title="LinkedIn: rishaankumar"
                  className="gsap-magnetic p-2 rounded-xs text-[var(--gold)] hover:text-cyan-300 hover:bg-[var(--gold)]/20 transition-all"
                >
                  <LinkedinIcon size={16} />
                </a>

                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter (x.com/therishaankumar)"
                  title="X (Twitter): @therishaankumar"
                  className="gsap-magnetic p-2 rounded-xs text-[var(--gold)] hover:text-cyan-300 hover:bg-[var(--gold)]/20 transition-all"
                >
                  <TwitterXIcon size={15} />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (@therishaankumar)"
                  title="Instagram: @therishaankumar"
                  className="gsap-magnetic p-2 rounded-xs text-[var(--gold)] hover:text-pink-400 hover:bg-[var(--gold)]/20 transition-all"
                >
                  <InstagramIcon size={16} />
                </a>

                <a
                  href={emailUrl}
                  aria-label="Email (ashim3006@gmail.com)"
                  title="Direct Email: ashim3006@gmail.com"
                  className="gsap-magnetic p-2 rounded-xs text-[var(--gold)] hover:text-emerald-300 hover:bg-[var(--gold)]/20 transition-all"
                >
                  <MailIcon size={16} />
                </a>
              </div>
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
