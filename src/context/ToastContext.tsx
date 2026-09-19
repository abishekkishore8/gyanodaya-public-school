import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const TOAST_DURATION_MS = 3500;

interface ToastValue {
  toastMessage: string | null;
  showToast: (message: string) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToastMessage(null), TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToastMessage(null);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const value = useMemo(
    () => ({ toastMessage, showToast, dismissToast }),
    [toastMessage, showToast, dismissToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastValue {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within a ToastProvider");
  return value;
}
