-- ============================================
-- Compaatible — SQL Schema for Sessions & Matches
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Table: sessions
-- Stores session information (one per month)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                          -- e.g. "Février 2026"
  registration_start DATE NOT NULL,            -- 1st of month
  registration_end DATE NOT NULL,              -- 9th of month
  matching_start DATE NOT NULL,                -- 10th of month
  matching_end DATE NOT NULL,                  -- 12th of month
  reveal_date DATE NOT NULL,                   -- 13th of month
  presence_validation_start DATE NOT NULL,     -- 9th of month (after registration closes)
  presence_validation_end DATE NOT NULL,       -- 11th of month
  status TEXT NOT NULL DEFAULT 'upcoming'      -- upcoming | registration | matching | revealed | closed
    CHECK (status IN ('upcoming', 'registration', 'matching', 'revealed', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table: session_participants
-- Tracks which users participate in which session + presence validation
CREATE TABLE IF NOT EXISTS session_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  presence_validated BOOLEAN DEFAULT false,    -- Must be true for free users to be matched
  validated_at TIMESTAMPTZ,                    -- When they clicked "Validate"
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, user_id)                  -- One participation per session per user
);

-- 3. Table: matches
-- Stores matching results between users for a session
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  compatibility_score INTEGER NOT NULL DEFAULT 0,  -- Score out of 100
  unlocked_by_user1 BOOLEAN DEFAULT false,
  unlocked_by_user2 BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_participants_session ON session_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_session_participants_user ON session_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_session ON matches(session_id);
CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Sessions: everyone can read, only service role can modify
CREATE POLICY "Sessions are viewable by everyone"
  ON sessions FOR SELECT
  USING (true);

-- Session participants: users can read/insert their own
CREATE POLICY "Users can view their own participations"
  ON session_participants FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own participation"
  ON session_participants FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can update their own participation"
  ON session_participants FOR UPDATE
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- Matches: users can only see their own matches
CREATE POLICY "Users can view their own matches"
  ON matches FOR SELECT
  USING (
    user1_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    OR
    user2_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- ============================================
-- Insert first session (Février 2026)
-- ============================================
INSERT INTO sessions (name, registration_start, registration_end, matching_start, matching_end, reveal_date, presence_validation_start, presence_validation_end, status)
VALUES (
  'Février 2026',
  '2026-02-01',
  '2026-02-09',
  '2026-02-10',
  '2026-02-12',
  '2026-02-13',
  '2026-02-09',
  '2026-02-11',
  'matching'  -- Currently in matching phase based on today's date (Feb 10)
);
