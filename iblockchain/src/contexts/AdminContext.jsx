import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [kycDocs, setKycDocs] = useState([]);
  const [finances, setFinances] = useState({});
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
        return;
      }
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "super_admin"])
        .then(({ data }) => {
          if (!data || data.length === 0) {
            navigate("/dashboard");
            return;
          }
          setIsSuperAdmin(data.some((r) => r.role === "super_admin"));
          fetchData();
        });
    });
  }, [navigate, fetchData]);

  const getClientFinance = (userId) => finances[userId] || null;

  return (
    <AdminContext.Provider
      value={{
        profiles,
        kycDocs,
        finances,
        setKycDocs,
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
