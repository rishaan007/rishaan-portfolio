'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Education, TimelineEntry } from '@/lib/types/database';
import { toast } from 'sonner';
import {
  GraduationCap,
  Award,
  Trophy,
  Users,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Calendar,
  Building,
  RefreshCw,
  Route,
  Sparkles,
} from 'lucide-react';

type JourneyTab = 'education' | 'leadership' | 'hackathons' | 'achievements';

export default function AdminJourneyPage() {
  const [activeTab, setActiveTab] = useState<JourneyTab>('education');
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [timelineList, setTimelineList] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<TimelineEntry | null>(null);

  // Education Form Fields
  const [eduDegree, setEduDegree] = useState('');
  const [eduInstitution, setEduInstitution] = useState('');
  const [eduUniversity, setEduUniversity] = useState('');
  const [eduGraduation, setEduGraduation] = useState('');
  const [eduCgpa, setEduCgpa] = useState('');
  const [eduDescription, setEduDescription] = useState('');
  const [eduIsCurrent, setEduIsCurrent] = useState(false);
  const [eduOrder, setEduOrder] = useState(0);

  // Timeline Form Fields
  const [tlTitle, setTlTitle] = useState('');
  const [tlSubtitle, setTlSubtitle] = useState('');
  const [tlDescription, setTlDescription] = useState('');
  const [tlCategory, setTlCategory] = useState<TimelineEntry['category']>('leadership');
  const [tlDate, setTlDate] = useState('');
  const [tlIcon, setTlIcon] = useState('');
  const [tlOrder, setTlOrder] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const { data: eduData, error: eduError } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (eduError) throw eduError;

      const { data: tlData, error: tlError } = await supabase
        .from('timeline_entries')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (tlError) throw tlError;

      setEducationList((eduData as Education[]) || []);
      setTimelineList((tlData as TimelineEntry[]) || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching journey data';
      toast.error('Failed to load journey entries', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- EDUCATION HANDLERS ---------------- */
  const openNewEduModal = () => {
    setEditingEdu(null);
    setEduDegree('');
    setEduInstitution('');
    setEduUniversity('');
    setEduGraduation('');
    setEduCgpa('');
    setEduDescription('');
    setEduIsCurrent(false);
    setEduOrder(educationList.length);
    setShowEduModal(true);
  };

  const openEditEduModal = (edu: Education) => {
    setEditingEdu(edu);
    setEduDegree(edu.degree);
    setEduInstitution(edu.institution);
    setEduUniversity(edu.university || '');
    setEduGraduation(edu.expected_graduation || '');
    setEduCgpa(edu.cgpa || '');
    setEduDescription(edu.description || '');
    setEduIsCurrent(!!edu.is_current);
    setEduOrder(edu.display_order);
    setShowEduModal(true);
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree.trim() || !eduInstitution.trim()) {
      toast.error('Degree and institution are required');
      return;
    }

    try {
      const supabase = createClient();
      const payload = {
        degree: eduDegree.trim(),
        institution: eduInstitution.trim(),
        university: eduUniversity.trim() || null,
        expected_graduation: eduGraduation.trim() || null,
        cgpa: eduCgpa.trim() || null,
        description: eduDescription.trim() || null,
        is_current: eduIsCurrent,
        display_order: Number(eduOrder) || 0,
      };

      if (editingEdu) {
        const { error } = await supabase
          .from('education')
          .update(payload)
          .eq('id', editingEdu.id);

        if (error) throw error;
        toast.success('Education entry updated');
      } else {
        const { error } = await supabase.from('education').insert(payload);
        if (error) throw error;
        toast.success('Education entry cataloged');
      }

      setShowEduModal(false);
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Error saving education', { description: message });
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!confirm('Are you certain you wish to delete this education credential?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('education').delete().eq('id', id);
      if (error) throw error;

      setEducationList((prev) => prev.filter((e) => e.id !== id));
      toast.success('Education entry deleted');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete education entry', { description: message });
    }
  };

  /* ---------------- TIMELINE HANDLERS ---------------- */
  const openNewTimelineModal = (defaultCategory: TimelineEntry['category']) => {
    setEditingTimeline(null);
    setTlTitle('');
    setTlSubtitle('');
    setTlDescription('');
    setTlCategory(defaultCategory);
    setTlDate('');
    setTlIcon('');
    setTlOrder(timelineList.filter((t) => t.category === defaultCategory).length);
    setShowTimelineModal(true);
  };

  const openEditTimelineModal = (item: TimelineEntry) => {
    setEditingTimeline(item);
    setTlTitle(item.title);
    setTlSubtitle(item.subtitle || '');
    setTlDescription(item.description || '');
    setTlCategory(item.category);
    setTlDate(item.date || '');
    setTlIcon(item.icon || '');
    setTlOrder(item.display_order);
    setShowTimelineModal(true);
  };

  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tlTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      const supabase = createClient();
      const payload = {
        title: tlTitle.trim(),
        subtitle: tlSubtitle.trim() || null,
        description: tlDescription.trim() || null,
        category: tlCategory,
        date: tlDate.trim() || null,
        icon: tlIcon.trim() || null,
        display_order: Number(tlOrder) || 0,
      };

      if (editingTimeline) {
        const { error } = await supabase
          .from('timeline_entries')
          .update(payload)
          .eq('id', editingTimeline.id);

        if (error) throw error;
        toast.success('Timeline milestone updated');
      } else {
        const { error } = await supabase.from('timeline_entries').insert(payload);
        if (error) throw error;
        toast.success('Timeline milestone added');
      }

      setShowTimelineModal(false);
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Error saving timeline entry', { description: message });
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    if (!confirm('Are you certain you wish to remove this milestone?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('timeline_entries').delete().eq('id', id);
      if (error) throw error;

      setTimelineList((prev) => prev.filter((t) => t.id !== id));
      toast.success('Milestone removed');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete milestone', { description: message });
    }
  };

  // Filtered timeline groups
  const leadershipItems = timelineList.filter((t) => t.category === 'leadership');
  const hackathonItems = timelineList.filter((t) => t.category === 'hackathon');
  const achievementItems = timelineList.filter(
    (t) => t.category === 'achievement' || t.category === 'opensource' || t.category === 'other'
  );

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <Route className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Academic & Career Trajectory</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Chronicle university degrees, leadership positions, hackathon triumphs, and awards
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Refresh entries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {activeTab === 'education' ? (
            <button
              onClick={openNewEduModal}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          ) : activeTab === 'leadership' ? (
            <button
              onClick={() => openNewTimelineModal('leadership')}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Leadership</span>
            </button>
          ) : activeTab === 'hackathons' ? (
            <button
              onClick={() => openNewTimelineModal('hackathon')}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hackathon</span>
            </button>
          ) : (
            <button
              onClick={() => openNewTimelineModal('achievement')}
              className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Achievement</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[var(--parchment-border)] gap-2 overflow-x-auto pb-px">
        {[
          { key: 'education', label: 'Education', icon: GraduationCap, count: educationList.length },
          { key: 'leadership', label: 'Leadership', icon: Users, count: leadershipItems.length },
          { key: 'hackathons', label: 'Hackathons', icon: Trophy, count: hackathonItems.length },
          { key: 'achievements', label: 'Achievements', icon: Award, count: achievementItems.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as JourneyTab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-bold tracking-wide transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[var(--burgundy)] text-[var(--burgundy)] bg-[#FAF6EF]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--walnut)] hover:bg-[var(--parchment)]/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[var(--parchment)] text-[var(--walnut)]">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-[var(--muted)]">
            <div className="w-6 h-6 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="font-serif text-xs">Loading trajectory milestones...</p>
          </div>
        ) : activeTab === 'education' ? (
          /* EDUCATION LIST */
          educationList.length === 0 ? (
            <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-12 text-center text-[var(--muted)]">
              <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
              <p className="font-serif text-sm text-[var(--walnut)]">No education records cataloged.</p>
              <button
                onClick={openNewEduModal}
                className="mt-3 text-xs text-[var(--burgundy)] underline"
              >
                Add your academic credential
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-5 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--gold)] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                        {edu.degree}
                      </h3>
                      {edu.is_current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-green-100 text-green-800 border border-green-200">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-serif font-semibold text-[var(--burgundy)] flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{edu.institution}</span>
                      {edu.university && <span>&bull; {edu.university}</span>}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)] pt-1">
                      {edu.expected_graduation && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Expected: {edu.expected_graduation}</span>
                        </span>
                      )}
                      {edu.cgpa && (
                        <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded-xs border border-[var(--gold)]/30">
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[var(--muted)]">
                        Order: {edu.display_order}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-xs text-[var(--charcoal)] pt-2 leading-relaxed max-w-2xl">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                    <button
                      onClick={() => openEditEduModal(edu)}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm"
                      title="Edit Education"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                      title="Delete Education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* TIMELINE LIST (Leadership, Hackathons, Achievements) */
          (() => {
            const currentItems =
              activeTab === 'leadership'
                ? leadershipItems
                : activeTab === 'hackathons'
                ? hackathonItems
                : achievementItems;

            if (currentItems.length === 0) {
              return (
                <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-12 text-center text-[var(--muted)]">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
                  <p className="font-serif text-sm text-[var(--walnut)]">
                    No entries in this category yet.
                  </p>
                  <button
                    onClick={() =>
                      openNewTimelineModal(
                        activeTab === 'leadership'
                          ? 'leadership'
                          : activeTab === 'hackathons'
                          ? 'hackathon'
                          : 'achievement'
                      )
                    }
                    className="mt-3 text-xs text-[var(--burgundy)] underline"
                  >
                    Add new milestone
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 gap-4">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FAF6EF] border border-[var(--gold)]/25 rounded-sm p-5 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--gold)] transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                          {item.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[var(--parchment)] text-[var(--charcoal)] border border-[var(--gold)]/30">
                          {item.category}
                        </span>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs font-serif font-semibold text-[var(--burgundy)]">
                          {item.subtitle}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                        {item.date && (
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.date}</span>
                          </span>
                        )}
                        <span className="font-mono text-[10px]">Order: {item.display_order}</span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-[var(--charcoal)] pt-2 leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => openEditTimelineModal(item)}
                        className="p-1.5 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm"
                        title="Edit Milestone"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTimeline(item.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()
        )}
      </div>

      {/* Education Modal */}
      {showEduModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                {editingEdu ? 'Edit Academic Credential' : 'Add Academic Credential'}
              </h3>
              <button
                type="button"
                onClick={() => setShowEduModal(false)}
                className="text-[var(--muted)] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEducation} className="space-y-4">
              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Degree / Program <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                  placeholder="e.g. Bachelor of Technology in Computer Science"
                  className="input-neoclassical text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Institution <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eduInstitution}
                    onChange={(e) => setEduInstitution(e.target.value)}
                    placeholder="e.g. Department of Computer Science"
                    className="input-neoclassical text-xs"
                  />
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    University
                  </label>
                  <input
                    type="text"
                    value={eduUniversity}
                    onChange={(e) => setEduUniversity(e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="input-neoclassical text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Graduation Year/Date
                  </label>
                  <input
                    type="text"
                    value={eduGraduation}
                    onChange={(e) => setEduGraduation(e.target.value)}
                    placeholder="2026"
                    className="input-neoclassical text-xs"
                  />
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    CGPA / Honors
                  </label>
                  <input
                    type="text"
                    value={eduCgpa}
                    onChange={(e) => setEduCgpa(e.target.value)}
                    placeholder="3.95 / 4.00"
                    className="input-neoclassical text-xs"
                  />
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={eduOrder}
                    onChange={(e) => setEduOrder(Number(e.target.value))}
                    className="input-neoclassical text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Coursework & Academic Distinctions
                </label>
                <textarea
                  rows={3}
                  value={eduDescription}
                  onChange={(e) => setEduDescription(e.target.value)}
                  placeholder="Dean's List, Algorithms & Complexity, Operating Systems, Computer Architecture..."
                  className="textarea-neoclassical text-xs"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={eduIsCurrent}
                  onChange={(e) => setEduIsCurrent(e.target.checked)}
                  className="checkbox-neoclassical"
                />
                <span className="text-xs font-serif font-bold text-[var(--walnut)]">
                  Currently Enrolled
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--parchment-border)]">
                <button
                  type="button"
                  onClick={() => setShowEduModal(false)}
                  className="px-4 py-2 border border-[var(--brass)]/30 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
                >
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      {showTimelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                {editingTimeline ? 'Edit Milestone Entry' : 'Catalog New Milestone'}
              </h3>
              <button
                type="button"
                onClick={() => setShowTimelineModal(false)}
                className="text-[var(--muted)] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTimeline} className="space-y-4">
              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Title / Role <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tlTitle}
                  onChange={(e) => setTlTitle(e.target.value)}
                  placeholder="e.g. Lead Technical Architect, Winner SIH 2024"
                  className="input-neoclassical text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Category <span className="text-red-700">*</span>
                  </label>
                  <select
                    value={tlCategory}
                    onChange={(e) =>
                      setTlCategory(e.target.value as TimelineEntry['category'])
                    }
                    className="select-neoclassical text-xs py-1.5"
                  >
                    <option value="leadership">Leadership</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="achievement">Achievement</option>
                    <option value="opensource">Open Source</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Subtitle / Organization
                  </label>
                  <input
                    type="text"
                    value={tlSubtitle}
                    onChange={(e) => setTlSubtitle(e.target.value)}
                    placeholder="e.g. ACM Student Chapter"
                    className="input-neoclassical text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Date / Period
                  </label>
                  <input
                    type="text"
                    value={tlDate}
                    onChange={(e) => setTlDate(e.target.value)}
                    placeholder="e.g. Aug 2024 – Present, or Nov 2024"
                    className="input-neoclassical text-xs"
                  />
                </div>
                <div>
                  <label className="label-neoclassical text-xs font-semibold">
                    Display Order Priority
                  </label>
                  <input
                    type="number"
                    value={tlOrder}
                    onChange={(e) => setTlOrder(Number(e.target.value))}
                    className="input-neoclassical text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="label-neoclassical text-xs font-semibold">
                  Description & Impact
                </label>
                <textarea
                  rows={4}
                  value={tlDescription}
                  onChange={(e) => setTlDescription(e.target.value)}
                  placeholder="Detail responsibilities, achievements, awards received, or metrics delivered..."
                  className="textarea-neoclassical text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--parchment-border)]">
                <button
                  type="button"
                  onClick={() => setShowTimelineModal(false)}
                  className="px-4 py-2 border border-[var(--brass)]/30 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
