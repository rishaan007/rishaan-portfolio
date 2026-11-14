'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Brain,
  Server,
  Database,
  Cpu,
  Sparkles,
  Terminal,
  Layers,
  ChevronRight,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';

interface SkillItem {
  id: string;
  name: string;
  icon: string | null;
}

interface SkillCategory {
  id: string;
  name: string;
  display_order: number;
  skills: SkillItem[];
}

interface SkillsProps {
  categories: SkillCategory[];
}

interface EnhancedCategoryData {
  id: string;
  numeral: string;
  name: string;
  discipline: string;
  techLevel: string;
  terminalCommand: string;
  coreFramework: string;
  skills: { name: string; proficiency: string; badge: string }[];
}

const ENHANCED_CATEGORIES: EnhancedCategoryData[] = [
  {
    id: 'cat-1',
    numeral: 'TOME I',
    name: 'Programming Languages',
    discipline: 'Computational Foundations',
    techLevel: 'Core Syntax & Compilation',
    terminalCommand: 'python3 -m cProfile -s cumulative train_pipeline.py',
    coreFramework: 'CPython 3.11 / OpenJDK 21 / GCC 13 / ES2024',
    skills: [
      { name: 'Python', proficiency: '98%', badge: 'Primary Research Stack' },
      { name: 'C / C++', proficiency: '88%', badge: 'Embedded & Memory Mgmt' },
      { name: 'Java', proficiency: '85%', badge: 'OOP & Enterprise Backend' },
      { name: 'JavaScript / TypeScript', proficiency: '94%', badge: 'Type-Safe Full-Stack' },
      { name: 'SQL (PostgreSQL/SQLite)', proficiency: '90%', badge: 'Relational Schemas' },
      { name: 'Bash / Shell', proficiency: '92%', badge: 'Unix & CI/CD Tooling' },
    ],
  },
  {
    id: 'cat-2',
    numeral: 'TOME II',
    name: 'Artificial Intelligence & Deep Learning',
    discipline: 'Neural Architectures & Vision',
    techLevel: 'Tensor Computing & Spatial Models',
    terminalCommand: 'yolo detect train data=trinetra.yaml epochs=100 imgsz=640 batch=16',
    coreFramework: 'PyTorch / YOLOv8 / Transformers / SHAP / OpenCV / TorchVision',
    skills: [
      { name: 'Convolutional Neural Networks (CNNs)', proficiency: '96%', badge: 'Spatial Filters' },
      { name: 'Transformer Encoders & Attention', proficiency: '95%', badge: 'Sequence & Photometry' },
      { name: 'YOLOv8 Spatial Detection', proficiency: '96%', badge: 'Real-Time Inference' },
      { name: 'YAMNet Audio Spectrograms', proficiency: '90%', badge: 'Acoustic Fusion' },
      { name: 'Explainable AI (SHAP)', proficiency: '94%', badge: 'Feature Saliency' },
      { name: 'Optical Character Recognition (OCR)', proficiency: '92%', badge: 'Prescription Parsing' },
      { name: 'Generative AI APIs & Prompt Engineering', proficiency: '95%', badge: 'Gemini / Claude / Agents' },
      { name: 'TinyML & Quantization (INT8)', proficiency: '91%', badge: 'Edge Optimization' },
    ],
  },
  {
    id: 'cat-3',
    numeral: 'TOME III',
    name: 'Web & Distributed Backend',
    discipline: 'High-Throughput Reactive Architecture',
    techLevel: 'SSR, Sockets & Micro-Services',
    terminalCommand: 'next build --webpack && uvicorn api.main:app --workers 4',
    coreFramework: 'Next.js 16 / React 19 / FastAPI / Node.js / Express / Tailwind v4',
    skills: [
      { name: 'React.js & Server Components', proficiency: '96%', badge: 'Modern React Architecture' },
      { name: 'Next.js 16 (App Router)', proficiency: '96%', badge: 'Production Web Framework' },
      { name: 'FastAPI (Python)', proficiency: '94%', badge: 'Asynchronous Microservices' },
      { name: 'Django (Python Web Framework)', proficiency: '91%', badge: 'MVC & REST Gateways' },
      { name: 'Node.js & Express.js', proficiency: '90%', badge: 'RESTful Gateways' },
      { name: 'WebSockets & Event Streams', proficiency: '89%', badge: 'Sub-10ms Live Feeds' },
      { name: 'Tailwind CSS v4 & GSAP', proficiency: '98%', badge: 'Maximalist UI & Physics' },
    ],
  },
  {
    id: 'cat-4',
    numeral: 'TOME IV',
    name: 'Databases & Infrastructure',
    discipline: 'State Persistence & Deployment',
    techLevel: 'Vector Search & Cloud Clusters',
    terminalCommand: 'supabase db push && docker compose up -d redis-broker',
    coreFramework: 'PostgreSQL / Supabase / MongoDB / Redis / Docker / Git',
    skills: [
      { name: 'PostgreSQL & pgvector', proficiency: '92%', badge: 'Vector & Relational Storage' },
      { name: 'Supabase (Auth, RLS, Storage)', proficiency: '95%', badge: 'Managed Backend' },
      { name: 'MongoDB', proficiency: '88%', badge: 'Flexible Document Stores' },
      { name: 'Git & GitHub Workflows', proficiency: '95%', badge: 'Version Control & Releases' },
      { name: 'Vercel & Render Pipelines', proficiency: '94%', badge: 'Continuous Cloud Deploy' },
      { name: 'Linux / POSIX Environments', proficiency: '92%', badge: 'Kernel & Server Administration' },
    ],
  },
  {
    id: 'cat-5',
    numeral: 'TOME V',
    name: 'Embedded Systems & Edge Silicon',
    discipline: 'Hardware Interfacing & Micro-Inference',
    techLevel: 'Real-Time Operating Systems',
    terminalCommand: 'idf.py flash monitor -p /dev/ttyUSB0 --baud 115200',
    coreFramework: 'ESP-IDF / FreeRTOS / Arduino / Raspberry Pi OS / I2C / SPI / DMA',
    skills: [
      { name: 'ESP32 / ESP32-S3 Microcontrollers', proficiency: '94%', badge: 'Dual-Core Silicon' },
      { name: 'FreeRTOS Task Scheduling & Queues', proficiency: '92%', badge: 'Real-Time Multi-Threading' },
      { name: 'Raspberry Pi Zero W', proficiency: '90%', badge: 'Linux Edge Gateways' },
      { name: 'Sensor Protocols (I2C, SPI, UART, ADC)', proficiency: '93%', badge: 'Low-Level Interfacing' },
      { name: 'Direct Memory Access (DMA)', proficiency: '89%', badge: 'Zero-Copy Audio/Cam Buffering' },
      { name: 'Power Budgeting & Sleep Modes', proficiency: '88%', badge: 'Battery-Constrained Ops' },
    ],
  },
];

