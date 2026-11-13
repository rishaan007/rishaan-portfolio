/**
 * Core Utilities for Rishaan Kumar's Neoclassical Portfolio
 * Robust, production-grade helper functions with zero unneeded runtime dependencies
 */

/* ==========================================================================
   CLASSNAME MERGING (cn)
   ========================================================================== */

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export interface ClassDictionary {
  [id: string]: unknown;
}

export type ClassArray = ClassValue[];

/**
 * Combines and filters class names cleanly using template literals and array joins.
 * Mimics the clsx / tailwind-merge signature without requiring external dependencies.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function processValue(val: ClassValue): void {
    if (!val) return;

    if (typeof val === 'string' || typeof val === 'number') {
      const trimmed = String(val).trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        processValue(val[i]);
      }
    } else if (typeof val === 'object') {
      for (const [key, condition] of Object.entries(val)) {
        if (Boolean(condition) && key) {
          const trimmed = key.trim();
          if (trimmed) classes.push(trimmed);
        }
      }
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    processValue(inputs[i]);
  }

  return classes.join(' ').replace(/\s+/g, ' ').trim();
}

/* ==========================================================================
   DATE FORMATTING (formatDate)
   ========================================================================== */

export type DateFormatPreset = 'short' | 'long' | 'year-month' | 'academic' | 'full';

/**
 * Formats a date string, timestamp, or Date object with classical editorial styling.
 * Handles null/undefined and incomplete dates (e.g. YYYY-MM or YYYY) gracefully.
 *
 * @example
 * formatDate("2024-10-15", "long") => "October 15, 2024"
 * formatDate("2024-10", "year-month") => "October 2024"
 * formatDate(null) => ""
 */
export function formatDate(
  date: string | number | Date | null | undefined,
  formatOrOptions: DateFormatPreset | Intl.DateTimeFormatOptions = 'long'
): string {
  if (!date) return '';

  // If already a clean 4-digit year string, return directly
  if (typeof date === 'string' && /^\d{4}$/.test(date.trim())) {
    return date.trim();
  }

  // Handle YYYY-MM partial date strings
  if (typeof date === 'string' && /^\d{4}-\d{2}$/.test(date.trim())) {
    const [year, month] = date.trim().split('-');
    const parsedMonth = parseInt(month, 10) - 1;
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (parsedMonth >= 0 && parsedMonth < 12) {
      if (formatOrOptions === 'short' || formatOrOptions === 'academic') {
        return `${monthNames[parsedMonth].slice(0, 3)} ${year}`;
      }
      return `${monthNames[parsedMonth]} ${year}`;
    }
  }

  let parsedDate: Date;
  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return typeof date === 'string' ? date : '';
  }

  if (typeof formatOrOptions === 'string') {
    switch (formatOrOptions) {
      case 'short':
      case 'academic':
        return parsedDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
      case 'year-month':
        return parsedDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      case 'full':
        return parsedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      case 'long':
      default:
        return parsedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
    }
  }

  return parsedDate.toLocaleDateString('en-US', formatOrOptions);
}

export function formatDateShort(date: string | number | Date | null | undefined): string {
  return formatDate(date, 'short');
}

export function getRelativeTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString, 'short');
}

/* ==========================================================================
   SLUG GENERATION (generateSlug)
   ========================================================================== */

/**
 * Transforms an arbitrary string (e.g. project title) into a URL-safe lowercase slug.
 * Removes accents, punctuation, and multiple consecutive hyphens.
 *
 * @example
 * generateSlug("Real-Time Autonomous Vision v2.0!") => "real-time-autonomous-vision-v2-0"
 */
export function generateSlug(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .normalize('NFD') // Separate base characters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace any sequence of non-alphanumeric characters with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens
}

/* ==========================================================================
   TEXT TRUNCATION (truncateText)
   ========================================================================== */

/**
 * Truncates a string to a maximum length without splitting words in half if possible.
 *
 * @example
 * truncateText("The neoclassical architecture of ancient Europe", 20) => "The neoclassical..."
 */
export function truncateText(
  text: string | null | undefined,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  if (maxLength <= ellipsis.length) return text.slice(0, maxLength);

  const targetLength = maxLength - ellipsis.length;
  const sliced = text.slice(0, targetLength);
  const lastSpaceIndex = sliced.lastIndexOf(' ');

  // If a natural word boundary is found reasonably close to the end, break there
  if (lastSpaceIndex > targetLength * 0.6) {
    return sliced.slice(0, lastSpaceIndex).trimEnd() + ellipsis;
  }

  return sliced.trimEnd() + ellipsis;
}

/* ==========================================================================
   INITIALS EXTRACTION (getInitials)
   ========================================================================== */

/**
 * Extracts uppercase initials from a person or entity name.
 *
 * @example
 * getInitials("Rishaan Kumar") => "RK"
 * getInitials("Alan Turing", 1) => "A"
 */
export function getInitials(
  name: string | null | undefined,
  maxInitials: number = 2
): string {
  if (!name) return '';

  const cleanName = name.trim();
  if (!cleanName) return '';

  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';

  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxInitials)
    .join('');
}

/* ==========================================================================
   URL VALIDATION (isValidUrl)
   ========================================================================== */

/**
 * Validates whether a given string is a valid HTTP or HTTPS URL.
 *
 * @example
 * isValidUrl("https://github.com/rishaan") => true
 * isValidUrl("not-a-url") => false
 */
export function isValidUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/* ==========================================================================
   SUPABASE STORAGE PUBLIC URL (getPublicUrl)
   ========================================================================== */

/**
 * Constructs a fully qualified public URL for an asset in Supabase Storage.
 * If the input path is already an absolute HTTP/HTTPS URL or data URI, it is returned as is.
 *
 * @param bucket - The storage bucket name (e.g. 'projects', 'media', 'resumes')
 * @param path - The file path or relative key inside the bucket
 * @returns Fully qualified URL string, or empty string if path is missing
 *
 * @example
 * getPublicUrl('projects', 'neural-net.png')
 * => "https://your-project.supabase.co/storage/v1/object/public/projects/neural-net.png"
 */
export function getPublicUrl(
  bucket: string,
  path: string | null | undefined
): string {
  if (!path) return '';

  const trimmedPath = path.trim();
  if (!trimmedPath) return '';

  // Already a full or external URL
  if (
    trimmedPath.startsWith('http://') ||
    trimmedPath.startsWith('https://') ||
    trimmedPath.startsWith('data:')
  ) {
    return trimmedPath;
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const cleanPath = trimmedPath.replace(/^\/+/, '');
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');

  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
  }

  // Fallback relative storage path when NEXT_PUBLIC_SUPABASE_URL is not set
  return `/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
}

/* ==========================================================================
   SUPPLEMENTARY PORTFOLIO UTILITIES
   ========================================================================== */

/**
 * Formats file sizes in bytes to human-readable strings (e.g. "1.4 MB", "320 KB").
 */
export function formatFileSize(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Strips HTML tags from rich text or markdown descriptions.
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Calculates estimated reading time in minutes for long-form case studies or summaries.
 */
export function calculateReadingTime(text: string | null | undefined, wordsPerMinute: number = 200): number {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Safely copies text to the user's clipboard in browser environments.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
