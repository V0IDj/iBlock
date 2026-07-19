import { toast as sonnerToast } from "sonner";
import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(({ title, description, variant }) => {
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast(title, { description });
    }
  }, []);

  return {
    toast,
    success: useCallback((title, description) => sonnerToast.success(title, { description }), []),
    error: useCallback((title, description) => sonnerToast.error(title, { description }), []),
    warning: useCallback((title, description) => sonnerToast.warning(title, { description }), []),
    info: useCallback((title, description) => sonnerToast.info(title, { description }), []),
  };
}
