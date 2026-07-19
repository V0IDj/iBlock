-- ============================================================
-- Fix: Add missing "Admins can update profiles" RLS policy
-- Run this in your Supabase SQL Editor
-- ============================================================
-- The migration only added a SELECT policy for admins on profiles,
-- missing the UPDATE policy. Without it, admin UPDATEs to profiles
-- silently affect 0 rows (RLS blocks them), making the upload
-- permission toggle appear to work but actually do nothing.
-- ============================================================

DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;

CREATE POLICY "Admins can update profiles" ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- Verify the policy was created:
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles' AND schemaname = 'public';
