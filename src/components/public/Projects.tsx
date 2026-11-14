'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Project, ProjectTechnology } from '@/lib/types/database';
import { AtlasVisualizer } from '@/components/public/visualizers/AtlasVisualizer';
import { TrinetraVisualizer } from '@/components/public/visualizers/TrinetraVisualizer';
import { SwasthyaVisualizer } from '@/components/public/visualizers/SwasthyaVisualizer';
import { PricehubVisualizer } from '@/components/public/visualizers/PricehubVisualizer';

type ProjectWithTech = Project & {
  technologies: ProjectTechnology[];
};

interface ProjectsProps {
  projects: ProjectWithTech[];
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function ProjectCard({
  project,
  index,
  numeral,
  renderVisualizer,
}: {
  project: ProjectWithTech;
  index: number;
  numeral: string;
  renderVisualizer: (slug: string, title?: string, index?: number) => React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative p-6 sm:p-8 lg:p-10 rounded-sm bg-[#121622] border-2 border-[var(--gold)]/35 shadow-[0_12px_45px_rgba(0,0,0,0.8)] texture-paper group hover:border-[var(--gold)]/70 transition-colors"
    >
      {/* Background Watermark Roman Numeral */}
      <span
        aria-hidden="true"
        className="absolute top-2 right-6 font-serif text-6xl sm:text-8xl md:text-9xl font-bold text-[var(--gold)]/10 select-none pointer-events-none"
      >
        0{index + 1}
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visualizer Column (7 cols) */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative group/vis">
            <div className="absolute -inset-2 rounded-xs border border-[var(--gold)]/25 pointer-events-none group-hover/vis:border-[var(--gold)]/50 transition-colors" />
            {renderVisualizer(project.slug, project.title, index)}
          </div>
        </div>

        {/* Narrative Column (5 cols) */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-between`}>
          <div>
            {/* Exhibit badge & Category */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-serif text-[11px] font-bold tracking-[0.25em] text-gold-gradient uppercase">
                {numeral}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                {project.category.split('/')[0]}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient leading-tight mb-2">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:brightness-125 transition-all"
              >
                {project.title}
              </Link>
            </h3>

            {project.subtitle && (
              <p className="font-serif italic text-sm text-[var(--walnut)] font-semibold mb-4">
                {project.subtitle}
              </p>
            )}

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[var(--charcoal)] leading-relaxed font-sans mb-5">
              {project.short_description}
            </p>

            {/* Technology Chips */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-2.5 py-1 text-xs font-mono rounded-xs bg-[#161C28] text-[var(--walnut)] border border-[var(--gold)]/30 tracking-wide hover:border-[var(--gold)] transition-colors"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-[var(--gold)]/20 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="gsap-magnetic inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[var(--gold)] hover:text-white transition-colors group/link"
            >
              <span>Inspect Full Case Study</span>
              <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform text-cyan-400" />
            </Link>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-magnetic inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
              >
                <GithubIcon />
                <span>Repository</span>
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-magnetic inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-cyan-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const renderVisualizer = (slug: string, title?: string, index?: number) => {
    const s = (slug || '').toLowerCase();
    const t = (title || '').toLowerCase();

    if (s.includes('trinetra') || t.includes('trinetra') || s.includes('intrusion') || t.includes('intrusion')) {
      return <TrinetraVisualizer />;
    }
    if (s.includes('swasthya') || t.includes('swasthya') || s.includes('medical') || t.includes('insurance')) {
      return <SwasthyaVisualizer />;
    }
    if (s.includes('pricehub') || t.includes('pricehub') || s.includes('price') || t.includes('price')) {
      return <PricehubVisualizer />;
    }
    if (s.includes('atlas') || t.includes('atlas') || s.includes('exoplanet') || t.includes('exoplanet') || s.includes('nasa') || t.includes('nasa')) {
      return <AtlasVisualizer />;
    }

    // Fallback: guaranteed distinct visualizer by index
    const fallbackList = [
      <AtlasVisualizer key="atlas" />,
      <TrinetraVisualizer key="trinetra" />,
      <SwasthyaVisualizer key="swasthya" />,
      <PricehubVisualizer key="pricehub" />,
    ];
    return fallbackList[(index ?? 0) % fallbackList.length];
  };

  const romanNumerals = ['EXHIBIT I', 'EXHIBIT II', 'EXHIBIT III', 'EXHIBIT IV', 'EXHIBIT V'];

  return (
    <section
      id="projects"
      aria-label="Selected Works"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--gold)]/20"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)] font-bold">
              Pinacoteca &bull; Gallery
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tracking-tight">
            Selected Works
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)] mt-3 font-normal max-w-2xl mx-auto">
            &ldquo;An exploration of ideas, experiments and systems brought to life through technology.&rdquo;
          </p>
        </motion.div>

        {/* Gallery Exhibits List with 3D Tilt Cards */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              numeral={romanNumerals[index] || `EXHIBIT ${index + 1}`}
              renderVisualizer={renderVisualizer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
