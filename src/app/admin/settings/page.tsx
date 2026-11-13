'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/lib/types/database';
import { toast } from 'sonner';
import {
  Settings,
  Save,
  Globe,
  Compass,
  Sliders,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const defaultNavLabels: Record<string, string> = {
  home: 'Sanctum',
  about: 'Curator',
  projects: 'Portfolio',
  journey: 'Trajectory',
  skills: 'Mastery',
  research: 'Scholarship',
  contact: 'Inquiries',
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  // Form states
  const [siteTitle, setSiteTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [footerText, setFooterText] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');

  // Feature Toggles
  const [showLinkedin, setShowLinkedin] = useState(true);
  const [showContactForm, setShowContactForm] = useState(true);
  const [showResumeButton, setShowResumeButton] = useState(true);

  // Navigation Labels
  const [navLabels, setNavLabels] = useState<Record<string, string>>(defaultNavLabels);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const s = data as SiteSettings;
        setSettingsId(s.id);
        setSiteTitle(s.site_title || '');
        setMetaDescription(s.meta_description || '');
        setFooterText(s.footer_text || '');
        setHeroImageUrl(s.hero_image_url || '');
        setFaviconUrl(s.favicon_url || '');
        setShowLinkedin(s.show_linkedin ?? true);
        setShowContactForm(s.show_contact_form ?? true);
        setShowResumeButton(s.show_resume_button ?? true);
        setNavLabels({
          ...defaultNavLabels,
          ...(s.navigation_labels || {}),
        });
      } else {
        // Apply defaults
        setSiteTitle('Rishaan Kumar — Software Engineer & Computer Science Scholar');
        setMetaDescription(
          'Personal portfolio, research archive, and systems engineering case studies of Rishaan Kumar.'
        );
        setFooterText('Preserved in Classical Neoclassical Aesthetics. All rights reserved.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error loading settings';
      toast.error('Failed to load settings', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleNavLabelChange = (key: string, value: string) => {
    setNavLabels((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const payload = {
        site_title: siteTitle.trim(),
        meta_description: metaDescription.trim(),
        footer_text: footerText.trim(),
        hero_image_url: heroImageUrl.trim() || null,
        favicon_url: faviconUrl.trim() || null,
        show_linkedin: showLinkedin,
        show_contact_form: showContactForm,
        show_resume_button: showResumeButton,
        navigation_labels: navLabels,
        updated_at: new Date().toISOString(),
      };

      if (settingsId) {
        const { error } = await supabase
          .from('site_settings')
          .update(payload)
          .eq('id', settingsId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('site_settings')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        if (data) setSettingsId(data.id);
      }

      toast.success('Site configurations preserved', {
        description: 'Global metadata and display parameters updated successfully.',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error('Failed to save settings', { description: message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-3 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-sm text-[var(--muted)]">Loading platform configurations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Platform Configurations & Global Meta</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Control search engine optimization tags, navigational taxonomy, and public interactive features
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSettings}
            disabled={saving}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Reload settings"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={saving}
            className="btn-classical-primary text-xs py-2 px-5 shadow-sm"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Preserving...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Section 1: SEO & Global Titles */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--gold)]" />
              <span>I. SEO & Page Metadata</span>
            </h3>
            <p className="text-xs text-[var(--muted)]">Browser tab titles, social preview descriptions, and epigraphs</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Global Website Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="Rishaan Kumar — Software Engineer & Computer Science Scholar"
                className="input-neoclassical text-sm"
              />
              <p className="text-[11px] text-[var(--muted)] mt-1 font-serif">
                Displayed in browser tab titles and primary search engine listing headers.
              </p>
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Search Engine Meta Description
              </label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Explanatory paragraph summarizing intellectual concentrations..."
                className="textarea-neoclassical text-sm"
              />
            </div>

            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Footer Colophon & Copyright Inscription
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Preserved in Classical Neoclassical Aesthetics. All rights reserved."
                className="input-neoclassical text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Component & Feature Switches */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--gold)]" />
              <span>II. Public Feature Switches</span>
            </h3>
            <p className="text-xs text-[var(--muted)]">Toggle visibility of specific interaction pathways on the public portal</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-white/60 border border-[var(--gold)]/20 rounded-sm cursor-pointer hover:bg-white transition-colors">
              <div>
                <span className="font-serif font-bold text-xs text-[var(--walnut)] block">
                  Curriculum Vitae Download Button
                </span>
                <span className="text-[11px] text-[var(--muted)]">
                  Displays &ldquo;Download CV&rdquo; in header and hero section
                </span>
              </div>
              <input
                type="checkbox"
                checked={showResumeButton}
                onChange={(e) => setShowResumeButton(e.target.checked)}
                className="checkbox-neoclassical shrink-0 ml-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-white/60 border border-[var(--gold)]/20 rounded-sm cursor-pointer hover:bg-white transition-colors">
              <div>
                <span className="font-serif font-bold text-xs text-[var(--walnut)] block">
                  Interactive Contact Form
                </span>
                <span className="text-[11px] text-[var(--muted)]">
                  Allows visitors to send direct messages to your admin correspondence inbox
                </span>
              </div>
              <input
                type="checkbox"
                checked={showContactForm}
                onChange={(e) => setShowContactForm(e.target.checked)}
                className="checkbox-neoclassical shrink-0 ml-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-white/60 border border-[var(--gold)]/20 rounded-sm cursor-pointer hover:bg-white transition-colors">
              <div>
                <span className="font-serif font-bold text-xs text-[var(--walnut)] block">
                  LinkedIn Registry Badge
                </span>
                <span className="text-[11px] text-[var(--muted)]">
                  Displays LinkedIn professional network link in footer and contact sections
                </span>
              </div>
              <input
                type="checkbox"
                checked={showLinkedin}
                onChange={(e) => setShowLinkedin(e.target.checked)}
                className="checkbox-neoclassical shrink-0 ml-4"
              />
            </label>
          </div>
        </div>

        {/* Section 3: Navigation Labels Customization */}
        <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4">
          <div className="border-b border-[var(--parchment-border)] pb-2 mb-4">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--walnut)] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[var(--gold)]" />
              <span>III. Navigation Taxonomy Labels</span>
            </h3>
            <p className="text-xs text-[var(--muted)]">Customize the terminology displayed in the main public navbar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(defaultNavLabels).map((key) => (
              <div key={key}>
                <label className="label-neoclassical text-[11px] font-semibold capitalize">
                  {key} Section Label
                </label>
                <input
                  type="text"
                  value={navLabels[key] || ''}
                  onChange={(e) => handleNavLabelChange(key, e.target.value)}
                  className="input-neoclassical text-xs font-serif"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--parchment-border)]/60 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-classical-primary text-xs py-2 px-6 shadow-sm"
            >
              {saving ? 'Preserving Settings...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
