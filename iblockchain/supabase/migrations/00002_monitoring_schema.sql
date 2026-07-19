-- ============================================================
-- iBlockchain Monitoring Schema
-- Tables for admin panel monitoring: sessions, activity, audit
-- ============================================================

-- ============================================================
-- 1. USER SESSIONS
-- Tracks active sessions, devices, geolocation for online users
-- ============================================================
create table public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  session_id text,
  device text,
  browser text,
  os text,
  screen_resolution text,
  language text,
  timezone text,
  ip inet,
  country text,
  region text,
  city text,
  isp text,
  latitude text,
  longitude text,
  vpn_detected boolean default false,
  proxy_detected boolean default false,
  first_seen timestamptz default now(),
  last_seen timestamptz default now(),
  is_active boolean default true,
  unique(user_id, session_id)
);
alter table public.user_sessions enable row level security;

-- ============================================================
-- 2. USER ACTIVITY LOG
-- Granular per-user activity tracking (page views, typing, etc.)
-- ============================================================
create table public.user_activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  activity_type text not null,
  details jsonb,
  page_url text,
  ip inet,
  created_at timestamptz default now()
);
alter table public.user_activity_log enable row level security;

-- ============================================================
-- 3. ADMIN ACTION LOG
-- Enhanced version of admin_audit_log with richer action types
-- ============================================================
create table public.admin_action_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(user_id) on delete cascade,
  admin_email text,
  action_type text not null,
  target_user_id uuid,
  target_user_email text,
  details jsonb,
  ip inet,
  page_url text,
  created_at timestamptz default now()
);
alter table public.admin_action_log enable row level security;

-- ============================================================
-- 4. FINANCIAL AUDIT LOG
-- Financial-specific audit trail for deposits, withdrawals, edits
-- ============================================================
create table public.financial_audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  admin_id uuid references public.profiles(user_id),
  action_type text not null,
  amount numeric,
  currency text default 'USD',
  old_value jsonb,
  new_value jsonb,
  details jsonb,
  created_at timestamptz default now()
);
alter table public.financial_audit_log enable row level security;

-- ============================================================
-- SERVICE ROLE GRANTS (tables created after initial grant all)
-- ============================================================
grant all on public.user_sessions to anon, authenticated, service_role;
grant all on public.user_activity_log to anon, authenticated, service_role;
grant all on public.admin_action_log to anon, authenticated, service_role;
grant all on public.financial_audit_log to anon, authenticated, service_role;

-- ============================================================
-- INDEXES for performance
-- ============================================================

-- user_sessions indexes
create index idx_user_sessions_user_id on public.user_sessions(user_id);
create index idx_user_sessions_active on public.user_sessions(is_active) where is_active = true;
create index idx_user_sessions_last_seen on public.user_sessions(last_seen desc);
create index idx_user_sessions_country on public.user_sessions(country);
create index idx_user_sessions_device on public.user_sessions(device);

-- user_activity_log indexes
create index idx_user_activity_user_id on public.user_activity_log(user_id);
create index idx_user_activity_type on public.user_activity_log(activity_type);
create index idx_user_activity_created on public.user_activity_log(created_at desc);
create index idx_user_activity_user_created on public.user_activity_log(user_id, created_at desc);
create index idx_user_activity_type_created on public.user_activity_log(activity_type, created_at desc);

-- admin_action_log indexes
create index idx_admin_action_admin_id on public.admin_action_log(admin_id);
create index idx_admin_action_type on public.admin_action_log(action_type);
create index idx_admin_action_created on public.admin_action_log(created_at desc);
create index idx_admin_action_target on public.admin_action_log(target_user_id);
create index idx_admin_action_admin_created on public.admin_action_log(admin_id, created_at desc);

