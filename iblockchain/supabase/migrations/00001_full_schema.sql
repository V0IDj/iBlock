-- ============================================================
-- iBlockchain Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- 0. EXTENSIONS
create extension if not exists "pgcrypto";

-- ============================================================
-- 0a. VERIFICATION CODES (for edge functions)
-- ============================================================
create table public.verification_codes (
  email text primary key,
  code text,
  password text,
  full_name text,
  phone text,
  expires_at timestamptz,
  created_at timestamptz default now()
);
alter table public.verification_codes enable row level security;

-- ============================================================
-- 1. USER ROLES (created early because triggers need it)
-- ============================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (role in ('user', 'admin', 'super_admin')),
  created_at timestamptz default now(),
  unique(user_id)
);
alter table public.user_roles enable row level security;

-- ============================================================
-- 2. PROFILES
-- ============================================================
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  address text,
  country text,
  wallet_id text unique,
  unique(user_id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- ============================================================
-- 3. CLIENT FINANCES (created early because triggers need it)
-- ============================================================
create table public.client_finances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  capital decimal default 0,
  profits decimal default 0,
  total_recovered decimal default 0,
  currency text default 'USD',
  notes text,
  amount_due decimal default 0,
  payment_due_message text,
  payment_status text default 'none' check (payment_status in ('none', 'pending', 'paid')),
  payment_deadline timestamptz,
  admin_message text,
  withdrawal_locked boolean default true,
  withdrawal_lock_message text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);
alter table public.client_finances enable row level security;

-- Add FK constraints after tables exist
alter table public.user_roles add constraint user_roles_user_id_fkey foreign key (user_id) references public.profiles(user_id) on delete cascade;
alter table public.client_finances add constraint client_finances_user_id_fkey foreign key (user_id) references public.profiles(user_id) on delete cascade;

-- ============================================================
-- AUTH TRIGGER: Auto-create profile + finances + role on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, full_name, email, phone, wallet_id)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    new.raw_user_meta_data ->> 'phone',
    'iBC-' || upper(substr(new.id::text, 1, 8))
  );
  insert into public.client_finances (user_id, capital, profits, total_recovered, currency, payment_status)
  values (new.id, 0, 0, 0, 'USD', 'none');
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 4. KYC DOCUMENTS
-- ============================================================
create table public.kyc_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade unique,
  passport_url text,
  id_front_url text,
  id_back_url text,
  selfie_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.kyc_documents enable row level security;

-- ============================================================
-- 5. NOTIFICATIONS
-- ============================================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  title text,
  message text,
  type text default 'notification',
  is_read boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;

-- ============================================================
-- 6. MESSAGES (Support Chat)
-- ============================================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  content text,
  sender_role text default 'user' check (sender_role in ('user', 'admin')),
  is_read boolean default false,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;

-- ============================================================
-- 7. DEPOSIT WALLETS
-- ============================================================
create table public.deposit_wallets (
  id uuid primary key default gen_random_uuid(),
  crypto_name text,
  crypto_symbol text,
  wallet_address text,
  network text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.deposit_wallets enable row level security;

-- ============================================================
-- 8. DEPOSIT REQUESTS
-- ============================================================
create table public.deposit_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  crypto_symbol text,
  amount decimal,
  tx_hash text,
  receipt_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.deposit_requests enable row level security;

-- ============================================================
-- 9. WITHDRAWAL REQUESTS
-- ============================================================
create table public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  amount decimal,
  wallet_address text,
  network text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.withdrawal_requests enable row level security;

-- ============================================================
-- 10. TRANSACTION LOG
-- ============================================================
create table public.transaction_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  type text check (type in ('deposit', 'withdrawal', 'capital_update', 'profit_update', 'recovery_update', 'adjustment')),
  amount decimal,
  currency text default 'USD',
  reference_id text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  description text,
  metadata jsonb,
  created_at timestamptz default now()
);
alter table public.transaction_log enable row level security;

-- ============================================================
-- 11. REFERRALS
-- ============================================================
create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(user_id) on delete cascade,
  referred_id uuid references public.profiles(user_id),
  referral_code text,
  status text default 'pending' check (status in ('pending', 'completed')),
  reward_amount decimal default 0,
  created_at timestamptz default now(),
  used_at timestamptz
);
alter table public.referrals enable row level security;

-- ============================================================
-- 12. MARKET ASSETS
-- ============================================================
create table public.market_assets (
  id uuid primary key default gen_random_uuid(),
  name text,
  symbol text,
  category text,
  description text,
  current_price decimal,
  profit_rate decimal,
  min_trade_amount decimal,
  is_active boolean default true,
  terms text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.market_assets enable row level security;

-- ============================================================
-- 13. MARKET ORDERS
-- ============================================================
create table public.market_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  asset_id uuid references public.market_assets(id),
  order_type text check (order_type in ('buy', 'sell', 'trade')),
  amount decimal,
  status text default 'pending',
  admin_note text,
  created_at timestamptz default now()
);
alter table public.market_orders enable row level security;

