/**
 * Portfolio Type Definitions
 * Re-exports database schema models and defines UI/client-specific types
 */

export * from './database';

/* ==========================================================================
   NAVIGATION & SECTION TYPES
   ========================================================================== */

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  badge?: string;
}

export type SectionId =
  | 'hero'
  | 'about'
  | 'projects'
  | 'journey'
  | 'skills'
  | 'research'
  | 'contact';

export interface SectionMetadata {
  id: SectionId;
  title: string;
  subtitle?: string;
  latinMotto?: string;
}

/* ==========================================================================
   PROJECT FILTERING & DISPLAY TYPES
   ========================================================================== */

export type ProjectViewMode = 'grid' | 'academic' | 'compact';

export type ProjectCategoryFilter =
  | 'all'
  | 'ai-ml'
  | 'full-stack'
  | 'systems'
  | 'research'
  | string;

export interface ProjectFilters {
  category: ProjectCategoryFilter;
  search: string;
  technology?: string;
  featuredOnly?: boolean;
}

/* ==========================================================================
   TIMELINE & JOURNEY UI TYPES
   ========================================================================== */

export type TimelineCategoryFilter =
  | 'all'
  | 'leadership'
  | 'hackathon'
  | 'opensource'
  | 'achievement'
  | 'other';

export interface TimelineGroup {
  year: string;
  entries: import('./database').TimelineEntry[];
}

/* ==========================================================================
   RESEARCH & PUBLICATION UI TYPES
   ========================================================================== */

export type PublicationStatusFilter = 'all' | 'published' | 'submitted' | 'in_progress';

/* ==========================================================================
   ADMIN PORTAL & DASHBOARD TYPES
   ========================================================================== */

export interface AdminNavItem {
  title: string;
  href: string;
  icon: string;
  badgeCount?: number;
}

export interface AdminMetricCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
}

export interface AdminTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  render?: (row: T) => React.ReactNode;
}

/* ==========================================================================
   SERVER ACTIONS & FORM RESPONSE STATES
   ========================================================================== */

export interface ActionState<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

/* ==========================================================================
   MODAL & CONFIRMATION DIALOG STATES
   ========================================================================== */

export type ModalMode = 'create' | 'edit' | 'delete' | 'view';

export interface ModalState<T = unknown> {
  isOpen: boolean;
  mode: ModalMode;
  data?: T;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

/* ==========================================================================
   TOAST & NOTIFICATION TYPES
   ========================================================================== */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  durationMs?: number;
}

/* ==========================================================================
   PAGINATION & QUERY PARAMETERS
   ========================================================================== */

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationInfo;
}

export type SortDirection = 'asc' | 'desc';

export interface SortOption<T = string> {
  field: T;
  direction: SortDirection;
}