-- financial_audit_log indexes
create index idx_financial_audit_user_id on public.financial_audit_log(user_id);
create index idx_financial_audit_admin_id on public.financial_audit_log(admin_id);
create index idx_financial_audit_action_type on public.financial_audit_log(action_type);
create index idx_financial_audit_created on public.financial_audit_log(created_at desc);
create index idx_financial_audit_user_created on public.financial_audit_log(user_id, created_at desc);

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- USER SESSIONS
create policy "Users can view own sessions" on public.user_sessions for select
  using (auth.uid() = user_id);
create policy "Users can insert own sessions" on public.user_sessions for insert
  with check (auth.uid() = user_id);
create policy "Users can update own sessions" on public.user_sessions for update
  using (auth.uid() = user_id);
create policy "Admins can view all sessions" on public.user_sessions for select
  using (public.is_admin());
create policy "Admins can delete sessions" on public.user_sessions for delete
  using (public.is_admin());

-- USER ACTIVITY LOG
create policy "Users can view own activity" on public.user_activity_log for select
  using (auth.uid() = user_id);
create policy "Users can insert own activity" on public.user_activity_log for insert
  with check (auth.uid() = user_id);
create policy "Admins can view all activity" on public.user_activity_log for select
  using (public.is_admin());
create policy "Admins can delete activity" on public.user_activity_log for delete
  using (public.is_admin());

-- ADMIN ACTION LOG
create policy "Admins can view admin action log" on public.admin_action_log for select
  using (public.is_admin());
create policy "Admins can insert admin action log" on public.admin_action_log for insert
  with check (public.is_admin());

-- FINANCIAL AUDIT LOG
create policy "Users can view own financial audit" on public.financial_audit_log for select
  using (auth.uid() = user_id);
create policy "Admins can view all financial audit" on public.financial_audit_log for select
  using (public.is_admin());
create policy "Admins can insert financial audit" on public.financial_audit_log for insert
  with check (public.is_admin());

-- ============================================================
-- REALTIME SUBSCRIPTIONS
-- user_sessions realtime enables online user tracking
-- user_activity_log realtime enables live activity feed
-- ============================================================
alter publication supabase_realtime add table public.user_sessions;
alter publication supabase_realtime add table public.user_activity_log;
alter publication supabase_realtime add table public.admin_action_log;
alter publication supabase_realtime add table public.financial_audit_log;

-- ============================================================
-- HELPER FUNCTION: Get online users count (for admin overview)
-- ============================================================
create or replace function public.get_online_users_count(
  cutoff_minutes int default 5
) returns int
language sql security definer stable
as $$
  select count(distinct user_id)
  from public.user_sessions
  where is_active = true
    and last_seen > now() - (cutoff_minutes || ' minutes')::interval;
$$;

-- ============================================================
-- HELPER FUNCTION: Get active sessions for a user
-- ============================================================
create or replace function public.get_user_sessions(
  _user_id uuid
) returns table (
  id uuid,
  device text,
  browser text,
  os text,
  ip inet,
  country text,
  city text,
  last_seen timestamptz,
  is_active boolean
)
language sql security definer stable
as $$
  select s.id, s.device, s.browser, s.os, s.ip, s.country, s.city, s.last_seen, s.is_active
  from public.user_sessions s
  where s.user_id = _user_id
  order by s.last_seen desc;
$$;

-- ============================================================
-- FUNCTION: Log user activity (called from edge functions / triggers)
-- ============================================================
create or replace function public.log_user_activity(
  _user_id uuid,
  _activity_type text,
  _details jsonb default '{}',
  _page_url text default null,
  _ip inet default null
) returns uuid
language plpgsql security definer
as $$
declare
  _id uuid;
begin
  insert into public.user_activity_log (user_id, activity_type, details, page_url, ip)
  values (_user_id, _activity_type, _details, _page_url, _ip)
  returning id into _id;
  return _id;
end;
$$;

-- ============================================================
-- FUNCTION: Log admin action (called from admin components)
-- ============================================================
create or replace function public.log_admin_action(
  _action_type text,
  _target_user_id uuid default null,
  _target_user_email text default null,
  _details jsonb default '{}',
  _page_url text default null
) returns uuid
language plpgsql security definer
as $$
declare
  _id uuid;
  _admin_id uuid;
  _admin_email text;
