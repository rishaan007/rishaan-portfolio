'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ContactMessage } from '@/lib/types/database';
import { formatDate, getRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Mail,
  MailOpen,
  Archive,
  ArchiveRestore,
  Trash2,
  Search,
  Reply,
  RefreshCw,
  Clock,
  User,
  Inbox,
  Filter,
  AlertTriangle,
} from 'lucide-react';

type MessageFilter = 'all' | 'unread' | 'archived';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<MessageFilter>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const list = (data as ContactMessage[]) || [];
      setMessages(list);

      // Keep selection or select first
      if (list.length > 0 && !selectedMessage) {
        setSelectedMessage(list[0]);
        if (!list[0].is_read) {
          markAsRead(list[0].id, true);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching messages';
      toast.error('Failed to load inquiries', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string, readState: boolean) => {
    // Optimistic
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: readState } : m))
    );
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, is_read: readState } : null));
    }

    try {
      const supabase = createClient();
      await supabase
        .from('contact_messages')
        .update({ is_read: readState })
        .eq('id', id);
    } catch (err) {
      console.error('Error toggling read state:', err);
    }
  };

  const toggleArchive = async (msg: ContactMessage) => {
    const nextArchive = !msg.is_archived;

    // Optimistic
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, is_archived: nextArchive } : m))
    );
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage((prev) => (prev ? { ...prev, is_archived: nextArchive } : null));
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_archived: nextArchive })
        .eq('id', msg.id);

      if (error) throw error;
      toast.success(nextArchive ? 'Message moved to archive' : 'Message unarchived');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Action failed';
      toast.error('Error updating message', { description: message });
    }
  };

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      markAsRead(msg.id, true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;
    setDeleting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageToDelete.id);

      if (error) throw error;

      setMessages((prev) => prev.filter((m) => m.id !== messageToDelete.id));
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
      toast.success('Inquiry permanently removed');
      setMessageToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete message', { description: message });
    } finally {
      setDeleting(false);
    }
  };

  // Filter logic
  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.subject.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (filter === 'unread') return !msg.is_read && !msg.is_archived;
    if (filter === 'archived') return msg.is_archived;
    // 'all' shows non-archived by default
    return !msg.is_archived;
  });

  const unreadCount = messages.filter((m) => !m.is_read && !m.is_archived).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Correspondence & Inquiries</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-red-600 text-white font-bold ml-2">
                {unreadCount} unread
              </span>
            )}
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Scholarly inquiries, academic correspondence, and industry collaboration letters
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors self-start sm:self-auto"
          title="Refresh inbox"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Two-Pane Messaging Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Inbox List */}
        <div className="lg:col-span-5 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm overflow-hidden flex flex-col h-[700px]">
          {/* Search & Filter Header */}
          <div className="p-3 border-b border-[var(--parchment-border)] space-y-3 bg-[var(--parchment)]/30">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search correspondence..."
                className="input-neoclassical pl-8 py-1.5 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {(
                [
                  { key: 'all', label: 'Inbox' },
                  { key: 'unread', label: `Unread (${unreadCount})` },
                  { key: 'archived', label: 'Archived' },
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1 text-xs rounded-xs font-serif font-bold transition-colors ${
                    filter === f.key
                      ? 'bg-[var(--burgundy)] text-[var(--ivory)] shadow-xs'
                      : 'text-[var(--walnut)] hover:bg-[var(--parchment)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--parchment-border)]/50">
            {loading ? (
              <div className="p-12 text-center text-[var(--muted)]">
                <div className="w-5 h-5 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="font-serif text-xs">Accessing mail repository...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-[var(--muted)]">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
                <p className="font-serif text-sm">No correspondence in this category.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;

                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-3.5 cursor-pointer transition-colors relative border-l-3 ${
                      isSelected
                        ? 'bg-white border-l-[var(--gold)] shadow-xs'
                        : !msg.is_read
                        ? 'bg-[var(--ivory)]/90 border-l-[var(--burgundy)] hover:bg-white'
                        : 'bg-[#FAF6EF] border-l-transparent hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {!msg.is_read && (
                          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                        )}
                        <span
                          className={`text-xs truncate ${
                            !msg.is_read
                              ? 'font-serif font-bold text-[var(--walnut)]'
                              : 'font-serif text-[var(--espresso)] font-semibold'
                          }`}
                        >
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--muted)] font-mono whitespace-nowrap">
                        {getRelativeTime(msg.created_at)}
                      </span>
                    </div>

                    <p
                      className={`text-xs truncate ${
                        !msg.is_read
                          ? 'font-bold text-[var(--walnut)]'
                          : 'text-[var(--charcoal)]'
                      }`}
                    >
                      {msg.subject || '(No Subject)'}
                    </p>

                    <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5 font-serif italic">
                      {msg.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Letter Reading Pane */}
        <div className="lg:col-span-7 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm overflow-hidden flex flex-col h-[700px] shadow-xs">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Action Toolbar */}
              <div className="p-3 border-b border-[var(--parchment-border)] bg-[var(--parchment)]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || 'Portfolio Inquiry'
                    )}`}
                    className="btn-classical-primary text-xs py-1.5 px-3 shadow-2xs"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() =>
                      markAsRead(selectedMessage.id, !selectedMessage.is_read)
                    }
                    className="p-1.5 border border-[var(--brass)]/30 text-[var(--walnut)] hover:bg-[var(--parchment)] rounded-sm text-xs font-medium transition-colors flex items-center gap-1"
                    title={selectedMessage.is_read ? 'Mark unread' : 'Mark read'}
                  >
                    {selectedMessage.is_read ? (
                      <Mail className="w-3.5 h-3.5 text-[var(--muted)]" />
                    ) : (
                      <MailOpen className="w-3.5 h-3.5 text-[var(--gold)]" />
                    )}
                    <span className="hidden sm:inline">
                      {selectedMessage.is_read ? 'Mark Unread' : 'Mark Read'}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleArchive(selectedMessage)}
                    className="p-1.5 border border-[var(--brass)]/30 text-[var(--walnut)] hover:bg-[var(--parchment)] rounded-sm text-xs font-medium transition-colors flex items-center gap-1"
                    title={selectedMessage.is_archived ? 'Move to Inbox' : 'Archive'}
                  >
                    {selectedMessage.is_archived ? (
                      <ArchiveRestore className="w-3.5 h-3.5 text-[var(--forest)]" />
                    ) : (
                      <Archive className="w-3.5 h-3.5 text-[var(--muted)]" />
                    )}
                    <span className="hidden sm:inline">
                      {selectedMessage.is_archived ? 'Unarchive' : 'Archive'}
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => setMessageToDelete(selectedMessage)}
                  className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Letter Header */}
              <div className="p-6 border-b border-[var(--parchment-border)] bg-white/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--walnut)]">
                      {selectedMessage.subject || '(No Subject)'}
                    </h3>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-[var(--espresso)] font-serif font-semibold flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[var(--gold)]" />
                        <span>{selectedMessage.name}</span>
                        <span className="text-[var(--muted)] font-mono font-normal">
                          &lt;{selectedMessage.email}&gt;
                        </span>
                      </p>
                      <p className="text-[var(--muted)] flex items-center gap-2 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(selectedMessage.created_at)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[var(--burgundy)]/10 text-[var(--burgundy)] border border-[var(--gold)]/30 flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    {selectedMessage.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Classical Archival Letter Body */}
              <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[var(--ivory)] texture-parchment relative">
                <div className="max-w-2xl mx-auto bg-white/80 p-6 sm:p-8 border border-[var(--gold)]/30 shadow-xs rounded-sm ornate-corners">
                  <p className="font-serif text-sm leading-relaxed text-[var(--espresso)] whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>

                  <div className="mt-8 pt-4 border-t border-[var(--parchment-border)] flex items-center justify-between text-[11px] text-[var(--muted)] font-serif italic">
                    <span>Archived Correspondence</span>
                    <span>Direct Inscription</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--muted)] p-8">
              <Mail className="w-12 h-12 mb-3 opacity-30 text-[var(--burgundy)]" />
              <p className="font-serif text-base text-[var(--walnut)]">No Message Selected</p>
              <p className="text-xs text-[var(--muted)] mt-1 font-serif italic">
                Choose an inquiry from the inbox pane to inspect correspondence
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {messageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-red-300 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                  Delete Correspondence
                </h3>
                <p className="text-xs text-[var(--muted)] font-sans">
                  This letter will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/70 border border-red-100 rounded-xs text-xs font-sans text-[var(--espresso)]">
              Are you sure you want to delete inquiry from{' '}
              <span className="font-semibold text-red-900">{messageToDelete.name}</span>?
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setMessageToDelete(null)}
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
                {deleting ? 'Deleting...' : 'Delete Inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
