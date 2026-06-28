import React, { useEffect } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

/**
  * Props for the Toast component.
  * @typedef {Object} ToastProps
  * @property {string} message - Notification text content.
  * @property {"success" | "error" | "info" | "warning"} [variant="info"] - Sentiment style variant.
  * @property {() => void} onClose - Callback function triggered when toast is dismissed (manually or by timer).
  * @property {number} [duration=3000] - Duration in milliseconds before auto-dismissing (0 disables auto-dismiss).
  */
export interface ToastProps {
  message: string;
  variant?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = "info",
  onClose,
  duration = 3000,
}) => {
  // Handle auto-close timer
  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Variant helper mapping for styles
  const styleClasses = {
    success: "bg-emerald-50 border-emerald-250 text-emerald-900 shadow-emerald-100/50",
    error: "bg-rose-50 border-rose-250 text-rose-900 shadow-rose-100/50",
    warning: "bg-amber-50 border-amber-250 text-amber-900 shadow-amber-100/50",
    info: "bg-stone-50 border-stone-250 text-stone-900 shadow-stone-100/50",
  };

  // Icon mapping
  const renderIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-stone-600 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-between gap-3 px-4 py-3.5 border rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-300 ${styleClasses[variant]}`}
      role="alert"
    >
      <div className="flex items-start gap-2.5">
        {renderIcon()}
        <span className="text-sm font-semibold leading-relaxed tracking-tight break-words">
          {message}
        </span>
      </div>

      <button
        onClick={onClose}
        className="text-stone-400 hover:text-stone-600 hover:bg-stone-100/50 p-1 rounded-lg transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

Toast.displayName = "Toast";
