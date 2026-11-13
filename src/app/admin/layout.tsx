import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Admin Sanctum | Rishaan Kumar',
  description: 'Curatorial administration dashboard for Rishaan Kumar Portfolio',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === '/admin/login' || pathname.endsWith('/login');

  if (!user && !isLoginPage) {
    redirect('/admin/login');
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[var(--ivory)] text-[var(--espresso)]">
        <Toaster richColors position="top-right" theme="light" />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--espresso)]">
      <Toaster richColors position="top-right" theme="light" />
      <AdminShell user={user}>{children}</AdminShell>
    </div>
  );
}