begin
  _admin_id := auth.uid();
  select email into _admin_email from public.profiles where user_id = _admin_id;

  insert into public.admin_action_log (admin_id, admin_email, action_type, target_user_id, target_user_email, details, page_url)
  values (_admin_id, _admin_email, _action_type, _target_user_id, _target_user_email, _details, _page_url)
  returning id into _id;
  return _id;
end;
$$;

-- ============================================================
-- FUNCTION: Log financial action (called from admin/triggers)
-- ============================================================
create or replace function public.log_financial_action(
  _user_id uuid,
  _action_type text,
  _amount numeric default null,
  _currency text default 'USD',
  _old_value jsonb default '{}',
  _new_value jsonb default '{}',
  _details jsonb default '{}'
) returns uuid
language plpgsql security definer
as $$
declare
  _id uuid;
  _admin_id uuid;
begin
  _admin_id := auth.uid();

  insert into public.financial_audit_log (user_id, admin_id, action_type, amount, currency, old_value, new_value, details)
  values (_user_id, _admin_id, _action_type, _amount, _currency, _old_value, _new_value, _details)
  returning id into _id;
  return _id;
end;
$$;

-- ============================================================
-- TRIGGER: Auto-end inactive sessions on logout
-- ============================================================
create or replace function public.handle_session_logout()
returns trigger
language plpgsql security definer
as $$
begin
  update public.user_sessions
  set is_active = false, last_seen = now()
  where user_id = auth.uid() and is_active = true;
  return new;
end;
$$;

-- ============================================================
-- TRIGGER: Upsert session heartbeat (keep session alive)
-- ============================================================
create or replace function public.upsert_session_heartbeat(
  _session_id text,
  _user_id uuid default null,
  _device text default null,
  _browser text default null,
  _os text default null,
  _screen_resolution text default null,
  _language text default null,
  _timezone text default null,
  _ip inet default null,
  _country text default null,
  _region text default null,
  _city text default null,
  _isp text default null,
  _latitude text default null,
  _longitude text default null,
  _vpn_detected boolean default false,
  _proxy_detected boolean default false
) returns void
language plpgsql security definer
as $$
declare
  _resolved_user_id uuid;
begin
  _resolved_user_id := coalesce(_user_id, auth.uid());
  insert into public.user_sessions (user_id, session_id, device, browser, os, screen_resolution, language, timezone, ip, country, region, city, isp, latitude, longitude, vpn_detected, proxy_detected, last_seen, is_active)
  values (_resolved_user_id, _session_id, _device, _browser, _os, _screen_resolution, _language, _timezone, _ip, _country, _region, _city, _isp, _latitude, _longitude, _vpn_detected, _proxy_detected, now(), true)
  on conflict (user_id, session_id)
  do update set
    last_seen = now(),
    is_active = true,
    device = coalesce(_device, public.user_sessions.device),
    browser = coalesce(_browser, public.user_sessions.browser),
    os = coalesce(_os, public.user_sessions.os),
    screen_resolution = coalesce(_screen_resolution, public.user_sessions.screen_resolution),
    language = coalesce(_language, public.user_sessions.language),
    timezone = coalesce(_timezone, public.user_sessions.timezone),
    ip = coalesce(_ip, public.user_sessions.ip),
    country = coalesce(_country, public.user_sessions.country),
    region = coalesce(_region, public.user_sessions.region),
    city = coalesce(_city, public.user_sessions.city),
    isp = coalesce(_isp, public.user_sessions.isp),
    latitude = coalesce(_latitude, public.user_sessions.latitude),
    longitude = coalesce(_longitude, public.user_sessions.longitude),
    vpn_detected = coalesce(_vpn_detected, public.user_sessions.vpn_detected),
    proxy_detected = coalesce(_proxy_detected, public.user_sessions.proxy_detected);
end;
$$;
