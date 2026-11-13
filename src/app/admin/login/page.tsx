'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password');
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during sign in';
      setErrorMessage(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] texture-parchment flex flex-col justify-center items-center px-4 py-12 relative">
      {/* Decorative Classical Vignette Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(48,35,30,0.12)_100%)]" />

      {/* Return to Portfolio Link */}
      <div className="relative z-10 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--burgundy)] transition-colors duration-200 group font-serif tracking-wide"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Public Portfolio</span>
        </Link>
      </div>

      {/* Main Login Card with Classical Decorative Border */}
      <div className="relative z-10 w-full max-w-md">
        {/* Outer Classical Frame */}
        <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 shadow-xl rounded-sm p-8 sm:p-10 relative overflow-hidden ornate-corners">
          {/* Subtle Inner Accent Border */}
          <div className="absolute inset-1 border border-[var(--gold)]/20 pointer-events-none rounded-[1px]" />

          {/* Neoclassical Header Crest */}
          <div className="text-center relative mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--burgundy)]/5 border border-[var(--gold)]/40 text-[var(--burgundy)] mb-3 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[var(--gold)]" />
            </div>

            <div className="classical-pediment">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.2em] text-[var(--walnut)] uppercase">
                Rishaan Kumar
              </h1>
            </div>

            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-[var(--muted)] font-medium">
              Administrator Access
            </p>
            <div className="w-16 h-px bg-[var(--gold)] mx-auto mt-4 opacity-60" />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-3.5 bg-red-50/80 border border-red-200 rounded-sm flex items-start gap-3 text-sm text-red-800 animate-fadeIn"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-sans text-xs sm:text-sm">
                <p className="font-semibold text-red-900">Authentication Failed</p>
                <p className="mt-0.5 text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase font-serif tracking-wider text-[var(--walnut)] font-semibold mb-1.5"
              >
                Curator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted)]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rishaan.com"
                  disabled={loading}
                  className="input-neoclassical pl-10 text-sm focus:border-[var(--burgundy)] focus:ring-[var(--burgundy)]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs uppercase font-serif tracking-wider text-[var(--walnut)] font-semibold"
                >
                  Keyphrase / Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="input-neoclassical pl-10 pr-10 text-sm focus:border-[var(--burgundy)] focus:ring-[var(--burgundy)]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--muted)] hover:text-[var(--burgundy)] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 btn-classical-primary py-3 relative overflow-hidden group tracking-widest uppercase text-xs font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Enter Dashboard</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              )}
            </button>
          </form>

          {/* Classical Footer Inscription */}
          <div className="mt-8 pt-6 border-t border-[var(--gold)]/20 text-center">
            <p className="text-[11px] font-serif text-[var(--muted)] italic">
              &ldquo;Architectura et Scientia&rdquo; &bull; Restricted Editorial Console
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
