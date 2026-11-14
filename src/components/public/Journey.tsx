'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  GitPullRequest,
  Trophy,
  Award,
  Calendar,
  MapPin,
  Sparkles,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Education, TimelineEntry } from '@/lib/types/database';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';

const HONORS_AND_HACKATHONS = [
  {
    id: 'h-1',
    event: 'NASA International Space Apps Challenge 2025',
    project: 'ATLAS — AI-Based Exoplanet Detection',
    subtitle: 'Global NASA Planetary Hackathon &bull; AI/ML & Full-Stack',
    badge: 'NASA Global Competitor',
    badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
    iconName: 'sparkles',
    description:
      'Engineered an exoplanet transit detection pipeline using Kepler, K2, and TESS datasets with a hybrid CNN–Transformer architecture and SHAP explainability. Developed a full-stack analysis workflow with FastAPI and React.',
    tags: ['NASA Kepler/TESS', 'CNNs', 'Transformer Encoders', 'SHAP', 'FastAPI', 'React.js'],
  },
  {
    id: 'h-2',
    event: 'Binary 36-Hour Hackathon 2025',
    project: 'NeuraClaim — AI Claims Intelligence Platform',
    subtitle: '36-Hour Intensive Hackathon Sprint &bull; Document Intelligence',
    badge: '36h Sprint Prototype',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    iconName: 'award',
    description:
      'Sprint-built a rapid prototype for automated medical document parsing, insurance policy cross-referencing, and claim-letter drafting under strict 36-hour sprint constraints with OCR and generative AI.',
    tags: ['OpenAI / Gemini', 'OCR', 'PyPDF2', 'FastAPI', 'Claim Intelligence'],
  },
  {
    id: 'h-3',
    event: 'Smart Bengal Hackathon 2025',
    project: 'Regional Societal & Edge Perception Systems',
    subtitle: 'State-Level Hackathon Competitor &bull; Edge AI & Vision',
    badge: 'State Hackathon Competitor',
    badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    iconName: 'trophy',
    description:
      'Engineered edge computing, multimodal sensor fusion, and real-time computer vision prototypes addressing regional governance, safety, and surveillance challenges.',
    tags: ['Edge AI', 'YOLOv8', 'ESP32', 'FreeRTOS', 'Embedded Linux'],
  },
  {
    id: 'h-4',
    event: 'Social Winter of Code (SWOC) — Season 6',
    project: 'Open Source Software Architecture & Mentorship',
    subtitle: 'Season 6 Open Source Programme &bull; Leadership Role',
    badge: 'Project Administrator',
    badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
    iconName: 'git',
    description:
      'Selected as Project Administrator for open-source development programmes; steered software architecture, reviewed and merged pull requests, and mentored contributors across collaborative codebases.',
    tags: ['Project Administrator', 'Open Source', 'Architecture', 'Code Review'],
  },
  {
    id: 'h-5',
    event: 'Hacktoberfest 2025',
    project: 'Global Open-Source Engineering Sprints',
    subtitle: 'DigitalOcean / GitHub Open Source Initiative',
    badge: 'Verified Contributor',
    badgeColor: 'border-orange-500/40 bg-orange-950/40 text-orange-300',
    iconName: 'flame',
    description:
      'Contributed verified, merged pull requests to developer tools, machine learning pipelines, and community software repositories across the global open-source ecosystem.',
    tags: ['Open Source', 'Python Stack', 'Developer Tooling', 'CI/CD'],
  },
  {
    id: 'h-6',
    event: 'Byte Brigade',
    project: 'Non-Profit Student Technology Community',
    subtitle: 'Co-Founder & Organizer &bull; 2024 – Present',
    badge: 'Co-Founder & Community Lead',
    badgeColor: 'border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)]',
    iconName: 'users',
    description:
      'Co-founded a student tech community; established six technical wings (App Dev, Web Dev, DSA, AI/ML, Blockchain, Designing), organised 12+ events and workshops, and built student discovery platforms.',
    tags: ['Community Leadership', '6 Technical Wings', '12+ Events', 'Ecosystem'],
  },
];

