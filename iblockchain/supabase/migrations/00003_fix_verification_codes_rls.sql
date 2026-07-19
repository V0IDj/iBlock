-- ============================================================
-- Fix: verification_codes RLS - Table has RLS enabled but NO
-- policies. Since it stores pending passwords, restrict access
-- to service_role only (edge functions bypass RLS).
-- ============================================================

-- Revoke anon/authenticated access to prevent any RLS bypass
revoke all on public.verification_codes from anon, authenticated;

-- Explicit policies for clarity (service_role bypasses RLS anyway)
create policy "Edge functions - select" on public.verification_codes
  for select using (false);
create policy "Edge functions - insert/upsert" on public.verification_codes
  for insert with check (false);
create policy "Edge functions - update" on public.verification_codes
  for update using (false);
create policy "Edge functions - delete" on public.verification_codes
  for delete using (false);
