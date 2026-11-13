-- =============================================================================
-- Row Level Security (RLS) Policies for Rishaan Kumar Portfolio Website
-- File: supabase/policies.sql
-- =============================================================================

-- =============================================================================
-- STEP 1: ENABLE RLS ON ALL TABLES
-- =============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 1. PROFILES POLICIES
-- Public can view profile info; authenticated admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view profiles" ON profiles;
CREATE POLICY "Public can view profiles"
    ON profiles FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to profiles" ON profiles;
CREATE POLICY "Admin full access to profiles"
    ON profiles FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 2. PROJECTS POLICIES
-- Public can view published projects only; authenticated admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view published projects" ON projects;
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

DROP POLICY IF EXISTS "Admin full access to projects" ON projects;
CREATE POLICY "Admin full access to projects"
    ON projects FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 3. PROJECT TECHNOLOGIES POLICIES
-- Public can view technologies for published projects; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view technologies for published projects" ON project_technologies;
CREATE POLICY "Public can view technologies for published projects"
    ON project_technologies FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_technologies.project_id
            AND projects.status = 'published'
        )
    );

DROP POLICY IF EXISTS "Admin full access to project_technologies" ON project_technologies;
CREATE POLICY "Admin full access to project_technologies"
    ON project_technologies FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 4. PROJECT IMAGES POLICIES
-- Public can view images for published projects; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view images for published projects" ON project_images;
CREATE POLICY "Public can view images for published projects"
    ON project_images FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_images.project_id
            AND projects.status = 'published'
        )
    );

DROP POLICY IF EXISTS "Admin full access to project_images" ON project_images;
CREATE POLICY "Admin full access to project_images"
    ON project_images FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 5. SKILL CATEGORIES POLICIES
-- Public can view all skill categories; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view skill categories" ON skill_categories;
CREATE POLICY "Public can view skill categories"
    ON skill_categories FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to skill_categories" ON skill_categories;
CREATE POLICY "Admin full access to skill_categories"
    ON skill_categories FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 6. SKILLS POLICIES
-- Public can view visible skills only; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view visible skills" ON skills;
CREATE POLICY "Public can view visible skills"
    ON skills FOR SELECT
    TO anon, authenticated
    USING (is_visible = true);

DROP POLICY IF EXISTS "Admin full access to skills" ON skills;
CREATE POLICY "Admin full access to skills"
    ON skills FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 7. EDUCATION POLICIES
-- Public can view education records; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view education" ON education;
CREATE POLICY "Public can view education"
    ON education FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to education" ON education;
CREATE POLICY "Admin full access to education"
    ON education FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 8. TIMELINE ENTRIES POLICIES
-- Public can view timeline entries; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view timeline entries" ON timeline_entries;
CREATE POLICY "Public can view timeline entries"
    ON timeline_entries FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to timeline_entries" ON timeline_entries;
CREATE POLICY "Admin full access to timeline_entries"
    ON timeline_entries FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 9. RESEARCH INTERESTS POLICIES
-- Public can view research interests; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view research interests" ON research_interests;
CREATE POLICY "Public can view research interests"
    ON research_interests FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to research_interests" ON research_interests;
CREATE POLICY "Admin full access to research_interests"
    ON research_interests FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 10. PUBLICATIONS POLICIES
-- Public can view published publications only; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view published publications" ON publications;
CREATE POLICY "Public can view published publications"
    ON publications FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

DROP POLICY IF EXISTS "Admin full access to publications" ON publications;
CREATE POLICY "Admin full access to publications"
    ON publications FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 11. CONTACT MESSAGES POLICIES
-- Public can INSERT only (contact form submissions). Public CANNOT SELECT.
-- Only authenticated admin can view, update, or delete messages (privacy).
-- =============================================================================
DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
CREATE POLICY "Public can insert contact messages"
    ON contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access to contact_messages" ON contact_messages;
CREATE POLICY "Admin full access to contact_messages"
    ON contact_messages FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 12. SITE SETTINGS POLICIES
-- Public can view site settings; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to site_settings" ON site_settings;
CREATE POLICY "Admin full access to site_settings"
    ON site_settings FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 13. MEDIA ASSETS POLICIES
-- Public can view media asset records; admin has full access
-- =============================================================================
DROP POLICY IF EXISTS "Public can view media assets" ON media_assets;
CREATE POLICY "Public can view media assets"
    ON media_assets FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin full access to media_assets" ON media_assets;
CREATE POLICY "Admin full access to media_assets"
    ON media_assets FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);
