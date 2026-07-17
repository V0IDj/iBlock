import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, ArrowLeft, Upload, User, CreditCard, LoaderCircle, CircleCheckBig, Camera } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export function KYC() {
  const { t, isRTL, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passport, setPassport] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idFrontPreview, setIdFrontPreview] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [idBackPreview, setIdBackPreview] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleFile = (e, setFile, setPreview) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({ title: "Error", description: "Invalid file type. Please upload JPG, PNG, or WebP.", variant: "destructive" });
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE) {
      toast({ title: "Error", description: "File is too large. Maximum size is 5MB.", variant: "destructive" });
      e.target.value = "";
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadFile = async (file, path) => {
    const { data, error } = await supabase.storage.from("kyc-documents").upload(path, file, { upsert: true });
    return error ? null : data.path;
  };

  const hasPassport = !!passport;
  const hasId = !!idFront && !!idBack;
  const hasEither = hasPassport || hasId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!selfie) {
      toast({ title: "Error", description: "Selfie is required", variant: "destructive" });
      return;
    }
    if (!hasEither) {
      toast({ title: "Error", description: "Please upload passport OR ID (front + back)", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const ts = Date.now();
      let passportUrl = null;
      if (passport) passportUrl = await uploadFile(passport, `${user.id}/passport-${ts}.${passport.name.split(".").pop()}`);
      let idFrontUrl = null, idBackUrl = null;
      if (idFront) idFrontUrl = await uploadFile(idFront, `${user.id}/id-front-${ts}.${idFront.name.split(".").pop()}`);
      if (idBack) idBackUrl = await uploadFile(idBack, `${user.id}/id-back-${ts}.${idBack.name.split(".").pop()}`);
      let selfieUrl = null;
      if (selfie) selfieUrl = await uploadFile(selfie, `${user.id}/selfie-${ts}.${selfie.name.split(".").pop()}`);

      const { error: dbError } = await supabase.from("kyc_documents").upsert({
        user_id: user.id,
        passport_url: passportUrl,
        id_front_url: idFrontUrl,
        id_back_url: idBackUrl,
        selfie_url: selfieUrl,
        status: "pending",
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
      }, { onConflict: "user_id" });
      if (dbError) throw dbError;

      // Notify admins
      const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("user_id", user.id).single();
      const { data: admins } = await supabase.from("user_roles").select("user_id").eq("role", "admin");
      if (admins && admins.length > 0) {
        const notifications = admins.map(a => ({
          user_id: a.user_id,
          title: "📄 New KYC Request",
          message: `${profile?.full_name || profile?.email || "User"} submitted documents for review`,
          is_read: false,
        }));
        await supabase.from("notifications").insert(notifications);
      }

      toast({ title: "Success", description: "Documents submitted. You can continue using your account." });
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: "Failed to submit documents", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const BackIcon = isRTL ? ArrowLeft : ArrowLeft;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10" dir={isRTL ? "rtl" : "ltr"}>
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">iBlockchain</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {language === "ar" ? "رجوع" : "Back"}
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">{language === "ar" ? "التحقق من الهوية" : "Identity Verification"}</h1>
            <p className="text-muted-foreground">{language === "ar" ? "يرجى تحميل المستندات المطلوبة" : "Please upload the required documents"}</p>
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">
                {language === "ar" ? "يمكنك رفع جواز السفر أو الهوية (الوجهين) - أحدهما كافٍ" : "You can upload passport OR ID (front + back) - either is sufficient"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passport */}
            <Card className={hasPassport ? "ring-2 ring-green-500" : hasId ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {language === "ar" ? "جواز السفر" : "Passport"}
                  </CardTitle>
                  {hasPassport && <CircleCheckBig className="h-5 w-5 text-green-500" />}
                  {!hasPassport && !hasId && <span className="text-xs bg-muted px-2 py-1 rounded">Optional</span>}
                </div>
                <CardDescription>{language === "ar" ? "صورة واضحة لجواز السفر" : "Clear image of your passport"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  {passportPreview ? (
                    <div className="relative">
                      <img src={passportPreview} alt="Passport preview" className="max-h-48 mx-auto rounded-lg" />
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => { setPassport(null); setPassportPreview(null); }}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor="passport" className="cursor-pointer block">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <span className="text-primary font-medium">{language === "ar" ? "اضغط للرفع" : "Click to upload"}</span>
                      <Input id="passport" type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, setPassport, setPassportPreview)} />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>

            {!hasPassport && (
              <div className="text-center py-2">
                <span className="text-sm text-muted-foreground">— {language === "ar" ? "أو قم برفع الهوية" : "Or upload ID"} —</span>
              </div>
            )}

            {/* ID Front */}
            <Card className={hasId ? "ring-2 ring-green-500" : hasPassport ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {language === "ar" ? "الهوية الأمامية" : "ID Front"}
                  </CardTitle>
                  {idFront && <CircleCheckBig className="h-5 w-5 text-green-500" />}
                  {!hasPassport && !hasId && <span className="text-xs bg-muted px-2 py-1 rounded">Optional</span>}
                </div>
                <CardDescription>{language === "ar" ? "الوجه الأمامي للهوية" : "Front side of your ID"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  {idFrontPreview ? (
                    <div className="relative">
                      <img src={idFrontPreview} alt="ID Front preview" className="max-h-48 mx-auto rounded-lg" />
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => { setIdFront(null); setIdFrontPreview(null); }}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor="idFront" className="cursor-pointer block">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <span className="text-primary font-medium">{language === "ar" ? "اضغط للرفع" : "Click to upload"}</span>
                      <Input id="idFront" type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, setIdFront, setIdFrontPreview)} />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* ID Back */}
            <Card className={hasId ? "ring-2 ring-green-500" : hasPassport ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {language === "ar" ? "الهوية الخلفية" : "ID Back"}
                  </CardTitle>
                  {idBack && <CircleCheckBig className="h-5 w-5 text-green-500" />}
                  {!hasPassport && !hasId && <span className="text-xs bg-muted px-2 py-1 rounded">Optional</span>}
                </div>
                <CardDescription>{language === "ar" ? "الوجه الخلفي للهوية" : "Back side of your ID"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  {idBackPreview ? (
                    <div className="relative">
                      <img src={idBackPreview} alt="ID Back preview" className="max-h-48 mx-auto rounded-lg" />
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => { setIdBack(null); setIdBackPreview(null); }}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor="idBack" className="cursor-pointer block">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <span className="text-primary font-medium">{language === "ar" ? "اضغط للرفع" : "Click to upload"}</span>
                      <Input id="idBack" type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, setIdBack, setIdBackPreview)} />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selfie */}
            <Card className={selfie ? "ring-2 ring-green-500" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Camera className="h-5 w-5 text-primary" />
                    {language === "ar" ? "صورة شخصية" : "Selfie"}
                  </CardTitle>
                  {selfie ? (
                    <CircleCheckBig className="h-5 w-5 text-green-500" />
                  ) : (
                    <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">Required</span>
                  )}
                </div>
                <CardDescription>{language === "ar" ? "صورة واضحة لوجهك" : "A clear photo of your face"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  {selfiePreview ? (
                    <div className="relative">
                      <img src={selfiePreview} alt="Selfie preview" className="max-h-48 mx-auto rounded-lg" />
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => { setSelfie(null); setSelfiePreview(null); }}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor="selfie" className="cursor-pointer block">
                      <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <span className="text-primary font-medium">{language === "ar" ? "اضغط للرفع" : "Click to upload"}</span>
                      <Input id="selfie" type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, setSelfie, setSelfiePreview)} />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <CircleCheckBig className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {language === "ar"
                  ? "بياناتك محمية ومشفرة. نستخدم وثائقك فقط للتحقق من الهوية."
                  : "Your data is protected and encrypted. We only use your documents for identity verification."}
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading || !selfie || !hasEither}>
              {loading ? (
                <><LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> {language === "ar" ? "جاري الإرسال..." : "Submitting..."}</>
              ) : (
                language === "ar" ? "إرسال" : "Submit"
              )}
            </Button>

            {!hasEither && (
              <p className="text-center text-sm text-muted-foreground">
                {language === "ar"
                  ? "يرجى رفع جواز السفر أو الهوية (الوجهين) مع الصورة الشخصية"
                  : "Please upload passport OR ID (front + back) along with selfie"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
