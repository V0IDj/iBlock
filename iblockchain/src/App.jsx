import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { AdminProvider } from "./contexts/AdminContext";
import { Toaster } from "./components/ui/Toaster";

const Landing = lazy(() => import("./pages/Landing").then((m) => ({ default: m.Landing })));
const AboutUs = lazy(() => import("./pages/AboutUs").then((m) => ({ default: m.AboutUs })));
const TermsOfService = lazy(() => import("./pages/TermsOfService").then((m) => ({ default: m.TermsOfService })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const CryptoPrices = lazy(() => import("./pages/CryptoPrices").then((m) => ({ default: m.CryptoPrices })));
const Auth = lazy(() => import("./pages/Auth").then((m) => ({ default: m.Auth })));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail").then((m) => ({ default: m.VerifyEmail })));
const KYC = lazy(() => import("./pages/KYC").then((m) => ({ default: m.KYC })));
const KYCPending = lazy(() => import("./pages/KYCPending").then((m) => ({ default: m.KYCPending })));
const DashboardOverview = lazy(() => import("./pages/DashboardOverview").then((m) => ({ default: m.DashboardOverview })));
const NotificationDetail = lazy(() => import("./pages/NotificationDetail").then((m) => ({ default: m.NotificationDetail })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

const AdminOverview = lazy(() => import("./pages/AdminOverview").then((m) => ({ default: m.AdminOverview })));
const AdminClients = lazy(() => import("./pages/AdminClients").then((m) => ({ default: m.AdminClients })));
const AdminKyc = lazy(() => import("./pages/AdminKyc").then((m) => ({ default: m.AdminKyc })));
const AdminDeposits = lazy(() => import("./pages/AdminDeposits").then((m) => ({ default: m.AdminDeposits })));
const AdminWithdrawals = lazy(() => import("./pages/AdminWithdrawals").then((m) => ({ default: m.AdminWithdrawals })));
const AdminHistory = lazy(() => import("./pages/AdminHistory").then((m) => ({ default: m.AdminHistory })));
const AdminWallets = lazy(() => import("./pages/AdminWallets").then((m) => ({ default: m.AdminWallets })));
const AdminAudit = lazy(() => import("./pages/AdminAudit").then((m) => ({ default: m.AdminAudit })));
const AdminMessages = lazy(() => import("./pages/AdminMessages").then((m) => ({ default: m.AdminMessages })));
const AdminNewTransaction = lazy(() => import("./pages/AdminNewTransaction").then((m) => ({ default: m.AdminNewTransaction })));
const AdminMarket = lazy(() => import("./pages/AdminMarket").then((m) => ({ default: m.AdminMarket })));

import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 1800000,
    },
  },
});

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function MarketsPreview() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Markets Preview</h1>
        <p className="text-muted-foreground">Market data coming soon.</p>
      </div>
    </div>
  );
}

function DashboardPlaceholder({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">Content coming soon.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/prices" element={<CryptoPrices />} />
              <Route path="/markets-preview" element={<MarketsPreview />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/kyc" element={<KYC />} />
              <Route path="/kyc-pending" element={<KYCPending />} />
              <Route path="/notification/:id" element={<NotificationDetail />} />

              <Route
                path="/dashboard"
                element={
                  <DashboardProvider>
                    <DashboardLayout />
                  </DashboardProvider>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="deposit" element={<DashboardPlaceholder title="Deposit" />} />
                <Route path="withdrawal" element={<DashboardPlaceholder title="Withdrawal" />} />
                <Route path="transactions" element={<DashboardPlaceholder title="Transactions" />} />
                <Route path="notifications" element={<DashboardPlaceholder title="Notifications" />} />
                <Route path="account" element={<DashboardPlaceholder title="My Account" />} />
                <Route path="prices" element={<DashboardPlaceholder title="Prices" />} />
                <Route path="swap" element={<DashboardPlaceholder title="Swap" />} />
                <Route path="market" element={<DashboardPlaceholder title="Market" />} />
                <Route path="markets" element={<DashboardPlaceholder title="Markets" />} />
                <Route path="buy-sell" element={<DashboardPlaceholder title="Buy & Sell" />} />
                <Route path="portfolio" element={<DashboardPlaceholder title="Portfolio" />} />
                <Route path="staking" element={<DashboardPlaceholder title="Staking" />} />
                <Route path="referral" element={<DashboardPlaceholder title="Referral" />} />
                <Route path="support" element={<DashboardPlaceholder title="Support" />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <AdminProvider>
                    <AdminLayout />
                  </AdminProvider>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="kyc" element={<AdminKyc />} />
                <Route path="deposits" element={<AdminDeposits />} />
                <Route path="withdrawals" element={<AdminWithdrawals />} />
                <Route path="history" element={<AdminHistory />} />
                <Route path="wallets" element={<AdminWallets />} />
                <Route path="audit" element={<AdminAudit />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="new-transaction" element={<AdminNewTransaction />} />
                <Route path="market" element={<AdminMarket />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
