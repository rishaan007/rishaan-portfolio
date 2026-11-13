'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { projectSchema, type ProjectInput, type ProjectOutput, type ProjectFormValues } from '@/lib/validations/project';
import { generateSlug } from '@/lib/utils';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [manualSlugEdit, setManualSlugEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectInput, any, ProjectOutput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      subtitle: '',
      category: 'Full Stack',
      short_description: '',
      context: '',
      problem_statement: '',
      objectives: '',
      solution: '',
      technical_architecture: '',
      implementation_details: '',
      my_contribution: '',
      challenges: '',
      key_learnings: '',
      github_url: '',
      live_url: '',
      completion_date: '',
      is_featured: false,
      status: 'draft',
      display_order: 0,
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue('title', newTitle, { shouldValidate: true });
    if (!manualSlugEdit) {
      setValue('slug', generateSlug(newTitle), { shouldValidate: true });
    }
  };

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
      toast.success('Featured image uploaded successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Image upload failed';
      toast.error('Upload failed', { description: message });
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    try {
      const supabase = createClient();

      // 1. Insert Project Record
      const { data: insertedProject, error: projectError } = await supabase
        .from('projects')
        .insert({
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
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // 2. Insert Tech Stack relational items
      if (technologies.length > 0 && insertedProject?.id) {
        const techRecords = technologies.map((name, index) => ({
          project_id: insertedProject.id,
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

      toast.success('Project created successfully!', {
        description: `"${values.title}" has been saved to the portfolio registry.`,
      });

      router.push('/admin/projects');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      toast.error('Creation failed', { description: message });
      setSubmitting(false);
    }
  };

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
              Craft New Case Study
            </h2>
            <p className="text-xs text-[var(--muted)] font-serif italic">
              Publish a rigorous technical case study with architectural breakdown
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={submitting}
          className="btn-classical-primary self-start sm:self-auto text-xs py-2 px-5 shadow-sm"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Cataloging Work...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Publish Case Study</span>
            </span>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Nomenclature & Classification */}
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
                onChange={handleTitleChange}
                placeholder="e.g. Athena Distributed Database Engine"
                className="input-neoclassical text-sm"
              />
              {errors.title && (
                <p className="text-xs text-red-700 mt-1 font-sans">{errors.title.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="label-neoclassical text-xs font-semibold">
                  URL Slug <span className="text-red-700">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setManualSlugEdit(!manualSlugEdit)}
                  className="text-[10px] text-[var(--muted)] hover:text-[var(--burgundy)] underline"
                >
                  {manualSlugEdit ? 'Auto-sync with title' : 'Customize manually'}
                </button>
              </div>
              <input
                type="text"
                {...register('slug')}
                onChange={(e) => {
                  setManualSlugEdit(true);
                  setValue('slug', e.target.value, { shouldValidate: true });
                }}
                placeholder="athena-distributed-database-engine"
                className="input-neoclassical text-sm font-mono"
              />
              {errors.slug && (
                <p className="text-xs text-red-700 mt-1 font-sans">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Subtitle / Motto
              </label>
              <input
                type="text"
                {...register('subtitle')}
                placeholder="e.g. High-concurrency Raft consensus and LSM-tree storage"
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
                placeholder="e.g. Systems & Distributed Architecture"
                className="input-neoclassical text-sm"
              />
              {errors.category && (
                <p className="text-xs text-red-700 mt-1 font-sans">{errors.category.message}</p>
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
              <p className="text-xs text-red-700 mt-1 font-sans">{errors.short_description.message}</p>
            )}
          </div>
        </div>

        {/* Section 2: Case Study Corpus */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              II. Architectural Corpus & Case Study
            </h3>
            <p className="text-xs text-[var(--muted)]">Rigorous documentation of problem, design, and findings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Context & Origins
              </label>
              <textarea
                rows={3}
                {...register('context')}
                placeholder="Background, motivation, or academic impetus."
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
                placeholder="Core bottlenecks, algorithmic inefficiencies, or gaps being addressed."
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Objectives & Functional Requirements
              </label>
              <textarea
                rows={3}
                {...register('objectives')}
                placeholder="Target metrics: latency percentiles, throughput targets, fault tolerance guarantees."
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
                placeholder="High-level engineering approach and rationale."
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
                placeholder="Detailed subsystem breakdown, data flow, concurrency model, and protocol schemas."
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
                placeholder="Specific libraries, algorithmic decisions, memory optimization, or zero-copy pipelines."
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
                  placeholder="Primary modules or algorithms you authored."
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
                  placeholder="Crucial bugs, scale limits encountered, or edge cases resolved."
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
                  placeholder="Takeaways on design patterns, paradigms, or theoretical principles."
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
            <p className="text-xs text-[var(--muted)]">Add languages, frameworks, protocols, and databases</p>
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
              placeholder="e.g. Rust, PyTorch, gRPC, PostgreSQL..."
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
                No technologies added yet. Type a name above and press Enter.
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

        {/* Section 4: Imagery & Artifacts */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              IV. Featured Imagery & Visual Exhibits
            </h3>
            <p className="text-xs text-[var(--muted)]">Hero illustration or architectural banner for this project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="label-neoclassical text-xs font-semibold mb-2">
                Upload New Image
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--gold)]/40 hover:border-[var(--burgundy)] p-6 rounded-sm bg-white/40 cursor-pointer transition-colors group">
                <Upload className="w-8 h-8 text-[var(--gold)] group-hover:text-[var(--burgundy)] transition-colors mb-2" />
                <span className="text-xs font-sans font-medium text-[var(--walnut)]">
                  {uploadingImage ? 'Uploading to Storage...' : 'Click or drop project hero image'}
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
                  Or specify external / existing image URL:
                </label>
                <input
                  type="url"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input-neoclassical text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold mb-2">
                Image Preview
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
                  <span className="text-xs italic font-serif">No image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: External Links & Publication Parameters */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              V. External Repositories & Publishing Metadata
            </h3>
            <p className="text-xs text-[var(--muted)]">Deployment URLs, completion dates, and curation parameters</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                GitHub Repository URL
              </label>
              <input
                type="url"
                {...register('github_url')}
                placeholder="https://github.com/rishaan007/..."
                className="input-neoclassical text-xs"
              />
              {errors.github_url && (
                <p className="text-xs text-red-700 mt-1 font-sans">{errors.github_url.message}</p>
              )}
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Live Demonstration URL
              </label>
              <input
                type="url"
                {...register('live_url')}
                placeholder="https://project-demo.com"
                className="input-neoclassical text-xs"
              />
              {errors.live_url && (
                <p className="text-xs text-red-700 mt-1 font-sans">{errors.live_url.message}</p>
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
                  Feature on Portfolio Frontispiece (Hero showcase)
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

            <button
              type="submit"
              disabled={submitting}
              className="btn-classical-primary text-xs py-2 px-6 shadow-sm"
            >
              {submitting ? 'Saving...' : 'Catalog & Save Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
