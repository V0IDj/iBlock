import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Textarea } from "../components/ui/Textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Eye, CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";

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
                                {doc.passport_url ? (
                                  <img src={`${supabase.storage.from("kyc-documents").getPublicUrl(doc.passport_url).data.publicUrl}`} alt="Passport" className="w-full rounded-lg border" />
                                ) : <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">-</div>}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "صورة شخصية" : "Selfie"}</p>
                                {doc.selfie_url ? (
                                  <img src={`${supabase.storage.from("kyc-documents").getPublicUrl(doc.selfie_url).data.publicUrl}`} alt="Selfie" className="w-full rounded-lg border" />
                                ) : <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">-</div>}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "الهوية الأمامية" : "ID Front"}</p>
                                {doc.id_front_url ? (
                                  <img src={`${supabase.storage.from("kyc-documents").getPublicUrl(doc.id_front_url).data.publicUrl}`} alt="ID Front" className="w-full rounded-lg border" />
                                ) : <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">-</div>}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">{isAr ? "الهوية الخلفية" : "ID Back"}</p>
                                {doc.id_back_url ? (
                                  <img src={`${supabase.storage.from("kyc-documents").getPublicUrl(doc.id_back_url).data.publicUrl}`} alt="ID Back" className="w-full rounded-lg border" />
                                ) : <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">-</div>}
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