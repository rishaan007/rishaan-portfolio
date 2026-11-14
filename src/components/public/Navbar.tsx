'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Activity, Terminal, Shield } from 'lucide-react';
import { TechLogo } from '@/components/public/tech/TechLogo';
import { ScrollProgressBar } from '@/components/public/interactive/ScrollProgressBar';
import { cn } from '@/lib/utils';
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  InstagramIcon,
  MailIcon,
} from '@/components/public/icons/SocialIcons';

interface NavItem {
  name: string;
  index: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', index: '01', href: '#hero', id: 'hero' },
  { name: 'About', index: '02', href: '#about', id: 'about' },
  { name: 'Projects', index: '03', href: '#projects', id: 'projects' },
  { name: 'Research', index: '04', href: '#research', id: 'research' },
  { name: 'Journey', index: '05', href: '#journey', id: 'journey' },
  { name: 'Contact', index: '06', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'research', 'journey', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Laser Reading Scroll Progress Bar */}
      <ScrollProgressBar />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-[#0B0D12]/92 backdrop-blur-md border-b border-[var(--gold)]/30 shadow-[0_8px_30px_rgba(0,0,0,0.8)] py-2.5'
            : 'bg-transparent border-b border-transparent py-4 md:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Left: Cyber-Neoclassical Brand Crest & Name */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="gsap-magnetic group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Animated HUD Monogram Logo */}
              <TechLogo />

              {/* Identity Name & Telemetry Label */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-base sm:text-lg font-black tracking-[0.22em] uppercase text-gold-gradient group-hover:brightness-125 transition-all">
                    Rishaan Kumar
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-xs bg-[#161C28] text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-mono tracking-wider text-[var(--muted)]">
                  <span className="text-cyan-400">AI/ML ARCHITECT</span>
                  <span className="text-[var(--gold)]/40">&bull;</span>
                  <span>EST. 2026 // 0xRK</span>
                </div>
              </div>
            </a>

            {/* Center: Indexed Tech Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      'gsap-magnetic relative py-1 text-xs font-mono tracking-wider uppercase transition-colors duration-200 group flex items-center gap-1',
                      isActive
                        ? 'text-[var(--gold)] font-bold'
                        : 'text-[var(--charcoal)] hover:text-white'
                    )}
                  >
                    <span className="text-[10px] text-cyan-400/70 group-hover:text-cyan-300">
                      {item.index}.
                    </span>
                    <span>{item.name}</span>

                    {/* Laser Underline for Active Section */}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--gold)] via-cyan-400 to-[var(--gold)] shadow-[0_0_8px_#38BDF8]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--gold)]/40 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 hover:scale-x-100" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Telemetry Chip & Glowing "Let's Connect" Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="gsap-magnetic group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0B0D12] bg-gradient-to-r from-[#E5C07B] via-[#D4AF37] to-[#B8860B] rounded-xs shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#0B0D12] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-cyan-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-cyan-300" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xs border border-[var(--gold)]/40 bg-[#121622] text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-[var(--gold)]/30 bg-[#0B0D12]/98 backdrop-blur-xl px-4 py-5 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col space-y-3 font-mono text-sm">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      'flex items-center justify-between p-2 rounded border border-transparent transition-all',
                      activeSection === item.id
                        ? 'text-[var(--gold)] border-[var(--gold)]/30 bg-[#161C28] font-bold'
                        : 'text-[var(--espresso)] hover:text-[var(--gold)]'
                    )}
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-cyan-400">{item.index} //</span>
                  </a>
                ))}

                <div className="pt-3 border-t border-[var(--gold)]/20 space-y-3">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B0D12] bg-[var(--gold)] rounded-xs shadow-md"
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Mobile Direct Social Links */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <a
                      href="https://github.com/rishaan007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xs border border-[var(--gold)]/30 bg-[#161C28] text-[var(--gold)] hover:text-white"
                      title="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rishaankumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xs border border-[var(--gold)]/30 bg-[#161C28] text-[var(--gold)] hover:text-cyan-300"
                      title="LinkedIn"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                    <a
                      href="https://x.com/therishaankumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xs border border-[var(--gold)]/30 bg-[#161C28] text-[var(--gold)] hover:text-cyan-300"
                      title="X / Twitter"
                    >
                      <TwitterXIcon size={15} />
                    </a>
                    <a
                      href="https://instagram.com/therishaankumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xs border border-[var(--gold)]/30 bg-[#161C28] text-[var(--gold)] hover:text-pink-400"
                      title="Instagram"
                    >
                      <InstagramIcon size={16} />
                    </a>
                    <a
                      href="mailto:ashim3006@gmail.com"
                      className="p-2 rounded-xs border border-[var(--gold)]/30 bg-[#161C28] text-[var(--gold)] hover:text-emerald-300"
                      title="Email"
                    >
                      <MailIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
export default Navbar;