interface JourneyProps {
  education: Education[];
  timeline: TimelineEntry[];
}

const DEFAULT_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Information Technology',
    institution: 'Netaji Subhash Engineering College (NSEC)',
    university: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    expected_graduation: '2028',
    cgpa: '7.7 / 10',
    description:
      'Pursuing foundational and practical coursework across Artificial Intelligence, Deep Learning, Edge Computing, Computer Networks, and Full-Stack Development.',
    is_current: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    id: 'time-1',
    title: 'Byte Brigade',
    subtitle: 'Co-Founder & Organizer',
    category: 'leadership',
    date: '2024 — Present',
    description:
      'Co-founded a non-profit student technology community, helped establish six technical wings (App Dev, Web Dev, DSA, AI/ML, Blockchain, Designing), and organised 12+ technical events and hands-on workshops. Contributed to building a platform for student profiles, project showcases and hackathon team discovery.',
    icon: 'users',
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'time-2',
    title: 'Social Winter of Code — Season 6',
    subtitle: 'Project Administrator',
    category: 'opensource',
    date: '2025',
    description:
      'Selected as Project Administrator for open-source development programmes, guiding architecture, reviewing pull requests, and mentoring contributors across collaborative codebases.',
    icon: 'git',
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'time-3',
    title: 'NASA International Space Apps Challenge 2025',
    subtitle: 'Project ATLAS — Exoplanet Detection',
    category: 'hackathon',
    date: 'October 2025',
    description:
      'Engineered an exoplanet detection pipeline using light-curve transit datasets from NASA Kepler, K2, and TESS missions with hybrid CNN–Transformer models and SHAP-based interpretability.',
    icon: 'trophy',
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'time-4',
    title: 'Hacktoberfest 2025',
    subtitle: 'Open Source Contributor',
    category: 'opensource',
    date: 'October 2025',
    description:
      'Collaborated on open-source repositories, submitting merged pull requests for machine learning utilities, frontend components, and developer infrastructure.',
    icon: 'git',
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'time-5',
    title: 'Smart Bengal Hackathon',
    subtitle: 'Hackathon Competitor',
    category: 'hackathon',
    date: '2025',
    description:
      'Developed practical technology solutions addressing real-world societal problem statements under intensive hackathon sprint conditions.',
    icon: 'trophy',
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'time-6',
    title: 'Binary 36-Hour Hackathon',
    subtitle: 'NeuraClaim Platform Prototype',
    category: 'hackathon',
    date: '2025',
    description:
      'Built a rapid 36-hour prototype for automated insurance document parsing, claim guidance, and OCR processing.',
    icon: 'trophy',
    display_order: 6,
    created_at: new Date().toISOString(),
  },
];

