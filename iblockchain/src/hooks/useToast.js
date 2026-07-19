import { useMemo } from "react";
import { toast as sonnerToast } from "sonner";

export function useToast() {
  return useMemo(() => ({
    toast: ({ title, description, variant }) => {
      if (variant === "destructive") {
        sonnerToast.error(title, { description });
      } else {
        sonnerToast(title, { description });
      }
    },
    success: (title, description) => sonnerToast.success(title, { description }),
    error: (title, description) => sonnerToast.error(title, { description }),
    warning: (title, description) => sonnerToast.warning(title, { description }),
    info: (title, description) => sonnerToast.info(title, { description }),
  }), []);
}
