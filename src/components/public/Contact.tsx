'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, Copy, Check, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { CornerOrnament } from '@/components/public/decorative/CornerOrnament';
import { toast } from 'sonner';
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  InstagramIcon,
  MailIcon,
} from '@/components/public/icons/SocialIcons';

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: '',
  });

  const email = 'ashim3006@gmail.com';
  const phone = '+91 7586020239';

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    toast.success(`Copied ${text} to clipboard!`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success('Your message has been received. Thank you!');
      } else {
        toast.error(data.error || 'Failed to deliver message.');
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="The Salon"
      className="relative py-24 sm:py-32 texture-parchment overflow-hidden border-t border-[var(--gold)]/20"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)] font-bold">
              Salon &bull; Epistle
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--burgundy)] tracking-tight">
            An Idea Worth Discussing?
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[var(--walnut)]/85 mt-3 font-normal max-w-2xl mx-auto">
            &ldquo;Whether it is a research opportunity, a collaborative project, an interesting idea, or simply a conversation about technology, I would be glad to connect.&rdquo;
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-sm bg-[var(--ivory)] border-2 border-[var(--gold)]/40 shadow-md texture-paper space-y-6"
          >
            <div className="border-b border-[var(--gold)]/20 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--gold-dark)] font-bold block mb-1">
                Direct Channels
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--burgundy)]">
                The Diplomatic Salon
              </h3>
            </div>

            {/* Email item */}
            <div className="p-4 rounded-sm bg-[var(--parchment)]/70 border border-[var(--gold)]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[var(--ivory)] text-[var(--burgundy)] border border-[var(--gold)]/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--muted)] uppercase block">Electronic Mail</span>
                  <a href={`mailto:${email}`} className="text-sm font-serif font-bold text-[var(--burgundy)] hover:underline">
                    {email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(email, 'email')}
                className="p-2 text-[var(--gold-dark)] hover:text-[var(--burgundy)] transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone item */}
            <div className="p-4 rounded-sm bg-[var(--parchment)]/70 border border-[var(--gold)]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[var(--ivory)] text-[var(--burgundy)] border border-[var(--gold)]/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--muted)] uppercase block">Telephone</span>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm font-serif font-bold text-[var(--burgundy)] hover:underline">
                    {phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(phone, 'phone')}
                className="p-2 text-[var(--gold-dark)] hover:text-[var(--burgundy)] transition-colors"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location item */}
            <div className="p-4 rounded-sm bg-[var(--parchment)]/70 border border-[var(--gold)]/30 flex items-center gap-3">
              <div className="p-2 rounded bg-[var(--ivory)] text-[var(--forest)] border border-[var(--gold)]/30">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[var(--muted)] uppercase block">Residence &bull; Base</span>
                <span className="text-sm font-serif font-bold text-[var(--walnut)]">
                  Kolkata, West Bengal, India
                </span>
              </div>
            </div>

            {/* Social Networks Guild Bar */}
            <div className="p-4 rounded-sm bg-[var(--parchment)]/70 border border-[var(--gold)]/30 space-y-2">
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider block">
                Social Networks &bull; Direct Profiles
              </span>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="https://github.com/rishaan007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--ivory)] text-xs font-mono text-[var(--walnut)] hover:text-white hover:bg-[#161C28] hover:border-[var(--gold)] transition-all flex items-center gap-1.5"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--ivory)] text-xs font-mono text-[var(--walnut)] hover:text-cyan-300 hover:bg-[#161C28] hover:border-[var(--gold)] transition-all flex items-center gap-1.5"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/therishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--ivory)] text-xs font-mono text-[var(--walnut)] hover:text-cyan-300 hover:bg-[#161C28] hover:border-[var(--gold)] transition-all flex items-center gap-1.5"
                >
                  <TwitterXIcon size={13} />
                  <span>X / Twitter</span>
                </a>
                <a
                  href="https://instagram.com/therishaankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--ivory)] text-xs font-mono text-[var(--walnut)] hover:text-pink-400 hover:bg-[#161C28] hover:border-[var(--gold)] transition-all flex items-center gap-1.5"
                >
                  <InstagramIcon size={14} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Epistle Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-[var(--ivory)] border-2 border-[var(--gold)]/40 shadow-md texture-paper relative"
          >
            <CornerOrnament position="top-right" size="sm" className="opacity-30" />

            <div className="border-b border-[var(--gold)]/20 pb-4 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--gold-dark)] font-bold block mb-1">
                Dispatches
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--burgundy)]">
                Compose an Epistle
              </h3>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border-2 border-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[var(--burgundy)]">
                  Dispatch Received
                </h4>
                <p className="text-sm text-[var(--espresso)]/80 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out. Your epistle has been recorded in the private archives, and I will review it promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' });
                  }}
                  className="px-6 py-2.5 rounded text-xs font-serif uppercase tracking-wider bg-[var(--burgundy)] text-[var(--ivory)] font-bold hover:bg-[var(--oxblood)] transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot spam prevention */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-bold text-[var(--walnut)] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. John von Neumann"
                      className="w-full px-3.5 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--parchment)]/70 text-[var(--espresso)] text-sm focus:outline-hidden focus:border-[var(--burgundy)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold text-[var(--walnut)] uppercase tracking-wider mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--parchment)]/70 text-[var(--espresso)] text-sm focus:outline-hidden focus:border-[var(--burgundy)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[var(--walnut)] uppercase tracking-wider mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Research Collaboration on Computer Vision"
                    className="w-full px-3.5 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--parchment)]/70 text-[var(--espresso)] text-sm focus:outline-hidden focus:border-[var(--burgundy)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[var(--walnut)] uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, research question, or collaborative concept..."
                    className="w-full px-3.5 py-2.5 rounded-xs border border-[var(--gold)]/40 bg-[var(--parchment)]/70 text-[var(--espresso)] text-sm focus:outline-hidden focus:border-[var(--burgundy)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-sm bg-[var(--burgundy)] text-[var(--ivory)] font-serif font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[var(--oxblood)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Dispatch...</span>
                    </span>
                  ) : (
                    <>
                      <span>Transmit Dispatch</span>
                      <Send className="w-4 h-4 text-[var(--gold)]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