export function Journey({ education, timeline }: JourneyProps) {
  const activeEducation =
    education && education.length > 0 ? education : DEFAULT_EDUCATION;
  const activeTimeline =
    timeline && timeline.length > 0 ? timeline : DEFAULT_TIMELINE;

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'leadership':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--burgundy)] text-[var(--ivory)] uppercase">
            <Users className="w-3 h-3 text-[var(--gold)]" /> Leadership
          </span>
        );
      case 'opensource':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--forest)] text-[var(--ivory)] uppercase">
            <GitPullRequest className="w-3 h-3" /> Open Source
          </span>
        );
      case 'hackathon':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8F6F3A] text-white uppercase">
            <Trophy className="w-3 h-3 text-amber-200" /> Hackathon
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--walnut)] text-white uppercase">
            <Award className="w-3 h-3 text-[var(--gold)]" /> Milestone
          </span>
        );
    }
  };

  return (
    <section
      id="journey"
      aria-label="The Journey So Far"
      className="relative py-24 sm:py-32 texture-parchment overflow-hidden border-t border-[var(--gold)]/20"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)] font-bold">
              Chronica &bull; Milestones
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--burgundy)] tracking-tight">
            The Journey So Far
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)]/85 mt-3 font-normal">
            &ldquo;A historical chronicle of education, leadership and hackathon sprints.&rdquo;
          </p>
        </motion.div>

        {/* Education Cornerstone */}
        {activeEducation.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-14 p-6 sm:p-8 rounded-sm bg-[var(--ivory)] border-2 border-[var(--gold)]/45 shadow-md texture-paper"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--gold)]/20 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[var(--parchment)] border border-[var(--gold)]/40 text-[var(--burgundy)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--gold-dark)] font-bold block">
                    Academic Foundation
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--burgundy)]">
                    {edu.degree}
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-[var(--forest)]/15 text-[var(--forest)] border border-[var(--forest)]/30 font-bold">
                  Expected {edu.expected_graduation}
                </span>
                <span className="px-3 py-1 rounded bg-[var(--gold)]/20 text-[var(--walnut)] border border-[var(--gold)]/40 font-bold">
                  CGPA {edu.cgpa}
                </span>
              </div>
            </div>

            <p className="text-base font-serif font-bold text-[var(--walnut)]">
              {edu.institution}
            </p>
            {edu.university && (
              <p className="text-xs text-[var(--muted)] font-sans mt-0.5">
                {edu.university}
              </p>
            )}
            {edu.description && (
              <p className="text-sm text-[var(--espresso)]/80 leading-relaxed font-sans mt-3">
                {edu.description}
              </p>
            )}
          </motion.div>
        ))}

        {/* Competitive Honors & Hackathons Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xs bg-[#1A2234] border border-[var(--gold)]/50 text-[var(--gold)] shadow-md">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-400 font-bold block">
                COMPETITIVE ARENAS &bull; HACKATHONS &bull; OPEN SOURCE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--burgundy)]">
                Honors &amp; Hackathon Milestones
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HONORS_AND_HACKATHONS.map((honor, idx) => (
              <motion.div
                key={honor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-sm bg-[#121622] text-[#F5F0E6] border border-[var(--gold)]/35 hover:border-[var(--gold)] shadow-lg texture-paper group transition-all"
              >
                <CornerOrnament position="top-right" size="sm" className="opacity-30 group-hover:opacity-60 text-[var(--gold)]" />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded bg-[#1A2234] border border-[var(--gold)]/30">
                    {honor.iconName === 'sparkles' && <Sparkles className="w-5 h-5 text-cyan-300" />}
                    {honor.iconName === 'award' && <Award className="w-5 h-5 text-emerald-400" />}
                    {honor.iconName === 'trophy' && <Trophy className="w-5 h-5 text-amber-400" />}
                    {honor.iconName === 'git' && <GitPullRequest className="w-5 h-5 text-purple-300" />}
                    {honor.iconName === 'flame' && <Flame className="w-5 h-5 text-orange-400" />}
                    {honor.iconName === 'users' && <Users className="w-5 h-5 text-[var(--gold)]" />}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border tracking-wide uppercase ${honor.badgeColor}`}>
                    {honor.badge}
                  </span>
                </div>

                <span className="text-[10px] font-mono tracking-wider text-[var(--gold)] uppercase block mb-1 font-bold">
                  {honor.event}
                </span>

                <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-gradient mb-1">
                  {honor.project}
                </h4>

                <p className="font-serif italic text-xs text-[var(--walnut)] font-semibold mb-3">
                  {honor.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#C8C2B7] leading-relaxed font-sans mb-4">
                  {honor.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--gold)]/20">
                  {honor.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded-xs bg-[#161C28] text-cyan-300/90 border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vertical Chronicle Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[var(--gold)]/40 space-y-12">
          {activeTimeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Timeline Gold Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--gold)] bg-[var(--ivory)] flex items-center justify-center group-hover:scale-125 transition-transform shadow-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--burgundy)]" />
              </div>

              {/* Chronicle Card */}
              <div className="p-6 rounded-sm bg-[var(--ivory)] border border-[var(--gold)]/35 shadow-sm hover:shadow-md transition-all texture-paper">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(item.category)}
                    {item.date && (
                      <span className="text-xs font-mono text-[var(--muted)]">
                        &bull; {item.date}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--burgundy)] mt-1">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="font-serif italic text-sm text-[var(--gold-dark)] font-semibold mt-0.5 mb-3">
                    {item.subtitle}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-[var(--espresso)]/85 leading-relaxed font-sans">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
