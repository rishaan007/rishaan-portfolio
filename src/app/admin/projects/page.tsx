'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/lib/types/database';
import { formatDateShort } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  AlertTriangle,
  RefreshCw,
  FolderOpen,
  Filter,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects((data as Project[]) || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects';
      toast.error('Error loading projects', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleStatus = async (project: Project) => {
    const nextStatus = project.status === 'published' ? 'draft' : 'published';
    const oldStatus = project.status;

    // Optimistic UI update
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: nextStatus } : p))
    );

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('projects')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', project.id);

      if (error) throw error;
      toast.success(`Project set to ${nextStatus}`, {
        description: `"${project.title}" is now ${nextStatus}.`,
      });
    } catch (err: unknown) {
      // Revert optimistic update
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: oldStatus } : p))
      );
      const message = err instanceof Error ? err.message : 'Update failed';
      toast.error('Could not update status', { description: message });
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    const nextFeatured = !project.is_featured;

    // Optimistic UI update
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, is_featured: nextFeatured } : p))
    );

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: nextFeatured, updated_at: new Date().toISOString() })
        .eq('id', project.id);

      if (error) throw error;
      toast.success(nextFeatured ? 'Marked as featured' : 'Removed from featured', {
        description: `"${project.title}" featured status updated.`,
      });
    } catch (err: unknown) {
      // Revert
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, is_featured: !nextFeatured } : p))
      );
      const message = err instanceof Error ? err.message : 'Update failed';
      toast.error('Could not update featured status', { description: message });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setDeleting(true);

    try {
      const supabase = createClient();

      // Delete associated technologies first if cascading not set
      await supabase.from('project_technologies').delete().eq('project_id', projectToDelete.id);
      await supabase.from('project_images').delete().eq('project_id', projectToDelete.id);

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      toast.success('Project deleted', {
        description: `"${projectToDelete.title}" has been permanently removed.`,
      });
      setProjectToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete project', { description: message });
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Project Portfolio Registry</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Manage comprehensive technical case studies, research artifacts, and live deployments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/projects/new"
            className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Case Study</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/20 p-4 rounded-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, category, slug..."
            className="input-neoclassical pl-9 py-2 text-xs"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 self-start md:self-auto">
          <span className="text-xs text-[var(--muted)] font-serif font-medium mr-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {(['all', 'published', 'draft'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 text-xs rounded-sm capitalize transition-colors font-sans font-medium ${
                statusFilter === filter
                  ? 'bg-[var(--burgundy)] text-[var(--ivory)] shadow-xs'
                  : 'text-[var(--walnut)] bg-[var(--parchment)]/50 hover:bg-[var(--parchment)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--parchment-border)] bg-[var(--parchment)]/40 text-[11px] font-serif uppercase tracking-wider text-[var(--walnut)] font-semibold">
                <th className="py-3 px-4 w-12 text-center">Featured</th>
                <th className="py-3 px-4">Title & Context</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 w-20 text-center">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--parchment-border)]/60 text-xs font-sans">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--muted)]">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin" />
                      <span>Retrieving project portfolio records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--muted)]">
                    <p className="font-serif text-sm">No projects matched your criteria.</p>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                        }}
                        className="mt-2 text-[var(--burgundy)] underline text-xs"
                      >
                        Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/70 transition-colors group"
                  >
                    {/* Featured Star Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className="p-1 rounded-sm text-[var(--muted)] hover:text-amber-500 transition-colors"
                        title={project.is_featured ? 'Remove featured star' : 'Mark as featured work'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            project.is_featured
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300 hover:text-gray-400'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Project Title & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="min-w-0 max-w-sm sm:max-w-md">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="font-serif font-bold text-sm text-[var(--walnut)] hover:text-[var(--burgundy)] transition-colors line-clamp-1"
                        >
                          {project.title}
                        </Link>
                        {project.subtitle && (
                          <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                            {project.subtitle}
                          </p>
                        )}
                        <p className="text-[10px] text-[var(--muted)]/80 font-mono mt-0.5">
                          slug: /{project.slug}
                        </p>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-xs bg-[var(--parchment)] text-[var(--charcoal)] font-mono text-[11px] uppercase tracking-wide border border-[var(--gold)]/20">
                        {project.category}
                      </span>
                    </td>

                    {/* Status Toggle Button */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(project)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                          project.status === 'published'
                            ? 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {project.status}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-[var(--muted)]">
                      {project.completion_date ? formatDateShort(project.completion_date) : 'N/A'}
                    </td>

                    {/* Display Order */}
                    <td className="py-3.5 px-4 text-center font-mono text-xs text-[var(--muted)]">
                      {project.display_order}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {project.status === 'published' && (
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm transition-colors"
                            title="Preview on Public Site"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm transition-colors"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => setProjectToDelete(project)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm transition-colors"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-[var(--parchment-border)] flex items-center justify-between text-xs text-[var(--muted)] font-serif">
          <span>Total projects in repository: {projects.length}</span>
          <span>Showing {filteredProjects.length} filtered</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-red-300 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                  Confirm Project Deletion
                </h3>
                <p className="text-xs text-[var(--muted)] font-sans">
                  This action is permanent and cannot be reversed.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/70 border border-red-100 rounded-xs text-xs font-sans text-[var(--espresso)]">
              Are you sure you want to delete <span className="font-semibold text-red-900">&ldquo;{projectToDelete.title}&rdquo;</span>? All associated media links, architecture specs, and relational technologies will be deleted.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 border border-[var(--brass)]/40 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-sm text-xs font-medium shadow-xs disabled:opacity-50 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