export function Skills({ categories }: SkillsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<{ categoryId: string; skillName: string } | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Tomes' },
    { id: 'cat-2', label: 'AI & Deep Learning' },
    { id: 'cat-1', label: 'Languages' },
    { id: 'cat-3', label: 'Web & Backend' },
    { id: 'cat-5', label: 'Embedded Silicon' },
    { id: 'cat-4', label: 'Databases & Cloud' },
  ];

  const displayedCategories =
    selectedFilter === 'all'
      ? ENHANCED_CATEGORIES
      : ENHANCED_CATEGORIES.filter((c) => c.id === selectedFilter);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'cat-1':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'cat-2':
        return <Brain className="w-5 h-5 text-[var(--gold)]" />;
      case 'cat-3':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'cat-4':
        return <Database className="w-5 h-5 text-rose-400" />;
      case 'cat-5':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--gold)]" />;
    }
  };

  return (
    <section
      id="skills"
      aria-label="The Library of Skills"
      className="relative py-28 sm:py-36 bg-[#080A0E] text-[var(--espresso)] overflow-hidden border-t border-b border-[var(--gold)]/30"
    >
      {/* Background Architectural Blueprint Grid & Laser Scanlines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-radial from-[var(--gold)]/10 via-cyan-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-radial from-emerald-500/10 via-[var(--gold)]/5 to-transparent blur-3xl opacity-50" />

        {/* Blueprint Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF370A_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370A_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* Outer Filigree Frames */}
        <div className="absolute top-6 left-6 right-6 bottom-6 border border-[var(--gold)]/20 pointer-events-none hidden md:block" />
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-cyan-400/10 pointer-events-none hidden md:block" />
      </div>

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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-bold">
              BIBLIOTHECA &bull; ARSENAL COMPENDIUM
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tracking-tight filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            The Library of Skills
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)] mt-3 font-normal">
            &ldquo;Tools, models, and silicon architectures honed through empirical experimentation.&rdquo;
          </p>

          {/* Top Vitals Status Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto">
            <div className="p-3 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
              <span className="font-serif text-2xl font-bold text-gold-gradient block">28+ Tools</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                Production Mastery
              </span>
            </div>
            <div className="p-3 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
              <span className="font-serif text-2xl font-bold text-cyan-300 block">5 Tomes</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                Core Disciplines
              </span>
            </div>
            <div className="p-3 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
              <span className="font-serif text-2xl font-bold text-emerald-400 block">INT8 Edge</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                Silicon Validated
              </span>
            </div>
            <div className="p-3 rounded-xs bg-[#101420] border border-[var(--gold)]/30 text-center">
              <span className="font-serif text-2xl font-bold text-[var(--gold)] block">MAKAUT &apos;28</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                Engineering Cohort
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filter Navigation Deck */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedFilter(opt.id)}
              className={`gsap-magnetic px-4 py-2 rounded-xs text-xs font-mono tracking-wider uppercase transition-all border ${
                selectedFilter === opt.id
                  ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[#0B0D12] font-bold border-[var(--gold)] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#101420] text-[var(--walnut)] border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-white'
              }`}
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Categorized Folio Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {displayedCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="gsap-card relative p-6 sm:p-8 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/40 shadow-2xl texture-paper flex flex-col justify-between group hover:border-[var(--gold)] transition-all"
            >
              <CornerOrnament
                position="top-right"
                size="sm"
                className="opacity-40 group-hover:opacity-80 transition-opacity text-[var(--gold)]"
              />

              <div>
                {/* Folio Identifier Header */}
                <div className="flex items-center justify-between border-b border-[var(--gold)]/20 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50 shadow-inner">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-serif font-bold tracking-[0.25em] text-[var(--gold)] uppercase block">
                          {cat.numeral} // {cat.discipline}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161C28] text-cyan-300 border border-cyan-500/30 hidden sm:inline-block">
                    {cat.skills.length} Capabilities
                  </span>
                </div>

                {/* Subtitle / Core Framework Target */}
                <div className="text-[11px] font-mono text-[var(--muted)] mb-5 flex items-center justify-between">
                  <span>Stack: <strong className="text-[var(--walnut)]">{cat.coreFramework}</strong></span>
                  <span className="text-emerald-400 font-bold">{cat.techLevel}</span>
                </div>

                {/* Interactive Skills Chips Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                  {cat.skills.map((skill, sIdx) => {
                    const isHovered =
                      hoveredSkill?.categoryId === cat.id && hoveredSkill?.skillName === skill.name;

                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={() =>
                          setHoveredSkill({ categoryId: cat.id, skillName: skill.name })
                        }
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-2.5 rounded-xs border transition-all cursor-default ${
                          isHovered
                            ? 'bg-[#1C2438] border-[var(--gold)] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                            : 'bg-[#0E121B] border-[var(--gold)]/20 hover:border-[var(--gold)]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-[var(--walnut)] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300 font-bold">
                            {skill.proficiency}
                          </span>
                        </div>

                        {/* Interactive Proficiency Laser Bar */}
                        <div className="w-full h-1 bg-[#161C28] rounded-full overflow-hidden mb-1">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: skill.proficiency }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-[var(--gold)] to-cyan-400"
                          />
                        </div>

                        <span className="text-[9px] font-mono text-[var(--muted)] block">
                          {skill.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Interactive Terminal Command Box */}
              <div className="mt-6 pt-4 border-t border-[var(--gold)]/20">
                <div className="p-2.5 rounded bg-[#07090D] border border-[var(--gold)]/25 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-x-auto select-all">
                    <span className="text-cyan-400">$</span>
                    <span className="text-emerald-400 text-[11px] whitespace-nowrap">
                      {cat.terminalCommand}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[var(--gold)] uppercase shrink-0 ml-2">
                    VERIFIED
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <AnimatedMacbookLogo size="xs" showAura={false} />
                    <span>Silicon Mapped</span>
                  </div>
                  <span className="text-[var(--gold-dark)] font-serif font-bold">
                    100% Empirically Tested
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
