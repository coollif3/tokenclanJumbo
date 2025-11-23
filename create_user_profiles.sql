-- TokenClan Database Setup
-- This script creates the user_profiles table with proper RLS policies

-- ============================================
-- Create user_profiles table
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  membership_tier text NOT NULL DEFAULT 'free'::text,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT user_profiles_membership_tier_check CHECK (
    membership_tier = ANY (ARRAY['free'::text, 'paid'::text])
  )
);

-- ============================================
-- Enable Row Level Security
-- ============================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Drop existing policies if they exist
-- ============================================

DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- ============================================
-- Create RLS Policies
-- ============================================

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Create Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx
  ON public.user_profiles(user_id);

-- ============================================
-- Grant Permissions
-- ============================================

GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;

-- ============================================
-- Verification Query
-- ============================================

-- Run this to verify the table was created successfully:
-- SELECT table_name, column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'user_profiles'
-- ORDER BY ordinal_position;
