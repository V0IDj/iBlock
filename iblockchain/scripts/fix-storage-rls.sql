DROP POLICY IF EXISTS "Admins can view all KYC files" ON storage.objects;
CREATE POLICY "Admins can view all KYC files" ON storage.objects FOR SELECT
  USING (bucket_id = 'kyc-documents' AND public.is_admin());

-- Update the main migration file contents are already correct
