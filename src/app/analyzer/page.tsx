"use client";

import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import ResultCard from "@/components/ResultCard";
import { BrainCircuit } from "lucide-react";

export default function AnalyzerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    reviewText: string;
    sentiment: string;
    category: string;
    aiResponse: string;
  } | null>(null);

  const handleAnalyze = async (reviewText: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewText }),
      });

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error || "Failed to analyze review.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
          <BrainCircuit className="h-6 w-6" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Review Analyzer</h1>
          <p className="text-stone-500 text-sm">
            Leverage Google Gemini AI to analyze customer sentiments, classify topics, and draft immediate replies.
          </p>
        </div>
      </div>

      {/* Main Form and Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <ReviewForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="border border-rose-200 bg-rose-50/50 rounded-xl p-6 text-center space-y-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center mx-auto">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-rose-800 text-sm">Analysis Failed</h3>
              <p className="text-rose-600 text-xs leading-relaxed">{error}</p>
            </div>
          )}

          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="border border-stone-200 rounded-xl p-8 text-center space-y-4 bg-white min-h-[300px] flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-stone-50 border border-stone-150 text-stone-400 flex items-center justify-center">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="font-semibold text-stone-700 text-sm">Waiting for Analysis</h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Submit a review on the left, and the AI analysis results and response suggestion will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
