'use client';

import { motion } from 'framer-motion';
import {
  ArrowUp,
  Mail,
  MapPin,
} from 'lucide-react';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
}

const FOOTER_NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research & Interests', href: '#research' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      aria-label="Portfolio Footer"
      className="relative bg-[var(--ivory)] text-[var(--walnut)] border-t border-[var(--gold)]/30 texture-parchment pt-12 pb-16 overflow-hidden"
    >
      {/* Top Ornamental Divider */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <OrnamentalDivider variant="ornate" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[var(--gold)]/20">
          {/* Identity Column (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center p-1 rounded-sm border border-[var(--gold)]/40 bg-[#101420] shadow-md group">
                <AnimatedMacbookLogo size="sm" showAura={true} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[var(--burgundy)]">
                  Rishaan Kumar
                </span>
                <span className="text-[10px] tracking-[0.26em] uppercase text-[var(--muted)] font-mono">
                  Personal Folio &bull; Est. 2026
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-[var(--charcoal)]/90 max-w-sm">
              &ldquo;Curiosity. Research. Engineering.&rdquo;
            </p>

            <div className="flex items-center gap-2 text-xs font-sans text-[var(--muted)] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Kolkata, West Bengal, India</span>
            </div>
          </div>

          {/* Navigation Links Column (4 Cols) */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--gold-dark)] font-bold mb-1 block">
              Compendium Index
            </span>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm font-sans font-medium text-[var(--charcoal)]/85">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-[var(--burgundy)] transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Back to Top Column (3 Cols) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-6">
            <div className="flex flex-col md:items-end space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--gold-dark)] font-bold block">
                Direct Guilds
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/rishaan007"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-[var(--burgundy)] hover:border-[var(--gold)] hover:bg-[var(--parchment)] transition-all shadow-2xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/rishaan007"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-[var(--burgundy)] hover:border-[var(--gold)] hover:bg-[var(--parchment)] transition-all shadow-2xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="mailto:ashim3006@gmail.com"
                  aria-label="Direct Email"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-[var(--burgundy)] hover:border-[var(--gold)] hover:bg-[var(--parchment)] transition-all shadow-2xs"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[var(--walnut)] bg-[var(--parchment)]/60 border border-[var(--gold)]/40 rounded-xs hover:border-[var(--gold)] hover:bg-[var(--parchment)] hover:text-[var(--burgundy)] transition-all shadow-2xs"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--gold)] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-serif text-[var(--muted)]">
          <p>
            &copy; {currentYear} Rishaan Kumar. All rights reserved.
          </p>

          <p className="italic">
            Crafted with European neoclassical elegance and modern systems rigor.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
