'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { formatDate, getRelativeTime } from '@/lib/utils';
import {
  FolderCheck,
  FileClock,
  Code2,
  Milestone,
  Mail,
  CalendarClock,
  Plus,
  UserCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

interface DashboardStats {
  publishedProjects: number;
  draftProjects: number;
  totalSkills: number;
  timelineEntries: number;
  unreadMessages: number;
  lastUpdated: string | null;
}

interface RecentProject {
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'published';
  updated_at: string;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    publishedProjects: 0,
    draftProjects: 0,
    totalSkills: 0,
    timelineEntries: 0,
    unreadMessages: 0,
    lastUpdated: null,
  });
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // 1. Projects stats
      const { data: projectsData } = await supabase
        .from('projects')
        .select('id, title, category, status, updated_at')
        .order('updated_at', { ascending: false });

      const allProjects = (projectsData as RecentProject[]) || [];
      const published = allProjects.filter((p) => p.status === 'published').length;
      const drafts = allProjects.filter((p) => p.status === 'draft').length;
      const latestProjectUpdate = allProjects[0]?.updated_at || null;

      // 2. Skills count
      const { count: skillsCount } = await supabase
        .from('skills')
        .select('*', { count: 'exact', head: true });

      // 3. Timeline entries count
      const { count: timelineCount } = await supabase
        .from('timeline_entries')
        .select('*', { count: 'exact', head: true });

      // 4. Contact messages
      const { data: messagesData, count: unreadCount } = await supabase
        .from('contact_messages')
        .select('id, name, subject, is_read, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { count: totalUnread } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

      setStats({
        publishedProjects: published,
        draftProjects: drafts,
        totalSkills: skillsCount ?? 0,
        timelineEntries: timelineCount ?? 0,
        unreadMessages: totalUnread ?? 0,
        lastUpdated: latestProjectUpdate,
      });

      setRecentProjects(allProjects.slice(0, 4));
      setRecentMessages((messagesData as RecentMessage[]) || []);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: 'Published Works',
      value: stats.publishedProjects,
      description: 'Active on public portfolio',
      icon: FolderCheck,
      color: 'text-[var(--forest)]',
      bgColor: 'bg-[var(--forest)]/10',
      href: '/admin/projects',
    },
    {
      label: 'Draft Projects',
      value: stats.draftProjects,
      description: 'Pending curation & polish',
      icon: FileClock,
      color: 'text-[var(--brass)]',
      bgColor: 'bg-[var(--brass)]/10',
      href: '/admin/projects',
    },
    {
      label: 'Technical Skills',
      value: stats.totalSkills,
      description: 'Categorized proficiencies',
      icon: Code2,
      color: 'text-[var(--burgundy)]',
      bgColor: 'bg-[var(--burgundy)]/10',
      href: '/admin/skills',
    },
    {
      label: 'Timeline Milestones',
      value: stats.timelineEntries,
      description: 'Education & career trajectory',
      icon: Milestone,
      color: 'text-[var(--walnut)]',
      bgColor: 'bg-[var(--walnut)]/10',
      href: '/admin/journey',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      description: 'Awaiting curator review',
      icon: Mail,
      color: stats.unreadMessages > 0 ? 'text-red-700' : 'text-[var(--muted)]',
      bgColor: stats.unreadMessages > 0 ? 'bg-red-50' : 'bg-[var(--cream)]/30',
      href: '/admin/messages',
    },
    {
      label: 'Last Modified',
      value: stats.lastUpdated ? formatDate(stats.lastUpdated) : 'Recently',
      description: 'Latest project archive update',
      icon: CalendarClock,
      color: 'text-[var(--gold-dark)]',
      bgColor: 'bg-[var(--gold)]/10',
      isText: true,
      href: '/admin/projects',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Neoclassical Welcome Banner */}
      <div className="relative bg-[#FAF6EF] border border-[var(--gold)]/40 shadow-sm rounded-sm p-6 sm:p-8 overflow-hidden ornate-corners">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,_rgba(176,141,87,0.15)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[var(--burgundy)]/5 border border-[var(--gold)]/30 text-xs font-serif text-[var(--burgundy)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Curator Sanctum &bull; Master Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--walnut)] tracking-tight">
              Welcome back, Rishaan
            </h2>
            <p className="text-sm font-sans text-[var(--muted)] leading-relaxed">
              Maintain and refine your intellectual repository. Review real-time inquiries, update project architectural case studies, and chronicle milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-[var(--brass)]/40 text-xs font-sans font-medium text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
              title="Refresh dashboard data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/projects/new"
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Case Study</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="group block bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-5 hover:border-[var(--gold)] hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-serif uppercase tracking-wider text-[var(--muted)] font-semibold">
                    {stat.label}
                  </p>
                  <p className={`mt-2 font-serif font-bold text-[var(--walnut)] ${stat.isText ? 'text-lg sm:text-xl' : 'text-3xl'}`}>
                    {loading ? (
                      <span className="inline-block w-8 h-8 bg-[var(--parchment)] animate-pulse rounded-xs" />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-sm ${stat.bgColor} border border-[var(--gold)]/20 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-6">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--parchment-border)] pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-[var(--walnut)]">
              Curatorial Quick Actions
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Direct pathways to core management modules
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/admin/projects/new"
            className="flex flex-col items-center justify-center p-4 rounded-sm border border-[var(--gold)]/20 hover:border-[var(--burgundy)] hover:bg-[var(--parchment)]/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--burgundy)]/10 text-[var(--burgundy)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-serif font-semibold text-[var(--walnut)]">Add Project</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5">Publish new work</span>
          </Link>

          <Link
            href="/admin/profile"
            className="flex flex-col items-center justify-center p-4 rounded-sm border border-[var(--gold)]/20 hover:border-[var(--burgundy)] hover:bg-[var(--parchment)]/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--forest)]/10 text-[var(--forest)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-serif font-semibold text-[var(--walnut)]">Edit Profile</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5">Bio, photo & CV</span>
          </Link>

          <Link
            href="/admin/skills"
            className="flex flex-col items-center justify-center p-4 rounded-sm border border-[var(--gold)]/20 hover:border-[var(--burgundy)] hover:bg-[var(--parchment)]/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--brass)]/10 text-[var(--brass)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-serif font-semibold text-[var(--walnut)]">Update Skills</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5">Stack proficiencies</span>
          </Link>

          <Link
            href="/admin/messages"
            className="flex flex-col items-center justify-center p-4 rounded-sm border border-[var(--gold)]/20 hover:border-[var(--burgundy)] hover:bg-[var(--parchment)]/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 text-[var(--gold-dark)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform relative">
              <Mail className="w-5 h-5" />
              {stats.unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {stats.unreadMessages}
                </span>
              )}
            </div>
            <span className="text-xs font-serif font-semibold text-[var(--walnut)]">View Messages</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5">Inquiries inbox</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--parchment-border)] mb-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[var(--burgundy)]" />
              <h3 className="font-serif font-bold text-sm text-[var(--walnut)]">
                Recent Projects
              </h3>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-serif font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-12 bg-[var(--parchment)]/50 animate-pulse rounded-xs" />
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8 text-xs text-[var(--muted)]">
                <p>No project records found in repository.</p>
                <Link
                  href="/admin/projects/new"
                  className="mt-2 inline-block text-[var(--burgundy)] underline"
                >
                  Create initial case study
                </Link>
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 rounded-sm border border-[var(--gold)]/15 bg-white/50 hover:bg-white hover:border-[var(--gold)]/40 transition-colors"
                >
                  <div className="min-w-0 pr-3">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-xs font-serif font-bold text-[var(--walnut)] hover:text-[var(--burgundy)] truncate block"
                    >
                      {project.title}
                    </Link>
                    <p className="text-[11px] text-[var(--muted)] flex items-center gap-2 mt-0.5">
                      <span className="capitalize">{project.category}</span>
                      <span>&bull;</span>
                      <span>{getRelativeTime(project.updated_at)}</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      project.status === 'published'
                        ? 'bg-green-100/80 text-green-800 border border-green-200'
                        : 'bg-amber-100/80 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--parchment-border)] mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--burgundy)]" />
              <h3 className="font-serif font-bold text-sm text-[var(--walnut)]">
                Latest Inquiries
              </h3>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-serif font-medium"
            >
              <span>Inbox ({stats.unreadMessages})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-12 bg-[var(--parchment)]/50 animate-pulse rounded-xs" />
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="text-center py-8 text-xs text-[var(--muted)]">
                <p>No correspondence received yet.</p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href="/admin/messages"
                  className="flex items-center justify-between p-3 rounded-sm border border-[var(--gold)]/15 bg-white/50 hover:bg-white hover:border-[var(--gold)]/40 transition-colors group block"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                      )}
                      <p className="text-xs font-serif font-bold text-[var(--walnut)] group-hover:text-[var(--burgundy)] truncate">
                        {msg.subject || '(No Subject)'}
                      </p>
                    </div>
                    <p className="text-[11px] text-[var(--muted)] mt-0.5 truncate">
                      From: <span className="font-medium text-[var(--charcoal)]">{msg.name}</span> &bull; {getRelativeTime(msg.created_at)}
                    </p>
                  </div>
                  <span className="text-[10px] text-[var(--muted)] shrink-0 font-mono">
                    {msg.is_read ? 'Read' : 'New'}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
