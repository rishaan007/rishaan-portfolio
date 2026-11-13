/**
 * Database Types for European Neoclassical Portfolio
 * Comprehensive definitions matching the Supabase schema and PostgreSQL tables
 */

export interface Profile {
  id: string;
  full_name: string;
  professional_title: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_description: string;
  professional_summary: string;
  location: string;
  email: string;
  phone: string;
  github_url: string;
  linkedin_url: string | null;
  portrait_url: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  category: string;
  short_description: string;
  context: string | null;
  problem_statement: string | null;
  objectives: string | null;
  solution: string | null;
  technical_architecture: string | null;
  implementation_details: string | null;
  my_contribution: string | null;
  challenges: string | null;
  key_learnings: string | null;
  featured_image: string | null;
  github_url: string | null;
  live_url: string | null;
  completion_date: string | null;
  is_featured: boolean;
  status: 'draft' | 'published';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  name: string;
  display_order: number;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  image_type: 'screenshot' | 'architecture' | 'diagram' | 'other';
  display_order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  icon: string | null;
  is_visible: boolean;
  display_order: number;
  created_at: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  university: string | null;
  expected_graduation: string | null;
  cgpa: string | null;
  description: string | null;
  is_current: boolean;
  display_order: number;
  created_at: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: 'leadership' | 'hackathon' | 'opensource' | 'achievement' | 'other';
  date: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface Publication {
  id: string;
  title: string;
  abstract: string | null;
  research_area: string | null;
  status: 'in_progress' | 'submitted' | 'published';
  publication_date: string | null;
  paper_url: string | null;
  pdf_url: string | null;
  collaborators: string | null;
  display_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  meta_description: string;
  footer_text: string;
  hero_image_url: string | null;
  favicon_url: string | null;
  show_linkedin: boolean;
  show_contact_form: boolean;
  show_resume_button: boolean;
  navigation_labels: Record<string, string>;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  alt_text: string | null;
  created_at: string;
}

/* ==========================================================================
   SUPABASE ROW / INSERT / UPDATE TYPES
   ========================================================================== */

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};
export type ProfileUpdate = Partial<Omit<Profile, 'id'>>;

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  is_featured?: boolean;
  status?: 'draft' | 'published';
  display_order?: number;
  created_at?: string;
  updated_at?: string;
};
export type ProjectUpdate = Partial<Omit<Project, 'id'>>;

export type ProjectTechnologyInsert = Omit<ProjectTechnology, 'id'> & {
  id?: string;
  display_order?: number;
};
export type ProjectTechnologyUpdate = Partial<Omit<ProjectTechnology, 'id'>>;

export type ProjectImageInsert = Omit<ProjectImage, 'id'> & {
  id?: string;
  caption?: string | null;
  image_type?: 'screenshot' | 'architecture' | 'diagram' | 'other';
  display_order?: number;
};
export type ProjectImageUpdate = Partial<Omit<ProjectImage, 'id'>>;

export type SkillCategoryInsert = Omit<SkillCategory, 'id' | 'created_at'> & {
  id?: string;
  display_order?: number;
  created_at?: string;
};
export type SkillCategoryUpdate = Partial<Omit<SkillCategory, 'id'>>;

export type SkillInsert = Omit<Skill, 'id' | 'created_at'> & {
  id?: string;
  icon?: string | null;
  is_visible?: boolean;
  display_order?: number;
  created_at?: string;
};
export type SkillUpdate = Partial<Omit<Skill, 'id'>>;

export type EducationInsert = Omit<Education, 'id' | 'created_at'> & {
  id?: string;
  university?: string | null;
  expected_graduation?: string | null;
  cgpa?: string | null;
  description?: string | null;
  is_current?: boolean;
  display_order?: number;
  created_at?: string;
};
export type EducationUpdate = Partial<Omit<Education, 'id'>>;

export type TimelineEntryInsert = Omit<TimelineEntry, 'id' | 'created_at'> & {
  id?: string;
  subtitle?: string | null;
  description?: string | null;
  date?: string | null;
  icon?: string | null;
  display_order?: number;
  created_at?: string;
};
export type TimelineEntryUpdate = Partial<Omit<TimelineEntry, 'id'>>;

export type ResearchInterestInsert = Omit<ResearchInterest, 'id' | 'created_at'> & {
  id?: string;
  description?: string | null;
  icon?: string | null;
  display_order?: number;
  created_at?: string;
};
export type ResearchInterestUpdate = Partial<Omit<ResearchInterest, 'id'>>;

