import React from "react";

/**
  * Props for the Button component.
  * @typedef {Object} ButtonProps
  * @property {React.ReactNode} children - The content of the button.
  * @property {"primary" | "secondary" | "outline" | "ghost" | "danger"} [variant="primary"] - Visual style variant of the button.
  * @property {"sm" | "md" | "lg"} [size="md"] - Size options of the button.
  * @property {boolean} [isLoading=false] - Whether the button is in a loading state (renders a spinner).
  * @property {boolean} [disabled=false] - Whether the button is disabled.
  */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  // Base classes for consistent design
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  // Variant classes mapping
  const variantClasses = {
    primary:
      "bg-emerald-700 hover:bg-emerald-800 text-white border border-transparent focus:ring-emerald-500",
    secondary:
      "bg-stone-200 hover:bg-stone-300 text-stone-800 border border-transparent focus:ring-stone-400",
    outline:
      "bg-transparent hover:bg-stone-50 text-stone-700 border border-stone-300 focus:ring-stone-400",
    ghost:
      "bg-transparent hover:bg-stone-100/65 text-stone-600 border border-transparent focus:ring-stone-350",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white border border-transparent focus:ring-rose-500",
  };

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  const isBtnDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isBtnDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

Button.displayName = "Button";
