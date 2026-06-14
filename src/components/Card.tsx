import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, icon: Icon, color, children }: CardProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        {Icon && (
          <div className={`p-3 rounded-lg w-fit ${color || "text-emerald-600 bg-emerald-50"}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="space-y-1">
          <h3 className="font-bold text-stone-900 text-lg">{title}</h3>
          <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
