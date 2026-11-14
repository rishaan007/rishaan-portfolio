'use client';

import { motion } from 'framer-motion';
import {
  ArrowUp,
  MapPin,
} from 'lucide-react';
import { OrnamentalDivider } from '@/components/public/decorative/OrnamentalDivider';
import { AnimatedMacbookLogo } from '@/components/public/tech/AnimatedMacbookLogo';
import { cn } from '@/lib/utils';
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  InstagramIcon,
  MailIcon,
} from '@/components/public/icons/SocialIcons';

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
  { label: 'Curriculum Vitae (PDF)', href: '/Rishaan_Kumar_CV.pdf' },
];

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
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-gold-gradient">
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
                    target={link.href.startsWith('#') ? undefined : '_blank'}
                    rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
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
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/rishaan007"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (github.com/rishaan007)"
                  title="GitHub: rishaan007"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-white hover:border-[var(--gold)] hover:bg-[#161C28] transition-all shadow-2xs"
                >
                  <GithubIcon size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/rishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile (linkedin.com/in/rishaankumar)"
                  title="LinkedIn: rishaankumar"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-cyan-300 hover:border-[var(--gold)] hover:bg-[#161C28] transition-all shadow-2xs"
                >
                  <LinkedinIcon size={16} />
                </a>

                <a
                  href="https://x.com/therishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter (x.com/therishaankumar)"
                  title="X (Twitter): @therishaankumar"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-cyan-300 hover:border-[var(--gold)] hover:bg-[#161C28] transition-all shadow-2xs"
                >
                  <TwitterXIcon size={15} />
                </a>

                <a
                  href="https://instagram.com/therishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile (@therishaankumar)"
                  title="Instagram: @therishaankumar"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-pink-400 hover:border-[var(--gold)] hover:bg-[#161C28] transition-all shadow-2xs"
                >
                  <InstagramIcon size={16} />
                </a>

                <a
                  href="mailto:ashim3006@gmail.com"
                  aria-label="Direct Email (ashim3006@gmail.com)"
                  title="Email: ashim3006@gmail.com"
                  className="p-2 rounded-xs border border-[var(--gold)]/35 bg-[var(--parchment)]/70 text-[var(--walnut)] hover:text-emerald-400 hover:border-[var(--gold)] hover:bg-[#161C28] transition-all shadow-2xs"
                >
                  <MailIcon size={16} />
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
