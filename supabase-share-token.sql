-- ============================================================
-- Migration: Share Token + Free Matches
-- Execute in Supabase SQL Editor
-- ============================================================

-- 1. Add share_token column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE;

-- 2. Add free_matches_earned column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS free_matches_earned INTEGER DEFAULT 0;

-- 3. Create index for fast share_token lookup
CREATE INDEX IF NOT EXISTS idx_users_share_token ON users(share_token);

-- 4. RPC: Get public card data (no auth required, SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION get_public_card(token TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'first_name', u.first_name,
    'personality_type', u.personality_type,
    'custom_tagline', u.custom_tagline,
    'profile_photo_url', u.profile_photo_url,
    'scores', tr.scores
  ) INTO result
  FROM users u
  LEFT JOIN test_results tr ON tr.user_id = u.id
  WHERE u.share_token = token
  ORDER BY tr.created_at DESC
  LIMIT 1;

  RETURN result;
END;
$$;

-- 5. RPC: Increment free matches counter
CREATE OR REPLACE FUNCTION increment_free_matches(user_auth_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE users
  SET free_matches_earned = COALESCE(free_matches_earned, 0) + 1
  WHERE auth_id = user_auth_id;
END;
$$;
