'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Plus, ExternalLink, ShieldCheck, Bell } from 'lucide-react';

interface AdminHeaderProps {
  onMenuToggle?: () => void;
  userEmail?: string | null;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin': { title: 'Dashboard Overview', subtitle: 'Curatorial Analytics & Activity' },
  '/admin/profile': { title: 'Curator Profile', subtitle: 'Biography, Credentials & Hero Meta' },
  '/admin/projects': { title: 'Projects Registry', subtitle: 'Portfolio Works & Case Studies' },
  '/admin/projects/new': { title: 'New Case Study', subtitle: 'Draft & Publish Project Portfolio' },
  '/admin/skills': { title: 'Technical Mastery', subtitle: 'Skills Taxonomy & Proficiencies' },
  '/admin/journey': { title: 'Academic & Career Journey', subtitle: 'Education, Leadership & Milestones' },
  '/admin/research': { title: 'Scholarly Research', subtitle: 'Research Interests & Publications' },
  '/admin/messages': { title: 'Correspondence', subtitle: 'Inquiries, Contact Letters & Messages' },
  '/admin/media': { title: 'Media & Asset Library', subtitle: 'Storage, Documentation & Images' },
  '/admin/settings': { title: 'Platform Settings', subtitle: 'Configuration, SEO & Global Meta' },
};

export default function AdminHeader({ onMenuToggle, userEmail }: AdminHeaderProps) {
  const pathname = usePathname();

  // Handle dynamic routes like /admin/projects/[id]
  let currentMeta = pageTitles[pathname];
  if (!currentMeta) {
    if (pathname.startsWith('/admin/projects/')) {
      currentMeta = { title: 'Edit Case Study', subtitle: 'Update Project Specifications & Media' };
    } else {
      currentMeta = { title: 'Curator Console', subtitle: 'Administration Sanctuary' };
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-[var(--ivory)]/90 backdrop-blur-md border-b border-[var(--parchment-border)] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Dynamic Page Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors border border-[var(--gold)]/20"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-[var(--burgundy)]" />
            </button>
          )}

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-serif font-bold tracking-wide text-[var(--walnut)] truncate">
              {currentMeta.title}
            </h1>
            <p className="hidden sm:block text-xs text-[var(--muted)] truncate font-serif italic">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Quick Actions & User Identity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/admin/projects/new"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--burgundy)] text-[var(--ivory)] text-xs font-sans font-medium tracking-wide hover:bg-[var(--oxblood)] transition-all shadow-xs border border-[var(--gold)]/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>

          <Link
            href="/admin/messages"
            className="p-2 rounded-sm text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] transition-colors relative"
            title="View Messages"
          >
            <Bell className="w-4 h-4" />
          </Link>

          <div className="h-6 w-px bg-[var(--parchment-border)] hidden sm:block" />

          {/* User Badge / Avatar */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-[var(--burgundy)] text-[var(--gold)] border border-[var(--gold)]/40 flex items-center justify-center font-serif font-bold text-xs shadow-xs">
              RK
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-serif font-semibold text-[var(--walnut)] leading-tight flex items-center gap-1">
                <span>Rishaan Kumar</span>
                <ShieldCheck className="w-3 h-3 text-[var(--gold)]" />
              </div>
              <p className="text-[10px] text-[var(--muted)] font-mono truncate max-w-[140px]">
                {userEmail || 'admin@rishaan.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
