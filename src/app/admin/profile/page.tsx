'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types/database';
import { toast } from 'sonner';
import {
  User,
  Save,
  Upload,
  FileText,
  ExternalLink,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Camera,
} from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Profile Form States
  const [fullName, setFullName] = useState('');
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [heroHeadline, setHeroHeadline] = useState('');
  const [heroSubheadline, setHeroSubheadline] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  // Upload States
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const p = data as Profile;
        setProfileId(p.id);
        setFullName(p.full_name || '');
        setProfessionalTitle(p.professional_title || '');
        setHeroHeadline(p.hero_headline || '');
        setHeroSubheadline(p.hero_subheadline || '');
        setHeroDescription(p.hero_description || '');
        setProfessionalSummary(p.professional_summary || '');
        setLocation(p.location || '');
        setEmail(p.email || '');
        setPhone(p.phone || '');
        setGithubUrl(p.github_url || '');
        setLinkedinUrl(p.linkedin_url || '');
        setPortraitUrl(p.portrait_url || '');
        setResumeUrl(p.resume_url || '');
      } else {
        // Defaults
        setFullName('Rishaan Kumar');
        setProfessionalTitle('Software Engineer & Computer Science Scholar');
        setEmail('rishaan@example.com');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error loading profile';
      toast.error('Failed to load profile', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Portrait size must be under 5MB.');
      return;
    }

    setUploadingPortrait(true);
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop() || 'jpg';
      const filePath = `profiles/portrait-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setPortraitUrl(urlData.publicUrl);
      toast.success('Portrait uploaded successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Portrait upload failed';
      toast.error('Upload failed', { description: message });
    } finally {
      setUploadingPortrait(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Resume must be a PDF document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Resume size must be under 10MB.');
      return;
    }

    setUploadingResume(true);
    try {
      const supabase = createClient();
      const filePath = `resumes/resume-${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setResumeUrl(urlData.publicUrl);
      toast.success('Curriculum Vitae / Resume PDF uploaded successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Resume upload failed';
      toast.error('Upload failed', { description: message });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const payload = {
        full_name: fullName.trim(),
        professional_title: professionalTitle.trim(),
        hero_headline: heroHeadline.trim(),
        hero_subheadline: heroSubheadline.trim(),
        hero_description: heroDescription.trim(),
        professional_summary: professionalSummary.trim(),
        location: location.trim(),
        email: email.trim(),
        phone: phone.trim(),
        github_url: githubUrl.trim(),
        linkedin_url: linkedinUrl.trim() || null,
        portrait_url: portraitUrl.trim() || null,
        resume_url: resumeUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (profileId) {
        const { error } = await supabase
          .from('profiles')
          .update(payload)
          .eq('id', profileId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('profiles')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        if (data) setProfileId(data.id);
      }

      toast.success('Profile saved successfully', {
        description: 'Your bio, portrait, and professional credentials have been refreshed.',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Error saving profile', { description: message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-3 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-sm text-[var(--muted)]">Loading curator credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Curator Profile & Credentials</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Configure primary biographical identity, neoclassical hero headlines, and CV documents
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProfile}
            disabled={saving}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Reload from database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Portrait & CV Attachments */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-6">
          <div className="border-b border-[var(--parchment-border)] pb-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              I. Portraiture & Archival Attachments
            </h3>
            <p className="text-xs text-[var(--muted)]">Curator headshot and PDF curriculum vitae</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Portrait Image Box */}
            <div className="space-y-3">
              <label className="label-neoclassical text-xs font-semibold">
                Classical Portrait Photograph
              </label>
              <div className="flex items-center gap-5">
                <div className="relative w-28 h-28 rounded-full border-2 border-[var(--gold)]/60 bg-[var(--parchment)] shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
                  {portraitUrl ? (
                    <img
                      src={portraitUrl}
                      alt="Curator portrait"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-[var(--muted)]/50" />
                  )}
                  {uploadingPortrait && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[var(--brass)]/40 hover:bg-[var(--parchment)] text-xs font-medium text-[var(--walnut)] cursor-pointer transition-colors shadow-2xs">
                    <Camera className="w-3.5 h-3.5 text-[var(--burgundy)]" />
                    <span>{portraitUrl ? 'Change Portrait' : 'Upload Portrait'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortraitUpload}
                      disabled={uploadingPortrait}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-[var(--muted)]">
                    Square PNG, JPG, or WebP. Optimal: 800×800.
                  </p>
                  <input
                    type="url"
                    value={portraitUrl}
                    onChange={(e) => setPortraitUrl(e.target.value)}
                    placeholder="Or paste image URL"
                    className="input-neoclassical text-xs font-mono py-1 px-2.5"
                  />
                </div>
              </div>
            </div>

            {/* Resume Attachment Box */}
            <div className="space-y-3">
              <label className="label-neoclassical text-xs font-semibold">
                Curriculum Vitae (PDF)
              </label>
              <div className="p-4 bg-white/50 border border-[var(--gold)]/25 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--burgundy)]" />
                    <span className="text-xs font-serif font-bold text-[var(--walnut)]">
                      {resumeUrl ? 'Active CV Uploaded' : 'No CV Uploaded Yet'}
                    </span>
                  </div>
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-sans"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <label className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[var(--gold)]/40 hover:border-[var(--burgundy)] rounded-sm text-xs font-medium text-[var(--walnut)] bg-white/70 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{uploadingResume ? 'Uploading PDF...' : 'Choose PDF Document'}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                    className="hidden"
                  />
                </label>

                <input
                  type="url"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="Or direct PDF URL link"
                  className="input-neoclassical text-xs font-mono py-1 px-2.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Personal & Contact Information */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              II. Identity & Contact Information
            </h3>
            <p className="text-xs text-[var(--muted)]">Curator name, title, and contact coordinates</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Full Legal / Professional Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rishaan Kumar"
                className="input-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Professional Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                placeholder="Software Engineer & Computer Science Scholar"
                className="input-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Primary Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rishaan@example.com"
                className="input-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Contact Telephone</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="input-neoclassical text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label-neoclassical text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Geographic Location / Residence</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, California, United States"
                className="input-neoclassical text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Neoclassical Hero Headline */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              III. Frontispiece & Hero Epigraph
            </h3>
            <p className="text-xs text-[var(--muted)]">First impressions presented on public portfolio entry</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Hero Headline (Large Display Serif)
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="Architecting Scalable Systems at the Nexus of Machine Intelligence"
                className="input-neoclassical text-sm font-serif"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Hero Subheadline (Epigraph / Motto)
              </label>
              <input
                type="text"
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                placeholder="Classical rigor meets modern computing craftsmanship"
                className="input-neoclassical text-sm font-serif italic"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Hero Narrative Overview
              </label>
              <textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                placeholder="An introductory paragraph greeting scholars and engineers..."
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Comprehensive Professional Biography (About Section)
              </label>
              <textarea
                rows={5}
                value={professionalSummary}
                onChange={(e) => setProfessionalSummary(e.target.value)}
                placeholder="Detailed biography covering intellectual trajectory, research passions, and engineering philosophies..."
                className="textarea-neoclassical text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Public Profiles & Social Channels */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)]">
              IV. Public Registries & Scholarly Networks
            </h3>
            <p className="text-xs text-[var(--muted)]">GitHub repository index and professional network links</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-[var(--walnut)]" />
                <span>GitHub Profile URL</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/rishaan007"
                className="input-neoclassical text-xs"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[var(--burgundy)]" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/rishaankumar"
                className="input-neoclassical text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--parchment-border)]/60 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-classical-primary text-xs py-2 px-6 shadow-sm"
            >
              {saving ? 'Saving Profile...' : 'Save All Credentials'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
