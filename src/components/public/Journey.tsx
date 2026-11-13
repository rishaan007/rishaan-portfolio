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
} from 'lucide-react';
import { Education, TimelineEntry } from '@/lib/types/database';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';

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
