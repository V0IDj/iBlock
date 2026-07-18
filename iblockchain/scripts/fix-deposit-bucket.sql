insert into storage.buckets (id, name, public) values ('deposit-receipts', 'deposit-receipts', false) on conflict (id) do nothing;

drop policy if exists deposit_receipts_upload on storage.objects;
create policy deposit_receipts_upload on storage.objects for insert
  with check (bucket_id = 'deposit-receipts' and auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists deposit_receipts_select on storage.objects;
create policy deposit_receipts_select on storage.objects for select
  using (bucket_id = 'deposit-receipts' and auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists deposit_receipts_admin on storage.objects;
create policy deposit_receipts_admin on storage.objects for select
  using (bucket_id = 'deposit-receipts' and public.is_admin());
