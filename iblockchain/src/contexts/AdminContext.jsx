import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useLanguage } from "./LanguageContext";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [kycDocs, setKycDocs] = useState([]);
  const [finances, setFinances] = useState({});
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const fetchData = useCallback(async () => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*");
      if (profileData) setProfiles(profileData);
      const { data: kycData } = await supabase
        .from("kyc_documents")
        .select("*");
      if (kycData) setKycDocs(kycData);
      const { data: financeData } = await supabase
        .from("client_finances")
        .select("*");
      if (financeData) {
        const financeMap = {};
        financeData.forEach((f) => {
          financeMap[f.user_id] = f;
        });
        setFinances(financeMap);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) { if (!user) navigate("/auth"); return; }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "super_admin"]);
      if (!roles || roles.length === 0) {
        toast({ title: t("admin.unauthorized"), description: t("admin.noPermission"), variant: "destructive" });
        navigate("/dashboard"); return;
      }
      if (!cancelled) {
        setIsSuperAdmin(roles.some((r) => r.role === "super_admin"));
        fetchData();
      }
    })();
    return () => { cancelled = true; };
  }, [navigate, fetchData]);

  const getClientFinance = (userId) => finances[userId] || null;

  return (
    <AdminContext.Provider
      value={{
        profiles,
        kycDocs,
        finances,
        setKycDocs,
        setFinances,
        setProfiles,
        getClientFinance,
        isSuperAdmin,
        loading,
        handleLogout,
        refetch: fetchData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
