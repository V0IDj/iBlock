import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Shield, Home } from "lucide-react";

export function NotFound() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 mesh-bg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">{isAr ? "عذراً! الصفحة غير موجودة" : "Oops! Page not found"}</p>
        <Button variant="premium" asChild>
          <Link to="/"><Home className="h-4 w-4 mr-2" />{isAr ? "العودة إلى الرئيسية" : "Return to Home"}</Link>
        </Button>
      </motion.div>
    </div>
  );
}