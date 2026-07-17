import { Toaster as SonnerToaster } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";

export function Toaster() {
  const { isRTL } = useLanguage();
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      dir={isRTL ? "rtl" : "ltr"}
      toastOptions={{
        style: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }}
    />
  );
}
