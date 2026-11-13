'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { MediaAsset } from '@/lib/types/database';
import { formatFileSize, formatDateShort } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  ExternalLink,
  FileText,
  Search,
  RefreshCw,
  X,
  Eye,
  Check,
  AlertTriangle,
  FolderOpen,
} from 'lucide-react';

type MediaFilter = 'all' | 'image' | 'document';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<MediaFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<MediaAsset | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaList((data as MediaAsset[]) || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching media';
      toast.error('Failed to load media assets', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const supabase = createClient();

    let uploadedCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validation
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';

      if (!isImage && !isPdf) {
        toast.error(`"${file.name}" rejected: Only images and PDF files are allowed.`);
        continue;
      }

      if (isImage && file.size > 5 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 5MB image limit.`);
        continue;
      }

      if (isPdf && file.size > 10 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 10MB PDF limit.`);
        continue;
      }

      try {
        const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `uploads/${Date.now()}-${sanitized}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio-media')
          .upload(storagePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('portfolio-media')
          .getPublicUrl(storagePath);

        const { error: dbError } = await supabase.from('media_assets').insert({
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_type: file.type,
          file_size: file.size,
          alt_text: file.name.replace(/\.[^/.]+$/, ''),
        });

        if (dbError) throw dbError;
        uploadedCount++;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Upload failed';
        toast.error(`Failed to upload ${file.name}`, { description: msg });
      }
    }

    if (uploadedCount > 0) {
      toast.success(`Uploaded ${uploadedCount} asset(s) successfully!`);
      fetchMedia();
    }
    setUploading(false);
  };

  const handleCopyUrl = async (asset: MediaAsset) => {
    try {
      await navigator.clipboard.writeText(asset.file_url);
      setCopiedId(asset.id);
      toast.success('Asset URL copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!assetToDelete) return;
    setDeleting(true);

    try {
      const supabase = createClient();

      // Extract storage path if applicable
      const urlParts = assetToDelete.file_url.split('/portfolio-media/');
      if (urlParts.length > 1) {
        const relativePath = decodeURIComponent(urlParts[1]);
        await supabase.storage.from('portfolio-media').remove([relativePath]);
      }

      // Delete from DB table
      const { error } = await supabase
        .from('media_assets')
        .delete()
        .eq('id', assetToDelete.id);

      if (error) throw error;

      setMediaList((prev) => prev.filter((a) => a.id !== assetToDelete.id));
      toast.success('Asset deleted successfully');
      setAssetToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete asset', { description: message });
    } finally {
      setDeleting(false);
    }
  };

  const filteredList = mediaList.filter((asset) => {
    const matchesSearch = asset.file_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isImage = asset.file_type.startsWith('image/');
    const isDoc = asset.file_type === 'application/pdf';

    if (filterType === 'image') return matchesSearch && isImage;
    if (filterType === 'document') return matchesSearch && isDoc;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Curatorial Media Archive</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Store diagrams, project captures, certificates, research preprints, and typography assets
          </p>
        </div>

        <button
          onClick={fetchMedia}
          disabled={loading}
          className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors self-start sm:self-auto"
          title="Refresh library"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Upload Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`bg-[#FAF6EF] border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
          isDragOver
            ? 'border-[var(--burgundy)] bg-[var(--parchment)]/60'
            : 'border-[var(--gold)]/40 hover:border-[var(--gold)]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-[var(--burgundy)]/10 text-[var(--burgundy)] flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6 text-[var(--gold)]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
              {uploading ? 'Cataloging Media Assets...' : 'Deposit Media into Repository'}
            </h3>
            <p className="text-xs text-[var(--muted)] font-sans mt-0.5">
              Drag & drop files here, or browse from your filesystem
            </p>
            <p className="text-[11px] text-[var(--muted)]/80 font-mono mt-1">
              Supports PNG, JPG, WebP, SVG (up to 5MB) and PDF documents (up to 10MB)
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--burgundy)] text-[var(--ivory)] hover:bg-[var(--oxblood)] text-xs font-sans font-semibold tracking-wider uppercase cursor-pointer shadow-sm transition-colors border border-[var(--gold)]/30">
            <span>Select Files</span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/20 p-4 rounded-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by file name..."
            className="input-neoclassical pl-9 py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start md:self-auto">
          {(
            [
              { key: 'all', label: `All (${mediaList.length})` },
              {
                key: 'image',
                label: `Images (${mediaList.filter((a) => a.file_type.startsWith('image/')).length})`,
              },
              {
                key: 'document',
                label: `Documents (${mediaList.filter((a) => a.file_type === 'application/pdf').length})`,
              },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilterType(t.key)}
              className={`px-3 py-1 text-xs rounded-sm transition-colors font-serif font-bold ${
                filterType === t.key
                  ? 'bg-[var(--burgundy)] text-[var(--ivory)] shadow-xs'
                  : 'text-[var(--walnut)] bg-[var(--parchment)]/50 hover:bg-[var(--parchment)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div>
        {loading ? (
          <div className="py-20 text-center text-[var(--muted)]">
            <div className="w-6 h-6 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="font-serif text-xs">Accessing archival vault...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-16 text-center text-[var(--muted)]">
            <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
            <p className="font-serif text-base text-[var(--walnut)]">No assets found</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Deposit files using the upload zone above to populate the library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredList.map((asset) => {
              const isImage = asset.file_type.startsWith('image/');

              return (
                <div
                  key={asset.id}
                  className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xs hover:border-[var(--gold)] hover:shadow-md transition-all group"
                >
                  {/* Thumbnail Container */}
                  <div
                    onClick={() => isImage && setPreviewAsset(asset)}
                    className="relative aspect-square bg-[var(--parchment)]/50 overflow-hidden flex items-center justify-center cursor-pointer border-b border-[var(--parchment-border)]"
                  >
                    {isImage ? (
                      <img
                        src={asset.file_url}
                        alt={asset.alt_text || asset.file_name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-[var(--burgundy)]">
                        <FileText className="w-12 h-12 mb-1" />
                        <span className="text-[10px] font-mono uppercase font-bold">PDF</span>
                      </div>
                    )}

                    {/* Quick Preview Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewAsset(asset);
                        }}
                        className="p-2 bg-white/90 text-[var(--walnut)] hover:bg-white rounded-xs transition-colors shadow-xs"
                        title="View Full Resolution"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(asset);
                        }}
                        className="p-2 bg-white/90 text-[var(--walnut)] hover:bg-white rounded-xs transition-colors shadow-xs"
                        title="Copy Public URL"
                      >
                        {copiedId === asset.id ? (
                          <Check className="w-4 h-4 text-green-700" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata and Controls */}
                  <div className="p-3 space-y-2">
                    <p
                      className="text-xs font-serif font-bold text-[var(--walnut)] truncate"
                      title={asset.file_name}
                    >
                      {asset.file_name}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[var(--muted)] font-mono">
                      <span>{formatFileSize(asset.file_size)}</span>
                      <span>{formatDateShort(asset.created_at)}</span>
                    </div>

                    <div className="pt-2 border-t border-[var(--parchment-border)]/50 flex items-center justify-between">
                      <button
                        onClick={() => handleCopyUrl(asset)}
                        className="text-[11px] text-[var(--burgundy)] hover:underline inline-flex items-center gap-1 font-sans font-medium"
                      >
                        {copiedId === asset.id ? (
                          <span className="text-green-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Copy className="w-3 h-3" /> Copy URL
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setAssetToDelete(asset)}
                        className="p-1 text-[var(--muted)] hover:text-red-700 transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 rounded-sm max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--walnut)] truncate max-w-lg">
                {previewAsset.file_name}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewAsset(null)}
                className="text-[var(--muted)] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-black/5 p-4 rounded-sm border border-[var(--gold)]/20 min-h-[300px]">
              {previewAsset.file_type.startsWith('image/') ? (
                <img
                  src={previewAsset.file_url}
                  alt={previewAsset.file_name}
                  className="max-h-[60vh] max-w-full object-contain shadow-sm"
                />
              ) : (
                <div className="text-center p-8 space-y-3">
                  <FileText className="w-16 h-16 text-[var(--burgundy)] mx-auto" />
                  <p className="font-serif text-sm text-[var(--walnut)]">PDF Document Asset</p>
                  <a
                    href={previewAsset.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-classical-primary text-xs py-2 px-4"
                  >
                    <span>Open Document in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-2">
              <span className="font-mono text-[var(--muted)]">
                Size: {formatFileSize(previewAsset.file_size)} &bull; Uploaded:{' '}
                {formatDateShort(previewAsset.created_at)}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewAsset)}
                  className="btn-classical-secondary text-xs py-1.5 px-3"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Public URL</span>
                </button>
                <a
                  href={previewAsset.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-classical-primary text-xs py-1.5 px-3"
                >
                  <span>Open Full Asset</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {assetToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF6EF] border-2 border-red-300 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--walnut)]">
                  Confirm Media Removal
                </h3>
                <p className="text-xs text-[var(--muted)] font-sans">
                  The file will be deleted from cloud storage.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/70 border border-red-100 rounded-xs text-xs font-sans text-[var(--espresso)]">
              Permanently delete <span className="font-semibold text-red-900">&ldquo;{assetToDelete.file_name}&rdquo;</span>? Any projects or articles referencing this link may experience broken visuals.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setAssetToDelete(null)}
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
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
