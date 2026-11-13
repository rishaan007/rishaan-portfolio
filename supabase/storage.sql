-- =============================================================================
-- Storage Bucket and Access Policies for Rishaan Kumar Portfolio Website
-- File: supabase/storage.sql
-- =============================================================================

-- =============================================================================
-- STEP 1: CREATE PUBLIC STORAGE BUCKET
-- Bucket: 'portfolio-media' (publicly accessible for reading project assets)
-- =============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- =============================================================================
-- STEP 2: STORAGE RLS POLICIES ON storage.objects
-- =============================================================================

-- 1. Public (anon and authenticated) can view and read all media files
DROP POLICY IF EXISTS "Public can view portfolio media" ON storage.objects;
CREATE POLICY "Public can view portfolio media"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'portfolio-media');

-- 2. Authenticated admin user can upload media files to portfolio-media
DROP POLICY IF EXISTS "Admin can upload portfolio media" ON storage.objects;
CREATE POLICY "Admin can upload portfolio media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'portfolio-media'
        AND auth.uid() IS NOT NULL
    );

-- 3. Authenticated admin user can update media files in portfolio-media
DROP POLICY IF EXISTS "Admin can update portfolio media" ON storage.objects;
CREATE POLICY "Admin can update portfolio media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'portfolio-media'
        AND auth.uid() IS NOT NULL
    )
    WITH CHECK (
        bucket_id = 'portfolio-media'
        AND auth.uid() IS NOT NULL
    );

-- 4. Authenticated admin user can delete media files from portfolio-media
DROP POLICY IF EXISTS "Admin can delete portfolio media" ON storage.objects;
CREATE POLICY "Admin can delete portfolio media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'portfolio-media'
        AND auth.uid() IS NOT NULL
    );