-- ============================================================
-- 14. MARKET PAYMENT WALLETS
-- ============================================================
create table public.market_payment_wallets (
  id uuid primary key default gen_random_uuid(),
  crypto_symbol text,
  network text,
  wallet_address text,
  instructions text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.market_payment_wallets enable row level security;

-- ============================================================
-- 15. CLIENT MARKET HOLDINGS
-- ============================================================
create table public.client_market_holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  asset_id uuid references public.market_assets(id),
  quantity decimal,
  invested_amount decimal,
  profit_amount decimal,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.client_market_holdings enable row level security;

-- ============================================================
-- 16. ADMIN AUDIT LOG
-- ============================================================
create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(user_id),
  action text,
  section text,
  admin_email text,
  details jsonb,
  created_at timestamptz default now()
);
alter table public.admin_audit_log enable row level security;

-- ============================================================
-- 17. CONTACT MESSAGES
-- ============================================================
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  subject text,
  phone text,
  country text,
  message text,
  created_at timestamptz default now()
);
alter table public.contact_messages enable row level security;

-- ============================================================
-- HELPER: Security definer function to avoid recursive RLS
-- ============================================================
create or replace function public.is_admin() returns boolean
language sql security definer stable
as $$ select public.is_admin(); $$;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = user_id);
create policy "Admins can view all profiles" on public.profiles for select
  using (public.is_admin());

-- USER ROLES
create policy "Users can view own role" on public.user_roles for select using (auth.uid() = user_id);
create policy "Admins can view all roles" on public.user_roles for select
  using (public.is_admin());
create policy "Super admins can insert roles" on public.user_roles for insert
  with check (public.is_admin() and (select role from public.user_roles where user_id = auth.uid()) = 'super_admin');
create policy "Super admins can update roles" on public.user_roles for update
  using (public.is_admin() and (select role from public.user_roles where user_id = auth.uid()) = 'super_admin');

-- CLIENT FINANCES
create policy "Users can view own finances" on public.client_finances for select using (auth.uid() = user_id);
create policy "Admins can view all finances" on public.client_finances for select
  using (public.is_admin());
create policy "Admins can update finances" on public.client_finances for update
  using (public.is_admin());

-- KYC DOCUMENTS
create policy "Users can view own KYC" on public.kyc_documents for select using (auth.uid() = user_id);
create policy "Users can insert own KYC" on public.kyc_documents for insert with check (auth.uid() = user_id);
create policy "Users can update own KYC" on public.kyc_documents for update using (auth.uid() = user_id);
create policy "Admins can view all KYC" on public.kyc_documents for select
  using (public.is_admin());
create policy "Admins can update any KYC" on public.kyc_documents for update
  using (public.is_admin());

-- NOTIFICATIONS
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can mark own notifications read" on public.notifications for update using (auth.uid() = user_id);
create policy "Admins can insert notifications" on public.notifications for insert
  with check (public.is_admin());

-- MESSAGES
create policy "Users can view own messages" on public.messages for select using (auth.uid() = user_id);
create policy "Users can insert own messages" on public.messages for insert with check (auth.uid() = user_id and sender_role = 'user');
create policy "Admins can view all messages" on public.messages for select
  using (public.is_admin());
create policy "Admins can insert messages" on public.messages for insert
  with check (public.is_admin());

-- DEPOSIT WALLETS
create policy "All authenticated can view wallets" on public.deposit_wallets for select to authenticated using (true);
create policy "Admins can manage wallets" on public.deposit_wallets for insert
  with check (public.is_admin());
create policy "Admins can update wallets" on public.deposit_wallets for update
  using (public.is_admin());
create policy "Admins can delete wallets" on public.deposit_wallets for delete
  using (public.is_admin());

-- DEPOSIT REQUESTS
create policy "Users can view own deposits" on public.deposit_requests for select using (auth.uid() = user_id);
create policy "Users can insert deposits" on public.deposit_requests for insert with check (auth.uid() = user_id);
create policy "Admins can view all deposits" on public.deposit_requests for select
  using (public.is_admin());
create policy "Admins can update deposits" on public.deposit_requests for update
  using (public.is_admin());

-- WITHDRAWAL REQUESTS
create policy "Users can view own withdrawals" on public.withdrawal_requests for select using (auth.uid() = user_id);
create policy "Users can insert withdrawals" on public.withdrawal_requests for insert with check (auth.uid() = user_id);
create policy "Admins can view all withdrawals" on public.withdrawal_requests for select
  using (public.is_admin());
create policy "Admins can update withdrawals" on public.withdrawal_requests for update
  using (public.is_admin());

-- TRANSACTION LOG
create policy "Users can view own transactions" on public.transaction_log for select using (auth.uid() = user_id);
create policy "Admins can view all transactions" on public.transaction_log for select
  using (public.is_admin());
