'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ResearchInterest, Publication } from '@/lib/types/database';
import { toast } from 'sonner';
import {
  BookOpen,
  FileText,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  RefreshCw,
  X,
  Upload,
  Calendar,
  Users,
  Compass,
  Sparkles,
} from 'lucide-react';

type ResearchTab = 'interests' | 'publications';

export default function AdminResearchPage() {
  const [activeTab, setActiveTab] = useState<ResearchTab>('interests');
  const [interests, setInterests] = useState<ResearchInterest[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  // Interest Modal State
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [editingInterest, setEditingInterest] = useState<ResearchInterest | null>(null);
  const [intTitle, setIntTitle] = useState('');
  const [intDescription, setIntDescription] = useState('');
  const [intIcon, setIntIcon] = useState('');
  const [intOrder, setIntOrder] = useState(0);

  // Publication Modal State
  const [showPubModal, setShowPubModal] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubAbstract, setPubAbstract] = useState('');
  const [pubArea, setPubArea] = useState('');
  const [pubStatus, setPubStatus] = useState<Publication['status']>('in_progress');
  const [pubDate, setPubDate] = useState('');
  const [pubPaperUrl, setPubPaperUrl] = useState('');
  const [pubPdfUrl, setPubPdfUrl] = useState('');
  const [pubCollaborators, setPubCollaborators] = useState('');
  const [pubOrder, setPubOrder] = useState(0);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const { data: intData, error: intError } = await supabase
        .from('research_interests')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (intError) throw intError;

      const { data: pubData, error: pubError } = await supabase
        .from('publications')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (pubError) throw pubError;

      setInterests((intData as ResearchInterest[]) || []);
      setPublications((pubData as Publication[]) || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error loading research data';
      toast.error('Failed to load research data', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- RESEARCH INTERESTS HANDLERS ---------------- */
  const openNewInterestModal = () => {
    setEditingInterest(null);
    setIntTitle('');
    setIntDescription('');
    setIntIcon('');
    setIntOrder(interests.length);
    setShowInterestModal(true);
  };

  const openEditInterestModal = (item: ResearchInterest) => {
    setEditingInterest(item);
    setIntTitle(item.title);
    setIntDescription(item.description || '');
    setIntIcon(item.icon || '');
    setIntOrder(item.display_order);
    setShowInterestModal(true);
  };

  const handleSaveInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intTitle.trim()) {
      toast.error('Interest title is required');
      return;
    }

    try {
      const supabase = createClient();
      const payload = {
        title: intTitle.trim(),
        description: intDescription.trim() || null,
        icon: intIcon.trim() || null,
        display_order: Number(intOrder) || 0,
      };

      if (editingInterest) {
        const { error } = await supabase
          .from('research_interests')
          .update(payload)
          .eq('id', editingInterest.id);

        if (error) throw error;
        toast.success('Research interest updated');
      } else {
        const { error } = await supabase.from('research_interests').insert(payload);
        if (error) throw error;
        toast.success('Research interest cataloged');
      }

      setShowInterestModal(false);
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Failed to save interest', { description: message });
    }
  };

  const handleDeleteInterest = async (id: string) => {
    if (!confirm('Are you certain you wish to remove this research interest?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('research_interests').delete().eq('id', id);
      if (error) throw error;

      setInterests((prev) => prev.filter((i) => i.id !== id));
      toast.success('Research interest removed');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete research interest', { description: message });
    }
  };

  /* ---------------- PUBLICATIONS HANDLERS ---------------- */
  const openNewPubModal = () => {
    setEditingPub(null);
    setPubTitle('');
    setPubAbstract('');
    setPubArea('');
    setPubStatus('in_progress');
    setPubDate('');
    setPubPaperUrl('');
    setPubPdfUrl('');
    setPubCollaborators('');
    setPubOrder(publications.length);
    setShowPubModal(true);
  };

  const openEditPubModal = (pub: Publication) => {
    setEditingPub(pub);
    setPubTitle(pub.title);
    setPubAbstract(pub.abstract || '');
    setPubArea(pub.research_area || '');
    setPubStatus(pub.status);
    setPubDate(pub.publication_date || '');
    setPubPaperUrl(pub.paper_url || '');
    setPubPdfUrl(pub.pdf_url || '');
    setPubCollaborators(pub.collaborators || '');
    setPubOrder(pub.display_order);
    setShowPubModal(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('File must be a PDF document.');
      return;
    }

    setUploadingPdf(true);
    try {
      const supabase = createClient();
      const filePath = `publications/paper-${Date.now()}.pdf`;

      const { error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setPubPdfUrl(data.publicUrl);
      toast.success('Paper PDF uploaded successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast.error('Upload failed', { description: message });
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSavePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubTitle.trim()) {
      toast.error('Publication title is required');
      return;
    }

    try {
      const supabase = createClient();
      const payload = {
        title: pubTitle.trim(),
        abstract: pubAbstract.trim() || null,
        research_area: pubArea.trim() || null,
        status: pubStatus,
        publication_date: pubDate.trim() || null,
        paper_url: pubPaperUrl.trim() || null,
        pdf_url: pubPdfUrl.trim() || null,
        collaborators: pubCollaborators.trim() || null,
        display_order: Number(pubOrder) || 0,
      };

      if (editingPub) {
        const { error } = await supabase
          .from('publications')
          .update(payload)
          .eq('id', editingPub.id);

        if (error) throw error;
        toast.success('Publication updated');
      } else {
        const { error } = await supabase.from('publications').insert(payload);
        if (error) throw error;
        toast.success('Publication archived');
      }

      setShowPubModal(false);
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Failed to save publication', { description: message });
    }
  };

  const handleDeletePublication = async (id: string) => {
    if (!confirm('Are you certain you wish to delete this publication record?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('publications').delete().eq('id', id);
      if (error) throw error;

      setPublications((prev) => prev.filter((p) => p.id !== id));
      toast.success('Publication removed');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete publication', { description: message });
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Scholarly Research & Preprints</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Curate research concentrations, ongoing investigations, preprints, and peer-reviewed works
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Refresh records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {activeTab === 'interests' ? (
            <button
              onClick={openNewInterestModal}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Research Focus</span>
            </button>
          ) : (
            <button
              onClick={openNewPubModal}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Publication</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[var(--parchment-border)] gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('interests')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-bold tracking-wide transition-all border-b-2 ${
            activeTab === 'interests'
              ? 'border-[var(--burgundy)] text-[var(--burgundy)] bg-[#FAF6EF]'
              : 'border-transparent text-[var(--muted)] hover:text-[var(--walnut)] hover:bg-[var(--parchment)]/40'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Research Interests ({interests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('publications')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-bold tracking-wide transition-all border-b-2 ${
            activeTab === 'publications'
              ? 'border-[var(--burgundy)] text-[var(--burgundy)] bg-[#FAF6EF]'
              : 'border-transparent text-[var(--muted)] hover:text-[var(--walnut)] hover:bg-[var(--parchment)]/40'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Publications & Manuscripts ({publications.length})</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-[var(--muted)]">
            <div className="w-6 h-6 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="font-serif text-xs">Accessing scholarship registry...</p>
          </div>
        ) : activeTab === 'interests' ? (
          /* RESEARCH INTERESTS GRID */
          interests.length === 0 ? (
            <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-12 text-center text-[var(--muted)]">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
              <p className="font-serif text-sm text-[var(--walnut)]">No research interests listed.</p>
              <button
                onClick={openNewInterestModal}
                className="mt-3 text-xs text-[var(--burgundy)] underline"
              >
                Define your primary research domain
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-5 shadow-xs flex flex-col justify-between hover:border-[var(--gold)] transition-colors group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                        <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--muted)]">
                        #{item.display_order}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-[var(--charcoal)] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-4 mt-3 border-t border-[var(--parchment-border)]/50">
                    <button
                      onClick={() => openEditInterestModal(item)}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm"
                      title="Edit Interest"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteInterest(item.id)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                      title="Delete Interest"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* PUBLICATIONS LIST */
          publications.length === 0 ? (
            <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-12 text-center text-[var(--muted)]">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
              <p className="font-serif text-sm text-[var(--walnut)]">No publications archived.</p>
              <button
                onClick={openNewPubModal}
                className="mt-3 text-xs text-[var(--burgundy)] underline"
              >
                Archive your first manuscript or preprint
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {publications.map((pub) => {
                const statusStyles = {
                  published: 'bg-green-100 text-green-800 border-green-300',
                  submitted: 'bg-amber-100 text-amber-800 border-amber-300',
                  in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
                }[pub.status];

                return (
                  <div
                    key={pub.id}
                    className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-5 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--gold)] transition-colors"
                  >
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                          {pub.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${statusStyles}`}
                        >
                          {pub.status.replace('_', ' ')}
                        </span>
                      </div>

                      {pub.research_area && (
                        <p className="text-xs font-serif font-semibold text-[var(--burgundy)]">
                          Research Focus: {pub.research_area}
                        </p>
                      )}

                      {pub.collaborators && (
                        <p className="text-xs text-[var(--muted)] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>Collaborators: {pub.collaborators}</span>
                        </p>
                      )}

                      {pub.abstract && (
                        <p className="text-xs text-[var(--charcoal)] leading-relaxed italic border-l-2 border-[var(--gold)]/40 pl-3 py-1">
                          &ldquo;{pub.abstract}&rdquo;
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)] pt-1">
                        {pub.publication_date && (
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{pub.publication_date}</span>
                          </span>
                        )}
                        {pub.paper_url && (
                          <a
                            href={pub.paper_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-sans"
                          >
                            <span>Publisher Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {pub.pdf_url && (
                          <a
                            href={pub.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-sans"
                          >
                            <span>Preprint PDF</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => openEditPubModal(pub)}
                        className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm"
                        title="Edit Publication"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePublication(pub.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                        title="Delete Publication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* Research Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                {editingInterest ? 'Edit Research Area' : 'Catalog Research Area'}
              </h3>
              <button
                type="button"
                onClick={() => setShowInterestModal(false)}
                className="text-[var(--muted)] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveInterest} className="space-y-4">
              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Field / Research Theme <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={intTitle}
                  onChange={(e) => setIntTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus & Byzantine Fault Tolerance"
                  className="input-neoclassical text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Icon / Token Key
                  </label>
                  <input
                    type="text"
                    value={intIcon}
                    onChange={(e) => setIntIcon(e.target.value)}
                    placeholder="cpu, network, shield..."
                    className="input-neoclassical text-xs"
                  />
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={intOrder}
                    onChange={(e) => setIntOrder(Number(e.target.value))}
                    className="input-neoclassical text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Theoretical Description & Scope
                </label>
                <textarea
                  rows={4}
                  value={intDescription}
                  onChange={(e) => setIntDescription(e.target.value)}
                  placeholder="Describe algorithmic interests, specific theorems or protocol paradigms explored..."
                  className="textarea-neoclassical text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--parchment-border)]">
                <button
                  type="button"
                  onClick={() => setShowInterestModal(false)}
                  className="px-4 py-2 border border-[var(--brass)]/30 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
                >
                  Save Research Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publication Modal */}
      {showPubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 rounded-sm max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                {editingPub ? 'Edit Publication Record' : 'Catalog Publication / Manuscript'}
              </h3>
              <button
                type="button"
                onClick={() => setShowPubModal(false)}
                className="text-[var(--muted)] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePublication} className="space-y-4">
              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Manuscript / Paper Title <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  placeholder="e.g. Asynchronous Byzantine Agreement in Partial Synchrony"
                  className="input-neoclassical text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Status <span className="text-red-700">*</span>
                  </label>
                  <select
                    value={pubStatus}
                    onChange={(e) => setPubStatus(e.target.value as Publication['status'])}
                    className="select-neoclassical text-xs py-1.5"
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="submitted">Submitted / Under Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Research Area
                  </label>
                  <input
                    type="text"
                    value={pubArea}
                    onChange={(e) => setPubArea(e.target.value)}
                    placeholder="e.g. Distributed Systems"
                    className="input-neoclassical text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Date of Publication / Submission
                  </label>
                  <input
                    type="text"
                    value={pubDate}
                    onChange={(e) => setPubDate(e.target.value)}
                    placeholder="e.g. October 2025"
                    className="input-neoclassical text-xs"
                  />
                </div>

                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={pubOrder}
                    onChange={(e) => setPubOrder(Number(e.target.value))}
                    className="input-neoclassical text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Collaborators & Co-authors
                </label>
                <input
                  type="text"
                  value={pubCollaborators}
                  onChange={(e) => setPubCollaborators(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe, Alex Smith"
                  className="input-neoclassical text-xs"
                />
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Scholarly Abstract
                </label>
                <textarea
                  rows={4}
                  value={pubAbstract}
                  onChange={(e) => setPubAbstract(e.target.value)}
                  placeholder="Synoptic overview of findings, algorithmic theorems, and experimental validations..."
                  className="textarea-neoclassical text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    DOI / Publisher URL
                  </label>
                  <input
                    type="url"
                    value={pubPaperUrl}
                    onChange={(e) => setPubPaperUrl(e.target.value)}
                    placeholder="https://doi.org/..."
                    className="input-neoclassical text-xs"
                  />
                </div>

                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Preprint PDF Attachment
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={pubPdfUrl}
                      onChange={(e) => setPubPdfUrl(e.target.value)}
                      placeholder="https://.../paper.pdf"
                      className="input-neoclassical text-xs font-mono flex-1"
                    />
                    <label className="px-3 py-1.5 border border-[var(--brass)]/40 hover:bg-[var(--parchment)] text-xs font-medium text-[var(--walnut)] rounded-sm cursor-pointer shrink-0 flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingPdf ? '...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                        disabled={uploadingPdf}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--parchment-border)]">
                <button
                  type="button"
                  onClick={() => setShowPubModal(false)}
                  className="px-4 py-2 border border-[var(--brass)]/30 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
