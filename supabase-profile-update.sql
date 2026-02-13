-- ============================================
-- Profile Enhancements - Migration Script
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add phone number to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Add hobbies to test_results table
-- We use JSONB to store the array of selected hobbies (e.g. ["sport", "reading"])
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS hobbies JSONB DEFAULT '[]'::jsonb;

-- Optional: If you want to migrate existing 'passions' text to 'hobbies' (manual process required if needed)
-- For now, we keep 'passions' as is for backward compatibility if needed, but new logic will use 'hobbies'.