create policy "Admins can insert transactions" on public.transaction_log for insert
  with check (public.is_admin());

-- REFERRALS
create policy "Users can view own referrals" on public.referrals for select using (auth.uid() = referrer_id);
create policy "Users can insert own referral" on public.referrals for insert with check (auth.uid() = referrer_id);
create policy "Admins can view all referrals" on public.referrals for select
  using (public.is_admin());

-- MARKET ASSETS
create policy "All authenticated can view market assets" on public.market_assets for select to authenticated using (true);
create policy "Admins can manage market assets" on public.market_assets for insert
  with check (public.is_admin());
create policy "Admins can update market assets" on public.market_assets for update
  using (public.is_admin());

-- MARKET ORDERS
create policy "Users can view own orders" on public.market_orders for select using (auth.uid() = user_id);
create policy "Admins can view all orders" on public.market_orders for select
  using (public.is_admin());

-- MARKET PAYMENT WALLETS
create policy "All authenticated can view payment wallets" on public.market_payment_wallets for select to authenticated using (true);
create policy "Admins can manage payment wallets" on public.market_payment_wallets for all
  using (public.is_admin());

-- CLIENT MARKET HOLDINGS
create policy "Users can view own holdings" on public.client_market_holdings for select using (auth.uid() = user_id);
create policy "Admins can view all holdings" on public.client_market_holdings for select
  using (public.is_admin());

-- ADMIN AUDIT LOG
create policy "Admins can view audit log" on public.admin_audit_log for select
  using (public.is_admin());
create policy "Admins can insert audit log" on public.admin_audit_log for insert
  with check (public.is_admin());

-- CONTACT MESSAGES
create policy "Anyone can submit contact" on public.contact_messages for insert to anon with check (true);
create policy "Admins can view contact messages" on public.contact_messages for select
  using (public.is_admin());

-- ============================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.client_finances;

-- ============================================================
-- EXECUTE_MARKET_ORDER RPC
-- ============================================================
create or replace function public.execute_market_order(
  _asset_id uuid,
  _order_type text,
  _payment_method text,
  _amount decimal,
  _target_asset_id uuid default null,
  _wallet_address text default null,
  _tx_hash text default null
) returns jsonb
language plpgsql security definer
as $$
declare
  _user_id uuid;
  _current_balance decimal;
  _asset_price decimal;
  _asset_symbol text;
begin
  _user_id := auth.uid();
  if _user_id is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

  select capital into _current_balance
  from public.client_finances where user_id = _user_id;

  select current_price, symbol into _asset_price, _asset_symbol
  from public.market_assets where id = _asset_id;

  if _payment_method = 'balance' and (_current_balance is null or _current_balance < _amount) then
    return jsonb_build_object('error', 'Insufficient balance');
  end if;

  if _payment_method = 'balance' then
    update public.client_finances
    set capital = capital - _amount
    where user_id = _user_id;
  end if;

  insert into public.market_orders (user_id, asset_id, order_type, amount, status)
  values (_user_id, _asset_id, _order_type, _amount, 'completed');

  if _order_type in ('buy', 'trade') then
    insert into public.client_market_holdings (user_id, asset_id, quantity, invested_amount, profit_amount)
    values (_user_id, _asset_id, _amount / nullif(_asset_price, 0), _amount, 0)
    on conflict (user_id, asset_id) do update set
      quantity = client_market_holdings.quantity + (_amount / nullif(_asset_price, 0)),
      invested_amount = client_market_holdings.invested_amount + _amount;
  end if;

  insert into public.admin_audit_log (user_id, action, section, details)
  values (_user_id, _order_type, 'market', jsonb_build_object(
    'asset_id', _asset_id, 'amount', _amount, 'payment_method', _payment_method
  ));

  return jsonb_build_object('success', true, 'symbol', _asset_symbol);
end;
$$;

-- ============================================================
-- STORAGE: kyc-documents bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', false)
on conflict (id) do nothing;

create policy "Users can upload own KYC files"
  on storage.objects for insert
  with check (
    bucket_id = 'kyc-documents' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view own KYC files"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins can view all KYC files"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents' and
    public.is_admin()
  );

-- ============================================================
-- STORAGE: deposit-receipts bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('deposit-receipts', 'deposit-receipts', false)
on conflict (id) do nothing;

create policy "Users can upload own receipts" on storage.objects for insert
  with check (bucket_id = 'deposit-receipts' and auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view own receipts" on storage.objects for select
  using (bucket_id = 'deposit-receipts' and auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Admins can view all receipts" on storage.objects for select
  using (bucket_id = 'deposit-receipts' and public.is_admin());

-- ============================================================
-- AFTER SETUP: Make yourself admin
-- Run this after creating your account at /auth
-- ============================================================
-- UPDATE public.user_roles SET role = 'super_admin'
-- WHERE user_id = (SELECT id FROM auth.users WHERE email = 'your@email.com');
