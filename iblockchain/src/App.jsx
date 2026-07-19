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
const AdminSendNotification = lazy(() => import("./pages/AdminSendNotification").then((m) => ({ default: m.AdminSendNotification })));
const AdminUserMonitoring = lazy(() => import("./pages/AdminUserMonitoring").then((m) => ({ default: m.AdminUserMonitoring })));
const AdminUserDetail = lazy(() => import("./pages/AdminUserDetail").then((m) => ({ default: m.AdminUserDetail })));
const AdminFinancialAudit = lazy(() => import("./pages/AdminFinancialAudit").then((m) => ({ default: m.AdminFinancialAudit })));
const DashboardSupport = lazy(() => import("./pages/DashboardSupport").then((m) => ({ default: m.DashboardSupport })));
const DashboardDeposit = lazy(() => import("./pages/DashboardDeposit").then((m) => ({ default: m.DashboardDeposit })));
const DashboardWithdrawal = lazy(() => import("./pages/DashboardWithdrawal").then((m) => ({ default: m.DashboardWithdrawal })));
const DashboardTransactions = lazy(() => import("./pages/DashboardTransactions").then((m) => ({ default: m.DashboardTransactions })));
const DashboardNotifications = lazy(() => import("./pages/DashboardNotifications").then((m) => ({ default: m.DashboardNotifications })));
const DashboardAccount = lazy(() => import("./pages/DashboardAccount").then((m) => ({ default: m.DashboardAccount })));
const DashboardPrices = lazy(() => import("./pages/DashboardPrices").then((m) => ({ default: m.DashboardPrices })));
const DashboardSwap = lazy(() => import("./pages/DashboardSwap").then((m) => ({ default: m.DashboardSwap })));
const DashboardMarket = lazy(() => import("./pages/DashboardMarket").then((m) => ({ default: m.DashboardMarket })));
const DashboardMarkets = lazy(() => import("./pages/DashboardMarkets").then((m) => ({ default: m.DashboardMarkets })));
const DashboardBuySell = lazy(() => import("./pages/DashboardBuySell").then((m) => ({ default: m.DashboardBuySell })));
const DashboardPortfolio = lazy(() => import("./pages/DashboardPortfolio").then((m) => ({ default: m.DashboardPortfolio })));
const DashboardStaking = lazy(() => import("./pages/DashboardStaking").then((m) => ({ default: m.DashboardStaking })));
const DashboardReferral = lazy(() => import("./pages/DashboardReferral").then((m) => ({ default: m.DashboardReferral })));

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
              <Route path="/markets-preview" element={<div className="min-h-screen bg-background p-4 md:p-8"><DashboardMarkets /></div>} />
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
                <Route path="deposit" element={<DashboardDeposit />} />
                <Route path="withdrawal" element={<DashboardWithdrawal />} />
                <Route path="transactions" element={<DashboardTransactions />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="account" element={<DashboardAccount />} />
                <Route path="prices" element={<DashboardPrices />} />
                <Route path="swap" element={<DashboardSwap />} />
                <Route path="market" element={<DashboardMarket />} />
                <Route path="markets" element={<DashboardMarkets />} />
                <Route path="buy-sell" element={<DashboardBuySell />} />
                <Route path="portfolio" element={<DashboardPortfolio />} />
                <Route path="staking" element={<DashboardStaking />} />
                <Route path="referral" element={<DashboardReferral />} />
                <Route path="support" element={<DashboardSupport />} />
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
                <Route path="send-notification" element={<AdminSendNotification />} />
                <Route path="user-monitoring" element={<AdminUserMonitoring />} />
                <Route path="user-monitoring/:userId" element={<AdminUserDetail />} />
                <Route path="financial-audit" element={<AdminFinancialAudit />} />
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