export type PublicationInsert = Omit<Publication, 'id' | 'created_at'> & {
  id?: string;
  abstract?: string | null;
  research_area?: string | null;
  status?: 'in_progress' | 'submitted' | 'published';
  publication_date?: string | null;
  paper_url?: string | null;
  pdf_url?: string | null;
  collaborators?: string | null;
  display_order?: number;
  created_at?: string;
};
export type PublicationUpdate = Partial<Omit<Publication, 'id'>>;

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'is_read' | 'is_archived' | 'created_at'> & {
  id?: string;
  is_read?: boolean;
  is_archived?: boolean;
  created_at?: string;
};
export type ContactMessageUpdate = Partial<Omit<ContactMessage, 'id'>>;

export type SiteSettingsInsert = Omit<SiteSettings, 'id' | 'updated_at'> & {
  id?: string;
  hero_image_url?: string | null;
  favicon_url?: string | null;
  show_linkedin?: boolean;
  show_contact_form?: boolean;
  show_resume_button?: boolean;
  navigation_labels?: Record<string, string>;
  updated_at?: string;
};
export type SiteSettingsUpdate = Partial<Omit<SiteSettings, 'id'>>;

export type MediaAssetInsert = Omit<MediaAsset, 'id' | 'created_at'> & {
  id?: string;
  alt_text?: string | null;
  created_at?: string;
};
export type MediaAssetUpdate = Partial<Omit<MediaAsset, 'id'>>;

/* ==========================================================================
   FORM DATA HELPER TYPES (FOR ADMIN & PUBLIC FORMS)
   ========================================================================== */

export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;

export interface ProjectFormData {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  short_description: string;
  context: string;
  problem_statement: string;
  objectives: string;
  solution: string;
  technical_architecture: string;
  implementation_details: string;
  my_contribution: string;
  challenges: string;
  key_learnings: string;
  featured_image: string;
  github_url: string;
  live_url: string;
  completion_date: string;
  is_featured: boolean;
  status: 'draft' | 'published';
  display_order: number;
  technologies?: string[];
  images?: Array<{
    image_url: string;
    caption?: string;
    image_type: ProjectImage['image_type'];
    display_order?: number;
  }>;
}

export type SkillFormData = Omit<Skill, 'id' | 'created_at'>;
export type SkillCategoryFormData = Omit<SkillCategory, 'id' | 'created_at'>;
export type EducationFormData = Omit<Education, 'id' | 'created_at'>;
export type TimelineEntryFormData = Omit<TimelineEntry, 'id' | 'created_at'>;
export type ResearchInterestFormData = Omit<ResearchInterest, 'id' | 'created_at'>;
export type PublicationFormData = Omit<Publication, 'id' | 'created_at'>;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SiteSettingsFormData = Omit<SiteSettings, 'id' | 'updated_at'>;

export interface MediaUploadFormData {
  file: File;
  alt_text?: string;
}

/* ==========================================================================
   RELATIONAL / COMPOSITE TYPES
   ========================================================================== */

export interface ProjectWithRelations extends Project {
  technologies: ProjectTechnology[];
  images: ProjectImage[];
}

export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

/* ==========================================================================
   SUPABASE DATABASE SCHEMA TYPE
   ========================================================================== */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
        Relationships: [];
      };
      project_technologies: {
        Row: ProjectTechnology;
        Insert: ProjectTechnologyInsert;
        Update: ProjectTechnologyUpdate;
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_images: {
        Row: ProjectImage;
        Insert: ProjectImageInsert;
        Update: ProjectImageUpdate;
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      skill_categories: {
        Row: SkillCategory;
        Insert: SkillCategoryInsert;
        Update: SkillCategoryUpdate;
        Relationships: [];
      };
      skills: {
        Row: Skill;
        Insert: SkillInsert;
        Update: SkillUpdate;
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "skill_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      education: {
        Row: Education;
        Insert: EducationInsert;
        Update: EducationUpdate;
        Relationships: [];
      };
      timeline_entries: {
        Row: TimelineEntry;
        Insert: TimelineEntryInsert;
        Update: TimelineEntryUpdate;
        Relationships: [];
      };
      research_interests: {
        Row: ResearchInterest;
        Insert: ResearchInterestInsert;
        Update: ResearchInterestUpdate;
        Relationships: [];
      };
      publications: {
        Row: Publication;
        Insert: PublicationInsert;
        Update: PublicationUpdate;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: ContactMessageInsert;
        Update: ContactMessageUpdate;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettings;
        Insert: SiteSettingsInsert;
        Update: SiteSettingsUpdate;
        Relationships: [];
      };
      media_assets: {
        Row: MediaAsset;
        Insert: MediaAssetInsert;
        Update: MediaAssetUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      project_status: 'draft' | 'published';
      project_image_type: 'screenshot' | 'architecture' | 'diagram' | 'other';
      timeline_category: 'leadership' | 'hackathon' | 'opensource' | 'achievement' | 'other';
      publication_status: 'in_progress' | 'submitted' | 'published';
    };
    CompositeTypes: Record<string, never>;
  };
}
