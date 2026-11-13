-- =============================================================================
-- Supabase Schema for Rishaan Kumar Portfolio Website
-- File: supabase/schema.sql
-- =============================================================================

-- Enable pgcrypto for gen_random_uuid() if not already available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. PROFILES
-- Single row for portfolio owner information
-- =============================================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    professional_title TEXT NOT NULL,
    hero_headline TEXT NOT NULL,
    hero_subheadline TEXT NOT NULL,
    hero_description TEXT NOT NULL,
    professional_summary TEXT NOT NULL,
    location TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    github_url TEXT,
    linkedin_url TEXT,
    portrait_url TEXT,
    resume_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 2. PROJECTS
-- Case study projects with technical architectural breakdowns
-- =============================================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    context TEXT,
    problem_statement TEXT,
    objectives TEXT,
    solution TEXT,
    technical_architecture TEXT,
    implementation_details TEXT,
    my_contribution TEXT,
    challenges TEXT,
    key_learnings TEXT,
    featured_image TEXT,
    github_url TEXT,
    live_url TEXT,
    completion_date DATE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 3. PROJECT TECHNOLOGIES
-- Tech stack tags associated with each project
-- =============================================================================
CREATE TABLE IF NOT EXISTS project_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- =============================================================================
-- 4. PROJECT IMAGES
-- Screenshots, architecture diagrams, and gallery assets for projects
-- =============================================================================
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    image_type TEXT NOT NULL CHECK (image_type IN ('screenshot', 'architecture', 'diagram', 'other')),
    display_order INTEGER NOT NULL DEFAULT 0
);

-- =============================================================================
-- 5. SKILL CATEGORIES
-- Groupings for technical skills (e.g., Programming Languages, AI & ML)
-- =============================================================================
CREATE TABLE IF NOT EXISTS skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 6. SKILLS
-- Individual technical skills under each category
-- =============================================================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 7. EDUCATION
-- Academic degrees, universities, and performance records
-- =============================================================================
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    university TEXT NOT NULL,
    expected_graduation TEXT NOT NULL,
    cgpa TEXT NOT NULL,
    description TEXT,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 8. TIMELINE ENTRIES
-- Leadership, hackathons, open source contributions, and achievements
-- =============================================================================
CREATE TABLE IF NOT EXISTS timeline_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('leadership', 'hackathon', 'opensource', 'achievement', 'other')),
    date TEXT NOT NULL,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 9. RESEARCH INTERESTS
-- Focused technical and academic domains of exploration
-- =============================================================================
CREATE TABLE IF NOT EXISTS research_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 10. PUBLICATIONS
-- Research papers, submissions, and preprints
-- =============================================================================
CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    research_area TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('in_progress', 'submitted', 'published')),
    publication_date DATE,
    paper_url TEXT,
    pdf_url TEXT,
    collaborators TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 11. CONTACT MESSAGES
-- Messages submitted through public portfolio contact form
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 12. SITE SETTINGS
-- Single-row configuration for SEO, metadata, and visibility toggles
-- =============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    footer_text TEXT NOT NULL,
    hero_image_url TEXT,
    favicon_url TEXT,
    show_linkedin BOOLEAN NOT NULL DEFAULT FALSE,
    show_contact_form BOOLEAN NOT NULL DEFAULT TRUE,
    show_resume_button BOOLEAN NOT NULL DEFAULT TRUE,
    navigation_labels JSONB NOT NULL DEFAULT '{}'::JSONB,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 13. MEDIA ASSETS
-- Metadata registry for media and uploaded files
-- =============================================================================
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- Optimized for lookup by slug, filtering by status/category, and ordering
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects (is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects (display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);

CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON project_technologies (project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_display_order ON project_technologies (display_order);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images (project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_display_order ON project_images (display_order);

CREATE INDEX IF NOT EXISTS idx_skill_categories_display_order ON skill_categories (display_order);

CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills (category_id);
CREATE INDEX IF NOT EXISTS idx_skills_is_visible ON skills (is_visible);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills (display_order);

CREATE INDEX IF NOT EXISTS idx_education_display_order ON education (display_order);
CREATE INDEX IF NOT EXISTS idx_education_is_current ON education (is_current);

CREATE INDEX IF NOT EXISTS idx_timeline_entries_category ON timeline_entries (category);
CREATE INDEX IF NOT EXISTS idx_timeline_entries_display_order ON timeline_entries (display_order);

CREATE INDEX IF NOT EXISTS idx_research_interests_display_order ON research_interests (display_order);

CREATE INDEX IF NOT EXISTS idx_publications_status ON publications (status);
CREATE INDEX IF NOT EXISTS idx_publications_display_order ON publications (display_order);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages (is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_archived ON contact_messages (is_archived);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON media_assets (created_at DESC);

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- Automatically updates updated_at timestamp on row modification
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at column
DROP TRIGGER IF EXISTS trigger_update_profiles_updated_at ON profiles;
CREATE TRIGGER trigger_update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_projects_updated_at ON projects;
CREATE TRIGGER trigger_update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_site_settings_updated_at ON site_settings;
CREATE TRIGGER trigger_update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
