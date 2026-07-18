CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql SECURITY DEFINER STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'));
$$;

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can update roles" ON public.user_roles;

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Super admins can insert roles" ON public.user_roles FOR INSERT
  WITH CHECK (public.is_admin() AND (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Super admins can update roles" ON public.user_roles FOR UPDATE
  USING (public.is_admin() AND (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'super_admin');

-- Fix profiles admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT
  USING (public.is_admin());

-- Fix client_finances admin policies
DROP POLICY IF EXISTS "Admins can view all finances" ON public.client_finances;
DROP POLICY IF EXISTS "Admins can update finances" ON public.client_finances;
CREATE POLICY "Admins can view all finances" ON public.client_finances FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can update finances" ON public.client_finances FOR UPDATE
  USING (public.is_admin());

-- Fix kyc_documents admin policies
DROP POLICY IF EXISTS "Admins can view all KYC" ON public.kyc_documents;
DROP POLICY IF EXISTS "Admins can update any KYC" ON public.kyc_documents;
CREATE POLICY "Admins can view all KYC" ON public.kyc_documents FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can update any KYC" ON public.kyc_documents FOR UPDATE
  USING (public.is_admin());

-- Fix notifications admin policy
DROP POLICY IF EXISTS "Admins can insert notifications" ON public.notifications;
CREATE POLICY "Admins can insert notifications" ON public.notifications FOR INSERT
  WITH CHECK (public.is_admin());

-- Fix messages admin policies
DROP POLICY IF EXISTS "Admins can view all messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can insert messages" ON public.messages;
CREATE POLICY "Admins can view all messages" ON public.messages FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can insert messages" ON public.messages FOR INSERT
  WITH CHECK (public.is_admin());

-- Fix deposit_wallets admin policies
DROP POLICY IF EXISTS "Admins can manage wallets" ON public.deposit_wallets;
DROP POLICY IF EXISTS "Admins can update wallets" ON public.deposit_wallets;
DROP POLICY IF EXISTS "Admins can delete wallets" ON public.deposit_wallets;
CREATE POLICY "Admins can manage wallets" ON public.deposit_wallets FOR INSERT
  WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update wallets" ON public.deposit_wallets FOR UPDATE
  USING (public.is_admin());
CREATE POLICY "Admins can delete wallets" ON public.deposit_wallets FOR DELETE
  USING (public.is_admin());

-- Fix deposit_requests admin policies
DROP POLICY IF EXISTS "Admins can view all deposits" ON public.deposit_requests;
DROP POLICY IF EXISTS "Admins can update deposits" ON public.deposit_requests;
CREATE POLICY "Admins can view all deposits" ON public.deposit_requests FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can update deposits" ON public.deposit_requests FOR UPDATE
  USING (public.is_admin());

-- Fix withdrawal_requests admin policies
DROP POLICY IF EXISTS "Admins can view all withdrawals" ON public.withdrawal_requests;
DROP POLICY IF EXISTS "Admins can update withdrawals" ON public.withdrawal_requests;
CREATE POLICY "Admins can view all withdrawals" ON public.withdrawal_requests FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can update withdrawals" ON public.withdrawal_requests FOR UPDATE
  USING (public.is_admin());

-- Fix transaction_log admin policies
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transaction_log;
DROP POLICY IF EXISTS "Admins can insert transactions" ON public.transaction_log;
CREATE POLICY "Admins can view all transactions" ON public.transaction_log FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can insert transactions" ON public.transaction_log FOR INSERT
  WITH CHECK (public.is_admin());

-- Fix referrals admin policies
DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referrals;
CREATE POLICY "Admins can view all referrals" ON public.referrals FOR SELECT
  USING (public.is_admin());

-- Fix market_assets admin policies
DROP POLICY IF EXISTS "Admins can manage market assets" ON public.market_assets;
DROP POLICY IF EXISTS "Admins can update market assets" ON public.market_assets;
CREATE POLICY "Admins can manage market assets" ON public.market_assets FOR INSERT
  WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update market assets" ON public.market_assets FOR UPDATE
  USING (public.is_admin());

-- Fix market_orders admin policies
DROP POLICY IF EXISTS "Admins can view all orders" ON public.market_orders;
CREATE POLICY "Admins can view all orders" ON public.market_orders FOR SELECT
  USING (public.is_admin());

-- Fix market_payment_wallets admin policies
DROP POLICY IF EXISTS "Admins can manage payment wallets" ON public.market_payment_wallets;
CREATE POLICY "Admins can manage payment wallets" ON public.market_payment_wallets FOR ALL
  USING (public.is_admin());

-- Fix client_market_holdings admin policies
DROP POLICY IF EXISTS "Admins can view all holdings" ON public.client_market_holdings;
CREATE POLICY "Admins can view all holdings" ON public.client_market_holdings FOR SELECT
  USING (public.is_admin());

-- Fix admin_audit_log admin policies
DROP POLICY IF EXISTS "Admins can view audit log" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Admins can insert audit log" ON public.admin_audit_log;
CREATE POLICY "Admins can view audit log" ON public.admin_audit_log FOR SELECT
  USING (public.is_admin());
CREATE POLICY "Admins can insert audit log" ON public.admin_audit_log FOR INSERT
  WITH CHECK (public.is_admin());

-- Fix contact_messages admin policies
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT
  USING (public.is_admin());
