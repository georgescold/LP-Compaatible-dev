-- ============================================
-- Compaatible — FIX: RLS Policies for users table
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable RLS on users table (if not already)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (needed during registration before auth is confirmed)
DROP POLICY IF EXISTS "Anyone can insert a user profile" ON users;
CREATE POLICY "Anyone can insert a user profile"
  ON users FOR INSERT
  WITH CHECK (true);

-- Users can read their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth_id = auth.uid());

-- Users can update their own profile (needed for photo upload, banner color, etc.)
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth_id = auth.uid());

-- Allow reading any user profile for matching (partners need to see each other's info)
DROP POLICY IF EXISTS "Authenticated users can view any profile" ON users;
CREATE POLICY "Authenticated users can view any profile"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- FIX: RLS Policies for test_results table
-- ============================================

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Anyone can insert test results
DROP POLICY IF EXISTS "Anyone can insert test results" ON test_results;
CREATE POLICY "Anyone can insert test results"
  ON test_results FOR INSERT
  WITH CHECK (true);

-- Users can view their own test results
DROP POLICY IF EXISTS "Users can view their own results" ON test_results;
CREATE POLICY "Users can view their own results"
  ON test_results FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- Anyone can view test results by direct ID (for shared result links)
DROP POLICY IF EXISTS "Anyone can view results by direct link" ON test_results;
CREATE POLICY "Anyone can view results by direct link"
  ON test_results FOR SELECT
  USING (true);

-- Users can update their own test results
DROP POLICY IF EXISTS "Users can update their own results" ON test_results;
CREATE POLICY "Users can update their own results"
  ON test_results FOR UPDATE
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- ============================================
-- FIX: RLS for profile-photos storage bucket
-- ============================================

-- Make sure the storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

-- Allow public read access
DROP POLICY IF EXISTS "Anyone can view profile photos" ON storage.objects;
CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');
