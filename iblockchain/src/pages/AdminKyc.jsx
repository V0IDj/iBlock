import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Eye, CircleCheckBig, CircleX, LoaderCircle, ImageOff } from "lucide-react";

function KycImage({ path, alt, className = "w-full rounded-lg border" }) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      if (path) {
        setLoading(true); setError(false);
        try {
          const { data, error: err } = await supabase.storage.from("kyc-documents").createSignedUrl(path, 3600);
          if (err) { setError(true); setUrl(null); }
          else { setUrl(data?.signedUrl || null); }
        } catch { setError(true); setUrl(null); }
        setLoading(false);
      } else { setUrl(null); }
    })();
  }, [path]);

  if (!path) return <div className="h-48 bg-muted rounded-lg flex items-center justify-center"><span className="text-muted-foreground">-</span></div>;
  if (loading) return <div className="h-48 w-full rounded-lg bg-muted animate-pulse" />;
  if (error || !url) return (
    <div className="h-48 bg-muted rounded-lg flex flex-col items-center justify-center gap-2">
      <ImageOff className="h-8 w-8 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Failed to load image</span>
    </div>
  );
  return <img src={url} alt={alt} className={className} onError={() => setError(true)} />;
}

export function AdminKyc() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { profiles, kycDocs, setKycDocs } = useAdmin();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isAr = language === "ar";

  const handleReview = async (status) => {
    if (!selectedDoc) return;
    const { error } = await supabase.from("kyc_documents").update({
      status,
      reviewed_at: new Date().toISOString(),
      admin_notes: selectedDoc.admin_notes,
    }).eq("id", selectedDoc.id);
    if (error) {
      toast({ title: "Error", description: "Update failed", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: status === "approved" ? "KYC approved" : "KYC rejected" });
      setDialogOpen(false);
      const { data } = await supabase.from("kyc_documents").select("*").order("submitted_at", { ascending: false });
      if (data) setKycDocs(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAr ? "مراجعة طلبات KYC" : "KYC Review"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isAr ? "العميل" : "Client"}</TableHead>
                <TableHead>{isAr ? "تاريخ التقديم" : "Submitted"}</TableHead>
                <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
                <TableHead>{isAr ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycDocs.map(doc => {
                const profile = profiles.find(p => p.user_id === doc.user_id);
                return (
                  <TableRow key={doc.id}>
                    <TableCell>{profile?.full_name || profile?.email || "-"}</TableCell>
                    <TableCell>{doc.submitted_at ? new Date(doc.submitted_at).toLocaleDateString(isAr ? "ar" : "en") : "-"}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === "approved" ? "default" : doc.status === "pending" ? "secondary" : "destructive"}>
                        {doc.status === "approved" ? (isAr ? "مقبول" : "Approved") : doc.status === "pending" ? (isAr ? "معلق" : "Pending") : (isAr ? "مرفوض" : "Rejected")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog open={dialogOpen && selectedDoc?.id === doc.id} onOpenChange={o => { setDialogOpen(o); if (o) setSelectedDoc(doc); }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className={`h-4 w-4 ${isAr ? "ml-2" : "mr-2"}`} />
                            {isAr ? "مراجعة" : "Review"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{isAr ? "مراجعة طلب KYC" : "Review KYC"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "جواز السفر" : "Passport"}</p>
                                <KycImage path={doc.passport_url} alt="Passport" />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "صورة شخصية" : "Selfie"}</p>
                                <KycImage path={doc.selfie_url} alt="Selfie" />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "الهوية الأمامية" : "ID Front"}</p>
                                <KycImage path={doc.id_front_url} alt="ID Front" />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "الهوية الخلفية" : "ID Back"}</p>
                                <KycImage path={doc.id_back_url} alt="ID Back" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">{isAr ? "ملاحظات الأدمن" : "Admin Notes"}</p>
                              <Textarea
                                value={selectedDoc?.admin_notes || ""}
                                onChange={e => setSelectedDoc(d => d ? { ...d, admin_notes: e.target.value } : null)}
                                placeholder={isAr ? "أضف ملاحظات..." : "Add notes..."}
                              />
                            </div>
                            <div className="flex gap-4">
                              <Button onClick={() => handleReview("approved")} className="flex-1 bg-green-600 hover:bg-green-700">
                                <CircleCheckBig className={`h-4 w-4 ${isAr ? "ml-2" : "mr-2"}`} />
                                {isAr ? "قبول" : "Approve"}
                              </Button>
                              <Button onClick={() => handleReview("rejected")} variant="destructive" className="flex-1">
                                <CircleX className={`h-4 w-4 ${isAr ? "ml-2" : "mr-2"}`} />
                                {isAr ? "رفض" : "Reject"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}