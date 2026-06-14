import React from "react";
import Link from "next/link";
import { ArrowRight, TreePine } from "lucide-react";

interface HeroProps {
  title: string;
  highlightText?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  title,
  highlightText,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Soft natural green background gradient accent */}
      <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 -mb-12 -ml-12 w-64 h-64 bg-stone-100 rounded-full blur-2xl opacity-60 pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          <TreePine className="h-3.5 w-3.5" />
          <span>AI-Driven Hospitality Solutions</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {title} {highlightText && <span className="text-emerald-700">{highlightText}</span>}
        </h1>

        <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href={primaryCtaLink}
            className="inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {secondaryCtaText && secondaryCtaLink && (
            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              <span>{secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
