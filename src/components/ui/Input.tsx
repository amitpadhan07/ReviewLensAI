import React from "react";

/**
  * Props for the Input component.
  * @typedef {Object} InputProps
  * @property {string} [label] - Optional label displayed above the input field.
  * @property {string} [error] - Error message which triggers error styling.
  * @property {string} [helperText] - Helper text displayed below the input field.
  */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    // Generate a unique ID for label binding if none is provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-stone-600 uppercase tracking-wider select-none"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-3.5 py-2 bg-stone-50 border rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all disabled:opacity-50 disabled:bg-stone-100 disabled:cursor-not-allowed ${
              error
                ? "border-rose-350 focus:ring-rose-500 focus:border-rose-500 text-rose-900"
                : "border-stone-200 focus:ring-emerald-500 focus:border-emerald-500"
            } ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-rose-600 flex items-center font-medium">
            <span className="mr-1">⚠️</span>
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-stone-400 font-medium">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
