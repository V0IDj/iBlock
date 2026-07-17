import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Upload, Shield, LoaderCircle } from "lucide-react";

export function KYC() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({ passport: null, idFront: null, idBack: null, selfie: null });

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Error", description: "File must be less than 5MB", variant: "destructive" });
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast({ title: "Error", description: "Only JPEG, PNG, and WebP files are allowed", variant: "destructive" });
        return;
      }
      setFiles((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.selfie) {
      toast({ title: "Error", description: "Selfie is required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const uploads = {};
      for (const [field, file] of Object.entries(files)) {
        if (file) {
          const ext = file.name.split(".").pop();
          const path = `${user.id}/${field}-${Date.now()}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("kyc-documents")
            .upload(path, file);
          if (uploadError) throw uploadError;
          uploads[`${field}_url`] = path;
        }
      }
      const { error: dbError } = await supabase.from("kyc_documents").upsert({
        user_id: user.id,
        ...uploads,
        status: "pending",
        submitted_at: new Date().toISOString(),
      });
      if (dbError) throw dbError;
      toast({ title: "Success", description: "Documents submitted. Waiting for review." });
      navigate("/kyc-pending");
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const uploadFields = [
    { key: "passport", label: "Passport", required: false },
    { key: "idFront", label: "ID Front", required: false },
    { key: "idBack", label: "ID Back", required: false },
    { key: "selfie", label: "Selfie", required: true },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 mesh-bg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <Card className="glass-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">KYC Verification</CardTitle>
            <CardDescription>
              Upload your identity documents for verification. Selfie is required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {uploadFields.map((field) => (
                <div key={field.key}>
                  <label className="flex items-center gap-2 p-4 rounded-xl border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {field.label} {field.required && <span className="text-destructive">*</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {files[field.key] ? files[field.key].name : "Click to upload (max 5MB)"}
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileChange(field.key, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              ))}
              <Button type="submit" variant="premium" className="w-full" disabled={loading}>
                {loading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
