import React from "react";

/**
  * Props for the Loader component.
  * @typedef {Object} LoaderProps
  * @property {"sm" | "md" | "lg"} [size="md"] - Size of the spinner.
  * @property {"emerald" | "stone" | "white"} [color="emerald"] - Color theme variant.
  * @property {string} [label] - Optional helper text displayed alongside/below the spinner.
  */
export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "emerald" | "stone" | "white";
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "emerald",
  label,
}) => {
  // Mapping for sizes
  const spinnerSizes = {
    sm: "h-5 w-5 stroke-[3px]",
    md: "h-8 w-8 stroke-[2.5px]",
    lg: "h-12 w-12 stroke-[2px]",
  };

  // Mapping for colors
  const spinnerColors = {
    emerald: "text-emerald-700",
    stone: "text-stone-500",
    white: "text-white",
  };

  // Base spinner component
  const spinnerSVG = (
    <svg
      className={`animate-spin ${spinnerSizes[size]} ${spinnerColors[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  if (!label) {
    return spinnerSVG;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 select-none">
      {spinnerSVG}
      <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
};

Loader.displayName = "Loader";
