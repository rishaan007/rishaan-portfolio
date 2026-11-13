'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  User,
  FolderOpen,
  Code2,
  Route,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  X,
  Compass,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Journey', href: '/admin/journey', icon: Route },
  { label: 'Research', href: '/admin/research', icon: BookOpen },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F5F0E6] border-r border-[var(--parchment-border)] shadow-sm">
      {/* Brand Header */}
      <div className="p-6 border-b border-[var(--parchment-border)] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm bg-[var(--burgundy)] text-[var(--gold)] flex items-center justify-center font-serif font-bold text-lg border border-[var(--gold)]/40 shadow-sm transition-transform group-hover:scale-105">
            RK
          </div>
          <div>
            <div className="font-serif font-bold text-lg tracking-wider text-[var(--walnut)] uppercase flex items-center gap-1.5">
              <span>RK Admin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[var(--muted)]">
              Curator Sanctum
            </p>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-sm text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-5 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-serif uppercase tracking-[0.25em] text-[var(--muted)] font-semibold">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose && onClose()}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-sans font-medium transition-all duration-200 group relative',
                active
                  ? 'bg-[var(--burgundy)] text-[var(--ivory)] shadow-sm border-l-3 border-[var(--gold)]'
                  : 'text-[var(--charcoal)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)]/70'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 transition-transform group-hover:scale-110 shrink-0',
                  active ? 'text-[var(--gold)]' : 'text-[var(--muted)] group-hover:text-[var(--burgundy)]'
                )}
              />
              <span className="tracking-wide">{item.label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Classical Divider */}
      <div className="px-6 py-2">
        <div className="h-px bg-[var(--parchment-border)]" />
      </div>

      {/* Footer Actions */}
      <div className="p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-sans font-medium text-[var(--walnut)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] transition-colors border border-[var(--gold)]/20"
        >
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[var(--gold)]" />
            <span>View Public Site</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)]" />
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-sm text-xs font-sans font-medium text-red-700 hover:text-red-900 hover:bg-red-50/70 transition-colors border border-red-200/50"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[var(--walnut)]/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
