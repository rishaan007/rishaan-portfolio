'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { projectSchema, type ProjectFormValues } from '@/lib/validations/project';
import type { Project, ProjectTechnology } from '@/lib/types/database';
import { generateSlug } from '@/lib/utils';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  AlertTriangle,
  Eye,
  RefreshCw,
} from 'lucide-react';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema) as any,
  });

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const supabase = createClient();

        // 1. Fetch Project Record
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (projectError) throw projectError;
        if (!project) throw new Error('Project not found');

        const p = project as Project;
        setProjectTitle(p.title);
        setFeaturedImageUrl(p.featured_image || '');

        // Populate Form
        reset({
          title: p.title || '',
          slug: p.slug || '',
          subtitle: p.subtitle || '',
          category: p.category || '',
          short_description: p.short_description || '',
          context: p.context || '',
          problem_statement: p.problem_statement || '',
          objectives: p.objectives || '',
          solution: p.solution || '',
          technical_architecture: p.technical_architecture || '',
          implementation_details: p.implementation_details || '',
          my_contribution: p.my_contribution || '',
          challenges: p.challenges || '',
          key_learnings: p.key_learnings || '',
          github_url: p.github_url || '',
          live_url: p.live_url || '',
          completion_date: p.completion_date || '',
          is_featured: !!p.is_featured,
          status: p.status || 'draft',
          display_order: p.display_order ?? 0,
        });

        // 2. Fetch Associated Technologies
        const { data: techData } = await supabase
          .from('project_technologies')
          .select('*')
          .eq('project_id', projectId)
          .order('display_order', { ascending: true });

        if (techData) {
          const techList = (techData as ProjectTechnology[]).map((t) => t.name);
          setTechnologies(techList);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch project';
        toast.error('Error loading project', { description: message });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, reset]);

  const handleAddTechnology = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', { description: 'Please choose an image file (PNG, JPG, WebP).' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image exceeds 5MB size limit.');
      return;
    }

    setUploadingImage(true);
    try {
      const supabase = createClient();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `projects/${Date.now()}-${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setFeaturedImageUrl(urlData.publicUrl);
      toast.success('Featured image updated successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Image upload failed';
      toast.error('Upload failed', { description: message });
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const supabase = createClient();

      // 1. Update Project Record
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          title: values.title.trim(),
          slug: values.slug.trim().toLowerCase(),
          subtitle: values.subtitle?.trim() || null,
          category: values.category.trim(),
          short_description: values.short_description.trim(),
          context: values.context?.trim() || null,
          problem_statement: values.problem_statement?.trim() || null,
          objectives: values.objectives?.trim() || null,
          solution: values.solution?.trim() || null,
          technical_architecture: values.technical_architecture?.trim() || null,
          implementation_details: values.implementation_details?.trim() || null,
          my_contribution: values.my_contribution?.trim() || null,
          challenges: values.challenges?.trim() || null,
          key_learnings: values.key_learnings?.trim() || null,
          featured_image: featuredImageUrl || null,
          github_url: values.github_url?.trim() || null,
          live_url: values.live_url?.trim() || null,
          completion_date: values.completion_date || null,
          is_featured: values.is_featured,
          status: values.status,
          display_order: Number(values.display_order) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

      if (projectError) throw projectError;

      // 2. Sync Technologies: Delete existing and reinsert updated list
      await supabase
        .from('project_technologies')
        .delete()
        .eq('project_id', projectId);

      if (technologies.length > 0) {
        const techRecords = technologies.map((name, index) => ({
          project_id: projectId,
          name,
          display_order: index,
        }));

        const { error: techError } = await supabase
          .from('project_technologies')
          .insert(techRecords);

        if (techError) {
          console.error('Error inserting tech stack:', techError);
        }
      }

      toast.success('Case study updated successfully!', {
        description: `Changes to "${values.title}" are now saved.`,
      });
      router.push('/admin/projects');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update project';
      toast.error('Update failed', { description: message });
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();

      await supabase.from('project_technologies').delete().eq('project_id', projectId);
      await supabase.from('project_images').delete().eq('project_id', projectId);

      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;

      toast.success('Project deleted', { description: 'Project was permanently removed.' });
      router.push('/admin/projects');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
      toast.error('Deletion error', { description: message });
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-8 h-8 border-3 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-sm text-[var(--muted)]">Loading case study specifications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Return Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--parchment-border)] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-sm border border-[var(--brass)]/30 hover:bg-[var(--parchment)] transition-colors text-[var(--walnut)]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--walnut)]">
              Edit: {projectTitle || 'Case Study'}
            </h2>
            <p className="text-xs text-[var(--muted)] font-serif italic">
              Modify architectural parameters, tech stack, and case study narrative
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-2 text-xs border border-red-300 text-red-700 hover:bg-red-50 rounded-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={submitting}
            className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Updates</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Nomenclature */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              I. Nomenclature & Taxonomy
            </h3>
            <p className="text-xs text-[var(--muted)]">Primary identifiers and categorization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Project Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="Athena Distributed Database Engine"
                className="input-neoclassical text-sm"
              />
              {errors.title && (
                <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.title?.message || "")}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                URL Slug <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                {...register('slug')}
                placeholder="athena-distributed-database-engine"
                className="input-neoclassical text-sm font-mono"
              />
              {errors.slug && (
                <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.slug?.message || "")}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Subtitle / Motto
              </label>
              <input
                type="text"
                {...register('subtitle')}
                placeholder="High-concurrency Raft consensus and LSM-tree storage"
                className="input-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Domain / Category <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                {...register('category')}
                placeholder="Systems & Distributed Architecture"
                className="input-neoclassical text-sm"
              />
              {errors.category && (
                <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.category?.message || "")}</p>
              )}
            </div>
          </div>

          <div>
            <label className="label-neoclassical text-xs font-semibold">
              Executive Abstract / Short Description <span className="text-red-700">*</span>
            </label>
            <textarea
              rows={3}
              {...register('short_description')}
              placeholder="Concise 2-3 sentence overview visible in project registries and cards."
              className="textarea-neoclassical text-sm"
            />
            {errors.short_description && (
              <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.short_description?.message || "")}</p>
            )}
          </div>
        </div>

        {/* Section 2: Case Study Corpus */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              II. Architectural Corpus & Case Study
            </h3>
            <p className="text-xs text-[var(--muted)]">Problem statement, technical architecture, and contributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Context & Origins
              </label>
              <textarea
                rows={3}
                {...register('context')}
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Problem Statement
              </label>
              <textarea
                rows={3}
                {...register('problem_statement')}
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Objectives & Requirements
              </label>
              <textarea
                rows={3}
                {...register('objectives')}
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                System Solution Overview
              </label>
              <textarea
                rows={3}
                {...register('solution')}
                className="textarea-neoclassical text-sm"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Technical Architecture Breakdown
              </label>
              <textarea
                rows={4}
                {...register('technical_architecture')}
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Implementation Details & Subsystems
              </label>
              <textarea
                rows={4}
                {...register('implementation_details')}
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Personal Contribution
                </label>
                <textarea
                  rows={3}
                  {...register('my_contribution')}
                  className="textarea-neoclassical text-sm"
                />
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Obstacles & Engineering Challenges
                </label>
                <textarea
                  rows={3}
                  {...register('challenges')}
                  className="textarea-neoclassical text-sm"
                />
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Key Learnings & Epiphanies
                </label>
                <textarea
                  rows={3}
                  {...register('key_learnings')}
                  className="textarea-neoclassical text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              III. Technology Stack & Tooling
            </h3>
            <p className="text-xs text-[var(--muted)]">Add or modify languages, frameworks, protocols, and databases</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTechnology();
                }
              }}
              placeholder="e.g. Go, Redis, Docker, gRPC..."
              className="input-neoclassical text-sm max-w-md"
            />
            <button
              type="button"
              onClick={handleAddTechnology}
              className="btn-classical-secondary px-4 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tool</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {technologies.length === 0 ? (
              <p className="text-xs text-[var(--muted)] italic">
                No technologies listed.
              </p>
            ) : (
              technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[var(--gold)]/40 text-xs font-mono text-[var(--walnut)] rounded-xs shadow-2xs"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-[var(--muted)] hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Section 4: Imagery */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              IV. Featured Imagery & Visual Exhibits
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="label-neoclassical text-xs font-semibold mb-2">
                Replace Featured Image
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--gold)]/40 hover:border-[var(--burgundy)] p-6 rounded-sm bg-white/40 cursor-pointer transition-colors group">
                <Upload className="w-8 h-8 text-[var(--gold)] group-hover:text-[var(--burgundy)] transition-colors mb-2" />
                <span className="text-xs font-sans font-medium text-[var(--walnut)]">
                  {uploadingImage ? 'Uploading...' : 'Choose new image file'}
                </span>
                <span className="text-[10px] text-[var(--muted)] mt-1">
                  PNG, JPG, WebP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              <div className="mt-3">
                <label className="text-[11px] font-sans text-[var(--muted)] block mb-1">
                  Or specify external image URL:
                </label>
                <input
                  type="url"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="input-neoclassical text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold mb-2">
                Active Featured Preview
              </label>
              {featuredImageUrl ? (
                <div className="relative border border-[var(--gold)]/40 rounded-sm overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
                  <img
                    src={featuredImageUrl}
                    alt="Featured preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImageUrl('')}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white hover:bg-black/90 rounded-xs transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="border border-[var(--gold)]/20 rounded-sm aspect-video bg-[var(--parchment)]/30 flex flex-col items-center justify-center text-[var(--muted)]">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
                  <span className="text-xs italic font-serif">No image attached</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Repositories & Publishing */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              V. External Repositories & Publishing Metadata
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                GitHub Repository URL
              </label>
              <input
                type="url"
                {...register('github_url')}
                className="input-neoclassical text-xs"
              />
              {errors.github_url && (
                <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.github_url?.message || "")}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Live Demonstration URL
              </label>
              <input
                type="url"
                {...register('live_url')}
                className="input-neoclassical text-xs"
              />
              {errors.live_url && (
                <p className="text-xs text-red-700 mt-1 font-sans">{String(errors.live_url?.message || "")}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Completion Date
              </label>
              <input
                type="date"
                {...register('completion_date')}
                className="input-neoclassical text-xs"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Display Order Priority
              </label>
              <input
                type="number"
                {...register('display_order', { valueAsNumber: true })}
                className="input-neoclassical text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--parchment-border)]/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('is_featured')}
                  className="checkbox-neoclassical"
                />
                <span className="text-xs font-serif font-bold text-[var(--walnut)]">
                  Feature on Portfolio Frontispiece
                </span>
              </label>

              <div className="flex items-center gap-2">
                <label className="label-neoclassical text-xs font-semibold mb-0">
                  Publication Status:
                </label>
                <select
                  {...register('status')}
                  className="select-neoclassical text-xs py-1 px-3 w-auto font-mono"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Public)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-classical-primary text-xs py-2 px-6 shadow-sm"
              >
                {submitting ? 'Saving Changes...' : 'Save Updates'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-red-300 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                  Delete Project Case Study
                </h3>
                <p className="text-xs text-[var(--muted)] font-sans">
                  This action is permanent and cannot be reversed.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/70 border border-red-100 rounded-xs text-xs font-sans text-[var(--espresso)]">
              Are you sure you want to delete <span className="font-semibold text-red-900">&ldquo;{projectTitle}&rdquo;</span>? All associated technology tags and media references will be permanently removed.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-[var(--brass)]/40 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-sm text-xs font-medium shadow-xs disabled:opacity-50 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
