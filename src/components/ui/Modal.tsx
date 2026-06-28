import React, { useEffect } from "react";

/**
  * Props for the Modal component.
  * @typedef {Object} ModalProps
  * @property {boolean} isOpen - Controlled state indicating whether the modal is visible.
  * @property {() => void} onClose - Callback function to close the modal.
  * @property {string} [title] - Optional heading text displayed in the header.
  * @property {React.ReactNode} children - Main content body of the modal.
  * @property {React.ReactNode} [footer] - Optional footer content (e.g., action buttons).
  */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  // Add ESC key listener to close modal automatically
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal dialog box */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-150">
          <h3 className="text-base font-extrabold text-stone-900 tracking-tight">
            {title || "Notification"}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 hover:bg-stone-50 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-5 overflow-y-auto text-left text-sm text-stone-700 leading-relaxed flex-1">
          {children}
        </div>

        {/* Footer (Actions) */}
        {footer && (
          <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-150 flex items-center justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
