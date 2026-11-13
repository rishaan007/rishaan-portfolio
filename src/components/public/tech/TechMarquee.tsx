'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function TechMarquee() {
  const techStack = [
    { name: 'PyTorch', category: 'Deep Learning', color: '#EE4C2C' },
    { name: 'Transformer Encoders', category: 'Architecture', color: '#D4AF37' },
    { name: 'YOLOv8', category: 'Computer Vision', color: '#00F2FE' },
    { name: 'ESP32 / FreeRTOS', category: 'Embedded Systems', color: '#10B981' },
    { name: 'YAMNet', category: 'Audio Classification', color: '#A855F7' },
    { name: 'SHAP (XAI)', category: 'Explainability', color: '#F59E0B' },
    { name: 'FastAPI', category: 'High-Throughput API', color: '#059669' },
    { name: 'React & Next.js', category: 'Frontend Architecture', color: '#38BDF8' },
    { name: 'MongoDB Atlas', category: 'NoSQL Database', color: '#10B981' },
    { name: 'Raspberry Pi Zero W', category: 'Edge Computing', color: '#EC4899' },
    { name: 'Lightkurve', category: 'Astrophysics', color: '#FBBF24' },
    { name: 'CUDA / TensorRT', category: 'GPU Acceleration', color: '#76B900' },
  ];

  // Double list for infinite seamless marquee loop
  const marqueeList = [...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-[#080B10] border-t border-b border-[var(--gold)]/25 select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0D12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0D12] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-3 w-max"
      >
        {marqueeList.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#121622] border border-[var(--gold)]/25 hover:border-[var(--gold)] transition-colors shadow-2xs whitespace-nowrap"
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
            />
            <span className="text-xs font-mono font-bold text-[var(--walnut)] tracking-wide">
              {tech.name}
            </span>
            <span className="text-[10px] font-mono text-[var(--muted)]">
              &bull; {tech.category}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
